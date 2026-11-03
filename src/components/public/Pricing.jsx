import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle2, Sliders, ShieldCheck, ArrowRight, Zap, Info, Star, HelpCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PixelMoney, PixelWrench } from './PixelIcons';
import automotiveDetailBg from '../../assets/automotive-detail.jpg';
import { defaultViewport, cardHoverMotion, buttonMotion, EASINGS } from '../../utils/motion';
import { gsap } from '../../utils/scrollEngine';

export default function Pricing({ onOpenContact }) {
  const [selectedPlan, setSelectedPlan] = useState('standard'); // 'basic' | 'standard' | 'premium'
  const [leadCount, setLeadCount] = useState(50);
  const shouldReduceMotion = useReducedMotion();
  const pricingRef = useRef(null);
  const cardsContainerRef = useRef(null);

  // GSAP ScrollTrigger subtle entrance for pricing cards
  useEffect(() => {
    if (shouldReduceMotion || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      if (cardsContainerRef.current) {
        gsap.fromTo(
          cardsContainerRef.current.children,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            }
          }
        );
      }
    }, pricingRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  // Official Pricing Structure from Core Offer Document (Section 5)
  const setupFee = 5000000; // 5,000,000 VND / showroom
  const overageRatePerLead = 100000; // 100,000 VND / Qualified Lead vượt hạn mức

  const plans = {
    basic: {
      id: 'basic',
      name: 'Gói Basic',
      monthlyFee: 2000000,
      quota: 20,
      badge: 'Khởi đầu',
      isCore: false,
      desc: 'Dành cho showroom quy mô nhỏ bắt đầu ứng dụng AI sàng lọc khách hàng.',
      features: [
        '1 Website showroom ô tô tích hợp',
        'Tiếp nhận & chăm sóc AI 24/7',
        'Sàng lọc Qualified Lead theo tiêu chuẩn',
        'Hỗ trợ khách gửi yêu cầu đặt lịch lái thử',
        'Hệ thống CRM & báo cáo cơ bản',
        'Hạn mức 20 Qualified Leads / tháng',
        'Phí vượt hạn mức: 100.000đ / lead hợp lệ'
      ]
    },
    standard: {
      id: 'standard',
      name: 'Gói Standard (Offer Chủ Lực)',
      monthlyFee: 4000000,
      quota: 50,
      badge: '★ OFFER CHỦ LỰC',
      isCore: true,
      desc: 'Gói giải pháp được thiết kế tối ưu nhất cho đại lý xe sang và showroom độc lập.',
      features: [
        '1 Website showroom ô tô tích hợp',
        'Tiếp nhận & đối thoại AI chuyên sâu 24/7',
        'Sàng lọc Qualified Lead theo tiêu chí riêng của showroom',
        'Hỗ trợ đặt lịch (Appointment Requested & Confirmed)',
        'CRM chuyên nghiệp, theo dõi chi tiết & phân luồng Sales',
        'Báo cáo hiệu quả & đối soát minh bạch',
        'Hạn mức 50 Qualified Leads / tháng',
        'Phí vượt hạn mức: 100.000đ / lead sau đối soát'
      ]
    },
    premium: {
      id: 'premium',
      name: 'Gói Premium',
      monthlyFee: 7000000,
      quota: 100,
      badge: 'Mở rộng',
      isCore: false,
      desc: 'Dành cho showroom có lưu lượng truy cập cao và nhu cầu xử lý khối lượng lớn lead.',
      features: [
        '1 Website showroom ô tô tích hợp',
        'Tiếp nhận, chăm sóc & bám đuổi thông minh',
        'Sàng lọc chuyên sâu theo tiêu chí riêng của showroom',
        'Ưu tiên xử lý & phân bổ Qualified Lead nóng',
        'CRM cao cấp, báo cáo chuyển đổi chi tiết',
        'Hỗ trợ cấu hình kỹ thuật nâng cao',
        'Hạn mức 100 Qualified Leads / tháng',
        'Phí vượt hạn mức: 100.000đ / lead sau đối soát'
      ]
    }
  };

  const activePlanData = plans[selectedPlan] || plans.standard;
  const overageLeads = Math.max(0, leadCount - activePlanData.quota);
  const overageFee = overageLeads * overageRatePerLead;
  const currentMonthlyTotal = activePlanData.monthlyFee + overageFee;
  const totalMonth1WithSetup = setupFee + currentMonthlyTotal;

  const formatVND = (amount) =>
    new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';

  // Section 6.1: Official 6 Qualified Lead Criteria
  const qualifiedLeadStandards = [
    'Khách hàng cung cấp thông tin liên hệ có định dạng hợp lệ (SĐT/Zalo) và đồng ý để showroom liên hệ.',
    'Có nhu cầu tìm hiểu hoặc mua xe được thể hiện rõ ràng trong phiên trò chuyện cùng AI.',
    'Xác định được mẫu xe hoặc phân khúc xe đang quan tâm tại showroom.',
    'Phù hợp tiêu chí khách hàng mục tiêu mà showroom đã thỏa thuận ban đầu.',
    'Có thông tin về thời điểm dự kiến mua xe hoặc mức độ sẵn sàng tiếp tục nhận tư vấn.',
    'Không trùng lặp với lead đã ghi nhận trong kỳ đối soát (chống trùng lặp tuyệt đối).'
  ];

  return (
    <section id="pricing" ref={pricingRef} className="scroll-mt-24 sm:scroll-mt-28 py-16 sm:py-20 md:py-24 bg-white relative border-b border-[#DCE3EC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.5, ease: EASINGS.gentleOut }}
          className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8F9F5] border border-[#DCE3EC] text-xs font-bold text-[#F47721] font-mono shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>CHÍNH SÁCH GIÁ B2B CHÍNH THỨC</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#142A43] tracking-tight">
            Mô Hình Chi Phí Rõ Ràng & Dễ Dự Toán
          </h2>
          <p className="text-xs sm:text-base text-[#64748B] leading-relaxed max-w-2xl mx-auto">
            Kết hợp giữa <strong>Phí thiết lập ban đầu (5.000.000đ/showroom)</strong> và <strong>Gói thuê bao hàng tháng (Standard chủ lực 4.000.000đ/50 Qualified Leads)</strong>. Vượt hạn mức chỉ <strong>100.000đ / lead</strong> sau khi đối soát hợp lệ.
          </p>
        </motion.div>

        {/* 1. Setup Fee Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.5, ease: EASINGS.gentleOut }}
          className="max-w-5xl mx-auto mb-10 p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#F8F9F5] border border-[#DCE3EC] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left"
        >
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-200/80 text-[#142A43] text-[11px] font-mono font-bold">
              <PixelWrench size={16} />
              <span>GIAI ĐOẠN 01 • THIẾT LẬP BAN ĐẦU (30 NGÀY BÀN GIAO)</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#142A43]">
              Phí thiết lập & cấu hình ban đầu: <span className="font-mono text-[#F47721] font-black">5.000.000 VNĐ</span> / showroom
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Thu một lần theo thỏa thuận: Khảo sát quy trình, cấu hình AI nhúng website, thiết lập câu hỏi nhu cầu & tiêu chí Qualified Lead, cấu hình CRM phân luồng lịch hẹn và hướng dẫn nhân sự bán hàng trong 30 ngày.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenContact}
            className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-[#142A43] text-xs font-bold border border-[#DCE3EC] shadow-xs transition-colors shrink-0 cursor-pointer min-h-[44px]"
          >
            Khảo sát tích hợp Showroom →
          </button>
        </motion.div>

        {/* 2. Monthly Subscription Plans Grid (3 Tiers, Standard is Core Offer) */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-6 max-w-6xl mx-auto mb-12">
          {/* Plan 1: Basic */}
          <motion.div
            whileHover={shouldReduceMotion ? {} : cardHoverMotion.whileHover}
            className={`p-6 rounded-2xl sm:rounded-3xl border flex flex-col justify-between text-left transition-all ${
              selectedPlan === 'basic'
                ? 'bg-white border-[#F47721] shadow-lg ring-2 ring-[#F47721]/30'
                : 'bg-[#F8F9F5] border-[#DCE3EC] shadow-2xs hover:shadow-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono font-bold text-[#64748B] uppercase tracking-wider">
                  Gói Khởi Đầu
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-200 text-[#64748B] text-[10px] font-bold">
                  Basic
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#142A43]">AutoLead Basic</h3>
              <p className="text-xs text-[#64748B] mt-1 min-h-[36px]">
                {plans.basic.desc}
              </p>

              <div className="my-5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-[#142A43] font-mono">
                    2.000.000
                  </span>
                  <span className="text-[#64748B] text-xs font-semibold">VNĐ/tháng</span>
                </div>
                <span className="text-[11px] text-[#F47721] font-bold block mt-1">
                  Đã gồm 20 Qualified Leads / tháng
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-[#142A43] pt-4 border-t border-[#DCE3EC]">
                {plans.basic.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#159B68] shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#DCE3EC]">
              <button
                type="button"
                onClick={() => {
                  setSelectedPlan('basic');
                  setLeadCount(20);
                }}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                  selectedPlan === 'basic'
                    ? 'bg-[#142A43] text-white'
                    : 'bg-white hover:bg-slate-100 text-[#142A43] border border-[#DCE3EC]'
                }`}
              >
                {selectedPlan === 'basic' ? '● Đang chọn mô phỏng' : 'Chọn gói Basic'}
              </button>
            </div>
          </motion.div>

          {/* Plan 2: Standard (OFFER CHỦ LỰC - Highlighted) */}
          <motion.div
            whileHover={shouldReduceMotion ? {} : cardHoverMotion.whileHover}
            className={`p-6 sm:p-7 rounded-2xl sm:rounded-3xl border-2 flex flex-col justify-between text-left relative transition-all ${
              selectedPlan === 'standard'
                ? 'bg-white border-[#F47721] shadow-xl ring-4 ring-[#F47721]/20'
                : 'bg-white border-[#F47721]/60 shadow-md'
            }`}
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#F47721] to-[#E76513] text-white font-mono font-bold text-[10.5px] uppercase tracking-wider shadow-md">
              ★ OFFER CHỦ LỰC
            </div>

            <div>
              <div className="flex items-center justify-between mb-3 mt-1">
                <span className="text-[11px] font-mono font-bold text-[#F47721] uppercase tracking-wider">
                  Trọng tâm triển khai
                </span>
                <span className="px-2 py-0.5 rounded bg-orange-100 text-[#F47721] text-[10px] font-bold border border-orange-200">
                  Standard
                </span>
              </div>
              <h3 className="text-xl font-black text-[#142A43]">AutoLead Standard</h3>
              <p className="text-xs text-[#64748B] mt-1 min-h-[36px]">
                {plans.standard.desc}
              </p>

              <div className="my-5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-[#F47721] font-mono">
                    4.000.000
                  </span>
                  <span className="text-[#64748B] text-xs font-semibold">VNĐ/tháng</span>
                </div>
                <span className="text-[11px] text-emerald-700 font-bold block mt-1">
                  Đã gồm 50 Qualified Leads / tháng (Tiết kiệm nhất)
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-[#142A43] pt-4 border-t border-[#DCE3EC]">
                {plans.standard.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#F47721] shrink-0 mt-0.5" />
                    <span className={i === 2 || i === 6 ? 'font-bold text-[#142A43]' : ''}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#DCE3EC]">
              <button
                type="button"
                onClick={() => {
                  setSelectedPlan('standard');
                  setLeadCount(50);
                }}
                className={`w-full py-3 rounded-xl font-bold text-xs transition-colors cursor-pointer shadow-sm ${
                  selectedPlan === 'standard'
                    ? 'bg-[#F47721] text-white hover:bg-[#E76513]'
                    : 'bg-orange-50 hover:bg-orange-100 text-[#F47721] border border-orange-200'
                }`}
              >
                {selectedPlan === 'standard' ? '● Đang chọn gói chủ lực' : 'Chọn gói Standard chủ lực'}
              </button>
            </div>
          </motion.div>

          {/* Plan 3: Premium */}
          <motion.div
            whileHover={shouldReduceMotion ? {} : cardHoverMotion.whileHover}
            className={`p-6 rounded-2xl sm:rounded-3xl border flex flex-col justify-between text-left transition-all ${
              selectedPlan === 'premium'
                ? 'bg-white border-[#F47721] shadow-lg ring-2 ring-[#F47721]/30'
                : 'bg-[#F8F9F5] border-[#DCE3EC] shadow-2xs hover:shadow-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono font-bold text-[#64748B] uppercase tracking-wider">
                  Lưu lượng lớn
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-200 text-[#64748B] text-[10px] font-bold">
                  Premium
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#142A43]">AutoLead Premium</h3>
              <p className="text-xs text-[#64748B] mt-1 min-h-[36px]">
                {plans.premium.desc}
              </p>

              <div className="my-5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-[#142A43] font-mono">
                    7.000.000
                  </span>
                  <span className="text-[#64748B] text-xs font-semibold">VNĐ/tháng</span>
                </div>
                <span className="text-[11px] text-[#F47721] font-bold block mt-1">
                  Đã gồm 100 Qualified Leads / tháng
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-[#142A43] pt-4 border-t border-[#DCE3EC]">
                {plans.premium.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#159B68] shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#DCE3EC]">
              <button
                type="button"
                onClick={() => {
                  setSelectedPlan('premium');
                  setLeadCount(100);
                }}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                  selectedPlan === 'premium'
                    ? 'bg-[#142A43] text-white'
                    : 'bg-white hover:bg-slate-100 text-[#142A43] border border-[#DCE3EC]'
                }`}
              >
                {selectedPlan === 'premium' ? '● Đang chọn mô phỏng' : 'Chọn gói Premium'}
              </button>
            </div>
          </motion.div>
        </div>

        {/* 3. Interactive Calculator Box (Minh họa chi phí mục 5.4) */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.55, ease: EASINGS.gentleOut }}
          className="max-w-4xl mx-auto rounded-2xl sm:rounded-3xl bg-[#07182D] text-white p-5 sm:p-8 border border-white/20 shadow-2xl mb-12 text-left"
        >
          <div className="flex items-center gap-2 text-[#FFE875] font-mono text-xs font-bold uppercase mb-4">
            <Sliders className="w-4 h-4 shrink-0" />
            <span>Mục 5.4 • Công Cụ Minh Họa Chi Phí & Phí Phát Sinh Vượt Hạn Mức</span>
          </div>

          <h3 className="text-lg sm:text-2xl font-bold mb-2 leading-snug">
            Mô phỏng chi phí theo số lượng Qualified Lead thực tế
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Đang tính theo <strong>{activePlanData.name}</strong> (hạn mức gói: <strong>{activePlanData.quota} Qualified Leads</strong>). Kéo thanh trượt để đối soát ngân sách hàng tháng:
          </p>

          <div className="space-y-6">
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 mb-2">
                <span className="text-xs text-slate-300 font-medium">Số Qualified Lead thực tế trong tháng:</span>
                <span className="text-base sm:text-lg font-mono font-bold text-[#FFE875]">
                  {leadCount} lead / tháng {overageLeads > 0 && `(Vượt hạn mức +${overageLeads} lead)`}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="120"
                step="5"
                value={leadCount}
                onChange={(e) => setLeadCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#F47721]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>10 lead</span>
                <span>30 lead</span>
                <span>50 lead (Hạn mức Standard)</span>
                <span>80 lead</span>
                <span>120 lead</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[11px] text-slate-400 block mb-1">
                  Thuê bao cơ bản ({activePlanData.quota} lead):
                </span>
                <span className="text-lg font-bold font-mono text-white">
                  {formatVND(activePlanData.monthlyFee)}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[11px] text-slate-400 block mb-1">
                  Phí phát sinh ({overageLeads} lead × 100k):
                </span>
                <span className="text-lg font-bold font-mono text-[#F47721]">
                  {formatVND(overageFee)}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-[#F47721]/20 border border-[#F47721]/50">
                <span className="text-[11px] text-[#FFE875] block mb-1 font-bold">
                  Tổng phí thuê bao tháng:
                </span>
                <span className="text-xl font-black font-mono text-[#FFE875]">
                  {formatVND(currentMonthlyTotal)}
                </span>
              </div>
            </div>

            {/* Official Table 5.4 Reference */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-200">
                <Info className="w-3.5 h-3.5 text-[#FFE875]" />
                <span>Bảng minh họa chi phí gói Standard chủ lực (Mục 5.4 Lời chào hàng):</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] font-mono text-slate-300 text-center">
                <div className="p-2 rounded bg-black/30">30 lead: <strong>4.000.000đ</strong></div>
                <div className="p-2 rounded bg-black/30 border border-[#F47721]/40">50 lead: <strong>4.000.000đ</strong></div>
                <div className="p-2 rounded bg-black/30">60 lead (+10): <strong>5.000.000đ</strong></div>
                <div className="p-2 rounded bg-black/30">70 lead (+20): <strong>6.000.000đ</strong></div>
                <div className="p-2 rounded bg-black/30">80 lead (+30): <strong>7.000.000đ</strong></div>
              </div>
            </div>

            <div className="text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
              <span className="italic">
                * Tháng đầu tiên cộng thêm phí setup 5.000.000 VNĐ ({formatVND(totalMonth1WithSetup)}). Không thu phí riêng trên cùng lead khi khách đặt lịch, đổi lịch hoặc đến showroom.
              </span>
              <button
                type="button"
                onClick={onOpenContact}
                className="text-xs font-bold text-[#FFE875] hover:underline cursor-pointer shrink-0"
              >
                Nhận báo giá chính thức →
              </button>
            </div>
          </div>
        </motion.div>

        {/* 4. Section 6: Tiêu chuẩn Qualified Lead & Quy trình Lịch hẹn */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.55, ease: EASINGS.gentleOut }}
          className="max-w-4xl mx-auto rounded-2xl sm:rounded-3xl bg-[#F8F9F5] border border-[#DCE3EC] p-5 sm:p-8 space-y-5 mb-12 text-left"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-[#75A94C] font-bold uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Mục 6 • Tiêu chuẩn khách hàng & Lịch hẹn đủ điều kiện</span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#142A43]">
              6 Tiêu chuẩn ghi nhận Qualified Lead vào hạn mức:
            </h3>
            <p className="text-xs text-[#64748B] mt-1">
              Một lead chỉ được tính vào hạn mức khi đáp ứng đồng thời 6 điều kiện đối soát minh bạch:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {qualifiedLeadStandards.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-[#142A43] bg-white p-3 rounded-xl border border-[#DCE3EC]">
                <span className="w-5 h-5 rounded-md bg-[#F8F9F5] border border-[#DCE3EC] flex items-center justify-center font-mono font-bold text-[10px] text-[#F47721] shrink-0 mt-0.5">
                  0{idx + 1}
                </span>
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>

          {/* Quy trình phân biệt rõ ràng 3 trạng thái */}
          <div className="p-4 rounded-2xl bg-white border border-[#DCE3EC] space-y-2.5">
            <h4 className="text-xs font-bold text-[#142A43] uppercase tracking-wider">
              Phân định rõ ràng giữa Lead và Lịch hẹn (Mục 6.2):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200">
                <span className="font-bold text-[#F47721] block">1. Qualified Lead</span>
                <span className="text-[11px] text-[#64748B] block mt-0.5">Căn cứ tính hạn mức gói thuê bao hàng tháng.</span>
              </div>
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200">
                <span className="font-bold text-[#1E40AF] block">2. Appointment Requested</span>
                <span className="text-[11px] text-[#64748B] block mt-0.5">Yêu cầu đặt lịch do khách tự gửi qua AI (chưa tính phí).</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <span className="font-bold text-emerald-800 block">3. Appointment Confirmed</span>
                <span className="text-[11px] text-[#64748B] block mt-0.5">Lịch showroom chủ động xác nhận sau khi kiểm tra.</span>
              </div>
            </div>
            <p className="text-[11px] text-[#64748B] italic pt-1">
              * Khách gửi yêu cầu hoặc đổi/hủy lịch không đồng nghĩa phát sinh phí riêng; AutoLead không thu thêm phí trên cùng lead khi khách ghé showroom.
            </p>
          </div>
        </motion.div>

        {/* 5. Section 5.6: Chi phí chưa bao gồm */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, ease: EASINGS.gentleOut }}
          className="rounded-3xl overflow-hidden border border-[#DCE3EC] bg-white shadow-sm max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 h-56 sm:h-64 lg:h-full relative overflow-hidden bg-slate-900">
              <img
                src={automotiveDetailBg}
                alt="Chi tiết xe sang hoàn thiện tại showroom"
                className="w-full h-full object-cover object-center select-none"
                loading="lazy"
              />
            </div>
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-3 text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F47721]/10 text-[#F47721] text-[11px] font-mono font-bold">
                <span>Mục 5.6 • Nguyên Tắc Minh Bạch</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-[#142A43]">
                Cam kết không thu thêm phí phần mềm ẩn
              </h4>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Phí thuê bao hàng tháng đã bao gồm toàn bộ quyền sử dụng các chức năng cốt lõi của AutoLead Systems (AI Widget nhúng website, module sàng lọc, CRM và báo cáo đối soát).
              </p>
              <div className="text-[11px] text-[#64748B] space-y-1 pt-1 border-t border-[#DCE3EC]">
                <p>• Chưa bao gồm: Ngân sách trả cho các nền tảng quảng cáo (Meta/Google/TikTok).</p>
                <p>• Chưa bao gồm: Cước SMS/Zalo hoặc viễn thông ngoài phạm vi thỏa thuận.</p>
                <p>• Chưa bao gồm: Nhân sự bán hàng của chính showroom.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
