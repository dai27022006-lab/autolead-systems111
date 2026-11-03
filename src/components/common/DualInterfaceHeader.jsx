import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Building2, ArrowLeft, RefreshCw } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { buttonMotion } from '../../utils/motion';

const MotionLink = motion.create(Link);

export default function DualInterfaceHeader({ leadsCount = 0, onResetData, currentUser, onLogout }) {
  const shouldReduceMotion = useReducedMotion();
  const location = useLocation();
  const isDemo = location.pathname.startsWith('/demo') || location.pathname.startsWith('/buyer');
  const isCrm = location.pathname.startsWith('/crm');

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#07182D] text-white border-b-2 border-[#F47721] shadow-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-3">
          
          {/* Top Row on Mobile / Left Section on Desktop: Brand & Quick Exit */}
          <div className="flex items-center justify-between w-full md:w-auto gap-2.5 shrink-0">
            <Link
              to="/"
              onClick={handleScrollTop}
              className="flex items-center gap-2 group cursor-pointer shrink-0"
              title="Quay lại trang giới thiệu B2B AutoLead Systems"
            >
              <div className="w-8 h-8 rounded-lg bg-[#F47721] flex items-center justify-center font-black text-sm text-white shadow-xs group-hover:scale-105 transition-transform shrink-0">
                AL
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-sm tracking-tight whitespace-nowrap">AutoLead</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-500/20 text-[#F47721] border border-[#F47721]/40 font-mono whitespace-nowrap">
                    2 GIAO DIỆN
                  </span>
                </div>
                <p className="text-[10px] text-slate-300 font-mono hidden xl:block whitespace-nowrap">
                  Khách Hàng (Portal) ⇄ Doanh Nghiệp (CRM chung CSDL)
                </p>
              </div>
            </Link>

            {/* Real-time Synced Indicator on large screens */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold shrink-0 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Real-time Synced</span>
            </div>

            {/* Mobile Back Button */}
            <Link
              to="/"
              onClick={handleScrollTop}
              className="md:hidden text-xs text-slate-300 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 shrink-0 border border-white/15"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#F47721]" />
              <span>Về B2B</span>
            </Link>
          </div>

          {/* Center Section: THE TWO PROMINENT INTERFACE SWITCHER TABS */}
          <div className="flex items-center p-1 rounded-2xl bg-[#0D2137] border-2 border-[#F47721]/50 shadow-inner w-full md:w-auto justify-center max-w-full">
            {/* GIAO DIỆN 1: KHÁCH HÀNG */}
            <MotionLink
              to="/demo"
              onClick={handleScrollTop}
              whileHover={shouldReduceMotion ? {} : buttonMotion.whileHover}
              whileTap={shouldReduceMotion ? {} : buttonMotion.whileTap}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all cursor-pointer select-none ${
                isDemo
                  ? 'bg-gradient-to-r from-[#F47721] to-[#E76513] text-white shadow-lg font-black ring-2 ring-white/40'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Car className={`w-4 h-4 shrink-0 ${isDemo ? 'text-white' : 'text-[#F47721]'}`} />
              <div className="text-left flex flex-col justify-center">
                <span className="text-xs sm:text-[13px] font-black tracking-wide whitespace-nowrap leading-tight">
                  <span className="hidden sm:inline">Giao diện 1: Khách hàng</span>
                  <span className="sm:hidden">GD 1: Khách hàng</span>
                </span>
                <span className={`text-[9.5px] sm:text-[10px] font-medium leading-tight mt-0.5 whitespace-nowrap ${isDemo ? 'text-white/95' : 'text-slate-400'}`}>
                  <span className="hidden sm:inline">{isDemo ? '● Đang xem (Đặt lịch xe)' : 'Bấm mở Cổng đặt lịch'}</span>
                  <span className="sm:hidden">{isDemo ? '● Đang xem' : 'Mở đặt lịch'}</span>
                </span>
              </div>
            </MotionLink>

            {/* Connection Divider Icon */}
            <div className="px-1.5 sm:px-2 text-[#F47721] font-black text-xs sm:text-sm animate-pulse shrink-0">
              ⇄
            </div>

            {/* GIAO DIỆN 2: DOANH NGHIỆP (CRM) */}
            <MotionLink
              to="/crm"
              onClick={handleScrollTop}
              whileHover={shouldReduceMotion ? {} : buttonMotion.whileHover}
              whileTap={shouldReduceMotion ? {} : buttonMotion.whileTap}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all cursor-pointer select-none ${
                isCrm
                  ? 'bg-gradient-to-r from-[#1E5B99] to-[#142A43] text-white shadow-lg font-black ring-2 ring-emerald-400'
                  : 'text-emerald-300 hover:text-white hover:bg-white/10 bg-emerald-500/10 border border-emerald-400/40'
              }`}
            >
              <Building2 className={`w-4 h-4 shrink-0 ${isCrm ? 'text-emerald-400' : 'text-emerald-300'}`} />
              <div className="text-left flex flex-col justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-[13px] font-black tracking-wide whitespace-nowrap leading-tight">
                    <span className="hidden sm:inline">Giao diện 2: Doanh nghiệp</span>
                    <span className="sm:hidden">GD 2: Doanh nghiệp</span>
                  </span>
                  {leadsCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-white text-[9px] font-black shrink-0 whitespace-nowrap animate-pulse">
                      {leadsCount}
                    </span>
                  )}
                </div>
                <span className={`text-[9.5px] sm:text-[10px] font-medium leading-tight mt-0.5 whitespace-nowrap ${isCrm ? 'text-emerald-200' : 'text-emerald-400 font-bold'}`}>
                  <span className="hidden sm:inline">{isCrm ? '● Đang xem (CRM Đại lý)' : '👉 Bấm mở CRM Đại lý'}</span>
                  <span className="sm:hidden">{isCrm ? '● Đang xem' : '👉 Mở CRM'}</span>
                </span>
              </div>
            </MotionLink>
          </div>

          {/* Right Section: Desktop Actions */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {onResetData && (
              <button
                type="button"
                onClick={onResetData}
                title="Khôi phục lại dữ liệu mẫu gốc"
                className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[11px] font-medium text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0 whitespace-nowrap"
              >
                <RefreshCw className="w-3 h-3 text-[#F47721]" />
                <span>Reset Data</span>
              </button>
            )}

            {currentUser && onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="px-2.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-[11px] font-medium transition-colors cursor-pointer shrink-0 whitespace-nowrap"
              >
                Đăng xuất
              </button>
            )}

            <Link
              to="/"
              onClick={handleScrollTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 hover:text-white border border-white/15 transition-all cursor-pointer shrink-0 whitespace-nowrap"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#F47721]" />
              <span>Về B2B</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
