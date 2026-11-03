import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, Building2, ChevronDown, ChevronUp, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { buttonMotion } from '../../utils/motion';

const MotionLink = motion.create(Link);

export default function DemoCornerWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  };

  return (
    <aside aria-label="MVP Demo Switcher" className="fixed bottom-5 left-5 z-40 select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-2 p-3.5 rounded-2xl bg-[#0E2034]/95 backdrop-blur-xl border border-white/20 shadow-2xl text-white w-72 space-y-2.5"
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F47721]" />
                <span className="text-[11px] font-mono font-bold tracking-wider text-slate-200 uppercase">
                  Môi Trường Thực Nghiệm MVP
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Đóng bảng thực nghiệm"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed">
              Dành cho hội đồng & nhóm dự án kiểm tra 2 luồng kết nối dữ liệu thời gian thực:
            </p>

            <div className="space-y-1.5">
              <MotionLink
                to="/demo"
                onClick={() => {
                  handleScrollTop();
                  setIsOpen(false);
                }}
                whileHover={shouldReduceMotion ? {} : buttonMotion.whileHover}
                whileTap={shouldReduceMotion ? {} : buttonMotion.whileTap}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 hover:bg-[#F47721] text-white transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#F47721] group-hover:text-white transition-colors" />
                  <div className="text-left">
                    <span className="text-xs font-bold block">Showroom Giả Lập</span>
                    <span className="text-[10px] text-slate-300 group-hover:text-white/90">
                      Có nhúng AI Widget tư vấn
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-black/30 px-1.5 py-0.5 rounded text-white/80">
                  GD 1
                </span>
              </MotionLink>

              <MotionLink
                to="/crm"
                onClick={() => {
                  handleScrollTop();
                  setIsOpen(false);
                }}
                whileHover={shouldReduceMotion ? {} : buttonMotion.whileHover}
                whileTap={shouldReduceMotion ? {} : buttonMotion.whileTap}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 hover:bg-emerald-600 text-white transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400 group-hover:text-white transition-colors" />
                  <div className="text-left">
                    <span className="text-xs font-bold block">Cổng CRM Đại Lý</span>
                    <span className="text-[10px] text-slate-300 group-hover:text-white/90">
                      Tiếp nhận lead & phân luồng
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-black/30 px-1.5 py-0.5 rounded text-white/80">
                  GD 2
                </span>
              </MotionLink>
            </div>

            <div className="pt-1 border-t border-white/10 flex items-center justify-between text-[10px] text-emerald-400 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Synced: 0.05s
              </span>
              <span className="text-slate-400">HashRouter</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
        className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold transition-all shadow-xl cursor-pointer border ${
          isOpen
            ? 'bg-[#F47721] text-white border-white/30 shadow-[#F47721]/40'
            : 'bg-[#0E2034]/90 hover:bg-[#0E2034] text-slate-200 hover:text-white border-white/20 backdrop-blur-md'
        }`}
        title="Bấm để mở thực nghiệm Showroom giả lập hoặc CRM"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-mono text-[11px] tracking-wide">Demo MVP (2 Giao Diện)</span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </motion.button>
    </aside>
  );
}
