import { useQuery } from "@tanstack/react-query";
import { Button, Card, Typography } from "antd";
import { apiClient } from "../api/client";
import { Creator } from "@fantube/shared";
import { PageContainer, Section } from "../styles/layout";

export const AdminCreatorsPage = () => {
  const creatorsQuery = useQuery({
    queryKey: ["admin-creators"],
    queryFn: () => apiClient<Creator[]>("/api/admin/creators?status=pending"),
  });

  return (
    <PageContainer>
      <Section>
        <Typography.Title level={3}>Pending Creators</Typography.Title>
        {creatorsQuery.data?.map((creator) => (
          <Card key={creator.id} style={{ marginBottom: 16 }}>
            <Typography.Text strong>{creator.displayName}</Typography.Text>
            <div>@{creator.handle}</div>
            <Button type="primary" style={{ marginRight: 8 }}>
              Approve
            </Button>
            <Button>Reject</Button>
          </Card>
        ))}
      </Section>
    </PageContainer>
  );
};
