import {
  Creator,
  Entitlement,
  LedgerEntry,
  Order,
  OrderItem,
  Plan,
  Post,
  PostAsset,
  PayoutBatch,
  PayoutTransfer,
  Report,
  Subscription,
  User,
} from "@fantube/shared";

const nowIso = () => new Date().toISOString();

const id = (prefix: string, seed: number) => `${prefix}_${seed}`;

const purchaseFeeParams = {
  rate: 0.04,
  flat: 30,
  cap: 500,
};

const calcFee = (contentSubtotal: number) => {
  const raw = Math.round(contentSubtotal * purchaseFeeParams.rate) + purchaseFeeParams.flat;
  return Math.min(raw, purchaseFeeParams.cap);
};

const round = (value: number) => Math.round(value);

export type MockState = {
  users: User[];
  creators: Creator[];
  plans: Plan[];
  posts: Post[];
  assets: PostAsset[];
  subscriptions: Subscription[];
  entitlements: Entitlement[];
  orders: Order[];
  ledger: LedgerEntry[];
  reports: Report[];
  payouts: {
    batches: PayoutBatch[];
    transfers: PayoutTransfer[];
  };
  timeOffsetDays: number;
};

const baseDate = new Date();

const offsetIso = (days: number) =>
  new Date(baseDate.getTime() + days * 24 * 60 * 60 * 1000).toISOString();

const adminUser: User = {
  id: "user_admin",
  email: "admin@fantube.local",
  displayName: "Admin",
  roles: ["admin"],
  ageVerified: true,
  createdAt: nowIso(),
};

const viewerUser: User = {
  id: "user_viewer",
  email: "viewer@fantube.local",
  displayName: "Viewer",
  roles: ["viewer"],
  ageVerified: true,
  createdAt: nowIso(),
};

const creatorUsers: User[] = [
  {
    id: "user_creator_1",
    email: "creator1@fantube.local",
    displayName: "Mika Onyx",
    roles: ["creator"],
    ageVerified: true,
    createdAt: nowIso(),
  },
  {
    id: "user_creator_2",
    email: "creator2@fantube.local",
    displayName: "Nova Rae",
    roles: ["creator"],
    ageVerified: true,
    createdAt: nowIso(),
  },
  {
    id: "user_creator_3",
    email: "creator3@fantube.local",
    displayName: "Kai Ember",
    roles: ["creator"],
    ageVerified: true,
    createdAt: nowIso(),
  },
];

const creators: Creator[] = [
  {
    id: "creator_1",
    userId: "user_creator_1",
    handle: "mika",
    displayName: "Mika Onyx",
    bio: "Behind-the-scenes fitness and daily rituals.",
    avatarUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=80",
    headerUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    tags: ["fitness", "routine", "motivation"],
    kycStatus: "approved",
    isSuspended: false,
    createdAt: nowIso(),
  },
  {
    id: "creator_2",
    userId: "user_creator_2",
    handle: "nova",
    displayName: "Nova Rae",
    bio: "Late-night art sessions and studio previews.",
    avatarUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80",
    headerUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    tags: ["art", "studio", "painting"],
    kycStatus: "approved",
    isSuspended: false,
    createdAt: nowIso(),
  },
  {
    id: "creator_3",
    userId: "user_creator_3",
    handle: "kai",
    displayName: "Kai Ember",
    bio: "New creator, pending verification.",
    avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
    headerUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    tags: ["music", "studio"],
    kycStatus: "pending",
    isSuspended: false,
    createdAt: nowIso(),
  },
];

const plans: Plan[] = creators.flatMap((creator, index) =>
  [
    {
      id: id(`plan_${creator.id}`, 1),
      creatorId: creator.id,
      name: "Core",
      monthlyPrice: 1200 + index * 200,
      benefits: ["Weekly drops", "Member-only chat", "Early access"],
      isActive: creator.kycStatus === "approved",
      createdAt: nowIso(),
    },
    {
      id: id(`plan_${creator.id}`, 2),
      creatorId: creator.id,
      name: "Studio",
      monthlyPrice: 2400 + index * 200,
      benefits: ["All Core perks", "Monthly live", "Full archive"],
      isActive: creator.kycStatus === "approved",
      createdAt: nowIso(),
    },
  ]
);

const posts: Post[] = creators.flatMap((creator, creatorIndex) =>
  Array.from({ length: 8 }, (_, index) => {
    const postId = id(`post_${creator.id}`, index + 1);
    const access =
      index % 3 === 0
        ? { kind: "free" as const }
        : index % 3 === 1
          ? {
              kind: "plan_only" as const,
              planIds: plans
                .filter((plan) => plan.creatorId === creator.id)
                .map((plan) => plan.id),
            }
          : {
              kind: "ppv" as const,
              price: 900 + creatorIndex * 100,
              planDiscountPercent: 20,
            };
    return {
      id: postId,
      creatorId: creator.id,
      title: `Session ${index + 1} — ${creator.displayName}`,
      description: "A focused segment with highlights and commentary.",
      tags: ["exclusive", "update"],
      access,
      published: creator.kycStatus === "approved",
      publishedAt: creator.kycStatus === "approved" ? nowIso() : undefined,
      createdAt: nowIso(),
    };
  })
);

const assets: PostAsset[] = posts.map((post) => ({
  id: `asset_${post.id}`,
  postId: post.id,
  type: "thumbnail",
  url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  createdAt: nowIso(),
}));

export const mockState: MockState = {
  users: [adminUser, viewerUser, ...creatorUsers],
  creators,
  plans,
  posts,
  assets,
  subscriptions: [],
  entitlements: [],
  orders: [],
  ledger: [],
  reports: [],
  payouts: {
    batches: [],
    transfers: [],
  },
  timeOffsetDays: 0,
};

export const getNow = () => offsetIso(mockState.timeOffsetDays);

export const getCurrentUser = () => viewerUser;

export const computeOrder = (userId: string, items: OrderItem[]) => {
  const contentSubtotal = items.reduce((sum, item) => sum + item.price, 0);
  const purchaseFee = calcFee(contentSubtotal);
  const totalCharged = contentSubtotal + purchaseFee;
  const order: Order = {
    id: `order_${mockState.orders.length + 1}`,
    userId,
    items,
    contentSubtotal,
    purchaseFee,
    totalCharged,
    status: "paid",
    createdAt: getNow(),
    paidAt: getNow(),
  };
  return order;
};

const addLedgerForOrder = (order: Order) => {
  order.items.forEach((item) => {
    const creatorShare = round(item.price * 0.8);
    const platformShare = item.price - creatorShare;
    const reserveHold = round(creatorShare * 0.1);
    const availableNow = creatorShare - reserveHold;

    const earn: LedgerEntry = {
      id: `ledger_${mockState.ledger.length + 1}`,
      creatorId: item.creatorId,
      orderId: order.id,
      type: "earn",
      grossContent: item.price,
      creatorShare,
      platformShare,
      reserveAmount: 0,
      availableDelta: availableNow,
      status: "available",
      createdAt: getNow(),
    };

    const hold: LedgerEntry = {
      id: `ledger_${mockState.ledger.length + 2}`,
      creatorId: item.creatorId,
      orderId: order.id,
      type: "reserve_hold",
      grossContent: item.price,
      creatorShare,
      platformShare,
      reserveAmount: reserveHold,
      availableDelta: 0,
      status: "pending",
      availableAt: offsetIso(mockState.timeOffsetDays + 30),
      createdAt: getNow(),
    };

    const release: LedgerEntry = {
      id: `ledger_${mockState.ledger.length + 3}`,
      creatorId: item.creatorId,
      orderId: order.id,
      type: "reserve_release",
      grossContent: item.price,
      creatorShare,
      platformShare,
      reserveAmount: reserveHold,
      availableDelta: reserveHold,
      status: "pending",
      availableAt: offsetIso(mockState.timeOffsetDays + 30),
      createdAt: getNow(),
    };

    mockState.ledger.push(earn, hold, release);
  });
};

export const checkout = (userId: string, items: OrderItem[]) => {
  const order = computeOrder(userId, items);
  mockState.orders.push(order);

  items.forEach((item) => {
    if (item.kind === "subscription") {
      const subscription: Subscription = {
        id: `sub_${mockState.subscriptions.length + 1}`,
        userId,
        creatorId: item.creatorId,
        planId: item.planId,
        status: "active",
        currentPeriodStart: getNow(),
        currentPeriodEnd: offsetIso(mockState.timeOffsetDays + 30),
        createdAt: getNow(),
      };
      mockState.subscriptions.push(subscription);
      mockState.entitlements.push({
        id: `ent_${mockState.entitlements.length + 1}`,
        userId,
        creatorId: item.creatorId,
        planId: item.planId,
        type: "subscription",
        status: "active",
        createdAt: getNow(),
      });
    }

    if (item.kind === "ppv") {
      mockState.entitlements.push({
        id: `ent_${mockState.entitlements.length + 1}`,
        userId,
        creatorId: item.creatorId,
        postId: item.postId,
        type: "ppv",
        status: "active",
        createdAt: getNow(),
      });
    }
  });

  addLedgerForOrder(order);
  return order;
};

export const applyRefund = (orderId: string, type: "refund" | "chargeback") => {
  const order = mockState.orders.find((entry) => entry.id === orderId);
  if (!order) return null;
  order.status = type === "refund" ? "refunded" : "chargeback";

  order.items.forEach((item) => {
    const creatorShare = round(item.price * 0.8);
    const platformShare = item.price - creatorShare;
    const entry: LedgerEntry = {
      id: `ledger_${mockState.ledger.length + 1}`,
      creatorId: item.creatorId,
      orderId: order.id,
      type: type === "refund" ? "refund_deduct" : "cb_deduct",
      grossContent: item.price,
      creatorShare,
      platformShare,
      reserveAmount: 0,
      availableDelta: -creatorShare,
      status: "available",
      createdAt: getNow(),
      note: `${type} processed`,
    };
    mockState.ledger.push(entry);
  });

  return order;
};

export const computeBalances = (creatorId: string) => {
  const ledger = mockState.ledger.filter((entry) => entry.creatorId === creatorId);
  const availableBalance = ledger.reduce((sum, entry) => sum + entry.availableDelta, 0);
  const reserveBalance = ledger
    .filter((entry) => entry.type === "reserve_hold")
    .reduce((sum, entry) => sum + entry.reserveAmount, 0);
  const totalLifetime = ledger.reduce((sum, entry) => sum + entry.creatorShare, 0);
  return { availableBalance, reserveBalance, totalLifetime };
};

export const runPayoutBatch = () => {
  const runAt = getNow();
  const batch: PayoutBatch = {
    id: `batch_${mockState.payouts.batches.length + 1}`,
    periodStart: offsetIso(mockState.timeOffsetDays - 15),
    periodEnd: runAt,
    runAt,
    status: "completed",
  };

  const transfers: PayoutTransfer[] = creators
    .filter((creator) => creator.kycStatus === "approved")
    .map((creator) => {
      const balance = computeBalances(creator.id).availableBalance;
      const transfer: PayoutTransfer = {
        id: `transfer_${mockState.payouts.transfers.length + 1}`,
        batchId: batch.id,
        creatorId: creator.id,
        amount: Math.max(0, balance),
        status: "paid",
        createdAt: runAt,
      };
      if (transfer.amount > 0) {
        mockState.ledger.push({
          id: `ledger_${mockState.ledger.length + 1}`,
          creatorId: creator.id,
          type: "adjustment",
          grossContent: 0,
          creatorShare: 0,
          platformShare: 0,
          reserveAmount: 0,
          availableDelta: -transfer.amount,
          status: "available",
          createdAt: runAt,
          note: `Payout batch ${batch.id}`,
        });
      }
      return transfer;
    });

  mockState.payouts.batches.push(batch);
  mockState.payouts.transfers.push(...transfers);
  return { batch, transfers };
};

export const advanceTime = (days: number) => {
  mockState.timeOffsetDays += days;
  const now = new Date(getNow());
  mockState.ledger.forEach((entry) => {
    if (entry.type === "reserve_release" && entry.availableAt) {
      const availableAt = new Date(entry.availableAt);
      if (availableAt <= now && entry.status === "pending") {
        entry.status = "available";
      }
    }
  });
};

export const getCreatorById = (creatorId: string) =>
  mockState.creators.find((creator) => creator.id === creatorId);

export const getPlansByCreator = (creatorId: string) =>
  mockState.plans.filter((plan) => plan.creatorId === creatorId && plan.isActive);

export const getPostsByCreator = (creatorId: string) =>
  mockState.posts.filter((post) => post.creatorId === creatorId && post.published);

export const getPostById = (postId: string) =>
  mockState.posts.find((post) => post.id === postId);

export const getAssetsByPost = (postId: string) =>
  mockState.assets.filter((asset) => asset.postId === postId);
