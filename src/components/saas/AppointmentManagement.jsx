import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Plus,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Check,
  ShieldCheck,
  Filter,
  Car
} from 'lucide-react';
import { VEHICLE_OPTIONS, SALESPERSON_LIST } from '../../data/mockData.js';

export default function AppointmentManagement({
  appointments,
  leads,
  onAddAppointment,
  onUpdateAppointmentStatus
}) {
  const [viewType, setViewType] = useState('list'); // 'list' | 'calendar'
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2026-11-07');

  const [newAptForm, setNewAptForm] = useState({
    customerName: '',
    customerPhone: '',
    vehicleModel: VEHICLE_OPTIONS[0],
    appointmentDate: '2026-11-08',
    appointmentTime: '09:30 - 11:00',
    salesperson: SALESPERSON_LIST[0],
    notes: 'Khách yêu cầu chuẩn bị xe sạch sẽ và hồ sơ trả góp ngân hàng.'
  });

  const statuses = [
    { id: 'Pending Confirmation', label: 'Chờ xác nhận', color: 'bg-amber-100 text-amber-800 border-amber-300' },
    { id: 'Confirmed', label: 'Đã xác nhận', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    { id: 'Completed', label: 'Đã hoàn thành', color: 'bg-purple-100 text-purple-800 border-purple-300' },
    { id: 'Cancelled', label: 'Đã hủy', color: 'bg-slate-100 text-slate-700 border-slate-300' },
    { id: 'No-show', label: 'Khách không đến', color: 'bg-rose-100 text-rose-800 border-rose-300' }
  ];

  const filteredAppointments = appointments.filter(a => {
    if (selectedStatusFilter === 'ALL') return true;
    return a.status === selectedStatusFilter;
  });

  const handleCreateAppointment = (e) => {
    e.preventDefault();
    if (!newAptForm.customerName.trim() || !newAptForm.customerPhone.trim()) {
      alert('Vui lòng nhập họ tên và số điện thoại khách hàng');
      return;
    }

    onAddAppointment({
      ...newAptForm,
      status: 'Confirmed',
      isQualifiedAppointment: true,
      qualificationChecklist: {
        validContact: true,
        clearDemand: true,
        specificModel: true,
        meetsCriteria: true,
        agreedVisit: true,
        specificTime: true,
        confirmedInSystem: true
      }
    });

    setIsModalOpen(false);
    setNewAptForm({
      customerName: '',
      customerPhone: '',
      vehicleModel: VEHICLE_OPTIONS[0],
      appointmentDate: '2026-11-08',
      appointmentTime: '09:30 - 11:00',
      salesperson: SALESPERSON_LIST[0],
      notes: ''
    });
  };

  const formatVND = (num) => new Intl.NumberFormat('vi-VN').format(num) + ' VNĐ';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#142A43]">Quản Lý Lịch Hẹn Lái Thử (Test Drive Appointments)</h2>
          <p className="text-xs text-[#64748B]">
            Điều phối phương tiện lái thử, phân công tư vấn viên và nghiệm thu tiêu chuẩn 300.000 VNĐ/cuộc hẹn
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 rounded-xl bg-white border border-[#DCE3EC] shadow-2xs">
            <button
              onClick={() => setViewType('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                viewType === 'list' ? 'bg-[#F47721] text-white shadow-xs font-bold' : 'text-[#64748B] hover:text-[#142A43]'
              }`}
            >
              Danh sách
            </button>
            <button
              onClick={() => setViewType('calendar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                viewType === 'calendar' ? 'bg-[#F47721] text-white shadow-xs font-bold' : 'text-[#64748B] hover:text-[#142A43]'
              }`}
            >
              Lịch biểu (Calendar)
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F47721] hover:bg-[#E76513] text-white text-xs font-bold cursor-pointer shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo Lịch Hẹn Mới</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedStatusFilter('ALL')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
            selectedStatusFilter === 'ALL'
              ? 'bg-[#F47721] text-white border-[#F47721] shadow-2xs'
              : 'bg-white text-[#64748B] border-[#DCE3EC] hover:border-slate-300'
          }`}
        >
          Tất cả ({appointments.length})
        </button>
        {statuses.map(st => {
          const count = appointments.filter(a => a.status === st.id).length;
          return (
            <button
              key={st.id}
              onClick={() => setSelectedStatusFilter(st.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer flex items-center gap-1.5 ${
                selectedStatusFilter === st.id
                  ? 'bg-orange-50 text-[#F47721] border-orange-300 font-bold shadow-2xs'
                  : 'bg-white text-[#64748B] border-[#DCE3EC] hover:border-slate-300'
              }`}
            >
              <span>{st.label}</span>
              <span className="font-mono text-[10px] text-[#94A3B8]">({count})</span>
            </button>
          );
        })}
      </div>

      {/* LIST VIEW */}
      {viewType === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAppointments.map((apt) => {
            const statusConfig = statuses.find(s => s.id === apt.status) || statuses[0];
            return (
              <div
                key={apt.id}
                className="p-5 rounded-2xl bg-white border border-[#DCE3EC] hover:border-[#F47721] transition-all shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-3">
                    <span className="text-xs font-mono font-bold text-[#94A3B8]">{apt.id}</span>
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${statusConfig.color}`}>
                      {statusConfig.label}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-base font-bold text-[#142A43]">{apt.customerName}</h4>
                      <p className="text-xs text-[#64748B] font-mono mt-0.5">{apt.customerPhone}</p>
                    </div>

                    {/* CPA Billable Badge */}
                    <div className="text-right">
                      <span className={`text-xs font-bold font-mono block ${apt.billableFee > 0 ? 'text-[#F47721]' : 'text-[#94A3B8]'}`}>
                        {apt.billableFee > 0 ? formatVND(apt.billableFee) : '0 VNĐ (Không tính phí)'}
                      </span>
                      <span className="text-[10px] text-[#94A3B8]">
                        {apt.isQualifiedAppointment ? 'Đạt 7/7 tiêu chuẩn' : 'Chưa đủ điều kiện'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] space-y-1.5 text-xs text-[#142A43]">
                    <div className="flex items-center gap-2">
                      <Car className="w-3.5 h-3.5 text-[#F47721] shrink-0" />
                      <span className="font-semibold text-[#142A43]">{apt.vehicleModel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="text-[#64748B]">{apt.appointmentDate} • {apt.appointmentTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="text-[#64748B]">Tư vấn phụ trách: <strong className="text-[#142A43]">{apt.salesperson}</strong></span>
                    </div>
                  </div>

                  {apt.notes && (
                    <p className="mt-3 text-xs text-[#64748B] italic">
                      📝 {apt.notes}
                    </p>
                  )}
                </div>

                {/* Status Action Buttons */}
                <div className="mt-5 pt-3 border-t border-[#E2E8F0] flex flex-wrap items-center justify-end gap-1.5">
                  {apt.status === 'Pending Confirmation' && (
                    <button
                      onClick={() => onUpdateAppointmentStatus(apt.id, 'Confirmed')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-bold hover:bg-emerald-200 cursor-pointer transition-colors"
                    >
                      Xác Nhận Hẹn
                    </button>
                  )}
                  {apt.status === 'Confirmed' && (
                    <button
                      onClick={() => onUpdateAppointmentStatus(apt.id, 'Completed')}
                      className="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-800 border border-purple-300 text-[11px] font-bold hover:bg-purple-200 cursor-pointer transition-colors"
                    >
                      Đã Lái Thử Xong
                    </button>
                  )}
                  {apt.status !== 'Completed' && apt.status !== 'Cancelled' && (
                    <>
                      <button
                        onClick={() => onUpdateAppointmentStatus(apt.id, 'No-show')}
                        className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 border border-rose-300 text-[11px] font-semibold hover:bg-rose-200 cursor-pointer transition-colors"
                      >
                        Khách Vắng Mặt (No-show)
                      </button>
                      <button
                        onClick={() => onUpdateAppointmentStatus(apt.id, 'Cancelled')}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-[#64748B] border border-[#DCE3EC] text-[11px] hover:text-[#142A43] cursor-pointer transition-colors"
                      >
                        Hủy Hẹn
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CALENDAR VIEW */}
      {viewType === 'calendar' && (
        <div className="p-6 rounded-2xl bg-white border border-[#DCE3EC] shadow-xs">
          <div className="pb-4 border-b border-[#E2E8F0] flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-[#142A43] flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[#F47721]" />
                Lịch Biểu Trực Quan Showroom (Tháng 11/2026)
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">Chọn ngày để xem các cuộc hẹn lái thử trong ngày</p>
            </div>
            <span className="text-xs font-mono font-bold text-[#F47721]">Ngày đang chọn: {selectedDate}</span>
          </div>

          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs mb-6">
            {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'].map((d, i) => (
              <span key={i} className="font-bold text-[#64748B] uppercase text-[10px] py-1">
                <span className="sm:hidden">{['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'][i]}</span>
                <span className="hidden sm:inline">{d}</span>
              </span>
            ))}
            {[
              '2026-11-02', '2026-11-03', '2026-11-04', '2026-11-05',
              '2026-11-06', '2026-11-07', '2026-11-08'
            ].map((dayStr, idx) => {
              const dayNum = 2 + idx;
              const dayApts = appointments.filter(a => a.appointmentDate === dayStr);
              const hasApt = dayApts.length > 0;
              const isSelected = selectedDate === dayStr;
              return (
                <button
                  key={dayStr}
                  onClick={() => setSelectedDate(dayStr)}
                  className={`p-1.5 sm:p-3 rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-between min-h-[55px] sm:min-h-[70px] ${
                    isSelected
                      ? 'bg-orange-50 border-2 border-[#F47721] shadow-2xs'
                      : 'bg-[#F8F9F5] border border-[#DCE3EC] hover:border-slate-300'
                  }`}
                >
                  <span className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-[#F47721]' : 'text-[#142A43]'}`}>
                    {dayNum}
                  </span>
                  {hasApt && (
                    <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#F47721] animate-pulse"></span>
                  )}
                  <span className="text-[9px] sm:text-[10px] text-[#94A3B8] font-mono">
                    <span className="sm:hidden">{dayApts.length}</span>
                    <span className="hidden sm:inline">{dayApts.length} hẹn</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* List of appointments for selected date */}
          <div className="pt-4 border-t border-[#E2E8F0]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#142A43] mb-3">
              Lịch Hẹn Trong Ngày {selectedDate}:
            </h4>
            <div className="space-y-2">
              {appointments.filter(a => a.appointmentDate === selectedDate).map(apt => (
                <div key={apt.id} className="p-3 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#142A43]">{apt.customerName}</span> ({apt.customerPhone})
                    <p className="text-[#64748B] mt-0.5">{apt.vehicleModel} • {apt.appointmentTime}</p>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-orange-100 text-[#F47721] border border-orange-200">
                    {apt.status}
                  </span>
                </div>
              ))}
              {appointments.filter(a => a.appointmentDate === selectedDate).length === 0 && (
                <p className="text-xs text-[#94A3B8] italic py-3 text-center">Không có lịch hẹn nào vào ngày này.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CREATE APPOINTMENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white border border-[#DCE3EC] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl text-[#142A43]">
            <h3 className="text-xl font-bold text-[#142A43] mb-1">Thiết Lập Lịch Hẹn Lái Thử Mới</h3>
            <p className="text-xs text-[#64748B] mb-5">Đảm bảo khách hàng đã đồng ý ngày giờ cụ thể để đạt chuẩn 300.000 VNĐ</p>

            <form onSubmit={handleCreateAppointment} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#142A43] font-bold mb-1">Tên khách hàng *</label>
                <input
                  type="text"
                  required
                  value={newAptForm.customerName}
                  onChange={(e) => setNewAptForm({ ...newAptForm, customerName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-[#142A43] outline-none focus:border-[#F47721] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[#142A43] font-bold mb-1">Số điện thoại liên hệ *</label>
                <input
                  type="text"
                  required
                  value={newAptForm.customerPhone}
                  onChange={(e) => setNewAptForm({ ...newAptForm, customerPhone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-[#142A43] outline-none focus:border-[#F47721] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#142A43] font-bold mb-1">Ngày lái thử *</label>
                  <input
                    type="date"
                    required
                    value={newAptForm.appointmentDate}
                    onChange={(e) => setNewAptForm({ ...newAptForm, appointmentDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-[#142A43] outline-none focus:border-[#F47721] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[#142A43] font-bold mb-1">Khung giờ *</label>
                  <select
                    value={newAptForm.appointmentTime}
                    onChange={(e) => setNewAptForm({ ...newAptForm, appointmentTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-[#142A43] outline-none focus:border-[#F47721] cursor-pointer"
                  >
                    <option value="09:00 - 10:30">09:00 - 10:30 (Sáng)</option>
                    <option value="10:30 - 12:00">10:30 - 12:00 (Sáng)</option>
                    <option value="14:00 - 15:30">14:00 - 15:30 (Chiều)</option>
                    <option value="16:00 - 17:30">16:00 - 17:30 (Chiều)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#142A43] font-bold mb-1">Xe lái thử đăng ký</label>
                <select
                  value={newAptForm.vehicleModel}
                  onChange={(e) => setNewAptForm({ ...newAptForm, vehicleModel: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-[#142A43] outline-none focus:border-[#F47721] cursor-pointer"
                >
                  {VEHICLE_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[#142A43] font-bold mb-1">Tư vấn viên đón tiếp</label>
                <select
                  value={newAptForm.salesperson}
                  onChange={(e) => setNewAptForm({ ...newAptForm, salesperson: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-[#142A43] outline-none focus:border-[#F47721] cursor-pointer"
                >
                  {SALESPERSON_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[#142A43] font-bold mb-1">Ghi chú yêu cầu đặc biệt</label>
                <textarea
                  rows="2"
                  value={newAptForm.notes}
                  onChange={(e) => setNewAptForm({ ...newAptForm, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-[#142A43] outline-none focus:border-[#F47721] focus:bg-white"
                ></textarea>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#142A43] font-semibold cursor-pointer transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#F47721] text-white font-bold hover:bg-[#E76513] cursor-pointer transition-colors shadow-xs"
                >
                  Xác Nhận & Lưu Lịch Hẹn
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
