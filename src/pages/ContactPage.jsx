import React, { useEffect } from 'react';
import PageHeader from '../components/public/PageHeader';
import ConsultationForm from '../components/public/ConsultationForm';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-[#F8F9F5]">
      {/* Dedicated Page Header with Breadcrumbs */}
      <PageHeader
        badge="KẾT NỐI CHUYÊN GIA"
        title="Đăng Ký Tư Vấn & Khảo Sát Showroom"
        subtitle="Để lại thông tin để chuyên gia AutoLead Systems liên hệ lại trong vòng 15 phút, lên dự toán ROI và kế hoạch tích hợp riêng cho đại lý của bạn."
        breadcrumbCurrent="Đăng ký tư vấn"
      />

      <main className="flex-1">
        {/* Contact info cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white border border-[#DCE3EC] flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#F47721]" />
              </div>
              <div>
                <p className="text-[11px] text-[#64748B] font-medium">Hotline tư vấn</p>
                <p className="text-sm font-bold text-[#142A43]">1900 8888 (24/7)</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#DCE3EC] flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-[11px] text-[#64748B] font-medium">Email đối tác</p>
                <p className="text-sm font-bold text-[#142A43]">partner@autolead.vn</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#DCE3EC] flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-[11px] text-[#64748B] font-medium">Thời gian phản hồi</p>
                <p className="text-sm font-bold text-[#142A43]">Dưới 15 phút (SLA)</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#DCE3EC] flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-[11px] text-[#64748B] font-medium">Showroom mẫu</p>
                <p className="text-sm font-bold text-[#142A43]">Võ Văn Kiệt, Q. Bình Tân</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section: In-Page Consultation Form */}
        <ConsultationForm />
      </main>
    </div>
  );
}
