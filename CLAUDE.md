# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A modern 3D developer portfolio built with React, Three.js (React Three Fiber), TailwindCSS v4, and Framer Motion. Features animated 3D graphics, scroll-based animations, and a working contact form using EmailJS.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm preview

# Run ESLint
npm run lint
```

## Architecture

### Application Structure

The app follows a single-page portfolio layout with sections rendered sequentially in [App.jsx](src/App.jsx):

1. **Navbar** - Navigation menu
2. **Hero** - 3D animated astronaut with parallax background
3. **About** - Grid-based about section
4. **Projects** - Showcase of portfolio projects
5. **Experiences** - Work history timeline
6. **Testimonial** - Reviews/testimonials
7. **Contact** - EmailJS-powered contact form
8. **Footer** - Footer section

### Directory Structure

**Organized by component type for better maintainability:**

```
src/
├── components/
│   ├── 3d/              # 3D-related components (Astronaut, Globe, ParallaxBackground)
│   │   └── index.jsx    # Barrel export for 3D components
│   ├── animation/       # Animation components (Particles, FlipWords, Marquee, OrbitingCircles)
│   │   └── index.jsx    # Barrel export for animation components
│   ├── ui/              # UI components (Alert, Card, Button, Form elements, etc.)
│   │   └── index.jsx    # Barrel export for UI components
│   ├── icons/           # SVG icon components (MenuIcon, CloseIcon, CopyIcon, etc.)
│   │   └── index.jsx    # Barrel export for icons
│   ├── logos/           # Logo components (ReactLogo, GitLogo, etc. - 22 total)
│   │   └── index.jsx    # Barrel export for logos
│   └── socials/         # Social media icon components (InstagramIcon, LinkedInIcon, WhatsAppIcon)
│       └── index.jsx    # Barrel export for social icons
├── sections/            # Full-page sections (Hero, About, Contact, etc.)
├── constants/
│   └── index.js         # Centralized data (projects, experiences, reviews, socials)
└── index.css            # Global styles and Tailwind config
```

**Public assets:**
- `public/assets/images/backgrounds/` - Parallax background images (sky, mountains, planets)
- `public/assets/images/misc/` - Miscellaneous images (coding-pov, grid)
- `public/assets/projects/` - Project screenshots and assets
- `public/models/` - 3D model files (GLB/GLTF format)

**Import patterns (use barrel exports):**
```jsx
// Import 3D components
import { Astronaut, Globe, ParallaxBackground } from '../components/3d';

// Import animation components
import { Particles, FlipWords, Marquee, OrbitingCircles } from '../components/animation';

// Import UI components
import { Alert, Card, CopyEmailButton, Loader } from '../components/ui';

// Import icons
import { MenuIcon, CloseIcon, CopyIcon } from '../components/icons';

// Import logos (all SVG code is inline, no external files)
import { ReactLogo, GitLogo, JavascriptLogo } from '../components/logos';

// Import social icons
import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from '../components/socials';
```

### Key Technologies & Patterns

**3D Rendering:**
- Uses React Three Fiber (@react-three/fiber) for declarative Three.js
- Drei (@react-three/drei) provides helpers like `useGLTF`, `Float`, `useAnimations`
- 3D models loaded via GLB format, auto-generated with gltfjsx
- Camera rigging uses `useFrame` hook and `maath` easing for smooth mouse tracking
- Example: [Astronaut.jsx](src/components/3d/Astronaut.jsx) shows animated 3D model with spring physics

**Animation:**
- Framer Motion (`motion` package v12) for scroll and UI animations
- `motion-value` and `motion-spring` for physics-based animations
- CSS animations defined in index.css using custom @keyframes (orbit, marquee)

**Styling:**
- TailwindCSS v4 with custom theme in [index.css](src/index.css) using `@theme` directive
- Custom color palette: primary, midnight, navy, indigo, storm, aqua, mint, royal, lavender, etc.
- Utility classes defined for common patterns (`.c-space`, `.hover-animation`, `.section-spacing`, `.text-heading`)
- Grid layouts use custom classes (`.grid-1` through `.grid-5`) with hover effects

**Forms & Email:**
- EmailJS (@emailjs/browser) handles contact form submissions
- Service ID, template ID, and public key are hardcoded in [Contact.jsx](src/sections/Contact.jsx)
- Form state managed with React hooks (useState for form data, loading, alerts)

**Performance Optimizations:**
- **Lazy Loading**: Heavy sections (About, Projects, Experiences, Testimonial, Contact) are lazy-loaded with `React.lazy()` and `Suspense`
- **React.memo()**: All components wrapped to prevent unnecessary re-renders
- **useCallback**: Event handlers memoized to maintain referential equality
- **useMemo**: Heavy calculations and component lists memoized
- **Throttling**: Mouse events throttled to 60fps (16ms) using custom throttle helper
- **IntersectionObserver**: Globe component only renders when About section is visible
- **Canvas Optimizations**:
  - Globe: devicePixelRatio reduced to 1.5, mapSamples reduced to 8000
  - Hero Canvas: antialias disabled, dpr capped at [1, 1.5], powerPreference set to "high-performance"
  - Float component configured with reduced intensity for better performance
- **Particles**: Quantity reduced to 50, debounced resize handlers
- **ParallaxBackground**: Uses `will-change` CSS property, optimized spring config
- **Projects**: Mouse tracking only active when preview is shown, optimized spring physics

**Responsive Design:**
- `react-responsive` library with `useMediaQuery` hook for conditional rendering
- Mobile breakpoint: maxWidth 853px
- Example: Hero section adjusts astronaut scale/position for mobile

### Data Management

All content data is centralized in [src/constants/index.js](src/constants/index.js):
- `myProjects` - Array of project objects with title, description, subDescription, tags, images
- `experiences` - Array of work experience objects with title, job, date, contents
- `reviews` - Array of testimonial objects
- `mySocials` - Array of social media links

To update portfolio content, edit these exports rather than modifying component files.

### Custom CSS Classes

Defined in [src/index.css](src/index.css):
- `.c-space` - Container spacing (responsive padding)
- `.section-spacing` - Min height and top margin for sections
- `.text-heading` - Typography for section headings
- `.hover-animation` - Translate-y animation on hover
- `.grid-default-color` / `.grid-special-color` / `.grid-black-color` - Gradient backgrounds for about grid items
- `.field-label` / `.field-input` / `.field-input-focus` - Contact form styling

### 3D Model Loading

3D models are loaded from `/public/models/` directory. Example pattern from Astronaut.jsx:

```jsx
const { nodes, materials, animations } = useGLTF("/models/model-name.glb");
useGLTF.preload("/models/model-name.glb");
```

Models should be optimized GLB files. Use gltfjsx to generate React components from GLB files.

## Configuration Files

- **vite.config.js** - React plugin with TailwindCSS Vite plugin
- **tailwind.config.js** - Content paths for Tailwind scanning
- **eslint.config.js** - ESLint v9 flat config with React plugins
- **index.html** - Entry HTML file with root div

## Common Development Tasks

**Adding a new section:**
1. Create component in `src/sections/`
2. Import and add to [App.jsx](src/App.jsx) component tree
3. Add navigation link to [Navbar.jsx](src/sections/Navbar.jsx) if needed

**Adding a new project:**
1. Add project object to `myProjects` array in [src/constants/index.js](src/constants/index.js)
2. Include all required fields: id, title, description, subDescription, href, logo, image, tags
3. Place project assets in `public/assets/projects/`

**Updating 3D models:**
1. Place GLB file in `public/models/`
2. Generate component with gltfjsx or manually create similar to [Astronaut.jsx](src/components/3d/Astronaut.jsx)
3. Save component in `src/components/3d/` folder
4. Export from `src/components/3d/index.jsx`
5. Import and use in Canvas component with Suspense wrapper

**Adding new SVG components (icons/logos/socials):**
1. Create component file in appropriate folder (`src/components/icons/`, `logos/`, or `socials/`)
2. Embed SVG code inline as JSX (no external file references)
3. Accept `width`, `height`, `className`, and `...props` parameters
4. Wrap with `memo()` and add `displayName`
5. Export from folder's `index.jsx` barrel export
6. Example structure:
```jsx
import { memo } from "react";

const IconName = ({ width, height, className = "", ...props }) => (
  <svg viewBox="0 0 24 24" width={width} height={height} className={className} {...props}>
    {/* SVG paths here */}
  </svg>
);

IconName.displayName = 'IconName';

export default memo(IconName);
```

**Configuring EmailJS:**
- Update service ID, template ID, and public key in [Contact.jsx](src/sections/Contact.jsx):32-42
- Ensure EmailJS template variables match: `from_name`, `to_name`, `from_email`, `to_email`, `message`

## Important Notes

- This is a client-side only application (no backend server)
- All environment-specific values (EmailJS credentials) are currently hardcoded
- 3D performance depends on model complexity and device capabilities
- The portfolio uses React 19 and modern ES modules
- Font family: "Funnel Display" from Google Fonts
- **All components are optimized** with React.memo, useCallback, and useMemo
- Components are **organized by type** (3d, animation, ui, icons, logos, socials) for better maintainability
- Use **barrel exports** (index.jsx) for cleaner imports
- **All SVG assets are inline components** - no external SVG files in public folder
- SVG components accept customizable width/height props for flexibility
- Heavy sections use lazy loading to improve initial page load time
- IntersectionObserver pattern used for conditionally rendering expensive 3D components
