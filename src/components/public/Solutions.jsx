import React from 'react';
import { Layers, CheckCircle2, Info } from 'lucide-react';
import {
  PixelCarOrange,
  PixelClock,
  PixelShield,
  PixelCalendar,
  PixelShowroom,
  PixelChart
} from './PixelIcons';

export default function Solutions() {
  const solutions = [
    {
      icon: PixelCarOrange,
      num: '01',
      title: 'AI Advertising & Creative',
      titleVi: 'AI hỗ trợ quảng cáo & sáng tạo',
      desc: 'Tự động tạo nội dung, thông điệp và hình ảnh quảng cáo phù hợp với từng phân khúc xe sang hoặc xe đã qua sử dụng, tối ưu chi phí tiếp cận.',
      deliverables: [
        'Nội dung và hình ảnh quảng cáo AI',
        'Thử nghiệm phân tách A/B đa biến thể',
        'Tối ưu tệp khách hàng theo dòng xe'
      ],
      accent: 'border-t-4 border-t-[#F47721]'
    },
    {
      icon: PixelClock,
      num: '02',
      title: 'AI Lead Reception & Follow-up',
      titleVi: 'Tiếp nhận & chăm sóc khách hàng 24/7',
      desc: 'Tự động tiếp nhận lead đa kênh (Form, Zalo, Fanpage), phản hồi tức thì trong vòng 60 giây và bám đuổi thông minh theo kịch bản cá nhân hóa.',
      deliverables: [
        'Ghi nhận thông tin khách hàng tức thì',
        'Kịch bản trò chuyện cá nhân hóa',
        'Tự động nhắc hẹn và chăm sóc liên tục'
      ],
      accent: 'border-t-4 border-t-[#4A98E8]'
    },
    {
      icon: PixelShield,
      num: '03',
      title: 'AI Lead Qualification',
      titleVi: 'Sàng lọc khách hàng theo tiêu chuẩn',
      desc: 'AI đối thoại tự nhiên để làm rõ nhu cầu thực tế: mẫu xe quan tâm, thời gian dự kiến mua, khoảng ngân sách và sự sẵn sàng đến lái thử.',
      deliverables: [
        'Xác thực số điện thoại và danh tính',
        'Làm rõ dòng xe và khả năng tài chính',
        'Đánh giá mức độ sẵn sàng đến showroom'
      ],
      accent: 'border-t-4 border-t-[#75A94C]'
    },
    {
      icon: PixelCalendar,
      num: '04',
      title: 'Automated Test Drive Appointment',
      titleVi: 'Tự động đặt lịch hẹn lái thử',
      desc: 'Dẫn dắt khách hàng chọn khung ngày và giờ lái thử phù hợp, tự động gửi tin nhắn xác nhận kèm định vị và hướng dẫn đường đến showroom.',
      deliverables: [
        'Ghi nhận ngày/giờ hẹn cụ thể',
        'Tự động gửi thông tin xác nhận qua SMS/Zalo',
        'Nhắc lịch trước 2 tiếng và trước 24 tiếng'
      ],
      accent: 'border-t-4 border-t-[#F59E0B]'
    },
    {
      icon: PixelShowroom,
      num: '05',
      title: 'CRM & Lead Management',
      titleVi: 'Hệ thống CRM quản lý tập trung',
      desc: 'Quản lý toàn bộ thông tin khách hàng và lịch sử tương tác theo phễu 6 trạng thái minh bạch, giúp ban quản lý showroom dễ dàng kiểm soát.',
      deliverables: [
        'Giao diện pipeline trực quan theo phễu',
        'Lưu trữ toàn bộ lịch sử trao đổi',
        'Phân bổ lịch hẹn tự động cho chuyên viên Sales'
      ],
      accent: 'border-t-4 border-t-[#142A43]'
    },
    {
      icon: PixelChart,
      num: '06',
      title: 'Performance Tracking & Reporting',
      titleVi: 'Đo lường hiệu quả & báo cáo minh bạch',
      desc: 'Báo cáo chi tiết về số lượng lead, tỷ lệ sàng lọc đạt chuẩn, số cuộc hẹn lái thử thực tế và chi phí trên từng kết quả đủ điều kiện nghiệm thu.',
      deliverables: [
        'Báo cáo tỷ lệ chuyển đổi qua từng khâu',
        'Thống kê lịch hẹn đạt chuẩn nghiệm thu',
        'Đối soát chi phí minh bạch theo hợp đồng'
      ],
      accent: 'border-t-4 border-t-[#8B5CF6]'
    }
  ];

  return (
    <section id="solutions" className="scroll-mt-24 sm:scroll-mt-28 py-20 md:py-24 bg-white relative border-b border-[#DCE3EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8F9F5] border border-[#DCE3EC] text-xs font-bold text-[#F47721] font-mono shadow-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>GIẢI PHÁP & PHẠM VI DỊCH VỤ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#142A43] tracking-tight">
            Bộ Giải Pháp Toàn Diện Cho Đại Lý Ô Tô
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-2xl mx-auto">
            Hệ thống 6 mô-đun chức năng khép kín từ khâu thu hút trực tuyến đến khi khách hàng bước chân vào showroom trải nghiệm lái thử.
          </p>
        </div>

        {/* 6 Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {solutions.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className={`p-6 rounded-2xl bg-[#F8F9F5] border border-[#DCE3EC] ${item.accent} hover:bg-white pixel-card-hover transition-all flex flex-col justify-between`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#DCE3EC]">
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#DCE3EC] flex items-center justify-center shadow-xs">
                      <Icon size={26} />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#64748B]">Mô-đun {item.num}</span>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono font-bold text-[#F47721] uppercase tracking-wider block">
                      {item.title}
                    </span>
                    <h3 className="text-base font-bold text-[#142A43] mt-1">{item.titleVi}</h3>
                    <p className="text-xs sm:text-sm text-[#64748B] mt-2 leading-relaxed">{item.desc}</p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-[#DCE3EC]/70">
                    <span className="text-[11px] font-mono uppercase text-[#142A43] font-bold block">
                      Hạng mục bàn giao:
                    </span>
                    {item.deliverables.map((deliv, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-[#142A43]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#159B68] shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scope Disclaimer */}
        <div className="p-4 rounded-2xl bg-[#F8F9F5] border border-[#DCE3EC] max-w-4xl mx-auto flex items-start gap-3 text-xs text-[#64748B]">
          <Info className="w-4 h-4 text-[#F47721] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#142A43]">Lưu ý phạm vi dịch vụ:</strong> Sáu nhóm chức năng trên là phạm vi dịch vụ thương mại tiêu chuẩn được đề xuất trong bản Offer chính thức của AutoLead Systems, được tùy biến theo quy mô và thỏa thuận riêng với từng đại lý ô tô.
          </p>
        </div>
      </div>
    </section>
  );
}
