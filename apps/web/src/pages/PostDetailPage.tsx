import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Alert, Button, Card, Divider, Typography } from "antd";
import { apiClient } from "../api/client";
import { PageContainer, Section, SplitLayout, SplitMain, SplitSide, GridWrapper } from "../styles/layout";
import { VideoPlayerHLS } from "../components/VideoPlayerHLS";
import { Post, PostAsset } from "@fantube/shared";
import { PostCard } from "../components/PostCard";

export const PostDetailPage = () => {
  const { postId = "" } = useParams();
  const navigate = useNavigate();

  const postQuery = useQuery({
    queryKey: ["post", postId],
    queryFn: () => apiClient<{ post: Post; assets: PostAsset[] }>(`/api/posts/${postId}`),
  });

  const relatedQuery = useQuery({
    queryKey: ["related", postQuery.data?.post.creatorId],
    enabled: !!postQuery.data?.post.creatorId,
    queryFn: () =>
      apiClient<Post[]>(`/api/posts?creatorId=${postQuery.data?.post.creatorId ?? ""}`),
  });

  if (postQuery.isError) {
    return (
      <PageContainer>
        <Alert message="Post not found" type="error" />
      </PageContainer>
    );
  }

  const post = postQuery.data?.post;
  const access = post?.access;

  const purchaseItem =
    access?.kind === "ppv"
      ? [{ kind: "ppv", creatorId: post.creatorId, postId: post.id, price: access.price }]
      : [];

  const handleAction = () => {
    if (!post || !access) return;
    if (access.kind === "plan_only") {
      navigate(`/c/${post.creatorId}`);
      return;
    }
    navigate("/checkout", {
      state: {
        items: purchaseItem,
      },
    });
  };

  return (
    <PageContainer>
      <SplitLayout>
        <SplitMain>
          <Section>
            {post && <VideoPlayerHLS src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" />}
            <Typography.Title level={3}>{post?.title}</Typography.Title>
            <Typography.Paragraph>{post?.description}</Typography.Paragraph>
          </Section>
          <Section>
            <Typography.Title level={4}>Recommended</Typography.Title>
            <Divider />
            <GridWrapper>
              {relatedQuery.data?.map((related) => (
                <PostCard key={related.id} post={related} />
              ))}
            </GridWrapper>
          </Section>
        </SplitMain>
        <SplitSide>
          <Card title="Access">
            {access?.kind === "free" && <Typography.Paragraph>Free to watch.</Typography.Paragraph>}
            {access?.kind === "plan_only" && (
              <Typography.Paragraph>Subscribers only. Join the creator plan to unlock.</Typography.Paragraph>
            )}
            {access?.kind === "ppv" && (
              <Typography.Paragraph>PPV unlock for ¥{access.price}.</Typography.Paragraph>
            )}
            <Button type="primary" block onClick={handleAction}>
              {access?.kind === "ppv" ? "Buy PPV" : "Subscribe"}
            </Button>
          </Card>
        </SplitSide>
      </SplitLayout>
    </PageContainer>
  );
};
