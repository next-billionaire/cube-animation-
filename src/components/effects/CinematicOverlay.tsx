"use client";

import { memo } from "react";
import { cn } from "@/utils/cn";

interface CinematicOverlayProps {
  className?: string;
}

export const CinematicOverlay = memo(function CinematicOverlay({ className }: CinematicOverlayProps) {
  return (
    <div className={cn("fixed inset-0 pointer-events-none z-50", className)}>
      {/* Subtle Vignette */}
      <div 
        className="absolute inset-0 bg-transparent mix-blend-multiply"
        style={{
          background: "radial-gradient(circle at center, transparent 30%, rgba(5,5,5, 0.4) 100%)"
        }}
      />
      {/* CSS-based Film Grain (SVG data URI base64) to maintain 60 FPS */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC41Ii8+PC9zdmc+')",
          backgroundRepeat: "repeat"
        }}
      />
    </div>
  );
});
