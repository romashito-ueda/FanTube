import { Card, Button, List } from "antd";
import styled from "styled-components";
import { Plan } from "@fantube/shared";

const PriceCard = styled(Card)`
  border: 1px solid #e6e8f0;
`;

const Price = styled.div`
  font-size: 28px;
  font-weight: 700;
`;

export const PriceBox: React.FC<{
  plan: Plan;
  onSelect?: (plan: Plan) => void;
}> = ({ plan, onSelect }) => {
  return (
    <PriceCard>
      <Price>{plan.name}</Price>
      <div>¥{plan.monthlyPrice} / month</div>
      <List
        size="small"
        dataSource={plan.benefits}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
      <Button type="primary" block onClick={() => onSelect?.(plan)}>
        Subscribe
      </Button>
    </PriceCard>
  );
};
