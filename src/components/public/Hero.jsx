import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, CalendarCheck, Zap, Car, Building2 } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PixelCarOrange, PixelCloud } from './PixelIcons';
import PixelFringe from './PixelFringe';
import heroBg from '../../assets/hero-pixel-automotive-world.jpg';
import { buttonMotion, EASINGS } from '../../utils/motion';
import { gsap } from '../../utils/scrollEngine';

const MotionLink = motion.create(Link);

export default function Hero({ onOpenContact, onOpenMvpDemo, onOpenSaas }) {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const cloudsRef = useRef(null);
  const cardsRef = useRef(null);
  const roadCarRef = useRef(null);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  };

  // GSAP ScrollTrigger Multi-Layer Automotive Parallax
  useEffect(() => {
    if (shouldReduceMotion || typeof window === 'undefined') return;

    // Keep parallax active on screens >= 768px for optimal mobile battery/performance
    const isDesktop = window.innerWidth >= 768;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      // 1. Background image moves downward slightly slower than scroll (subtle optical depth)
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 14,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          }
        });
      }

      // 2. Pixel Sky & Clouds layer drifts upward (counter-parallax)
      if (cloudsRef.current) {
        gsap.to(cloudsRef.current, {
          yPercent: -22,
          xPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          }
        });
      }

      // 3. Floating AI Status Cards layer drifts upward smoothly
      if (cardsRef.current) {
        gsap.to(cardsRef.current, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          }
        });
      }

      // 4. Foreground Road Car subtle horizontal movement along the road
      if (roadCarRef.current) {
        gsap.to(roadCarRef.current, {
          x: 45,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          }
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  // Staggered text variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.55,
        ease: EASINGS.gentleOut
      }
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[680px] sm:min-h-[720px] lg:min-h-[820px] flex flex-col justify-between pt-24 sm:pt-28 md:pt-36 overflow-hidden bg-[#327FCB]"
    >
      {/* 16-bit Pixel Art Background with gentle entrance & GSAP Parallax */}
      <motion.div
        ref={bgRef}
        className="absolute inset-0 z-0 scale-105 origin-bottom"
        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.05 }}
        animate={{ opacity: 1, scale: 1.05 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 1.1, ease: EASINGS.gentleOut }}
      >
        <img
          src={heroBg}
          alt="AutoLead Systems Pixel Art Automotive World - Dealership Showroom & Luxury Cars"
          className="w-full h-full object-cover object-bottom pixelated select-none pointer-events-none"
          style={{ imageRendering: 'pixelated' }}
        />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#142A43]/40 to-transparent pointer-events-none" />
      </motion.div>

      {/* Decorative Pixel Clouds Sky Layer (GSAP Counter-Parallax) */}
      <div ref={cloudsRef} className="absolute inset-0 z-[1] pointer-events-none select-none overflow-hidden">
        <div className="absolute top-10 sm:top-14 left-8 lg:left-24">
          <PixelCloud size={72} opacity={0.85} />
        </div>
        <div className="absolute top-20 sm:top-24 right-12 lg:right-32">
          <PixelCloud size={96} opacity={0.9} />
        </div>
        <div className="hidden sm:block absolute top-32 left-1/2 -translate-x-1/2">
          <PixelCloud size={54} opacity={0.65} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mb-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline, Value Proposition, Action CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0E2034]/85 backdrop-blur-md border border-white/25 shadow-2xl space-y-4 sm:space-y-5"
            >
              {/* Badge */}
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#142A43] border border-[#F47721]/50 text-xs font-bold text-white tracking-wide font-mono shadow-xs">
                <PixelCarOrange size={20} />
                <span className="text-[#F47721]">AUTOLEAD</span>
                <span className="text-white/60">•</span>
                <span>AI LEAD QUALIFICATION CHO SHOWROOM Ô TÔ</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                variants={itemVariants}
                className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.18] drop-shadow-md"
              >
                Chuyển đổi khách truy cập website showroom thành{' '}
                <span className="text-[#F47721] underline decoration-[#F47721]/60 underline-offset-4">
                  lịch hẹn lái thử
                </span>{' '}
                có giá trị.
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="text-xs sm:text-base text-slate-200 font-normal leading-relaxed"
              >
                <strong>AutoLead cung cấp AI Widget nhúng vào website showroom, giúp tăng 300% tỷ lệ chuyển đổi khách lái thử mà không cần đổi website hiện có.</strong> Khách hàng vẫn lướt xem xe như bình thường; AI Widget tự động đối thoại, khai thác 7 tiêu chí TQM và đồng bộ dữ liệu lead nóng sang CRM đại lý tức thì.
              </motion.p>

              {/* CTAs: Showroom Simulator & CRM Portal */}
              <motion.div variants={itemVariants} className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <MotionLink
                  to="/demo"
                  onClick={handleScrollTop}
                  whileHover={shouldReduceMotion ? {} : buttonMotion.whileHover}
                  whileTap={shouldReduceMotion ? {} : buttonMotion.whileTap}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#F47721] to-[#E76513] hover:from-[#E76513] hover:to-[#D55302] shadow-lg shadow-[#F47721]/30 transition-all cursor-pointer min-h-[48px]"
                >
                  <Car className="w-4 h-4 text-white" />
                  <span>🚗 Trải nghiệm showroom</span>
                </MotionLink>

                <MotionLink
                  to="/crm"
                  onClick={handleScrollTop}
                  whileHover={shouldReduceMotion ? {} : buttonMotion.whileHover}
                  whileTap={shouldReduceMotion ? {} : buttonMotion.whileTap}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#142A43] hover:bg-[#07182D] border-2 border-emerald-400/50 shadow-md transition-all cursor-pointer min-h-[48px]"
                >
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>🏢 Cổng CRM Đại lý</span>
                </MotionLink>

                <MotionLink
                  to="/contact"
                  onClick={handleScrollTop}
                  whileHover={shouldReduceMotion ? {} : buttonMotion.whileHover}
                  whileTap={shouldReduceMotion ? {} : buttonMotion.whileTap}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl font-semibold text-xs text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer min-h-[48px]"
                >
                  <span>Đăng ký tư vấn B2B</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F47721]" />
                </MotionLink>
              </motion.div>

              {/* Visual Synchronized Connection Badge */}
              <motion.div variants={itemVariants} className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-between text-[11px] text-emerald-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>AI Widget nhúng trực tiếp website showroom • Đẩy lead đủ tiêu chuẩn vào CRM trong 0.05s</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-white bg-emerald-600/40 px-2 py-0.5 rounded">
                  Live Synced
                </span>
              </motion.div>

              {/* Offer Highlight */}
              <motion.div variants={itemVariants} className="pt-3 border-t border-white/15 flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#75A94C] shrink-0 mt-0.5" />
                <span>
                  Offer chính thức cho Showroom:{' '}
                  <strong className="text-white">15.000.000 VNĐ</strong> setup 30 ngày +{' '}
                  <strong className="text-[#F47721]">300.000 VNĐ</strong> / lịch hẹn đủ điều kiện.
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Floating AI Operation Status Cards */}
          <div ref={cardsRef} className="lg:col-span-5 hidden sm:flex flex-col items-end space-y-3 pt-4 lg:pt-0">
            {/* Card 1 - Gentle Floating Motion */}
            <motion.div
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
              animate={
                shouldReduceMotion
                  ? { opacity: 1, x: 0 }
                  : {
                      opacity: 1,
                      x: 0,
                      y: [0, -5, 0]
                    }
              }
              transition={{
                opacity: { duration: 0.6, delay: 0.2 },
                x: { duration: 0.6, delay: 0.2 },
                y: {
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
              }}
              className="px-4 py-2.5 rounded-2xl bg-[#0E2034]/85 backdrop-blur-md border border-white/20 text-xs text-white shadow-xl flex items-center gap-3 hover:bg-[#0E2034]/95 transition-colors"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#159B68] shrink-0" />
              <div className="text-left">
                <span className="text-[10px] font-mono text-[#75A94C] font-bold block uppercase">
                  AI Widget Nhúng Website Showroom
                </span>
                <span className="font-semibold">Chủ động tư vấn khách đang xem SUV GLC 300</span>
              </div>
              <Zap className="w-4 h-4 text-[#159B68] shrink-0 ml-1" />
            </motion.div>

            {/* Card 2 - Counter-Phase Floating */}
            <motion.div
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
              animate={
                shouldReduceMotion
                  ? { opacity: 1, x: 0 }
                  : {
                      opacity: 1,
                      x: 0,
                      y: [0, 5, 0]
                    }
              }
              transition={{
                opacity: { duration: 0.6, delay: 0.35 },
                x: { duration: 0.6, delay: 0.35 },
                y: {
                  duration: 5.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5
                }
              }}
              className="px-4 py-2.5 rounded-2xl bg-[#0E2034]/85 backdrop-blur-md border border-white/20 text-xs text-white shadow-xl flex items-center gap-3 hover:bg-[#0E2034]/95 transition-colors"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#159B68] shrink-0" />
              <div className="text-left">
                <span className="text-[10px] font-mono text-[#75A94C] font-bold block uppercase">
                  Sàng lọc 7 tiêu chí TQM đạt chuẩn
                </span>
                <span className="font-semibold">Nhu cầu mua trong 1-2 tháng & ngân sách &gt;1.5 tỷ</span>
              </div>
              <ShieldCheck className="w-4 h-4 text-[#159B68] shrink-0 ml-1" />
            </motion.div>

            {/* Card 3 - Chốt lịch hẹn */}
            <motion.div
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
              animate={
                shouldReduceMotion
                  ? { opacity: 1, x: 0 }
                  : {
                      opacity: 1,
                      x: 0,
                      y: [0, -4, 0]
                    }
              }
              transition={{
                opacity: { duration: 0.6, delay: 0.5 },
                x: { duration: 0.6, delay: 0.5 },
                y: {
                  duration: 4.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1
                }
              }}
              className="px-4 py-2.5 rounded-2xl bg-[#0E2034]/90 backdrop-blur-md border border-[#F47721]/60 text-xs text-white shadow-2xl flex items-center gap-3"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#F47721] animate-ping shrink-0" />
              <div className="text-left">
                <span className="text-[10px] font-mono text-[#F47721] font-bold block uppercase">
                  Đồng bộ CRM Đại lý tức thì (0.05s)
                </span>
                <span className="font-bold text-white">Chốt lịch lái thử: Thứ 7 • 09:30</span>
              </div>
              <CalendarCheck className="w-4 h-4 text-[#F47721] shrink-0 ml-1" />
            </motion.div>

            {/* Simulator Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="pt-2 text-right"
            >
              <span className="inline-block px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm text-[11px] font-mono text-white/80 border border-white/10">
                AutoLead Dealership Simulator • 16-Bit Engine
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Foreground Automotive Road Parallax Layer */}
      <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-10 pointer-events-none select-none overflow-hidden h-12">
        <div ref={roadCarRef} className="absolute -left-10 bottom-0 opacity-80 sm:opacity-90">
          <PixelCarOrange size={38} />
        </div>
      </div>

      {/* Pixel Fringe Transition from Sky/Grass to Section Background */}
      <div className="relative z-20 w-full mt-10 sm:mt-16">
        <PixelFringe color="#FFFFFF" topColor="#75A94C" />
      </div>
    </section>
  );
}
