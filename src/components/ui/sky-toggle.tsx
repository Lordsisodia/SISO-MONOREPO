"use client";

import { useCallback, type KeyboardEvent } from "react";
import { cn } from "@/domains/shared/utils/cn";

type SwitchProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  /**
   * Scale relative to the default size (≈30px track height). 0.5 ≈ 50% smaller.
   */
  scale?: number;
};

const Switch = ({ checked = false, onChange, className, scale = 0.7 }: SwitchProps) => {
  const trackHeight = 30 * scale * 1.3;
  const trackWidth = trackHeight * 2.4;
  const knobSize = trackHeight * 0.85;
  const knobOffset = checked ? trackWidth - knobSize - trackHeight * 0.15 : trackHeight * 0.15;

  const handleToggle = useCallback(() => {
    onChange?.(!checked);
  }, [checked, onChange]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleToggle();
      }
    },
    [handleToggle],
  );

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative isolate flex items-center justify-start rounded-full border border-white/15 bg-transparent transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
        className,
      )}
      style={{ width: trackWidth, height: trackHeight }}
    >
      <span
        className="absolute inset-0 rounded-full transition-[background,opacity]"
        style={{
          background: checked
            ? "linear-gradient(135deg,#0d0e17,#1d1f2c)"
            : "linear-gradient(135deg,#3d7eae,#6ab0f5)",
        }}
      />

      <span
        className="pointer-events-none absolute left-3 flex gap-1 transition-opacity"
        style={{ opacity: checked ? 0 : 1 }}
      >
        <span className="h-1 w-4 rounded-full bg-white/80 blur-[1px]" />
        <span className="h-1.5 w-6 rounded-full bg-white/70 blur-[1px]" />
      </span>

      <span
        className="pointer-events-none absolute right-3 flex gap-1 transition-opacity"
        style={{ opacity: checked ? 1 : 0 }}
      >
        {[0.8, 0.6, 1].map((opacity, idx) => (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            className="rounded-full bg-white/80"
            style={{ width: 2 + idx * 2, height: 2 + idx * 2, opacity }}
          />
        ))}
      </span>

      <span
        className="relative z-10 flex items-center justify-center rounded-full shadow-lg transition-[transform,background]"
        style={{
          width: knobSize,
          height: knobSize,
          transform: `translateX(${knobOffset}px)` ,
          background: checked ? "#c4c9d1" : "#ecca2f",
        }}
      >
        {checked ? (
          <span className="relative h-full w-full">
            {[18, 10, 24].map((size, index) => (
              <span
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="absolute rounded-full bg-[#959db1]"
                style={{
                  width: size * 0.1,
                  height: size * 0.1,
                  top: `${20 + index * 15}%`,
                  left: `${index === 1 ? 60 : 30 + index * 10}%`,
                }}
              />
            ))}
          </span>
        ) : (
          <span className="absolute inset-0 rounded-full bg-white/30 blur-[6px]" />
        )}
      </span>
    </button>
  );
};

export default Switch;
