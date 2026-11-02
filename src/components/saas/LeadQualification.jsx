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
            <span className="w-2 h-2 rounded-full bg-[#C7A66A]"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C7A66A]">
              TQM Quality Assurance Framework
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white mt-0.5">Trung Tâm Sàng Lọc Khách Hàng AI (7 Tiêu Chuẩn)</h2>
          <p className="text-xs text-slate-400">
            Kiểm soát chất lượng lead nghiêm ngặt theo tiêu chuẩn nghiệm thu chi phí 300.000 VNĐ/lịch hẹn
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-[#141B26] border border-[#C7A66A]/40 text-xs font-mono font-bold text-[#C7A66A] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          <span>7/7 Tiêu chí = Lịch Hẹn Đủ Điều Kiện</span>
        </div>
      </div>

      {/* Main Grid: Lead Selector + Qualification Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Lead List for Qualification */}
        <div className="rounded-2xl bg-[#141B26] border border-slate-800 p-4 shadow-xl flex flex-col h-[700px]">
          <div className="pb-3 border-b border-slate-800 mb-3 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Danh Sách Lead Cần Thẩm Định</h3>
            <span className="text-[11px] font-mono text-slate-500">{leads.length} khách hàng</span>
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
                      ? 'bg-gradient-to-r from-[#1E2634] to-[#171D27] border-[#C7A66A] shadow-md'
                      : 'bg-[#0d121c] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-white truncate">{ld.customerName}</span>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                      isFullyQualified ? 'bg-[#C7A66A]/20 text-[#C7A66A]' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {score}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">{ld.interestedVehicle}</p>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                    <span>{ld.phone}</span>
                    <span className="text-slate-400 font-medium">{ld.status}</span>
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
            <div className="p-6 rounded-2xl bg-[#141B26] border border-slate-800 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500">{activeLead.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1E2634] text-slate-300 border border-slate-700">
                      {activeLead.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white mt-1">{activeLead.customerName}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Quan tâm: <strong className="text-[#C7A66A]">{activeLead.interestedVehicle}</strong> ({activeLead.vehicleSegment})
                  </p>
                </div>

                {/* AI Score Badge */}
                <div className="text-center sm:text-right p-4 rounded-xl bg-[#0d121c] border border-slate-800">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">AI Qualification Score</span>
                  <div className="flex items-center justify-center sm:justify-end gap-1.5 mt-0.5">
                    <Sparkles className="w-5 h-5 text-[#C7A66A]" />
                    <span className="text-3xl font-black text-[#C7A66A]">
                      {activeLead.qualificationDetails?.aiScore || 50}%
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {(activeLead.qualificationDetails?.aiScore || 0) >= 90 ? 'Đủ chuẩn nghiệm thu 300K' : 'Chưa hoàn tất 7 tiêu chí'}
                  </span>
                </div>
              </div>

              {/* 7 Criteria Interactive Checklist */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-[#C7A66A]" />
                  Bảng Thẩm Định 7 Tiêu Chuẩn Lịch Hẹn Đủ Điều Kiện:
                </h4>

                <div className="space-y-2.5">
                  {QUALIFICATION_CRITERIA_LIST.map((crit, idx) => {
                    const isChecked = Boolean(activeLead.qualificationDetails?.[crit.field]);
                    return (
                      <div
                        key={crit.id}
                        onClick={() => handleToggleCriterion(crit.field)}
                        className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-[#121A26] border-[#C7A66A]/50 text-white'
                            : 'bg-[#0d121c] border-slate-800/80 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                            isChecked ? 'bg-[#C7A66A] border-[#C7A66A] text-[#101B2B]' : 'border-slate-700 bg-transparent'
                          }`}>
                            {isChecked && <CheckCircle2 className="w-4 h-4" />}
                          </div>
                          <span className="text-xs font-medium">{crit.label}</span>
                        </div>

                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          isChecked ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                        }`}>
                          {isChecked ? 'Đạt' : 'Chưa đạt'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI Explanation & Decision Logic */}
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-[#171D27] to-[#1E2634] border border-[#C7A66A]/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#C7A66A]" />
                  <span>Giải Thích Quyết Định Của AI (Decision Logic)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeLead.qualificationDetails?.aiExplanation || 'Đang cập nhật đánh giá AI...'}
                </p>
                <div className="pt-2 border-t border-slate-800 text-xs text-amber-300 font-medium">
                  🎯 Hành động đề xuất tiếp theo: {activeLead.qualificationDetails?.suggestedAction}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-slate-400">
                  Trạng thái nghiệm thu: <strong className="text-white">
                    {(activeLead.qualificationDetails?.aiScore || 0) >= 90 ? 'Lịch Hẹn Đủ Điều Kiện (CPA: 300.000 VNĐ)' : 'Cần Follow-up Thêm'}
                  </strong>
                </span>

                <button
                  onClick={() => onOpenCreateAppointment(activeLead)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C7A66A] to-[#B08D4C] hover:from-[#D4AF37] hover:to-[#C7A66A] text-[#101B2B] text-xs font-bold flex items-center gap-2 shadow-lg cursor-pointer"
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
