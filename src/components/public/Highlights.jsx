import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { PixelMoney, PixelCalendar, PixelChart, PixelCarOrange } from './PixelIcons';
import { defaultViewport, cardHoverMotion, EASINGS } from '../../utils/motion';

export default function Highlights() {
  const shouldReduceMotion = useReducedMotion();

  const items = [
    {
      icon: PixelMoney,
      title: 'Tối ưu chi phí marketing',
      desc: 'Giảm lãng phí ngân sách quảng cáo, chỉ trả tiền trên kết quả lịch hẹn đủ điều kiện.'
    },
    {
      icon: PixelCalendar,
      title: 'Tăng tỷ lệ đặt lịch lái thử',
      desc: 'AI phản hồi nhanh trong 60 giây và chăm sóc liên tục để chốt lịch trải nghiệm xe.'
    },
    {
      icon: PixelChart,
      title: 'Quy trình rõ ràng, dễ quản lý',
      desc: 'Theo dõi chi tiết trạng thái lead và lịch hẹn trên giao diện trực quan, minh bạch.'
    },
    {
      icon: PixelCarOrange,
      title: 'Phù hợp xe mới & xe lướt',
      desc: 'Tùy biến linh hoạt theo phân khúc xe và quy trình bán hàng của từng showroom.'
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
    <section className="bg-white border-b border-[#DCE3EC] py-8 sm:py-10 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={shouldReduceMotion ? {} : cardHoverMotion.whileHover}
                className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-[#F8F9F5] border border-[#DCE3EC] hover:border-[#F47721]/50 hover:bg-white transition-colors shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-[#DCE3EC] flex items-center justify-center shrink-0 shadow-xs">
                  <Icon size={26} />
                </div>
                <div className="space-y-1 text-left">
                  <h4 className="text-sm font-bold text-[#142A43]">{item.title}</h4>
                  <p className="text-xs text-[#64748B] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
