# Button Color Update Plan

## Goal
- Update all action buttons to use gradient `#F9D846` to `#FED803`
- Update non-action buttons to have `#FED803` border with yellow styling
- Create a smooth, consistent UI

## Files to Update

### Core Styling Files
1. `app/globals.css` - Update `btn-adventure` and `btn-adventure-outline` classes
2. `tailwind.config.ts` - Add yellow color palette and update accents

### UI Components
3. `components/ui/Navigation.tsx` - Nav buttons and CTA
4. `components/ui/Hero.tsx` - Hero section buttons
5. `components/ui/CTASection.tsx` - CTA buttons
6. `components/ui/CourseCard.tsx` - Enroll button
7. `components/ui/Footer.tsx` - Subscribe button

### Pages
8. `app/login/page.tsx` - Login button
9. `app/testimonials/page.tsx` - Testimonial buttons
10. `app/about/page.tsx` - About page buttons
11. `app/courses/*/page.tsx` - Course enrollment buttons

### Admin Components
12. `components/admin/AdminSidebar.tsx` - Sidebar buttons
13. `components/admin/QuickActions.tsx` - Quick action buttons
14. `components/admin/AdminHeader.tsx` - Header buttons
15. `app/admin/testimonials/page.tsx` - Admin testimonial buttons

## Color Scheme
- **Action Buttons**: `linear-gradient(135deg, #F9D846 0%, #FED803 100%)`
- **Action Button Hover**: Slightly darker yellow gradient
- **Non-Action Buttons**: White bg with `#FED803` border and text
- **Non-Action Button Hover**: Yellow bg on hover

## Progress
- [x] Update globals.css with new button classes
- [x] Update tailwind.config.ts with yellow palette
- [x] Update all UI components (Navigation, Hero, CTASection, CourseCard, Footer)
- [x] Update all pages (login, testimonials, about)
- [x] Update admin components (AdminSidebar, QuickActions)
- [ ] Verify build and test
- [ ] Update any remaining inline button styles

