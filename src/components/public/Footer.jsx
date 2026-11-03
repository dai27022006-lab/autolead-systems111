import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Database, ShieldCheck } from 'lucide-react';
import { PixelCarOrange } from './PixelIcons';
import PixelFringe from './PixelFringe';

export default function Footer({ onOpenLeadViewer }) {
  const navLinks = [
    { to: '/', label: 'Trang chủ' },
    { to: '/solutions', label: 'Thách thức & 6 Giải pháp' },
    { to: '/workflow', label: 'Quy trình 5 bước Lean' },
    { to: '/pricing', label: 'Bảng giá & Dự toán ROI' },
    { to: '/roadmap', label: 'Lộ trình 30 ngày' },
    { to: '/faq', label: 'Cam kết & FAQ' },
    { to: '/contact', label: 'Đăng ký tư vấn B2B' },
    { to: '/all', label: 'Xem toàn bộ 1 trang (All-in-one)' }
  ];

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  };

  return (
    <footer className="relative bg-[#142A43] text-slate-300 text-xs">
      {/* Top Pixel Fringe Transition from previous section */}
      <div className="w-full">
        <PixelFringe color="#142A43" topColor="#F8F9F5" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pt-12 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start text-left">
          {/* Col 1: Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#07182D] border border-white/20 flex items-center justify-center p-1 shadow-sm">
                <PixelCarOrange size={28} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-lg text-white tracking-tight uppercase">
                    Auto<span className="text-[#F47721]">Lead</span>
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#F47721] text-white tracking-widest font-mono">
                    PIXEL WORLD
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                  AI Automotive Dealership Operations
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Hệ thống tiếp nhận, thẩm định và đặt lịch hẹn lái thử tự động ứng dụng trí tuệ nhân tạo chuyên biệt cho đại lý ô tô và showroom xe lướt cao cấp.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-2 pt-2">
              <Link
                to="/demo"
                onClick={handleScrollTop}
                className="inline-flex items-center justify-center sm:justify-start gap-1.5 px-3.5 py-2.5 sm:py-1.5 min-h-[44px] sm:min-h-[36px] rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F47721]" />
                <span>Trải nghiệm Buyer Demo</span>
              </Link>

              <Link
                to="/crm"
                onClick={handleScrollTop}
                className="inline-flex items-center justify-center sm:justify-start gap-1.5 px-3.5 py-2.5 sm:py-1.5 min-h-[44px] sm:min-h-[36px] rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#75A94C]" />
                <span>Cổng CRM Đại lý</span>
              </Link>

              {onOpenLeadViewer && (
                <button
                  type="button"
                  onClick={onOpenLeadViewer}
                  className="inline-flex items-center justify-center sm:justify-start gap-1.5 px-3.5 py-2.5 sm:py-1.5 min-h-[44px] sm:min-h-[36px] rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer"
                >
                  <Database className="w-3.5 h-3.5 text-[#4A98E8]" />
                  <span>Xem Showroom Leads</span>
                </button>
              )}
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Khám Phá Các Trang
            </h4>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={handleScrollTop}
                    className="text-slate-400 hover:text-[#F47721] transition-colors py-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Academic & Integration Context (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Thông Tin Đồ Án Học Phần
            </h4>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-[11px] leading-relaxed">
              <p className="font-semibold text-white">
                Môn học: Quản trị tác nghiệp Thương mại điện tử
              </p>
              <div className="space-y-1 text-slate-300">
                <p>
                  • <strong>Phần 1.2:</strong> Trần Quang Đại — Core MVP, Buyer Portal & Automotive CRM
                </p>
                <p>
                  • <strong>Phần 3.3 & 3.4:</strong> Nguyễn Việt Thắng — B2B Sales Page, 16-Bit Pixel Art UI & Supabase Leads
                </p>
              </div>
              <p className="text-slate-400 pt-1 border-t border-white/10 text-[10px]">
                Phiên bản hợp nhất Master Integration • Đầy đủ điều hướng đa trang React Router
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 AutoLead Systems. Tác nghiệp thương mại điện tử ô tô thông minh.</p>
          <p className="flex items-center gap-1">
            <span>Thiết kế theo chuẩn Multi-page SPA Routing & Tác nghiệp TQM</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
