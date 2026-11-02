import React, { useState } from 'react';
import { Settings, Building2, Users, ShieldCheck, RefreshCw, Save, Check } from 'lucide-react';
import { SALESPERSON_LIST, QUALIFICATION_CRITERIA_LIST } from '../../data/mockData.js';

export default function DealershipSettings({ onResetData }) {
  const [profile, setProfile] = useState({
    name: 'Mercedes-Benz Haxaco Sài Gòn',
    hotline: '1900 8999',
    address: '2008 Võ Văn Kiệt, P. An Lạc, Q. Bình Tân, TP. Hồ Chí Minh',
    operatingHours: '08:00 - 18:00 (Tất cả các ngày trong tuần)',
    slaResponseMinutes: 1, // 60s
    testDriveSlotDuration: 90
  });

  const [savedAlert, setSavedAlert] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-[#142A43]">Cấu Hình Vận Hành Showroom (Settings)</h2>
        <p className="text-xs text-[#64748B]">
          Thiết lập thông tin đại lý, nhân sự tư vấn và chính sách tiêu chuẩn chất lượng dịch vụ
        </p>
      </div>

      {savedAlert && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2 shadow-2xs">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Đã lưu thành công các thiết lập tác nghiệp!</span>
        </div>
      )}

      {/* Showroom Information */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#DCE3EC] shadow-xs">
        <h3 className="text-base font-bold text-[#142A43] mb-4 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#F47721]" />
          Hồ Sơ Đại Lý & Showroom
        </h3>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#142A43] font-bold mb-1">Tên đại lý ô tô</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-[#142A43] outline-none focus:border-[#F47721] focus:bg-white text-base sm:text-xs"
              />
            </div>
            <div>
              <label className="block text-[#142A43] font-bold mb-1">Hotline tiếp nhận</label>
              <input
                type="text"
                value={profile.hotline}
                onChange={(e) => setProfile({ ...profile, hotline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-[#142A43] outline-none focus:border-[#F47721] focus:bg-white text-base sm:text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#142A43] font-bold mb-1">Địa chỉ showroom</label>
            <input
              type="text"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-[#142A43] outline-none focus:border-[#F47721] focus:bg-white text-base sm:text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#142A43] font-bold mb-1">Cam kết thời gian phản hồi AI (SLA)</label>
              <input
                type="text"
                value={`${profile.slaResponseMinutes} phút (Tối đa 60 giây)`}
                disabled
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 border border-[#DCE3EC] text-[#94A3B8] font-mono text-base sm:text-xs"
              />
            </div>
            <div>
              <label className="block text-[#142A43] font-bold mb-1">Thời lượng mỗi ca lái thử</label>
              <input
                type="text"
                value={`${profile.testDriveSlotDuration} phút / phiên`}
                disabled
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 border border-[#DCE3EC] text-[#94A3B8] font-mono text-base sm:text-xs"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 min-h-[44px] justify-center rounded-xl bg-[#F47721] hover:bg-[#E76513] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Lưu Cấu Hình Showroom</span>
            </button>
          </div>
        </form>
      </div>

      {/* Sales Team Members */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#DCE3EC] shadow-xs">
        <h3 className="text-base font-bold text-[#142A43] mb-4 flex items-center gap-2">
          <Users className="w-4 h-4 text-[#F47721]" />
          Đội Ngũ Nhân Viên Tư Vấn Sales Phụ Trách ({SALESPERSON_LIST.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {SALESPERSON_LIST.map((sales, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] flex items-center justify-between">
              <div>
                <span className="font-bold text-[#142A43] block">{sales}</span>
                <span className="text-[11px] text-[#64748B]">Trạng thái: Sẵn sàng nhận lịch</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            </div>
          ))}
        </div>
      </div>

      {/* Database Management & Demo Reset */}
      <div className="p-5 sm:p-6 rounded-2xl bg-rose-50/40 border border-rose-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#142A43] flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-rose-600" />
              Khôi Phục Dữ Liệu Kiểm Thử Gốc (Reset Demo Data)
            </h3>
            <p className="text-xs text-[#64748B] mt-1 max-w-md">
              Xóa các thay đổi tạm và đặt lại toàn bộ trạng thái khách hàng, lịch hẹn và chiến dịch về bộ dữ liệu mẫu chuẩn của nhóm.
            </p>
          </div>

          <button
            onClick={() => {
              if (confirm('Bạn có chắc chắn muốn khôi phục lại toàn bộ dữ liệu mẫu gốc?')) {
                onResetData();
              }
            }}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer shrink-0"
          >
            Reset Dữ Liệu Về Mặc Định
          </button>
        </div>
      </div>
    </div>
  );
}
