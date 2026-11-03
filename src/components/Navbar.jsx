import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Database, ShieldCheck, Menu, X, Car, Building2 } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { PixelCarOrange } from './public/PixelIcons';
import { buttonMotion } from '../utils/motion';

const MotionLink = motion.create(Link);

export default function Navbar({
  onOpenContact,
  onOpenLeadViewer
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Trang chủ' },
    { to: '/solutions', label: 'Giải pháp' },
    { to: '/workflow', label: 'Quy trình' },
    { to: '/pricing', label: 'Bảng giá & ROI' },
    { to: '/roadmap', label: 'Lộ trình' },
    { to: '/faq', label: 'Cam kết & FAQ' }
  ];

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  };

  const handleNavClick = (to) => {
    navigate(to);
    handleScrollTop();
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#DCE3EC] py-2.5 shadow-sm text-[#142A43]'
          : 'bg-[#142A43]/90 sm:bg-transparent py-3.5 text-white backdrop-blur-xs sm:backdrop-blur-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Logo Brand */}
          <MotionLink
            to="/"
            onClick={handleScrollTop}
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2.5 group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-[#142A43] flex items-center justify-center p-1 shadow-sm border border-white/20 group-hover:bg-[#07182D] transition-colors shrink-0">
              <PixelCarOrange size={28} />
            </div>
            <div className="shrink-0">
              <div className="flex items-center gap-1.5">
                <span
                  className={`font-black text-lg tracking-tight uppercase transition-colors whitespace-nowrap ${
                    isScrolled ? 'text-[#142A43]' : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]'
                  }`}
                >
                  Auto<span className="text-[#F47721]">Lead</span>
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#F47721] text-white tracking-widest font-mono shadow-xs shrink-0 whitespace-nowrap">
                  PIXEL WORLD
                </span>
              </div>
              <p
                className={`text-[10px] tracking-wider uppercase font-semibold transition-colors whitespace-nowrap ${
                  isScrolled ? 'text-[#64748B]' : 'text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]'
                }`}
              >
                AI Automotive Dealership
              </p>
            </div>
          </MotionLink>

          {/* Desktop Nav Links with Route-aware Active Highlighting */}
          <nav
            className={`hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full transition-all shrink-0 ${
              isScrolled
                ? 'bg-[#F8F9F5] border border-[#DCE3EC]'
                : 'bg-white/25 backdrop-blur-md border border-white/40 shadow-sm'
            }`}
          >
            {navLinks.map((item) => {
              const isActive =
                item.to === '/'
                  ? location.pathname === '/' || location.pathname === ''
                  : location.pathname.startsWith(item.to);

              return (
                <MotionLink
                  key={item.to}
                  to={item.to}
                  onClick={handleScrollTop}
                  whileHover={shouldReduceMotion ? {} : { y: -1 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className={`text-xs font-semibold px-3 py-1 rounded-full transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#F47721] text-white shadow-xs font-bold'
                      : isScrolled
                      ? 'text-[#142A43] hover:text-[#F47721] hover:bg-white'
                      : 'text-white hover:text-[#F47721] hover:bg-white/20 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]'
                  }`}
                >
                  {item.label}
                </MotionLink>
              );
            })}
          </nav>

          {/* Desktop Action Buttons: 2 Connected Interfaces with Spring Physics */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {/* Giao diện 1: Khách hàng */}
            <MotionLink
              to="/demo"
              onClick={handleScrollTop}
              whileHover={shouldReduceMotion ? {} : buttonMotion.whileHover}
              whileTap={shouldReduceMotion ? {} : buttonMotion.whileTap}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs whitespace-nowrap ${
                isScrolled
                  ? 'bg-white hover:bg-orange-50 text-[#142A43] border border-[#DCE3EC]'
                  : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/40 drop-shadow-sm'
              }`}
              title="Giao diện 1: Trải nghiệm luồng đặt lịch lái thử của khách hàng (Buyer Portal)"
            >
              <Car className="w-3.5 h-3.5 text-[#F47721]" />
              <span>🚗 Giao diện 1: Đặt lịch</span>
            </MotionLink>

            {/* Giao diện 2: Doanh nghiệp (CRM) */}
            <MotionLink
              to="/crm"
              onClick={handleScrollTop}
              whileHover={shouldReduceMotion ? {} : buttonMotion.whileHover}
              whileTap={shouldReduceMotion ? {} : buttonMotion.whileTap}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs whitespace-nowrap ${
                isScrolled
                  ? 'bg-[#142A43] hover:bg-[#07182D] text-white border border-[#142A43] ring-1 ring-emerald-400/40'
                  : 'bg-[#142A43]/90 hover:bg-[#142A43] text-white backdrop-blur-md border border-white/30 ring-1 ring-emerald-400/40'
              }`}
              title="Giao diện 2: Hệ thống CRM quản trị và tiếp nhận lead đại lý showroom"
            >
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>🏢 Giao diện 2: CRM Đại lý</span>
            </MotionLink>

            {/* Open Leads Manager Modal */}
            {onOpenLeadViewer && (
              <motion.button
                type="button"
                onClick={onOpenLeadViewer}
                whileHover={shouldReduceMotion ? {} : buttonMotion.whileHover}
                whileTap={shouldReduceMotion ? {} : buttonMotion.whileTap}
                className={`inline-flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  isScrolled
                    ? 'text-[#64748B] hover:text-[#142A43]'
                    : 'text-white/80 hover:text-white drop-shadow-sm'
                }`}
                title="Quản lý và đối soát các yêu cầu tư vấn đã tiếp nhận"
              >
                <Database className="w-3.5 h-3.5 text-[#F47721]" />
                <span className="hidden xl:inline">Quản lý</span>
              </motion.button>
            )}

            {/* CTA Consultation Navigation */}
            <MotionLink
              to="/contact"
              onClick={handleScrollTop}
              whileHover={shouldReduceMotion ? {} : buttonMotion.whileHover}
              whileTap={shouldReduceMotion ? {} : buttonMotion.whileTap}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#F47721] hover:bg-[#E76513] shadow-md shadow-[#F47721]/30 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Đăng ký tư vấn 30 phút</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </MotionLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <MotionLink
              to="/crm"
              onClick={handleScrollTop}
              whileHover={shouldReduceMotion ? {} : buttonMotion.whileHover}
              whileTap={shouldReduceMotion ? {} : buttonMotion.whileTap}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[11px] font-bold flex items-center gap-1"
            >
              <Building2 className="w-3 h-3 text-emerald-300" />
              <span>CRM</span>
            </MotionLink>

            <motion.button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={shouldReduceMotion ? {} : buttonMotion.whileHover}
              whileTap={shouldReduceMotion ? {} : buttonMotion.whileTap}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isScrolled
                  ? 'border-[#DCE3EC] text-[#142A43] hover:bg-[#F8F9F5]'
                  : 'border-white/30 text-white hover:bg-white/10'
              }`}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="lg:hidden bg-[#0E2034] border-b border-white/20 px-4 pt-3 pb-6 space-y-3 shadow-2xl overflow-hidden"
          >
            {/* Primary Action Buttons for Mobile */}
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/10">
              <button
                type="button"
                onClick={() => handleNavClick('/demo')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-gradient-to-r from-[#F47721] to-[#E76513] text-white text-xs font-bold shadow-md cursor-pointer"
              >
                <Car className="w-3.5 h-3.5" />
                <span>🚗 Giao diện 1</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('/crm')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-[#142A43] border border-emerald-400/50 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>🏢 Giao diện 2 (CRM)</span>
              </button>
            </div>

            {/* Subpages Links */}
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {navLinks.map((item) => (
                <button
                  key={item.to}
                  type="button"
                  onClick={() => handleNavClick(item.to)}
                  className={`text-left text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                    location.pathname === item.to
                      ? 'bg-[#F47721] text-white font-bold'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 space-y-2">
              <button
                type="button"
                onClick={() => handleNavClick('/all')}
                className="w-full py-2 px-3 rounded-lg bg-white/10 text-slate-200 hover:text-white text-xs font-medium text-center cursor-pointer"
              >
                📄 Xem trang dài một cuộn (All-in-one)
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('/contact')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs text-white bg-[#F47721] hover:bg-[#E76513] shadow-md shadow-[#F47721]/30 cursor-pointer"
              >
                <span>Đăng ký tư vấn 30 phút</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
