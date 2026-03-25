import React, { FC } from "react";
import { Button, Card, Form, Input, Typography } from "antd";
import { useLogin } from "@refinedev/core";
import { getAuthConfig } from "./authConfig";
import "./LoginPage.css";

export const LoginPage: FC = () => {
  const { mutate: login, isPending } = useLogin();
  const cfg = getAuthConfig();

  if (cfg.provider === "keycloak") {
    return (
      <div className="refine-login-wrap">
        <Card className="refine-login-card" title="Sign in">
          <Typography.Paragraph type="secondary">Use your organization SSO (Keycloak).</Typography.Paragraph>
          <Button type="primary" block loading={isPending} onClick={() => login({})}>
            Continue to login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="refine-login-wrap">
      <Card className="refine-login-card" title="Sign in (demo)">
        <Form layout="vertical" onFinish={(values) => login(values)} requiredMark={false}>
          <Form.Item name="username" label="Username" rules={[{ required: true }]}>
            <Input autoComplete="username" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password autoComplete="current-password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={isPending}>
            Sign in
          </Button>
        </Form>
      </Card>
    </div>
  );
};
