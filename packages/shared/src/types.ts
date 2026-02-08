export type MoneyJPY = number;

export type UserRole = "viewer" | "creator" | "admin";

export type User = {
  id: string;
  email: string;
  displayName: string;
  roles: UserRole[];
  ageVerified: boolean;
  createdAt: string;
};

export type Creator = {
  id: string;
  userId: string;
  handle: string;
  displayName: string;
  bio: string;
  avatarUrl?: string;
  headerUrl?: string;
  tags: string[];
  kycStatus: "unsubmitted" | "pending" | "approved" | "rejected";
  isSuspended: boolean;
  createdAt: string;
};

export type Plan = {
  id: string;
  creatorId: string;
  name: string;
  monthlyPrice: MoneyJPY;
  benefits: string[];
  isActive: boolean;
  createdAt: string;
};

export type PostAccess =
  | { kind: "free" }
  | { kind: "plan_only"; planIds: string[] }
  | { kind: "ppv"; price: MoneyJPY; planDiscountPercent?: number };

export type PostAsset = {
  id: string;
  postId: string;
  type: "video_hls" | "thumbnail";
  url: string;
  durationSec?: number;
  sampleSec?: number;
  createdAt: string;
};

export type Post = {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  tags: string[];
  access: PostAccess;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
};

export type Subscription = {
  id: string;
  userId: string;
  creatorId: string;
  planId: string;
  status: "active" | "canceled";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  createdAt: string;
};

export type Entitlement = {
  id: string;
  userId: string;
  creatorId: string;
  postId?: string;
  planId?: string;
  type: "ppv" | "subscription";
  status: "active" | "expired";
  createdAt: string;
};

export type OrderItem =
  | { kind: "subscription"; creatorId: string; planId: string; price: MoneyJPY }
  | { kind: "ppv"; creatorId: string; postId: string; price: MoneyJPY };

export type Order = {
  id: string;
  userId: string;
  items: OrderItem[];
  contentSubtotal: MoneyJPY;
  purchaseFee: MoneyJPY;
  totalCharged: MoneyJPY;
  status: "pending" | "paid" | "refunded" | "chargeback";
  createdAt: string;
  paidAt?: string;
};

export type LedgerEntry = {
  id: string;
  creatorId: string;
  orderId?: string;
  type:
    | "earn"
    | "reserve_hold"
    | "reserve_release"
    | "refund_deduct"
    | "cb_deduct"
    | "adjustment";
  grossContent: MoneyJPY;
  creatorShare: MoneyJPY;
  platformShare: MoneyJPY;
  reserveAmount: MoneyJPY;
  availableDelta: MoneyJPY;
  status: "pending" | "available" | "released";
  availableAt?: string;
  note?: string;
  createdAt: string;
};

export type PayoutBatch = {
  id: string;
  periodStart: string;
  periodEnd: string;
  runAt: string;
  status: "draft" | "completed";
};

export type PayoutTransfer = {
  id: string;
  batchId: string;
  creatorId: string;
  amount: MoneyJPY;
  status: "pending" | "paid" | "failed";
  createdAt: string;
};

export type Report = {
  id: string;
  reporterUserId: string;
  targetType: "post" | "creator";
  targetId: string;
  reason:
    | "copyright"
    | "impersonation"
    | "nonconsensual"
    | "underage"
    | "spam"
    | "other";
  message?: string;
  status: "open" | "resolved";
  createdAt: string;
};

export type ModerationAction = {
  id: string;
  adminUserId: string;
  action:
    | "suspend_post"
    | "restore_post"
    | "suspend_creator"
    | "restore_creator"
    | "ban_creator";
  targetType: "post" | "creator";
  targetId: string;
  note?: string;
  createdAt: string;
};

export type CheckoutRequest = {
  items: OrderItem[];
};

export type CheckoutResponse = {
  order: Order;
};

export type LibraryResponse = {
  subscriptions: Subscription[];
  entitlements: Entitlement[];
};

export type EarningsResponse = {
  ledger: LedgerEntry[];
  availableBalance: MoneyJPY;
  reserveBalance: MoneyJPY;
  totalLifetime: MoneyJPY;
};
