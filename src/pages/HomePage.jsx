import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/public/Hero';
import Highlights from '../components/public/Highlights';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Target,
  BarChart3,
  CalendarCheck,
  CheckCircle2,
  ArrowRight,
  Layers,
  FileText
} from 'lucide-react';
import { PixelCarOrange } from '../components/public/PixelIcons';

export default function HomePage({ onOpenContact }) {
  // Quick portal cards to navigate directly to dedicated pages
  const portalCards = [
    {
      to: '/solutions',
      badge: 'Phân tích cốt lõi',
      title: 'Thách thức & 6 Giải pháp',
      desc: 'Khắc phục chi phí marketing tăng vọt, tỷ lệ hủy lịch lái thử cao và lãng phí thời gian telesale truyền thống.',
      icon: Target,
      color: 'border-amber-200 hover:border-[#F47721]',
      iconBg: 'bg-amber-100 text-amber-700'
    },
    {
      to: '/workflow',
      badge: 'Đường đua tác nghiệp',
      title: 'Quy trình 5 bước Lean',
      desc: 'Từ chạm đa kênh, thẩm định BANT, điều phối lịch hẹn đến showroom và chốt đơn theo chuẩn I-T-O.',
      icon: Zap,
      color: 'border-blue-200 hover:border-blue-500',
      iconBg: 'bg-blue-100 text-blue-700'
    },
    {
      to: '/pricing',
      badge: 'Mô hình CPA 300K',
      title: 'Bảng giá & Dự toán ROI',
      desc: 'Chỉ tính phí trên Lead đủ điều kiện, tích hợp bảng tính ROI tương tác chứng minh hiệu quả đầu tư.',
      icon: BarChart3,
      color: 'border-emerald-200 hover:border-emerald-500',
      iconBg: 'bg-emerald-100 text-emerald-700'
    },
    {
      to: '/roadmap',
      badge: 'Kế hoạch triển khai',
      title: 'Lộ trình 30 ngày Go-Live',
      desc: '4 giai đoạn tinh gọn: Kết nối kỹ thuật, nạp kịch bản AI, chạy thử nghiệm và chuyển giao cho đại lý.',
      icon: CalendarCheck,
      color: 'border-purple-200 hover:border-purple-500',
      iconBg: 'bg-purple-100 text-purple-700'
    },
    {
      to: '/faq',
      badge: 'Cam kết chất lượng',
      title: 'Cam kết TQM & FAQ',
      desc: '7 tiêu chí chất lượng nghiêm ngặt, cam kết hoàn tiền 100% nếu không đạt KPI trong 14 ngày.',
      icon: CheckCircle2,
      color: 'border-indigo-200 hover:border-indigo-500',
      iconBg: 'bg-indigo-100 text-indigo-700'
    },
    {
      to: '/contact',
      badge: 'Khảo sát Showroom',
      title: 'Đăng ký tư vấn B2B',
      desc: 'Kết nối trực tiếp chuyên gia tư vấn giải pháp và nhận bản phân tích ROI chuyên biệt cho showroom.',
      icon: FileText,
      color: 'border-rose-200 hover:border-rose-500',
      iconBg: 'bg-rose-100 text-rose-700'
    }
  ];

  return (
    <div className="flex-1 flex flex-col">
      {/* 1. Hero Section */}
      <Hero
        onOpenContact={onOpenContact}
      />

      {/* 2. Interactive Page Navigation Directory (Điều hướng trang phân hệ) */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#DCE3EC]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8F9F5] border border-[#DCE3EC] text-xs font-bold text-[#142A43] font-mono">
              <Layers className="w-3.5 h-3.5 text-[#F47721]" />
              <span>ĐIỀU HƯỚNG CÁC PHÂN HỆ NỀN TẢNG</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#142A43] tracking-tight">
              Khám phá chi tiết từng chuyên mục
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Chọn chuyên mục bên dưới để chuyển trực tiếp đến trang nội dung chuyên sâu tương ứng.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {portalCards.map((card) => {
              const IconComp = card.icon;
              return (
                <Link
                  key={card.to}
                  to={card.to}
                  className={`group relative p-6 rounded-2xl bg-[#F8F9F5] border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between text-left ${card.color}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] font-mono">
                        {card.badge}
                      </span>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-[#142A43] group-hover:text-[#F47721] transition-colors flex items-center gap-1.5">
                      <span>{card.title}</span>
                    </h3>

                    <p className="text-xs text-[#64748B] leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-[#DCE3EC]/60 flex items-center justify-between text-xs font-bold text-[#F47721]">
                    <span>Xem trang chi tiết</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Special Experience Navigation Banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#142A43] to-[#07182D] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-bold text-[#F47721]">
                <PixelCarOrange size={18} />
                <span>TRẢI NGHIỆM THỰC NGHIỆM</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Trải nghiệm 2 luồng nghiệp vụ tương tác thực tế
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Bạn có thể trực tiếp đặt lịch lái thử ở vai trò khách hàng mua xe hoặc đăng nhập hệ thống CRM để quản lý và thẩm định lịch hẹn.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <Link
                to="/demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-[#F47721] hover:bg-[#E76513] shadow-md transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Cổng Khách Mua Xe (Demo)</span>
              </Link>
              <Link
                to="/crm"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-white/15 hover:bg-white/25 border border-white/20 transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-[#75A94C]" />
                <span>Cổng CRM Đại Lý</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Operational Highlights */}
      <Highlights />

      {/* 4. One-Page Continuous View Shortcut */}
      <section className="py-8 bg-[#F8F9F5] border-t border-[#DCE3EC] text-center">
        <p className="text-xs text-[#64748B] mb-2">
          Bạn muốn xem toàn bộ các nội dung của dự án một cách liền mạch trên một trang duy nhất?
        </p>
        <Link
          to="/all"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#142A43] hover:text-[#F47721] underline decoration-[#F47721] underline-offset-4"
        >
          <span>Chuyển sang chế độ xem toàn bộ (All-in-one View) →</span>
        </Link>
      </section>
    </div>
  );
}
