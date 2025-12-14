# BrailleSync Accessibility Guide

## Overview

BrailleSync is built from the ground up to be accessible to visually impaired users and meets WCAG 2.1 Level AA standards.

## Visual Design

### Color Scheme
- **Primary**: Navy Blue (#001F3F) - High contrast with white text
- **Accent**: Amber (#FFB81C) - 7:1+ contrast ratio for visibility
- **Text**: White (#F5F5F5) on dark backgrounds
- **Backgrounds**: Dark navy and charcoal for reduced eye strain

### Typography
- **Minimum size**: 16px for body text, 18px for labels
- **Line height**: 1.6 for improved readability
- **Font**: Geist (sans-serif) for clarity
- **Font weight**: Medium (500) or bold (600) for emphasis

### Focus Indicators
- All interactive elements have visible focus states
- 2px focus ring using accent color
- Focus indicator clearly visible at 1024x768 resolution

## Keyboard Navigation

### Tab Order
- Navigation bar buttons
- Main content links and buttons
- Form inputs
- Footer links

### Keyboard Shortcuts
- `Tab` - Move to next interactive element
- `Shift + Tab` - Move to previous element
- `Enter` / `Space` - Activate buttons
- `Arrow Keys` - Navigate select dropdowns
- `Esc` - Close dialogs/dropdowns
- `Skip to Main Content` - Available on page load via skip link

## Screen Reader Support

### Semantic HTML
All pages use semantic HTML5 elements:
- `<main>` for main content
- `<nav>` for navigation
- `<section>` for content sections
- `<form>` for forms
- `<label>` for form labels
- `<table>` for data tables

### ARIA Attributes
- `aria-label` on icon-only buttons
- `aria-current="page"` on active nav links
- `aria-selected` on tabs
- `role="main"` on main content
- `role="alert"` on error messages
- `role="status"` on success messages

### Form Labels
Every input has an associated `<label>` with `htmlFor`:
\`\`\`tsx
<label htmlFor="email">Email Address</label>
<input id="email" type="email" />
\`\`\`

### Status Messages
All status updates announce to screen readers:
\`\`\`tsx
<div role="status" aria-live="polite">
  Translation complete
</div>
\`\`\`

## Mobile & Touch Accessibility

- Minimum touch target size: 44x44px
- Buttons have adequate spacing (16px gap minimum)
- Responsive text sizing
- Form inputs zoom properly on mobile
- Touch-friendly navigation

## Testing Accessibility

### Tools Used
- Chrome DevTools Lighthouse
- axe DevTools browser extension
- NVDA screen reader (Windows)
- Safari VoiceOver (Mac)
- Mobile VoiceOver (iOS)

### Manual Testing Checklist
- [ ] Navigate entire site using Tab key only
- [ ] All form labels are properly associated
- [ ] All images have alt text (or are marked decorative)
- [ ] Color contrast meets WCAG AA standards (4.5:1 minimum)
- [ ] Focus indicators are visible on all interactive elements
- [ ] Error messages are clearly announced
- [ ] Skip to main content link works
- [ ] Zoom to 200% - layout still works
- [ ] Test with screen reader (VoiceOver, NVDA, etc.)

## Known Accessibility Features

✓ Semantic HTML structure
✓ ARIA labels and roles
✓ High contrast color scheme
✓ Large, readable fonts
✓ Keyboard navigation
✓ Screen reader support
✓ Focus indicators
✓ Mobile accessible
✓ Skip to main content
✓ Form error announcements
✓ Status message announcements

## Accessibility Roadmap

- [ ] Add animated page transitions with reduced-motion support
- [ ] Implement text size toggle (small/normal/large/extra-large)
- [ ] Add dyslexia-friendly font option
- [ ] Voice command support
- [ ] Browser extension for additional support
- [ ] Accessibility audit by third party

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Accessibility Resources](https://webaim.org/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [The A11Y Project](https://www.a11yproject.com/)

## Reporting Accessibility Issues

If you find an accessibility issue, please:
1. Describe the problem
2. Specify your assistive technology (screen reader, etc.)
3. Include browser and OS information
4. Provide steps to reproduce

---

BrailleSync is committed to continuous accessibility improvements. Your feedback helps us serve our users better.
