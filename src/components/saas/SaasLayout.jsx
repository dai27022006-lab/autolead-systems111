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
  X
} from 'lucide-react';

export default function SaasLayout({
  activeTab,
  setActiveTab,
  onBackToPublic,
  children,
  onResetData,
  leadsCount,
  b2bCount
}) {
  const [selectedShowroom, setSelectedShowroom] = useState('Mercedes-Benz Haxaco Saigon');
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
      <div className="lg:hidden bg-white border-b border-[#DCE3EC] p-3.5 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#F47721] flex items-center justify-center shrink-0 shadow-xs">
            <span className="text-white font-extrabold text-sm">AL</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#142A43] text-sm">AutoLead SaaS</span>
              <span className="text-[9px] font-bold px-1 rounded bg-orange-100 text-[#F47721] border border-orange-200">CRM</span>
            </div>
            <p className="text-[10px] text-[#64748B] truncate">{selectedShowroom}</p>
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

        {/* Showroom Selector (Multi-tenant simulation) */}
        <div className="p-3.5 lg:p-4 border-b border-[#DCE3EC] bg-[#F8F9F5]">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1.5">
            Đại lý đang vận hành:
          </label>
          <select
            value={selectedShowroom}
            onChange={(e) => setSelectedShowroom(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-white border border-[#DCE3EC] text-base sm:text-xs text-[#142A43] outline-none focus:border-[#F47721] focus:ring-1 focus:ring-[#F47721] cursor-pointer shadow-2xs"
          >
            <option value="Mercedes-Benz Haxaco Saigon">Mercedes-Benz Haxaco Sài Gòn</option>
            <option value="Porsche Saigon Gallery">Porsche Saigon Gallery</option>
            <option value="Auto 568 Luxury Used Cars">Auto 568 Luxury Used Cars</option>
          </select>
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
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="h-14 lg:h-16 px-4 sm:px-6 bg-white/90 backdrop-blur-md border-b border-[#DCE3EC] flex items-center justify-between shrink-0 sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="text-xs font-bold text-[#142A43] capitalize truncate">
              {navItems.find(i => i.id === activeTab)?.label}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 ml-2 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 text-[11px] font-medium shrink-0">
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
              <span className="hidden sm:inline">Reset Seed Data</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F47721] font-bold text-xs shrink-0 shadow-2xs">
              AD
            </div>
          </div>
        </header>

        {/* Viewport Content */}
        <main className="p-3 sm:p-6 lg:p-8 flex-1 bg-[#F8F9F5]">
          {children}
        </main>
      </div>
    </div>
  );
}
