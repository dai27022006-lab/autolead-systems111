import React, { useState } from 'react';
import { ExternalLink, Car, Building2, Sparkles, RefreshCw, Layers, ShieldCheck, Zap } from 'lucide-react';
import BuyerDemo from './BuyerDemo';

export const BAVARIA_LIVE_URL = 'https://dai27022006-lab.github.io/Webshowroomxe/';
export const BAVARIA_LOCAL_URL = 'http://localhost:5174/Webshowroomxe/';

export default function BavariaShowroomHub({ onNavigateToCRM, leadsCount = 0 }) {
  const [activeTab, setActiveTab] = useState('bavaria'); // 'bavaria' | 'mercedes_fallback'
  const [iframeKey, setIframeKey] = useState(Date.now());
  const [useLocalUrl, setUseLocalUrl] = useState(false);

  const currentShowroomUrl = useLocalUrl ? BAVARIA_LOCAL_URL : BAVARIA_LIVE_URL;

  return (
    <div className="flex-1 flex flex-col bg-[#F8F9F5]">
      {/* Top Integration Control Banner */}
      <section className="bg-[#0E2034] text-white border-b border-white/10 px-4 py-3 sm:py-4 sticky top-14 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="space-y-1 text-left">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#F47721] text-white uppercase tracking-wider">
                THỰC NGHIỆM ĐỒNG BỘ 2 HỆ THỐNG
              </span>
              <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Synced: 0.05s với AutoLead CRM
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-black tracking-tight text-white flex items-center gap-2">
              <span>Showroom Giả Lập: Bavaria Motor House (BMW Independent Showroom)</span>
            </h1>
            <p className="text-[11px] text-slate-300 max-w-2xl leading-relaxed">
              Mô phỏng website showroom ô tô thực tế đã nhúng <strong>AI Widget (BMW Concierge)</strong> của AutoLead. Khi khách xem xe và đặt lịch lái thử, dữ liệu sẽ tự động đẩy ngay sang <strong>Cổng CRM Đại lý</strong>.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap self-stretch md:self-auto justify-end">
            {/* View Mode Switcher */}
            <div className="p-1 rounded-xl bg-white/10 border border-white/15 flex items-center gap-1 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('bavaria')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'bavaria'
                    ? 'bg-[#F47721] text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Showroom BMW Bavaria</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('mercedes_fallback')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'mercedes_fallback'
                    ? 'bg-white/20 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                <span>Showroom Mercedes (Dự phòng)</span>
              </button>
            </div>

            {/* Open New Tab (GitHub Pages) */}
            <a
              href={currentShowroomUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold border border-white/20 transition-all cursor-pointer shadow-xs whitespace-nowrap"
              title="Mở website showroom trong tab trình duyệt mới"
            >
              <span>Mở tab mới</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#F47721]" />
            </a>

            {/* Jump to CRM */}
            <button
              type="button"
              onClick={onNavigateToCRM}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md shadow-emerald-900/30 whitespace-nowrap"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Mở CRM Đại Lý</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main View Area */}
      {activeTab === 'bavaria' ? (
        <div className="flex-1 flex flex-col p-3 sm:p-5 max-w-7xl mx-auto w-full space-y-3">
          {/* Status Sub-bar */}
          <div className="p-3 rounded-xl bg-white border border-[#DCE3EC] shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Đang nhúng website:</span>
              <code className="px-2 py-0.5 rounded bg-slate-100 text-[#142A43] font-mono text-[11px] font-bold">
                {currentShowroomUrl}
              </code>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto text-xs">
              <button
                type="button"
                onClick={() => setUseLocalUrl(!useLocalUrl)}
                className="text-slate-500 hover:text-[#142A43] underline cursor-pointer text-[11px]"
              >
                {useLocalUrl ? 'Dùng link GitHub Pages' : 'Dùng localhost:5174'}
              </button>
              <button
                type="button"
                onClick={() => setIframeKey(Date.now())}
                className="inline-flex items-center gap-1 text-[#F47721] hover:text-[#E76513] font-semibold cursor-pointer text-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Tải lại Showroom</span>
              </button>
            </div>
          </div>

          {/* Bavaria Motor House Embedded Iframe */}
          <div className="flex-1 w-full min-h-[820px] rounded-2xl overflow-hidden border border-[#DCE3EC] shadow-xl bg-white relative">
            <iframe
              key={iframeKey}
              src={currentShowroomUrl}
              title="Bavaria Motor House - Independent BMW Showroom with AutoLead AI Concierge"
              className="w-full h-full min-h-[820px] border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              loading="lazy"
            />
          </div>
        </div>
      ) : (
        <BuyerDemo onNavigateToCRM={onNavigateToCRM} />
      )}
    </div>
  );
}
