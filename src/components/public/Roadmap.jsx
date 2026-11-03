import React, { useRef, useEffect } from 'react';
import { Calendar, Info } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PixelWrench, PixelChart, PixelShield, PixelFlag } from './PixelIcons';
import { defaultViewport, cardHoverMotion, EASINGS } from '../../utils/motion';
import { gsap } from '../../utils/scrollEngine';

export default function Roadmap() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const roadmapLineRef = useRef(null);

  useEffect(() => {
    if (shouldReduceMotion || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      if (roadmapLineRef.current) {
        gsap.fromTo(
          roadmapLineRef.current,
          { width: '0%' },
          {
            width: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              end: 'bottom 85%',
              scrub: 0.8,
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  const stages = [
    {
      days: 'Ngày 1–5',
      title: 'Tư vấn & Thống nhất yêu cầu',
      desc: 'Tìm hiểu mô hình kinh doanh, dòng xe chủ lực, khảo sát quy trình bán hàng hiện tại và thống nhất tiêu chuẩn khách hàng đủ điều kiện.',
      icon: PixelWrench
    },
    {
      days: 'Ngày 6–15',
      title: 'Thiết kế & Cấu hình',
      desc: 'Xây dựng kịch bản AI chăm sóc, thiết lập tiêu chí sàng lọc, cấu hình quy trình đặt lịch lái thử và luồng phân loại lead vào CRM.',
      icon: PixelChart
    },
    {
      days: 'Ngày 16–25',
      title: 'Tích hợp & Kiểm thử',
      desc: 'Kết nối các kênh tiếp nhận (Web, Zalo, Fanpage) với CRM, chạy kiểm thử quy trình từ lúc phát sinh lead đến khi đặt lịch thành công.',
      icon: PixelShield
    },
    {
      days: 'Ngày 26–30',
      title: 'Đào tạo & Bàn giao vận hành',
      desc: 'Đào tạo nhân sự bán hàng tiếp nhận lịch hẹn, chuyển giao tài liệu hướng dẫn và chính thức nghiệm thu đưa vào vận hành thực tế.',
      icon: PixelFlag
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
    <section id="roadmap" ref={sectionRef} className="scroll-mt-24 sm:scroll-mt-28 py-16 sm:py-20 md:py-24 bg-[#F8F9F5] relative border-b border-[#DCE3EC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.5, ease: EASINGS.gentleOut }}
          className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#DCE3EC] text-xs font-bold text-[#F47721] font-mono shadow-xs">
            <Calendar className="w-3.5 h-3.5" />
            <span>HÀNH TRÌNH 30 NGÀY BÀN GIAO VẬN HÀNH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#142A43] tracking-tight">
            Quy Trình Triển Khai Trong 30 Ngày
          </h2>
          <p className="text-xs sm:text-base text-[#64748B] leading-relaxed max-w-2xl mx-auto">
            Bốn chặng đường rõ ràng nhằm đưa hệ thống AI vào vận hành thực tế tại đại lý đúng tiến độ và tiêu chuẩn cam kết.
          </p>
        </motion.div>

        {/* GSAP Scroll-Driven Connecting Roadmap Progress Line */}
        <div className="hidden lg:block w-full max-w-6xl mx-auto mb-6 px-4">
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              ref={roadmapLineRef}
              className="h-full bg-gradient-to-r from-[#F47721] via-[#FFE875] to-[#159B68] rounded-full shadow-xs"
              style={{ width: '0%' }}
            />
          </div>
        </div>

        {/* 4 Stage Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12"
        >
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={shouldReduceMotion ? {} : cardHoverMotion.whileHover}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-[#DCE3EC] shadow-sm hover:border-[#F47721]/50 transition-colors flex flex-col justify-between text-left"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-[#DCE3EC]">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-[#F8F9F5] text-[#F47721] border border-[#DCE3EC]">
                      {stage.days}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] flex items-center justify-center">
                      <Icon size={22} />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-[#142A43]">{stage.title}</h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">{stage.desc}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#DCE3EC]/70 text-[11px] font-mono text-[#64748B]">
                  <span>Giai đoạn 0{idx + 1} / 04</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Notice */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.5 }}
          className="p-4 rounded-2xl bg-white border border-[#DCE3EC] max-w-4xl mx-auto flex items-start gap-3 text-xs text-[#64748B] shadow-xs text-left"
        >
          <Info className="w-4 h-4 text-[#F47721] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#142A43]">Điều kiện áp dụng tiến độ:</strong> Tiến độ 30 ngày được tính từ thời điểm hai bên hoàn tất thống nhất các yêu cầu và đại lý cung cấp đầy đủ thông tin truy cập tài khoản quảng cáo, Fanpage và Zalo OA cần thiết.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
