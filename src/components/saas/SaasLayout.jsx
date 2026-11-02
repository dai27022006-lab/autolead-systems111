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
  ChevronRight
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
    <div className="min-h-screen bg-[#0b1019] text-[#F7F7F5] flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 bg-[#0e1421] border-b lg:border-b-0 lg:border-r border-[#1e2634] flex flex-col shrink-0">
        {/* Brand Bar */}
        <div className="p-5 border-b border-[#1e2634] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#1E2634] to-[#101B2B] border border-[#C7A66A]/50 flex items-center justify-center">
              <span className="text-[#C7A66A] font-extrabold text-base">AL</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white text-base">AutoLead</span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-[#C7A66A]/20 text-[#C7A66A] border border-[#C7A66A]/30 uppercase">SaaS</span>
              </div>
              <p className="text-[10px] text-slate-400">Operations Management Console</p>
            </div>
          </div>
        </div>

        {/* Showroom Selector (Multi-tenant simulation) */}
        <div className="p-4 border-b border-[#1e2634] bg-[#0b1019]/60">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
            Đại lý đang vận hành:
          </label>
          <select
            value={selectedShowroom}
            onChange={(e) => setSelectedShowroom(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#141B26] border border-slate-700 text-xs text-white outline-none focus:border-[#C7A66A] cursor-pointer"
          >
            <option value="Mercedes-Benz Haxaco Saigon">Mercedes-Benz Haxaco Sài Gòn</option>
            <option value="Porsche Saigon Gallery">Porsche Saigon Gallery</option>
            <option value="Auto 568 Luxury Used Cars">Auto 568 Luxury Used Cars</option>
          </select>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#1E2634] to-[#171D27] text-[#C7A66A] border border-[#C7A66A]/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-[#141B26]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C7A66A]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-[#C7A66A] text-[#101B2B]' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer: Back to Public Site */}
        <div className="p-4 border-t border-[#1e2634] space-y-2 bg-[#0a0e17]">
          <button
            onClick={onBackToPublic}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#141B26] hover:bg-[#1a2332] text-xs font-semibold text-slate-300 border border-slate-700/80 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#C7A66A]" />
            <span>Xem Website B2B Chào Hàng</span>
          </button>
          
          <div className="px-2 py-1 text-[10px] text-slate-500 text-center">
            Demo Mode | Chuẩn QTTN TMĐT (IUH)
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="h-16 px-6 bg-[#0e1421]/80 backdrop-blur-md border-b border-[#1e2634] flex items-center justify-between shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Hệ thống tác nghiệp &gt;</span>
            <span className="text-xs font-bold text-white capitalize">
              {navItems.find(i => i.id === activeTab)?.label}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 ml-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              AI Agent Online (60s SLA)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onResetData}
              title="Khôi phục lại dữ liệu kiểm thử gốc"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#171D27] hover:bg-[#202735] text-slate-300 hover:text-white border border-slate-700 text-xs transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#C7A66A]" />
              <span className="hidden sm:inline">Reset Seed Data</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#1E2634] border border-[#C7A66A]/40 flex items-center justify-center text-[#C7A66A] font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        {/* Viewport Content */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
