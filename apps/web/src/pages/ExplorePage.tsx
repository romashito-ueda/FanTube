import { useQuery } from "@tanstack/react-query";
import { Typography, Divider } from "antd";
import { Creator, Post } from "@fantube/shared";
import { apiClient } from "../api/client";
import { CreatorCard } from "../components/CreatorCard";
import { PostCard } from "../components/PostCard";
import { PageContainer, Section, GridWrapper } from "../styles/layout";
import { TagChips } from "../components/TagChips";

const tags = ["fitness", "art", "studio", "exclusive", "routine"];

export const ExplorePage = () => {
  const creatorsQuery = useQuery({
    queryKey: ["creators"],
    queryFn: () => apiClient<Creator[]>("/api/creators"),
  });

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => apiClient<Post[]>("/api/posts?sort=new"),
  });

  return (
    <PageContainer>
      <Section>
        <Typography.Title level={3}>Explore Creators</Typography.Title>
        <TagChips tags={tags} />
        <Divider />
        <GridWrapper>
          {creatorsQuery.data?.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </GridWrapper>
      </Section>
      <Section>
        <Typography.Title level={3}>Featured Posts</Typography.Title>
        <Divider />
        <GridWrapper>
          {postsQuery.data?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </GridWrapper>
      </Section>
    </PageContainer>
  );
};
