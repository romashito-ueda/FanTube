import { useQuery } from "@tanstack/react-query";
import { Tabs, Typography } from "antd";
import { apiClient } from "../api/client";
import { LibraryResponse } from "@fantube/shared";
import { PageContainer } from "../styles/layout";

export const LibraryPage = () => {
  const libraryQuery = useQuery({
    queryKey: ["library"],
    queryFn: () => apiClient<LibraryResponse>("/api/library"),
  });

  return (
    <PageContainer>
      <Typography.Title level={3}>Your Library</Typography.Title>
      <Tabs
        items={[
          {
            key: "subs",
            label: "Subscriptions",
            children: (
              <ul>
                {libraryQuery.data?.subscriptions.map((sub) => (
                  <li key={sub.id}>
                    {sub.creatorId} — {sub.status}
                  </li>
                ))}
              </ul>
            ),
          },
          {
            key: "ppv",
            label: "Purchased Posts",
            children: (
              <ul>
                {libraryQuery.data?.entitlements
                  .filter((entitlement) => entitlement.type === "ppv")
                  .map((entitlement) => (
                    <li key={entitlement.id}>{entitlement.postId}</li>
                  ))}
              </ul>
            ),
          },
        ]}
      />
    </PageContainer>
  );
};
