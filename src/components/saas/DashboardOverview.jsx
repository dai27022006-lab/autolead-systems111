import React from 'react';
import {
  Users,
  UserCheck,
  CalendarCheck,
  Building2,
  TrendingUp,
  AlertTriangle,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Sparkles
} from 'lucide-react';

export default function DashboardOverview({
  leads = [],
  appointments = [],
  campaigns = [],
  onNavigateToTab
}) {
  const safeLeads = Array.isArray(leads) ? leads : [];
  const safeAppointments = Array.isArray(appointments) ? appointments : [];

  // Calculate operational stats
  const totalLeads = safeLeads.length;
  const newLeads = safeLeads.filter(l => l?.status === 'New Lead').length;
  const contactedLeads = safeLeads.filter(l => l?.status === 'Contacted').length;
  const qualifiedLeads = safeLeads.filter(l => l?.status === 'Qualified Lead').length;
  const bookedAppointments = safeLeads.filter(l => l?.status === 'Appointment Booked').length;
  const showroomVisits = safeLeads.filter(l => l?.status === 'Showroom Visit').length;
  const salesOpportunities = safeLeads.filter(l => l?.status === 'Sales Opportunity').length;

  // Billable Qualified Appointments (300,000 VND / appointment)
  const billableAppointments = safeAppointments.filter(a => a?.isQualifiedAppointment && (a?.status === 'Confirmed' || a?.status === 'Completed'));
  const totalBillableFee = billableAppointments.length * 300000;

  // Operational Funnel stages
  const funnelStages = [
    { label: 'Lead Tiếp nhận', count: totalLeads, rate: '100%', color: 'bg-slate-500' },
    { label: 'Đã Liên hệ (AI)', count: totalLeads - newLeads, rate: `${Math.round(((totalLeads - newLeads) / (totalLeads || 1)) * 100)}%`, color: 'bg-sky-500' },
    { label: 'Đạt 7 Tiêu chí', count: qualifiedLeads + bookedAppointments + showroomVisits + salesOpportunities, rate: `${Math.round(((qualifiedLeads + bookedAppointments + showroomVisits + salesOpportunities) / (totalLeads || 1)) * 100)}%`, color: 'bg-amber-500' },
    { label: 'Lịch Hẹn Lái Thử', count: bookedAppointments + showroomVisits + salesOpportunities, rate: `${Math.round(((bookedAppointments + showroomVisits + salesOpportunities) / (totalLeads || 1)) * 100)}%`, color: 'bg-[#F47721]' },
    { label: 'Đã Đến Showroom', count: showroomVisits + salesOpportunities, rate: `${Math.round(((showroomVisits + salesOpportunities) / (totalLeads || 1)) * 100)}%`, color: 'bg-emerald-600' },
    { label: 'Cơ Hội Bán Xe', count: salesOpportunities, rate: `${Math.round((salesOpportunities / (totalLeads || 1)) * 100)}%`, color: 'bg-purple-600' }
  ];

  const formatVND = (num) => new Intl.NumberFormat('vi-VN').format(num) + ' VNĐ';

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Banner: Lean Operations & Verification Status */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DCE3EC] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#F47721]">
              Tác nghiệp Chuẩn Quản trị TMĐT (I-T-O & Lean Operations)
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-[#142A43] mt-1">
            Bảng Điều Khiển Tác Nghiệp & Phễu Chuyển Đổi Lịch Hẹn
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Theo dõi thời gian thực quá trình chuyển hóa Lead quảng cáo → Lịch hẹn lái thử đủ điều kiện → Cơ hội chốt hợp đồng xe.
          </p>
        </div>

        {/* Billable Qualified Appointment Badge */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] flex items-center justify-between sm:justify-start w-full sm:w-auto gap-4 shrink-0 shadow-2xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#64748B] block">Lịch Hẹn Đủ Điều Kiện Tính Phí</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl sm:text-2xl font-black text-[#F47721]">{billableAppointments.length}</span>
              <span className="text-xs text-[#64748B]">cuộc hẹn</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-700">
              Tổng phí kết quả: {formatVND(totalBillableFee)}
            </span>
          </div>
          <button
            onClick={() => onNavigateToTab('appointments')}
            className="px-3 py-2 min-h-[44px] flex items-center justify-center rounded-lg bg-white hover:bg-slate-100 text-xs font-bold text-[#142A43] border border-[#DCE3EC] cursor-pointer shadow-2xs transition-colors"
          >
            Đối soát →
          </button>
        </div>
      </div>

      {/* Value Proposition Callout: Automation behind forms */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-xs text-[#142A43] shadow-xs flex items-start gap-3.5 text-left">
        <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center shrink-0 mt-0.5 text-[#F47721]">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <p className="font-bold text-[#142A43] text-xs uppercase tracking-wide font-mono flex items-center gap-2">
            <span>Nguyên Lý Tác Nghiệp: Bổ Sung Tự Động Hóa Phía Sau Form</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-[#F47721] border border-orange-200 font-bold">
              Transformation Engine
            </span>
          </p>
          <p className="text-xs text-[#475569] leading-relaxed">
            Các form đăng ký lái thử hiện nay chủ yếu hỗ trợ khách hàng chủ động cung cấp thông tin và gửi yêu cầu đến đại lý. <strong>AutoLead Systems không thay thế những form này</strong> mà <strong>bổ sung một hệ thống tự động hóa phía sau</strong>, giúp đại lý tiếp tục chăm sóc, sàng lọc, theo dõi và chuyển đổi khách hàng tiềm năng thành những lịch hẹn lái thử đủ điều kiện. Qua đó, đại lý không chỉ thu thập được thông tin khách hàng mà còn khai thác hiệu quả hơn nguồn khách hàng đã có.
          </p>
        </div>
      </div>

      {/* 7 Operational Metric Cards (I-T-O Pipeline) */}
      <div>
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#142A43] flex items-center gap-2">
            <Users className="w-4 h-4 text-[#F47721]" />
            Tiến độ 6 Trạng Thái Khách Hàng (Kanban)
          </h3>
          <button
            onClick={() => onNavigateToTab('leads')}
            className="text-xs font-bold text-[#F47721] hover:underline flex items-center gap-1 cursor-pointer"
          >
            Xem Kanban →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5 sm:gap-3">
          <div className="p-4 rounded-xl bg-white border border-[#DCE3EC] shadow-2xs">
            <span className="text-[11px] font-medium text-[#64748B] block">1. Total Leads</span>
            <span className="text-2xl font-black text-[#142A43] mt-1 block">{totalLeads}</span>
            <span className="text-[10px] text-[#94A3B8]">Đầu vào (Input)</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-sky-200 shadow-2xs">
            <span className="text-[11px] font-medium text-[#64748B] block">2. New Lead</span>
            <span className="text-2xl font-black text-sky-600 mt-1 block">{newLeads}</span>
            <span className="text-[10px] text-sky-600 font-semibold">Chờ AI liên hệ</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-indigo-200 shadow-2xs">
            <span className="text-[11px] font-medium text-[#64748B] block">3. Contacted</span>
            <span className="text-2xl font-black text-indigo-600 mt-1 block">{contactedLeads}</span>
            <span className="text-[10px] text-indigo-600 font-semibold">Đang follow-up</span>
          </div>

          <div className="p-4 rounded-xl bg-white border-2 border-[#F47721] shadow-xs">
            <span className="text-[11px] font-bold text-[#F47721] block">4. Qualified</span>
            <span className="text-2xl font-black text-[#F47721] mt-1 block">{qualifiedLeads}</span>
            <span className="text-[10px] text-[#F47721] font-semibold">Đạt 7 tiêu chuẩn</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-amber-200 shadow-2xs">
            <span className="text-[11px] font-medium text-[#64748B] block">5. Appt Booked</span>
            <span className="text-2xl font-black text-amber-600 mt-1 block">{bookedAppointments}</span>
            <span className="text-[10px] text-amber-600 font-semibold">Đã chốt ngày giờ</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-emerald-200 shadow-2xs">
            <span className="text-[11px] font-medium text-[#64748B] block">6. Showroom Visit</span>
            <span className="text-2xl font-black text-emerald-600 mt-1 block">{showroomVisits}</span>
            <span className="text-[10px] text-emerald-600 font-semibold">Đã lái thử thực tế</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-purple-200 shadow-2xs">
            <span className="text-[11px] font-medium text-purple-700 block">7. Opportunity</span>
            <span className="text-2xl font-black text-purple-600 mt-1 block">{salesOpportunities}</span>
            <span className="text-[10px] text-purple-600 font-semibold">Đàm phán cọc xe</span>
          </div>
        </div>
      </div>

      {/* Grid: Conversion Funnel & Lean WIP Bottleneck Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversion Funnel */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl bg-white border border-[#DCE3EC] shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] mb-5">
            <div>
              <h3 className="text-base font-bold text-[#142A43] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#F47721]" />
                Phễu Chuyển Đổi Tác Nghiệp (Lead-to-Showroom Funnel)
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">Tỷ lệ chuyển hóa qua từng chặng thẩm định</p>
            </div>
            <span className="text-xs font-mono text-[#F47721] font-bold">Standard CPA: 300.000đ</span>
          </div>

          <div className="space-y-4">
            {funnelStages.map((stg, sIdx) => (
              <div key={sIdx}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-[#142A43]">{stg.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#142A43]">{stg.count} lead</span>
                    <span className="text-[#64748B] font-mono text-[11px]">({stg.rate})</span>
                  </div>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden p-0.5 border border-slate-200">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${stg.color}`}
                    style={{ width: stg.rate }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between text-xs text-[#64748B] gap-2">
            <span>Tỷ lệ hẹn lái thử thành công: <strong className="text-emerald-700 font-bold">
              {Math.round(((bookedAppointments + showroomVisits + salesOpportunities) / (totalLeads || 1)) * 100)}%
            </strong> (Cao gấp 3.2 lần trung bình ngành)</span>
            <span className="text-[11px] text-[#94A3B8]">Dữ liệu đối soát tự động từ CRM</span>
          </div>
        </div>

        {/* Lean & WIP Bottleneck Alert (Course Chapter 5) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#DCE3EC] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-4 border-b border-[#E2E8F0] mb-5">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="text-base font-bold text-[#142A43]">Cảnh Báo Điểm Nghẽn (WIP)</h3>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="p-3.5 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC]">
                <div className="flex justify-between items-center text-[#142A43]">
                  <span>WIP Khâu Chờ Liên Hệ:</span>
                  <span className="font-bold text-emerald-700">1 lead (Tốt)</span>
                </div>
                <p className="text-[11px] text-[#64748B] mt-1">AI tự động kích hoạt cuộc gọi/Zalo dưới 60s, không để lead bị ứ đọng.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200">
                <div className="flex justify-between items-center text-[#142A43]">
                  <span>WIP Khâu Sàng Lọc:</span>
                  <span className="font-bold text-amber-700">{contactedLeads} lead đang chờ</span>
                </div>
                <p className="text-[11px] text-[#64748B] mt-1">Cần chốt lịch hẹn cụ thể để đủ điều kiện nghiệm thu 300.000 VNĐ.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC]">
                <div className="flex justify-between items-center text-[#142A43]">
                  <span>Hiệu suất tiếp nhận:</span>
                  <span className="font-bold text-[#142A43]">96.8% đúng hạn</span>
                </div>
                <p className="text-[11px] text-[#64748B] mt-1">Tuân thủ tiêu chuẩn chất lượng dịch vụ số TQM.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E2E8F0]">
            <button
              onClick={() => onNavigateToTab('qualification')}
              className="w-full py-2.5 rounded-xl bg-[#F47721] hover:bg-[#E76513] text-xs font-bold text-white transition-colors cursor-pointer shadow-xs"
            >
              Mở Trình Sàng Lọc AI Ngay →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Upcoming Appointments & Recent Interaction History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments Table */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#DCE3EC] shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] mb-4">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-[#F47721]" />
              <h3 className="text-base font-bold text-[#142A43]">Lịch Hẹn Lái Thử Sắp Tới</h3>
            </div>
            <button
              onClick={() => onNavigateToTab('appointments')}
              className="text-xs text-[#F47721] hover:underline font-bold cursor-pointer"
            >
              Xem tất cả ({appointments.length}) →
            </button>
          </div>

          <div className="space-y-3">
            {appointments.slice(0, 3).map((apt) => (
              <div
                key={apt.id}
                className="p-3.5 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#142A43]">{apt.customerName}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      apt.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                      apt.status === 'Completed' ? 'bg-purple-100 text-purple-800 border border-purple-300' :
                      'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                  <p className="text-[#64748B] text-[11px] mt-0.5">{apt.vehicleModel}</p>
                  <p className="text-[#94A3B8] text-[10px] mt-0.5 font-mono">
                    {apt.appointmentDate} • {apt.appointmentTime} • Sales: {apt.salesperson}
                  </p>
                </div>

                <div className="text-left sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E2E8F0] flex sm:block items-center justify-between">
                  <span className={`font-mono text-xs font-bold block ${apt.isQualifiedAppointment ? 'text-[#F47721]' : 'text-[#94A3B8]'}`}>
                    {apt.isQualifiedAppointment ? '+300.000đ' : 'Chưa đủ điều kiện'}
                  </span>
                  <span className="text-[10px] text-[#94A3B8]">Billable CPA</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Lead Activity Feed */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#DCE3EC] shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#F47721]" />
              <h3 className="text-base font-bold text-[#142A43]">Nhật Ký Tác Nghiệp Gần Nhất</h3>
            </div>
            <span className="text-xs text-[#94A3B8]">Omnichannel Log</span>
          </div>

          <div className="space-y-3.5">
            {leads.slice(0, 4).map((ld) => {
              const latestLog = ld.interactionHistory?.[0] || { channel: 'System', time: ld.createdAt, detail: 'Tiếp nhận thông tin' };
              return (
                <div key={ld.id} className="flex items-start gap-3 text-xs">
                  <div className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0 mt-0.5 text-[#F47721]">
                    <PhoneCall className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-[#142A43] truncate">{ld.customerName}</span>
                      <span className="text-[10px] font-mono text-[#94A3B8] shrink-0">{latestLog.time}</span>
                    </div>
                    <p className="text-[#64748B] text-[11px] truncate mt-0.5">{latestLog.detail}</p>
                    <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-slate-100 text-[#64748B] font-medium border border-[#DCE3EC]">
                      Kênh: {ld.leadSource} • Xe: {ld.interestedVehicle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
