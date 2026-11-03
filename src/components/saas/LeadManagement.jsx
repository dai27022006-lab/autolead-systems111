import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Kanban,
  Table as TableIcon,
  Phone,
  Mail,
  Calendar,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  MessageSquare,
  FileText,
  Building2
} from 'lucide-react';
import { VEHICLE_OPTIONS, SALESPERSON_LIST } from '../../data/mockData.js';

export default function LeadManagement({
  leads = [],
  onUpdateLeadStatus,
  onAddLead,
  onUpdateLead
}) {
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'table'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('ALL');
  const [selectedLead, setSelectedLead] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState('');

  // Form state for adding new customer lead (Domain B)
  const [newLeadForm, setNewLeadForm] = useState({
    customerName: '',
    phone: '',
    email: '',
    leadSource: 'Meta Ads',
    interestedVehicle: VEHICLE_OPTIONS[0],
    vehicleSegment: 'Luxury SUV',
    purchasePurpose: 'Gia đình & Công việc',
    expectedBudget: '2.5 - 3.2 tỷ VNĐ',
    expectedPurchasingTime: 'Trong 1 tháng tới',
    assignedSalesperson: SALESPERSON_LIST[0]
  });

  const statuses = [
    { id: 'New Lead', label: '1. New Lead', color: 'bg-sky-50 text-sky-800 border-sky-200' },
    { id: 'Contacted', label: '2. Contacted', color: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
    { id: 'Qualified Lead', label: '3. Qualified Lead', color: 'bg-orange-50 text-[#F47721] border-orange-200 font-bold' },
    { id: 'Appointment Booked', label: '4. Appt Booked', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    { id: 'Showroom Visit', label: '5. Showroom Visit', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    { id: 'Sales Opportunity', label: '6. Opportunity', color: 'bg-purple-50 text-purple-800 border-purple-200' }
  ];

  const safeLeads = Array.isArray(leads) ? leads : [];

  // Filtering leads
  const filteredLeads = safeLeads.filter(l => {
    if (!l) return false;
    const name = String(l.customerName || '').toLowerCase();
    const phone = String(l.phone || '');
    const vehicle = String(l.interestedVehicle || '').toLowerCase();
    const q = (searchQuery || '').toLowerCase();

    const matchSearch = name.includes(q) || phone.includes(q) || vehicle.includes(q);
    const matchSegment = selectedSegment === 'ALL' || l.vehicleSegment === selectedSegment;
    return matchSearch && matchSegment;
  });

  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!newLeadForm.customerName.trim() || !newLeadForm.phone.trim()) {
      alert('Vui lòng nhập tên khách hàng và số điện thoại');
      return;
    }
    onAddLead(newLeadForm);
    setIsAddModalOpen(false);
    setNewLeadForm({
      customerName: '',
      phone: '',
      email: '',
      leadSource: 'Meta Ads',
      interestedVehicle: VEHICLE_OPTIONS[0],
      vehicleSegment: 'Luxury SUV',
      purchasePurpose: 'Gia đình & Công việc',
      expectedBudget: '2.5 - 3.2 tỷ VNĐ',
      expectedPurchasingTime: 'Trong 1 tháng tới',
      assignedSalesperson: SALESPERSON_LIST[0]
    });
  };

  const handleAddNote = () => {
    if (!newNoteContent.trim() || !selectedLead) return;
    const updated = {
      ...selectedLead,
      notes: [
        {
          date: new Date().toLocaleString('vi-VN', { hour12: false }),
          author: 'Sales Consultant',
          content: newNoteContent.trim()
        },
        ...(selectedLead.notes || [])
      ]
    };
    onUpdateLead(updated);
    setSelectedLead(updated);
    setNewNoteContent('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#142A43]">Quản Trị Khách Hàng Tiềm Năng (CRM)</h2>
          <p className="text-xs text-[#64748B]">
            Theo dõi hành trình người mua xe qua 6 trạng thái tác nghiệp chuẩn (Domain B: Customer Leads)
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-white border border-[#DCE3EC] shadow-2xs">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'kanban' ? 'bg-[#F47721] text-white shadow-xs font-bold' : 'text-[#64748B] hover:text-[#142A43]'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-[#F47721] text-white shadow-xs font-bold' : 'text-[#64748B] hover:text-[#142A43]'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Danh sách</span>
            </button>
          </div>

          {/* Add Lead Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F47721] hover:bg-[#E76513] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Lead Mới</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#DCE3EC] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên, SĐT, mẫu xe..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-[#142A43] text-xs outline-none focus:border-[#F47721] focus:bg-white focus:ring-1 focus:ring-[#F47721] transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs text-[#64748B] font-medium shrink-0">Phân khúc xe:</span>
          <select
            value={selectedSegment}
            onChange={(e) => setSelectedSegment(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-[#142A43] text-xs outline-none focus:border-[#F47721] cursor-pointer"
          >
            <option value="ALL">Tất cả phân khúc</option>
            <option value="Luxury SUV">Luxury SUV</option>
            <option value="Luxury Sedan">Luxury Sedan</option>
            <option value="Xe lướt hạng sang">Xe lướt hạng sang</option>
          </select>
          <span className="text-xs text-[#64748B] font-mono">({filteredLeads.length} leads)</span>
        </div>
      </div>

      {/* KANBAN VIEW */}
      {viewMode === 'kanban' && (
        <div className="flex lg:grid lg:grid-cols-6 gap-3.5 sm:gap-4 overflow-x-auto pb-4 snap-x">
          {statuses.map((st) => {
            const columnLeads = filteredLeads.filter(l => l.status === st.id);
            return (
              <div key={st.id} className="min-w-[260px] sm:min-w-[280px] lg:min-w-0 shrink-0 lg:shrink rounded-2xl bg-[#F8F9F5] border border-[#DCE3EC] flex flex-col max-h-[750px] snap-center shadow-2xs">
                {/* Column Header */}
                <div className={`p-3.5 border-b flex items-center justify-between rounded-t-2xl ${st.color}`}>
                  <span className="text-xs font-bold">{st.label}</span>
                  <span className="text-xs font-mono font-black px-2 py-0.5 rounded-full bg-white border border-[#DCE3EC] text-[#142A43]">
                    {columnLeads.length}
                  </span>
                </div>

                {/* Lead Cards List */}
                <div className="p-3 space-y-3 flex-1 overflow-y-auto">
                  {columnLeads.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="p-3.5 rounded-xl bg-white border border-[#DCE3EC] hover:border-[#F47721] transition-all cursor-pointer group shadow-2xs hover:shadow-xs"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-[#94A3B8]">{lead.id}</span>
                        {lead.qualificationDetails && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-orange-50 text-[#F47721] border border-orange-200">
                            AI: {lead.qualificationDetails.aiScore}%
                          </span>
                        )}
                      </div>

                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-[#142A43] group-hover:text-[#F47721] transition-colors">
                          {lead.customerName}
                        </h4>
                        {lead.leadSource?.includes('Web') && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-300 shrink-0">
                            Portal Synced
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-[#64748B] mt-0.5 truncate font-medium">{lead.interestedVehicle}</p>

                      {/* Showroom & Timing details matching Leader's specification */}
                      <div className="mt-2 space-y-1 text-[10px] text-[#64748B]">
                        <div className="flex items-center gap-1 text-[#142A43] font-semibold truncate">
                          <Building2 className="w-3 h-3 text-[#F47721] shrink-0" />
                          <span className="truncate">{lead.showroom || 'Mercedes-Benz Haxaco TP.HCM'}</span>
                        </div>
                        <div className="flex items-center justify-between text-[#64748B]">
                          <span>⏱️ {lead.expectedPurchasingTime || 'Trong 2 tuần tới'}</span>
                          <span className="text-emerald-700 font-bold">{lead.preferredContact || 'Zalo OA'}</span>
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[10px] text-[#64748B]">
                        <span className="font-mono">{lead.phone}</span>
                        <span className="text-[#142A43] font-medium">{lead.vehicleSegment}</span>
                      </div>

                      {/* Quick Next Step Transition */}
                      <div className="mt-2.5 pt-2 border-t border-[#E2E8F0] flex items-center justify-between">
                        <span className="text-[10px] text-[#94A3B8]">Gán: {(lead.assignedSalesperson || 'Tư vấn viên').split(' ')[0]}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const currentIndex = statuses.findIndex(s => s.id === lead.status);
                            if (currentIndex < statuses.length - 1) {
                              onUpdateLeadStatus(lead.id, statuses[currentIndex + 1].id);
                            }
                          }}
                          title="Chuyển sang trạng thái kế tiếp"
                          className="text-[10px] text-[#F47721] hover:underline flex items-center gap-0.5 font-bold cursor-pointer"
                        >
                          Tiếp →
                        </button>
                      </div>
                    </div>
                  ))}

                  {columnLeads.length === 0 && (
                    <div className="py-8 text-center text-xs text-[#94A3B8]">
                      Chưa có lead ở bước này
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="rounded-2xl bg-white border border-[#DCE3EC] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#142A43]">
              <thead className="bg-[#F8F9F5] text-[#64748B] uppercase text-[10px] font-bold tracking-wider border-b border-[#DCE3EC]">
                <tr>
                  <th className="py-3.5 px-4">Mã Lead</th>
                  <th className="py-3.5 px-4">Khách Hàng</th>
                  <th className="py-3.5 px-4">Số Điện Thoại</th>
                  <th className="py-3.5 px-4">Mẫu Xe Quan Tâm</th>
                  <th className="py-3.5 px-4">Showroom Đón Tiếp</th>
                  <th className="py-3.5 px-4">Nhu Cầu Mua</th>
                  <th className="py-3.5 px-4">AI Score</th>
                  <th className="py-3.5 px-4">Trạng Thái</th>
                  <th className="py-3.5 px-4">Sales Phụ Trách</th>
                  <th className="py-3.5 px-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] font-medium">
                {filteredLeads.map((ld) => (
                  <tr key={ld.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setSelectedLead(ld)}>
                    <td className="py-3 px-4 font-mono text-[#94A3B8]">{ld.id}</td>
                    <td className="py-3 px-4 text-[#142A43] font-bold">
                      <div className="flex items-center gap-1.5">
                        <span>{ld.customerName}</span>
                        {ld.leadSource?.includes('Web') && (
                          <span className="text-[9px] font-bold px-1 rounded bg-emerald-100 text-emerald-800">
                            Portal
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#64748B] font-mono">{ld.phone}</td>
                    <td className="py-3 px-4 text-[#142A43] font-medium">{ld.interestedVehicle}</td>
                    <td className="py-3 px-4 text-[#64748B] max-w-[150px] truncate" title={ld.showroom}>
                      {ld.showroom || 'Mercedes-Benz Haxaco TP.HCM'}
                    </td>
                    <td className="py-3 px-4 text-[#64748B]">
                      {ld.expectedPurchasingTime || 'Trong 2 tuần tới'}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-[#F47721] font-mono">
                        {ld.qualificationDetails?.aiScore || 50}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2.5 py-1 rounded text-[10px] font-bold bg-[#F8F9F5] text-[#142A43] border border-[#DCE3EC]">
                        {ld.status || 'New Lead'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#64748B]">{ld.assignedSalesperson || 'Chưa phân công'}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLead(ld);
                        }}
                        className="px-2.5 py-1 rounded bg-[#F8F9F5] hover:bg-[#F47721] hover:text-white text-[#142A43] border border-[#DCE3EC] transition-colors text-xs font-semibold cursor-pointer"
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* LEAD DETAIL MODAL / DRAWER */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-[#DCE3EC] rounded-2xl sm:rounded-3xl p-4 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-[#142A43]">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
              <div>
                <span className="text-xs font-mono text-[#94A3B8]">{selectedLead.id}</span>
                <h3 className="text-xl font-bold text-[#142A43] flex items-center gap-2 mt-0.5">
                  {selectedLead.customerName}
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-50 text-[#F47721] border border-orange-200">
                    {selectedLead.status}
                  </span>
                </h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-[#64748B] hover:text-[#142A43] flex items-center justify-center cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Profile Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 text-xs text-[#142A43]">
              <div className="p-3.5 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Số điện thoại:</span>
                  <span className="font-bold text-[#142A43]">{selectedLead.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Email:</span>
                  <span>{selectedLead.email || 'Chưa cung cấp'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Nguồn chiến dịch:</span>
                  <span className="text-sky-600 font-semibold">{selectedLead.leadSource || 'Khách đăng ký Web'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Tư vấn viên phụ trách:</span>
                  <span className="text-[#142A43] font-medium">{selectedLead.assignedSalesperson || 'Chưa phân công'}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Mẫu xe quan tâm:</span>
                  <span className="font-bold text-[#F47721]">{selectedLead.interestedVehicle || 'Chưa chọn mẫu xe'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Showroom đón tiếp:</span>
                  <span className="font-bold text-[#142A43] truncate max-w-[200px]" title={selectedLead.showroom}>
                    {selectedLead.showroom || 'Mercedes-Benz Haxaco Điện Biên Phủ'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Kênh ưu tiên:</span>
                  <span className="text-emerald-700 font-bold">{selectedLead.preferredContact || 'Zalo OA'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Ngân sách dự kiến:</span>
                  <span className="text-[#142A43] font-semibold">{selectedLead.expectedBudget || 'Thỏa thuận'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Thời điểm mua:</span>
                  <span className="font-semibold text-[#142A43]">{selectedLead.expectedPurchasingTime || 'Trong 2 tuần tới'}</span>
                </div>
              </div>
            </div>

            {/* AI Qualification Breakdown */}
            {selectedLead.qualificationDetails && (
              <div className="mb-6 p-4 rounded-xl bg-orange-50/50 border border-orange-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#F47721]" />
                    <span className="text-xs font-bold text-[#142A43] uppercase tracking-wider">Đánh Giá AI Lead Qualification</span>
                  </div>
                  <span className="text-sm font-black text-[#F47721]">
                    {selectedLead.qualificationDetails.aiScore}% Đạt Chuẩn
                  </span>
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {selectedLead.qualificationDetails.aiExplanation}
                </p>
                <div className="mt-3 pt-2 border-t border-orange-200/60 text-xs text-amber-700 font-medium">
                  💡 Gợi ý hành động: {selectedLead.qualificationDetails.suggestedAction}
                </div>
              </div>
            )}

            {/* Interaction History (Omnichannel Log) */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-[#142A43] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F47721]" />
                Lịch Sử Tương Tác Đa Kênh (Omnichannel Timeline)
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {selectedLead.interactionHistory?.map((hist, hIdx) => (
                  <div key={hIdx} className="p-2.5 rounded-lg bg-[#F8F9F5] border border-[#DCE3EC] text-xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="px-2 py-0.5 rounded bg-slate-200 text-[10px] font-bold text-[#142A43] uppercase shrink-0">
                        {hist.channel}
                      </span>
                      <span className="text-[#142A43] truncate">{hist.detail}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#94A3B8] shrink-0">{hist.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Internal Notes & Add Note */}
            <div>
              <h4 className="text-xs font-bold text-[#142A43] uppercase tracking-wider mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#F47721]" />
                Ghi Chú Nội Bộ Showroom
              </h4>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="Thêm ghi chú tương tác..."
                  className="flex-1 px-3 py-2 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-[#142A43] text-xs outline-none focus:border-[#F47721] focus:bg-white"
                />
                <button
                  onClick={handleAddNote}
                  className="px-4 py-2 rounded-xl bg-[#F47721] hover:bg-[#E76513] text-white text-xs font-bold cursor-pointer transition-colors"
                >
                  Lưu
                </button>
              </div>

              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {selectedLead.notes?.map((nt, nIdx) => (
                  <div key={nIdx} className="text-xs text-[#64748B] p-2 rounded bg-[#F8F9F5] border border-[#DCE3EC]">
                    <div className="flex justify-between text-[10px] text-[#94A3B8] mb-0.5">
                      <span className="font-bold text-[#142A43]">{nt.author}</span>
                      <span>{nt.date}</span>
                    </div>
                    <p className="text-[#142A43]">{nt.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Status Updater */}
            <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
              <span className="text-xs text-[#64748B]">Thay đổi trạng thái:</span>
              <div className="flex flex-wrap gap-1.5">
                {statuses.map(st => (
                  <button
                    key={st.id}
                    onClick={() => {
                      onUpdateLeadStatus(selectedLead.id, st.id);
                      setSelectedLead({ ...selectedLead, status: st.id });
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                      selectedLead.status === st.id
                        ? 'bg-[#F47721] text-white border-[#F47721] shadow-2xs'
                        : 'bg-white text-[#64748B] border-[#DCE3EC] hover:border-slate-400'
                    }`}
                  >
                    {st.label.split('. ')[1]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD LEAD MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-[#DCE3EC] rounded-2xl sm:rounded-3xl p-4 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-[#142A43]">
            <h3 className="text-lg sm:text-xl font-bold text-[#142A43] mb-1">Thêm Khách Hàng Tiềm Năng Mới</h3>
            <p className="text-xs text-[#64748B] mb-5">Nhập thông tin người mua xe để bắt đầu quy trình chăm sóc AI (Domain B)</p>

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[#142A43] font-bold mb-1">Tên khách hàng *</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.customerName}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, customerName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-[#142A43] outline-none focus:border-[#F47721] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[#142A43] font-bold mb-1">Số điện thoại *</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="w-full px-3 py-2.5 sm:py-2 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-base sm:text-xs text-[#142A43] outline-none focus:border-[#F47721] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#142A43] font-bold mb-1">Mẫu xe quan tâm</label>
                  <select
                    value={newLeadForm.interestedVehicle}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, interestedVehicle: e.target.value })}
                    className="w-full px-3 py-2.5 sm:py-2 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-base sm:text-xs text-[#142A43] outline-none focus:border-[#F47721] cursor-pointer"
                  >
                    {VEHICLE_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[#142A43] font-bold mb-1">Phân khúc xe</label>
                  <select
                    value={newLeadForm.vehicleSegment}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, vehicleSegment: e.target.value })}
                    className="w-full px-3 py-2.5 sm:py-2 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-base sm:text-xs text-[#142A43] outline-none focus:border-[#F47721] cursor-pointer"
                  >
                    <option value="Luxury SUV">Luxury SUV</option>
                    <option value="Luxury Sedan">Luxury Sedan</option>
                    <option value="Xe lướt hạng sang">Xe lướt hạng sang</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#142A43] font-bold mb-1">Nguồn lead</label>
                  <select
                    value={newLeadForm.leadSource}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, leadSource: e.target.value })}
                    className="w-full px-3 py-2.5 sm:py-2 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-base sm:text-xs text-[#142A43] outline-none focus:border-[#F47721] cursor-pointer"
                  >
                    <option value="Meta Ads">Meta Ads (Facebook/Instagram)</option>
                    <option value="Google Ads">Google Search Ads</option>
                    <option value="TikTok Ads">TikTok Ads</option>
                    <option value="Zalo OA">Zalo Official Account</option>
                    <option value="Showroom Walk-in">Khách đến trực tiếp</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#142A43] font-bold mb-1">Tư vấn viên phân bổ</label>
                  <select
                    value={newLeadForm.assignedSalesperson}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, assignedSalesperson: e.target.value })}
                    className="w-full px-3 py-2.5 sm:py-2 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-base sm:text-xs text-[#142A43] outline-none focus:border-[#F47721] cursor-pointer"
                  >
                    {SALESPERSON_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#142A43] text-xs font-semibold cursor-pointer transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#F47721] text-white text-xs font-bold hover:bg-[#E76513] cursor-pointer transition-colors shadow-xs"
                >
                  Khởi Tạo Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
