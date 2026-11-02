import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Database, ShieldCheck, Menu, X } from 'lucide-react';
import { PixelCarOrange } from './public/PixelIcons';

export default function Navbar({
  onOpenContact,
  onOpenMvpDemo,
  onOpenLeadViewer,
  onOpenSaas,
  currentView
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#hero', label: 'Trang chủ' },
    { href: '#problems', label: 'Thách thức' },
    { href: '#solutions', label: 'Giải pháp' },
    { href: '#workflow', label: 'Quy trình' },
    { href: '#pricing', label: 'Bảng giá' },
    { href: '#roadmap', label: 'Lộ trình' },
    { href: '#faq', label: 'Cam kết & FAQ' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#DCE3EC] py-2.5 shadow-sm text-[#142A43]'
          : 'bg-[#142A43]/85 sm:bg-transparent py-4 text-white backdrop-blur-xs sm:backdrop-blur-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-[#142A43] flex items-center justify-center p-1 shadow-sm border border-white/20 group-hover:bg-[#07182D] transition-colors">
              <PixelCarOrange size={28} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`font-black text-lg tracking-tight uppercase transition-colors ${
                    isScrolled ? 'text-[#142A43]' : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]'
                  }`}
                >
                  Auto<span className="text-[#F47721]">Lead</span>
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#F47721] text-white tracking-widest font-mono shadow-xs">
                  PIXEL WORLD
                </span>
              </div>
              <p
                className={`text-[10px] tracking-wider uppercase font-semibold transition-colors ${
                  isScrolled ? 'text-[#64748B]' : 'text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]'
                }`}
              >
                AI Automotive Dealership
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav
            className={`hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-full transition-all ${
              isScrolled
                ? 'bg-[#F8F9F5] border border-[#DCE3EC]'
                : 'bg-white/25 backdrop-blur-md border border-white/40 shadow-sm'
            }`}
          >
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-xs font-semibold px-3 py-1 rounded-full transition-all ${
                  isScrolled
                    ? 'text-[#142A43] hover:text-[#F47721] hover:bg-white'
                    : 'text-white hover:text-[#F47721] hover:bg-white/20 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Switch to Buyer Demo */}
            <button
              type="button"
              onClick={onOpenMvpDemo}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                isScrolled
                  ? 'bg-white hover:bg-[#F8F9F5] text-[#142A43] border border-[#DCE3EC]'
                  : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/40 drop-shadow-sm'
              }`}
              title="Trải nghiệm luồng đặt lịch lái thử của khách hàng mua xe (Buyer Portal - Bạn Đại)"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F47721]" />
              <span>Xem demo hệ thống →</span>
            </button>

            {/* Switch to CRM */}
            {onOpenSaas && (
              <button
                type="button"
                onClick={onOpenSaas}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                  isScrolled
                    ? 'bg-[#142A43] hover:bg-[#07182D] text-white border border-[#142A43]'
                    : 'bg-[#142A43]/80 hover:bg-[#142A43] text-white backdrop-blur-md border border-white/30'
                }`}
                title="Truy cập hệ thống CRM quản trị vận hành showroom"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#75A94C]" />
                <span>Cổng CRM</span>
              </button>
            )}

            {/* Open Leads Manager Modal */}
            {onOpenLeadViewer && (
              <button
                type="button"
                onClick={onOpenLeadViewer}
                className={`inline-flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  isScrolled
                    ? 'text-[#64748B] hover:text-[#142A43]'
                    : 'text-white/80 hover:text-white drop-shadow-sm'
                }`}
                title="Quản lý và đối soát các yêu cầu tư vấn đã tiếp nhận"
              >
                <Database className="w-3.5 h-3.5 text-[#F47721]" />
                <span className="hidden xl:inline">Quản lý</span>
              </button>
            )}

            {/* CTA Consultation */}
            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#F47721] hover:bg-[#E76513] shadow-md shadow-[#F47721]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <span>Đăng ký tư vấn 30 phút</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors cursor-pointer ${
                isScrolled
                  ? 'bg-[#F8F9F5] border border-[#DCE3EC] text-[#142A43]'
                  : 'bg-white/30 backdrop-blur-md border border-white/40 text-white'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-4 pb-6 px-4 bg-white/95 backdrop-blur-xl rounded-2xl border border-[#DCE3EC] shadow-2xl space-y-3 text-left max-h-[calc(100vh-80px)] overflow-y-auto">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-xs font-bold text-[#142A43] hover:bg-[#F8F9F5] hover:text-[#F47721] transition-colors min-h-[44px] flex items-center"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="pt-2 border-t border-[#DCE3EC] flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMvpDemo();
                }}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-[#142A43] bg-[#F8F9F5] border border-[#DCE3EC] cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#F47721]" />
                <span>Xem demo hệ thống (Buyer Portal) →</span>
              </button>

              {onOpenSaas && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSaas();
                  }}
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-white bg-[#142A43] cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-[#75A94C]" />
                  <span>Cổng điều hành CRM Showroom</span>
                </button>
              )}

              {onOpenLeadViewer && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLeadViewer();
                  }}
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#64748B] bg-white border border-[#DCE3EC] cursor-pointer"
                >
                  <Database className="w-4 h-4 text-[#142A43]" />
                  <span>Quản lý yêu cầu đăng ký (Domain A)</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#F47721] shadow-md shadow-[#F47721]/30 hover:bg-[#E76513] cursor-pointer"
              >
                <span>Đăng ký tư vấn 30 phút</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
