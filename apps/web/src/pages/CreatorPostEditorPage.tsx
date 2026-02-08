import { Button, Card, Form, Input, Select, Typography, message } from "antd";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PageContainer, Section } from "../styles/layout";

const postSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  access: z.enum(["free", "plan_only", "ppv"]),
});

type PostForm = z.infer<typeof postSchema>;

export const CreatorPostEditorPage = () => {
  const { register, handleSubmit, setValue } = useForm<PostForm>({
    defaultValues: {
      title: "",
      description: "",
      access: "free",
    },
  });

  const onSubmit = handleSubmit((data) => {
    const parsed = postSchema.safeParse(data);
    if (!parsed.success) {
      message.error("Please complete all fields.");
      return;
    }
    message.success("Post saved (mock).");
  });

  return (
    <PageContainer>
      <Section>
        <Typography.Title level={3}>Create / Edit Post</Typography.Title>
        <Card>
          <Form layout="vertical" onFinish={onSubmit}>
            <Form.Item label="Title">
              <Input {...register("title")} />
            </Form.Item>
            <Form.Item label="Description">
              <Input.TextArea rows={4} {...register("description")} />
            </Form.Item>
            <Form.Item label="Access">
              <Select
                defaultValue="free"
                onChange={(value) => setValue("access", value)}
                options={[
                  { value: "free", label: "Free" },
                  { value: "plan_only", label: "Subscribers" },
                  { value: "ppv", label: "PPV" },
                ]}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Save Post
            </Button>
          </Form>
        </Card>
      </Section>
    </PageContainer>
  );
};
