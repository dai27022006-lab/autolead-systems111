import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/public/PageHeader';
import Roadmap from '../components/public/Roadmap';
import { CheckCircle2, FileText } from 'lucide-react';

export default function RoadmapPage() {
  return (
    <div className="flex-1 flex flex-col bg-[#F8F9F5]">
      {/* Dedicated Page Header with Breadcrumbs */}
      <PageHeader
        badge="KẾ HOẠCH TRIỂN KHAI"
        title="Lộ Trình 30 Ngày Đưa Showroom Vào Vận Hành"
        subtitle="Phương pháp luận tinh gọn chia làm 4 giai đoạn rõ ràng: Khảo sát & kết nối API, đào tạo AI, chạy thử nghiệm kiểm toán và chuyển giao toàn diện."
        breadcrumbCurrent="Lộ trình 30 ngày"
      />

      <main className="flex-1">
        {/* Section: 30-Day Roadmap */}
        <Roadmap />

        {/* Next Step Navigation Banner */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#DCE3EC]">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-[#142A43]">
              Bạn còn băn khoăn về các điều khoản cam kết?
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Đọc 7 tiêu chuẩn chất lượng TQM và các câu hỏi thường gặp hoặc gửi thông tin để chuyên gia giải đáp.
            </p>
            <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
              <Link
                to="/faq"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#142A43] hover:bg-[#07182D] shadow-sm transition-all"
              >
                <CheckCircle2 className="w-4 h-4 text-[#75A94C]" />
                <span>Xem Cam kết chất lượng & FAQ →</span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#F47721] hover:bg-[#E76513] shadow-sm transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Đăng ký tư vấn trực tiếp →</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
