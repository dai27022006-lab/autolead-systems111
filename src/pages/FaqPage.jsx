import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/public/PageHeader';
import CommitmentsAndFaq from '../components/public/CommitmentsAndFaq';
import { FileText, Sparkles } from 'lucide-react';

export default function FaqPage() {
  return (
    <div className="flex-1 flex flex-col bg-[#F8F9F5]">
      {/* Dedicated Page Header with Breadcrumbs */}
      <PageHeader
        badge="BẢO ĐẢM DỊCH VỤ"
        title="Cam Kết Chất Lượng TQM & Giải Đáp Thắc Mắc"
        subtitle="Cam kết hoàn tiền 100% nếu không đạt KPI cam kết trong 14 ngày đầu tiên. Minh bạch tuyệt đối các điều khoản dịch vụ và chính sách dữ liệu."
        breadcrumbCurrent="Cam kết & FAQ"
      />

      <main className="flex-1">
        {/* Section: Commitments & FAQ */}
        <CommitmentsAndFaq />

        {/* Next Step Navigation Banner */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#DCE3EC]">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-[#142A43]">
              Bạn vẫn còn câu hỏi chưa được giải đáp?
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Đừng ngần ngại đăng ký buổi trao đổi 30 phút cùng chuyên gia giải pháp ô tô của AutoLead Systems.
            </p>
            <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#F47721] hover:bg-[#E76513] shadow-sm transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Đăng ký nhận tư vấn ngay →</span>
              </Link>
              <Link
                to="/demo"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#142A43] bg-[#F8F9F5] hover:bg-slate-100 border border-[#DCE3EC] transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#F47721]" />
                <span>Xem Demo Khách Mua Xe</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
