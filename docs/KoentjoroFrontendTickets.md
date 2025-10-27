# Koentjoro Frontend Execution Breakdown (Tickets)

This file contains a breakdown of development tasks (tickets) for the frontend side of the Koentjoro website. Each ticket is actionable and can be tracked individually.

---

## 1. Project Setup

- Initialize React + TypeScript project (Vite recommended)
- Install and configure Tailwind CSS
- Install shadcn/ui and set up sky color theme
- Install Zustand, TanStack React Router, React Hook Form, Zod, Framer Motion, Visx/Recharts
- Set up base folder structure

---

## 2. Routing & Navigation

- Configure TanStack React Router with main routes: Home, Resume, Abilities, Bid to Hire, Dashboards, Contact, Legal, Blog, FAQ, Map
- Implement navigation bar with shadcn/ui components

---

## 3. State Management

- Set up Zustand store for global state (user, offers, notifications, etc.)
- Create hooks for accessing and updating state

---

## 4. Layout & Theming

- Implement main layout component (header, footer, content area)
- Apply sky color theme using shadcn/ui and Tailwind
- Ensure responsive design for mobile/tablet/desktop

---

## 5. Home Page

- Build hero section with photo, tagline, and intro
- Add call-to-action buttons (View Resume, Bid to Hire)

---

## 6. Resume/Profile Page

- Display education, experience, skills, certifications, achievements
- Implement Download CV button
- Use charts for skill visualization

---

## 7. Abilities/Skills Page

- List technical, soft, and domain-specific skills
- Visualize skills with charts (Visx/Recharts)

---

## 8. Bid to Hire Page

- Explain reverse hiring concept
- Implement offer submission form (React Hook Form + Zod)
- Integrate form validation and submission logic

---

## 9. Authentication

- Integrate authentication UI (sign in/up for companies)
- Connect to backend API for auth (placeholder for now)

---

## 10. Owner Dashboard

- Display list of incoming offers
- Show offer details and status
- Implement actions: Accept, Reject, Negotiate, Message
- Integrate messaging UI (chat component)

---

## 11. Company Dashboard

- Display submitted offers and their status
- Allow editing/withdrawing offers
- Integrate messaging UI

---

## 12. Contact Page

- Build contact form (React Hook Form + Zod)
- Add social media links

---

## 13. Legal & Privacy Pages

- Create Privacy Policy and Terms of Service pages

---

## 14. Testimonials Section

- Display testimonials using shadcn/ui components

---

## 15. Blog/Insights Section

- List articles/posts
- Implement blog post detail view

---

## 16. FAQ Section

- Display common questions and answers

---

## 17. Map/Location Section

- Integrate map component (e.g., Google Maps or Leaflet)

---

## 18. Animations & UX

- Add Framer Motion animations to key UI elements
- Ensure smooth transitions and feedback

---

## 19. Accessibility & SEO

- Audit and improve accessibility (aria labels, keyboard navigation)
- Add meta tags and structured data for SEO

---

## 20. Testing

- Write unit and integration tests for components (Jest + React Testing Library)

---

## 21. Final Review & Polish

- Cross-browser and device testing
- UI/UX polish and bug fixes

---

Each ticket can be expanded with subtasks and assigned to team members as needed.
