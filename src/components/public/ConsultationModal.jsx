import React from 'react';
import { X, Sparkles } from 'lucide-react';
import ConsultationForm from './ConsultationForm';

export default function ConsultationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#DCE3EC] overflow-hidden my-8">
        {/* Modal Header */}
        <div className="p-6 bg-[#07182D] text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F47721] flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">Đăng Ký Tư Vấn Giải Pháp 30 Phút</h3>
              <p className="text-[11px] text-slate-300">Dành riêng cho đại diện showroom và đại lý ô tô</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          <ConsultationForm isModal onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
