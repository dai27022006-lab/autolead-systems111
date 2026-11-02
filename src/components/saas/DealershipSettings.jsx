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
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-white">Cấu Hình Vận Hành Showroom (Settings)</h2>
        <p className="text-xs text-slate-400">
          Thiết lập thông tin đại lý, nhân sự tư vấn và chính sách tiêu chuẩn chất lượng dịch vụ
        </p>
      </div>

      {savedAlert && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Đã lưu thành công các thiết lập tác nghiệp!</span>
        </div>
      )}

      {/* Showroom Information */}
      <div className="p-6 rounded-2xl bg-[#141B26] border border-slate-800 shadow-xl">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#C7A66A]" />
          Hồ Sơ Đại Lý & Showroom
        </h3>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Tên đại lý ô tô</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d121c] border border-slate-700 text-white outline-none focus:border-[#C7A66A]"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">Hotline tiếp nhận</label>
              <input
                type="text"
                value={profile.hotline}
                onChange={(e) => setProfile({ ...profile, hotline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d121c] border border-slate-700 text-white outline-none focus:border-[#C7A66A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">Địa chỉ showroom</label>
            <input
              type="text"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d121c] border border-slate-700 text-white outline-none focus:border-[#C7A66A]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Cam kết thời gian phản hồi AI (SLA)</label>
              <input
                type="text"
                value={`${profile.slaResponseMinutes} phút (Tối đa 60 giây)`}
                disabled
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d121c] border border-slate-800 text-slate-400 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">Thời lượng mỗi ca lái thử</label>
              <input
                type="text"
                value={`${profile.testDriveSlotDuration} phút / phiên`}
                disabled
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d121c] border border-slate-800 text-slate-400 font-mono"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#C7A66A] hover:bg-[#D4AF37] text-[#101B2B] text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Lưu Cấu Hình Showroom</span>
            </button>
          </div>
        </form>
      </div>

      {/* Sales Team Members */}
      <div className="p-6 rounded-2xl bg-[#141B26] border border-slate-800 shadow-xl">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Users className="w-4 h-4 text-[#C7A66A]" />
          Đội Ngũ Nhân Viên Tư Vấn Sales Phụ Trách ({SALESPERSON_LIST.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {SALESPERSON_LIST.map((sales, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-[#0d121c] border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">{sales}</span>
                <span className="text-[11px] text-slate-500">Trạng thái: Sẵn sàng nhận lịch</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
          ))}
        </div>
      </div>

      {/* Database Management & Demo Reset */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1F1717] to-[#141B26] border border-rose-500/30 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-rose-400" />
              Khôi Phục Dữ Liệu Kiểm Thử Gốc (Reset Demo Data)
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              Xóa các thay đổi tạm và đặt lại toàn bộ trạng thái khách hàng, lịch hẹn và chiến dịch về bộ dữ liệu mẫu chuẩn của nhóm.
            </p>
          </div>

          <button
            onClick={() => {
              if (confirm('Bạn có chắc chắn muốn khôi phục lại toàn bộ dữ liệu mẫu gốc?')) {
                onResetData();
              }
            }}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-lg cursor-pointer shrink-0"
          >
            Reset Dữ Liệu Về Mặc Định
          </button>
        </div>
      </div>
    </div>
  );
}
