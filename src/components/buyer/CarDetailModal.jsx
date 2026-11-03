import React, { useState, useEffect } from 'react';
import {
  X,
  Car,
  DollarSign,
  Tag,
  CreditCard,
  Gift,
  Zap,
  Gauge,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Info,
  ChevronRight,
  MapPin,
  Clock,
  Layers,
  Award,
  Fuel
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { getCarDetails } from '../../data/carDetailsData.js';
import { buttonMotion, EASINGS } from '../../utils/motion';

export default function CarDetailModal({ car, isOpen, onClose, onSelectAndProceed }) {
  // CRITICAL: All React Hooks MUST be called unconditionally at the very top of the component!
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState('pricing'); // 'pricing' | 'promotions' | 'specs' | 'features' | 'showroom'
  const [selectedCity, setSelectedCity] = useState('tphcm'); // 'tphcm' | 'hanoi' | 'provinces'

  // Reset tab to pricing whenever a new car modal is opened
  useEffect(() => {
    if (isOpen) {
      setActiveTab('pricing');
      setSelectedCity('tphcm');
    }
  }, [isOpen, car?.id]);

  // If modal is closed or no car is passed, return null safely AFTER all hooks are declared
  if (!isOpen || !car) return null;

  const details = getCarDetails(car);

  const handleSelectCar = () => {
    if (onSelectAndProceed) {
      onSelectAndProceed(car);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.25, ease: EASINGS.gentleOut }}
        className="relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-[#DCE3EC] overflow-hidden my-4 sm:my-8 text-[#142A43] max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#07182D] text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F47721] flex items-center justify-center text-white shadow-xs shrink-0">
              <Car className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-black text-sm sm:text-base truncate">{details?.name || car.name}</span>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold text-white border border-white/30 shrink-0">
                  {details?.segment || car.segment || 'Luxury Car'}
                </span>
                {details?.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-[#F47721] text-[10px] font-black text-white uppercase tracking-wider shrink-0 shadow-xs">
                    {details.badge}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-300 truncate mt-0.5">{details?.subtitle || 'Thông số chi tiết và bảng giá lăn bánh chính thức'}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1 text-left bg-[#F8F9F5]">
          {/* Top Banner: Car Image & Key Metrics Showcase */}
          <div className="bg-white rounded-2xl border border-[#DCE3EC] overflow-hidden shadow-xs grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-5 relative h-52 sm:h-60 md:h-full min-h-[220px] bg-slate-900 overflow-hidden">
              <img
                src={details?.image || car.image}
                alt={details?.name || car.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <span className="px-2.5 py-1 rounded-lg bg-[#07182D]/85 backdrop-blur-md text-[11px] font-bold text-white border border-white/20">
                  {details?.segment || car.segment || 'Luxury Car'}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-600 text-[10px] font-bold text-white shadow-xs">
                  ● Sẵn sàng lái thử
                </span>
              </div>
            </div>

            <div className="md:col-span-7 p-4 sm:p-6 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F47721] font-mono">
                  Bảng Giá & Chi Phí Chính Thức
                </span>
                <h3 className="text-lg sm:text-xl font-black text-[#142A43] mt-0.5">
                  {details?.name || car.name}
                </h3>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-[#F47721]">
                    {details?.price || car.price}
                  </span>
                  <span className="text-xs text-[#64748B] font-medium">(Giá niêm yết)</span>
                </div>
              </div>

              {/* 3 Quick Highlight Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-[#E2E8F0] text-xs">
                <div className="p-2.5 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC]">
                  <span className="text-[10px] text-[#64748B] block font-medium">Lăn bánh TP.HCM:</span>
                  <span className="font-bold text-[#142A43] font-mono text-xs">{details?.onTheRoad?.tphcm || details?.price || car.price}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC]">
                  <span className="text-[10px] text-[#64748B] block font-medium">Trả trước từ (20%):</span>
                  <span className="font-bold text-emerald-700 font-mono text-xs">{details?.installment?.minPrepay || 'Từ 20%'}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC]">
                  <span className="text-[10px] text-[#64748B] block font-medium">Trả góp mỗi tháng:</span>
                  <span className="font-bold text-[#F47721] font-mono text-xs">{details?.installment?.monthlyPayment || 'Ưu đãi lãi suất'}</span>
                </div>
              </div>

              {/* Direct CTA inside Hero */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <motion.button
                  type="button"
                  onClick={handleSelectCar}
                  whileHover={shouldReduceMotion ? {} : buttonMotion.whileHover}
                  whileTap={shouldReduceMotion ? {} : buttonMotion.whileTap}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#F47721] hover:bg-[#E76513] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs min-h-[44px]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Chọn Xe Này & Đặt Lịch Lái Thử Ngay →</span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-[#DCE3EC] overflow-x-auto text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('pricing')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg cursor-pointer transition-all whitespace-nowrap min-h-[40px] ${
                activeTab === 'pricing'
                  ? 'bg-[#F47721] text-white font-bold shadow-xs'
                  : 'text-[#64748B] hover:text-[#142A43] hover:bg-slate-100'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>1. Giá & Chi Phí Lăn Bánh</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('promotions')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg cursor-pointer transition-all whitespace-nowrap min-h-[40px] ${
                activeTab === 'promotions'
                  ? 'bg-[#F47721] text-white font-bold shadow-xs'
                  : 'text-[#64748B] hover:text-[#142A43] hover:bg-slate-100'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>2. Khuyến Mãi & Ưu Đãi</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('specs')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg cursor-pointer transition-all whitespace-nowrap min-h-[40px] ${
                activeTab === 'specs'
                  ? 'bg-[#F47721] text-white font-bold shadow-xs'
                  : 'text-[#64748B] hover:text-[#142A43] hover:bg-slate-100'
              }`}
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>3. Thông Số Kỹ Thuật</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('features')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg cursor-pointer transition-all whitespace-nowrap min-h-[40px] ${
                activeTab === 'features'
                  ? 'bg-[#F47721] text-white font-bold shadow-xs'
                  : 'text-[#64748B] hover:text-[#142A43] hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>4. Tiện Nghi & An Toàn</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('showroom')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg cursor-pointer transition-all whitespace-nowrap min-h-[40px] ${
                activeTab === 'showroom'
                  ? 'bg-[#F47721] text-white font-bold shadow-xs'
                  : 'text-[#64748B] hover:text-[#142A43] hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>5. Xe Lái Thử Tại Showroom</span>
            </button>
          </div>

          {/* TAB 1: PRICING & ON-THE-ROAD BREAKDOWN */}
          {activeTab === 'pricing' && (
            <div className="space-y-4">
              {/* Region Selector */}
              <div className="p-4 rounded-2xl bg-white border border-[#DCE3EC] shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0] mb-4">
                  <div>
                    <h4 className="font-bold text-sm text-[#142A43] flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-[#F47721]" />
                      Dự Toán Chi Phí Lăn Bánh Theo Tỉnh / Thành Phố
                    </h4>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Chi phí trọn gói bao gồm tất cả các khoản thuế, phí trước bạ và thủ tục ra biển số
                    </p>
                  </div>

                  <div className="flex items-center gap-1 p-1 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] shrink-0">
                    <button
                      type="button"
                      onClick={() => setSelectedCity('tphcm')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedCity === 'tphcm'
                          ? 'bg-[#F47721] text-white shadow-2xs'
                          : 'text-[#64748B] hover:text-[#142A43]'
                      }`}
                    >
                      TP. Hồ Chí Minh
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedCity('hanoi')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedCity === 'hanoi'
                          ? 'bg-[#F47721] text-white shadow-2xs'
                          : 'text-[#64748B] hover:text-[#142A43]'
                      }`}
                    >
                      Hà Nội (12%)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedCity('provinces')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedCity === 'provinces'
                          ? 'bg-[#F47721] text-white shadow-2xs'
                          : 'text-[#64748B] hover:text-[#142A43]'
                      }`}
                    >
                      Tỉnh Thành Khác
                    </button>
                  </div>
                </div>

                {/* Big Total Box */}
                <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                      Tổng Chi Phí Lăn Bánh Tạm Tính ({selectedCity === 'tphcm' ? 'TP.HCM' : selectedCity === 'hanoi' ? 'Hà Nội' : 'Tỉnh'}):
                    </span>
                    <span className="text-2xl sm:text-3xl font-black font-mono text-[#F47721] block mt-0.5">
                      {details?.onTheRoad?.[selectedCity] || details?.price || car.price}
                    </span>
                  </div>
                  <div className="text-xs text-[#64748B] sm:text-right">
                    <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                      Đã bao gồm VAT & Ưu Đãi Showroom
                    </span>
                    <p className="text-[11px] text-[#94A3B8] mt-1">Hỗ trợ giao xe tận nhà theo yêu cầu</p>
                  </div>
                </div>

                {/* Detailed Fees Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#F8F9F5] text-[#64748B] uppercase text-[10px] font-bold border-b border-[#DCE3EC]">
                      <tr>
                        <th className="py-2.5 px-3">Khoản mục chi phí</th>
                        <th className="py-2.5 px-3 text-right">Số tiền dự kiến</th>
                        <th className="py-2.5 px-3">Ghi chú & Chính sách ưu đãi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      {(details?.fees || []).map((fee, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-semibold text-[#142A43]">{fee.name}</td>
                          <td className="py-2.5 px-3 font-mono font-bold text-right text-[#F47721] whitespace-nowrap">
                            {fee.amount}
                          </td>
                          <td className="py-2.5 px-3 text-[#64748B] text-[11px]">{fee.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Installment Financing Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DCE3EC] shadow-xs">
                <h4 className="font-bold text-sm text-[#142A43] flex items-center gap-2 mb-3">
                  <CreditCard className="w-4 h-4 text-[#F47721]" />
                  Gói Hỗ Trợ Tài Chính & Trả Góp Ngân Hàng
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-3">
                  <div className="p-3 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC]">
                    <span className="text-[11px] text-[#64748B] block">Số tiền trả trước tối thiểu:</span>
                    <span className="font-bold text-emerald-700 text-sm font-mono mt-0.5 block">
                      {details?.installment?.minPrepay || 'Từ 20% giá trị xe'}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC]">
                    <span className="text-[11px] text-[#64748B] block">Dự tính trả góp hàng tháng:</span>
                    <span className="font-bold text-[#F47721] text-sm font-mono mt-0.5 block">
                      {details?.installment?.monthlyPayment || 'Linh hoạt theo kỳ hạn'}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC]">
                    <span className="text-[11px] text-[#64748B] block">Thời gian vay tối đa:</span>
                    <span className="font-bold text-[#142A43] text-sm mt-0.5 block">
                      {details?.installment?.tenor || 'Lên đến 8 năm (96 tháng)'}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Chính sách đối tác tài chính:</strong> {details?.installment?.bankRate || 'Hỗ trợ thủ tục duyệt hồ sơ trong ngày, liên kết cùng hệ thống ngân hàng lớn.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROMOTIONS */}
          {activeTab === 'promotions' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-[#DCE3EC] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                  <div>
                    <h4 className="font-bold text-sm text-[#142A43] flex items-center gap-2">
                      <Gift className="w-4 h-4 text-[#F47721]" />
                      Chương Trình Khuyến Mãi Trong Tháng Dành Riêng Cho Khách Hàng
                    </h4>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Áp dụng cho tất cả khách hàng đăng ký lái thử và đặt cọc qua cổng AutoLead Systems
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 font-bold text-xs shrink-0 animate-pulse">
                    🔥 Đang áp dụng
                  </span>
                </div>

                <div className="space-y-3">
                  {(details?.promotions || []).map((promo, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] flex items-start gap-3 text-xs text-[#142A43]"
                    >
                      <span className="w-5 h-5 rounded-md bg-[#F47721] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <span className="font-semibold text-sm leading-snug block">{promo}</span>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>Quà tặng độc quyền:</strong> Khách hàng hoàn tất buổi lái thử nhận ngay bộ quà lưu niệm chính hãng và voucher dịch vụ trị giá 5.000.000 VNĐ.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SPECIFICATIONS */}
          {activeTab === 'specs' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-[#DCE3EC] shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-4">
                  <h4 className="font-bold text-sm text-[#142A43] flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-[#F47721]" />
                    Thông Số Kỹ Thuật Động Cơ & Vận Hành
                  </h4>
                  <span className="text-xs font-mono text-[#64748B]">Bản tiêu chuẩn Việt Nam</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {(details?.specs || []).map((spec, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] flex flex-col justify-between"
                    >
                      <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                        {spec.label}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-[#142A43] mt-1 block">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FEATURES & SAFETY */}
          {activeTab === 'features' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-[#DCE3EC] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                  <h4 className="font-bold text-sm text-[#142A43] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#F47721]" />
                    Trang Bị Tiện Nghi & Công Nghệ An Toàn Chủ Động
                  </h4>
                  <span className="text-xs font-mono text-emerald-700 font-bold">Chuẩn an toàn 5 sao</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(details?.features || []).map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] flex items-start gap-2.5 text-xs text-[#142A43]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#159B68] shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SHOWROOM & TEST DRIVE PREPARATION */}
          {activeTab === 'showroom' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-[#DCE3EC] shadow-xs space-y-4">
                <div className="pb-3 border-b border-[#E2E8F0]">
                  <h4 className="font-bold text-sm text-[#142A43] flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#F47721]" />
                    Thông Tin Địa Điểm Trưng Bày & Đội Xe Lái Thử Thực Tế
                  </h4>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Hệ thống đại lý ủy quyền và showroom liên kết chính hãng trong mạng lưới AutoLead Systems
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] space-y-2">
                    <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                      Showroom Tiếp Nhận Trực Tiếp:
                    </span>
                    <span className="text-sm font-bold text-[#142A43] block">
                      {details?.testDriveInfo?.showroom || 'Hệ thống showroom chính hãng liên kết'}
                    </span>
                    <p className="text-xs text-[#64748B]">
                      Hỗ trợ đón tiếp chu đáo, phục vụ cà phê cao cấp và hướng dẫn lộ trình lái thử chuyên nghiệp.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] space-y-2">
                    <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                      Màu Sắc Sẵn Xe Trải Nghiệm:
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(details?.testDriveInfo?.colorsAvailable || ['Trắng', 'Đen', 'Xám']).map((col, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-white border border-[#DCE3EC] text-xs font-semibold text-[#142A43]"
                        >
                          {col}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Cam kết chuẩn bị xe:</span>
                    <p className="text-[11px] mt-0.5 leading-relaxed">{details?.testDriveInfo?.status || 'Xe sẵn sàng - Nhiên liệu đầy đủ, đón tiếp chuyên nghiệp.'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Actions */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#DCE3EC] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          <div className="hidden sm:block">
            <span className="text-xs text-[#64748B] block">Đang xem thông tin mẫu xe:</span>
            <span className="text-sm font-extrabold text-[#142A43]">{details?.name || car.name}</span>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={shouldReduceMotion ? {} : buttonMotion.whileHover}
              whileTap={shouldReduceMotion ? {} : buttonMotion.whileTap}
              className="px-4 py-2.5 min-h-[44px] rounded-xl bg-slate-100 hover:bg-slate-200 text-[#142A43] font-semibold text-xs transition-colors cursor-pointer text-center"
            >
              Đóng & Xem xe khác
            </motion.button>

            <motion.button
              type="button"
              onClick={handleSelectCar}
              whileHover={shouldReduceMotion ? {} : buttonMotion.whileHover}
              whileTap={shouldReduceMotion ? {} : buttonMotion.whileTap}
              className="px-6 py-2.5 min-h-[44px] rounded-xl bg-[#F47721] hover:bg-[#E76513] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer text-center"
            >
              <span>Chọn Mẫu Xe Này & Đặt Lịch Lái Thử →</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
