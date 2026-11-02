import React, { useState } from 'react';
import {
  CheckSquare,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Calendar,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { QUALIFICATION_CRITERIA_LIST } from '../../data/mockData.js';

export default function LeadQualification({
  leads,
  onUpdateLead,
  onOpenCreateAppointment
}) {
  const [selectedLeadId, setSelectedLeadId] = useState(leads[0]?.id || null);
  const activeLead = leads.find(l => l.id === selectedLeadId) || leads[0];

  const handleToggleCriterion = (criterionField) => {
    if (!activeLead) return;
    const currentDetails = activeLead.qualificationDetails || {};
    const updatedDetails = {
      ...currentDetails,
      [criterionField]: !currentDetails[criterionField]
    };

    // Calculate new AI score based on 7 conditions
    const activeConditionsCount = QUALIFICATION_CRITERIA_LIST.filter(c => updatedDetails[c.field]).length;
    const newScore = Math.round((activeConditionsCount / 7) * 100);
    updatedDetails.aiScore = newScore;

    // Check if fully qualified (all 7 fulfilled)
    let newStatus = activeLead.status;
    if (activeConditionsCount === 7) {
      if (newStatus !== 'Appointment Booked' && newStatus !== 'Showroom Visit' && newStatus !== 'Sales Opportunity') {
        newStatus = 'Qualified Lead';
      }
      updatedDetails.aiExplanation = 'Đạt chuẩn 7/7 tiêu chí chất lượng. Đủ điều kiện nghiệm thu chi phí 300.000 VNĐ/cuộc hẹn.';
      updatedDetails.suggestedAction = 'Chốt thông tin lịch hẹn và điều phối xe lái thử sẵn sàng tại showroom.';
    } else {
      updatedDetails.aiExplanation = `Đang đáp ứng ${activeConditionsCount}/7 tiêu chí. Cần thu thập thêm thông tin còn thiếu.`;
      updatedDetails.suggestedAction = 'Kích hoạt kịch bản AI nhắn Zalo hoặc gợi ý khung giờ để chốt ngày lái thử cụ thể.';
    }

    const updatedLead = {
      ...activeLead,
      status: newStatus,
      qualificationDetails: updatedDetails
    };

    onUpdateLead(updatedLead);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F47721]"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#F47721]">
              TQM Quality Assurance Framework
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-[#142A43] mt-0.5">Trung Tâm Sàng Lọc Khách Hàng AI (7 Tiêu Chuẩn)</h2>
          <p className="text-xs text-[#64748B]">
            Kiểm soát chất lượng lead nghiêm ngặt theo tiêu chuẩn nghiệm thu chi phí 300.000 VNĐ/lịch hẹn
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-white border border-[#DCE3EC] text-xs font-mono font-bold text-[#F47721] flex items-center gap-2 shadow-2xs">
          <ShieldCheck className="w-4 h-4" />
          <span>7/7 Tiêu chí = Lịch Hẹn Đủ Điều Kiện</span>
        </div>
      </div>

      {/* Main Grid: Lead Selector + Qualification Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Lead List for Qualification */}
        <div className="rounded-2xl bg-white border border-[#DCE3EC] p-4 shadow-xs flex flex-col h-[280px] lg:h-[700px]">
          <div className="pb-3 border-b border-[#E2E8F0] mb-3 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#142A43]">Danh Sách Lead Cần Thẩm Định</h3>
            <span className="text-[11px] font-mono text-[#94A3B8]">{leads.length} khách hàng</span>
          </div>

          <div className="space-y-2.5 flex-1 overflow-y-auto pr-1">
            {leads.map((ld) => {
              const score = ld.qualificationDetails?.aiScore || 50;
              const isSelected = ld.id === activeLead?.id;
              const isFullyQualified = score >= 90;

              return (
                <div
                  key={ld.id}
                  onClick={() => setSelectedLeadId(ld.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-orange-50/70 border-2 border-[#F47721] shadow-2xs'
                      : 'bg-[#F8F9F5] border border-[#DCE3EC] hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-[#142A43] truncate">{ld.customerName}</span>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                      isFullyQualified ? 'bg-[#F47721] text-white' : 'bg-slate-200 text-[#64748B]'
                    }`}>
                      {score}%
                    </span>
                  </div>
                  <p className="text-[11px] text-[#64748B] truncate">{ld.interestedVehicle}</p>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-[#94A3B8]">
                    <span>{ld.phone}</span>
                    <span className="text-[#142A43] font-medium">{ld.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (2 cols): 7-Criteria Checklist & AI Reasoning Breakdown */}
        {activeLead && (
          <div className="lg:col-span-2 space-y-6">
            {/* Active Lead Summary Card */}
            <div className="p-4 sm:p-6 rounded-2xl bg-white border border-[#DCE3EC] shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#94A3B8]">{activeLead.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F8F9F5] text-[#142A43] border border-[#DCE3EC]">
                      {activeLead.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#142A43] mt-1">{activeLead.customerName}</h3>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Quan tâm: <strong className="text-[#F47721]">{activeLead.interestedVehicle}</strong> ({activeLead.vehicleSegment})
                  </p>
                </div>

                {/* AI Score Badge */}
                <div className="text-center sm:text-right p-4 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC]">
                  <span className="text-[10px] font-bold uppercase text-[#64748B] block">AI Qualification Score</span>
                  <div className="flex items-center justify-center sm:justify-end gap-1.5 mt-0.5">
                    <Sparkles className="w-5 h-5 text-[#F47721]" />
                    <span className="text-3xl font-black text-[#F47721]">
                      {activeLead.qualificationDetails?.aiScore || 50}%
                    </span>
                  </div>
                  <span className="text-[10px] text-[#64748B]">
                    {(activeLead.qualificationDetails?.aiScore || 0) >= 90 ? 'Đủ chuẩn nghiệm thu 300K' : 'Chưa hoàn tất 7 tiêu chí'}
                  </span>
                </div>
              </div>

              {/* 7 Criteria Interactive Checklist */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#142A43] mb-3 flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-[#F47721]" />
                  Bảng Thẩm Định 7 Tiêu Chuẩn Lịch Hẹn Đủ Điều Kiện:
                </h4>

                <div className="space-y-2.5">
                  {QUALIFICATION_CRITERIA_LIST.map((crit) => {
                    const isChecked = Boolean(activeLead.qualificationDetails?.[crit.field]);
                    return (
                      <div
                        key={crit.id}
                        onClick={() => handleToggleCriterion(crit.field)}
                        className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-orange-50/60 border-2 border-[#F47721] text-[#142A43]'
                            : 'bg-[#F8F9F5] border border-[#DCE3EC] text-[#64748B] hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                            isChecked ? 'bg-[#F47721] border-[#F47721] text-white' : 'border-slate-300 bg-white'
                          }`}>
                            {isChecked && <CheckCircle2 className="w-4 h-4" />}
                          </div>
                          <span className="text-xs font-medium text-[#142A43]">{crit.label}</span>
                        </div>

                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          isChecked ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-[#94A3B8]'
                        }`}>
                          {isChecked ? 'Đạt' : 'Chưa đạt'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI Explanation & Decision Logic */}
              <div className="mt-6 p-4 rounded-xl bg-orange-50/50 border border-orange-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#142A43] uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#F47721]" />
                  <span>Giải Thích Quyết Định Của AI (Decision Logic)</span>
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {activeLead.qualificationDetails?.aiExplanation || 'Đang cập nhật đánh giá AI...'}
                </p>
                <div className="pt-2 border-t border-orange-200/60 text-xs text-amber-700 font-medium">
                  🎯 Hành động đề xuất tiếp theo: {activeLead.qualificationDetails?.suggestedAction}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-[#64748B]">
                  Trạng thái nghiệm thu: <strong className="text-[#142A43]">
                    {(activeLead.qualificationDetails?.aiScore || 0) >= 90 ? 'Lịch Hẹn Đủ Điều Kiện (CPA: 300.000 VNĐ)' : 'Cần Follow-up Thêm'}
                  </strong>
                </span>

                <button
                  onClick={() => onOpenCreateAppointment(activeLead)}
                  className="w-full sm:w-auto px-5 py-2.5 min-h-[44px] justify-center rounded-xl bg-[#F47721] hover:bg-[#E76513] text-white text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Lên Lịch Hẹn Lái Thử Cho Khách Này</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
