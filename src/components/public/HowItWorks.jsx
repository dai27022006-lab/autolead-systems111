import React, { useRef, useEffect } from 'react';
import { Compass, ArrowRight, Award } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  PixelCarOrange,
  PixelClock,
  PixelShield,
  PixelCalendar,
  PixelFlag
} from './PixelIcons';
import salesConsultationBg from '../../assets/dealership-sales-consultation.jpg';
import { defaultViewport, cardHoverMotion, EASINGS } from '../../utils/motion';
import { gsap } from '../../utils/scrollEngine';

export default function HowItWorks() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const progressBarRef = useRef(null);
  const carRunnerRef = useRef(null);
  const mobileLineRef = useRef(null);
  const showcaseImgRef = useRef(null);

  // Retro Arcade Pixel Car Nitro & Pop-Up Traffic Light Refs
  const nitroContainerRef = useRef(null);
  const nitroFlameRef = useRef(null);
  const nitroCoreRef = useRef(null);
  const speedTrailsRef = useRef(null);
  const particlesRef = useRef(null);
  const trafficLightAssemblyRef = useRef(null);
  const redLampOnRef = useRef(null);
  const redLampGlowRef = useRef(null);
  const redLampFlashRef = useRef(null);

  // GSAP ScrollTrigger Scroll-Driven Storytelling & Arcade Pixel Vehicle VFX
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Reduced motion fallback: static car, no flashing or particle loops
    if (shouldReduceMotion) {
      if (nitroContainerRef.current) gsap.set(nitroContainerRef.current, { opacity: 0 });
      if (trafficLightAssemblyRef.current) gsap.set(trafficLightAssemblyRef.current, { yPercent: 0 });
      if (redLampOnRef.current) gsap.set(redLampOnRef.current, { opacity: 1 });
      if (redLampGlowRef.current) gsap.set(redLampGlowRef.current, { opacity: 0.6 });
      return;
    }

    let stopTimer = null;
    let flameFrameTimer = null;
    let flameToggle = false;

    const ctx = gsap.context(() => {
      // 1. Racetrack: Scroll-driven car, ZingSpeed-style Arcade Nitro & Pop-Up Red Traffic Light
      if (progressBarRef.current && carRunnerRef.current) {
        // Directional States: 'STOPPED' | 'FORWARD' | 'REVERSE'
        let currentState = 'STOPPED';
        let lastProgress = 0;
        let lastTime = performance.now();
        let isFirstRun = true;

        // Set initial parked state: Nitro hidden, Traffic Light risen in front with Red Lamp lit
        gsap.set(nitroContainerRef.current, { opacity: 0, scaleX: 0.2, transformOrigin: 'right center' });
        gsap.set(speedTrailsRef.current, { opacity: 0, scaleX: 0.2, transformOrigin: 'right center' });
        gsap.set(trafficLightAssemblyRef.current, {
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          transformOrigin: 'bottom center'
        });
        gsap.set(redLampOnRef.current, { opacity: 1 });
        gsap.set(redLampGlowRef.current, { opacity: 0.85, scale: 1, transformOrigin: 'center center' });
        gsap.set(redLampFlashRef.current, { opacity: 0, scale: 0.5, transformOrigin: 'center center' });

        // Helper: Retract Traffic Light into road slot smoothly
        const retractTrafficLight = () => {
          if (redLampOnRef.current) {
            gsap.killTweensOf(redLampOnRef.current);
            gsap.set(redLampOnRef.current, { opacity: 0 });
          }
          if (redLampGlowRef.current) {
            gsap.killTweensOf(redLampGlowRef.current);
            gsap.set(redLampGlowRef.current, { opacity: 0 });
          }
          if (redLampFlashRef.current) {
            gsap.killTweensOf(redLampFlashRef.current);
            gsap.set(redLampFlashRef.current, { opacity: 0 });
          }
          if (trafficLightAssemblyRef.current) {
            gsap.killTweensOf(trafficLightAssemblyRef.current);
            gsap.to(trafficLightAssemblyRef.current, {
              yPercent: 105,
              scaleY: 0.85,
              duration: 0.15,
              ease: 'power2.in'
            });
          }
        };

        // Helper: Clear/hide all nitro effects (flames, speed trails, particles)
        const killNitroEffects = (isSmooth = false) => {
          const dur = isSmooth ? 0.14 : 0.08;
          if (nitroContainerRef.current) {
            gsap.killTweensOf(nitroContainerRef.current);
            gsap.to(nitroContainerRef.current, {
              opacity: 0,
              scaleX: 0.15,
              scaleY: 0.5,
              duration: dur,
              ease: 'power2.in'
            });
          }
          if (speedTrailsRef.current) {
            gsap.killTweensOf(speedTrailsRef.current);
            gsap.to(speedTrailsRef.current, {
              opacity: 0,
              scaleX: 0.1,
              duration: dur,
              ease: 'power2.in'
            });
          }
          if (particlesRef.current) {
            gsap.killTweensOf(particlesRef.current);
            gsap.to(particlesRef.current, {
              opacity: 0,
              x: 0,
              duration: dur
            });
          }
          if (nitroFlameRef.current) {
            gsap.killTweensOf(nitroFlameRef.current);
            gsap.to(nitroFlameRef.current, {
              scaleX: 0.2,
              duration: dur
            });
          }
        };

        // Helper: Pop-up Traffic Light from ground with mechanical spring bounce & Red Lamp flash
        const riseTrafficLight = () => {
          if (trafficLightAssemblyRef.current) {
            gsap.killTweensOf(trafficLightAssemblyRef.current);
            const popTl = gsap.timeline();
            popTl
              .fromTo(
                trafficLightAssemblyRef.current,
                { yPercent: 105, scaleY: 0.78, scaleX: 1.16 },
                {
                  yPercent: 0,
                  scaleY: 1.08,
                  scaleX: 0.94,
                  duration: 0.24,
                  ease: 'power3.out'
                }
              )
              .to(trafficLightAssemblyRef.current, {
                scaleY: 0.95,
                scaleX: 1.04,
                duration: 0.08,
                ease: 'sine.inOut'
              })
              .to(trafficLightAssemblyRef.current, {
                scaleY: 1,
                scaleX: 1,
                duration: 0.1,
                ease: 'back.out(2)'
              });
          }

          if (redLampOnRef.current) {
            gsap.killTweensOf(redLampOnRef.current);
            gsap.fromTo(
              redLampOnRef.current,
              { opacity: 0 },
              { opacity: 1, duration: 0.08, delay: 0.14 }
            );
          }
          if (redLampFlashRef.current) {
            gsap.killTweensOf(redLampFlashRef.current);
            gsap.fromTo(
              redLampFlashRef.current,
              { opacity: 1, scale: 0.6 },
              {
                opacity: 0,
                scale: 1.5,
                duration: 0.32,
                delay: 0.14,
                ease: 'steps(4)'
              }
            );
          }
          if (redLampGlowRef.current) {
            gsap.killTweensOf(redLampGlowRef.current);
            gsap.fromTo(
              redLampGlowRef.current,
              { opacity: 0, scale: 0.7 },
              {
                opacity: 0.9,
                scale: 1,
                duration: 0.2,
                delay: 0.14,
                ease: 'steps(3)'
              }
            );
          }
        };

        // Continuous pixel-frame oscillation for exhaust flames ONLY when moving FORWARD
        flameFrameTimer = setInterval(() => {
          if (currentState === 'FORWARD') {
            flameToggle = !flameToggle;
            if (nitroCoreRef.current) {
              gsap.set(nitroCoreRef.current, {
                x: flameToggle ? -2 : 0,
                scaleY: flameToggle ? 1.12 : 0.92,
                transformOrigin: 'right center'
              });
            }
          }
        }, 55);

        // Transition: Any -> STOPPED
        const transitionToStopped = () => {
          if (currentState === 'STOPPED') return;
          const wasForward = currentState === 'FORWARD';
          currentState = 'STOPPED';

          // Step 1: Smoothly fade out nitro if coming from FORWARD (in REVERSE nitro was already 0)
          if (wasForward) {
            killNitroEffects(true);
          }

          // Step 2: Pop-up traffic light with red lamp
          riseTrafficLight();
        };

        // Transition: Any -> REVERSE
        const transitionToReverse = () => {
          if (currentState === 'REVERSE') return;
          const wasStopped = currentState === 'STOPPED';
          currentState = 'REVERSE';

          // Step 1: Immediately kill/cut all nitro effects (no flames, trails, particles)
          killNitroEffects(false);

          // Step 2: If was STOPPED, smoothly retract traffic light so it doesn't float
          if (wasStopped) {
            retractTrafficLight();
          }
        };

        // Transition: Any -> FORWARD
        const transitionToForward = (normalizedSpeed) => {
          const wasStopped = currentState === 'STOPPED';
          const wasReverse = currentState === 'REVERSE';
          currentState = 'FORWARD';

          // Step 1: If was STOPPED, retract traffic light
          if (wasStopped) {
            retractTrafficLight();
          }

          // Step 2: Ignite nitro if starting or switching from REVERSE
          if (wasStopped || wasReverse) {
            if (nitroContainerRef.current) {
              gsap.killTweensOf(nitroContainerRef.current);
              gsap.to(nitroContainerRef.current, {
                opacity: 1,
                scaleY: 1,
                duration: 0.12,
                ease: 'power2.out'
              });
            }
            if (speedTrailsRef.current) {
              gsap.killTweensOf(speedTrailsRef.current);
              gsap.to(speedTrailsRef.current, {
                opacity: 1,
                duration: 0.12,
                ease: 'power2.out'
              });
            }
          }

          // Step 3: Scale flame, speed trails & particles by forward velocity
          if (nitroFlameRef.current) {
            const flameScaleX = 0.55 + normalizedSpeed * 0.9; // 0.55x to 1.45x
            const flameScaleY = 0.9 + normalizedSpeed * 0.25;
            gsap.set(nitroFlameRef.current, {
              scaleX: flameScaleX,
              scaleY: flameScaleY,
              transformOrigin: 'right center'
            });
          }

          if (speedTrailsRef.current) {
            const trailScaleX = 0.45 + normalizedSpeed * 1.05;
            gsap.set(speedTrailsRef.current, {
              scaleX: trailScaleX,
              opacity: 0.45 + normalizedSpeed * 0.55,
              transformOrigin: 'right center'
            });
          }

          if (particlesRef.current) {
            const pShift = -Math.round(4 + normalizedSpeed * 18);
            gsap.set(particlesRef.current, {
              x: pShift,
              opacity: 0.55 + normalizedSpeed * 0.45
            });
          }
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'bottom 85%',
            scrub: 0.8,
            onLeave: () => {
              transitionToStopped();
            },
            onLeaveBack: () => {
              transitionToStopped();
            },
            onUpdate: (self) => {
              const currentProgress = self.progress;
              const now = performance.now();
              const dt = Math.max((now - lastTime) / 1000, 0.001);

              if (isFirstRun) {
                isFirstRun = false;
                lastProgress = currentProgress;
                lastTime = now;
                return;
              }

              // Signed progress delta & velocities
              const signedProgressDelta = currentProgress - lastProgress;
              const progressVelocity = (signedProgressDelta / dt) * 1000;
              const rawScrollVelocity = typeof self.getVelocity === 'function' ? self.getVelocity() : 0;
              const absVelocity = Math.max(Math.abs(rawScrollVelocity), Math.abs(progressVelocity));

              lastProgress = currentProgress;
              lastTime = now;

              if (stopTimer) clearTimeout(stopTimer);

              // Movement threshold with hysteresis:
              // Higher threshold (>30) to start from STOPPED; lower threshold (>18) to keep moving.
              const motionThreshold = currentState === 'STOPPED' ? 30 : 18;

              if (absVelocity > motionThreshold) {
                // Determine signed direction:
                // Primary: sign of actual progress change between frames
                // Secondary: GSAP ScrollTrigger raw velocity / direction
                let isMovingForward = false;
                if (signedProgressDelta > 0.00004) {
                  isMovingForward = true;
                } else if (signedProgressDelta < -0.00004) {
                  isMovingForward = false;
                } else if (rawScrollVelocity > 15) {
                  isMovingForward = true;
                } else if (rawScrollVelocity < -15) {
                  isMovingForward = false;
                } else {
                  isMovingForward = self.direction > 0;
                }

                if (isMovingForward) {
                  // FORWARD MOVEMENT: Nitro enabled & scaled to forward velocity
                  const normalizedSpeed = Math.min(Math.max((absVelocity - 20) / 420, 0.2), 1.0);
                  transitionToForward(normalizedSpeed);
                } else {
                  // REVERSE MOVEMENT: Nitro strictly disabled (no trails, no flame, no particles)
                  transitionToReverse();
                }

                // Debounce timer for when user stops scrolling
                stopTimer = setTimeout(transitionToStopped, 125);
              } else {
                // Velocity below threshold: prepare to stop
                if (currentState === 'FORWARD') {
                  if (nitroFlameRef.current) {
                    gsap.to(nitroFlameRef.current, {
                      scaleX: 0.35,
                      duration: 0.08
                    });
                  }
                }
                stopTimer = setTimeout(transitionToStopped, 95);
              }
            }
          }
        });

        tl.fromTo(
          progressBarRef.current,
          { width: '4%' },
          { width: '92%', ease: 'none' }
        ).fromTo(
          carRunnerRef.current,
          { left: '4%' },
          { left: 'calc(90% - 48px)', ease: 'none' },
          0
        );
      }

      // 2. Mobile vertical timeline fill animation
      if (mobileLineRef.current) {
        gsap.fromTo(
          mobileLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'bottom 85%',
              scrub: 0.6,
            }
          }
        );
      }

      // 3. Showcase Consultation Image subtle parallax reveal
      if (showcaseImgRef.current) {
        gsap.fromTo(
          showcaseImgRef.current,
          { scale: 1.08, yPercent: 4 },
          {
            scale: 1,
            yPercent: -4,
            ease: 'none',
            scrollTrigger: {
              trigger: showcaseImgRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      }
    }, sectionRef);

    return () => {
      if (stopTimer) clearTimeout(stopTimer);
      if (flameFrameTimer) clearInterval(flameFrameTimer);
      ctx.revert();
    };
  }, [shouldReduceMotion]);

  const steps = [
    {
      num: '01',
      channel: 'Meta / Google / TikTok',
      title: 'Thu hút & Quảng cáo AI',
      desc: 'Chiến dịch quảng cáo số thông minh nhắm trúng đối tượng có nhu cầu tìm hiểu các dòng xe đang có sẵn tại đại lý.',
      icon: PixelCarOrange
    },
    {
      num: '02',
      channel: 'Zalo OA / Web / Fanpage',
      title: 'Tiếp nhận tức thì <60s',
      desc: 'AI tự động chào hỏi, tiếp nhận thông tin khách hàng 24/7 không để khách phải chờ đợi lâu hay chuyển showroom.',
      icon: PixelClock
    },
    {
      num: '03',
      channel: 'AI Chatbot / Voicebot',
      title: 'Sàng lọc theo 7 tiêu chí TQM',
      desc: 'AI đối thoại tự nhiên để làm rõ mẫu xe quan tâm, thời gian dự kiến mua, khoảng ngân sách và mức độ sẵn sàng đến lái thử.',
      icon: PixelShield
    },
    {
      num: '04',
      channel: 'Auto-Calendar CRM',
      title: 'Đặt lịch hẹn lái thử',
      desc: 'Khách hàng chọn ngày giờ lái thử thuận tiện, hệ thống tự động kiểm tra slot trống chống trùng lịch và gửi SMS/Zalo nhắc hẹn.',
      icon: PixelCalendar
    },
    {
      num: '05',
      channel: 'Showroom Sales Team',
      title: 'Bàn giao Showroom chốt xe',
      desc: 'Toàn bộ hồ sơ nhu cầu và lịch hẹn được đẩy tự động vào CRM cho chuyên viên bán hàng đón tiếp và đàm phán hợp đồng.',
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

  const itemVariants = {
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
    <section id="workflow" ref={sectionRef} className="scroll-mt-24 sm:scroll-mt-28 py-16 sm:py-20 md:py-24 bg-[#F8F9F5] relative border-b border-[#DCE3EC] overflow-hidden">
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
            <Compass className="w-3.5 h-3.5" />
            <span>HÀNH TRÌNH TÁC NGHIỆP TRÊN ĐƯỜNG ĐUA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#142A43] tracking-tight">
            Quy Trình Tạo Lịch Hẹn Lái Thử
          </h2>
          <p className="text-xs sm:text-base text-[#64748B] leading-relaxed max-w-2xl mx-auto">
            Hành trình 5 chặng đường liền mạch từ điểm xuất phát quảng cáo số đến đích đến trải nghiệm lái thử và chốt xe tại showroom.
          </p>
        </motion.div>

        {/* Visual Racetrack Track (Responsive Desktop & Mobile Arcade Racetrack) */}
        <div className="mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={defaultViewport}
            transition={{ duration: 0.55, ease: EASINGS.gentleOut }}
            className="relative p-3 sm:p-6 rounded-3xl bg-[#142A43] border-4 border-[#07182D] shadow-xl overflow-hidden mb-6 sm:mb-8"
          >
            {/* Top Racing Stadium Trim */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#E2F0FD] via-[#F47721] to-[#E2F0FD] opacity-60" />
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#E2F0FD] via-[#F47721] to-[#E2F0FD] opacity-60" />

            {/* Zone 1: 5 Stage Checkpoints & Icons (Separated above the racing lane so the car & traffic light never overlap) */}
            <div className="relative z-10 grid grid-cols-5 gap-1.5 sm:gap-4 pt-1">
              {steps.map((item, idx) => {
                const Icon = item.icon;
                const isFinish = idx === steps.length - 1;
                return (
                  <div key={item.num} className="flex flex-col items-center text-center">
                    <div className="mb-1.5 sm:mb-2 inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 rounded-full bg-[#07182D] text-[8px] sm:text-[10px] font-mono font-bold text-white border border-white/20 whitespace-nowrap">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#F47721] shrink-0" />
                      <span className="hidden sm:inline">CHẶNG {item.num}</span>
                      <span className="sm:hidden">C.{item.num}</span>
                    </div>

                    <motion.div
                      whileHover={shouldReduceMotion ? {} : { scale: 1.12, rotate: 2 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                      className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#0D2748] border-2 border-[#F47721] flex items-center justify-center shadow-lg cursor-pointer"
                    >
                      <Icon size={24} />
                    </motion.div>

                    <span className="text-[8px] sm:text-[10px] font-mono font-bold text-[#FFE875] mt-1.5 sm:mt-2 block whitespace-nowrap">
                      {isFinish ? '★ ĐÍCH ĐẾN' : `+${(idx + 1) * 20}%`}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Zone 2: Dedicated 16-Bit Arcade Asphalt Racing Lane */}
            <div className="relative mt-4 sm:mt-6 h-[74px] sm:h-[86px] rounded-2xl bg-[#091526] border-2 border-[#263B59] shadow-inner overflow-hidden">
              {/* Top & Bottom Red/White Arcade Racing Rumble Curbs */}
              <div
                className="absolute top-0 left-0 right-0 h-[5px] opacity-85 z-0"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(90deg, #F47721 0px, #F47721 14px, #E2F0FD 14px, #E2F0FD 28px)'
                }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-[5px] opacity-85 z-0"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(90deg, #E2F0FD 0px, #E2F0FD 14px, #F47721 14px, #F47721 28px)'
                }}
              />

              {/* Asphalt Center Dashed Lane Divider */}
              <div className="absolute top-1/2 left-3 right-3 h-0.5 border-b-2 border-dashed border-white/15 -translate-y-1/2 z-0" />

              {/* Subtle Road Ground Track Groove & Progress Strip */}
              <div className="absolute bottom-[14px] left-3 right-3 h-[4px] bg-[#142A43] rounded-full z-0" />
              <div
                ref={progressBarRef}
                className="absolute bottom-[14px] left-3 h-[4px] bg-gradient-to-r from-[#00F0FF] via-[#F47721] to-[#FFE875] rounded-full z-0 opacity-80"
                style={{ width: '4%' }}
              />

              {/* GSAP Scroll-Driven Runner Pixel Car + Arcade Nitro + Pop-Up Red Traffic Light */}
              <div
                ref={carRunnerRef}
                className="absolute bottom-[12px] z-20 pointer-events-none select-none will-change-transform"
                style={{ left: '4%' }}
              >
                <div className="relative flex items-end">
                  {/* ============================================================
                      1. ZINGSPEED-STYLE ARCADE NITRO BOOST (Behind Rear Bumper)
                     ============================================================ */}
                  <div
                    ref={speedTrailsRef}
                    className="absolute right-[calc(100%+10px)] bottom-[5px] w-[72px] sm:w-[116px] h-[24px] pointer-events-none will-change-transform z-0"
                    style={{ opacity: 0, transformOrigin: 'right center' }}
                  >
                    {/* Multi-Depth Pixel Speed Streaks */}
                    <svg
                      width="100%"
                      height="24"
                      viewBox="0 0 116 24"
                       preserveAspectRatio="none"
                      shapeRendering="crispEdges"
                      className="overflow-visible"
                    >
                      {/* Top Cyan Energy Streak */}
                      <rect x="28" y="2" width="84" height="2" fill="#00F0FF" opacity="0.85" />
                      <rect x="6" y="2" width="16" height="2" fill="#38BDF8" opacity="0.55" />
                      {/* Upper-Mid Electric Blue Streak */}
                      <rect x="44" y="6" width="68" height="2" fill="#2563EB" opacity="0.9" />
                      <rect x="18" y="6" width="20" height="2" fill="#00F0FF" opacity="0.6" />
                      {/* Center High-Velocity White/Yellow Core Streak */}
                      <rect x="12" y="11" width="102" height="2" fill="#FFE875" opacity="0.9" />
                      <rect x="58" y="11" width="56" height="2" fill="#FFFFFF" opacity="0.95" />
                      {/* Lower-Mid Orange Thermal Streak */}
                      <rect x="34" y="16" width="78" height="2" fill="#F47721" opacity="0.9" />
                      <rect x="10" y="16" width="18" height="2" fill="#FFE875" opacity="0.65" />
                      {/* Bottom Cyan Ground Ion Streak */}
                      <rect x="48" y="20" width="64" height="2" fill="#00F0FF" opacity="0.75" />
                    </svg>
                  </div>

                  {/* Multi-Layer Exhaust Flame + Pixel Spark Particles */}
                  <div
                    ref={nitroContainerRef}
                    className="absolute right-[calc(100%-3px)] bottom-[3px] flex items-center pointer-events-none will-change-transform z-10"
                    style={{ opacity: 0, transformOrigin: 'right center' }}
                  >
                    {/* Controlled Pixel Spark Particles */}
                    <div
                      ref={particlesRef}
                      className="absolute -left-[22px] top-1/2 -translate-y-1/2 w-[26px] h-[22px] pointer-events-none will-change-transform"
                    >
                      <svg width="26" height="22" viewBox="0 0 26 22" shapeRendering="crispEdges">
                        <rect x="2" y="9" width="3" height="3" fill="#00F0FF" />
                        <rect x="8" y="3" width="3" height="3" fill="#FFE875" />
                        <rect x="13" y="15" width="3" height="3" fill="#F47721" />
                        <rect x="18" y="6" width="2" height="2" fill="#FFFFFF" />
                        <rect x="6" y="17" width="2" height="2" fill="#00F0FF" />
                      </svg>
                    </div>

                    {/* Multi-Layer 16-Bit Arcade Exhaust Flame Sprite */}
                    <svg
                      ref={nitroFlameRef}
                      width="46"
                      height="22"
                      viewBox="0 0 46 22"
                      shapeRendering="crispEdges"
                      className="inline-block will-change-transform overflow-visible"
                      style={{ transformOrigin: 'right center' }}
                    >
                      {/* Layer 1: Outer Aerodynamic Thermal Plume (Orange #F47721 & Electric Blue #2563EB) */}
                      <rect x="0" y="9" width="8" height="4" fill="#F47721" />
                      <rect x="6" y="7" width="12" height="8" fill="#F47721" />
                      <rect x="14" y="5" width="16" height="12" fill="#F47721" />
                      <rect x="22" y="3" width="18" height="16" fill="#2563EB" />
                      <rect x="12" y="3" width="10" height="2" fill="#F47721" />
                      <rect x="12" y="17" width="10" height="2" fill="#F47721" />

                      {/* Layer 2: Mid-Layer High-Energy Plasma (Yellow #FFE875 & Cyan #00F0FF) */}
                      <rect x="8" y="9" width="10" height="4" fill="#FFE875" />
                      <rect x="16" y="7" width="14" height="8" fill="#FFE875" />
                      <rect x="24" y="5" width="18" height="12" fill="#00F0FF" />
                      <rect x="20" y="5" width="6" height="2" fill="#FFE875" />
                      <rect x="20" y="15" width="6" height="2" fill="#FFE875" />

                      {/* Layer 3: Oscillating Jet Thruster Inner Core (Cyan #00F0FF & Pure White #FFFFFF) */}
                      <g ref={nitroCoreRef}>
                        <rect x="18" y="9" width="12" height="4" fill="#00F0FF" />
                        <rect x="26" y="8" width="14" height="6" fill="#38BDF8" />
                        <rect x="31" y="7" width="13" height="8" fill="#FFFFFF" />
                        <rect x="38" y="6" width="8" height="10" fill="#FFFFFF" />
                      </g>
                    </svg>
                  </div>

                  {/* ============================================================
                      2. BASE 16-BIT PIXEL RACE CAR SPRITE (Facing Right)
                     ============================================================ */}
                  <div className="relative z-20 leading-none">
                    <PixelCarOrange size={40} className="w-[36px] h-[23px] sm:w-[44px] sm:h-[28px]" />
                  </div>

                  {/* ============================================================
                      3. POP-UP RED TRAFFIC LIGHT (Rises From Ground Ahead of Car)
                     ============================================================ */}
                  <div
                    className="absolute left-[calc(100%+6px)] sm:left-[calc(100%+10px)] bottom-0 w-[26px] h-[54px] overflow-hidden pointer-events-none z-30 flex items-end justify-center"
                  >
                    {/* Ground Hatch Rim Slot */}
                    <div className="absolute bottom-0 left-1 right-1 h-[3px] bg-[#334155] border-t border-[#94A3B8] z-30" />

                    {/* Rising Traffic Light Assembly (Base + Pole + Signal Housing + 3 Lamps) */}
                    <div
                      ref={trafficLightAssemblyRef}
                      className="relative w-[24px] h-[52px] will-change-transform flex items-end justify-center"
                      style={{ transformOrigin: 'bottom center' }}
                    >
                      {/* Stepped Pixel Red Glow Aura Around Top Red Lamp */}
                      <div
                        ref={redLampGlowRef}
                        className="absolute top-[2px] left-1/2 -translate-x-1/2 w-[22px] h-[22px] pointer-events-none z-0"
                        style={{ opacity: 0.85 }}
                      >
                        <svg width="22" height="22" viewBox="0 0 22 22" shapeRendering="crispEdges">
                          <rect x="4" y="1" width="14" height="20" fill="#FF1E1E" opacity="0.22" />
                          <rect x="1" y="4" width="20" height="14" fill="#FF1E1E" opacity="0.22" />
                          <rect x="5" y="5" width="12" height="12" fill="#FF3B3B" opacity="0.38" />
                        </svg>
                      </div>

                      {/* 1-Shot Expanding Pixel Flash on Stop */}
                      <div
                        ref={redLampFlashRef}
                        className="absolute top-[1px] left-1/2 -translate-x-1/2 w-[24px] h-[24px] pointer-events-none z-20"
                        style={{ opacity: 0 }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" shapeRendering="crispEdges">
                          <rect x="10" y="0" width="4" height="24" fill="#FF5555" opacity="0.75" />
                          <rect x="0" y="10" width="24" height="4" fill="#FF5555" opacity="0.75" />
                          <rect x="6" y="6" width="12" height="12" fill="#FFFFFF" opacity="0.85" />
                        </svg>
                      </div>

                      {/* Main 16-Bit Pixel Traffic Signal SVG */}
                      <svg
                        width="24"
                        height="52"
                        viewBox="0 0 24 52"
                        shapeRendering="crispEdges"
                        className="relative z-10 overflow-visible"
                      >
                        {/* Top Visor Cap */}
                        <rect x="6" y="2" width="12" height="2" fill="#475569" />
                        <rect x="4" y="4" width="16" height="2" fill="#0F172A" />

                        {/* Traffic Light Dark Navy/Charcoal Housing */}
                        <rect x="4" y="6" width="16" height="28" fill="#0F172A" />
                        <rect x="5" y="7" width="14" height="26" fill="#1E293B" />
                        {/* Housing Pixel Highlight & Shadow Bevel */}
                        <rect x="5" y="7" width="1" height="26" fill="#475569" />
                        <rect x="18" y="7" width="1" height="26" fill="#090D16" />
                        {/* Side Signal Visor Ears */}
                        <rect x="2" y="8" width="2" height="3" fill="#334155" />
                        <rect x="20" y="8" width="2" height="3" fill="#334155" />
                        <rect x="2" y="16" width="2" height="3" fill="#334155" />
                        <rect x="20" y="16" width="2" height="3" fill="#334155" />
                        <rect x="2" y="24" width="2" height="3" fill="#334155" />
                        <rect x="20" y="24" width="2" height="3" fill="#334155" />

                        {/* Lamp 1 (TOP): Unlit Dark Red Base */}
                        <rect x="9" y="8" width="6" height="6" fill="#450A0A" />
                        <rect x="10" y="9" width="4" height="4" fill="#7F1D1D" />

                        {/* Lamp 1 (TOP): ILLUMINATED BRIGHT RED LAMP (Controlled by redLampOnRef) */}
                        <g ref={redLampOnRef}>
                          <rect x="8" y="8" width="8" height="6" fill="#DC2626" />
                          <rect x="9" y="7" width="6" height="8" fill="#FF1E1E" />
                          <rect x="10" y="9" width="4" height="4" fill="#FF6B6B" />
                          <rect x="10" y="9" width="2" height="2" fill="#FFFFFF" />
                        </g>

                        {/* Lamp 2 (MIDDLE): Unlit Dark Amber/Yellow Lamp */}
                        <rect x="9" y="17" width="6" height="6" fill="#422006" />
                        <rect x="10" y="18" width="4" height="4" fill="#713F12" />
                        <rect x="10" y="18" width="1" height="1" fill="#A16207" />

                        {/* Lamp 3 (BOTTOM): Unlit Dark Emerald/Green Lamp */}
                        <rect x="9" y="25" width="6" height="6" fill="#052E16" />
                        <rect x="10" y="26" width="4" height="4" fill="#14532D" />
                        <rect x="10" y="26" width="1" height="1" fill="#15803D" />

                        {/* Vertical Metallic Support Pole */}
                        <rect x="10" y="34" width="4" height="14" fill="#64748B" />
                        <rect x="10" y="34" width="1" height="14" fill="#CBD5E1" />
                        <rect x="13" y="34" width="1" height="14" fill="#334155" />
                        {/* Pole Joint Collar */}
                        <rect x="8" y="34" width="8" height="2" fill="#475569" />

                        {/* Mechanical Road Base Plate */}
                        <rect x="6" y="47" width="12" height="3" fill="#475569" />
                        <rect x="4" y="49" width="16" height="3" fill="#1E293B" />
                        <rect x="5" y="48" width="2" height="1" fill="#F47721" />
                        <rect x="17" y="48" width="2" height="1" fill="#F47721" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 5 Stage Detail Cards (Desktop) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="hidden lg:grid grid-cols-5 gap-4"
          >
            {steps.map((item) => (
              <motion.div
                key={item.num}
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : cardHoverMotion.whileHover}
                className="p-5 rounded-2xl bg-white border border-[#DCE3EC] shadow-sm hover:border-[#F47721]/50 transition-colors text-left space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#DCE3EC]">
                    <span className="text-xs font-mono font-bold text-[#F47721]">BƯỚC {item.num}</span>
                    <span className="text-[10px] font-mono text-[#64748B] uppercase truncate max-w-[90px]">{item.channel}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#142A43] mt-2">{item.title}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile Racetrack (Vertical) */}
        <div className="lg:hidden space-y-4 mb-12 sm:mb-16 relative pl-10 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-1.5 before:bg-[#142A43] before:border-l before:border-dashed before:border-[#FFE875]/40">
          {/* Vertical Progress Bar Driven by GSAP ScrollTrigger */}
          <div
            ref={mobileLineRef}
            className="absolute left-4 top-2 bottom-2 w-1.5 bg-gradient-to-b from-[#F47721] via-[#FFE875] to-[#159B68] origin-top z-0 shadow-xs"
            style={{ transform: 'scaleY(0)', transformOrigin: 'top' }}
          />
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={defaultViewport}
                transition={{ duration: 0.45, ease: EASINGS.gentleOut }}
                className="relative space-y-1 z-10"
              >
                <div className="absolute -left-[38px] top-4 w-7 h-7 rounded-xl bg-[#07182D] border-2 border-[#F47721] flex items-center justify-center text-[10px] font-mono font-bold text-[#F47721] shadow-md">
                  <Icon size={14} />
                </div>
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DCE3EC] shadow-sm space-y-1.5 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#F47721]">CHẶNG {item.num}</span>
                    <span className="text-[10px] font-mono text-[#64748B] uppercase">{item.channel}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#142A43]">{item.title}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Showcase Banner Box */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, ease: EASINGS.gentleOut }}
          className="rounded-3xl overflow-hidden border border-[#DCE3EC] bg-white shadow-sm max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 h-60 sm:h-72 lg:h-80 relative overflow-hidden bg-slate-900">
              <img
                ref={showcaseImgRef}
                src={salesConsultationBg}
                alt="Chuyên viên bán hàng tư vấn khách lái thử tại showroom ô tô"
                className="w-full h-full object-cover object-center select-none will-change-transform"
                loading="lazy"
              />
            </div>
            <div className="lg:col-span-5 p-6 sm:p-8 space-y-3 text-left">
              <div className="flex items-center gap-2 text-xs font-mono text-[#F47721] font-bold uppercase">
                <Award className="w-4 h-4" />
                <span>Giá trị bàn giao thực tế</span>
              </div>
              <h3 className="text-lg font-bold text-[#142A43]">Giải Phóng Năng Lực Sales Showroom</h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Khi AI đảm nhận khâu tiếp nhận ban đầu và sàng lọc chi tiết, đội ngũ nhân viên tư vấn bán xe có thể tập trung 100% thời gian cho trải nghiệm lái thử thực tế, giải thích trang bị xe và hoàn thiện hợp đồng đặt cọc.
              </p>
              <div className="pt-2">
                <a
                  href="#contact-form"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F47721] hover:text-[#E76513] transition-colors"
                >
                  <span>Tìm hiểu giải pháp bàn giao</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
