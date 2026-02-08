import styled from "styled-components";

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  border-radius: 12px;
`;

export const LockedOverlay: React.FC<{ label?: string }> = ({ label = "Locked" }) => {
  return <Overlay>{label}</Overlay>;
};
