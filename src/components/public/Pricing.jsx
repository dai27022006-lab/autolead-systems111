import React, { useState } from 'react';
import { CheckCircle2, Sliders, ShieldCheck, ArrowRight, Zap, Info } from 'lucide-react';
import { PixelMoney, PixelWrench } from './PixelIcons';

export default function Pricing({ onOpenContact }) {
  const [appointmentCount, setAppointmentCount] = useState(20);

  const setupFee = 15000000; // 15,000,000 VND
  const perAppointmentFee = 300000; // 300,000 VND
  const variableFee = appointmentCount * perAppointmentFee;
  const totalMonth1 = setupFee + variableFee;

  const formatVND = (amount) =>
    new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';

  const tqmCriteria = [
    'Có họ tên và số điện thoại xác thực hợp lệ (đầu số di động Việt Nam).',
    'Có nhu cầu tìm hiểu, trải nghiệm hoặc mua xe ô tô rõ ràng.',
    'Dự kiến thời gian mua xe cụ thể trong vòng 1–3 tháng tới.',
    'Khoảng ngân sách dự kiến phù hợp với phân khúc xe showroom đang kinh doanh.',
    'Chủ động đồng ý đến showroom xem xe hoặc tham gia trải nghiệm lái thử.',
    'Có khung ngày và giờ hẹn cụ thể, được ghi nhận rõ trên hệ thống CRM.',
    'Được nhân viên đại lý xác nhận hợp lệ theo biên bản nghiệm thu đối soát định kỳ.'
  ];

  return (
    <section id="pricing" className="py-20 md:py-24 bg-white relative border-b border-[#DCE3EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8F9F5] border border-[#DCE3EC] text-xs font-bold text-[#F47721] font-mono shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>BẢNG GIÁ & ĐIỀU KIỆN DỊCH VỤ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#142A43] tracking-tight">
            Chi Phí Dịch Vụ Minh Bạch
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-2xl mx-auto">
            Mô hình kết hợp giữa phí thiết lập một lần trong 30 ngày và phí theo từng lịch hẹn lái thử thực tế đạt chuẩn nghiệm thu.
          </p>
        </div>

        {/* 2 Core Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Card 1: Fixed Setup Fee */}
          <div className="p-8 rounded-3xl bg-[#F8F9F5] border border-[#DCE3EC] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-[#64748B] uppercase tracking-wider block">
                  Giai đoạn 01 • Bàn giao 30 ngày
                </span>
                <PixelWrench size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#142A43] mt-1">Phí triển khai hệ thống</h3>

              <div className="my-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-[#142A43] font-mono">
                    15.000.000
                  </span>
                  <span className="text-[#64748B] text-sm font-semibold">VNĐ</span>
                </div>
                <span className="text-xs text-[#64748B] block mt-1">(Phí triển khai một lần)</span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#142A43] pt-4 border-t border-[#DCE3EC]">
                <p className="font-bold text-[#142A43]">Bao gồm thiết lập trọn gói:</p>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#159B68] shrink-0 mt-0.5" />
                  <span>Khảo sát và phân tích mô hình kinh doanh showroom</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#159B68] shrink-0 mt-0.5" />
                  <span>Xây dựng kịch bản AI chăm sóc & bộ câu hỏi sàng lọc 7 tiêu chí</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#159B68] shrink-0 mt-0.5" />
                  <span>Cấu hình tự động đặt lịch lái thử và phân luồng CRM chống trùng lịch</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#159B68] shrink-0 mt-0.5" />
                  <span>Kiểm thử toàn diện và đào tạo chuyển giao cho nhân sự bán hàng</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#DCE3EC]">
              <button
                type="button"
                onClick={onOpenContact}
                className="w-full py-3.5 rounded-xl font-bold text-xs text-[#142A43] bg-white hover:bg-slate-100 border border-[#DCE3EC] transition-colors cursor-pointer shadow-xs"
              >
                Khảo sát triển khai đại lý
              </button>
            </div>
          </div>

          {/* Card 2: Performance Fee */}
          <div className="p-8 rounded-3xl bg-white border-2 border-[#F47721] flex flex-col justify-between shadow-lg relative">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#F47721]/10 text-[#F47721] border border-[#F47721]/30 text-[11px] font-bold">
                Trả theo kết quả
              </span>
              <PixelMoney size={24} />
            </div>

            <div>
              <span className="text-[11px] font-mono font-bold text-[#F47721] uppercase tracking-wider block">
                Giai đoạn 02 • Vận hành & Nghiệm thu
              </span>
              <h3 className="text-xl font-bold text-[#142A43] mt-1">Phí theo lịch hẹn đủ điều kiện</h3>

              <div className="my-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-[#F47721] font-mono">
                    300.000
                  </span>
                  <span className="text-[#64748B] text-sm font-semibold">VNĐ</span>
                  <span className="text-xs text-[#64748B]">/ lịch hẹn</span>
                </div>
                <span className="text-xs text-[#64748B] block mt-1">(Chỉ tính khi đạt chuẩn nghiệm thu)</span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#142A43] pt-4 border-t border-[#DCE3EC]">
                <p className="font-bold text-[#142A43]">Nguyên tắc nghiệm thu minh bạch:</p>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F47721] shrink-0 mt-0.5" />
                  <span>Chỉ tính tiền khi khách hàng xác nhận lịch hẹn hợp lệ</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F47721] shrink-0 mt-0.5" />
                  <span>7 tiêu chuẩn TQM minh bạch không tính phí lead ảo, sai số</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F47721] shrink-0 mt-0.5" />
                  <span>Báo cáo đối soát chi tiết hàng tuần và hàng tháng</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F47721] shrink-0 mt-0.5" />
                  <span>Tối ưu liên tục kịch bản AI theo phản hồi thực tế từ showroom</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#DCE3EC]">
              <button
                type="button"
                onClick={onOpenContact}
                className="w-full py-3.5 rounded-xl font-bold text-xs text-white bg-[#F47721] hover:bg-[#E76513] shadow-md shadow-[#F47721]/30 transition-all cursor-pointer"
              >
                Đăng ký nhận tư vấn triển khai
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Calculator Box */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#07182D] text-white p-6 sm:p-8 border border-white/20 shadow-2xl mb-12">
          <div className="flex items-center gap-2 text-[#FFE875] font-mono text-xs font-bold uppercase mb-4">
            <Sliders className="w-4 h-4" />
            <span>Công cụ tính ngân sách dự kiến</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold mb-2">
            Mô phỏng ngân sách theo mục tiêu lịch hẹn hàng tháng
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mb-8">
            Kéo thanh trượt để ước tính ngân sách đầu tư và số lượng cuộc hẹn lái thử showroom nhận được.
          </p>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-300 font-medium">Số lượng cuộc hẹn lái thử mong muốn:</span>
                <span className="text-lg font-mono font-bold text-[#FFE875]">
                  {appointmentCount} cuộc hẹn / tháng
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={appointmentCount}
                onChange={(e) => setAppointmentCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#F47721]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>10 hẹn</span>
                <span>25 hẹn</span>
                <span>50 hẹn</span>
                <span>75 hẹn</span>
                <span>100 hẹn</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[11px] text-slate-400 block mb-1">Phí cố định setup (tháng 1):</span>
                <span className="text-lg font-bold font-mono text-white">{formatVND(setupFee)}</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[11px] text-slate-400 block mb-1">
                  Phí biến đổi ({appointmentCount} × 300k):
                </span>
                <span className="text-lg font-bold font-mono text-[#F47721]">
                  {formatVND(variableFee)}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-[#F47721]/20 border border-[#F47721]/50">
                <span className="text-[11px] text-[#FFE875] block mb-1 font-bold">
                  Tổng đầu tư tháng đầu:
                </span>
                <span className="text-xl font-black font-mono text-[#FFE875]">
                  {formatVND(totalMonth1)}
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-300 flex items-center justify-between pt-2">
              <span className="italic">
                * Từ tháng thứ 2 trở đi: Đại lý chỉ thanh toán theo số lượng lịch hẹn thực tế ({formatVND(variableFee)}).
              </span>
              <button
                type="button"
                onClick={onOpenContact}
                className="text-xs font-bold text-[#FFE875] hover:underline cursor-pointer"
              >
                Nhận báo giá chính thức →
              </button>
            </div>
          </div>
        </div>

        {/* 7 TQM Acceptance Criteria */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#F8F9F5] border border-[#DCE3EC] p-6 sm:p-8 space-y-4 mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#75A94C] font-bold uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Tiêu chuẩn nghiệm thu 7 tiêu chí TQM</span>
          </div>
          <h3 className="text-lg font-bold text-[#142A43]">
            Một lịch hẹn đủ điều kiện tính phí (300.000 VNĐ) phải đáp ứng đầy đủ:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {tqmCriteria.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-[#142A43]">
                <span className="w-5 h-5 rounded-md bg-white border border-[#DCE3EC] flex items-center justify-center font-mono font-bold text-[10px] text-[#F47721] shrink-0 mt-0.5">
                  0{idx + 1}
                </span>
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Showcase Banner Box */}
        <div className="rounded-3xl overflow-hidden border border-[#DCE3EC] bg-white shadow-sm max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 h-56 sm:h-64 lg:h-full relative overflow-hidden">
              <img
                src="/assets/automotive-detail.jpg"
                alt="Chi tiết hoàn thiện ngoại thất ô tô cao cấp"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-3 text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F47721]/10 text-[#F47721] text-[11px] font-mono font-bold">
                <span>Hiệu Quả Kinh Doanh Vượt Trội</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-[#142A43]">
                Tối ưu tỷ suất hoàn vốn (ROI) cho ban lãnh đạo showroom
              </h4>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Với mức hoa hồng bán xe hoặc biên lợi nhuận trung bình từ 30 – 100+ triệu đồng cho mỗi xe ô tô được giao, việc đầu tư 300.000 VNĐ cho một lịch hẹn lái thử đạt chuẩn giúp showroom tiết kiệm tới 60% chi phí marketing lãng phí so với các kênh quảng cáo truyền thống.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
