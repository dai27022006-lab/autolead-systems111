import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Calendar,
  Palette,
  Bot,
  LineChart,
  Building2,
  Settings,
  ArrowLeft,
  Bell,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Menu,
  X,
  Car,
  RotateCcw,
  Filter,
  LogOut
} from 'lucide-react';

export default function SaasLayout({
  activeTab,
  setActiveTab,
  onBackToPublic,
  children,
  onResetData,
  leadsCount,
  totalLeadsCount,
  b2bCount,
  selectedVehicle = 'ALL',
  setSelectedVehicle,
  selectedShowroom = 'ALL',
  setSelectedShowroom,
  availableVehicles = [],
  filteredLeadsCount,
  filteredAptsCount,
  currentUser,
  onLogout
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: '1. Tổng quan Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'leads', label: '2. Quản lý Lead (CRM)', icon: Users, badge: leadsCount },
    { id: 'qualification', label: '3. Sàng lọc AI (7 Tiêu chí)', icon: CheckSquare, badge: 'AI' },
    { id: 'appointments', label: '4. Lịch hẹn lái thử', icon: Calendar, badge: null },
    { id: 'campaigns', label: '5. AI Ads & Creative', icon: Palette, badge: null },
    { id: 'ai-assistant', label: '6. Trợ lý AI & Follow-up', icon: Bot, badge: 'Smart' },
    { id: 'analytics', label: '7. Báo cáo & KPIs Tác nghiệp', icon: LineChart, badge: null },
    { id: 'b2b-leads', label: '8. Lead Showroom (Domain A)', icon: Building2, badge: b2bCount },
    { id: 'settings', label: '9. Cấu hình & Reset Demo', icon: Settings, badge: null },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9F5] text-[#142A43] flex flex-col lg:flex-row">
      {/* Mobile Top Brand & Menu Bar (Hidden on Desktop) */}
      <div className="lg:hidden bg-white border-b border-[#DCE3EC] p-3 sm:p-3.5 flex items-center justify-between relative z-20 shadow-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          {onBackToPublic && (
            <button
              type="button"
              onClick={onBackToPublic}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 border border-[#DCE3EC] flex items-center justify-center text-[#142A43] cursor-pointer shrink-0"
              title="Quay lại Trang Chủ AutoLead"
            >
              <ArrowLeft className="w-4 h-4 text-[#F47721]" />
            </button>
          )}
          <div className="w-8 h-8 rounded-lg bg-[#F47721] flex items-center justify-center shrink-0 shadow-xs">
            <span className="text-white font-extrabold text-sm">AL</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#142A43] text-sm">AutoLead SaaS</span>
              <span className="text-[9px] font-bold px-1 rounded bg-orange-100 text-[#F47721] border border-orange-200">CRM</span>
            </div>
            <p className="text-[10px] text-[#64748B] truncate">
              {selectedVehicle !== 'ALL' ? selectedVehicle : (selectedShowroom !== 'ALL' ? selectedShowroom : 'Tất cả dòng xe')}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-9 h-9 rounded-xl bg-slate-100 border border-[#DCE3EC] flex items-center justify-center text-[#142A43] hover:bg-slate-200 cursor-pointer shrink-0"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-[#F47721]" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar: Persistent on Desktop, Collapsible Drawer on Mobile */}
      <aside className={`w-full lg:w-72 bg-white border-b lg:border-b-0 lg:border-r border-[#DCE3EC] flex flex-col shrink-0 shadow-xs ${
        mobileMenuOpen ? 'flex' : 'hidden lg:flex'
      }`}>
        {/* Desktop Brand Bar */}
        <div className="hidden lg:flex p-5 border-b border-[#DCE3EC] items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#F47721] flex items-center justify-center shadow-xs">
              <span className="text-white font-extrabold text-base">AL</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#142A43] text-base">AutoLead</span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-orange-100 text-[#F47721] border border-orange-200 uppercase">SaaS</span>
              </div>
              <p className="text-[10px] text-[#64748B]">Operations Management Console</p>
            </div>
          </div>
        </div>

        {/* Multi-tenant & Vehicle CRM Filter */}
        <div className="p-3.5 lg:p-4 border-b border-[#DCE3EC] bg-[#F8F9F5] space-y-3">
          {/* 1. Lọc theo từng dòng xe riêng biệt hoặc tất cả */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1">
                <Car className="w-3 h-3 text-[#F47721]" />
                Lọc theo dòng xe (CRM):
              </label>
              {(selectedVehicle !== 'ALL' || selectedShowroom !== 'ALL') && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedVehicle?.('ALL');
                    setSelectedShowroom?.('ALL');
                  }}
                  className="text-[10px] text-[#F47721] hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
                  title="Khôi phục xem toàn bộ CRM"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  Tất cả
                </button>
              )}
            </div>
            <select
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle?.(e.target.value)}
              className="w-full px-2.5 py-2 rounded-lg bg-white border border-[#DCE3EC] text-xs font-semibold text-[#142A43] outline-none focus:border-[#F47721] focus:ring-1 focus:ring-[#F47721] cursor-pointer shadow-2xs"
            >
              <option value="ALL">🚗 Tất cả dòng xe (Xem tổng số)</option>
              <optgroup label="Chọn xem CRM từng xe riêng:">
                {availableVehicles.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* 2. Đại lý Showroom */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
              Đại lý đang vận hành:
            </label>
            <select
              value={selectedShowroom}
              onChange={(e) => setSelectedShowroom?.(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#DCE3EC] text-xs text-[#142A43] outline-none focus:border-[#F47721] focus:ring-1 focus:ring-[#F47721] cursor-pointer shadow-2xs"
            >
              <option value="ALL">🏢 Tất cả đại lý showroom</option>
              <option value="Mercedes-Benz Haxaco Saigon">Mercedes-Benz Haxaco Sài Gòn</option>
              <option value="Porsche Saigon Gallery">Porsche Saigon Gallery</option>
              <option value="Auto 568 Luxury Used Cars">Auto 568 Luxury Used Cars</option>
            </select>
          </div>

          {/* Status summary indicator */}
          <div className="pt-2 flex items-center justify-between text-[11px] font-medium border-t border-[#E2E8F0]">
            <span className="text-[#64748B]">
              {selectedVehicle === 'ALL' && selectedShowroom === 'ALL' ? 'Tổng số CRM:' : 'Khớp bộ lọc:'}
            </span>
            <span className="font-bold text-[#F47721] font-mono">
              {filteredLeadsCount ?? leadsCount}/{totalLeadsCount ?? leadsCount} Lead ({filteredAptsCount ?? 0} lịch)
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto max-h-[60vh] lg:max-h-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer min-h-[44px] ${
                  isActive
                    ? 'bg-orange-50 text-[#F47721] border border-orange-200 shadow-2xs font-bold'
                    : 'text-[#64748B] hover:text-[#142A43] hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#F47721]' : 'text-[#94A3B8]'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                    isActive ? 'bg-[#F47721] text-white' : 'bg-slate-100 text-[#64748B]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer: Back to Public Site */}
        <div className="p-4 border-t border-[#DCE3EC] space-y-2 bg-[#F8F9F5]">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onBackToPublic();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-white hover:bg-slate-100 text-xs font-semibold text-[#142A43] border border-[#DCE3EC] transition-colors cursor-pointer min-h-[44px] shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#F47721]" />
            <span>Xem Website B2B Chào Hàng</span>
          </button>
          
          <div className="px-2 py-1 text-[10px] text-[#94A3B8] text-center">
            Demo Mode | Chuẩn QTTN TMĐT (IUH)
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-14 lg:h-16 px-4 sm:px-6 bg-white border-b border-[#DCE3EC] flex items-center justify-between shrink-0 shadow-2xs gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {onBackToPublic && (
              <button
                type="button"
                onClick={onBackToPublic}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#142A43] border border-[#DCE3EC] text-xs font-semibold transition-colors cursor-pointer shrink-0"
                title="Quay lại Trang Chủ AutoLead B2B"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#F47721]" />
                <span>Về Trang Chủ</span>
              </button>
            )}
            <span className="text-xs font-bold text-[#142A43] capitalize truncate">
              {navItems.find(i => i.id === activeTab)?.label}
            </span>
            <span className="hidden xl:inline-flex items-center gap-1.5 ml-2 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 text-[11px] font-medium shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              AI Agent Online (60s SLA)
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onResetData}
              title="Khôi phục lại dữ liệu kiểm thử gốc"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#142A43] border border-[#DCE3EC] text-xs transition-colors cursor-pointer font-medium"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#F47721]" />
              <span className="hidden md:inline">Reset Seed Data</span>
            </button>
            
            <div className="flex items-center gap-2 pl-2 border-l border-[#DCE3EC]">
              <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F47721] font-bold text-xs shrink-0 shadow-2xs">
                {currentUser?.name ? currentUser.name.slice(0, 2).toUpperCase() : 'AD'}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-[#142A43] leading-none">{currentUser?.name || 'Admin Showroom'}</p>
                <p className="text-[10px] text-[#64748B] mt-0.5">{currentUser?.dealership || 'Haxaco Mercedes-Benz'}</p>
              </div>
              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  title="Đăng xuất khỏi hệ thống CRM"
                  className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer ml-1"
                  aria-label="Đăng xuất"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Viewport Content */}
        <main className="p-3 sm:p-6 lg:p-8 flex-1 bg-[#F8F9F5]">
          {/* Active Filter Notification Banner */}
          {(selectedVehicle !== 'ALL' || selectedShowroom !== 'ALL') && (
            <div className="mb-4 sm:mb-6 p-3.5 sm:p-4 rounded-2xl bg-orange-50/95 border border-orange-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F47721] shrink-0 animate-pulse"></span>
                <div className="text-xs text-[#142A43]">
                  Đang xem CRM riêng biệt cho:{' '}
                  <strong className="text-[#F47721]">
                    {selectedVehicle !== 'ALL' ? selectedVehicle : selectedShowroom}
                  </strong>{' '}
                  <span className="text-[#64748B]">
                    (Khớp {filteredLeadsCount ?? leadsCount} khách hàng tiềm năng, {filteredAptsCount ?? 0} lịch hẹn lái thử)
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedVehicle?.('ALL');
                  setSelectedShowroom?.('ALL');
                }}
                className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-white hover:bg-orange-100 text-[#F47721] font-bold text-xs border border-orange-200 transition-colors cursor-pointer shrink-0 shadow-2xs"
              >
                ← Xem Tất Cả Xe (Tổng Hợp)
              </button>
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  );
}
