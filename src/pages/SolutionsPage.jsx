import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/public/PageHeader';
import Problems from '../components/public/Problems';
import Solutions from '../components/public/Solutions';
import { ArrowRight, Zap, BarChart3 } from 'lucide-react';

export default function SolutionsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-[#F8F9F5]">
      {/* Dedicated Page Header with Breadcrumbs */}
      <PageHeader
        badge="PHÂN TÍCH TÁC NGHIỆP"
        title="Thực Trạng Showroom & 6 Giải Pháp Công Nghệ"
        subtitle="Khắc phục nút thắt chi phí marketing leo thang, tỷ lệ hủy lịch lái thử cao và lãng phí thời gian telesale truyền thống bằng tự động hóa AI."
        breadcrumbCurrent="Thách thức & Giải pháp"
      />

      <main className="flex-1">
        {/* Section 1: Problems */}
        <Problems />

        {/* Section 2: 6 Core Solutions */}
        <Solutions />

        {/* Next Step Navigation Banner */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#DCE3EC]">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-[#142A43]">
              Bạn đã hiểu giải pháp. Tiếp theo hãy xem cách thức vận hành:
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Khám phá quy trình 5 bước Lean Racetrack hoặc xem chính sách giá gói thuê bao Standard chủ lực 4.000.000đ/tháng.
            </p>
            <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
              <Link
                to="/workflow"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#142A43] hover:bg-[#07182D] shadow-sm transition-all"
              >
                <Zap className="w-4 h-4 text-[#F47721]" />
                <span>Xem Quy trình 5 bước Lean →</span>
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#142A43] bg-[#F8F9F5] hover:bg-slate-100 border border-[#DCE3EC] transition-all"
              >
                <BarChart3 className="w-4 h-4 text-[#F47721]" />
                <span>Xem Bảng giá & Dự toán ROI →</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
