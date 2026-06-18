# Sports Club UI

A full-featured Angular 22 web application for managing a sports club — members, registrations, file uploads, and role-based access control. Built as the frontend counterpart to the [Sports Club REST API](https://github.com/StefanosMotsos/sports-club-api).

---

## Overview

Sports Club UI is a single-page application (SPA) that provides club administrators and staff with a complete interface for day-to-day club operations. It communicates with a Spring Boot REST API over JWT-authenticated HTTP requests and enforces role-based access directly in the browser using Angular route guards.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 22 |
| Language | TypeScript 6 |
| UI Components | Angular Material 22 |
| Styling | Bootstrap 5 + Bootstrap Icons |
| HTTP / Auth | Angular `HttpClient` + JWT (`jwt-decode`) |
| Testing | Vitest + Angular Testing Utilities |
| Build | Angular CLI 22 / `@angular/build` |
| Package Manager | npm 11 |

---

## Features

### Authentication
- JWT-based login — the token is stored in `localStorage` and automatically decoded to derive the logged-in user's identity and role.
- An `HttpInterceptor` (`auth-interceptor.service.ts`) attaches the `Authorization: Bearer <token>` header to every outgoing API request.
- Token expiry is checked client-side on every route activation; expired sessions are transparently logged out.

### Role-Based Access Control
Three route guard levels protect the application:

| Guard | Role required | Protected routes |
|---|---|---|
| `authGuard` | Any authenticated user | All non-public pages |
| `staffGuard` | `STAFF` or `ADMIN` | Member list |
| `adminGuard` | `ADMIN` only | Register user/member, edit member, file upload |

### Member Management
- **Register a member** — a multi-field form capturing personal details (first name, last name, VAT, identity number, membership ID, place of birth, branch of registration), sport, membership type, and linked user credentials.
- **Member list** — a paginated, server-side filtered table (5 per page) with columns for name, sport, membership type, and activity status. Staff and admins can search/filter by VAT, membership ID, last name, sport, and activity.
- **Member details** — a read-only profile view for any authenticated user. Members can view their own profile via `/members/me`; admins can view any member.
- **Edit member** — admins can update all member fields via a pre-populated form.
- **Delete member** — soft-delete with a confirmation dialog before the API call is made.
- **Membership file upload** — after registration, an admin can upload a membership document (multipart/form-data) that is stored on the backend file system.

### User Management
Admins can register new system users (username, password, role) — for example, to on-board new staff accounts.

### Lookup Data
Sports and membership types are fetched from the API on demand and rendered as dropdowns throughout the registration and edit forms.

---

## Application Structure

```
src/app/
├── app.routes.ts              # All routes with guard wiring
├── app.config.ts              # Root providers (HttpClient, Router)
├── core/
│   └── layout/
│       ├── header/            # Top navigation bar (login/logout, role-aware links)
│       ├── footer/            # Site footer
│       └── layout/            # Shell component wrapping all pages
├── pages/
│   ├── landing/               # Public home page
│   ├── login/                 # Login form → JWT fetch → redirect
│   ├── register-user/         # Admin-only new user form
│   ├── register-member/       # Admin-only new member multi-field form
│   ├── add-file/              # Admin-only membership file upload
│   ├── member-list/           # Paginated table + filter controls + confirm dialog
│   ├── member-edit/           # Admin-only edit form (pre-populated from API)
│   └── member-details/        # Read-only member profile
└── shared/
    ├── guards/                # authGuard, adminGuard, staffGuard
    ├── interfaces/            # TypeScript DTOs (member, user, lookup)
    └── services/
        ├── auth-interceptor.service.ts
        ├── user.service.ts    # Auth state (Angular signal), login, logout, register
        ├── member.service.ts  # CRUD + file upload + paginated list
        └── lookup.service.ts  # Sports and membership types
```

---

## Backend

This UI is tightly coupled to the **Sports Club REST API** — a Spring Boot 3.5 / Java 21 application backed by MySQL.

Repository: [StefanosMotsos/sports-club-api](https://github.com/StefanosMotsos/sports-club-api)

### Key API surface consumed by this UI

| Method | Path | Who can call |
|---|---|---|
| `POST` | `/api/v1/auth/authenticate` | Anyone |
| `POST` | `/api/v1/users` | ADMIN |
| `POST` | `/api/v1/members` | ADMIN |
| `GET` | `/api/v1/members` | STAFF, ADMIN (paginated + filtered) |
| `GET` | `/api/v1/members/me` | Authenticated user |
| `GET` | `/api/v1/members/{uuid}` | Authenticated user |
| `PUT` | `/api/v1/members/{uuid}` | ADMIN |
| `DELETE` | `/api/v1/members/{uuid}` | ADMIN (soft-delete) |
| `POST` | `/api/v1/members/{uuid}/membership-file` | ADMIN |
| `GET` | `/api/v1/sports` | Authenticated user |
| `GET` | `/api/v1/membership-types` | Authenticated user |

The backend exposes a Swagger UI at `/swagger-ui.html` and an OpenAPI spec at `/v3/api-docs`.

### Running the backend (Docker)

The API ships with a Docker Compose file. From the `sports-club-api` directory:

```bash
docker compose up
```

This starts both a MySQL container and the Spring Boot application. The API will be available at `http://localhost:8080`.

---

## Getting Started

### Prerequisites

- Node.js 20+ and npm 11+
- Angular CLI 22: `npm install -g @angular/cli`
- Backend API running (see above)

### Installation

```bash
git clone https://github.com/StefanosMotsos/sport-club-ui.git
cd sport-club-ui
npm install
```

### Environment Configuration

The API base URL is configured in `src/environments/environment.development.ts`:

```ts
export const environment = {
  apiURL: 'http://localhost:8080'
};
```

Change `apiURL` to point to wherever your backend is running.

### Running the Development Server

```bash
ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser. The app hot-reloads on file changes.

### Building for Production

```bash
ng build
```

Compiled output lands in `dist/sport-club-ui/`. Serve it with any static file host or reverse proxy (nginx, Apache, etc.).

---

## Running Tests

Unit tests use [Vitest](https://vitest.dev/) via the Angular test runner:

```bash
ng test
```

---

## Route Reference

| Path | Component | Access |
|---|---|---|
| `/` | Landing | Public |
| `/login` | Login | Public |
| `/register/user` | RegisterUser | ADMIN |
| `/register/member` | RegisterMember | ADMIN |
| `/register/:uuid/add-file` | AddFile | ADMIN |
| `/members` | MemberList | STAFF, ADMIN |
| `/members/:uuid/edit` | MemberEdit | ADMIN |
| `/members/:uuid/details` | MemberDetails | Authenticated |
