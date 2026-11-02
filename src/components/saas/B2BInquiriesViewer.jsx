import React from 'react';
import { Building2, ShieldCheck, Mail, Phone, MapPin, Calendar, Clock, Layers } from 'lucide-react';

export default function B2BInquiriesViewer({ inquiries }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sky-500"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
            Kiến Trúc Dữ Liệu Miền A (Data Domain A)
          </span>
        </div>
        <h2 className="text-xl font-extrabold text-[#142A43] mt-0.5">
          Danh Sách Đại Lý & Showroom Đăng Ký Dịch Vụ (B2B Inquiries)
        </h2>
        <p className="text-xs text-[#64748B]">
          Thu thập từ biểu mẫu trên Website B2B Chào Hàng — Hoàn toàn tách biệt với dữ liệu người mua xe (Domain B).
        </p>
      </div>

      {/* Domain Separation Educational Box */}
      <div className="p-5 rounded-2xl bg-white border border-[#DCE3EC] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#142A43]">Nguyên Tắc Phân Tách 2 Miền Dữ Liệu (Two Separate Data Domains)</h3>
            <p className="text-xs text-[#64748B] mt-0.5 max-w-2xl leading-relaxed">
              <strong>Domain A (Tại đây):</strong> Khách hàng là <em>Chủ showroom / Giám đốc đại lý</em> mua giải pháp AutoLead Systems.<br />
              <strong>Domain B (Tab CRM):</strong> Khách hàng là <em>Người tiêu dùng mua xe ô tô cá nhân</em> từ quảng cáo showroom.
            </p>
          </div>
        </div>

        <span className="px-3 py-1.5 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 text-xs font-mono font-bold shrink-0">
          Tổng: {inquiries.length} đại lý đăng ký
        </span>
      </div>

      {/* Inquiries Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inquiries.map((inq) => (
          <div
            key={inq.id}
            className="rounded-2xl bg-white border border-[#DCE3EC] p-6 shadow-xs flex flex-col justify-between hover:border-sky-400 transition-all"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-3">
                <span className="text-xs font-mono font-bold text-[#94A3B8]">{inq.id}</span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-300">
                  {inq.status}
                </span>
              </div>

              <h4 className="text-base font-bold text-[#142A43] leading-snug">{inq.dealershipName}</h4>
              <p className="text-xs text-[#64748B] mt-1 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#94A3B8]" />
                <span>{inq.dealershipType}</span>
              </p>

              <div className="mt-4 p-3.5 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] space-y-2 text-xs text-[#142A43]">
                <div className="flex items-center gap-2">
                  <span className="text-[#64748B] w-20 shrink-0">Người đại diện:</span>
                  <strong className="text-[#142A43] truncate">{inq.contactPerson}</strong>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#64748B] w-20 shrink-0">Điện thoại:</span>
                  <span className="font-mono text-[#142A43]">{inq.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#64748B] w-20 shrink-0">Email:</span>
                  <span className="truncate text-[#64748B]">{inq.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#64748B] w-20 shrink-0">Địa bàn:</span>
                  <span className="truncate">{inq.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#64748B] w-20 shrink-0">Quy mô lead:</span>
                  <span className="font-semibold text-emerald-700">{inq.monthlyLeadVolume}</span>
                </div>
              </div>

              {inq.notes && (
                <p className="mt-3 text-xs text-[#64748B] italic bg-[#F8F9F5] p-2.5 rounded-lg border border-[#DCE3EC]">
                  💬 Nhu cầu: {inq.notes}
                </p>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-[#E2E8F0] text-[10px] text-[#94A3B8] font-mono flex items-center justify-between">
              <span>Đăng ký: {inq.submittedAt}</span>
              <span className="text-sky-600 font-bold">Lưu trữ Real</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
