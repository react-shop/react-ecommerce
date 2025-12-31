# Layout Module

This module contains all layout-related components for the web application including header, footer, and navigation.

## Structure

```
/app/modules/layout/
├── components/              # Presentational components
│   ├── Header.tsx          # Main header with navigation
│   ├── Footer.tsx          # Footer with links and newsletter
│   ├── Logo.tsx            # Brand logo component
│   ├── SearchBar.tsx       # Product search input
│   ├── Navigation.tsx      # Desktop navigation links
│   ├── CartIcon.tsx        # Shopping cart icon with badge
│   ├── UserMenu.tsx        # User dropdown menu
│   ├── MobileMenu.tsx      # Mobile hamburger menu
│   └── index.ts            # Barrel export
├── screens/                 # Container components
│   ├── MainLayout.tsx      # Main layout wrapper with header/footer
│   └── index.ts            # Barrel export
└── README.md               # This file
```

## Architecture Pattern

### Route Groups
- `(main)/` - Pages with header and footer
- `(auth)/` - Auth pages with minimal layout

### Components

#### Header
- Sticky header with logo, search, navigation, cart, and user menu
- Responsive design with mobile menu
- Integrates with authentication state

#### Footer
- Company info and social links
- Quick links (Shop, Support)
- Newsletter signup form
- Copyright and legal links

#### Navigation
- Desktop: Horizontal nav bar
- Mobile: Hamburger menu with slide-out drawer

#### UserMenu
- Guest: Sign In / Sign Up buttons
- Authenticated: User avatar with dropdown
  - Dashboard
  - Orders
  - Profile
  - Wishlist
  - Sign Out

#### CartIcon
- Shopping cart icon with item count badge
- Links to cart page

## Usage

### Main Layout (with Header & Footer)
```tsx
// app/(main)/layout.tsx
import { MainLayout } from "@/app/modules/layout/screens";

export default function MainLayoutWrapper({ children }) {
  return <MainLayout>{children}</MainLayout>;
}
```

### Auth Layout (minimal)
```tsx
// app/(auth)/layout.tsx
export default function AuthLayout({ children }) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
```

## Features

### Header Features
- ✅ Sticky positioning
- ✅ Logo with home link
- ✅ Search bar (desktop and mobile)
- ✅ Desktop navigation menu
- ✅ Shopping cart icon with badge
- ✅ User authentication state
- ✅ User dropdown menu
- ✅ Mobile hamburger menu
- ✅ Responsive design

### Footer Features
- ✅ Company information
- ✅ Social media links (Facebook, Twitter, Instagram)
- ✅ Quick links (Shop, Support)
- ✅ Newsletter signup form
- ✅ Copyright notice
- ✅ Legal links (Privacy, Terms)
- ✅ Responsive grid layout

### Mobile Menu Features
- ✅ Slide-out drawer from right
- ✅ Overlay backdrop
- ✅ User profile section
- ✅ Navigation links
- ✅ Authentication buttons
- ✅ Sign out button
- ✅ Smooth animations

## State Management

The MainLayout screen handles:
- User authentication state (via `useMe` hook)
- Logout functionality (via `useLogout` hook)
- Cart item count (TODO: integrate with cart context)

## Responsive Breakpoints

- Mobile: `< 768px` - Mobile menu, stacked search
- Tablet: `768px - 1024px` - Partial desktop layout
- Desktop: `> 1024px` - Full desktop layout with all features

## Customization

### Adding New Navigation Links
Edit `components/Navigation.tsx`:
```tsx
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  // Add your link here
];
```

### Changing Logo
Edit `components/Logo.tsx` to use your custom logo image or design.

### Footer Links
Edit `components/Footer.tsx` to modify footer sections and links.

## Integration Points

### Authentication
- Uses `useMe()` from SDK to get current user
- Uses `useLogout()` from SDK for sign out
- Redirects to `/login` and `/register` pages

### Cart
- Currently shows static cart count (0)
- TODO: Integrate with cart context/hook when implemented

### Search
- Form submits to `/search?q={query}`
- TODO: Implement search results page

## Future Enhancements

- [ ] Cart context integration for real-time cart count
- [ ] Wishlist count badge
- [ ] Notifications dropdown
- [ ] Mega menu for categories
- [ ] Breadcrumbs component
- [ ] Back to top button
- [ ] Sticky cart button on mobile

