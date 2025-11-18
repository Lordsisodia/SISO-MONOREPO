# Settings Background Options

- **Option 2 (current)**: Etheral Shadow overlay with orange tint
  - File: `src/domains/partnerships/portal-architecture/settings/menu/SettingsPanel.tsx`
  - Props: `color="hsla(27,94%,60%,0.9)", animation {scale:100, speed:90}, noise {opacity:1, scale:1.2}, blur filter 6px, opacity 1`

- **Original (fallback)**: FallingPattern with radial mask
  - Use `FallingPattern` from `shared/forlinkpattern/falling-pattern` and remove the EtheralShadow block.

Revert to original:
1) Remove the `EtheralShadow` import in `SettingsPanel.tsx`.
2) Replace the background block with:
```
{showBg ? (
  <div className="pointer-events-none absolute inset-0 z-0">
    <FallingPattern className="h-full [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]" />
  </div>
) : null}
```

- **Option 3 (current on Settings)**: Waves background with mild blur
  - File: `SettingsPanel.tsx`
  - Component: `<Waves className="h-full w-full" strokeColor="#f8a75c" backgroundColor="#0b0b0f" pointerSize={0.35} />`
  - Wrapper styles: `filter: blur(6px); opacity: 0.9;`

- **Option 4 (todo)**: Waves background without blur
  - Same Waves component/props as Option 3, but wrapper styles should remove the blur and keep opacity at 1.0:
    - `style={{ opacity: 1 }}` (no filter)
