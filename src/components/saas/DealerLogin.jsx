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
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full rounded-3xl bg-[#141B26] border border-slate-800 p-8 shadow-2xl space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#1E2634] border border-[#C7A66A]/40 flex items-center justify-center mx-auto mb-3 text-[#C7A66A]">
            <Building2 className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#C7A66A] block">
            Cổng Quản Trị Tác Nghiệp
          </span>
          <h2 className="text-2xl font-black text-white mt-1">Đăng Nhập CRM Showroom</h2>
          <p className="text-xs text-slate-400 mt-1">
            Dành cho Ban Giám Đốc và Trưởng Nhóm Bán Hàng tiếp nhận lịch hẹn lái thử
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-bold mb-1">Email đại lý</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#0d121c] border border-slate-700 text-white outline-none focus:border-[#C7A66A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">Mật khẩu</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#0d121c] border border-slate-700 text-white outline-none focus:border-[#C7A66A]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-[#C7A66A] hover:bg-[#D4AF37] text-[#101B2B] font-bold transition-all shadow-md cursor-pointer"
          >
            {isLoading ? 'Đang xác thực...' : 'Đăng Nhập Hệ Thống'}
          </button>
        </form>

        {/* Quick Demo Access Box */}
        <div className="p-4 rounded-2xl bg-[#0d121c] border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <ShieldCheck className="w-4 h-4 text-[#C7A66A]" />
            <span>Tài Khoản Demo Được Cấp An Toàn</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono space-y-1">
            <div>Email: <strong className="text-slate-200">dealer@haxaco.vn</strong></div>
            <div>Mật khẩu: <strong className="text-slate-200">demo123</strong></div>
          </div>
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 rounded-xl bg-[#1E2634] hover:bg-[#283244] text-[#C7A66A] text-xs font-bold border border-[#C7A66A]/40 transition-colors cursor-pointer"
          >
            Đăng Nhập Nhanh 1 Chạm (Demo Mode)
          </button>
        </div>

        {onBackToBuyer && (
          <div className="text-center pt-2">
            <button
              onClick={onBackToBuyer}
              className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
            >
              ← Quay lại trang Buyer Demo (Đặt lịch thử xe)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
