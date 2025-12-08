"use client";
import React from "react";

export default function LoadingSpinner({ open }: { open: boolean }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 dark:bg-black/50" aria-hidden="true" />
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div
          className="h-10 w-10 rounded-full border-4 border-[var(--btn-primary-bg)] dark:border-[var(--btn-primary-bg-dark)] border-t-transparent animate-spin"
          aria-label="Loading"
        />
        <span className="text-sm muted-text">Connecting wallet…</span>
      </div>
    </div>
  );
}
