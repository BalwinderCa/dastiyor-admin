# Dastiyor Superadmin – What’s Next (Pending, Add, Enhance)

After P0–P2 (auth, reviews, subscriptions, categories, responses, notifications, moderation, calendar), here’s what’s **pending**, what you can **add**, and what to **enhance**.

---

## Pending (not yet done)

| Item | Description | Effort |
|------|-------------|--------|
| **System settings (Company / Payment / Profile)** | Settings pages exist but don’t persist to DB. Add a `SystemSetting` key-value table or small Company/Payment config table and wire forms to save/load. | Small |
| **Payment history** | No Payment/Transaction model yet. When the main Dastiyor app adds payments, add `GET /api/payments` and an admin “Payments” table (user, amount, type, date, status). | Small (after main app) |
| **Reports / complaints** | No Report model. Add `Report` (reporter, target task/user, reason, status) and a Moderation “Reports” tab to list and resolve. | Medium |
| **Review moderation** | Reviews are view-only. Optional: add `hidden` (or `moderated`) on Review, `PATCH /api/reviews/[id]` to hide/unhide, and “Hide” on Reviews page. | Small |
| **Tasks list: filter by URL** | Moderation links to `/admin/tasks?status=OPEN` but Tasks page doesn’t read `status` from URL. Add `useSearchParams()` and pre-fill status filter. | Small |

---

## Add (new features)

| Feature | Description | Effort |
|---------|-------------|--------|
| **Task detail page** | Dedicated page `/admin/tasks/[id]` with full task info, responses list, assignee, status actions (e.g. complete/cancel). Link from Dashboard recent tasks and Moderation. | Medium |
| **User detail page** | `/admin/users/[id]` with profile, tasks created, responses, reviews, subscription. Link from Users table and Moderation. | Medium |
| **Export** | Export users, tasks, or responses to CSV/Excel from list pages (e.g. “Export” button using current filters). | Small |
| **Audit log** | Optional table `AdminAuditLog` (adminId, action, entityType, entityId, at). Log create/update/delete on users, tasks, categories, subscriptions. | Medium |
| **Broadcast notification** | “Send to all” or “Send to role” from Notifications page; API to create notifications for many users. | Small–Medium |
| **Categories ↔ Tasks** | Use admin Category list in Tasks form (dropdown from `GET /api/categories`) and optionally migrate Task to `categoryId` FK later. | Small |
| **Subscription plans config** | Admin UI to define plan names, duration, response limits, price (stored in config or DB). Subscriptions page then shows plan details from config. | Small |

---

## Enhance (improve existing)

| Area | Current | Enhancement |
|------|---------|-------------|
| **Dashboard chart** | “Tasks Created” area chart uses **mock data** `[12, 19, 15, …]`. | Replace with real time-series: e.g. tasks per day/week from DB (group by `createdAt`). |
| **Dashboard stats** | Good. | Optional: add “Revenue” or “Active subscriptions this month” when payments exist. |
| **Users table** | Role filter exists in API; UI has global search only. | Add role filter dropdown (Customer / Provider / Admin) and optional “Verified” filter. |
| **Tasks table** | Category is free text. | Add category dropdown (from `GET /api/categories`) when creating/editing task. |
| **Tasks table** | No direct link to task detail. | Add “View” link per row to `/admin/tasks/[id]` when detail page exists. |
| **Responses page** | View-only. | Optional: link “Task” to task detail; link “Provider” to user detail. |
| **Moderation** | Links to Tasks/Users list. | When task/user detail pages exist, link recent items to detail. Add “Verify” on unverified providers (call `PUT /api/users/[id]` with `isVerified: true`). |
| **Calendar** | Tasks by due date. | Optional: add “Created” events (different color); click event → open task detail. |
| **Auth** | Cookie-based JWT. | Optional: refresh token rotation; “Remember me” longer expiry; rate limit login endpoint. |
| **API** | No rate limiting. | Add rate limiting (e.g. `lib/rate-limit.js`) on login and sensitive routes. |
| **i18n** | RU/EN in locales. | Ensure all new admin strings (Responses, Notifications, etc.) exist in `constant/locales/ru.json` (and EN if used). |

---

## Suggested order

1. **Quick wins:** Tasks filter by URL (`?status=OPEN`); Categories dropdown in Tasks form; Dashboard chart real data.
2. **Settings:** Persist Company / Payment / Profile settings to DB.
3. **Detail pages:** Task detail and User detail for better navigation and actions.
4. **Reports:** Report model + Moderation “Reports” tab (when you need user-reported content).
5. **Payment history:** When main app has payments, add payments API + page.
6. **Polish:** Export, audit log, broadcast notification, review hide, rate limiting.

Use this list to pick the next sprint; **SUPERADMIN_PLAN.md** still has the original full plan and references.
