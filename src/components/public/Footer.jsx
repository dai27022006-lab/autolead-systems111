import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Database, ShieldCheck, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PixelCarOrange } from './PixelIcons';
import PixelFringe from './PixelFringe';
import { buttonMotion } from '../../utils/motion';

const MotionLink = motion.create(Link);

export default function Footer({ onOpenLeadViewer }) {
  const shouldReduceMotion = useReducedMotion();

  const navLinks = [
    { to: '/', label: 'Trang chủ' },
    { to: '/solutions', label: 'Thách thức & 6 Giải pháp' },
    { to: '/workflow', label: 'Quy trình 5 bước Lean' },
    { to: '/pricing', label: 'Bảng giá & Dự toán ROI' },
    { to: '/roadmap', label: 'Lộ trình 30 ngày' },
    { to: '/faq', label: 'Cam kết & FAQ' },
    { to: '/contact', label: 'Đăng ký tư vấn B2B' },
    { to: '/all', label: 'Toàn bộ 1 trang (All-in-one)' }
  ];

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  };

  return (
    <footer className="relative bg-[#142A43] text-slate-300 text-xs overflow-hidden">
      {/* Top Pixel Fringe Transition from previous section */}
      <div className="w-full">
        <PixelFringe color="#142A43" topColor="#F8F9F5" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pt-12 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start text-left">
          {/* Col 1: Brand Info & 2 Interface Switcher (5 cols) */}
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
              <MotionLink
                to="/demo"
                onClick={handleScrollTop}
                whileHover={shouldReduceMotion ? {} : buttonMotion.whileHover}
                whileTap={shouldReduceMotion ? {} : buttonMotion.whileTap}
                className="inline-flex items-center justify-center sm:justify-start gap-1.5 px-3.5 py-2 sm:py-1.5 min-h-[40px] sm:min-h-[34px] rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer text-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F47721]" />
                <span>Showroom Giả Lập (AI Widget)</span>
              </MotionLink>

              <MotionLink
                to="/crm"
                onClick={handleScrollTop}
                whileHover={shouldReduceMotion ? {} : buttonMotion.whileHover}
                whileTap={shouldReduceMotion ? {} : buttonMotion.whileTap}
                className="inline-flex items-center justify-center sm:justify-start gap-1.5 px-3.5 py-2 sm:py-1.5 min-h-[40px] sm:min-h-[34px] rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer text-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#75A94C]" />
                <span>Cổng CRM Đại lý</span>
              </MotionLink>

              {onOpenLeadViewer && (
                <motion.button
                  type="button"
                  onClick={onOpenLeadViewer}
                  whileHover={shouldReduceMotion ? {} : buttonMotion.whileHover}
                  whileTap={shouldReduceMotion ? {} : buttonMotion.whileTap}
                  className="inline-flex items-center justify-center sm:justify-start gap-1.5 px-3.5 py-2 sm:py-1.5 min-h-[40px] sm:min-h-[34px] rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer text-xs"
                >
                  <Database className="w-3.5 h-3.5 text-[#4A98E8]" />
                  <span>Showroom Leads</span>
                </motion.button>
              )}
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Khám Phá Nhanh
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

          {/* Col 3: Enterprise Contact & Partnership (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Liên Hệ & Hợp Tác Đại Lý
            </h4>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F47721] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Trụ sở: TP. Hồ Chí Minh & Hà Nội — Kết nối trực tuyến toàn quốc
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hotline B2B: <strong className="text-white font-mono">1900 888 668</strong></span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Email: <strong className="text-white font-mono">contact@autolead.vn</strong></span>
              </div>

              <div className="pt-2 border-t border-white/10">
                <MotionLink
                  to="/contact"
                  onClick={handleScrollTop}
                  whileHover={shouldReduceMotion ? {} : buttonMotion.whileHover}
                  whileTap={shouldReduceMotion ? {} : buttonMotion.whileTap}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#F47721] hover:bg-[#E76513] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
                >
                  <span>Đăng ký tư vấn triển khai 30 phút</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </MotionLink>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 AutoLead Systems. Tác nghiệp thương mại điện tử ô tô thông minh.</p>
          <p className="flex items-center gap-1">
            <span>Thiết kế theo chuẩn 16-bit Pixel Art & Tác nghiệp TQM 7 Tiêu Chí</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
