import { Card, List } from "antd";
import styled from "styled-components";
import { OrderItem } from "@fantube/shared";

const Total = styled.div`
  font-size: 20px;
  font-weight: 700;
  text-align: right;
`;

const FeeLine = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
`;

export const CheckoutSummary: React.FC<{
  items: OrderItem[];
  purchaseFee: number;
  total: number;
}> = ({ items, purchaseFee, total }) => {
  return (
    <Card title="Summary">
      <List
        dataSource={items}
        renderItem={(item) => (
          <List.Item>
            <div>
              {item.kind === "subscription" ? "Subscription" : "PPV"} — ¥{item.price}
            </div>
          </List.Item>
        )}
      />
      <FeeLine>
        <span>Purchase fee</span>
        <span>¥{purchaseFee}</span>
      </FeeLine>
      <Total>Total: ¥{total}</Total>
    </Card>
  );
};
