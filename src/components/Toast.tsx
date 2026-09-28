import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-purple-700 shrink-0" />
  };

  const bgStyles = {
    success: 'bg-[#F0FDF4] border-emerald-200 text-emerald-950',
    error: 'bg-[#FFF1F2] border-rose-200 text-rose-950',
    info: 'bg-[#FAF5FF] border-purple-200 text-purple-950'
  };

  return (
    <aside
      aria-label="Notification"
      className="fixed bottom-6 right-6 z-50 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      <div className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg ${bgStyles[toast.type]}`}>
        {icons[toast.type]}
        <div className="flex-1 text-sm font-medium pr-2 leading-snug">
          {toast.text}
        </div>
      </div>
    </aside>
  );
};
