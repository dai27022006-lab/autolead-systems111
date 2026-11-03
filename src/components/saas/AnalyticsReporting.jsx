import React from 'react';
import {
  LineChart as LineChartIcon,
  TrendingUp,
  Award,
  ShieldCheck,
  Zap,
  Clock,
  DollarSign,
  PieChart,
  BarChart2,
  FileCheck
} from 'lucide-react';

export default function AnalyticsReporting({ leads = [], appointments = [], campaigns = [] }) {
  const safeLeads = Array.isArray(leads) ? leads : [];
  const safeAppointments = Array.isArray(appointments) ? appointments : [];

  const totalLeads = safeLeads.length;
  const qualifiedLeads = safeLeads.filter(l => l?.status === 'Qualified Lead' || l?.status === 'Appointment Booked' || l?.status === 'Showroom Visit' || l?.status === 'Sales Opportunity').length;
  const bookedAppointments = safeLeads.filter(l => l?.status === 'Appointment Booked' || l?.status === 'Showroom Visit' || l?.status === 'Sales Opportunity').length;
  const showroomVisits = safeLeads.filter(l => l?.status === 'Showroom Visit' || l?.status === 'Sales Opportunity').length;
  const salesOpportunities = safeLeads.filter(l => l?.status === 'Sales Opportunity').length;

  const qualificationRate = totalLeads ? Math.round((qualifiedLeads / totalLeads) * 100) : 0;
  const appointmentRate = totalLeads ? Math.round((bookedAppointments / totalLeads) * 100) : 0;
  const showroomVisitRate = bookedAppointments ? Math.round((showroomVisits / bookedAppointments) * 100) : 0;

  // Official Core Offer: Standard Plan (4,000,000 VND for 50 Qualified Leads, 100,000 VND/overage lead)
  const standardQuota = 50;
  const baseMonthlySubscription = 4000000;
  const overageLeadsCount = Math.max(0, qualifiedLeads - standardQuota);
  const overageFeeAmount = overageLeadsCount * 100000;
  const totalSettlementAmount = baseMonthlySubscription + overageFeeAmount;

  const formatVND = (num) => new Intl.NumberFormat('vi-VN').format(num) + ' VNĐ';

  const getSourceCount = (keyword) =>
    safeLeads.filter(l => String(l?.leadSource || '').toLowerCase().includes(keyword.toLowerCase())).length;

  // Lead sources breakdown
  const sources = [
    { name: 'Meta Ads (Facebook/Instagram)', count: getSourceCount('Meta'), share: '45%' },
    { name: 'Google Search Ads', count: getSourceCount('Google'), share: '25%' },
    { name: 'TikTok Ads', count: getSourceCount('TikTok'), share: '18%' },
    { name: 'Zalo OA & Website', count: safeLeads.filter(l => {
      const src = String(l?.leadSource || '').toLowerCase();
      return src.includes('zalo') || src.includes('website') || src.includes('web') || src.includes('portal');
    }).length, share: '12%' }
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F47721]"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#F47721]">
            Chức Năng 6 Trong Lời Chào Hàng
          </span>
        </div>
        <h2 className="text-xl font-extrabold text-[#142A43] mt-0.5">
          Báo Cáo Hiệu Suất Tác Nghiệp & Đối Soát Chi Phí (KPI & TQM)
        </h2>
        <p className="text-xs text-[#64748B]">
          Minh bạch toàn diện các chỉ số luồng vi mô, phễu chuyển đổi và đối soát hạn mức gói Standard (4.000.000đ/tháng)
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#DCE3EC] shadow-xs">
          <span className="text-xs text-[#64748B] block">Tỷ lệ Sàng lọc Đạt Chuẩn (AI)</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-black text-[#142A43]">{qualificationRate}%</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">6 Tiêu chuẩn</span>
          </div>
          <p className="text-[11px] text-[#94A3B8] mt-2">Đạt {qualifiedLeads}/{totalLeads} khách hàng thẩm định</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DCE3EC] shadow-xs">
          <span className="text-xs text-[#64748B] block">Tỷ lệ Chốt Hẹn Lái Thử</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-black text-[#F47721]">{appointmentRate}%</span>
            <span className="text-xs font-bold text-[#64748B] bg-slate-100 px-2 py-0.5 rounded border border-[#DCE3EC]">Appointment</span>
          </div>
          <p className="text-[11px] text-[#94A3B8] mt-2">Tổng {bookedAppointments} cuộc hẹn showroom</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DCE3EC] shadow-xs">
          <span className="text-xs text-[#64748B] block">Tỷ lệ Đến Showroom (Show-up)</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-black text-emerald-700">{showroomVisitRate}%</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Nhắc lịch 24h & 2h</span>
          </div>
          <p className="text-[11px] text-[#94A3B8] mt-2">Giảm tỷ lệ No-show xuống dưới 15%</p>
        </div>

        <div className="p-5 rounded-2xl bg-orange-50/50 border-2 border-[#F47721] shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F47721] block">Gói Standard (50 Lead Hạn Mức)</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-black text-[#142A43]">{qualifiedLeads} / 50</span>
            <span className="text-xs font-bold text-[#F47721]">
              {overageLeadsCount > 0 ? `+${overageLeadsCount} lead vượt` : 'Trong hạn mức'}
            </span>
          </div>
          <p className="text-xs font-bold text-emerald-700 mt-2">
            Tổng phí kỳ này: {formatVND(totalSettlementAmount)}
          </p>
        </div>
      </div>

      {/* LEAN & VSM BENCHMARK TABLE (IUH Operations Management Chapter 2 & 5) */}
      <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-[#DCE3EC] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] mb-6 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#F47721]" />
              <h3 className="text-base font-bold text-[#142A43]">So Sánh Bản Đồ Luồng Giá Trị (VSM): Trước vs Sau Triển Khai</h3>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              Chứng minh sự tinh gọn theo triết lý Lean Operations, loại bỏ lãng phí thời gian và tăng thông lượng (Throughput)
            </p>
          </div>
          <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold">
            Lean Optimized
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-xs text-[#142A43]">
            <thead className="bg-[#F8F9F5] text-[#64748B] uppercase text-[10px] font-bold tracking-wider border-b border-[#DCE3EC]">
              <tr>
                <th className="py-3.5 px-4">Chỉ Số Tác Nghiệp (Operations Metrics)</th>
                <th className="py-3.5 px-4 text-rose-600">Quy Trình Cũ (Thủ Công - As-Is)</th>
                <th className="py-3.5 px-4 text-emerald-700">AutoLead Systems (To-Be)</th>
                <th className="py-3.5 px-4 text-[#F47721]">Mức Độ Cải Tiến</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] font-medium">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-[#142A43]">1. Thời gian phản hồi lead lần đầu (Response Time)</td>
                <td className="py-3.5 px-4 text-[#64748B]">4 – 8 giờ (mất khách ban đêm)</td>
                <td className="py-3.5 px-4 font-bold text-emerald-700">&lt; 60 giây (AI tự động 24/7)</td>
                <td className="py-3.5 px-4 font-bold text-[#F47721]">Nhanh hơn 98%</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-[#142A43]">2. Tỷ lệ lead rác Sales phải gọi thủ công (Waste)</td>
                <td className="py-3.5 px-4 text-[#64748B]">65% – 70% cuộc gọi vô ích</td>
                <td className="py-3.5 px-4 font-bold text-emerald-700">&lt; 10% (đã qua 7 tiêu chí AI)</td>
                <td className="py-3.5 px-4 font-bold text-[#F47721]">Cắt giảm 85% lãng phí</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-[#142A43]">3. Tỷ lệ chuyển đổi ra lịch hẹn lái thử (Appointment Rate)</td>
                <td className="py-3.5 px-4 text-[#64748B]">6% – 8% trên tổng lead</td>
                <td className="py-3.5 px-4 font-bold text-emerald-700">25% – 32% trên tổng lead</td>
                <td className="py-3.5 px-4 font-bold text-[#F47721]">Tăng gấp 3.5 lần</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-[#142A43]">4. Tỷ lệ khách vắng mặt (No-show Rate)</td>
                <td className="py-3.5 px-4 text-[#64748B]">35% – 45% lịch bị lỡ</td>
                <td className="py-3.5 px-4 font-bold text-emerald-700">&lt; 15% (nhắc lịch tự động Zalo/SMS)</td>
                <td className="py-3.5 px-4 font-bold text-[#F47721]">Giảm 60% rủi ro hủy</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-[#142A43]">5. Năng lực tiếp nhận tối đa (Capacity)</td>
                <td className="py-3.5 px-4 text-[#64748B]">Bị nghẽn khi lead &gt; 200/tháng</td>
                <td className="py-3.5 px-4 font-bold text-emerald-700">Không giới hạn (Khả năng co giãn số)</td>
                <td className="py-3.5 px-4 font-bold text-[#F47721]">Mở rộng không cần tuyển thêm</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Source Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#DCE3EC] shadow-xs">
          <h3 className="text-base font-bold text-[#142A43] mb-4 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-[#F47721]" />
            Cơ Cấu Nguồn Khách Hàng (Lead Source Mix)
          </h3>
          <div className="space-y-3">
            {sources.map((src, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#142A43] block">{src.name}</span>
                  <span className="text-[#94A3B8] text-[11px]">{src.count} khách hàng ghi nhận</span>
                </div>
                <span className="font-mono text-sm font-black text-[#F47721]">{src.share}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#DCE3EC] shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#142A43] mb-3 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[#F47721]" />
              Quy Trình Nghiệm Thu & Quyết Toán Thuê Bao
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Theo lời chào hàng chính thức (Gói Standard chủ lực): Phí thuê bao <strong>4.000.000 VNĐ / tháng</strong> cho 50 Qualified Lead hợp lệ. Mỗi lead vượt hạn mức tính <strong>100.000 VNĐ</strong> sau đối soát. Không thu phí riêng cho mỗi lịch hẹn hoặc lượt khách đến.
            </p>
            <div className="mt-4 p-4 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-xs space-y-1.5 text-[#142A43]">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Qualified Leads ghi nhận:</span>
                <span className="font-bold text-[#142A43]">{qualifiedLeads} / 50 lead</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Phí thuê bao cơ bản:</span>
                <span className="font-mono text-[#142A43] font-bold">4.000.000 VNĐ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Phí vượt hạn mức ({overageLeadsCount} × 100k):</span>
                <span className="font-mono text-[#F47721] font-bold">{formatVND(overageFeeAmount)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E2E8F0] font-bold text-sm">
                <span>Tổng tiền quyết toán kỳ:</span>
                <span className="text-emerald-700 font-black">{formatVND(totalSettlementAmount)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E2E8F0] text-[11px] text-[#94A3B8] italic">
            * Nguyên tắc mục 5.5: Lead trùng lặp hoặc không đạt tiêu chí không tính vào hạn mức Qualified Lead.
          </div>
        </div>
      </div>
    </div>
  );
}
