import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Space, Typography, message } from "antd";
import { apiClient } from "../api/client";
import { PageContainer, Section } from "../styles/layout";
import { PayoutBatch, PayoutTransfer } from "@fantube/shared";
import { DataTable } from "../components/DataTable";

export const AdminPayoutsPage = () => {
  const queryClient = useQueryClient();
  const payoutsQuery = useQuery({
    queryKey: ["admin-payouts"],
    queryFn: () =>
      apiClient<{ batches: PayoutBatch[]; transfers: PayoutTransfer[] }>("/api/creator/payouts"),
  });

  const runBatch = async () => {
    await apiClient("/api/admin/payouts/run", { method: "POST" });
    message.success("Payout batch completed.");
    queryClient.invalidateQueries({ queryKey: ["admin-payouts"] });
  };

  const advanceTime = async () => {
    await apiClient("/api/admin/dev/advance-time", {
      method: "POST",
      body: JSON.stringify({ days: 30 }),
    });
    message.success("Advanced time by 30 days.");
    queryClient.invalidateQueries({ queryKey: ["creator-earnings"] });
  };

  return (
    <PageContainer>
      <Section>
        <Typography.Title level={3}>Payouts</Typography.Title>
        <Space style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={runBatch}>
            Run payout batch
          </Button>
          <Button onClick={advanceTime}>Advance time +30 days</Button>
        </Space>
        <Card title="Recent Batches">
          <DataTable<PayoutBatch>
            rowKey="id"
            dataSource={payoutsQuery.data?.batches ?? []}
            columns={[
              { title: "Batch", dataIndex: "id", key: "id" },
              { title: "Period", dataIndex: "periodEnd", key: "periodEnd" },
              { title: "Status", dataIndex: "status", key: "status" },
            ]}
          />
        </Card>
      </Section>
      <Section>
        <Typography.Title level={4}>Transfers</Typography.Title>
        <DataTable<PayoutTransfer>
          rowKey="id"
          dataSource={payoutsQuery.data?.transfers ?? []}
          columns={[
            { title: "Creator", dataIndex: "creatorId", key: "creatorId" },
            { title: "Amount", dataIndex: "amount", key: "amount" },
            { title: "Status", dataIndex: "status", key: "status" },
          ]}
        />
      </Section>
    </PageContainer>
  );
};
