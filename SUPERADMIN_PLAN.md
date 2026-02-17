# Dastiyor Superadmin – What to Add & What’s Left

This plan aligns the **dastiyor-admin** (superadmin) with the [Dastiyor marketplace](https://github.com/BalwinderCa/dastiyor) and the project spec (`project_requirements.md`).

---

## 1. Current state

### Implemented (done)

| Area | Status | Notes |
|------|--------|--------|
| **Dashboard** | Done | Stats (users, tasks, open/completed, reviews, subscriptions), donut chart, recent tasks/users, area chart (mock series) |
| **Users** | Done | List with pagination/filter/sort, Add/Edit/Delete, roles (CUSTOMER/PROVIDER/ADMIN), verified flag |
| **Tasks** | Done | List with pagination/filter, Add/Edit/Delete, status, category, author |
| **API: stats** | Done | `GET /api/stats` |
| **API: users** | Done | `GET/POST /api/users`, `GET/PUT/DELETE /api/users/[id]` |
| **API: tasks** | Done | `GET/POST /api/tasks`, `GET/PUT/DELETE /api/tasks/[id]` |
| **API: reviews** | Done | `GET /api/reviews` (list only) |
| **API: subscriptions** | Done | `GET /api/subscriptions` (list only) |
| **Sidebar menu** | Done | All admin sections linked (some pages are stubs) |

### Stub pages (UI only, no real data/actions)

- **Categories** – Table shell; “content will come from API”.
- **Subscriptions & payments** – Table + payment card; no API wiring.
- **Reviews & complaints** – Table shell; not wired to `GET /api/reviews`.
- **Moderation** – Three cards (Tasks / Profiles / Reports); no backend.

### Partially done

- **Calendar** – FullCalendar with Redux + mock events; not linked to Dastiyor (e.g. tasks by due date).
- **Auth** – Login form and redirect exist; auth is **client-only** (localStorage + Redux, no JWT/DB). Any user can call admin APIs.

---

## 2. What to add in superadmin (priority order)

### P0 – Security and auth

1. **Backend admin auth**
   - Admin login against DB (e.g. users with `role === "ADMIN"`), JWT or session.
   - Protect all `/api/*` admin routes: require valid admin session/JWT.
   - Protect dashboard routes: redirect to login if not admin (in addition to current client check).

2. **API protection**
   - Middleware or per-route checks so only authenticated admins can access:
     - `/api/users`, `/api/tasks`, `/api/stats`, `/api/reviews`, `/api/subscriptions`, etc.
   - Optional: rate limiting and audit log for sensitive actions.

---

### P1 – Wire existing APIs and fill stub pages

3. **Reviews page**
   - Use existing `GET /api/reviews`.
   - Table: From (reviewer), To (reviewed), Task, Rating, Comment, Date.
   - Optional: “Hide review” (needs `PATCH /api/reviews/[id]` and a `hidden` flag in DB if you add it).

4. **Subscriptions page**
   - Use existing `GET /api/subscriptions` (with `?active=true|false`).
   - Table: User, Plan, Start/End date, Active.
   - Actions: “Extend”, “Cancel” (need `PATCH /api/subscriptions/[id]` or equivalent).
   - Optional: “Manual activate” for support (create subscription via API).

5. **Categories**
   - **Option A (no schema change):** Categories stay as free text on `Task`. Admin page: manage a **config list** (e.g. JSON in DB or env) of allowed category + subcategory labels; use in dropdowns on main app. No Prisma model.
   - **Option B (schema change):** Add `Category` (and optionally `Subcategory`) model, migrate `Task.category` to `categoryId` FK. Admin: full CRUD categories/subcategories; main app uses same schema.
   - Implement chosen option + API + Categories page (list, add, edit, delete, reorder if needed).

---

### P2 – Features from Dastiyor that admin should manage

6. **Responses**
   - **API:** `GET /api/responses` (with filters e.g. by task, by user, status).
   - **Admin UI:** Either a “Responses” sub-section under Tasks (e.g. task detail → list responses) or a dedicated “Responses” page: Task, Provider, Price, Message, Status (PENDING/ACCEPTED/REJECTED), Date.
   - No need to “accept” from admin unless you want support to act on behalf of customer; view-only is enough for transparency.

7. **Notifications (platform view)**
   - **API:** `GET /api/notifications` (all or by user) for admin.
   - **Admin UI:** Simple list: User, Type, Title/Message, Read, Date. Optional: “Mark all as read” or “Send broadcast” if you add that later.

8. **Moderation**
   - **Backend:** Define what “pending” means (e.g. task status `PENDING_REVIEW`, or a `Report` model for user-reported tasks/profiles).
   - **API:** List pending tasks / reported items; endpoints to approve/reject/ban.
   - **Admin:** Moderation page with queue and actions (approve, reject, ban user, etc.).

9. **Calendar (Dastiyor data)**
   - Replace or supplement mock events with:
     - Tasks by `dueDate` and/or `createdAt` (e.g. “Task due” / “Task created”).
   - Optional: “Completed” events from `Task` where `status === "COMPLETED"` and you store completion date (or `updatedAt`).

---

### P3 – Settings, payments, and extras

10. **System settings**
    - **Company / Profile / Payment** (under Settings): Either wire to DB (e.g. `SystemSetting` key-value or a small “Company” table) or keep as docs/placeholders for env vars (e.g. Stripe keys, company name). No need to duplicate main app’s profile; this is admin “company” settings.

11. **Payments**
    - If the main app has a **Payment** or **Transaction** model, add:
      - `GET /api/payments` (or `/api/transactions`) and optionally filter by user/subscription.
      - Admin page: table (user, amount, type, date, status). If no model yet, keep current “Connect payment provider” placeholder and add payment history when the main app has it.

12. **Complaints / reports**
    - If you add a **Report** or **Complaint** model (reporter, target task/user, reason, status), add admin API + Moderation (or “Reports”) tab to handle them.

13. **Dashboard improvements**
    - Replace mock “Tasks Created” series in BasicArea with real time-series from DB (e.g. tasks per day/week).
    - Optional: revenue/subscription metrics when payments exist.

---

## 3. What’s left (summary)

| Item | Priority | Effort |
|------|----------|--------|
| Backend admin auth + API protection | P0 | Medium |
| Wire Reviews page to API | P1 | Small |
| Wire Subscriptions page + extend/cancel API | P1 | Small |
| Categories (config or Category model + CRUD) | P1 | Medium |
| Responses API + admin list/detail | P2 | Small–Medium |
| Notifications list API + page | P2 | Small |
| Moderation queue (backend + UI) | P2 | Medium |
| Calendar from tasks (due/completed) | P2 | Small |
| System settings (DB or placeholder) | P3 | Small |
| Payment history (when main app has payments) | P3 | Small |
| Reports/complaints model + moderation | P3 | Medium |
| Dashboard real charts | P3 | Small |

---

## 4. Suggested implementation order

1. **P0:** Auth (admin login vs DB, JWT/session, protect `/api/*` and dashboard).
2. **P1:** Reviews page → Subscriptions page (with extend/cancel) → Categories (choose Option A or B and implement).
3. **P2:** Responses API + UI → Notifications list → Moderation (model + API + UI) → Calendar from tasks.
4. **P3:** System settings, payment history when available, reports if needed, dashboard real data.

This keeps security first, then fills the existing menu items with real data and actions, then adds responses/notifications/moderation/calendar, and finally settings and payments/reports.

---

## 5. Reference

- Main app repo: [BalwinderCa/dastiyor](https://github.com/BalwinderCa/dastiyor)
- Main app README: dashboard, users, tasks, categories, subscriptions, reviews, moderation, system settings.
- Local spec: `project_requirements.md` (admin panel pages in §8.11, notifications §9, security §10).
