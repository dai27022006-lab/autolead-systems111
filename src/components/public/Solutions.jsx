import React from 'react';
import { Layers, CheckCircle2, Info } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  PixelCarOrange,
  PixelClock,
  PixelShield,
  PixelCalendar,
  PixelShowroom,
  PixelChart
} from './PixelIcons';
import { defaultViewport, cardHoverMotion, EASINGS } from '../../utils/motion';

export default function Solutions() {
  const shouldReduceMotion = useReducedMotion();

  const solutions = [
    {
      icon: PixelCarOrange,
      num: '01',
      title: 'AI Advertising & Creative',
      titleVi: 'AI hỗ trợ quảng cáo & sáng tạo',
      desc: 'Tự động tạo nội dung, thông điệp và hình ảnh quảng cáo phù hợp với từng phân khúc xe sang hoặc xe đã qua sử dụng, tối ưu chi phí tiếp cận.',
      deliverables: [
        'Nội dung và hình ảnh quảng cáo AI',
        'Thử nghiệm phân tách A/B đa biến thể',
        'Tối ưu tệp khách hàng theo dòng xe'
      ],
      accent: 'border-t-4 border-t-[#F47721]'
    },
    {
      icon: PixelClock,
      num: '02',
      title: 'AI Lead Reception & Follow-up',
      titleVi: 'Tiếp nhận & chăm sóc khách hàng 24/7',
      desc: 'Tự động tiếp nhận lead đa kênh (Form, Zalo, Fanpage), phản hồi tức thì trong vòng 60 giây và bám đuổi thông minh theo kịch bản cá nhân hóa.',
      deliverables: [
        'Ghi nhận thông tin khách hàng tức thì',
        'Kịch bản trò chuyện cá nhân hóa',
        'Tự động nhắc hẹn và chăm sóc liên tục'
      ],
      accent: 'border-t-4 border-t-[#4A98E8]'
    },
    {
      icon: PixelShield,
      num: '03',
      title: 'AI Lead Qualification',
      titleVi: 'Sàng lọc khách hàng theo tiêu chuẩn',
      desc: 'AI đối thoại tự nhiên để làm rõ nhu cầu thực tế: mẫu xe quan tâm, thời gian dự kiến mua, khoảng ngân sách và sự sẵn sàng đến lái thử.',
      deliverables: [
        'Xác thực số điện thoại và danh tính',
        'Làm rõ dòng xe và khả năng tài chính',
        'Đánh giá mức độ sẵn sàng đến showroom'
      ],
      accent: 'border-t-4 border-t-[#75A94C]'
    },
    {
      icon: PixelCalendar,
      num: '04',
      title: 'Automated Test Drive Appointment',
      titleVi: 'Tự động đặt lịch hẹn lái thử',
      desc: 'Dẫn dắt khách hàng chọn khung ngày và giờ lái thử phù hợp, tự động gửi tin nhắn xác nhận kèm định vị và hướng dẫn đường đến showroom.',
      deliverables: [
        'Ghi nhận ngày/giờ hẹn cụ thể',
        'Tự động gửi thông tin xác nhận qua SMS/Zalo',
        'Nhắc lịch trước 2 tiếng và trước 24 tiếng'
      ],
      accent: 'border-t-4 border-t-[#F59E0B]'
    },
    {
      icon: PixelShowroom,
      num: '05',
      title: 'CRM & Lead Management',
      titleVi: 'Hệ thống CRM quản lý tập trung',
      desc: 'Quản lý toàn bộ thông tin khách hàng và lịch sử tương tác theo phễu 6 trạng thái minh bạch, giúp ban quản lý showroom dễ dàng kiểm soát.',
      deliverables: [
        'Giao diện pipeline trực quan theo phễu',
        'Lưu trữ toàn bộ lịch sử trao đổi',
        'Phân bổ lịch hẹn tự động cho chuyên viên Sales'
      ],
      accent: 'border-t-4 border-t-[#142A43]'
    },
    {
      icon: PixelChart,
      num: '06',
      title: 'Performance Tracking & Reporting',
      titleVi: 'Đo lường hiệu quả & báo cáo minh bạch',
      desc: 'Báo cáo chi tiết về số lượng lead, tỷ lệ sàng lọc đạt chuẩn, số cuộc hẹn lái thử thực tế và chi phí trên từng kết quả đủ điều kiện nghiệm thu.',
      deliverables: [
        'Báo cáo tỷ lệ chuyển đổi qua từng khâu',
        'Thống kê lịch hẹn đạt chuẩn nghiệm thu',
        'Đối soát chi phí minh bạch theo hợp đồng'
      ],
      accent: 'border-t-4 border-t-[#8B5CF6]'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.5,
        ease: EASINGS.gentleOut
      }
    }
  };

  return (
    <section id="solutions" className="scroll-mt-24 sm:scroll-mt-28 py-16 sm:py-20 md:py-24 bg-white relative border-b border-[#DCE3EC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.5, ease: EASINGS.gentleOut }}
          className="max-w-3xl mx-auto text-center space-y-3 mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8F9F5] border border-[#DCE3EC] text-xs font-bold text-[#F47721] font-mono shadow-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>GIẢI PHÁP & PHẠM VI DỊCH VỤ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#142A43] tracking-tight">
            Bộ Giải Pháp Toàn Diện Cho Đại Lý Ô Tô
          </h2>
          <p className="text-xs sm:text-base text-[#64748B] leading-relaxed max-w-2xl mx-auto">
            Hệ thống 6 mô-đun chức năng khép kín từ khâu thu hút trực tuyến đến khi khách hàng bước chân vào showroom trải nghiệm lái thử.
          </p>
        </motion.div>

        {/* Core Value Proposition Banner */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.5, ease: EASINGS.gentleOut }}
          className="mb-12 p-6 sm:p-7 rounded-2xl bg-[#F8F9F5] border-2 border-[#F47721]/40 max-w-4xl mx-auto shadow-md text-left space-y-4"
        >
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center shrink-0 text-[#F47721] shadow-2xs">
              <PixelShield size={28} />
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-[#F47721] uppercase tracking-wider font-mono">
                  GIẢI PHÁP ĐỘT PHÁ CHO ĐẠI LÝ Ô TÔ
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                  Không cần thay đổi Website & CRM hiện có
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-[#142A43] leading-snug">
                AutoLead cung cấp AI Widget nhúng vào website showroom, giúp tăng 300% tỷ lệ chuyển đổi khách lái thử mà không cần đổi website hiện có
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Thay vì bắt khách hàng truy cập website mới hay bắt showroom đầu tư xây dựng lại hạ tầng kỹ thuật, <strong>AutoLead AI Widget nhúng trực tiếp vào website showroom sẵn có</strong>. AI chủ động tư vấn, đối thoại làm rõ mẫu xe, ngân sách, thời gian dự kiến mua theo tiêu chuẩn 7 tiêu chí TQM, sàng lọc lead chất lượng cao và chuyển giao tức thì vào hệ thống CRM của đại lý.
              </p>
            </div>
          </div>

          {/* 4-Step Architecture Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2 border-t border-[#DCE3EC]">
            <div className="p-2.5 rounded-xl bg-white border border-[#DCE3EC] text-left">
              <span className="text-[10px] font-mono font-bold text-[#64748B] block">BƯỚC 1</span>
              <span className="text-xs font-bold text-[#142A43] block">Website Showroom</span>
              <span className="text-[11px] text-[#64748B]">Khách xem xe như bình thường</span>
            </div>
            <div className="p-2.5 rounded-xl bg-orange-50/70 border border-orange-200 text-left">
              <span className="text-[10px] font-mono font-bold text-[#F47721] block">BƯỚC 2</span>
              <span className="text-xs font-bold text-[#142A43] block">AutoLead AI Widget</span>
              <span className="text-[11px] text-[#64748B]">Tư vấn & khai thác nhu cầu TQM</span>
            </div>
            <div className="p-2.5 rounded-xl bg-sky-50/70 border border-sky-200 text-left">
              <span className="text-[10px] font-mono font-bold text-[#4A98E8] block">BƯỚC 3</span>
              <span className="text-xs font-bold text-[#142A43] block">AutoLead Backend</span>
              <span className="text-[11px] text-[#64748B]">Sàng lọc & tính điểm lead</span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-left">
              <span className="text-[10px] font-mono font-bold text-emerald-600 block">BƯỚC 4</span>
              <span className="text-xs font-bold text-[#142A43] block">CRM Showroom</span>
              <span className="text-[11px] text-[#64748B]">Sales tiếp nhận chốt lái thử</span>
            </div>
          </div>
        </motion.div>

        {/* 6 Modules Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12"
        >
          {solutions.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.num}
                variants={cardVariants}
                whileHover={shouldReduceMotion ? {} : cardHoverMotion.whileHover}
                className={`p-5 sm:p-6 rounded-2xl bg-[#F8F9F5] border border-[#DCE3EC] ${item.accent} hover:bg-white hover:border-[#F47721]/40 transition-colors flex flex-col justify-between shadow-xs`}
              >
                <div className="space-y-4 text-left">
                  <div className="flex items-center justify-between pb-3 border-b border-[#DCE3EC]">
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#DCE3EC] flex items-center justify-center shadow-xs">
                      <Icon size={26} />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#64748B]">Mô-đun {item.num}</span>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono font-bold text-[#F47721] uppercase tracking-wider block">
                      {item.title}
                    </span>
                    <h3 className="text-base font-bold text-[#142A43] mt-1">{item.titleVi}</h3>
                    <p className="text-xs sm:text-sm text-[#64748B] mt-2 leading-relaxed">{item.desc}</p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-[#DCE3EC]/70">
                    <span className="text-[11px] font-mono uppercase text-[#142A43] font-bold block">
                      Hạng mục bàn giao:
                    </span>
                    {item.deliverables.map((deliv, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-[#142A43]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#159B68] shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Scope Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.5 }}
          className="p-4 rounded-2xl bg-[#F8F9F5] border border-[#DCE3EC] max-w-4xl mx-auto flex items-start gap-3 text-xs text-[#64748B] text-left"
        >
          <Info className="w-4 h-4 text-[#F47721] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#142A43]">Lưu ý phạm vi dịch vụ:</strong> Sáu nhóm chức năng trên là phạm vi dịch vụ thương mại tiêu chuẩn được đề xuất trong bản Offer chính thức của AutoLead Systems, được tùy biến theo quy mô và thỏa thuận riêng với từng đại lý ô tô.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
