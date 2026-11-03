import React, { useEffect } from 'react';
import Hero from '../components/public/Hero';
import Highlights from '../components/public/Highlights';
import Problems from '../components/public/Problems';
import Solutions from '../components/public/Solutions';
import HowItWorks from '../components/public/HowItWorks';
import Pricing from '../components/public/Pricing';
import Roadmap from '../components/public/Roadmap';
import CommitmentsAndFaq from '../components/public/CommitmentsAndFaq';
import ConsultationForm from '../components/public/ConsultationForm';

export default function HomePage({ onOpenContact }) {
  useEffect(() => {
    // If there is an anchor hash in the URL, smooth scroll to it
    const hash = window.location.hash;
    if (hash && hash.includes('#') && !hash.endsWith('#/')) {
      const parts = hash.split('#');
      const targetId = parts[parts.length - 1];
      if (targetId && targetId !== '/') {
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      {/* 1. Hero: AI Qualification & Value Proposition */}
      <Hero onOpenContact={onOpenContact} />

      {/* 2. Highlights: Key Operational Metrics */}
      <Highlights />

      {/* 3. Problems: Showroom Pain Points */}
      <Problems />

      {/* 4. Solutions: 6 Modules & Embedded AI Widget Architecture */}
      <Solutions />

      {/* 5. How It Works: 5-Step Lean Workflow with ZingSpeed Nitro Racetrack */}
      <HowItWorks />

      {/* 6. Pricing: CPA 300K Model & Interactive ROI Calculator */}
      <Pricing onOpenContact={onOpenContact} />

      {/* 7. Roadmap: 30-Day Deployment Plan */}
      <Roadmap />

      {/* 8. Commitments & FAQ: 7 TQM Standards & Answers */}
      <CommitmentsAndFaq />

      {/* 9. Consultation Form: B2B Lead Capture Form */}
      <ConsultationForm />
    </div>
  );
}
