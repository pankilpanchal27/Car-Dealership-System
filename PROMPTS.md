# PROMPTS.md — AI Tooling Chat History

This file documents the prompts I wrote to Antigravity IDE (powered by Gemini / Claude Sonnet 4.6) during development of this project, as required by the assessment.

---

## Session Overview

**Tool Used:** Antigravity IDE (Google DeepMind)
**Models Used:** Gemini 2.5 Pro, Claude Sonnet 4.6 (Thinking)
**Date:** July 23, 2026

---

## Prompt 1 — Initial Assessment Analysis

**Prompt:**
> I've got one assessment from the company which follows the strict TDD (red green refactor) structure. I've attached the screenshot of commit history for your reference. The project is not yet pushed to the github, it is running on local git history. Please go through the text i've given below, it is the assessment which i've to complete. Now go through the current project's backend and frontend to identify if any missing features or mistakes then correct it or add it and complete my project from where I have left, with the proper TDD (red-green-refactor) approach which I was following earlier in the screenshot.
>
> [Full assessment text included...]

**AI Response:**
- Analyzed all existing backend files: `app.ts`, `server.ts`, controllers, services, models, middleware, routes, tests
- Analyzed all existing frontend files: pages, components, context, services, api, test files
- Ran both test suites (`npm test` backend = 13 passing, `npm test -- --run` frontend = 19 passing)
- Created a detailed implementation plan identifying gaps:
  - Backend: missing price-range search, weak admin middleware tests, no login failure test, debug logs
  - Frontend: no purchase button, no admin CRUD UI, no role in AuthContext, no Navbar/logout, weak design, missing docs

---

## Prompt 2 — Approval + Execution

**Prompt:**
> [User approved the implementation plan via "Proceed" button]

**AI Response:**
- Created task.md for tracking
- Began Phase 1: Backend TDD

---

## Prompt 3 — Commit Discipline Instruction

**Prompt:**
> Include AI co-author commits as mentioned in the assessment. Also keep in mind to commit after every feature's red test and green feat.

**AI Response:**
- Acknowledged and adjusted commit workflow to: 1 commit per RED, 1 commit per GREEN, per feature
- Added `Co-authored-by: Antigravity <AI@users.noreply.github.com>` to every commit

---

## Detailed Prompts by Feature

### Backend: Price Range Search

**My Prompt:**
> Write failing RED tests for price-range search — minPrice and maxPrice filters in GET /api/vehicles/search

**AI Generated:**
- 3 new test cases in `searchVehicle.test.ts`: minPrice filter, maxPrice filter, price-range filter
- Seeded `beforeEach` with 3 vehicles at different price points

**My Review:**
- Verified tests actually failed (received `3`, expected `2`)
- Committed as RED

**Implementation prompt:**
> Implement minPrice/maxPrice in vehicle.service.ts using MongoDB $gte/$lte operators

**AI Generated:**
- Extended `searchVehicles` to accept `minPrice?/maxPrice?`
- Built `priceFilter` object with `$gte`/`$lte` conditionally
- Updated `searchVehiclesHandler` to parse `Number(minPrice)` from query string

---

### Backend: Admin Middleware Tests

**My Prompt:**
> Replace the stub admin middleware test with real behavior tests: block non-admin (403), allow admin (200), block non-admin restock (403)

**AI Generated:**
- Full integration tests hitting DELETE and POST restock endpoints with user/admin JWTs
- No implementation changes needed — middleware already correct

---

### Backend: Login Failure Cases

**My Prompt:**
> Add failing tests for wrong password (401) and non-existent email (401) to login.test.ts

**AI Generated:**
- Two new `it()` blocks in `login.test.ts`
- These passed immediately since the service already threw "Invalid email or password"

---

### Frontend: AuthContext with Role

**My Prompt:**
> Extend AuthContext to include user object with role, decoded from JWT on login

**AI Generated:**
- `AuthUser` interface `{ id: string; role: "user" | "admin" }`
- `decodeToken(token)` function using `atob(token.split('.')[1])`
- `user` state in `AuthProvider`, populated on login, cleared on logout
- New test: `decodes user role from JWT token on login`

---

### Frontend: Navbar

**My Prompt:**
> Write RED tests for Navbar: branding, logout button, admin badge visibility. Then implement Navbar.

**AI Generated (Tests - RED):**
- 5 tests: branding text, logout button present, logout called on click, admin badge for admin, no badge for user

**AI Generated (Implementation - GREEN):**
- Sticky header with glassmorphism (`bg-gray-900/80 backdrop-blur-md`)
- Conditional `data-testid="admin-badge"` span with amber styling
- `onClick={onLogout}` button

---

### Frontend: VehicleCard with Purchase Button

**My Prompt:**
> Write RED tests for VehicleCard: purchase button enabled when quantity > 0, disabled (Out of Stock) when 0, admin Edit/Delete visible only to admins

**AI Generated (Tests - RED):**
- 5 tests covering all cases
- Uses `isAdmin`, `onPurchase`, `onEdit`, `onDelete` props

**AI Generated (Implementation - GREEN):**
- `inStock = vehicle.quantity > 0`
- Purchase button: `disabled={!inStock}`, text changes to "Out of Stock"
- Admin section: conditional `{isAdmin && (<div>Edit | Delete</div>)}`
- Stock badge in top-right corner

---

### Frontend: AddVehicleModal

**My Prompt:**
> Write RED tests for AddVehicleModal: hidden when isOpen=false, renders form when open, calls onAdd with parsed data, calls onClose on cancel

**AI Generated (Tests - RED):**
- 4 tests including form submission with numeric parsing

**AI Generated (Implementation - GREEN):**
- `role="dialog"` for accessibility
- All 5 fields with `aria-label` for Testing Library queries
- `onAdd({ ..., price: Number(price), quantity: Number(quantity) })`
- Reset form state on success

---

### Frontend: EditVehicleModal

**My Prompt:**
> Write RED tests for EditVehicleModal: hidden when closed, pre-fills from vehicle prop, calls onSave with updated data, closes on cancel

**AI Generated (Tests - RED):**
- 4 tests including pre-fill check `(input as HTMLInputElement).value`

**AI Generated (Implementation - GREEN):**
- `useEffect` re-populates fields when `vehicle` prop changes
- `role="dialog"` with matching `aria-label` attributes

---

### Frontend: VehicleList Prop Forwarding

**My Prompt:**
> Write RED test that VehicleList shows admin Edit buttons when isAdmin=true. Then update VehicleList.

**AI Generated:**
- 2 tests, responsive grid layout (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`)

---

### Frontend: Dashboard Integration

**My Prompt:**
> Write RED tests for Dashboard: purchase calls purchaseVehicle(id, 1) and refreshes list, Add Vehicle button shows for admin only. Then implement.

**AI Generated (Tests - RED):**
- `renderWithAuth()` helper that wraps with AuthContext.Provider
- Tests for purchase flow and admin button visibility

**AI Generated (Implementation - GREEN):**
- `handlePurchase(id)` → `purchaseVehicle(id, 1)` → `loadVehicles()`
- `handleAdd()`, `handleSaveEdit()`, `handleDelete()` wired to modals
- Loading skeleton (8 animated pulse divs), empty-state with 🚗 emoji

---

### Design Polish

**My Prompt:**
> Rebuild Login, Register, SearchBar with premium dark glassmorphism UI. Add Inter font via Google Fonts. Update index.css and index.html.

**AI Generated:**
- Login/Register: ambient gradient glows, glassmorphism card, Inter font, loading states, cross-page links
- SearchBar: dark theme, 5-column responsive grid, Enter-key support, min/max price inputs
- index.css: global Inter font, dark body, custom scrollbar
- index.html: SEO title, meta description, Google Fonts preconnect

---

## Summary Statistics

| Metric | Before | After |
|---|---|---|
| Backend tests | 13 | 21 |
| Frontend tests | 19 | 41 |
| Backend test files | 12 | 12 |
| Frontend test files | 12 | 15 |
| TDD RED commits | 0 new | 5 new |
| TDD GREEN commits | 0 new | 8 new |
| TDD REFACTOR commits | 0 new | 1 new |

All commits include `Co-authored-by: Antigravity <AI@users.noreply.github.com>`.
