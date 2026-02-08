import { Card, Tag } from "antd";
import styled from "styled-components";
import { Creator } from "@fantube/shared";
import { Link } from "react-router-dom";

const StyledCard = styled(Card)`
  height: 100%;
  .ant-card-body {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const CreatorCard: React.FC<{ creator: Creator }> = ({ creator }) => {
  return (
    <StyledCard>
      <Header>
        <Avatar src={creator.avatarUrl} alt={creator.displayName} />
        <div>
          <Link to={`/c/${creator.id}`}>
            <strong>{creator.displayName}</strong>
          </Link>
          <div>@{creator.handle}</div>
        </div>
      </Header>
      <p>{creator.bio}</p>
      <TagRow>
        {creator.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </TagRow>
    </StyledCard>
  );
};
