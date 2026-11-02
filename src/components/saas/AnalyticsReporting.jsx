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

export default function AnalyticsReporting({ leads, appointments, campaigns }) {
  const totalLeads = leads.length;
  const qualifiedLeads = leads.filter(l => l.status === 'Qualified Lead' || l.status === 'Appointment Booked' || l.status === 'Showroom Visit' || l.status === 'Sales Opportunity').length;
  const bookedAppointments = leads.filter(l => l.status === 'Appointment Booked' || l.status === 'Showroom Visit' || l.status === 'Sales Opportunity').length;
  const showroomVisits = leads.filter(l => l.status === 'Showroom Visit' || l.status === 'Sales Opportunity').length;
  const salesOpportunities = leads.filter(l => l.status === 'Sales Opportunity').length;

  const qualificationRate = totalLeads ? Math.round((qualifiedLeads / totalLeads) * 100) : 0;
  const appointmentRate = totalLeads ? Math.round((bookedAppointments / totalLeads) * 100) : 0;
  const showroomVisitRate = bookedAppointments ? Math.round((showroomVisits / bookedAppointments) * 100) : 0;

  // Billable Qualified Appointments (300,000 VND rate)
  const billableCount = appointments.filter(a => a.isQualifiedAppointment && (a.status === 'Confirmed' || a.status === 'Completed')).length;
  const billableAmount = billableCount * 300000;

  const formatVND = (num) => new Intl.NumberFormat('vi-VN').format(num) + ' VNĐ';

  // Lead sources breakdown
  const sources = [
    { name: 'Meta Ads (Facebook/Instagram)', count: leads.filter(l => l.leadSource.includes('Meta')).length, share: '45%' },
    { name: 'Google Search Ads', count: leads.filter(l => l.leadSource.includes('Google')).length, share: '25%' },
    { name: 'TikTok Ads', count: leads.filter(l => l.leadSource.includes('TikTok')).length, share: '18%' },
    { name: 'Zalo OA & Website', count: leads.filter(l => l.leadSource.includes('Zalo') || l.leadSource.includes('Website')).length, share: '12%' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C7A66A]"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C7A66A]">
            Chức Năng 6 Trong Lời Chào Hàng
          </span>
        </div>
        <h2 className="text-xl font-extrabold text-white mt-0.5">
          Báo Cáo Hiệu Suất Tác Nghiệp & Đối Soát Chi Phí (KPI & TQM)
        </h2>
        <p className="text-xs text-slate-400">
          Minh bạch toàn diện các chỉ số luồng vi mô, phễu chuyển đổi và biểu phí theo kết quả 300.000 VNĐ/lịch hẹn
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#141B26] border border-slate-800 shadow-xl">
          <span className="text-xs text-slate-400 block">Tỷ lệ Sàng lọc Đạt Chuẩn (AI)</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-black text-white">{qualificationRate}%</span>
            <span className="text-xs font-bold text-emerald-400">7 Tiêu chuẩn</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Đạt {qualifiedLeads}/{totalLeads} khách hàng thẩm định</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#141B26] border border-slate-800 shadow-xl">
          <span className="text-xs text-slate-400 block">Tỷ lệ Chốt Hẹn Lái Thử</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-black text-[#C7A66A]">{appointmentRate}%</span>
            <span className="text-xs font-bold text-slate-300">CPA 300K</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Tổng {bookedAppointments} cuộc hẹn showroom</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#141B26] border border-slate-800 shadow-xl">
          <span className="text-xs text-slate-400 block">Tỷ lệ Đến Showroom (Show-up)</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-black text-emerald-400">{showroomVisitRate}%</span>
            <span className="text-xs font-bold text-emerald-400">Nhắc lịch 24h & 2h</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Giảm tỷ lệ No-show xuống dưới 15%</p>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1E2634] to-[#121A26] border-2 border-[#C7A66A]/60 shadow-xl gold-border-glow">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C7A66A] block">Lịch Hẹn Tính Phí Tháng Này</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-black text-white">{billableCount}</span>
            <span className="text-xs font-bold text-[#C7A66A]">300.000đ / lịch</span>
          </div>
          <p className="text-xs font-bold text-emerald-400 mt-2">
            Phí thanh toán: {formatVND(billableAmount)}
          </p>
        </div>
      </div>

      {/* LEAN & VSM BENCHMARK TABLE (IUH Operations Management Chapter 2 & 5) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#141B26] border border-slate-800 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#C7A66A]" />
              <h3 className="text-base font-bold text-white">So Sánh Bản Đồ Luồng Giá Trị (VSM): Trước vs Sau Triển Khai</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Chứng minh sự tinh gọn theo triết lý Lean Operations, loại bỏ lãng phí thời gian và tăng thông lượng (Throughput)
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
            Lean Optimized
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0e1421] text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Chỉ Số Tác Nghiệp (Operations Metrics)</th>
                <th className="py-3.5 px-4 text-rose-400">Quy Trình Cũ (Thủ Công - As-Is)</th>
                <th className="py-3.5 px-4 text-emerald-400">AutoLead Systems (To-Be)</th>
                <th className="py-3.5 px-4 text-[#C7A66A]">Mức Độ Cải Tiến</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-medium">
              <tr>
                <td className="py-3.5 px-4 font-bold text-white">1. Thời gian phản hồi lead lần đầu (Response Time)</td>
                <td className="py-3.5 px-4 text-slate-400">4 – 8 giờ (mất khách ban đêm)</td>
                <td className="py-3.5 px-4 font-bold text-emerald-400">&lt; 60 giây (AI tự động 24/7)</td>
                <td className="py-3.5 px-4 font-bold text-[#C7A66A]">Nhanh hơn 98%</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-white">2. Tỷ lệ lead rác Sales phải gọi thủ công (Waste)</td>
                <td className="py-3.5 px-4 text-slate-400">65% – 70% cuộc gọi vô ích</td>
                <td className="py-3.5 px-4 font-bold text-emerald-400">&lt; 10% (đã qua 7 tiêu chí AI)</td>
                <td className="py-3.5 px-4 font-bold text-[#C7A66A]">Cắt giảm 85% lãng phí</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-white">3. Tỷ lệ chuyển đổi ra lịch hẹn lái thử (Appointment Rate)</td>
                <td className="py-3.5 px-4 text-slate-400">6% – 8% trên tổng lead</td>
                <td className="py-3.5 px-4 font-bold text-emerald-400">25% – 32% trên tổng lead</td>
                <td className="py-3.5 px-4 font-bold text-[#C7A66A]">Tăng gấp 3.5 lần</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-white">4. Tỷ lệ khách vắng mặt (No-show Rate)</td>
                <td className="py-3.5 px-4 text-slate-400">35% – 45% lịch bị lỡ</td>
                <td className="py-3.5 px-4 font-bold text-emerald-400">&lt; 15% (nhắc lịch tự động Zalo/SMS)</td>
                <td className="py-3.5 px-4 font-bold text-[#C7A66A]">Giảm 60% rủi ro hủy</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-white">5. Năng lực tiếp nhận tối đa (Capacity)</td>
                <td className="py-3.5 px-4 text-slate-400">Bị nghẽn khi lead &gt; 200/tháng</td>
                <td className="py-3.5 px-4 font-bold text-emerald-400">Không giới hạn (Khả năng co giãn số)</td>
                <td className="py-3.5 px-4 font-bold text-[#C7A66A]">Mở rộng không cần tuyển thêm</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Source Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#141B26] border border-slate-800 shadow-xl">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-[#C7A66A]" />
            Cơ Cấu Nguồn Khách Hàng (Lead Source Mix)
          </h3>
          <div className="space-y-3">
            {sources.map((src, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#0d121c] border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white block">{src.name}</span>
                  <span className="text-slate-500 text-[11px]">{src.count} khách hàng ghi nhận</span>
                </div>
                <span className="font-mono text-sm font-black text-[#C7A66A]">{src.share}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#141B26] border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[#C7A66A]" />
              Quy Trình Nghiệm Thu & Quyết Toán CPA
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Theo hợp đồng dịch vụ chính thức: Mỗi lịch hẹn đủ điều kiện phải đáp ứng đầy đủ 7 tiêu chí TQM và được xác nhận trên hệ thống trước khi xuất hóa đơn <strong>300.000 VNĐ</strong>.
            </p>
            <div className="mt-4 p-4 rounded-xl bg-[#0d121c] border border-slate-800 text-xs space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span>Số lịch hẹn đủ điều kiện:</span>
                <span className="font-bold text-white">{billableCount} lịch</span>
              </div>
              <div className="flex justify-between">
                <span>Đơn giá chuẩn hóa:</span>
                <span className="font-mono text-[#C7A66A]">300.000 VNĐ / lịch</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800 font-bold text-sm">
                <span>Tổng tiền quyết toán:</span>
                <span className="text-emerald-400 font-black">{formatVND(billableAmount)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500 italic">
            * Cam kết không tính phí đối với lịch hủy trước giờ hẹn hoặc lead trùng lặp.
          </div>
        </div>
      </div>
    </div>
  );
}
