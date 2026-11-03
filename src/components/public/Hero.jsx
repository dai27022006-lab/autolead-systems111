import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap, Car, Building2 } from 'lucide-react';
import { PixelCarOrange } from './PixelIcons';
import PixelFringe from './PixelFringe';
import heroBg from '../../assets/hero-pixel-automotive-world.jpg';

export default function Hero({ onOpenContact, onOpenMvpDemo, onOpenSaas }) {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  };

  return (
    <section
      id="hero"
      className="relative min-h-[720px] lg:min-h-[820px] flex flex-col justify-between pt-28 md:pt-36 overflow-hidden bg-[#327FCB]"
    >
      {/* 16-bit Pixel Art Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="AutoLead Systems Pixel Art Automotive World - Dealership Showroom & Luxury Cars"
          className="w-full h-full object-cover object-bottom pixelated select-none pointer-events-none"
        />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#142A43]/40 to-transparent pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mb-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline, Value Proposition, Action CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0E2034]/80 backdrop-blur-md border border-white/25 shadow-2xl space-y-5">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#142A43] border border-[#F47721]/50 text-xs font-bold text-white tracking-wide font-mono shadow-xs">
                <PixelCarOrange size={20} />
                <span className="text-[#F47721]">AUTOLEAD</span>
                <span className="text-white/60">•</span>
                <span>HỆ THỐNG 2 GIAO DIỆN TÍCH HỢP</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.18] drop-shadow-md">
                Chuyển đổi khách hàng tiềm năng thành{' '}
                <span className="text-[#F47721] underline decoration-[#F47721]/60 underline-offset-4">
                  lịch hẹn lái thử
                </span>{' '}
                có giá trị.
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-base text-slate-200 font-normal leading-relaxed">
                AutoLead Systems xây dựng mô hình web thống nhất gồm <strong>2 giao diện kết nối qua CSDL chung</strong>: Cổng khách hàng đặt lịch & Hệ thống CRM tiếp nhận, phân luồng và quản lý lead cho đại lý.
              </p>

              {/* CTAs: 2 Connected Interfaces prominent buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  to="/demo"
                  onClick={handleScrollTop}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#F47721] to-[#E76513] hover:from-[#E76513] hover:to-[#D55302] shadow-lg shadow-[#F47721]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer min-h-[48px]"
                >
                  <Car className="w-4 h-4 text-white" />
                  <span>🚗 Giao diện 1: Đặt lịch</span>
                </Link>

                <Link
                  to="/crm"
                  onClick={handleScrollTop}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs text-white bg-[#142A43] hover:bg-[#07182D] border-2 border-emerald-400/50 shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer min-h-[48px]"
                >
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>🏢 Giao diện 2: CRM Đại lý</span>
                </Link>

                <Link
                  to="/contact"
                  onClick={handleScrollTop}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl font-semibold text-xs text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer min-h-[48px]"
                >
                  <span>Tư vấn B2B</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F47721]" />
                </Link>
              </div>

              {/* Visual Synchronized Connection Badge */}
              <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-between text-[11px] text-emerald-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Hai giao diện tự động đồng bộ thời gian thực qua CSDL chung (0.05s)</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-white bg-emerald-600/40 px-2 py-0.5 rounded">
                  Live Synced
                </span>
              </div>

              {/* Offer Highlight */}
              <div className="pt-3 border-t border-white/15 flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#75A94C] shrink-0 mt-0.5" />
                <span>
                  Offer chính thức:{' '}
                  <strong className="text-white">15.000.000 VNĐ</strong> setup 30 ngày +{' '}
                  <strong className="text-[#F47721]">300.000 VNĐ</strong> / lịch hẹn đủ điều kiện.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating AI Operation Status Cards */}
          <div className="lg:col-span-5 hidden sm:flex flex-col items-end space-y-3 pt-6 lg:pt-0">
            {/* Card 1 */}
            <div className="px-4 py-2.5 rounded-2xl bg-[#0E2034]/85 backdrop-blur-md border border-white/20 text-xs text-white shadow-xl flex items-center gap-3 animate-pulse hover:bg-[#0E2034]/95 transition-all">
              <span className="w-2.5 h-2.5 rounded-full bg-[#159B68] shrink-0" />
              <div>
                <span className="text-[10px] font-mono text-[#75A94C] font-bold block uppercase">
                  Tiếp nhận tức thì &lt;60s
                </span>
                <span className="font-semibold">Khách quan tâm SUV hạng sang GLC 300</span>
              </div>
              <Zap className="w-4 h-4 text-[#159B68] shrink-0 ml-1" />
            </div>

            {/* Card 2 */}
            <div className="px-4 py-2.5 rounded-2xl bg-[#0E2034]/85 backdrop-blur-md border border-white/20 text-xs text-white shadow-xl flex items-center gap-3 hover:bg-[#0E2034]/95 transition-all">
              <span className="w-2.5 h-2.5 rounded-full bg-[#159B68] shrink-0" />
              <div>
                <span className="text-[10px] font-mono text-[#75A94C] font-bold block uppercase">
                  Sàng lọc 7 tiêu chí TQM đạt chuẩn
                </span>
                <span className="font-semibold">Xác thực SĐT & ngân sách mua xe &gt;1.5 tỷ</span>
              </div>
              <ShieldCheck className="w-4 h-4 text-[#159B68] shrink-0 ml-1" />
            </div>

            {/* Card 3 */}
            <div className="px-4 py-2.5 rounded-2xl bg-[#0E2034]/90 backdrop-blur-md border border-[#F47721]/60 text-xs text-white shadow-2xl flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F47721] shrink-0" />
              <div>
                <span className="text-[10px] font-mono text-[#F47721] font-bold block uppercase">
                  Đã tự động xác nhận lịch hẹn
                </span>
                <span className="font-semibold">Showroom Haxaco • 10:00 Thứ Bảy</span>
              </div>
              <PixelCarOrange size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Transition Fringe */}
      <div className="w-full relative z-10">
        <PixelFringe color="#F8F9F5" topColor="transparent" />
      </div>
    </section>
  );
}
