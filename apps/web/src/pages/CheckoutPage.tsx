import { useLocation } from "react-router-dom";
import { Button, Card, Form, Input, Typography, message } from "antd";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiClient } from "../api/client";
import { CheckoutSummary } from "../components/CheckoutSummary";
import { PageContainer, Section, SplitLayout, SplitMain, SplitSide } from "../styles/layout";
import { OrderItem } from "@fantube/shared";

const purchaseFeeParams = {
  rate: 0.04,
  flat: 30,
  cap: 500,
};

const calcFee = (subtotal: number) =>
  Math.min(Math.round(subtotal * purchaseFeeParams.rate) + purchaseFeeParams.flat, purchaseFeeParams.cap);

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

type FormData = z.infer<typeof formSchema>;

export const CheckoutPage = () => {
  const location = useLocation();
  const items: OrderItem[] = location.state?.items ?? [];
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const purchaseFee = calcFee(subtotal);
  const total = subtotal + purchaseFee;

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: { email: "viewer@fantube.local", name: "Viewer" },
  });

  const onSubmit = handleSubmit(async (data) => {
    const parsed = formSchema.safeParse(data);
    if (!parsed.success) {
      message.error("Please provide valid checkout details.");
      return;
    }
    await apiClient("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ items }),
    });
    message.success("Purchase complete. Access granted.");
  });

  return (
    <PageContainer>
      <SplitLayout>
        <SplitMain>
          <Section>
            <Typography.Title level={3}>Checkout</Typography.Title>
            <Card>
              <Form layout="vertical" onFinish={onSubmit}>
                <Form.Item label="Email">
                  <Input {...register("email")} />
                </Form.Item>
                <Form.Item label="Full name">
                  <Input {...register("name")} />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  Pay ¥{total}
                </Button>
              </Form>
            </Card>
          </Section>
        </SplitMain>
        <SplitSide>
          <CheckoutSummary items={items} purchaseFee={purchaseFee} total={total} />
        </SplitSide>
      </SplitLayout>
    </PageContainer>
  );
};
