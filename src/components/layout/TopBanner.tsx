'use client';

import { useState } from 'react';
import { X, ExternalLink } from 'lucide-react';

export function TopBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-warning text-warning-foreground px-4 py-2 text-xs border-b border-warning/20">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-medium">
            <strong>Superpower Attainment Framework</strong> - Next.js 14 + TypeScript + Zustand + Radix UI + Recharts dashboard built for sales engineering excellence. 
            Made in &lt;3 hours while the kids fell asleep.
          </span>
          <div className="flex items-center gap-3">
            <a 
              href="https://linkedin.com/in/willeddy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:underline font-medium"
            >
              LinkedIn
              <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://willeddy.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:underline font-medium"
            >
              willeddy.com
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="flex items-center justify-center w-5 h-5 rounded hover:bg-warning-foreground/10 transition-colors"
          aria-label="Close banner"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}