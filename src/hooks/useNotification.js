import { toast } from "react-hot-toast";

const TYPE_STYLES = {
  success: { icon: "✅" },
  error: { icon: "❌" },
  warning: { icon: "⚠️" },
  info: { icon: "ℹ️" },
};

export default function useNotification() {
  /**
   * Show a toast notification (top-right, 3 seconds)
   * @param {string} message
   * @param {'success'|'error'|'warning'|'info'|string} type
   */
  const notify = (message, type = "info") => {
    const t = String(type || "info").toLowerCase();
    const baseOptions = {
      duration: 3000,
      position: "top-right",
    };

    if (t === "success") return toast.success(message, baseOptions);
    if (t === "error") return toast.error(message, baseOptions);

    // "warning" / "info" or anything else → custom
    const icon = TYPE_STYLES[t]?.icon ?? "🔔";
    return toast(message, { ...baseOptions, icon });
  };

  return notify; // <- so you can call it like notify("Saved!", "success")
}
