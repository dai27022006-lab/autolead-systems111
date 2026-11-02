import React, { useState } from 'react';
import { HelpCircle, ChevronDown, CheckCircle2, AlertTriangle } from 'lucide-react';
import { PixelShield } from './PixelIcons';

export default function CommitmentsAndFaq() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'Thời gian triển khai và bàn giao hệ thống là bao lâu?',
      a: 'Toàn bộ quy trình khảo sát, thiết lập AI, cấu hình CRM và kiểm thử được AutoLead Systems hoàn tất và bàn giao cho showroom trong vòng 30 ngày làm việc, với điều kiện đại lý cung cấp đầy đủ tài khoản và thông tin truy cập cần thiết.'
    },
    {
      q: 'Lịch hẹn lái thử đủ điều kiện được xác định như thế nào?',
      a: 'Lịch hẹn được nghiệm thu khi khách hàng có thông tin xác thực, có nhu cầu mua xe rõ ràng, quan tâm dòng xe cụ thể, đồng ý đến showroom và có khung ngày giờ hẹn xác nhận trên hệ thống. Tuyệt đối không tính phí lead trùng lặp hoặc số ảo.'
    },
    {
      q: 'Chi phí dịch vụ chưa bao gồm những khoản nào?',
      a: 'Phí dịch vụ chưa bao gồm ngân sách quảng cáo thanh toán trực tiếp cho các nền tảng (Meta/Google/TikTok), phí dịch vụ bên thứ ba (Callio/Zalo API nếu phát sinh cước viễn thông) và lương nhân sự bán hàng của chính showroom.'
    },
    {
      q: 'Showroom cần chuẩn bị những gì trước khi bắt đầu?',
      a: 'Đại lý cần chuẩn bị thông tin các dòng xe chủ lực đang có sẵn tại showroom, tiêu chuẩn khách hàng mục tiêu mong muốn tiếp cận và cử một đầu mối quản lý bán hàng để phối hợp tiếp nhận chuyển giao lịch hẹn.'
    }
  ];

  return (
    <section id="faq" className="py-20 md:py-24 bg-white relative border-b border-[#DCE3EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8F9F5] border border-[#DCE3EC] text-xs font-bold text-[#F47721] font-mono shadow-xs">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>CAM KẾT & CÂU HỎI THƯỜNG GẶP</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#142A43] tracking-tight">
            Cam Kết Dịch Vụ & Giải Đáp Thắc Mắc
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-2xl mx-auto">
            Minh bạch điều kiện triển khai, tiêu chuẩn nghiệm thu và nguyên tắc hợp tác lâu dài cùng các đại lý ô tô.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Left Column: 3 Service Commitments */}
          <div className="lg:col-span-5 p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#F8F9F5] border border-[#DCE3EC] space-y-5 shadow-sm">
            <div className="flex items-center gap-2.5 text-[#142A43] font-bold text-base pb-3 border-b border-[#DCE3EC]">
              <PixelShield size={24} />
              <h3>Cam Kết Dịch Vụ Của AutoLead</h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#142A43]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#159B68] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#142A43] block">Triển khai đúng phạm vi đề xuất:</strong>
                  <span className="text-[#64748B]">
                    Hoàn thiện toàn bộ hệ thống tiếp nhận, chăm sóc và đặt lịch trong 30 ngày theo thỏa thuận.
                  </span>
                </span>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#159B68] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#142A43] block">Hỗ trợ khắc phục sự cố:</strong>
                  <span className="text-[#64748B]">
                    Khắc phục miễn phí trong 15 ngày nếu hệ thống chưa đạt tiêu chí nghiệm thu do lỗi từ AutoLead Systems.
                  </span>
                </span>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#159B68] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#142A43] block">Đồng hành trong quá trình vận hành:</strong>
                  <span className="text-[#64748B]">
                    Liên tục hướng dẫn và hiệu chỉnh kịch bản trò chuyện theo phản hồi thực tế của khách mua xe.
                  </span>
                </span>
              </div>

              {/* Warning/Limitation Box */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-800">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Giới hạn cam kết minh bạch:</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Cam kết áp dụng cho năng lực vận hành ổn định của hệ thống công nghệ. AutoLead không cam kết doanh thu hay số lượng lịch hẹn thiếu căn cứ thực tế.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 4 FAQ Accordion */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2 text-[#142A43] font-bold text-base mb-4">
              <HelpCircle className="w-5 h-5 text-[#F47721]" />
              <h3>Câu Hỏi Thường Gặp (FAQ)</h3>
            </div>

            {faqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#F8F9F5] border border-[#DCE3EC] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 min-h-[48px] text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-[#142A43] hover:text-[#F47721] transition-colors cursor-pointer bg-white"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 text-[#F47721] ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-2 text-xs sm:text-sm text-[#64748B] leading-relaxed border-t border-[#DCE3EC] bg-[#F8F9F5]">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
