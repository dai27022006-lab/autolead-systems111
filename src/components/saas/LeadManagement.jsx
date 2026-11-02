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
  FileText
} from 'lucide-react';
import { VEHICLE_OPTIONS, SALESPERSON_LIST } from '../../data/mockData.js';


export default function LeadManagement({
  leads,
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
    { id: 'New Lead', label: '1. New Lead', color: 'border-sky-500/50 bg-sky-950/20 text-sky-400' },
    { id: 'Contacted', label: '2. Contacted', color: 'border-indigo-500/50 bg-indigo-950/20 text-indigo-400' },
    { id: 'Qualified Lead', label: '3. Qualified Lead', color: 'border-[#C7A66A]/60 bg-[#C7A66A]/10 text-[#C7A66A]' },
    { id: 'Appointment Booked', label: '4. Appt Booked', color: 'border-amber-500/50 bg-amber-950/20 text-amber-400' },
    { id: 'Showroom Visit', label: '5. Showroom Visit', color: 'border-emerald-500/50 bg-emerald-950/20 text-emerald-400' },
    { id: 'Sales Opportunity', label: '6. Opportunity', color: 'border-purple-500/50 bg-purple-950/20 text-purple-400' }
  ];

  // Filtering leads
  const filteredLeads = leads.filter(l => {
    const matchSearch =
      l.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      (l.interestedVehicle && l.interestedVehicle.toLowerCase().includes(searchQuery.toLowerCase()));
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
          content: newNoteContent
        },
        ...selectedLead.notes
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
          <h2 className="text-xl font-extrabold text-white">Quản Trị Khách Hàng Tiềm Năng (CRM)</h2>
          <p className="text-xs text-slate-400">
            Theo dõi hành trình người mua xe qua 6 trạng thái tác nghiệp chuẩn (Domain B: Customer Leads)
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-[#141B26] border border-slate-800">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'kanban' ? 'bg-[#1E2634] text-[#C7A66A] shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-[#1E2634] text-[#C7A66A] shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Danh sách</span>
            </button>
          </div>

          {/* Add Lead Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C7A66A] hover:bg-[#D4AF37] text-[#101B2B] text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Lead Mới</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#141B26] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên, SĐT, mẫu xe..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0d121c] border border-slate-700/80 text-white text-xs outline-none focus:border-[#C7A66A]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-medium shrink-0">Phân khúc xe:</span>
          <select
            value={selectedSegment}
            onChange={(e) => setSelectedSegment(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#0d121c] border border-slate-700/80 text-white text-xs outline-none focus:border-[#C7A66A] cursor-pointer"
          >
            <option value="ALL">Tất cả phân khúc</option>
            <option value="Luxury SUV">Luxury SUV</option>
            <option value="Luxury Sedan">Luxury Sedan</option>
            <option value="Xe lướt hạng sang">Xe lướt hạng sang</option>
          </select>
          <span className="text-xs text-slate-500 font-mono">({filteredLeads.length} leads)</span>
        </div>
      </div>

      {/* KANBAN VIEW */}
      {viewMode === 'kanban' && (
        <div className="flex lg:grid lg:grid-cols-6 gap-3.5 sm:gap-4 overflow-x-auto pb-4 snap-x">
          {statuses.map((st) => {
            const columnLeads = filteredLeads.filter(l => l.status === st.id);
            return (
              <div key={st.id} className="min-w-[260px] sm:min-w-[280px] lg:min-w-0 shrink-0 lg:shrink rounded-2xl bg-[#0f1521] border border-slate-800/80 flex flex-col max-h-[750px] snap-center">
                {/* Column Header */}
                <div className={`p-3.5 border-b border-slate-800 flex items-center justify-between rounded-t-2xl ${st.color}`}>
                  <span className="text-xs font-bold">{st.label}</span>
                  <span className="text-xs font-mono font-black px-2 py-0.5 rounded-full bg-[#101B2B] border border-slate-700">
                    {columnLeads.length}
                  </span>
                </div>

                {/* Lead Cards List */}
                <div className="p-3 space-y-3 flex-1 overflow-y-auto">
                  {columnLeads.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="p-3.5 rounded-xl bg-[#141B26] border border-slate-800 hover:border-[#C7A66A]/60 transition-all cursor-pointer group shadow-sm hover:shadow-md"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-slate-500">{lead.id}</span>
                        {lead.qualificationDetails && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#C7A66A]/20 text-[#C7A66A]">
                            AI: {lead.qualificationDetails.aiScore}%
                          </span>
                        )}
                      </div>

                      <h4 className="text-xs font-bold text-white group-hover:text-[#C7A66A] transition-colors">
                        {lead.customerName}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 truncate">{lead.interestedVehicle}</p>

                      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                        <span>{lead.phone}</span>
                        <span className="text-slate-400 font-medium">{lead.vehicleSegment}</span>
                      </div>

                      {/* Quick Next Step Transition */}
                      <div className="mt-2.5 pt-2 border-t border-slate-800/50 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500">Gán: {lead.assignedSalesperson.split(' ')[0]}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const currentIndex = statuses.findIndex(s => s.id === lead.status);
                            if (currentIndex < statuses.length - 1) {
                              onUpdateLeadStatus(lead.id, statuses[currentIndex + 1].id);
                            }
                          }}
                          title="Chuyển sang trạng thái kế tiếp"
                          className="text-[10px] text-[#C7A66A] hover:underline flex items-center gap-0.5 font-bold cursor-pointer"
                        >
                          Tiếp $\rightarrow$
                        </button>
                      </div>
                    </div>
                  ))}

                  {columnLeads.length === 0 && (
                    <div className="py-8 text-center text-xs text-slate-600">
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
        <div className="rounded-2xl bg-[#141B26] border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#0e1421] text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Mã Lead</th>
                  <th className="py-3.5 px-4">Khách Hàng</th>
                  <th className="py-3.5 px-4">Số Điện Thoại</th>
                  <th className="py-3.5 px-4">Mẫu Xe Quan Tâm</th>
                  <th className="py-3.5 px-4">Nguồn</th>
                  <th className="py-3.5 px-4">AI Score</th>
                  <th className="py-3.5 px-4">Trạng Thái</th>
                  <th className="py-3.5 px-4">Sales Phụ Trách</th>
                  <th className="py-3.5 px-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredLeads.map((ld) => (
                  <tr key={ld.id} className="hover:bg-[#18212e] transition-colors cursor-pointer" onClick={() => setSelectedLead(ld)}>
                    <td className="py-3 px-4 font-mono text-slate-500">{ld.id}</td>
                    <td className="py-3 px-4 text-white font-bold">{ld.customerName}</td>
                    <td className="py-3 px-4 text-slate-300">{ld.phone}</td>
                    <td className="py-3 px-4 text-slate-300">{ld.interestedVehicle}</td>
                    <td className="py-3 px-4 text-slate-400">{ld.leadSource}</td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-[#C7A66A] font-mono">
                        {ld.qualificationDetails?.aiScore || 50}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2.5 py-1 rounded text-[10px] font-bold bg-[#1E2634] text-white border border-slate-700">
                        {ld.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">{ld.assignedSalesperson}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLead(ld);
                        }}
                        className="px-2.5 py-1 rounded bg-[#1E2634] hover:bg-[#C7A66A] hover:text-[#101B2B] text-slate-300 transition-colors text-xs font-semibold cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141B26] border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-slate-500">{selectedLead.id}</span>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mt-0.5">
                  {selectedLead.customerName}
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#C7A66A]/20 text-[#C7A66A] border border-[#C7A66A]/40">
                    {selectedLead.status}
                  </span>
                </h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Profile Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 text-xs text-slate-300">
              <div className="p-3.5 rounded-xl bg-[#0d121c] border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Số điện thoại:</span>
                  <span className="font-bold text-white">{selectedLead.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span>{selectedLead.email || 'Chưa cung cấp'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Nguồn chiến dịch:</span>
                  <span className="text-sky-400 font-semibold">{selectedLead.leadSource}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tư vấn viên phụ trách:</span>
                  <span className="text-white font-medium">{selectedLead.assignedSalesperson}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0d121c] border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Mẫu xe quan tâm:</span>
                  <span className="font-bold text-[#C7A66A]">{selectedLead.interestedVehicle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Phân khúc:</span>
                  <span>{selectedLead.vehicleSegment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Ngân sách dự kiến:</span>
                  <span className="text-white font-semibold">{selectedLead.expectedBudget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Thời điểm mua:</span>
                  <span>{selectedLead.expectedPurchasingTime}</span>
                </div>
              </div>
            </div>

            {/* AI Qualification Breakdown */}
            {selectedLead.qualificationDetails && (
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-[#171D27] to-[#1E2634] border border-[#C7A66A]/40">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C7A66A]" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Đánh Giá AI Lead Qualification</span>
                  </div>
                  <span className="text-sm font-black text-[#C7A66A]">
                    {selectedLead.qualificationDetails.aiScore}% Đạt Chuẩn
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedLead.qualificationDetails.aiExplanation}
                </p>
                <div className="mt-3 pt-2 border-t border-slate-800 text-xs text-amber-300 font-medium">
                  💡 Gợi ý hành động: {selectedLead.qualificationDetails.suggestedAction}
                </div>
              </div>
            )}

            {/* Interaction History (Omnichannel Log) */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                Lịch Sử Tương Tác Đa Kênh (Omnichannel Timeline)
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {selectedLead.interactionHistory?.map((hist, hIdx) => (
                  <div key={hIdx} className="p-2.5 rounded-lg bg-[#0d121c] border border-slate-800/80 text-xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-300 uppercase shrink-0">
                        {hist.channel}
                      </span>
                      <span className="text-slate-300 truncate">{hist.detail}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 shrink-0">{hist.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Internal Notes & Add Note */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                Ghi Chú Nội Bộ Showroom
              </h4>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="Thêm ghi chú tương tác..."
                  className="flex-1 px-3 py-2 rounded-xl bg-[#0d121c] border border-slate-700 text-white text-xs outline-none focus:border-[#C7A66A]"
                />
                <button
                  onClick={handleAddNote}
                  className="px-4 py-2 rounded-xl bg-[#1E2634] hover:bg-[#283244] text-[#C7A66A] text-xs font-bold border border-[#C7A66A]/40 cursor-pointer"
                >
                  Lưu
                </button>
              </div>

              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {selectedLead.notes?.map((nt, nIdx) => (
                  <div key={nIdx} className="text-xs text-slate-400 p-2 rounded bg-[#0d121c]/50 border border-slate-800">
                    <div className="flex justify-between text-[10px] text-slate-500 mb-0.5">
                      <span className="font-bold text-slate-400">{nt.author}</span>
                      <span>{nt.date}</span>
                    </div>
                    <p className="text-slate-300">{nt.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Status Updater */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Thay đổi trạng thái:</span>
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
                        ? 'bg-[#C7A66A] text-[#101B2B] border-[#C7A66A]'
                        : 'bg-[#1E2634] text-slate-300 border-slate-700 hover:border-slate-500'
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141B26] border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-1">Thêm Khách Hàng Tiềm Năng Mới</h3>
            <p className="text-xs text-slate-400 mb-6">Nhập thông tin người mua xe để bắt đầu quy trình chăm sóc AI (Domain B)</p>

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Tên khách hàng *</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.customerName}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, customerName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0d121c] border border-slate-700 text-white outline-none focus:border-[#C7A66A]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Số điện thoại *</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="w-full px-3 py-2.5 sm:py-2 rounded-xl bg-[#0d121c] border border-slate-700 text-base sm:text-xs text-white outline-none focus:border-[#C7A66A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Mẫu xe quan tâm</label>
                  <select
                    value={newLeadForm.interestedVehicle}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, interestedVehicle: e.target.value })}
                    className="w-full px-3 py-2.5 sm:py-2 rounded-xl bg-[#0d121c] border border-slate-700 text-base sm:text-xs text-white outline-none focus:border-[#C7A66A]"
                  >
                    {VEHICLE_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Phân khúc xe</label>
                  <select
                    value={newLeadForm.vehicleSegment}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, vehicleSegment: e.target.value })}
                    className="w-full px-3 py-2.5 sm:py-2 rounded-xl bg-[#0d121c] border border-slate-700 text-base sm:text-xs text-white outline-none focus:border-[#C7A66A]"
                  >
                    <option value="Luxury SUV">Luxury SUV</option>
                    <option value="Luxury Sedan">Luxury Sedan</option>
                    <option value="Xe lướt hạng sang">Xe lướt hạng sang</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Nguồn lead</label>
                  <select
                    value={newLeadForm.leadSource}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, leadSource: e.target.value })}
                    className="w-full px-3 py-2.5 sm:py-2 rounded-xl bg-[#0d121c] border border-slate-700 text-base sm:text-xs text-white outline-none focus:border-[#C7A66A]"
                  >
                    <option value="Meta Ads">Meta Ads (Facebook/Instagram)</option>
                    <option value="Google Ads">Google Search Ads</option>
                    <option value="TikTok Ads">TikTok Ads</option>
                    <option value="Zalo OA">Zalo Official Account</option>
                    <option value="Showroom Walk-in">Khách đến trực tiếp</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Tư vấn viên phân bổ</label>
                  <select
                    value={newLeadForm.assignedSalesperson}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, assignedSalesperson: e.target.value })}
                    className="w-full px-3 py-2.5 sm:py-2 rounded-xl bg-[#0d121c] border border-slate-700 text-base sm:text-xs text-white outline-none focus:border-[#C7A66A]"
                  >
                    {SALESPERSON_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C7A66A] text-[#101B2B] text-xs font-bold hover:bg-[#D4AF37] cursor-pointer"
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
