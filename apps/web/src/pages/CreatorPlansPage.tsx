import { useQuery } from "@tanstack/react-query";
import { Button, Card, Typography } from "antd";
import { apiClient } from "../api/client";
import { Plan } from "@fantube/shared";
import { PageContainer, Section, GridWrapper } from "../styles/layout";
import { PriceBox } from "../components/PriceBox";

export const CreatorPlansPage = () => {
  const plansQuery = useQuery({
    queryKey: ["creator-plans"],
    queryFn: () => apiClient<Plan[]>("/api/creator/plans"),
  });

  return (
    <PageContainer>
      <Section>
        <Typography.Title level={3}>Plans</Typography.Title>
        <Card>
          <Button type="primary">Add new plan</Button>
        </Card>
      </Section>
      <Section>
        <GridWrapper>
          {plansQuery.data?.map((plan) => (
            <PriceBox key={plan.id} plan={plan} />
          ))}
        </GridWrapper>
      </Section>
    </PageContainer>
  );
};
