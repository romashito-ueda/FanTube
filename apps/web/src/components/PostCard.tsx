import { Card, Tag, Badge } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Post } from "@fantube/shared";

const StyledCard = styled(Card)`
  height: 100%;
  .ant-card-body {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Thumbnail = styled.div`
  height: 140px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea, #764ba2);
`;

const accessLabel = (post: Post) => {
  if (post.access.kind === "free") return "Free";
  if (post.access.kind === "plan_only") return "Subscribers";
  return `PPV ¥${post.access.price}`;
};

export const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <StyledCard>
      <Badge.Ribbon text={accessLabel(post)} color={post.access.kind === "free" ? "green" : "volcano"}>
        <Thumbnail />
      </Badge.Ribbon>
      <Link to={`/p/${post.id}`}>
        <strong>{post.title}</strong>
      </Link>
      <p>{post.description}</p>
      <TagRow>
        {post.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </TagRow>
    </StyledCard>
  );
};
