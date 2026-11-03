import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/public/PageHeader';
import Pricing from '../components/public/Pricing';
import { CalendarCheck, FileText } from 'lucide-react';

export default function PricingPage({ onOpenContact }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-[#F8F9F5]">
      {/* Dedicated Page Header with Breadcrumbs */}
      <PageHeader
        badge="BẢNG GIÁ THEO HIỆU QUẢ"
        title="Bảng Giá Dịch Vụ CPA 300.000đ & Dự Toán ROI"
        subtitle="Mô hình tính phí dựa trên kết quả thực tế (Performance-based). Đại lý chỉ trả phí cho khách hàng tiềm năng đã được thẩm định đạt chuẩn TQM."
        breadcrumbCurrent="Bảng giá & Dự toán ROI"
      />

      <main className="flex-1">
        {/* Section: Pricing & Dynamic ROI Calculator */}
        <Pricing onOpenContact={onOpenContact} />

        {/* Next Step Navigation Banner */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#DCE3EC]">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-[#142A43]">
              Sẵn sàng triển khai cho showroom của bạn?
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Xem lộ trình 30 ngày đưa hệ thống vào vận hành hoặc đăng ký nhận buổi khảo sát trực tiếp.
            </p>
            <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
              <Link
                to="/roadmap"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#142A43] hover:bg-[#07182D] shadow-sm transition-all"
              >
                <CalendarCheck className="w-4 h-4 text-[#F47721]" />
                <span>Xem Lộ trình 30 ngày Go-Live →</span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#F47721] hover:bg-[#E76513] shadow-sm transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Đăng ký nhận tư vấn Showroom →</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
