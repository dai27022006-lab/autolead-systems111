import React from 'react';
import { Calendar, Info } from 'lucide-react';
import { PixelWrench, PixelChart, PixelShield, PixelFlag } from './PixelIcons';

export default function Roadmap() {
  const stages = [
    {
      days: 'Ngày 1–5',
      title: 'Tư vấn & Thống nhất yêu cầu',
      desc: 'Tìm hiểu mô hình kinh doanh, dòng xe chủ lực, khảo sát quy trình bán hàng hiện tại và thống nhất tiêu chuẩn khách hàng đủ điều kiện.',
      icon: PixelWrench
    },
    {
      days: 'Ngày 6–15',
      title: 'Thiết kế & Cấu hình',
      desc: 'Xây dựng kịch bản AI chăm sóc, thiết lập tiêu chí sàng lọc, cấu hình quy trình đặt lịch lái thử và luồng phân loại lead vào CRM.',
      icon: PixelChart
    },
    {
      days: 'Ngày 16–25',
      title: 'Tích hợp & Kiểm thử',
      desc: 'Kết nối các kênh tiếp nhận (Web, Zalo, Fanpage) với CRM, chạy kiểm thử quy trình từ lúc phát sinh lead đến khi đặt lịch thành công.',
      icon: PixelShield
    },
    {
      days: 'Ngày 26–30',
      title: 'Đào tạo & Bàn giao vận hành',
      desc: 'Đào tạo nhân sự bán hàng tiếp nhận lịch hẹn, chuyển giao tài liệu hướng dẫn và chính thức nghiệm thu đưa vào vận hành thực tế.',
      icon: PixelFlag
    }
  ];

  return (
    <section id="roadmap" className="scroll-mt-24 sm:scroll-mt-28 py-20 md:py-24 bg-[#F8F9F5] relative border-b border-[#DCE3EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#DCE3EC] text-xs font-bold text-[#F47721] font-mono shadow-xs">
            <Calendar className="w-3.5 h-3.5" />
            <span>HÀNH TRÌNH 30 NGÀY BÀN GIAO VẬN HÀNH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#142A43] tracking-tight">
            Quy Trình Triển Khai Trong 30 Ngày
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-2xl mx-auto">
            Bốn chặng đường rõ ràng nhằm đưa hệ thống AI vào vận hành thực tế tại đại lý đúng tiến độ và tiêu chuẩn cam kết.
          </p>
        </div>

        {/* 4 Stage Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#DCE3EC] shadow-sm hover:border-[#F47721]/50 pixel-card-hover transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-[#DCE3EC]">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-[#F8F9F5] text-[#F47721] border border-[#DCE3EC]">
                      {stage.days}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] flex items-center justify-center">
                      <Icon size={22} />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-[#142A43]">{stage.title}</h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">{stage.desc}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#DCE3EC]/70 text-[11px] font-mono text-[#64748B]">
                  <span>Giai đoạn 0{idx + 1} / 04</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notice */}
        <div className="p-4 rounded-2xl bg-white border border-[#DCE3EC] max-w-4xl mx-auto flex items-start gap-3 text-xs text-[#64748B] shadow-xs">
          <Info className="w-4 h-4 text-[#F47721] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#142A43]">Điều kiện áp dụng tiến độ:</strong> Tiến độ 30 ngày được tính từ thời điểm hai bên hoàn tất thống nhất các yêu cầu và đại lý cung cấp đầy đủ thông tin truy cập tài khoản quảng cáo, Fanpage và Zalo OA cần thiết.
          </p>
        </div>
      </div>
    </section>
  );
}
