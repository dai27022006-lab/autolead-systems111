import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, CalendarCheck, Zap } from 'lucide-react';
import { PixelCarOrange } from './PixelIcons';
import PixelFringe from './PixelFringe';

export default function Hero({ onOpenContact, onOpenMvpDemo, onOpenSaas }) {
  return (
    <section
      id="hero"
      className="relative min-h-[720px] lg:min-h-[820px] flex flex-col justify-between pt-28 md:pt-36 overflow-hidden bg-[#327FCB]"
    >
      {/* 16-bit Pixel Art Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/hero-pixel-automotive-world.jpg"
          alt="AutoLead Systems Pixel Art Automotive World - Dealership Showroom & Luxury Cars"
          className="w-full h-full object-cover object-bottom pixelated select-none pointer-events-none"
        />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#142A43]/40 to-transparent pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mb-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline, Value Proposition, Action CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0E2034]/80 backdrop-blur-md border border-white/25 shadow-2xl space-y-5">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#142A43] border border-[#F47721]/50 text-xs font-bold text-white tracking-wide font-mono shadow-xs">
                <PixelCarOrange size={20} />
                <span className="text-[#F47721]">AUTOLEAD</span>
                <span className="text-white/60">•</span>
                <span>AI CHO ĐẠI LÝ Ô TÔ</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.18] drop-shadow-md">
                Chuyển đổi khách hàng tiềm năng thành{' '}
                <span className="text-[#F47721] underline decoration-[#F47721]/60 underline-offset-4">
                  lịch hẹn lái thử
                </span>{' '}
                có giá trị.
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed">
                AutoLead Systems giúp đại lý ô tô thu hút đúng khách hàng, sàng lọc tự động theo 7 tiêu chí TQM và đặt lịch lái thử hiệu quả hơn.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#F47721] hover:bg-[#E76513] shadow-lg shadow-[#F47721]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  <span>Đăng ký tư vấn 30 phút</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onOpenMvpDemo}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-white hover:text-slate-200 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/35 transition-all cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-4 h-4 text-[#F47721]" />
                  <span>Xem demo hệ thống →</span>
                </button>

                {onOpenSaas && (
                  <button
                    type="button"
                    onClick={onOpenSaas}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-xs text-white/90 hover:text-white bg-slate-900/60 hover:bg-slate-900/80 border border-white/20 transition-all cursor-pointer"
                  >
                    <span>Cổng CRM Đại lý</span>
                  </button>
                )}
              </div>

              {/* Offer Highlight */}
              <div className="pt-3 border-t border-white/15 flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#75A94C] shrink-0" />
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
              <span className="w-2.5 h-2.5 rounded-full bg-[#F47721] animate-ping shrink-0" />
              <div>
                <span className="text-[10px] font-mono text-[#F47721] font-bold block uppercase">
                  Chốt lịch hẹn thành công
                </span>
                <span className="font-bold text-white">Thứ 7 • 09:30 tại Showroom</span>
              </div>
              <CalendarCheck className="w-4 h-4 text-[#F47721] shrink-0 ml-1" />
            </div>

            {/* Simulator Badge */}
            <div className="pt-4 text-right">
              <span className="inline-block px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm text-[11px] font-mono text-white/80 border border-white/10">
                AutoLead Dealership Simulator • 16-Bit Engine
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pixel Fringe Transition from Sky/Grass to Section Background */}
      <div className="relative z-20 w-full mt-12 sm:mt-16">
        <PixelFringe color="#FFFFFF" topColor="#75A94C" />
      </div>
    </section>
  );
}
