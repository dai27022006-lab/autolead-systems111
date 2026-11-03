import React, { useRef, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  PixelClock,
  PixelWrench,
  PixelCalendar,
  PixelChart,
  PixelMoney,
  PixelCarOrange
} from './PixelIcons';
import pixelCarsBg from '../../assets/dealership-pixel-cars.jpg';
import { defaultViewport, cardHoverMotion, EASINGS } from '../../utils/motion';
import { gsap } from '../../utils/scrollEngine';

export default function Problems() {
  const shouldReduceMotion = useReducedMotion();
  const imgRef = useRef(null);

  // GSAP ScrollTrigger subtle depth for the case study illustration
  useEffect(() => {
    if (shouldReduceMotion || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { yPercent: 5, scale: 1.04 },
          {
            yPercent: -5,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: imgRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  const problems = [
    {
      icon: PixelClock,
      num: '01',
      title: 'Phản hồi khách hàng chậm',
      desc: 'Lead để lại thông tin nhưng chờ từ 4–12 tiếng mới được liên hệ, làm giảm tỷ lệ kết nối thành công và khiến khách hàng chuyển sang showroom khác.'
    },
    {
      icon: PixelWrench,
      num: '02',
      title: 'Tốn công sàng lọc lead',
      desc: 'Đội ngũ Sales tốn 60–70% thời gian gọi điện chỉ để xử lý số ảo, số sai hoặc khách hàng chưa có nhu cầu mua xe rõ ràng.'
    },
    {
      icon: PixelCalendar,
      num: '03',
      title: 'Thiếu quy trình follow-up',
      desc: 'Khách hàng tiềm năng thường bị bỏ quên sau 1–2 cuộc gọi đầu tiên do thiếu hệ thống bám đuổi và nhắc hẹn tự động theo hành trình mua sắm.'
    },
    {
      icon: PixelChart,
      num: '04',
      title: 'Khó đo lường hiệu quả',
      desc: 'Thiếu liên kết dữ liệu giữa chiến dịch quảng cáo và kết quả lái thử tại showroom khiến quản lý khó đánh giá chính xác chi phí trên từng khách hàng thực.'
    },
    {
      icon: PixelMoney,
      num: '05',
      title: 'Chi phí marketing cao',
      desc: 'Chi phí quảng cáo ngày càng tăng nhưng tỷ lệ chuyển đổi thành khách đến showroom lại thấp, làm suy giảm lợi nhuận ròng của đại lý.'
    },
    {
      icon: PixelCarOrange,
      num: '06',
      title: 'Bỏ lỡ khách hàng tiềm năng',
      desc: 'Khách hàng tìm kiếm xe ngoài giờ làm việc hoặc cuối tuần không được hỗ trợ kịp thời, dẫn đến thất thoát cơ hội bán hàng giá trị cao.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.07
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
    <section id="problems" className="scroll-mt-24 sm:scroll-mt-28 py-16 sm:py-20 md:py-24 bg-[#F8F9F5] relative border-b border-[#DCE3EC] overflow-hidden">
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
            <AlertCircle className="w-3.5 h-3.5" />
            <span>THÁCH THỨC VẬN HÀNH SHOWROOM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#142A43] tracking-tight">
            Những Thách Thức Mà Đại Lý Ô Tô Thường Gặp
          </h2>
          <p className="text-xs sm:text-base text-[#64748B] leading-relaxed max-w-2xl mx-auto">
            Trong kinh doanh ô tô, chi phí marketing cao nhưng thiếu quy trình tiếp nhận và sàng lọc tự động dẫn đến lãng phí nguồn lực và bỏ lỡ khách hàng tiềm năng.
          </p>
        </motion.div>

        {/* 6 Problem Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12"
        >
          {problems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.num}
                variants={cardVariants}
                whileHover={shouldReduceMotion ? {} : cardHoverMotion.whileHover}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-[#DCE3EC] shadow-sm hover:border-[#F47721]/50 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-3 text-left">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] flex items-center justify-center">
                      <Icon size={26} />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#64748B]">{item.num}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#142A43]">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">{item.desc}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#DCE3EC]/70 text-[11px] text-[#64748B] font-medium flex items-center justify-between">
                  <span>Điểm nghẽn vận hành</span>
                  <span className="text-[#F47721] font-bold">AutoLead Giải Pháp</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Featured Case Study / Showcase Box */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, ease: EASINGS.gentleOut }}
          className="rounded-3xl overflow-hidden border border-[#DCE3EC] bg-white shadow-sm max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 h-52 sm:h-64 lg:h-full relative overflow-hidden bg-slate-900">
              <img
                ref={imgRef}
                src={pixelCarsBg}
                alt="Không gian showroom ô tô hiện đại trong thế giới AutoLead"
                className="w-full h-full object-cover object-center pixelated select-none will-change-transform"
                style={{ imageRendering: 'pixelated' }}
                loading="lazy"
              />
            </div>
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-3 text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#75A94C]/15 text-[#315C3C] text-[11px] font-mono font-bold">
                <span>Nghiên Cứu Tác Nghiệp Showroom Thực Tế</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-[#142A43]">
                Tốc độ phản hồi và chất lượng sàng lọc quyết định 70% cuộc hẹn lái thử
              </h4>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Khách hàng mua ô tô đòi hỏi thông tin chính xác và trải nghiệm tư vấn chuyên nghiệp ngay từ lần tương tác đầu tiên. Hệ thống AI của AutoLead giúp giải phóng đội ngũ bán hàng khỏi việc gọi điện sàng lọc thủ công, tập trung tối đa vào buổi trải nghiệm thực tế tại showroom.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
