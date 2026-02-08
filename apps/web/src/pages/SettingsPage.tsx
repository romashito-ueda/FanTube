import { Card, Switch, Typography } from "antd";
import { PageContainer, Section } from "../styles/layout";

export const SettingsPage = () => {
  return (
    <PageContainer>
      <Section>
        <Typography.Title level={3}>Settings</Typography.Title>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Age verification</span>
            <Switch defaultChecked />
          </div>
        </Card>
      </Section>
    </PageContainer>
  );
};
