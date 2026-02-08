import { useQuery } from "@tanstack/react-query";
import { Button, Card, Typography } from "antd";
import { apiClient } from "../api/client";
import { PageContainer, Section, GridWrapper } from "../styles/layout";
import { Post, Plan, Creator } from "@fantube/shared";
import { PostCard } from "../components/PostCard";
import { Link } from "react-router-dom";

export const CreatorDashboardPage = () => {
  const dashboardQuery = useQuery({
    queryKey: ["creator-dashboard"],
    queryFn: () =>
      apiClient<{ creator: Creator; plans: Plan[]; posts: Post[] }>(
        "/api/creator/dashboard"
      ),
  });

  return (
    <PageContainer>
      <Section>
        <Typography.Title level={3}>Creator Dashboard</Typography.Title>
        <Card>
          <Typography.Paragraph>
            Welcome back, {dashboardQuery.data?.creator.displayName}.
          </Typography.Paragraph>
          <Button type="primary">
            <Link to="/creator/posts/new">New Post</Link>
          </Button>
        </Card>
      </Section>
      <Section>
        <Typography.Title level={4}>Latest Posts</Typography.Title>
        <GridWrapper>
          {dashboardQuery.data?.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </GridWrapper>
      </Section>
    </PageContainer>
  );
};
