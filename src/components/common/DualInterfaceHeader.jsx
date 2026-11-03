import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Building2, ShieldCheck, Sparkles, ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';

export default function DualInterfaceHeader({ leadsCount = 0, onResetData, currentUser, onLogout }) {
  const location = useLocation();
  const isDemo = location.pathname.startsWith('/demo') || location.pathname.startsWith('/buyer');
  const isCrm = location.pathname.startsWith('/crm');

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#07182D] text-white border-b-2 border-[#F47721] shadow-2xl">
      {/* Top Banner: Notice of Dual-Interface Connected System */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex flex-col md:flex-row items-center justify-between gap-2.5">
        {/* Left: Brand & System Label */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <Link
            to="/"
            onClick={handleScrollTop}
            className="flex items-center gap-2 group cursor-pointer shrink-0"
            title="Quay lại trang giới thiệu B2B AutoLead Systems"
          >
            <div className="w-8 h-8 rounded-lg bg-[#F47721] flex items-center justify-center font-black text-sm text-white shadow-xs group-hover:scale-105 transition-transform">
              AL
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm tracking-tight">AutoLead</span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-orange-500/20 text-[#F47721] border border-[#F47721]/40 font-mono">
                  HỆ THỐNG 2 GIAO DIỆN
                </span>
              </div>
              <p className="text-[10px] text-slate-300 font-mono hidden sm:block">
                Khách Hàng (Portal) ⇄ Doanh Nghiệp (CRM chung CSDL)
              </p>
            </div>
          </Link>

          {/* Real-time Synced Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Real-time Synced</span>
          </div>

          <Link
            to="/"
            onClick={handleScrollTop}
            className="md:hidden text-[11px] text-slate-300 hover:text-white flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3 text-[#F47721]" />
            <span>Về B2B</span>
          </Link>
        </div>

        {/* Center: THE TWO GIANT PROMINENT INTERFACE SWITCHER BUTTONS */}
        <div className="flex items-center p-1 sm:p-1.5 rounded-2xl bg-[#0D2137] border-2 border-[#F47721]/50 shadow-inner w-full md:w-auto justify-center">
          {/* GIAO DIỆN 1: KHÁCH HÀNG */}
          <Link
            to="/demo"
            onClick={handleScrollTop}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[42px] ${
              isDemo
                ? 'bg-gradient-to-r from-[#F47721] to-[#E76513] text-white shadow-lg font-black ring-2 ring-white/40'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Car className={`w-4 h-4 shrink-0 ${isDemo ? 'text-white' : 'text-[#F47721]'}`} />
            <div className="text-left">
              <span className="block text-[11px] sm:text-xs leading-tight font-black tracking-wide">
                GIAO DIỆN 1: KHÁCH HÀNG
              </span>
              <span className={`text-[9px] block font-medium ${isDemo ? 'text-white' : 'text-slate-400'}`}>
                {isDemo ? '● Đang xem (Đặt lịch xe)' : 'Bấm mở Cổng đặt lịch'}
              </span>
            </div>
          </Link>

          {/* Connection Divider Icon */}
          <div className="px-2 text-[#F47721] font-black hidden sm:block animate-pulse text-sm">
            ⇄
          </div>

          {/* GIAO DIỆN 2: DOANH NGHIỆP (CRM) */}
          <Link
            to="/crm"
            onClick={handleScrollTop}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[42px] relative ${
              isCrm
                ? 'bg-gradient-to-r from-[#1E5B99] to-[#142A43] text-white shadow-lg font-black ring-2 ring-emerald-400'
                : 'text-emerald-300 hover:text-white hover:bg-white/10 bg-emerald-500/10 border border-emerald-400/40'
            }`}
          >
            <Building2 className={`w-4 h-4 shrink-0 ${isCrm ? 'text-emerald-400' : 'text-emerald-300'}`} />
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="block text-[11px] sm:text-xs leading-tight font-black tracking-wide">
                  GIAO DIỆN 2: DOANH NGHIỆP
                </span>
                {leadsCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-white text-[9px] font-black animate-pulse">
                    {leadsCount} lead
                  </span>
                )}
              </div>
              <span className={`text-[9px] block font-medium ${isCrm ? 'text-emerald-200' : 'text-emerald-400 font-bold'}`}>
                {isCrm ? '● Đang xem (CRM Showroom)' : '👉 BẤM MỞ CRM TIẾP NHẬN LEAD'}
              </span>
            </div>
          </Link>
        </div>

        {/* Right Actions: Back to B2B, Reset seed & Logout */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {onResetData && (
            <button
              type="button"
              onClick={onResetData}
              title="Khôi phục lại dữ liệu mẫu gốc"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[11px] font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3 text-[#F47721]" />
              <span>Reset Dữ Liệu</span>
            </button>
          )}

          {currentUser && onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="px-2.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-[11px] font-medium transition-colors cursor-pointer"
            >
              Đăng xuất
            </button>
          )}

          <Link
            to="/"
            onClick={handleScrollTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 hover:text-white border border-white/15 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#F47721]" />
            <span>Về B2B</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
