import { useQuery } from "@tanstack/react-query";
import { Button, Card, Typography } from "antd";
import { apiClient } from "../api/client";
import { Report } from "@fantube/shared";
import { PageContainer, Section } from "../styles/layout";

export const AdminModerationPage = () => {
  const reportsQuery = useQuery({
    queryKey: ["admin-reports"],
    queryFn: () => apiClient<Report[]>("/api/admin/reports"),
  });

  return (
    <PageContainer>
      <Section>
        <Typography.Title level={3}>Moderation Queue</Typography.Title>
        {reportsQuery.data?.length === 0 && <Typography.Paragraph>No open reports.</Typography.Paragraph>}
        {reportsQuery.data?.map((report) => (
          <Card key={report.id} style={{ marginBottom: 16 }}>
            <Typography.Text strong>{report.reason}</Typography.Text>
            <div>Target: {report.targetType}</div>
            <div>Status: {report.status}</div>
            <Button type="primary">Resolve</Button>
          </Card>
        ))}
      </Section>
    </PageContainer>
  );
};
