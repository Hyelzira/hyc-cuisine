import type { ToastData } from '../../context/ToastContext';

export function Toast({ toast }: { toast: ToastData }) {
  return (
    <div
      className={`pointer-events-auto flex items-center gap-3 px-5 py-4 border shadow-lg transition-all duration-300 animate-in slide-in-from-right-8
        ${
          toast.type === 'success'
            ? 'bg-neutral-900 border-green-500/50 text-green-400'
            : toast.type === 'error'
            ? 'bg-neutral-900 border-red-500/50 text-red-400'
            : 'bg-neutral-900 border-amber-400/50 text-amber-400'
        }
      `}
    >
      {toast.type === 'success' && <span>✓</span>}
      {toast.type === 'error' && <span>✕</span>}
      {toast.type === 'info' && <span>ℹ</span>}
      
      <p className="text-sm font-medium">{toast.message}</p>
    </div>
  );
}