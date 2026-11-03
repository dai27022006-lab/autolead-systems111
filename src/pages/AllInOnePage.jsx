import React from 'react';
import Hero from '../components/public/Hero';
import Highlights from '../components/public/Highlights';
import Problems from '../components/public/Problems';
import Solutions from '../components/public/Solutions';
import HowItWorks from '../components/public/HowItWorks';
import Pricing from '../components/public/Pricing';
import Roadmap from '../components/public/Roadmap';
import CommitmentsAndFaq from '../components/public/CommitmentsAndFaq';
import ConsultationForm from '../components/public/ConsultationForm';
import { Layers } from 'lucide-react';

export default function AllInOnePage({ onOpenContact }) {
  return (
    <div className="flex-1 flex flex-col">
      {/* Informational Banner */}
      <div className="bg-[#142A43] text-white py-2 px-4 text-center text-xs border-b border-white/10 flex items-center justify-center gap-2">
        <Layers className="w-3.5 h-3.5 text-[#F47721]" />
        <span>Bạn đang xem chế độ <strong>Toàn bộ nội dung liên tục (All-in-one View)</strong></span>
      </div>

      <Hero onOpenContact={onOpenContact} />
      <Highlights />
      <Problems />
      <Solutions />
      <HowItWorks />
      <Pricing onOpenContact={onOpenContact} />
      <Roadmap />
      <CommitmentsAndFaq />
      <ConsultationForm />
    </div>
  );
}
