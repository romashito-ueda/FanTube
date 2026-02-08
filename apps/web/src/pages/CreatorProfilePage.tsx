import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Divider, Alert } from "antd";
import { Creator, Plan, Post } from "@fantube/shared";
import { apiClient } from "../api/client";
import { PageContainer, Section, GridWrapper, SplitLayout, SplitMain, SplitSide } from "../styles/layout";
import { PriceBox } from "../components/PriceBox";
import { PostCard } from "../components/PostCard";

export const CreatorProfilePage = () => {
  const { creatorId = "" } = useParams();
  const navigate = useNavigate();

  const creatorQuery = useQuery({
    queryKey: ["creator", creatorId],
    queryFn: () => apiClient<Creator>(`/api/creators/${creatorId}`),
  });

  const plansQuery = useQuery({
    queryKey: ["plans", creatorId],
    queryFn: () => apiClient<Plan[]>(`/api/creators/${creatorId}/plans`),
  });

  const postsQuery = useQuery({
    queryKey: ["posts", creatorId],
    queryFn: () => apiClient<Post[]>(`/api/creators/${creatorId}/posts`),
  });

  if (creatorQuery.isError) {
    return (
      <PageContainer>
        <Alert message="Creator not found" type="error" />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Section>
        <Typography.Title level={2}>{creatorQuery.data?.displayName}</Typography.Title>
        <Typography.Paragraph>{creatorQuery.data?.bio}</Typography.Paragraph>
      </Section>
      <SplitLayout>
        <SplitMain>
          <Section>
            <Typography.Title level={4}>Latest Posts</Typography.Title>
            <Divider />
            <GridWrapper>
              {postsQuery.data?.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </GridWrapper>
          </Section>
        </SplitMain>
        <SplitSide>
          <Typography.Title level={4}>Subscribe</Typography.Title>
          <Section>
            {plansQuery.data?.map((plan) => (
              <div key={plan.id} style={{ marginBottom: 16 }}>
                <PriceBox
                  plan={plan}
                  onSelect={() =>
                    navigate("/checkout", {
                      state: { items: [{ kind: "subscription", creatorId, planId: plan.id, price: plan.monthlyPrice }] },
                    })
                  }
                />
              </div>
            ))}
          </Section>
        </SplitSide>
      </SplitLayout>
    </PageContainer>
  );
};
