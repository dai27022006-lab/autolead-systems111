import React from 'react';
import { Calendar, CheckCircle2, ShieldCheck, Clock, Award, RotateCcw } from 'lucide-react';

export default function ImplementationProcess() {
  const phases = [
    {
      phase: 'Giai đoạn 1',
      days: 'Ngày 1 – 5',
      title: 'Khảo sát & Phân tích tác nghiệp',
      badge: 'Discovery',
      tasks: [
        'Khảo sát phân khúc xe chủ lực & chân dung người mua',
        'Phân tích quy trình tiếp nhận và điểm nghẽn hiện tại của Sales',
        'Thống nhất bộ tiêu chuẩn 7 điều kiện lịch hẹn đủ điều kiện',
        'Thu thập tài liệu thông số kỹ thuật xe và chính sách giá'
      ]
    },
    {
      phase: 'Giai đoạn 2',
      days: 'Ngày 6 – 15',
      title: 'Thiết kế & Cấu hình hệ thống',
      badge: 'Configuration',
      tasks: [
        'Xây dựng kịch bản hội thoại AI & phản hồi theo kịch bản xe',
        'Cấu hình phễu CRM và bảng Kanban 6 trạng thái',
        'Thiết lập thang điểm AI Lead Qualification Score',
        'Thiết lập lịch trực và hạn mức xe lái thử của showroom'
      ]
    },
    {
      phase: 'Giai đoạn 3',
      days: 'Ngày 16 – 25',
      title: 'Tích hợp kênh & Kiểm thử end-to-end',
      badge: 'Integration & Testing',
      tasks: [
        'Kết nối cổng tiếp nhận đa kênh (Meta Lead Ads, Zalo OA, Form)',
        'Kiểm thử kịch bản AI tự động liên hệ < 60 giây',
        'Mô phỏng 50 tình huống tương tác thực tế và tinh chỉnh lỗi',
        'Kiểm tra luồng thông báo bàn giao lịch hẹn sang điện thoại của Sales'
      ]
    },
    {
      phase: 'Giai đoạn 4',
      days: 'Ngày 26 – 30',
      title: 'Bàn giao, Đào tạo & Nghiệm thu',
      badge: 'Handover',
      tasks: [
        'Tổ chức buổi đào tạo trực tiếp cho đội ngũ Quản lý và Sales',
        'Bàn giao tài liệu hướng dẫn vận hành chuẩn SOP',
        'Bàn giao Dashboard đo lường hiệu suất và phễu chuyển đổi',
        'Ký biên bản nghiệm thu hệ thống và chính thức go-live'
      ]
    }
  ];

  return (
    <section id="roadmap" className="py-24 bg-[#0e141f] border-t border-b border-[#202735]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E2634] border border-[#C7A66A]/30 text-[#C7A66A] text-xs font-semibold uppercase tracking-wider mb-4">
            Lộ Trình Triển Khai Bài Bản
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Vận Hành Hoàn Chỉnh Trong <span className="gold-gradient-text">30 Ngày</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Quy trình triển khai 4 giai đoạn được quản trị chặt chẽ theo tiêu chuẩn dự án dịch vụ số, đảm bảo không làm gián đoạn công việc bán hàng hiện tại của đại lý.
          </p>
        </div>

        {/* 4 Phases Timeline */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((p, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#141B26] border border-slate-800 p-6 flex flex-col justify-between hover:border-[#C7A66A]/50 transition-all hover:bg-[#18212e] shadow-lg group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[#C7A66A]">{p.phase}</span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {p.badge}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-white font-extrabold text-lg mb-1">
                  <Clock className="w-4 h-4 text-[#C7A66A]" />
                  <span>{p.days}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-200 mt-2 mb-4 group-hover:text-[#C7A66A] transition-colors">
                  {p.title}
                </h3>

                <ul className="space-y-2.5 pt-4 border-t border-slate-800">
                  {p.tasks.map((task, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2 text-xs text-slate-400 leading-normal">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A66A] shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
                Milestone Phase 0{idx + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Official Guarantee Banner */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-[#171D27] via-[#202735] to-[#171D27] border-2 border-[#C7A66A]/40 p-8 sm:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7A66A]/20 text-[#C7A66A] text-xs font-bold uppercase tracking-wider mb-3">
                <ShieldCheck className="w-4 h-4" />
                Cam Kết Dịch Vụ Chính Thức (Guarantee)
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                “AutoLead Systems cam kết hoàn thành triển khai và bàn giao hệ thống tiếp nhận, chăm sóc, sàng lọc và hỗ trợ đặt lịch lái thử trong vòng 30 ngày.”
              </h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <RotateCcw className="w-4 h-4 text-[#C7A66A] shrink-0 mt-0.5" />
                  <span>Nếu chưa đạt nghiệm thu, tiếp tục khắc phục miễn phí trong <strong>15 ngày tiếp theo</strong>.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-[#C7A66A] shrink-0 mt-0.5" />
                  <span>Nếu vẫn không đạt theo thỏa thuận hợp đồng, thực hiện <strong>hoàn phí triển khai</strong> minh bạch.</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0f1520] border border-slate-800 text-center shrink-0 w-full lg:w-64">
              <span className="text-[11px] text-slate-400 block">Cam kết về năng lực vận hành:</span>
              <p className="text-xs font-medium text-slate-300 mt-1">
                Không cam kết khống số lượng xe chốt được; đảm bảo chất lượng hệ thống tác nghiệp và quy trình sàng lọc lịch hẹn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
