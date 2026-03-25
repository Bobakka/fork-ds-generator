import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, Card, Checkbox, DatePicker, Form, Input, Layout, Menu, Modal, Select, Spin, Table, Typography } from "antd";
import { EditOutlined, MedicineBoxOutlined, PlusOutlined, ShopOutlined } from "@ant-design/icons";
import { Refine } from "@refinedev/core";
import { Link, BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate, useParams, useSearchParams } from "react-router";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { Authenticated, type AuthProvider, useLogout } from "@refinedev/core";
import moment from "moment";
import * as GraphqlFrontend from "../__generate/graphql-frontend";
import { createDataProvider } from "./dataProvider";
import { getChildRelations, ResourceField, resourceConfigMap } from "./resourceConfig";
import { PersonaProvider, usePersona } from "./PersonaContext";
import { getAuthConfig, isAuthEnabled } from "./authConfig";
import { LoginPage } from "./LoginPage";
import "./AppRefine.css";

const { Header, Content } = Layout;

const AuthToolbar: FC = () => {
  const cfg = getAuthConfig();
  const { mutate: logout, isPending } = useLogout();
  if (!cfg.enabled) return null;
  return (
    <Button type="link" style={{ color: "rgba(255,255,255,0.85)" }} loading={isPending} onClick={() => logout()}>
      Log out
    </Button>
  );
};

const ProtectedShell: FC = () => {
  const cfg = getAuthConfig();
  if (!isAuthEnabled()) {
    return <Outlet />;
  }
  return (
    <Authenticated key="refine-protected" redirectOnFail={cfg.loginPath}>
      <Outlet />
    </Authenticated>
  );
};

const toLabel = (value: string): string =>
  value
    .split(".")
    .slice(-1)[0]
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^./, (s) => s.toUpperCase());

const toPath = (value: string): string[] => value.split(".");
const toFormNameProp = (value: string): string | string[] => (value.includes(".") ? toPath(value) : value);
const toEnumSymbol = (fieldType: string): string =>
  fieldType.startsWith("_EN_") ? `_En_${fieldType.substring("_EN_".length)}` : "";

const getDisplayName = (item: any): string => {
  return item?.name ?? item?.descr ?? item?.title ?? item?.code ?? item?.id ?? "";
};

const formatReferenceSubtitle = (item: any): string | undefined => {
  // Heuristics for common entity shapes.
  if (item?.firstName || item?.lastName) {
    const parts: string[] = [];
    if (item.birthDate) parts.push(String(item.birthDate));
    if (item.sex) parts.push(`Sex: ${String(item.sex)}`);
    return parts.filter(Boolean).join(" • ") || undefined;
  }
  if (item?.descr) return String(item.descr);
  if (item?.title) return String(item.title);
  if (item?.code) return String(item.code);
  return undefined;
};

const applyFieldTransformsToForm = (values: any, fields: any[]) => {
  const transformed = { ...values };
  fields.forEach((field) => {
    const path = toPath(field.name);
    const value = path.reduce((acc: any, key: string) => (acc == null ? undefined : acc[key]), transformed);

    if (value == null || value === "") return;

    if (field.type === "_Date") {
      const m = moment(value, "YYYY-MM-DD", true);
      if (m.isValid()) {
        let cursor = transformed;
        path.slice(0, -1).forEach((k) => {
          if (!cursor[k]) cursor[k] = {};
          cursor = cursor[k];
        });
        cursor[path[path.length - 1]] = m;
      }
    }

    if (field.type === "_DateTime") {
      const m = moment(value);
      if (m.isValid()) {
        let cursor = transformed;
        path.slice(0, -1).forEach((k) => {
          if (!cursor[k]) cursor[k] = {};
          cursor = cursor[k];
        });
        cursor[path[path.length - 1]] = m;
      }
    }
  });
  return transformed;
};

const applyFieldTransformsToSubmit = (values: any, fields: any[]) => {
  const transformed = { ...values };
  fields.forEach((field) => {
    const path = toPath(field.name);
    const value = path.reduce((acc: any, key: string) => (acc == null ? undefined : acc[key]), transformed);
    if (!value) return;

    if (field.type === "_Date" && moment.isMoment(value)) {
      let cursor = transformed;
      path.slice(0, -1).forEach((k) => {
        if (!cursor[k]) cursor[k] = {};
        cursor = cursor[k];
      });
      cursor[path[path.length - 1]] = value.format("YYYY-MM-DD");
    }

    if (field.type === "_DateTime" && moment.isMoment(value)) {
      let cursor = transformed;
      path.slice(0, -1).forEach((k) => {
        if (!cursor[k]) cursor[k] = {};
        cursor = cursor[k];
      });
      cursor[path[path.length - 1]] = value.format("YYYY-MM-DDTHH:mm:ss");
    }
  });
  return transformed;
};

/** Build nested object for Form.setFieldsValue from a dotted path (e.g. person.entityId). */
const setNestedFormValuesFromPath = (path: string, value: string): Record<string, unknown> => {
  const keys = path.split(".");
  if (keys.length === 1) return { [keys[0]]: value };
  const root: Record<string, unknown> = {};
  let cur: any = root;
  for (let i = 0; i < keys.length - 1; i++) {
    cur[keys[i]] = {};
    cur = cur[keys[i]];
  }
  cur[keys[keys.length - 1]] = value;
  return root;
};

const FormFieldInput: FC<{
  field: ResourceField;
  referenceOptions: Record<string, { value: string; title: string; subtitle?: string }[]>;
  onCreateReference?: (resource: string) => void;
  // Props injected by antd Form.Item (e.g. `value`, `onChange`, `checked`)
  value?: any;
  onChange?: any;
  checked?: any;
  onOpenReferenceInfo?: (resource: string, id: string) => void;
}> = ({ field, referenceOptions, onCreateReference, onOpenReferenceInfo, ...fieldProps }) => {
  if (field.isReference && field.referenceResource) {
    const targetResource = field.referenceResource;
    const opts = referenceOptions[targetResource] ?? [];

    return (
      <Select
        showSearch
        {...fieldProps}
        options={opts.map((opt) => {
          return {
            value: opt.value,
            title: opt.title,
            // Keep a rich label to show more info in the dropdown.
            label: (
              <div className="ref-select-option">
                <div className="ref-select-option-main">
                  <div className="ref-select-option-title">{opt.title}</div>
                  {opt.subtitle ? <div className="ref-select-option-subtitle">{opt.subtitle}</div> : null}
                </div>
                {onOpenReferenceInfo ? (
                  <Button
                    type="link"
                    size="small"
                    className="ref-select-option-open"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onOpenReferenceInfo(targetResource, opt.value);
                    }}
                  >
                    Info
                  </Button>
                ) : null}
              </div>
            ),
          };
        })}
        filterOption={(input, option) => {
          const v = (option?.title ?? option?.value ?? "") as unknown;
          return String(v).toLowerCase().includes(input.toLowerCase());
        }}
        placeholder={`Select ${field.referenceResource}`}
        dropdownRender={(menu) => (
          <>
            {menu}
            {onCreateReference ? (
              <div className="ref-select-dropdown-footer">
                <Button
                  type="link"
                  style={{ padding: "0 12px 12px" }}
                  onClick={(e) => {
                    // Don't close the dropdown before modal is opened.
                    e.preventDefault();
                    e.stopPropagation();
                    onCreateReference(targetResource);
                  }}
                >
                  + Add new {targetResource}
                </Button>
              </div>
            ) : null}
          </>
        )}
      />
    );
  }
  if (field.type.startsWith("_EN_")) {
    return (
      <Select
        {...fieldProps}
        options={Object.keys((GraphqlFrontend as any)[toEnumSymbol(field.type)] ?? {}).map((k) => {
          const enumValue = (GraphqlFrontend as any)[toEnumSymbol(field.type)][k];
          return { value: enumValue, label: String(enumValue) };
        })}
        placeholder={`Select ${toLabel(field.name)}`}
      />
    );
  }
  if (field.type === "_Date") {
    return <DatePicker {...fieldProps} format="YYYY-MM-DD" style={{ width: "100%" }} />;
  }
  if (field.type === "_DateTime") {
    return <DatePicker {...fieldProps} showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: "100%" }} />;
  }
  if (field.type === "Boolean") {
    return <Checkbox {...fieldProps} />;
  }
  return <Input {...fieldProps} placeholder={toLabel(field.name)} />;
};

const CreateEntityModal: FC<{
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
  dataProvider: any;
  resource: string;
  parentField: string | null;
  parentId: string | null;
}> = ({ open, onClose, onCreated, dataProvider, resource, parentField, parentId }) => {
  const { getVisibleFields } = usePersona();
  const cfg = resourceConfigMap[resource];
  // `id: ID!` is required by backend GraphQL inputs only for a subset of resources.
  // (See src/graphql/schema.graphql: `_CreatePersonInput` and `_CreateDoctorTypeInput`).
  const createInputRequiresId = resource === "Person" || resource === "DoctorType";

  // Keep persona-driven field hiding, but do not rely on `refineMeta`'s `required` for create input.
  const personaVisibleFields = useMemo(() => getVisibleFields(resource), [getVisibleFields, resource]);
  const idFieldFromCfg = cfg.fields.find((f) => f.name === "id");
  const idField = createInputRequiresId && idFieldFromCfg ? idFieldFromCfg : undefined;
  const formFields = useMemo(
    () => [
      ...personaVisibleFields.filter((field) => field.name !== "id"),
      ...(idField ? [idField] : []),
    ],
    [personaVisibleFields, idField]
  );
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { isResourceAllowed } = usePersona();
  const [referenceOptions, setReferenceOptions] = useState<
    Record<string, { value: string; title: string; subtitle?: string }[]>
  >({});

  const reloadReferenceOptions = useMemo(() => {
    return async () => {
      const visibleFields = getVisibleFields(resource);
      const refFields = visibleFields.filter((f) => f.isReference && !!f.referenceResource);
      const uniqueTargets = Array.from(new Set(refFields.map((f) => f.referenceResource as string)));
      await Promise.all(
        uniqueTargets.map(async (target) => {
          if (!resourceConfigMap[target]) return;
          if (!isResourceAllowed(target)) return;
          const res = await dataProvider.getList({ resource: target, filters: [] });
          const opts = (res.data ?? []).map((x: any) => ({
            value: x.id,
            title: getDisplayName(x),
            subtitle: formatReferenceSubtitle(x),
          }));
          setReferenceOptions((prev) => ({ ...prev, [target]: opts }));
        })
      );
    };
  }, [dataProvider, getVisibleFields, isResourceAllowed, resource]);

  useEffect(() => {
    if (!open) return;
    reloadReferenceOptions();
  }, [open, reloadReferenceOptions]);

  const [nestedCreate, setNestedCreate] = useState<string | null>(null);

  const [referenceInfo, setReferenceInfo] = useState<{ resource: string; id: string } | null>(null);
  const [referenceInfoLoading, setReferenceInfoLoading] = useState(false);
  const [referenceInfoData, setReferenceInfoData] = useState<any>(null);

  const loadReferenceInfo = async (targetResource: string, targetId: string) => {
    setReferenceInfo({ resource: targetResource, id: targetId });
    setReferenceInfoLoading(true);
    setReferenceInfoData(null);

    try {
      const mainRes = await dataProvider.getOne({ resource: targetResource, id: targetId });
      const main = (mainRes as any)?.data ?? null;

      if (targetResource === "Doctor" && main?.person?.entityId) {
        const personId = main.person.entityId;
        const [personRes, doctorTypeRes] = await Promise.all([
          dataProvider.getOne({ resource: "Person", id: personId }),
          main?.doctorType?.id ? dataProvider.getOne({ resource: "DoctorType", id: main.doctorType.id }) : Promise.resolve(null),
        ]);

        setReferenceInfoData({
          main,
          person: (personRes as any)?.data ?? null,
          doctorType: (doctorTypeRes as any)?.data ?? null,
        });
      } else {
        setReferenceInfoData({ main });
      }
    } finally {
      setReferenceInfoLoading(false);
    }
  };
  const prevOpenRef = useRef(false);

  useEffect(() => {
    if (!open) return;
    // Reset only on initial open.
    // This prevents wiping user input when `formFields` or other internal state changes.
    if (!prevOpenRef.current) {
      form.resetFields();
      prevOpenRef.current = true;
    }

    if (parentField && parentId && formFields.some((f) => f.name === parentField)) {
      form.setFieldsValue(setNestedFormValuesFromPath(parentField, parentId));
    }
  }, [open, parentField, parentId, form, formFields]);

  useEffect(() => {
    if (!open) prevOpenRef.current = false;
  }, [open]);

  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      const transformed = applyFieldTransformsToSubmit(values, formFields);

      // For resources where backend requires `id`, auto-fill if user left it empty.
      if (createInputRequiresId && (transformed?.id == null || transformed.id === "")) {
        const uuid = (globalThis.crypto as any)?.randomUUID?.() ?? `id-${Math.random().toString(16).slice(2)}-${Date.now()}`;
        transformed.id = uuid;
      }

      // Persona overlay may hide some fields which are required by backend.
      // In that case we should stop submit early to avoid backend validation errors.
      const requiredHiddenFields = cfg.fields.filter((f) => {
        const isHidden = !formFields.some((ff) => ff.name === f.name);
        if (!isHidden) return false;
        if (!(f.requiredCreate ?? f.required)) return false;
        if (createInputRequiresId && f.name === "id") return false; // we auto-fill id
        return true;
      });
      if (requiredHiddenFields.length > 0) {
        setLoading(false);
        Modal.error({
          title: "Cannot submit",
          content: `These required fields are hidden by the current UI persona: ${requiredHiddenFields
            .map((f) => toLabel(f.name))
            .join(", ")}`,
        });
        return;
      }

      // Helps to verify which fields are actually sent on create.
      // eslint-disable-next-line no-console
      console.warn("[CreateEntityModal:submit]", { resource, formValues: values, variables: transformed });

      await dataProvider.create({ resource, variables: transformed });
      onCreated();
    } finally {
      setLoading(false);
    }
  };

  return (
    // @ts-expect-error Ant Design 4 ModalProps typings omit children under React 18
    <Modal
      title={`Create ${cfg.name}`}
      visible={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      width={720}
      className="create-entity-modal"
      bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        onValuesChange={(changedValues, allValues) => {
          // eslint-disable-next-line no-console
          console.warn("[CreateEntityModal:valuesChange]", { resource, changedValues, allValues });
        }}
        onFinishFailed={(err) => {
          // Use warn so it always shows up in DevTools.
          // eslint-disable-next-line no-console
          console.warn("[CreateEntityModal:finishFailed]", {
            resource,
            err,
            fieldsValue: form.getFieldsValue(),
          });
        }}
      >
        {formFields.map((field) => (
            <Form.Item
              key={field.name}
              name={toFormNameProp(field.name)}
              label={toLabel(field.name)}
              valuePropName={field.type === "Boolean" ? "checked" : "value"}
              rules={
                (field.requiredCreate ?? field.required) && !(createInputRequiresId && field.name === "id")
                  ? [{ required: true, message: `${toLabel(field.name)} is required` }]
                  : []
              }
            >
              <FormFieldInput
                field={field}
                referenceOptions={referenceOptions}
                onCreateReference={(target) => {
                  if (isResourceAllowed(target)) setNestedCreate(target);
                }}
                onOpenReferenceInfo={(target, targetId) => loadReferenceInfo(target, targetId)}
              />
            </Form.Item>
          ))}
        <div className="form-actions">
          <Button htmlType="submit" type="primary" loading={loading}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </Form>

      {referenceInfo ? (
        // @ts-expect-error Ant Design 4 ModalProps typings omit children under React 18
        <Modal
          visible={true}
          title={`Reference info: ${referenceInfo.resource}`}
          onCancel={() => setReferenceInfo(null)}
          footer={null}
          destroyOnClose
          width={720}
        >
          {referenceInfoLoading ? (
            <Spin />
          ) : (
            <div>
              <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                {JSON.stringify(referenceInfoData, null, 2)}
              </pre>
            </div>
          )}
        </Modal>
      ) : null}

      {nestedCreate ? (
        <CreateEntityModal
          open={true}
          onClose={() => setNestedCreate(null)}
          onCreated={async () => {
            // Refresh reference dropdowns after creating new entity.
            setNestedCreate(null);
            await reloadReferenceOptions();
          }}
          dataProvider={dataProvider}
          resource={nestedCreate}
          parentField={null}
          parentId={null}
        />
      ) : null}
    </Modal>
  );
};

const getResourceColumns = (listFields: ResourceField[]) => {
  const fields = listFields
    .filter((f) => !f.isReference && !f.name.endsWith(".id"))
    .slice(0, 5)
    .map((f) => ({
      title: toLabel(f.name),
      dataIndex: toPath(f.name),
      key: f.name,
    }));
  return [{ title: "ID", dataIndex: "id", key: "id" }, ...fields];
};

const ResourceList: FC<{ dataProvider: any; resource: string }> = ({ dataProvider, resource }) => {
  const { getVisibleFields, isResourceAllowed } = usePersona();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cfg = resourceConfigMap[resource];
  const listFields = getVisibleFields(resource);
  const parentResource = searchParams.get("parentResource");
  const parentId = searchParams.get("parentId");
  const parentField = searchParams.get("parentField");
  const childRelations = getChildRelations(resource).filter((rel) => isResourceAllowed(rel.childResource));
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<any[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const fetchRows = useCallback(
    (showSpinner: boolean) => {
      if (showSpinner) setLoading(true);
      const filters = parentField && parentId ? [{ field: parentField, operator: "eq", value: parentId }] : [];
      return dataProvider
        .getList({ resource, filters })
        .then((res: any) => setRows(res.data ?? []))
        .finally(() => {
          if (showSpinner) setLoading(false);
        });
    },
    [dataProvider, resource, parentField, parentId]
  );

  useEffect(() => {
    fetchRows(true);
  }, [fetchRows]);

  if (loading) return <Spin />;

  return (
    <div className="page-wrap">
      <CreateEntityModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreated={() => {
          setCreateModalOpen(false);
          fetchRows(false);
        }}
        dataProvider={dataProvider}
        resource={resource}
        parentField={parentField}
        parentId={parentId}
      />
      <div className="page-header-row">
        <div>
          <Typography.Title level={4} className="entity-title">
            {cfg.name}
          </Typography.Title>
          <Typography.Text className="page-subtitle">
            {parentResource && parentId
              ? `Filtered by ${parentResource} (${parentId})`
              : `Manage ${cfg.name} records`}
          </Typography.Text>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {parentResource && (
            <Button onClick={() => navigate(resourceConfigMap[parentResource]?.routes.list ?? "/")}>
              Back to {parentResource}
            </Button>
          )}
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setCreateModalOpen(true)}>
            Add {cfg.name}
          </Button>
        </div>
      </div>
      <Card className="grid-card">
        <Table
          rowKey="id"
          dataSource={rows}
          pagination={{ pageSize: 10, showSizeChanger: false }}
          locale={{ emptyText: `No ${cfg.name} yet` }}
          columns={[
            ...getResourceColumns(listFields),
            {
              title: "actions",
              key: "actions",
              width: 120,
              render: (_: any, record: any) => (
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <Button
                    size="small"
                    icon={<EditOutlined />}
                    onClick={() => navigate(cfg.routes.edit.replace(":id", record.id))}
                  >
                    Edit
                  </Button>
                  {childRelations.map((relation) => {
                    const childCfg = resourceConfigMap[relation.childResource];
                    return (
                      <Button
                        key={`${record.id}-${relation.childResource}-${relation.parentField}`}
                        size="small"
                        onClick={() =>
                          navigate(
                            `${childCfg.routes.list}?parentResource=${resource}&parentId=${record.id}&parentField=${relation.parentField}`
                          )
                        }
                      >
                        {relation.childResource}
                      </Button>
                    );
                  })}
                </div>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
};

const ResourceEdit: FC<{ dataProvider: any; resource: string }> = ({ dataProvider, resource }) => {
  const { getVisibleFields, isResourceAllowed } = usePersona();
  const navigate = useNavigate();
  const { id } = useParams();
  const cfg = resourceConfigMap[resource];
  const visible = getVisibleFields(resource);
  const visibleNames = new Set(visible.map((f) => f.name));
  const hiddenFields = cfg.fields.filter((f) => f.name !== "id" && !visibleNames.has(f.name));
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [referenceOptions, setReferenceOptions] = useState<
    Record<string, { value: string; title: string; subtitle?: string }[]>
  >({});

  const [nestedCreate, setNestedCreate] = useState<string | null>(null);

  const [referenceInfo, setReferenceInfo] = useState<{ resource: string; id: string } | null>(null);
  const [referenceInfoLoading, setReferenceInfoLoading] = useState(false);
  const [referenceInfoData, setReferenceInfoData] = useState<any>(null);

  const loadReferenceInfo = async (targetResource: string, targetId: string) => {
    setReferenceInfo({ resource: targetResource, id: targetId });
    setReferenceInfoLoading(true);
    setReferenceInfoData(null);

    try {
      const mainRes = await dataProvider.getOne({ resource: targetResource, id: targetId });
      const main = (mainRes as any)?.data ?? null;

      // Domain-specific enrichment for Doctor -> DoctorType + Person.
      if (targetResource === "Doctor" && main?.person?.entityId) {
        const personId = main.person.entityId;
        const [personRes, doctorTypeRes] = await Promise.all([
          dataProvider.getOne({ resource: "Person", id: personId }),
          main?.doctorType?.id ? dataProvider.getOne({ resource: "DoctorType", id: main.doctorType.id }) : Promise.resolve(null),
        ]);

        setReferenceInfoData({
          main,
          person: (personRes as any)?.data ?? null,
          doctorType: (doctorTypeRes as any)?.data ?? null,
        });
      } else {
        setReferenceInfoData({ main });
      }
    } finally {
      setReferenceInfoLoading(false);
    }
  };

  const reloadReferenceOptions = useMemo(() => {
    return async () => {
      const refFields = cfg.fields.filter((f) => f.isReference && !!f.referenceResource);
      const uniqueTargets = Array.from(new Set(refFields.map((f) => f.referenceResource as string)));
      await Promise.all(
        uniqueTargets.map(async (target) => {
          if (!resourceConfigMap[target]) return;
          if (!isResourceAllowed(target)) return;
          const res = await dataProvider.getList({ resource: target, filters: [] });
          const opts = (res.data ?? []).map((x: any) => ({
            value: x.id,
            title: getDisplayName(x),
            subtitle: formatReferenceSubtitle(x),
          }));
          setReferenceOptions((prev) => ({ ...prev, [target]: opts }));
        })
      );
    };
  }, [cfg.fields, dataProvider, isResourceAllowed]);

  useEffect(() => {
    reloadReferenceOptions();
  }, [reloadReferenceOptions]);

  useEffect(() => {
    if (!id) return;
    dataProvider
      .getOne({ resource, id })
      .then((res: any) => form.setFieldsValue(applyFieldTransformsToForm(res.data ?? {}, cfg.fields)))
      .finally(() => setLoading(false));
  }, [id, dataProvider, form, resource, cfg.fields]);

  if (loading) return <Spin />;

  const renderFieldRow = (field: ResourceField, hidden?: boolean) => (
    <Form.Item
      key={field.name}
      name={toFormNameProp(field.name)}
      label={hidden ? undefined : toLabel(field.name)}
      hidden={hidden}
      valuePropName={field.type === "Boolean" ? "checked" : "value"}
      rules={
        (field.requiredUpdate ?? field.required) && !hidden
          ? [{ required: true, message: `${toLabel(field.name)} is required` }]
          : []
      }
    >
      <FormFieldInput
        field={field}
        referenceOptions={referenceOptions}
        onCreateReference={(target) => {
          if (isResourceAllowed(target)) setNestedCreate(target);
        }}
        onOpenReferenceInfo={(target, targetId) => loadReferenceInfo(target, targetId)}
      />
    </Form.Item>
  );

  return (
    <div className="page-wrap">
      <Typography.Title level={4}>Edit {cfg.name}</Typography.Title>
      <Card className="form-card">
        <Form
          form={form}
          layout="vertical"
          onFinish={async (values) => {
            setSaving(true);
            try {
              const transformed = applyFieldTransformsToSubmit(values, cfg.fields);
              await dataProvider.update({ resource, id, variables: transformed });
              navigate(cfg.routes.list);
            } finally {
              setSaving(false);
            }
          }}
        >
          <Form.Item name="id" label="ID">
            <Input disabled />
          </Form.Item>
          {visible.filter((field) => field.name !== "id").map((field) => renderFieldRow(field, false))}
          {hiddenFields.map((field) => renderFieldRow(field, true))}
          <div className="form-actions">
            <Button htmlType="submit" type="primary" loading={saving}>
              Save
            </Button>
            <Button onClick={() => navigate(cfg.routes.list)}>Cancel</Button>
          </div>
        </Form>
      </Card>

      {referenceInfo ? (
        // @ts-expect-error Ant Design 4 ModalProps typings omit children under React 18
        <Modal
          visible={true}
          title={`Reference info: ${referenceInfo.resource}`}
          onCancel={() => setReferenceInfo(null)}
          footer={null}
          destroyOnClose
          width={720}
        >
          {referenceInfoLoading ? (
            <Spin />
          ) : (
            <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {JSON.stringify(referenceInfoData, null, 2)}
            </pre>
          )}
        </Modal>
      ) : null}

      {nestedCreate ? (
        <CreateEntityModal
          open={true}
          onClose={() => setNestedCreate(null)}
          onCreated={async () => {
            setNestedCreate(null);
            await reloadReferenceOptions();
          }}
          dataProvider={dataProvider}
          resource={nestedCreate}
          parentField={null}
          parentId={null}
        />
      ) : null}
    </div>
  );
};

const AppRefineInner: FC<{ apolloClient: ApolloClient<NormalizedCacheObject>; authProvider?: AuthProvider }> = ({
  apolloClient,
  authProvider,
}) => {
  const { resources, shell } = usePersona();
  // Keep dataProvider reference stable.
  // Some effects (loading reference options) depend on `dataProvider`, and recreating it
  // can trigger repeated network requests like `searchPerson`.
  const dataProvider = useMemo(() => createDataProvider(apolloClient), [apolloClient]);
  const layoutClassName = ["app-shell", shell.layoutClassName].filter(Boolean).join(" ");
  const authCfg = getAuthConfig();

  const mainLayout = (
    <Layout className={layoutClassName} style={{ minHeight: "100vh" }}>
      <Header className="app-shell-header">
        <Typography.Text className="app-shell-brand">{shell.appTitle}</Typography.Text>
        <Menu mode="horizontal" theme="dark" style={{ flex: 1, minWidth: 0 }}>
          {resources.map((resource, index) => (
            <Menu.Item key={resource.name}>
              <Link to={resource.list}>
                {index % 2 === 0 ? <ShopOutlined /> : <MedicineBoxOutlined />} {resource.name}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
        <AuthToolbar />
      </Header>
      <Content className="app-shell-content">
        <Routes>
          <Route path="/" element={<Navigate to={resources[0]?.list ?? "/"} replace />} />
          {resources.map((resource) => {
            const cfg = resourceConfigMap[resource.name];
            return (
              <React.Fragment key={resource.name}>
                <Route
                  path={cfg.routes.list}
                  element={<ResourceList dataProvider={dataProvider} resource={resource.name} />}
                />
                <Route path={cfg.routes.create} element={<Navigate to={cfg.routes.list} replace />} />
                <Route
                  path={cfg.routes.edit}
                  element={<ResourceEdit dataProvider={dataProvider} resource={resource.name} />}
                />
              </React.Fragment>
            );
          })}
        </Routes>
      </Content>
    </Layout>
  );

  return (
    <Refine
      dataProvider={dataProvider}
      resources={resources}
      authProvider={authProvider}
      options={{ disableTelemetry: true }}
    >
      <Routes>
        {isAuthEnabled() ? <Route path={authCfg.loginPath} element={<LoginPage />} /> : null}
        <Route element={<ProtectedShell />}>
          <Route path="/*" element={mainLayout} />
        </Route>
      </Routes>
    </Refine>
  );
};

export const AppRefine: FC<{ apolloClient: ApolloClient<NormalizedCacheObject>; authProvider?: AuthProvider }> = ({
  apolloClient,
  authProvider,
}) => (
  <BrowserRouter>
    <PersonaProvider>
      <AppRefineInner apolloClient={apolloClient} authProvider={authProvider} />
    </PersonaProvider>
  </BrowserRouter>
);

