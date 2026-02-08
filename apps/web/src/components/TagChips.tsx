import { Tag } from "antd";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const TagChips: React.FC<{ tags: string[]; onSelect?: (tag: string) => void }> = ({
  tags,
  onSelect,
}) => {
  return (
    <Wrapper>
      {tags.map((tag) => (
        <Tag key={tag} onClick={() => onSelect?.(tag)} style={{ cursor: "pointer" }}>
          {tag}
        </Tag>
      ))}
    </Wrapper>
  );
};
