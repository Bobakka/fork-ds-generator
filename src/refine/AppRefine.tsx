import React, { FC, useCallback, useEffect, useState } from "react";
import { Button, Card, Checkbox, DatePicker, Form, Input, Layout, Menu, Modal, Select, Spin, Table, Typography } from "antd";
import { EditOutlined, MedicineBoxOutlined, PlusOutlined, ShopOutlined } from "@ant-design/icons";
import { Refine } from "@refinedev/core";
import { Link, BrowserRouter, Navigate, Route, Routes, useNavigate, useParams, useSearchParams } from "react-router";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import moment from "moment";
import * as GraphqlFrontend from "../__generate/graphql-frontend";
import { createDataProvider } from "./dataProvider";
import { getChildRelations, ResourceField, resourceConfigMap, resources } from "./resourceConfig";
import "./AppRefine.css";

const { Header, Content } = Layout;

const toLabel = (value: string): string =>
  value
    .split(".")
    .slice(-1)[0]
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^./, (s) => s.toUpperCase());

const toPath = (value: string): string[] => value.split(".");
const toEnumSymbol = (fieldType: string): string =>
  fieldType.startsWith("_EN_") ? `_En_${fieldType.substring("_EN_".length)}` : "";

const getDisplayName = (item: any): string => {
  return item?.name ?? item?.descr ?? item?.title ?? item?.code ?? item?.id ?? "";
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
  referenceOptions: Record<string, { label: string; value: string }[]>;
}> = ({ field, referenceOptions }) => {
  if (field.isReference && field.referenceResource) {
    return (
      <Select
        showSearch
        optionFilterProp="label"
        options={referenceOptions[field.referenceResource] ?? []}
        placeholder={`Select ${field.referenceResource}`}
      />
    );
  }
  if (field.type.startsWith("_EN_")) {
    return (
      <Select
        options={Object.keys((GraphqlFrontend as any)[toEnumSymbol(field.type)] ?? {}).map((k) => {
          const enumValue = (GraphqlFrontend as any)[toEnumSymbol(field.type)][k];
          return { value: enumValue, label: String(enumValue) };
        })}
        placeholder={`Select ${toLabel(field.name)}`}
      />
    );
  }
  if (field.type === "_Date") {
    return <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />;
  }
  if (field.type === "_DateTime") {
    return <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: "100%" }} />;
  }
  if (field.type === "Boolean") {
    return <Checkbox />;
  }
  return <Input placeholder={toLabel(field.name)} />;
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
  const cfg = resourceConfigMap[resource];
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [referenceOptions, setReferenceOptions] = useState<Record<string, { label: string; value: string }[]>>({});

  useEffect(() => {
    if (!open) return;
    const loadRefs = async () => {
      const refFields = cfg.fields.filter((f) => f.isReference && !!f.referenceResource);
      const uniqueTargets = Array.from(new Set(refFields.map((f) => f.referenceResource as string)));
      await Promise.all(
        uniqueTargets.map(async (target) => {
          if (!resourceConfigMap[target]) return;
          const res = await dataProvider.getList({ resource: target, filters: [] });
          const opts = (res.data ?? []).map((x: any) => ({ value: x.id, label: getDisplayName(x) }));
          setReferenceOptions((prev) => ({ ...prev, [target]: opts }));
        })
      );
    };
    loadRefs();
  }, [open, cfg.fields, dataProvider]);

  useEffect(() => {
    if (!open) return;
    form.resetFields();
    if (parentField && parentId && cfg.fields.some((f) => f.name === parentField)) {
      form.setFieldsValue(setNestedFormValuesFromPath(parentField, parentId));
    }
  }, [open, parentField, parentId, cfg.fields, form]);

  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      const transformed = applyFieldTransformsToSubmit(values, cfg.fields);
      await dataProvider.create({ resource, variables: transformed });
      onCreated();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={`Create ${cfg.name}`}
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      width={720}
      className="create-entity-modal"
      bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        {cfg.fields
          .filter((field) => field.name !== "id")
          .map((field) => (
            <Form.Item
              key={field.name}
              name={toPath(field.name)}
              label={toLabel(field.name)}
              rules={field.required ? [{ required: true, message: `${toLabel(field.name)} is required` }] : []}
            >
              <FormFieldInput field={field} referenceOptions={referenceOptions} />
            </Form.Item>
          ))}
        <div className="form-actions">
          <Button htmlType="submit" type="primary" loading={loading}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </Form>
    </Modal>
  );
};

const getResourceColumns = (resource: string) => {
  const cfg = resourceConfigMap[resource];
  const fields = cfg.fields
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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cfg = resourceConfigMap[resource];
  const parentResource = searchParams.get("parentResource");
  const parentId = searchParams.get("parentId");
  const parentField = searchParams.get("parentField");
  const childRelations = getChildRelations(resource);
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
            ...getResourceColumns(resource),
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
  const navigate = useNavigate();
  const { id } = useParams();
  const cfg = resourceConfigMap[resource];
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [referenceOptions, setReferenceOptions] = useState<Record<string, { label: string; value: string }[]>>({});

  useEffect(() => {
    const loadRefs = async () => {
      const refFields = cfg.fields.filter((f) => f.isReference && !!f.referenceResource);
      const uniqueTargets = Array.from(new Set(refFields.map((f) => f.referenceResource as string)));
      await Promise.all(
        uniqueTargets.map(async (target) => {
          if (!resourceConfigMap[target]) return;
          const res = await dataProvider.getList({ resource: target, filters: [] });
          const opts = (res.data ?? []).map((x: any) => ({ value: x.id, label: getDisplayName(x) }));
          setReferenceOptions((prev) => ({ ...prev, [target]: opts }));
        })
      );
    };
    loadRefs();
  }, [cfg.fields, dataProvider]);

  useEffect(() => {
    if (!id) return;
    dataProvider
      .getOne({ resource, id })
      .then((res: any) => form.setFieldsValue(applyFieldTransformsToForm(res.data ?? {}, cfg.fields)))
      .finally(() => setLoading(false));
  }, [id, dataProvider, form, resource, cfg.fields]);

  if (loading) return <Spin />;

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
          {cfg.fields
            .filter((field) => field.name !== "id")
            .map((field) => (
              <Form.Item
                key={field.name}
                name={toPath(field.name)}
                label={toLabel(field.name)}
                rules={field.required ? [{ required: true, message: `${toLabel(field.name)} is required` }] : []}
              >
                <FormFieldInput field={field} referenceOptions={referenceOptions} />
              </Form.Item>
            ))}
          <div className="form-actions">
            <Button htmlType="submit" type="primary" loading={saving}>
              Save
            </Button>
            <Button onClick={() => navigate(cfg.routes.list)}>Cancel</Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export const AppRefine: FC<{ apolloClient: ApolloClient<NormalizedCacheObject> }> = ({
  apolloClient,
}) => {
  const dataProvider = createDataProvider(apolloClient);

  return (
    <BrowserRouter>
      <Refine dataProvider={dataProvider} resources={resources}>
        <Layout style={{ minHeight: "100vh" }}>
          <Header className="app-shell-header">
            <Typography.Text className="app-shell-brand">
              DS Admin
            </Typography.Text>
            <Menu mode="horizontal" theme="dark">
              {resources.map((resource, index) => (
                <Menu.Item key={resource.name}>
                  <Link to={resource.list}>
                    {index % 2 === 0 ? <ShopOutlined /> : <MedicineBoxOutlined />} {resource.name}
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
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
                    <Route
                      path={cfg.routes.create}
                      element={<Navigate to={cfg.routes.list} replace />}
                    />
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
      </Refine>
    </BrowserRouter>
  );
};

