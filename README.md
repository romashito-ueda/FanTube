# FanTube

Creator subscription + PPV video platform demo (React + TypeScript + Vite).

## Monorepo structure
- `apps/web`: frontend app (React, Ant Design, styled-components, TanStack Query)
- `apps/mocks`: MSW mock server (realistic state transitions)
- `packages/shared`: shared types, DTOs, and Zod schemas

## Scripts
```bash
pnpm install
pnpm dev
```

## Routes
Public / Viewer
- `/` — Explore
- `/c/:creatorId` — Creator profile
- `/p/:postId` — Post detail
- `/checkout` — Checkout
- `/library` — Library
- `/settings` — Settings

Creator
- `/creator/dashboard`
- `/creator/posts/new`
- `/creator/posts/:postId/edit`
- `/creator/plans`
- `/creator/earnings`

Admin
- `/admin/creators`
- `/admin/moderation`
- `/admin/payouts`

## Mock admin actions
The mock server uses MSW with in-memory state transitions.

- **Run payout batch**: `/admin/payouts` → “Run payout batch” button.
- **Advance time +30 days**: `/admin/payouts` → “Advance time +30 days” button to release reserve entries.
- **Refund / chargeback**: use `POST /api/admin/refunds/apply` with `{ orderId, type }` payload.

## Business rules reflected
- Creator revenue share 80% (platform fee 20%).
- Purchase fee is added on top of content price (r=4%, f=30 JPY, cap=500 JPY).
- Reserve hold 10% for 30 days; release simulated with advance-time action.
- Payout batches aggregate available balances twice per month (mocked by action button).
