import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Building2 } from 'lucide-react';

export const BAVARIA_LIVE_URL = 'https://dai27022006-lab.github.io/Webshowroomxe/';

export default function ShowroomPage() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Floating Back to Home Button (Top-Left) */}
      <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
        <button
          type="button"
          onClick={handleBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/90 hover:bg-black text-white text-xs font-bold border border-white/25 shadow-2xl backdrop-blur-md transition-all cursor-pointer hover:scale-105 active:scale-95"
          title="Quay lại trang chủ AutoLead B2B"
        >
          <ArrowLeft className="w-4 h-4 text-[#F47721]" />
          <span>Quay về trang chủ</span>
        </button>
      </div>

      {/* Discreet Utility Shortcuts (Top-Right) */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            navigate('/crm');
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#142A43]/90 hover:bg-[#142A43] text-emerald-300 border border-emerald-400/50 text-xs font-bold backdrop-blur-md shadow-xl transition-all cursor-pointer hover:scale-105 active:scale-95"
          title="Chuyển sang Cổng CRM Đại lý"
        >
          <Building2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Cổng CRM Đại lý</span>
        </button>

        <a
          href={BAVARIA_LIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/80 hover:bg-black text-white/90 hover:text-white text-xs font-semibold border border-white/20 backdrop-blur-md shadow-lg transition-all"
          title="Mở showroom trong tab trình duyệt riêng"
        >
          <span>Mở tab mới</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#F47721]" />
        </a>
      </div>

      {/* 100% Fullscreen Showroom Iframe */}
      <iframe
        src={BAVARIA_LIVE_URL}
        title="Bavaria Motor House - Independent BMW Showroom with AutoLead AI Concierge"
        className="w-full h-full border-0 block"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
}
