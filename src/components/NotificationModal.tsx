"use client";
import React from "react";

type NotificationVariant = "error" | "success" | "info";

export default function NotificationModal({
  open,
  title,
  message,
  variant = "info",
  onClose,
}: {
  open: boolean;
  title?: string;
  message?: string | React.ReactNode;
  variant?: NotificationVariant;
  onClose: () => void;
}) {
  if (!open) return null;

  const borderColor =
    variant === "error"
      ? "border-red-500"
      : variant === "success"
      ? "border-green-500"
      : "border-blue-500";

  const titleColor =
    variant === "error"
      ? "text-red-600 dark:text-red-400"
      : variant === "success"
      ? "text-green-600 dark:text-green-400"
      : "text-blue-600 dark:text-blue-400";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={`relative z-10 w-[90%] max-w-md rounded-md border ${borderColor} bg-[var(--background)] text-[var(--foreground)] shadow-lg`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
          <h3 className={`text-base font-semibold ${titleColor}`}>{title ?? "Notification"}</h3>
          <button aria-label="Close" className="btn" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="px-4 py-3">
          {typeof message === "string" ? <p className="text-sm">{message}</p> : message}
        </div>
      </div>
    </div>
  );
}
