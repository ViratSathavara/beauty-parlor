# Beauty Parlor — Role-Based Access Control (RBAC) Architecture

## 1. Overview & Role Hierarchy

The platform implements a strict multi-tier Role-Based Access Control (RBAC) model. Privileges follow an escalating hierarchy:

```
[CUSTOMER]  <--  [STAFF]  <--  [ADMIN]  <--  [SUPER_ADMIN]
 (Self-Svc)      (Operations)   (Management)    (Full Ownership)
```

1. **`CUSTOMER`**: Public client. Can explore services, book appointments, make payments, manage their own profile, track loyalty rewards, redeem referral codes, and view personal receipts.
2. **`STAFF`**: Beautician / Salon Specialist. Can view assigned appointment rosters, review service notes, update progression status (`IN_PROGRESS`, `COMPLETED`), and view their individual work schedule. Has zero access to financial ledgers, catalog pricing, or other staff members' personal information.
3. **`ADMIN`**: Salon Operations Manager. Manages all bookings, schedules, customers, staff profiles, pricing, offers, packages, reviews, payments, CMS copy, and operational analytics.
4. **`SUPER_ADMIN`**: Salon Owner / Lead Executive. Possesses unrestricted access, including modifying audit logs, changing database configuration, assigning admin roles, and exporting complete customer databases.

---

## 2. Resource Permissions Matrix

| Resource Domain | Action | CUSTOMER | STAFF | ADMIN | SUPER_ADMIN |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Catalog & Services** | Read | Allowed | Allowed | Allowed | Allowed |
| | Create / Edit / Delete | Denied | Denied | Allowed | Allowed |
| **Appointments** | Book (Create) | Allowed | Denied | Allowed | Allowed |
| | View Own | Allowed | Allowed | Allowed | Allowed |
| | View All | Denied | Denied | Allowed | Allowed |
| | Update Status | Denied | Allowed (Assigned only) | Allowed | Allowed |
| | Reschedule / Cancel | Allowed (Policy constrained) | Denied | Allowed | Allowed |
| **Staff & Rosters** | View Public Profiles | Allowed | Allowed | Allowed | Allowed |
| | Manage Working Hours | Denied | Denied | Allowed | Allowed |
| | Manage Blocked Slots | Denied | Allowed (Own only) | Allowed | Allowed |
| | Create Staff Accounts | Denied | Denied | Allowed | Allowed |
| **Payments & Invoices**| View Own Invoices | Allowed | Denied | Allowed | Allowed |
| | View All Revenue | Denied | Denied | Allowed | Allowed |
| | Process Refunds | Denied | Denied | Allowed | Allowed |
| **Loyalty & Referrals**| View Personal Points | Allowed | Denied | Allowed | Allowed |
| | Manual Points Adjust | Denied | Denied | Allowed | Allowed |
| **Reviews** | Submit (Own Completed) | Allowed | Denied | Allowed | Allowed |
| | Moderate (Approve/Reject)| Denied | Denied | Allowed | Allowed |
| **Inquiries** | Submit Form | Allowed | Denied | Allowed | Allowed |
| | Triage & Update Notes | Denied | Denied | Allowed | Allowed |
| **CMS & Salon Settings**| View Public Settings | Allowed | Allowed | Allowed | Allowed |
| | Modify Settings / Copy | Denied | Denied | Allowed | Allowed |
| **Audit Logs & System** | View Audit Logs | Denied | Denied | Denied | Allowed |
| | Manage Admin Roles | Denied | Denied | Denied | Allowed |

---

## 3. Enforcement Layers

### 3.1 Edge Middleware Enforcement (`src/middleware.ts`)
The Edge Middleware verifies incoming request paths against route definitions using decoded JWT claims:

```typescript
const ROUTE_PERMISSIONS: Record<string, RoleName[]> = {
  '/admin': ['ADMIN', 'SUPER_ADMIN'],
  '/staff': ['STAFF', 'ADMIN', 'SUPER_ADMIN'],
  '/account': ['CUSTOMER', 'STAFF', 'ADMIN', 'SUPER_ADMIN'],
};
```

If an unauthorized role attempts to access a protected route, the middleware redirects to `/auth/unauthorized` or `/auth/login?callbackUrl=...`.

### 3.2 Service Layer RBAC Guards (`src/lib/auth/guards.ts`)
Edge middleware only protects route navigation. Server Actions and API Route Handlers must enforce programmatic role guards:

```typescript
export async function requireRole(allowedRoles: RoleName[]): Promise<SessionUser> {
  const session = await getSession();
  if (!session || !session.user) {
    throw new UnauthorizedException('Authentication required');
  }
  if (!allowedRoles.includes(session.user.role)) {
    throw new ForbiddenException('Insufficient permissions');
  }
  return session.user;
}
```
