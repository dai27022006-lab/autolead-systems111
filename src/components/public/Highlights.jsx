import React from 'react';
import { PixelMoney, PixelCalendar, PixelChart, PixelCarOrange } from './PixelIcons';

export default function Highlights() {
  const items = [
    {
      icon: PixelMoney,
      title: 'Tối ưu chi phí marketing',
      desc: 'Giảm lãng phí ngân sách quảng cáo, chỉ trả tiền trên kết quả lịch hẹn đủ điều kiện.'
    },
    {
      icon: PixelCalendar,
      title: 'Tăng tỷ lệ đặt lịch lái thử',
      desc: 'AI phản hồi nhanh trong 60 giây và chăm sóc liên tục để chốt lịch trải nghiệm xe.'
    },
    {
      icon: PixelChart,
      title: 'Quy trình rõ ràng, dễ quản lý',
      desc: 'Theo dõi chi tiết trạng thái lead và lịch hẹn trên giao diện trực quan, minh bạch.'
    },
    {
      icon: PixelCarOrange,
      title: 'Phù hợp xe mới & xe lướt',
      desc: 'Tùy biến linh hoạt theo phân khúc xe và quy trình bán hàng của từng showroom.'
    }
  ];

  return (
    <section className="bg-white border-b border-[#DCE3EC] py-10 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-2xl bg-[#F8F9F5] border border-[#DCE3EC] hover:border-[#F47721]/50 hover:bg-white pixel-card-hover transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-[#DCE3EC] flex items-center justify-center shrink-0 shadow-xs">
                  <Icon size={26} />
                </div>
                <div className="space-y-1 text-left">
                  <h4 className="text-sm font-bold text-[#142A43]">{item.title}</h4>
                  <p className="text-xs text-[#64748B] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
