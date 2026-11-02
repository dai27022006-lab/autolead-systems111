import React, { useState } from 'react';
import { Lock, Mail, ShieldCheck, ArrowRight, Building2, User } from 'lucide-react';
import { api } from '../../services/api';

export default function DealerLogin({ onLoginSuccess, onBackToBuyer }) {
  const [email, setEmail] = useState('dealer@haxaco.vn');
  const [password, setPassword] = useState('demo123');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    const res = await api.login(email, password);
    setIsLoading(false);
    if (res && res.success) {
      onLoginSuccess(res.user);
    } else {
      setErrorMsg(res?.message || 'Sai thông tin đăng nhập.');
    }
  };

  const handleQuickDemoLogin = async () => {
    setEmail('dealer@haxaco.vn');
    setPassword('demo123');
    setIsLoading(true);
    const res = await api.login('dealer@haxaco.vn', 'demo123');
    setIsLoading(false);
    if (res && res.success) {
      onLoginSuccess(res.user);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-3 sm:p-4 bg-[#F8F9F5]">
      <div className="max-w-md w-full rounded-2xl sm:rounded-3xl bg-white border border-[#DCE3EC] p-5 sm:p-8 shadow-lg space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center mx-auto mb-3 text-[#F47721] shadow-2xs">
            <Building2 className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#F47721] block">
            Cổng Quản Trị Tác Nghiệp
          </span>
          <h2 className="text-2xl font-black text-[#142A43] mt-1">Đăng Nhập CRM Showroom</h2>
          <p className="text-xs text-[#64748B] mt-1">
            Dành cho Ban Giám Đốc và Trưởng Nhóm Bán Hàng tiếp nhận lịch hẹn lái thử
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#142A43] font-bold mb-1">Email đại lý</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 sm:py-2.5 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-base sm:text-xs text-[#142A43] outline-none focus:border-[#F47721] focus:bg-white focus:ring-1 focus:ring-[#F47721] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#142A43] font-bold mb-1">Mật khẩu</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 sm:py-2.5 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-base sm:text-xs text-[#142A43] outline-none focus:border-[#F47721] focus:bg-white focus:ring-1 focus:ring-[#F47721] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-[#F47721] hover:bg-[#E76513] text-white font-bold transition-all shadow-md cursor-pointer min-h-[44px]"
          >
            {isLoading ? 'Đang xác thực...' : 'Đăng Nhập Hệ Thống'}
          </button>
        </form>

        {/* Quick Demo Access Box */}
        <div className="p-4 rounded-2xl bg-[#F8F9F5] border border-[#DCE3EC] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#142A43]">
            <ShieldCheck className="w-4 h-4 text-[#F47721]" />
            <span>Tài Khoản Demo Được Cấp An Toàn</span>
          </div>
          <div className="text-[11px] text-[#64748B] font-mono space-y-1">
            <div>Email: <strong className="text-[#142A43]">dealer@haxaco.vn</strong></div>
            <div>Mật khẩu: <strong className="text-[#142A43]">demo123</strong></div>
          </div>
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#F47721] text-xs font-bold border border-orange-200 transition-colors cursor-pointer shadow-2xs"
          >
            Đăng Nhập Nhanh 1 Chạm (Demo Mode)
          </button>
        </div>

        {onBackToBuyer && (
          <div className="text-center pt-2">
            <button
              onClick={onBackToBuyer}
              className="text-xs text-[#64748B] hover:text-[#142A43] underline cursor-pointer"
            >
              ← Quay lại trang Buyer Demo (Đặt lịch thử xe)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
