import { Input } from "antd";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
`;

export const SearchBar: React.FC<{ value?: string; onChange?: (value: string) => void }> = ({
  value,
  onChange,
}) => {
  return (
    <Wrapper>
      <Input.Search
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder="Search creators, posts, or tags"
      />
    </Wrapper>
  );
};
