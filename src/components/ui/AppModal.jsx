import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "./app-modal.css";

/**
 * Reusable modal with slots:
 * - headerSlot
 * - descriptionSlot (for a11y via Dialog.Description)
 * - children (body)
 * - footerSlot
 */
export default function AppModal({
  open,
  onOpenChange,
  headerSlot,
  descriptionSlot,
  footerSlot,
  children,
  contentClassName = "",
  srTitle = "Dialog",
  closeLabel = "Close modal",
  showCloseButton = true,
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="app-modal-overlay fixed inset-0 z-50 bg-black/70" />

        <Dialog.Content
          className={`app-modal-content fixed left-1/2 top-1/2 z-50 w-[96vw] sm:w-[94vw] max-w-[1120px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl focus:outline-none flex flex-col ${contentClassName}`}
        >
          <Dialog.Title className="sr-only">{srTitle}</Dialog.Title>

          <div className="flex items-start justify-between gap-3 border-b border-slate-800 px-4 py-3">
            <div className="min-w-0">
              {headerSlot}
              <Dialog.Description
                className={descriptionSlot ? "mt-1 text-xs text-slate-400 sm:text-sm" : "sr-only"}
              >
                {descriptionSlot || "Modal content"}
              </Dialog.Description>
            </div>

            {showCloseButton ? (
              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label={closeLabel}
                  className="text-xl text-slate-200"
                >
                  ✕
                </button>
              </Dialog.Close>
            ) : null}
          </div>

          {/* Flexible scroll area: no manual calc needed */}
          <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 sm:px-6">
            {children}
          </div>

          {footerSlot ? (
            <div className="border-t border-slate-800 px-4 py-3">{footerSlot}</div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
