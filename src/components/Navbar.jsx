import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Database, ShieldCheck, Menu, X, Car, Building2, User, LogIn } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { PixelCarOrange } from './public/PixelIcons';
import { buttonMotion } from '../utils/motion';
import { api } from '../services/api';

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

  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { to: '/', sectionId: 'hero', label: 'Trang chủ' },
    { to: '/solutions', sectionId: 'solutions', label: 'Giải pháp' },
    { to: '/workflow', sectionId: 'workflow', label: 'Quy trình' },
    { to: '/pricing', sectionId: 'pricing', label: 'Bảng giá & ROI' },
    { to: '/roadmap', sectionId: 'roadmap', label: 'Lộ trình' },
    { to: '/faq', sectionId: 'faq', label: 'Cam kết & FAQ' }
  ];

  // ScrollSpy for Sale Page sections
  useEffect(() => {
    if (location.pathname !== '/' && location.pathname !== '') return;
    const sectionIds = ['hero', 'solutions', 'workflow', 'pricing', 'roadmap', 'faq'];
    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [location.pathname]);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  };

  const handleNavClick = (item) => {
    setMobileMenuOpen(false);
    const isTargetSection = typeof item === 'object' && item.sectionId;
    const targetSectionId = isTargetSection ? item.sectionId : null;
    const targetTo = typeof item === 'string' ? item : item.to;

    if (location.pathname === '/' || location.pathname === '') {
      if (targetSectionId) {
        if (targetSectionId === 'hero') {
          handleScrollTop();
          setActiveSection('hero');
        } else {
          const el = document.getElementById(targetSectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(targetSectionId);
          }
        }
        return;
      }
    }

    if (targetSectionId) {
      navigate('/');
      setTimeout(() => {
        if (targetSectionId === 'hero') {
          handleScrollTop();
        } else {
          const el = document.getElementById(targetSectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
    } else {
      navigate(targetTo);
      handleScrollTop();
    }
  };

  const handleLoginToDashboard = async () => {
    setMobileMenuOpen(false);
    if (!api.getCurrentUser()) {
      await api.login('dealer@haxaco.vn', 'demo123');
    }
    navigate('/crm');
    handleScrollTop();
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
          {/* Logo Brand: Logo xe + AutoLead Systems + Slogan */}
          <MotionLink
            to="/"
            onClick={() => handleNavClick(navLinks[0])}
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2.5 group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-[#142A43] flex items-center justify-center p-1 shadow-sm border border-white/20 group-hover:bg-[#07182D] transition-colors shrink-0">
              <PixelCarOrange size={28} />
            </div>
            <div className="flex flex-col text-left">
              <span
                className={`font-black text-lg sm:text-xl tracking-tight leading-none uppercase transition-colors whitespace-nowrap ${
                  isScrolled ? 'text-[#142A43]' : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]'
                }`}
              >
                Auto<span className="text-[#F47721]">Lead</span> <span className="text-xs font-bold tracking-wider opacity-90">SYSTEMS</span>
              </span>
              <span
                className={`text-[9px] sm:text-[10px] font-medium tracking-tight leading-tight mt-0.5 whitespace-nowrap hidden sm:block ${
                  isScrolled ? 'text-[#64748B]' : 'text-white/85 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]'
                }`}
              >
                From Leads to Qualified Test Drives.
              </span>
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
              const isHome = location.pathname === '/' || location.pathname === '';
              const isActive = isHome
                ? activeSection === item.sectionId
                : location.pathname.startsWith(item.to);

              return (
                <motion.button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  whileHover={shouldReduceMotion ? {} : { y: -1 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className={`text-xs font-semibold px-3 py-1 rounded-full transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#F47721] text-white shadow-xs font-bold'
                      : isScrolled
                      ? 'text-[#142A43] hover:text-[#F47721] hover:bg-white'
                      : 'text-white hover:text-[#F47721] hover:bg-white/20 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]'
                  }`}
                >
                  {item.label}
                </motion.button>
              );
            })}
          </nav>

          {/* Desktop Action Buttons: Clean B2B Navigation */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {/* Nút Đăng nhập đưa thẳng vào CRM Dashboard */}
            <motion.button
              type="button"
              onClick={handleLoginToDashboard}
              whileHover={shouldReduceMotion ? {} : buttonMotion.whileHover}
              whileTap={shouldReduceMotion ? {} : buttonMotion.whileTap}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs whitespace-nowrap ${
                isScrolled
                  ? 'bg-[#F47721] hover:bg-[#E76513] text-white shadow-md shadow-[#F47721]/30'
                  : 'bg-[#F47721] hover:bg-[#E76513] text-white shadow-md shadow-black/20'
              }`}
              title="Đăng nhập và truy cập thẳng vào Cổng Dashboard CRM"
            >
              <User className="w-3.5 h-3.5 text-white" />
              <span>Đăng nhập</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <motion.button
              type="button"
              onClick={handleLoginToDashboard}
              whileHover={shouldReduceMotion ? {} : buttonMotion.whileHover}
              whileTap={shouldReduceMotion ? {} : buttonMotion.whileTap}
              className="px-3 py-1.5 rounded-lg bg-[#F47721] text-white text-[11px] font-bold flex items-center gap-1 shadow-xs cursor-pointer"
            >
              <User className="w-3 h-3 text-white" />
              <span>Đăng nhập</span>
            </motion.button>

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
            {/* Quick Demo & Dashboard Links in Mobile Drawer */}
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/10">
              <button
                type="button"
                onClick={() => handleNavClick('/demo')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                <Car className="w-3.5 h-3.5 text-[#F47721]" />
                <span>🚗 Showroom Giả Lập</span>
              </button>
              <button
                type="button"
                onClick={handleLoginToDashboard}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-[#F47721] hover:bg-[#E76513] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-white" />
                <span>Đăng nhập CRM</span>
              </button>
            </div>

            {/* Subpages / Sections Links */}
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {navLinks.map((item) => {
                const isHome = location.pathname === '/' || location.pathname === '';
                const isActive = isHome
                  ? activeSection === item.sectionId
                  : location.pathname.startsWith(item.to);

                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleNavClick(item)}
                    className={`text-left text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#F47721] text-white font-bold'
                        : 'text-slate-200 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
