# Wave Background Components - Usage Guide

## Available Wave Components

### 1. `<FlowingWaves />`
**Best for:** Bottom of sections, creating depth
**Effect:** Three-layer animated waves at section bottom
```tsx
import { FlowingWaves } from "@/components/backgrounds/waves";

<section className="relative">
  {/* Your content */}
  <FlowingWaves />
</section>
```

### 2. `<WavePattern />`
**Best for:** Subtle texture overlay across entire section
**Effect:** Static repeating wave pattern
```tsx
import { WavePattern } from "@/components/backgrounds/waves";

<section className="relative">
  <WavePattern />
  {/* Your content */}
</section>
```

### 3. `<WaveDivider />`
**Best for:** Section transitions (top or bottom)
**Effect:** Smooth wave divider with animation
```tsx
import { WaveDivider } from "@/components/backgrounds/waves";

<section className="relative">
  <WaveDivider position="top" />  {/* or "bottom" */}
  {/* Your content */}
</section>
```

### 4. `<TopWaves />`
**Best for:** Top of hero section
**Effect:** Inverted waves at section top
```tsx
import { TopWaves } from "@/components/backgrounds/waves";

<section className="relative">
  <TopWaves />
  {/* Your content */}
</section>
```

## Current Implementation

✅ **Footer** - Has `<WaveDivider position="top" />` for smooth transition
✅ **Capabilities Section** - Has `<WavePattern />` for subtle texture

## Where to Add Waves

### Recommended Placements:

**Hero Section:**
```tsx
// Add at bottom for smooth scroll transition
<FlowingWaves />
```

**Timeline Section:**
```tsx
// Add divider at bottom
<WaveDivider position="bottom" />
```

**Blog/Projects Sections:**
```tsx
// Subtle pattern overlay
<WavePattern />
```

## Mobile Optimization

All wave components are automatically optimized for mobile:
- Reduced height (100px vs 150px)
- Lower opacity (0.5 vs original)
- Slower animations (30s vs 15-25s)
- Smaller background pattern size

## Performance Notes

- All waves use CSS animations (GPU-accelerated)
- SVG paths are lightweight
- Mobile devices get simplified versions
- `pointer-events: none` ensures no interaction overhead
