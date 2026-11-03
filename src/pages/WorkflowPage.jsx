import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/public/PageHeader';
import HowItWorks from '../components/public/HowItWorks';
import { ArrowRight, Sparkles, BarChart3 } from 'lucide-react';

export default function WorkflowPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-[#F8F9F5]">
      {/* Dedicated Page Header with Breadcrumbs */}
      <PageHeader
        badge="ĐƯỜNG ĐUA TÁC NGHIỆP"
        title="Quy Trình Vận Hành 5 Bước (Lean Racetrack)"
        subtitle="Chuẩn hóa luồng tác nghiệp từ tiếp cận đa kênh, sàng lọc theo 7 tiêu chí TQM đến điều phối lịch hẹn lái thử và ký hợp đồng tại showroom."
        breadcrumbCurrent="Quy trình 5 bước"
      />

      <main className="flex-1">
        {/* Section: 5-Step Operational Racetrack */}
        <HowItWorks />

        {/* Next Step Navigation Banner */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#DCE3EC]">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-[#142A43]">
              Bạn muốn trải nghiệm trực tiếp quy trình này?
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Trực tiếp trải nghiệm Showroom ô tô có nhúng AI Widget hoặc kiểm tra bảng giá gói thuê bao B2B chính thức.
            </p>
            <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
              <Link
                to="/demo"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#F47721] hover:bg-[#E76513] shadow-sm transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Trải nghiệm Cổng Khách Hàng (Demo) →</span>
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#142A43] bg-[#F8F9F5] hover:bg-slate-100 border border-[#DCE3EC] transition-all"
              >
                <BarChart3 className="w-4 h-4 text-[#F47721]" />
                <span>Xem Bảng giá & ROI →</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
