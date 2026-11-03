import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import ConsultationForm from './ConsultationForm';
import { EASINGS } from '../../utils/motion';

export default function ConsultationModal({ isOpen, onClose }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.25, ease: EASINGS.gentleOut }}
            className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-[#DCE3EC] overflow-hidden my-4 sm:my-8 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-6 bg-[#07182D] text-white flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#F47721] flex items-center justify-center text-white shadow-xs shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base leading-snug">Đăng Ký Tư Vấn Giải Pháp 30 Phút</h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-300">Dành riêng cho đại diện showroom và đại lý ô tô</p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-8 max-h-[82vh] overflow-y-auto">
              <ConsultationForm isModal onClose={onClose} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
