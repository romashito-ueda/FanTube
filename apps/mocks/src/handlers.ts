import { http, HttpResponse } from "msw";
import {
  CheckoutRequest,
  CheckoutResponse,
  EarningsResponse,
  LibraryResponse,
  OrderItem,
} from "@fantube/shared";
import {
  advanceTime,
  applyRefund,
  checkout,
  computeBalances,
  getAssetsByPost,
  getCreatorById,
  getCurrentUser,
  getPlansByCreator,
  getPostById,
  getPostsByCreator,
  mockState,
  runPayoutBatch,
} from "./state";

export const handlers = [
  http.get("/api/me", () => {
    return HttpResponse.json(getCurrentUser());
  }),
  http.get("/api/creators", ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("query")?.toLowerCase();
    const tag = url.searchParams.get("tag");
    const creators = mockState.creators.filter((creator) => {
      if (creator.kycStatus !== "approved") return false;
      if (query && !creator.displayName.toLowerCase().includes(query)) return false;
      if (tag && !creator.tags.includes(tag)) return false;
      return true;
    });
    return HttpResponse.json(creators);
  }),
  http.get("/api/posts", ({ request }) => {
    const url = new URL(request.url);
    const tag = url.searchParams.get("tag");
    const creatorId = url.searchParams.get("creatorId");
    const posts = mockState.posts.filter((post) => {
      if (!post.published) return false;
      if (tag && !post.tags.includes(tag)) return false;
      if (creatorId && post.creatorId !== creatorId) return false;
      return true;
    });
    return HttpResponse.json(posts);
  }),
  http.get("/api/creators/:id", ({ params }) => {
    const creator = getCreatorById(params.id as string);
    if (!creator) return HttpResponse.json({ message: "Not found" }, { status: 404 });
    return HttpResponse.json(creator);
  }),
  http.get("/api/creators/:id/plans", ({ params }) => {
    return HttpResponse.json(getPlansByCreator(params.id as string));
  }),
  http.get("/api/creators/:id/posts", ({ params }) => {
    return HttpResponse.json(getPostsByCreator(params.id as string));
  }),
  http.get("/api/posts/:id", ({ params }) => {
    const post = getPostById(params.id as string);
    if (!post) return HttpResponse.json({ message: "Not found" }, { status: 404 });
    return HttpResponse.json({
      post,
      assets: getAssetsByPost(post.id),
    });
  }),
  http.post("/api/posts/:id/stream-token", () => {
    return HttpResponse.json({ url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" });
  }),
  http.post("/api/checkout", async ({ request }) => {
    const body = (await request.json()) as CheckoutRequest;
    const order = checkout(getCurrentUser().id, body.items as OrderItem[]);
    const response: CheckoutResponse = { order };
    return HttpResponse.json(response);
  }),
  http.get("/api/library", () => {
    const response: LibraryResponse = {
      subscriptions: mockState.subscriptions,
      entitlements: mockState.entitlements,
    };
    return HttpResponse.json(response);
  }),
  http.get("/api/creator/dashboard", () => {
    return HttpResponse.json({
      creator: mockState.creators[0],
      plans: getPlansByCreator(mockState.creators[0].id),
      posts: getPostsByCreator(mockState.creators[0].id),
    });
  }),
  http.get("/api/creator/plans", () => {
    return HttpResponse.json(getPlansByCreator(mockState.creators[0].id));
  }),
  http.get("/api/creator/earnings", () => {
    const creatorId = mockState.creators[0].id;
    const balances = computeBalances(creatorId);
    const response: EarningsResponse = {
      ledger: mockState.ledger.filter((entry) => entry.creatorId === creatorId),
      availableBalance: balances.availableBalance,
      reserveBalance: balances.reserveBalance,
      totalLifetime: balances.totalLifetime,
    };
    return HttpResponse.json(response);
  }),
  http.get("/api/creator/payouts", () => {
    return HttpResponse.json({
      batches: mockState.payouts.batches,
      transfers: mockState.payouts.transfers,
    });
  }),
  http.get("/api/admin/creators", ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get("status");
    const creators = status
      ? mockState.creators.filter((creator) => creator.kycStatus === status)
      : mockState.creators;
    return HttpResponse.json(creators);
  }),
  http.get("/api/admin/reports", () => {
    return HttpResponse.json(mockState.reports);
  }),
  http.post("/api/admin/refunds/apply", async ({ request }) => {
    const body = (await request.json()) as { orderId: string; type: "refund" | "chargeback" };
    const order = applyRefund(body.orderId, body.type);
    return HttpResponse.json({ order });
  }),
  http.post("/api/admin/payouts/run", () => {
    return HttpResponse.json(runPayoutBatch());
  }),
  http.post("/api/admin/dev/advance-time", async ({ request }) => {
    const body = (await request.json()) as { days: number };
    advanceTime(body.days ?? 30);
    return HttpResponse.json({ ok: true, now: mockState.timeOffsetDays });
  }),
];
