import { useQuery } from "@tanstack/react-query";
import { Card, Typography } from "antd";
import { apiClient } from "../api/client";
import { EarningsResponse, LedgerEntry } from "@fantube/shared";
import { PageContainer, Section } from "../styles/layout";
import { DataTable } from "../components/DataTable";

export const CreatorEarningsPage = () => {
  const earningsQuery = useQuery({
    queryKey: ["creator-earnings"],
    queryFn: () => apiClient<EarningsResponse>("/api/creator/earnings"),
  });

  const columns = [
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Gross", dataIndex: "grossContent", key: "grossContent" },
    { title: "Creator 80%", dataIndex: "creatorShare", key: "creatorShare" },
    { title: "Reserve", dataIndex: "reserveAmount", key: "reserveAmount" },
    { title: "Available Δ", dataIndex: "availableDelta", key: "availableDelta" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Available At", dataIndex: "availableAt", key: "availableAt" },
  ];

  return (
    <PageContainer>
      <Section>
        <Typography.Title level={3}>Earnings</Typography.Title>
        <Card>
          <Typography.Paragraph>
            Available balance: ¥{earningsQuery.data?.availableBalance ?? 0}
          </Typography.Paragraph>
          <Typography.Paragraph>
            Reserve held (10%): ¥{earningsQuery.data?.reserveBalance ?? 0}
          </Typography.Paragraph>
          <Typography.Paragraph>
            Lifetime creator earnings: ¥{earningsQuery.data?.totalLifetime ?? 0}
          </Typography.Paragraph>
        </Card>
      </Section>
      <Section>
        <Typography.Title level={4}>Ledger</Typography.Title>
        <DataTable<LedgerEntry>
          rowKey="id"
          columns={columns}
          dataSource={earningsQuery.data?.ledger ?? []}
        />
      </Section>
    </PageContainer>
  );
};
