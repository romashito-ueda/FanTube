import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppShell } from "./components/AppShell";
import { ExplorePage } from "./pages/ExplorePage";
import { CreatorProfilePage } from "./pages/CreatorProfilePage";
import { PostDetailPage } from "./pages/PostDetailPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { LibraryPage } from "./pages/LibraryPage";
import { SettingsPage } from "./pages/SettingsPage";
import { CreatorDashboardPage } from "./pages/CreatorDashboardPage";
import { CreatorPostEditorPage } from "./pages/CreatorPostEditorPage";
import { CreatorPlansPage } from "./pages/CreatorPlansPage";
import { CreatorEarningsPage } from "./pages/CreatorEarningsPage";
import { AdminCreatorsPage } from "./pages/AdminCreatorsPage";
import { AdminModerationPage } from "./pages/AdminModerationPage";
import { AdminPayoutsPage } from "./pages/AdminPayoutsPage";
import { AppContainer } from "./styles/layout";
import { GlobalStyle } from "./styles/global";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#5b6cff",
          borderRadius: 12,
          fontSize: 14,
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <AppContainer>
          <BrowserRouter>
            <AppShell>
              <Routes>
                <Route path="/" element={<ExplorePage />} />
                <Route path="/c/:creatorId" element={<CreatorProfilePage />} />
                <Route path="/p/:postId" element={<PostDetailPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/creator/dashboard" element={<CreatorDashboardPage />} />
                <Route path="/creator/posts/new" element={<CreatorPostEditorPage />} />
                <Route path="/creator/posts/:postId/edit" element={<CreatorPostEditorPage />} />
                <Route path="/creator/plans" element={<CreatorPlansPage />} />
                <Route path="/creator/earnings" element={<CreatorEarningsPage />} />
                <Route path="/admin/creators" element={<AdminCreatorsPage />} />
                <Route path="/admin/moderation" element={<AdminModerationPage />} />
                <Route path="/admin/payouts" element={<AdminPayoutsPage />} />
              </Routes>
            </AppShell>
          </BrowserRouter>
        </AppContainer>
      </QueryClientProvider>
    </ConfigProvider>
  );
};
