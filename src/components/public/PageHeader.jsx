import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';

export default function PageHeader({
  badge = 'AUTOLEAD SYSTEMS',
  title,
  subtitle,
  breadcrumbCurrent,
  showDemoCta = true
}) {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  };

  return (
    <div className="relative bg-[#142A43] text-white pt-28 pb-12 px-4 sm:px-6 lg:px-8 border-b border-[#DCE3EC]/20 overflow-hidden">
      {/* Decorative subtle background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F47721]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#327FCB]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb & Navigation helper */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
            <Link
              to="/"
              onClick={handleScrollTop}
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-[#F47721]" />
              <span>Trang chủ</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#F47721] font-semibold">{breadcrumbCurrent || title}</span>
          </nav>

          <Link
            to="/"
            onClick={handleScrollTop}
            className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3 h-3 text-[#F47721]" />
            <span>Về Trang chủ</span>
          </Link>
        </div>

        {/* Header content */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-bold text-[#F47721] tracking-wider uppercase font-mono shadow-xs">
            <span>{badge}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {subtitle}
            </p>
          )}

          {showDemoCta && (
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <Link
                to="/demo"
                onClick={handleScrollTop}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-[#F47721] hover:bg-[#E76513] shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Xem Demo Khách Mua Xe →</span>
              </Link>
              <Link
                to="/crm"
                onClick={handleScrollTop}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#75A94C]" />
                <span>Cổng Quản Trị CRM Đại Lý</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
