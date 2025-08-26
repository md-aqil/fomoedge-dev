# Kilo Code Custom Rules for Laravel + React + Inertia.js + Shadcn CMS

This document defines the custom coding standards and best practices for maintaining a scalable, secure, and high-quality codebase.

---

## 1. Backend (Laravel) Rules

- **Use Laravel 11+ Features**
  - Enforce typed properties and return types in controllers, models, and services.
  - Prefer `enum` over string-based constants for roles and statuses.

- **Eloquent Best Practices**
  - Avoid N+1 queries; always eager load relationships.
  - Use `Resource` classes for API responses.
  - Use `FormRequest` for validation instead of inline validation.

- **Security**
  - Enforce CSRF protection on all POST, PUT, PATCH, DELETE routes.
  - Never store passwords in plaintext—use `Hash::make()`.
  - Sanitize all user-generated content before saving or displaying.

- **Folder Structure & Naming**
  - Controllers → `App\Http\Controllers` (PascalCase, singular, e.g., `PostController`).
  - Models → `App\Models` (singular, e.g., `Post.php`).
  - Services/Helpers → `App\Services`, `App\Helpers`.
  - Policies → `App\Policies` for role-based access.

---

## 2. Frontend (React + Inertia.js) Rules

- **Component Structure**
  - Place reusable components in `/resources/js/Components`.
  - Page components in `/resources/js/Pages`.
  - Use PascalCase for components, camelCase for functions.

- **Inertia.js**
  - Use `Link` for navigation instead of `<a>` tags.
  - Define `props` types via TypeScript interfaces.
  - Avoid unnecessary API endpoints—leverage Inertia shared props.

- **State Management**
  - Keep state local unless shared globally (use context or Zustand/Redux if needed).
  - Avoid prop drilling—use composition or context providers.

---

## 3. Shadcn & Tailwind Rules

- Use only Shadcn UI components unless absolutely necessary to custom-build.
- Never modify Shadcn components directly—extend via `className` or wrapper components.
- Tailwind:
  - Enforce consistent spacing (`p-4`, `m-2`, etc.).
  - Colors must come from the configured theme (no arbitrary hex values).
  - Dark mode support should be enabled by default.

---

## 4. PUCK Visual Editor Rules

- Only allow whitelisted components to be exposed to PUCK for editing.
- Enforce naming convention for draggable components:
  - Example: `PUCK_[ComponentName]`.
- All PUCK components must be responsive by default (mobile-first).

---

## 5. Code Quality & Linting

- Use **ESLint + Prettier** for React code.
- Use **PHPStan/Psalm** for static analysis on Laravel.
- Commit hooks:
  - Run `npm run lint` & `php artisan test` before pushing.
  - Enforce formatting with `pre-commit` hook.

---

## 6. Deployment & Build Rules

- Always run `php artisan optimize:clear` before deployment.
- For production builds:
  - Run `npm run build` and serve via `php artisan serve --env=production`.
  - Use versioned assets (`mix-manifest.json` or Vite manifest).

---

## 7. Role-Based Access Control Rules

- **Admin**: Full CRUD on content, roles, and settings.
- **Editor**: CRUD only on posts, pages, and media.
- **Viewer**: Read-only access to public content.
- Use Laravel Policies & Gates—never hardcode permissions in controllers.

---
# fomo-rule.md

Rule description here...

## Guidelines

- Guideline 1
- Guideline 2
