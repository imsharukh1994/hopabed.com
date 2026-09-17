# BedHopper Digital Wallet Pass — Implementation Plan

## Project Architecture Summary

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite (SPA, tab-based routing via `activeTab` state) |
| Backend | Supabase (PostgreSQL + RLS) — direct client-side queries via `@supabase/supabase-js` |
| Auth | Custom session stored in `localStorage` as `bedhopper_user` |
| State | React `useState` in `App.jsx` (props drilled down) |
| Styling | Vanilla CSS (`index.css` design tokens) + inline styles |
| Icons | `lucide-react` |
| QR Code | **New:** `qrcode` npm package (lightweight, no canvas dep) |
| PNG Export | **New:** `html2canvas` npm package |

> [!NOTE]
> The app has **no server-side backend** — all "API" calls go directly to Supabase via the anon key. There is no Express/Node server to add middleware to. All authorization must be enforced via Supabase RLS policies and client-side guards.

---

## Open Questions

> [!IMPORTANT]
> **No backend server exists** — the QR verification page `/verify/pass/:token` cannot be a real server-side route. It will be implemented as a tab-based route (`activeTab === 'verify-pass'`) with the token passed as state, matching the existing SPA pattern. Public verification via a sharable URL will use `window.location.hash` or a URL parameter approach.

> [!IMPORTANT]
> **Booking approval workflow**: The current app has no host-approval flow — bookings go directly to "Confirmed". The plan adds a **pending → approved** workflow with host approval on the HostDashboard, and auto-generates a digital pass upon approval.

---

## Proposed Changes

### 1. Database — New Supabase Tables

#### [NEW] SQL Migration: `digital_passes`, `check_ins`, `pass_audit_logs`

```sql
-- digital_passes table
CREATE TABLE IF NOT EXISTS digital_passes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id VARCHAR(50) NOT NULL,
  guest_id TEXT,
  host_id TEXT,
  listing_id TEXT,
  pass_code VARCHAR(30) UNIQUE NOT NULL,     -- BH-PASS-XXXXXXXX
  pass_hash TEXT NOT NULL,                   -- SHA-256 of pass_code + secret
  qr_token TEXT UNIQUE NOT NULL,             -- secure random token for QR URL
  status VARCHAR(30) DEFAULT 'ACTIVE',       -- ACTIVE, CHECKED_IN, CHECKED_OUT, CANCELLED, EXPIRED
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  checked_in_at TIMESTAMPTZ,
  checked_out_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- check_ins table
CREATE TABLE IF NOT EXISTS check_ins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pass_id UUID REFERENCES digital_passes(id),
  booking_id TEXT,
  verified_by TEXT,
  verification_method VARCHAR(50) DEFAULT 'qr_scan',
  verified_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- pass_audit_logs table
CREATE TABLE IF NOT EXISTS pass_audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pass_id UUID REFERENCES digital_passes(id),
  action VARCHAR(100) NOT NULL,
  performed_by TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

Also adds `node_code` column to `listings` table:
```sql
ALTER TABLE listings ADD COLUMN IF NOT EXISTS node_code VARCHAR(20) UNIQUE;
```

And adds `booking_status` to `bookings`:
```sql
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS booking_status VARCHAR(50) DEFAULT 'PENDING_HOST_APPROVAL';
```

---

### 2. Service Layer — Pass Database Service

#### [MODIFY] [dbService.js](file:///d:/Shaharukh_projects/BedHope/src/services/dbService.js)

No changes — new pass functions go into a dedicated file.

#### [NEW] `src/services/passService.js`

All Supabase CRUD for digital passes:
- `generateDigitalPass(booking, listing, guest, host)` — creates pass record
- `getPassByQrToken(token)` — public verification lookup
- `getMyPasses(guestId)` — fetch traveler's passes
- `confirmCheckIn(passId, hostId)` — with ownership validation
- `confirmCheckOut(passId, hostId)` — with ownership validation
- `cancelPass(passId)` — when booking cancelled

Token generation (client-side using `crypto.getRandomValues`):
- `pass_code`: `BH-PASS-` + 8 uppercase hex chars
- `qr_token`: 32-char URL-safe random string
- `pass_hash`: `btoa(pass_code + booking_id)` (no server secret available)
- `node_code`: `BH-` + 6 uppercase alphanum chars

---

### 3. Updated Booking Workflow

#### [MODIFY] [mockData.js](file:///d:/Shaharukh_projects/BedHope/src/data/mockData.js)

Add `bookingStatus` field to `INITIAL_BOOKINGS`:
- Booking 1: `bookingStatus: 'PASS_ACTIVE'` (already confirmed + has pass)
- Booking 2: `bookingStatus: 'PASS_ACTIVE'` (same)

Add `nodeCode` to `INITIAL_LISTINGS` (e.g. `BH-WLJGRX`).

Add `digitalPass` object to bookings with pre-generated pass data for demo mode.

#### [MODIFY] [BookingFlowModal.jsx](file:///d:/Shaharukh_projects/BedHope/src/pages/BookingFlowModal.jsx)

Change new booking `status` from `'Confirmed'` → `bookingStatus: 'PENDING_HOST_APPROVAL'`.

#### [MODIFY] [App.jsx](file:///d:/Shaharukh_projects/BedHope/src/App.jsx)

- Add `activeTab === 'my-passes'` route → new `MyPassesPage`
- Add `activeTab === 'verify-pass'` route → new `PassVerificationPage`
- Add `verifyPassToken` state for URL-based QR verification
- Pass `currentUser` to TripsPage and HostDashboard
- Add `handleApproveBooking` → generates pass on host approval

---

### 4. Frontend Pages & Components

#### [MODIFY] [DigitalPassModal.jsx](file:///d:/Shaharukh_projects/BedHope/src/components/DigitalPassModal.jsx)

Complete rewrite to:
- Show real QR code using `qrcode` library
- Show all booking data (guest, host, property, dates, node code, pass ID)
- Show offline status indicator
- Download PNG via `html2canvas`
- Print via `window.print()` with `@media print` CSS
- Share via Web Share API with fallback copy-link
- Save pass data to `localStorage` for offline access
- Display `OFFLINE MODE` when `navigator.onLine === false`
- Handle all states: Loading, Pending, Active, Checked-in, Cancelled, etc.

#### [NEW] `src/pages/MyPassesPage.jsx`

Traveler dashboard of all passes with:
- Active pass cards showing property, dates, status
- "View Pass" button → opens DigitalPassModal
- Empty state if no passes

#### [NEW] `src/pages/PassVerificationPage.jsx`

Public QR verification page:
- Reads `qrToken` from props/state
- Calls `getPassByQrToken(token)` via Supabase
- Shows: guest name, host name, property, dates, node code, status
- Authenticated hosts see `[Confirm Check-in]` / `[Confirm Check-out]` buttons
- Validates: host owns the booking, pass is ACTIVE, date is within window
- All states: VERIFIED ✓, INVALID ✕, CANCELLED ✕, EXPIRED ✕

#### [MODIFY] [TripsPage.jsx](file:///d:/Shaharukh_projects/BedHope/src/pages/TripsPage.jsx)

- Show booking status (PENDING_HOST_APPROVAL, PASS_ACTIVE, etc.)
- Show `⏳ Waiting for Host Approval` or `✓ View Digital Pass` based on `bookingStatus`
- Only show Pass button when `bookingStatus === 'PASS_ACTIVE'`

#### [MODIFY] [HostDashboard.jsx](file:///d:/Shaharukh_projects/BedHope/src/pages/HostDashboard.jsx)

- Show pending booking requests with `[Approve]` / `[Reject]` buttons
- On approve: call `generateDigitalPass()` → update booking status
- Show check-in queue with pass status

#### [MODIFY] [Navbar.jsx](file:///d:/Shaharukh_projects/BedHope/src/components/Navbar.jsx)

Add `My Digital Passes` menu item in user dropdown (→ `my-passes` tab).

#### [MODIFY] [MobileNav.jsx](file:///d:/Shaharukh_projects/BedHope/src/components/MobileNav.jsx)

Add passes icon in mobile nav.

---

### 5. Offline Support

#### [MODIFY] [DigitalPassModal.jsx](file:///d:/Shaharukh_projects/BedHope/src/components/DigitalPassModal.jsx)

When pass is viewed:
- Store sanitized pass data in `localStorage` under key `bedhopper_pass_<passCode>`
- On modal open, check `navigator.onLine` 
- If offline, render from `localStorage` cache
- Show `✓ Offline Pass Available` badge when cached
- Show `OFFLINE MODE — Last synchronized: <timestamp>` when offline

---

### 6. PNG Download

Use `html2canvas` to capture the pass card div and download as PNG.

Filename: `HopaBed-BedHopper-Pass-<pass_code>.png`

---

### 7. Print Support

Add `@media print` styles in `index.css` that:
- Hide everything except `.digital-pass-print-area`
- Force white background + dark text
- Scale pass to fill page

---

### 8. New Dependencies

```json
"qrcode": "^1.5.3",
"html2canvas": "^1.4.1"
```

---

## Verification Plan

### Automated
- Install dependencies: `npm install qrcode html2canvas`
- Build check: `npm run build`

### Manual Flow Tests
1. Create a booking → status = `PENDING_HOST_APPROVAL`
2. Host approves → pass generated, status = `PASS_ACTIVE`
3. Guest views pass → QR code visible, all data correct
4. Scan QR → verification page shows correct info
5. Host confirms check-in → status = `CHECKED_IN`
6. Host confirms check-out → status = `CHECKED_OUT`
7. Cancel booking → `PASS_CANCELLED`, QR shows invalid
8. Offline test → pass viewable from localStorage cache
9. Download PNG → valid PNG with all pass info
10. Print → only pass prints, not full page
11. Share → Web Share API or copy link

---

## Files Changed Summary

| File | Action |
|---|---|
| `src/services/passService.js` | NEW |
| `src/pages/MyPassesPage.jsx` | NEW |
| `src/pages/PassVerificationPage.jsx` | NEW |
| `src/components/DigitalPassModal.jsx` | MODIFY (major rewrite) |
| `src/pages/TripsPage.jsx` | MODIFY |
| `src/pages/HostDashboard.jsx` | MODIFY |
| `src/components/Navbar.jsx` | MODIFY |
| `src/components/MobileNav.jsx` | MODIFY |
| `src/App.jsx` | MODIFY |
| `src/data/mockData.js` | MODIFY |
| `src/index.css` | MODIFY (print styles) |
| `schema.sql` | MODIFY (new tables) |
