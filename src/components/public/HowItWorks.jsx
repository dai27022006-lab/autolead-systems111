import React from 'react';
import { Compass, ArrowRight, Award } from 'lucide-react';
import {
  PixelCarOrange,
  PixelClock,
  PixelShield,
  PixelCalendar,
  PixelFlag
} from './PixelIcons';
import salesConsultationBg from '../../assets/dealership-sales-consultation.jpg';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      channel: 'Meta / Google / TikTok',
      title: 'Thu hút & Quảng cáo AI',
      desc: 'Chiến dịch quảng cáo số thông minh nhắm trúng đối tượng có nhu cầu tìm hiểu các dòng xe đang có sẵn tại đại lý.',
      icon: PixelCarOrange
    },
    {
      num: '02',
      channel: 'Zalo OA / Web / Fanpage',
      title: 'Tiếp nhận tức thì <60s',
      desc: 'AI tự động chào hỏi, tiếp nhận thông tin khách hàng 24/7 không để khách phải chờ đợi lâu hay chuyển showroom.',
      icon: PixelClock
    },
    {
      num: '03',
      channel: 'AI Chatbot / Voicebot',
      title: 'Sàng lọc theo 7 tiêu chí TQM',
      desc: 'AI đối thoại tự nhiên để làm rõ mẫu xe quan tâm, thời gian dự kiến mua, khoảng ngân sách và mức độ sẵn sàng đến lái thử.',
      icon: PixelShield
    },
    {
      num: '04',
      channel: 'Auto-Calendar CRM',
      title: 'Đặt lịch hẹn lái thử',
      desc: 'Khách hàng chọn ngày giờ lái thử thuận tiện, hệ thống tự động kiểm tra slot trống chống trùng lịch và gửi SMS/Zalo nhắc hẹn.',
      icon: PixelCalendar
    },
    {
      num: '05',
      channel: 'Showroom Sales Team',
      title: 'Bàn giao Showroom chốt xe',
      desc: 'Toàn bộ hồ sơ nhu cầu và lịch hẹn được đẩy tự động vào CRM cho chuyên viên bán hàng đón tiếp và đàm phán hợp đồng.',
      icon: PixelFlag
    }
  ];

  return (
    <section id="workflow" className="py-20 md:py-24 bg-[#F8F9F5] relative border-b border-[#DCE3EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#DCE3EC] text-xs font-bold text-[#F47721] font-mono shadow-xs">
            <Compass className="w-3.5 h-3.5" />
            <span>HÀNH TRÌNH TÁC NGHIỆP TRÊN ĐƯỜNG ĐUA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#142A43] tracking-tight">
            Quy Trình Tạo Lịch Hẹn Lái Thử
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-2xl mx-auto">
            Hành trình 5 chặng đường liền mạch từ điểm xuất phát quảng cáo số đến đích đến trải nghiệm lái thử và chốt xe tại showroom.
          </p>
        </div>

        {/* Visual Racetrack Track (Desktop) */}
        <div className="hidden lg:block mb-16">
          <div className="relative p-6 rounded-3xl bg-[#142A43] border-4 border-[#07182D] shadow-xl overflow-hidden mb-8">
            {/* Center Dashed Road Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 border-b-2 border-dashed border-[#FFE875] -translate-y-1/2 z-0 opacity-80" />
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#E2F0FD] via-[#F47721] to-[#E2F0FD] opacity-60" />
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#E2F0FD] via-[#F47721] to-[#E2F0FD] opacity-60" />

            <div className="relative z-10 grid grid-cols-5 gap-4">
              {steps.map((item, idx) => {
                const Icon = item.icon;
                const isFinish = idx === steps.length - 1;
                return (
                  <div key={item.num} className="flex flex-col items-center text-center">
                    <div className="mb-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#07182D] text-[10px] font-mono font-bold text-white border border-white/20">
                      <span className="w-2 h-2 rounded-full bg-[#F47721]" />
                      <span>CHẶNG {item.num}</span>
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-[#0D2748] border-2 border-[#F47721] flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                      <Icon size={30} />
                    </div>

                    <span className="text-[10px] font-mono font-bold text-[#FFE875] mt-2 block">
                      {isFinish ? '★ ĐÍCH ĐẾN' : `+${(idx + 1) * 20}% Tiến độ`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5 Stage Detail Cards */}
          <div className="grid grid-cols-5 gap-4">
            {steps.map((item) => (
              <div
                key={item.num}
                className="p-5 rounded-2xl bg-white border border-[#DCE3EC] shadow-sm hover:border-[#F47721]/50 pixel-card-hover transition-all text-left space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#DCE3EC]">
                    <span className="text-xs font-mono font-bold text-[#F47721]">BƯỚC {item.num}</span>
                    <span className="text-[10px] font-mono text-[#64748B] uppercase">{item.channel}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#142A43] mt-2">{item.title}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Racetrack (Vertical) */}
        <div className="lg:hidden space-y-4 mb-16 relative pl-10 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-1.5 before:bg-[#142A43] before:border-l before:border-dashed before:border-[#FFE875]">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.num} className="relative space-y-1">
                <div className="absolute -left-[38px] top-4 w-7 h-7 rounded-xl bg-[#07182D] border-2 border-[#F47721] flex items-center justify-center text-[10px] font-mono font-bold text-[#F47721] shadow-md">
                  <Icon size={14} />
                </div>
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DCE3EC] shadow-sm space-y-1.5 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#F47721]">CHẶNG {item.num}</span>
                    <span className="text-[10px] font-mono text-[#64748B] uppercase">{item.channel}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#142A43]">{item.title}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Showcase Banner Box */}
        <div className="rounded-3xl overflow-hidden border border-[#DCE3EC] bg-white shadow-sm max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 h-64 sm:h-72 lg:h-80 relative overflow-hidden">
              <img
                src={salesConsultationBg}
                alt="Chuyên viên bán hàng tư vấn khách lái thử tại showroom ô tô"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <div className="lg:col-span-5 p-6 sm:p-8 space-y-3 text-left">
              <div className="flex items-center gap-2 text-xs font-mono text-[#F47721] font-bold uppercase">
                <Award className="w-4 h-4" />
                <span>Giá trị bàn giao thực tế</span>
              </div>
              <h3 className="text-lg font-bold text-[#142A43]">Giải Phóng Năng Lực Sales Showroom</h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Khi AI đảm nhận khâu tiếp nhận ban đầu và sàng lọc chi tiết, đội ngũ nhân viên tư vấn bán xe có thể tập trung 100% thời gian cho trải nghiệm lái thử thực tế, giải thích trang bị xe và hoàn thiện hợp đồng đặt cọc.
              </p>
              <div className="pt-2">
                <a
                  href="#contact-form"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F47721] hover:text-[#E76513] transition-colors"
                >
                  <span>Tìm hiểu giải pháp bàn giao</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
