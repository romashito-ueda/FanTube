import { z } from "zod";

export const moneySchema = z.number().int().nonnegative();

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  displayName: z.string(),
  roles: z.array(z.enum(["viewer", "creator", "admin"])),
  ageVerified: z.boolean(),
  createdAt: z.string(),
});

export const creatorSchema = z.object({
  id: z.string(),
  userId: z.string(),
  handle: z.string(),
  displayName: z.string(),
  bio: z.string(),
  avatarUrl: z.string().optional(),
  headerUrl: z.string().optional(),
  tags: z.array(z.string()),
  kycStatus: z.enum(["unsubmitted", "pending", "approved", "rejected"]),
  isSuspended: z.boolean(),
  createdAt: z.string(),
});

export const planSchema = z.object({
  id: z.string(),
  creatorId: z.string(),
  name: z.string(),
  monthlyPrice: moneySchema,
  benefits: z.array(z.string()),
  isActive: z.boolean(),
  createdAt: z.string(),
});

export const postAccessSchema = z.union([
  z.object({ kind: z.literal("free") }),
  z.object({ kind: z.literal("plan_only"), planIds: z.array(z.string()) }),
  z.object({
    kind: z.literal("ppv"),
    price: moneySchema,
    planDiscountPercent: z.number().optional(),
  }),
]);

export const postAssetSchema = z.object({
  id: z.string(),
  postId: z.string(),
  type: z.enum(["video_hls", "thumbnail"]),
  url: z.string(),
  durationSec: z.number().optional(),
  sampleSec: z.number().optional(),
  createdAt: z.string(),
});

export const postSchema = z.object({
  id: z.string(),
  creatorId: z.string(),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  access: postAccessSchema,
  published: z.boolean(),
  publishedAt: z.string().optional(),
  createdAt: z.string(),
});

export const subscriptionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  creatorId: z.string(),
  planId: z.string(),
  status: z.enum(["active", "canceled"]),
  currentPeriodStart: z.string(),
  currentPeriodEnd: z.string(),
  createdAt: z.string(),
});

export const entitlementSchema = z.object({
  id: z.string(),
  userId: z.string(),
  creatorId: z.string(),
  postId: z.string().optional(),
  planId: z.string().optional(),
  type: z.enum(["ppv", "subscription"]),
  status: z.enum(["active", "expired"]),
  createdAt: z.string(),
});

export const orderItemSchema = z.union([
  z.object({
    kind: z.literal("subscription"),
    creatorId: z.string(),
    planId: z.string(),
    price: moneySchema,
  }),
  z.object({
    kind: z.literal("ppv"),
    creatorId: z.string(),
    postId: z.string(),
    price: moneySchema,
  }),
]);

export const orderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  items: z.array(orderItemSchema),
  contentSubtotal: moneySchema,
  purchaseFee: moneySchema,
  totalCharged: moneySchema,
  status: z.enum(["pending", "paid", "refunded", "chargeback"]),
  createdAt: z.string(),
  paidAt: z.string().optional(),
});

export const ledgerEntrySchema = z.object({
  id: z.string(),
  creatorId: z.string(),
  orderId: z.string().optional(),
  type: z.enum([
    "earn",
    "reserve_hold",
    "reserve_release",
    "refund_deduct",
    "cb_deduct",
    "adjustment",
  ]),
  grossContent: moneySchema,
  creatorShare: moneySchema,
  platformShare: moneySchema,
  reserveAmount: moneySchema,
  availableDelta: z.number(),
  status: z.enum(["pending", "available", "released"]),
  availableAt: z.string().optional(),
  note: z.string().optional(),
  createdAt: z.string(),
});

export const payoutBatchSchema = z.object({
  id: z.string(),
  periodStart: z.string(),
  periodEnd: z.string(),
  runAt: z.string(),
  status: z.enum(["draft", "completed"]),
});

export const payoutTransferSchema = z.object({
  id: z.string(),
  batchId: z.string(),
  creatorId: z.string(),
  amount: moneySchema,
  status: z.enum(["pending", "paid", "failed"]),
  createdAt: z.string(),
});

export const reportSchema = z.object({
  id: z.string(),
  reporterUserId: z.string(),
  targetType: z.enum(["post", "creator"]),
  targetId: z.string(),
  reason: z.enum([
    "copyright",
    "impersonation",
    "nonconsensual",
    "underage",
    "spam",
    "other",
  ]),
  message: z.string().optional(),
  status: z.enum(["open", "resolved"]),
  createdAt: z.string(),
});

export const moderationActionSchema = z.object({
  id: z.string(),
  adminUserId: z.string(),
  action: z.enum([
    "suspend_post",
    "restore_post",
    "suspend_creator",
    "restore_creator",
    "ban_creator",
  ]),
  targetType: z.enum(["post", "creator"]),
  targetId: z.string(),
  note: z.string().optional(),
  createdAt: z.string(),
});

export const checkoutRequestSchema = z.object({
  items: z.array(orderItemSchema),
});

export const checkoutResponseSchema = z.object({
  order: orderSchema,
});
