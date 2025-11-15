import * as React from "react";

export function Calendar({ className }: { className?: string }) {
  return (
    <div className={className} aria-label="Calendar placeholder">
      <div className="text-xs text-siso-text-muted">Calendar component</div>
    </div>
  );
}

export default Calendar;

