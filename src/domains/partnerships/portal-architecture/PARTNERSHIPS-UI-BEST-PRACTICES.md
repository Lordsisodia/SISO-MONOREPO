# Partnerships UI Best Practices

**Status**: ✅ Active – reference before shipping any Partnerships surface  
**Owner**: Partnerships DX  
**Last Updated**: 2025-11-15

This file is the canonical reference for how we compose the Partnerships UI on SISO. It complements `STANDARDS.md` by focusing on two patterns teams keep re-implementing: the nested settings callout and the top-of-experience hero with the animated waves background.

---

## Pattern 1 — Stackable Settings Callouts (Callout-in-Callout)

**Primary components**

- `SettingsGroupCallout` (`src/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout.tsx`)
- `SettingsTitleCallout` (same file, for single-row sections)
- `SettingMenuItem` (`src/domains/partnerships/portal-architecture/settings/menu/SettingMenuItem.tsx`) when drilling down to actions

**When to use**: Any settings-like surface (Pipeline Ops wizard, Notifications, Community channel instructions, etc.) where we need a titled container with an icon header, optional badges, and a softly lit interior card holding the actual controls.

### Composition

1. **Outer callout shell (`rounded-[26px]`)**  
   Provided by `SettingsGroupCallout`. Accepts `icon`, `title`, `subtitle`, optional `afterTitle`, optional `endBadge`, and `showChevron`. This wrapper enforces the dark scrim + shadow combination that matches the Partnerships menu.

2. **Header row behaviour**  
   Icons should be 32px squares with `bg-white/5 text-siso-orange`. Any badge (`endBadge`) belongs on the right with `text-[11px]` typography. If the group is not clickable, set `showChevron={false}`.

3. **Inner callout content (`rounded-[22px] border border-white/10 bg-white/5`)**  
   This is a second callout (div) nested inside the `children` slot. It gives us the frosted glass look for actual inputs, grids, or copy blocks. Keep spacing at `p-4` (or `p-4 sm:grid-cols-*` for grids) to match `submit-client/page.tsx`.

4. **Menu items (optional)**  
   Use `SettingMenuItem` for rows beneath the inner callout. This keeps iconography, meta badges, and chevrons consistent across the app.

### Example

```tsx
import { SettingsGroupCallout } from '@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout';
import { PenLine } from 'lucide-react';

<SettingsGroupCallout
  icon={<PenLine className="h-4 w-4 text-siso-orange" />}
  title="Submission wizard"
  subtitle="Complete each stage and validation gate"
  showChevron={false}
>
  <div className="rounded-[22px] border border-white/10 bg-white/5 p-4 space-y-4">
    {/* Controls, grids, or guidance live here */}
  </div>
</SettingsGroupCallout>
```

Reference implementation: `src/app/partners/pipeline-ops/submit-client/page.tsx` (`Submission readiness` callout around lines 303–336).

### Checklist

- [ ] Always pass an icon sized `h-4 w-4`; wrap it in the provided span so the 32px badge renders.
- [ ] Use uppercase titles (handled inside the component) and keep subtitles within ~60 characters for balance.
- [ ] If the body content is multi-column, apply `grid gap-3` to the inner callout div; avoid nesting additional cards.
- [ ] Never place heavy logic or data fetching in these components—feed them props from application hooks.
- [ ] Prefer `SettingsTitleCallout` for read-only headline cards (e.g., mobile campus sidebar search).

### Anti-patterns to avoid

- Creating bespoke wrappers for each settings page. If you need a variation, extend `SettingsGroupCallout` instead.
- Removing the second callout layer. The contrast between the dark shell and frosted body is what sells the Partnerships look.
- Mixing padding systems (e.g., `p-6` inside the inner callout). Stick to `p-4` to align with other panels.

---

## Pattern 2 — Hero + Waves Background (Top-of-Experience Hero)

**Primary components**

- `Hero` (`apps/partners/src/components/ui/animated-hero.tsx`) – text animation, CTA buttons, responsive layout.
- `HeroSection` (`apps/partners/src/components/landing/sections/HeroSection.tsx`) – orchestrates Hero, CTA callout, and the waves canvas.
- `Waves` (`apps/partners/src/components/ui/waves-background.tsx`) – interactive Perlin-noise grid driving the wavy/falling background.

**When to use**: Landing/hero surfaces that need to immediately communicate value (Partnerships home, restaurant vertical hero, onboarding splash screens). Mount a single `HeroSection` per page to avoid duplicate animation loops.

### Layering rules

1. Wrap the hero in a `section` with `className="relative min-h-screen flex items-center justify-center"`. The `relative` ensures `Waves` can anchor with `absolute`.
2. Render `<Hero />` first so text and CTAs sit above the waves.
3. Optional mobile CTA callout (see `HeroSection` callout around lines 20–40) should live inside an absolutely positioned `motion.div` with `pointer-events-auto`.
4. Drop `<Waves />` last. The component sets `position: absolute; top:0; left:0; -z-10`, so no extra wrappers are required.

### Waves prop primer

| Prop | Default | Notes |
|------|---------|-------|
| `lineColor` | `rgba(255, 87, 34, 0.2)` in Partnerships hero | Tie to brand gradients; lighter colors feel less busy. |
| `backgroundColor` | `transparent` | Set to `bg-black/50` only if the underlying section is too noisy. |
| `waveSpeedX` / `waveSpeedY` | `0.018 / 0.015` (hero override) | Higher numbers = faster drift; keep `<= 0.03` to avoid motion sickness. |
| `waveAmpX` / `waveAmpY` | `70 / 35` (hero override) | Controls amplitude; match ratio (≈2:1) so waves feel like falling curtains. |
| `xGap` / `yGap` | `22 / 55` (hero override) | Grid density; keep `yGap` larger for the falling effect. |
| `friction` & `tension` | `0.92 / 0.012` | Dampen cursor trails; do not drop below `0.9` or waves jitter. |
| `maxCursorMove` | `180` | Higher value lets the cursor pull the grid more aggressively; reduce on mobile. |

### Example (`HeroSection`)

```tsx
import { Hero } from '@/components/ui/animated-hero';
import { Waves } from '@/components/ui/waves-background';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

<section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
  <Hero />

  <div className="absolute top-20 left-0 right-0 z-50 flex justify-center pointer-events-none">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="pointer-events-auto inline-flex items-center px-5 py-2 rounded-full bg-black/40 backdrop-blur-md border border-siso-orange/30 shadow-lg"
    >
      <p className="text-white/90 text-base">
        We build out your MVP in <span className="font-semibold text-transparent bg-gradient-to-r from-siso-red to-siso-orange bg-clip-text">48 hours</span>
      </p>
      <ArrowRight className="w-4 h-4 ml-2 text-siso-orange" />
    </motion.div>
  </div>

  <Waves
    lineColor="rgba(255, 87, 34, 0.2)"
    backgroundColor="transparent"
    waveSpeedX={0.018}
    waveSpeedY={0.015}
    waveAmpX={70}
    waveAmpY={35}
    friction={0.92}
    tension={0.012}
    maxCursorMove={180}
    xGap={22}
    yGap={55}
  />
</section>
```

### Checklist

- [ ] Memoize hero presenters (`HeroSection` already uses `memo`) to avoid unnecessary re-renders of the animation loop.
- [ ] Keep only one `<Waves>` per viewport; if a page needs multiple hero-like sections, reuse the same background via CSS or static imagery below the fold.
- [ ] Defer navigation side effects (e.g., `useNavigate`) to handler functions inside the Hero component; keep `<HeroSection>` declarative.
- [ ] All hero CTAs must remain accessible: ensure text contrast on `bg-black/40` wrappers is ≥ 4.5:1 and buttons have keyboard focus styles.
- [ ] When customizing colors, stick to the `siso-*` tokens so the hero matches the rest of the Partnerships palette.

---

## Reference Implementations

- `src/app/partners/pipeline-ops/submit-client/page.tsx` – shows the canonical callout-in-callout card for both metrics and the wizard body.
- `src/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout.tsx` – source of truth for callout props and layout.
- `src/domains/partnerships/shared/ui/mobile/campus-sidebar/components/SearchContainer.tsx` – lightweight usage of `SettingsTitleCallout`.
- `apps/partners/src/components/landing/sections/HeroSection.tsx` – orchestrates hero body, CTA callout, and waves.
- `apps/partners/src/components/ui/animated-hero.tsx` – rotating headline + CTA logic.
- `apps/partners/src/components/ui/waves-background.tsx` – animated Perlin-noise canvas powering the background effect.

---

## Keeping This Doc Alive

1. Update this file whenever you touch the referenced components (new props, color tokens, etc.).  
2. Link back here from feature PRs to show adherence.  
3. If you need a deviation, document it in this file under a new subsection so the rest of the team can follow suit.

Consistency across Partnerships surfaces comes from repeating these patterns—not re-inventing them. Refer back here before inventing a new layout.
