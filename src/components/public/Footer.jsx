import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Database, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PixelCarOrange } from './PixelIcons';
import PixelFringe from './PixelFringe';
import { buttonMotion, defaultViewport, EASINGS } from '../../utils/motion';

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

  const members = [
    { stt: 1, name: 'Trần Tất Khoa', mssv: '24747281', role: 'Nhóm trưởng — Tổng hợp & Biên tập đề tài', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    { stt: 2, name: 'La Trúc Ly', mssv: '24739431', role: 'Phần 4.3 — Minh chứng & Triển khai', badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    { stt: 3, name: 'Nguyễn Phương Tiến Đạt', mssv: '24741031', role: 'Phần 1.4-1.6 & 4.5 — VSM, Lean, TQM & PDCA', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    { stt: 4, name: 'Đinh Hà Ngọc Anh', mssv: '24717371', role: 'Phần 3.1-3.2 — Nội dung & Thiết kế UI/UX', badge: 'bg-pink-500/20 text-pink-300 border-pink-500/30' },
    { stt: 5, name: 'Nguyễn Tuấn Phát Đại', mssv: '24722481', role: 'Phần 1.2 — Core MVP, Buyer Portal & CRM', badge: 'bg-[#F47721]/20 text-[#F47721] border-[#F47721]/40' },
    { stt: 6, name: 'Phạm Thị Thảo Vy', mssv: '24731791', role: 'Phần 2.1, 2.3, 4.1 & 4.4 — Giá trị & BMC', badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    { stt: 7, name: 'Bùi Thị Mai Linh', mssv: '24743391', role: 'Phần 1.1 & 1.3 — Nghiệp vụ, I-T-O & BPM', badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
    { stt: 8, name: 'Nguyễn Thị Băng Băng', mssv: '24732831', role: 'Phần 4.2 — Truyền thông & Ngân sách', badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
    { stt: 9, name: 'Nguyễn Đình Đảm', mssv: '24719271', role: 'Phần 2.2 — Lời chào hàng Offer & Tiêu chuẩn', badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
    { stt: 10, name: 'Trần Đăng Thắng', mssv: '24724291', role: 'Phần 3.3 & 3.4 — Code Sale Page 16-Bit & QA', badge: 'bg-[#F47721]/20 text-[#F47721] border-[#F47721]/40' }
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pt-12 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start text-left">
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
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
                <span>Buyer Demo (Giao diện 1)</span>
              </MotionLink>

              <MotionLink
                to="/crm"
                onClick={handleScrollTop}
                whileHover={shouldReduceMotion ? {} : buttonMotion.whileHover}
                whileTap={shouldReduceMotion ? {} : buttonMotion.whileTap}
                className="inline-flex items-center justify-center sm:justify-start gap-1.5 px-3.5 py-2 sm:py-1.5 min-h-[40px] sm:min-h-[34px] rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer text-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#75A94C]" />
                <span>Cổng CRM Đại lý (Giao diện 2)</span>
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

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
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

          {/* Col 3: Academic & 10 Members Context (6 cols) */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F47721] animate-pulse" />
                <span>Thông Tin Đồ Án Học Phần</span>
              </h4>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" />
                <span>Hoàn thành 100%</span>
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.5, ease: EASINGS.gentleOut }}
              className="p-4 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/15 space-y-3 text-[11px] leading-relaxed shadow-xl backdrop-blur-sm"
            >
              {/* Header Info */}
              <div className="space-y-1 pb-2.5 border-b border-white/10">
                <p className="font-bold text-white text-xs flex items-center gap-1.5">
                  <span className="text-[#F47721] font-mono">▸</span>
                  <span>Môn học: Quản trị tác nghiệp Thương mại điện tử</span>
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-300 text-[11px]">
                  <span>GVHD: <strong className="text-amber-300">TS. Võ Thị Minh Nhựt</strong></span>
                  <span className="text-slate-600">•</span>
                  <span>Lớp: <strong className="text-[#4A98E8] font-mono">DHTMDT20C-TCTA</strong></span>
                  <span className="text-slate-600">•</span>
                  <span className="px-2 py-0.2 rounded bg-[#F47721]/20 text-[#F47721] border border-[#F47721]/40 font-bold text-[10px] tracking-wide">
                    NHÓM 2
                  </span>
                </div>
              </div>

              {/* 10 Members - 2-Column Responsive Card Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {members.map((m) => (
                  <motion.div
                    key={m.mssv}
                    whileHover={shouldReduceMotion ? {} : { y: -2, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                    transition={{ duration: 0.15 }}
                    className="p-1.5 px-2.5 rounded-xl bg-white/[0.04] border border-white/5 hover:border-[#F47721]/40 transition-all flex flex-col justify-between group cursor-default"
                  >
                    <div className="flex items-center justify-between gap-1 text-[11px]">
                      <span className="font-semibold text-white group-hover:text-amber-200 transition-colors truncate" title={m.name}>
                        <span className="text-[#F47721] font-mono font-bold mr-1">{m.stt}.</span>
                        {m.name}
                      </span>
                      <span className="font-mono text-[9.5px] text-[#4A98E8] bg-[#4A98E8]/15 px-1.5 py-0.2 rounded border border-[#4A98E8]/25 shrink-0">
                        {m.mssv}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-300 truncate mt-0.5" title={m.role}>
                      {m.role}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Subtle footer summary line */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                <span className="text-emerald-400 font-mono font-medium flex items-center gap-1">
                  <span>★</span> Đánh giá: 10/10 thành viên đạt 100%
                </span>
                <span className="text-slate-400 font-mono">
                  Master Integration • 2 Interconnected Systems
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 AutoLead Systems. Tác nghiệp thương mại điện tử ô tô thông minh.</p>
          <p className="flex items-center gap-1">
            <span>Thiết kế theo chuẩn 16-bit Pixel Art & Tác nghiệp TQM</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
