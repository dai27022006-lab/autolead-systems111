import React, { useState } from 'react';
import {
  Palette,
  Sparkles,
  TrendingUp,
  Plus,
  Play,
  Pause,
  Copy,
  Check,
  Megaphone,
  Layers,
  DollarSign,
  Target
} from 'lucide-react';
import { VEHICLE_OPTIONS } from '../../data/mockData.js';

export default function CampaignManagement({ campaigns, onAddCampaign }) {
  const [selectedVehicle, setSelectedVehicle] = useState(VEHICLE_OPTIONS[0]);
  const [selectedAngle, setSelectedAngle] = useState('Khẳng định Đẳng cấp Doanh nhân');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const [aiCreativeResult, setAiCreativeResult] = useState({
    headline: 'Khẳng Định Vị Thế Dẫn Đầu | Đặt Lịch Lái Thử Mercedes-Benz GLC 300 Ngay Hôm Nay',
    facebookCopy: '🚘 Bạn đang tìm kiếm mẫu SUV hạng sang hoàn hảo cho gia đình và công việc? Mercedes-Benz GLC 300 4MATIC 2024 sẵn sàng đưa bạn đến những trải nghiệm vận hành đỉnh cao.\n\n✨ Đặc quyền riêng khi đăng ký trong tuần này:\n• Trải nghiệm lái thử tận nơi hoặc tại showroom sang trọng\n• Tặng gói bảo hiểm thân vỏ & ưu đãi lệ phí trước bạ\n• Hỗ trợ tài chính lãi suất đặc quyền từ tập đoàn\n\n👉 Nhấn "Đăng Ký Ngay" để AI giữ lịch lái thử riêng và nhận brochure thông số độc quyền!',
    visualPrompt: 'Luxury dark studio lighting, sleek Mercedes-Benz GLC 300 4MATIC in Polar White, cinematic reflection on polished marble floor, modern architectural background, 8k resolution, ultra-detailed.',
    callHook: 'Dạ em chào anh/chị [Tên khách], em là trợ lý tư vấn số của showroom Mercedes. Em thấy mình vừa đăng ký quan tâm mẫu GLC 300 màu Trắng. Dạ không biết cuối tuần này anh/chị tiện lái thử sáng hay chiều để em giữ xe riêng cho mình ạ?'
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCampaignForm, setNewCampaignForm] = useState({
    name: 'Mercedes C300 AMG - Phong Cách Thể Thao',
    vehicleSegment: 'Luxury Sedan',
    channels: ['Meta Ads', 'Google Search'],
    budget: 20000000,
    targetAudience: 'Doanh nhân trẻ 28-45 tuổi'
  });

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    if (!newCampaignForm.name.trim()) return;
    if (onAddCampaign) {
      onAddCampaign({
        ...newCampaignForm,
        leadsGenerated: 0,
        qualifiedLeads: 0,
        appointmentsBooked: 0,
        status: 'Active',
        cpa: 300000
      });
    }
    setIsAddModalOpen(false);
  };

  const handleGenerateCreative = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let head = '';
      let copy = '';
      let prompt = '';
      let hook = '';

      if (selectedAngle.includes('Đẳng cấp')) {
        head = `Trải Nghiệm Xứng Tầm Thượng Lưu | Đăng Ký Lái Thử ${selectedVehicle}`;
        copy = `⭐ Biểu tượng của sự quyền lực và tinh tế: ${selectedVehicle}.\nĐược chế tác tỉ mỉ với công nghệ tối tân và khoang lái chuẩn thương gia.\n\nĐại lý trân trọng kính mời quý khách hàng trải nghiệm lái thử thực tế tại showroom.\nƯu đãi độc quyền và gói chăm sóc xe chính hãng chỉ áp dụng cho 20 khách hàng đăng ký sớm nhất.`;
        prompt = `Hyper-realistic luxury car shoot of ${selectedVehicle}, sunrise lighting over modern city skyline, premium champagne gold reflections, ultra-high end automotive aesthetic.`;
        hook = `Chào anh/chị, em liên hệ từ showroom xe sang. Em thấy anh/chị quan tâm trải nghiệm ${selectedVehicle}. Chiều thứ Bảy này bên em có xe sẵn tại phòng chờ VIP, anh/chị ghé thưởng thức cà phê và chạy thử nhé?`;
      } else if (selectedAngle.includes('Ưu đãi')) {
        head = `Đặc Quyền Tài Chính 0% Lãi Suất | Sở Hữu ${selectedVehicle} Dễ Dàng`;
        copy = `Cơ hội sở hữu ${selectedVehicle} với gói hỗ trợ lệ phí trước bạ và vay 85% giá trị xe.\nNhận ngay bảng dự toán chi phí lăn bánh chi tiết và đặt lịch lái thử tận nơi trong 2 giờ.`;
        prompt = `Professional advertising banner style, sleek ${selectedVehicle} on coastal highway, dynamic motion blur, overlay badge "Ưu Đãi Đặc Quyền 2026".`;
        hook = `Chào anh/chị, em là AI hỗ trợ từ showroom. Em gửi bảng tính lăn bánh và ưu đãi thuế của dòng ${selectedVehicle} qua Zalo cho mình rồi ạ. Anh/chị xem qua nhé!`;
      } else {
        head = `Cam Kết Kiểm Định 111 Điểm | ${selectedVehicle} Lướt Cực Đẹp`;
        copy = `Mua xe lướt an tâm tuyệt đối như xe mới: Không đâm đụng, không ngập nước, bảo hành chính hãng.\nĐăng ký kiểm tra xe và lái thử ngay hôm nay để nhận báo giá tốt nhất thị trường.`;
        prompt = `Showroom inspection setting, bright clean lighting, pristine certified pre-owned ${selectedVehicle}, certified inspection badge icon, pristine condition.`;
        hook = `Chào anh/chị, chiếc ${selectedVehicle} lướt này hồ sơ pháp lý cực kỳ sạch, mới lăn bánh số km ít. Anh/chị tiện ghé xem xe và lái thử trong tuần này không ạ?`;
      }

      setAiCreativeResult({
        headline: head,
        facebookCopy: copy,
        visualPrompt: prompt,
        callHook: hook
      });
      setIsGenerating(false);
    }, 700);
  };

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formatVND = (num) => new Intl.NumberFormat('vi-VN').format(num) + ' VNĐ';

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F47721]"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#F47721]">
              Chức Năng 1 Trong Lời Chào Hàng
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-[#142A43] mt-0.5">
            AI Advertising & Creative Studio (Quản Trị Chiến Dịch)
          </h2>
          <p className="text-xs text-[#64748B]">
            Hỗ trợ sản xuất nội dung, hình ảnh quảng cáo đa phiên bản bằng AI và theo dõi hiệu quả chi phí lịch hẹn
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F47721] hover:bg-[#E76513] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo Chiến Dịch Mới</span>
        </button>
      </div>

      {/* Campaign List Table */}
      <div className="rounded-2xl bg-white border border-[#DCE3EC] p-5 sm:p-6 shadow-xs">
        <h3 className="text-base font-bold text-[#142A43] mb-4 flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-[#F47721]" />
          Các Chiến Dịch Quảng Cáo Đang Vận Hành ({campaigns.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#142A43]">
            <thead className="bg-[#F8F9F5] text-[#64748B] uppercase text-[10px] font-bold tracking-wider border-b border-[#DCE3EC]">
              <tr>
                <th className="py-3 px-4">Tên Chiến Dịch</th>
                <th className="py-3 px-4">Phân Khúc Xe</th>
                <th className="py-3 px-4">Kênh Quảng Cáo</th>
                <th className="py-3 px-4">Ngân Sách</th>
                <th className="py-3 px-4">Lead Thô</th>
                <th className="py-3 px-4">Lịch Hẹn Đạt</th>
                <th className="py-3 px-4">CPA / Lịch Hẹn</th>
                <th className="py-3 px-4">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] font-medium">
              {campaigns.map((cmp) => (
                <tr key={cmp.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#142A43]">{cmp.name}</td>
                  <td className="py-3.5 px-4 text-[#64748B]">{cmp.vehicleSegment}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex gap-1.5 flex-wrap">
                      {cmp.channels?.map((ch, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-[10px] text-[#64748B] font-semibold border border-[#DCE3EC]">
                          {ch}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono">{formatVND(cmp.budget)}</td>
                  <td className="py-3.5 px-4 font-bold text-[#142A43]">{cmp.leadsGenerated}</td>
                  <td className="py-3.5 px-4 font-black text-[#F47721]">{cmp.appointmentsBooked}</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-700 font-bold">{formatVND(cmp.cpa || 300000)}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold">
                      {cmp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI CREATIVE STUDIO TOOL */}
      <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-[#DCE3EC] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0] mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#F47721] border border-orange-200 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Công Cụ Sáng Tạo AI (Creative Generator)
            </div>
            <h3 className="text-xl font-bold text-[#142A43]">Tạo Nội Dung & Kịch Bản Quảng Cáo Tự Động Bằng AI</h3>
            <p className="text-xs text-[#64748B] mt-1">
              Ứng dụng nguyên lý AdCreative.ai để tối ưu thông điệp đánh trúng tâm lý người mua xe sang và xe lướt
            </p>
          </div>

          <button
            onClick={handleGenerateCreative}
            disabled={isGenerating}
            className="px-6 py-3 rounded-xl bg-[#F47721] hover:bg-[#E76513] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer shrink-0 min-h-[44px] transition-all"
          >
            {isGenerating ? (
              <span>AI đang khởi tạo nội dung...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Khởi Tạo Nội Dung Quảng Cáo Bằng AI</span>
              </>
            )}
          </button>
        </div>

        {/* Input Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#142A43] mb-2">
              Dòng xe mục tiêu chiến dịch
            </label>
            <select
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-[#142A43] text-base sm:text-xs outline-none focus:border-[#F47721] cursor-pointer"
            >
              {VEHICLE_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#142A43] mb-2">
              Góc tiếp cận thông điệp (Angle)
            </label>
            <select
              value={selectedAngle}
              onChange={(e) => setSelectedAngle(e.target.value)}
              className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-[#142A43] text-base sm:text-xs outline-none focus:border-[#F47721] cursor-pointer"
            >
              <option value="Khẳng định Đẳng cấp Doanh nhân">Khẳng định Đẳng cấp & Vị thế Doanh nhân</option>
              <option value="Ưu đãi Tài chính 0% & Thuế trước bạ">Ưu đãi Tài chính 0% & Hỗ trợ Lệ phí trước bạ</option>
              <option value="Xe Lướt Kiểm Định 111 Điểm Bảo Hành Chính Hãng">Xe Lướt Kiểm Định 111 Điểm Bảo Hành Chính Hãng</option>
              <option value="Trải Nghiệm Lái Thử Tận Nơi Trong 2 Giờ">Trải Nghiệm Lái Thử Tận Nơi Trong 2 Giờ</option>
            </select>
          </div>
        </div>

        {/* Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ad Headline & Facebook Copy */}
          <div className="p-5 rounded-2xl bg-[#F8F9F5] border border-[#DCE3EC] space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold uppercase text-[#F47721]">Tiêu Đề Quảng Cáo (Ad Headline)</span>
                <button
                  onClick={() => copyToClipboard(aiCreativeResult.headline, 'headline')}
                  className="text-xs text-[#64748B] hover:text-[#142A43] flex items-center gap-1 cursor-pointer"
                >
                  {copiedField === 'headline' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'headline' ? 'Đã sao chép' : 'Sao chép'}</span>
                </button>
              </div>
              <p className="text-sm font-bold text-[#142A43] bg-white p-3 rounded-xl border border-[#DCE3EC]">
                {aiCreativeResult.headline}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold uppercase text-[#F47721]">Nội Dung Bài Viết (Ad Copywriting)</span>
                <button
                  onClick={() => copyToClipboard(aiCreativeResult.facebookCopy, 'copy')}
                  className="text-xs text-[#64748B] hover:text-[#142A43] flex items-center gap-1 cursor-pointer"
                >
                  {copiedField === 'copy' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'copy' ? 'Đã sao chép' : 'Sao chép'}</span>
                </button>
              </div>
              <div className="text-xs text-[#142A43] bg-white p-3 rounded-xl border border-[#DCE3EC] whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
                {aiCreativeResult.facebookCopy}
              </div>
            </div>
          </div>

          {/* Visual Prompt & Call Hook */}
          <div className="p-5 rounded-2xl bg-[#F8F9F5] border border-[#DCE3EC] space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold uppercase text-[#F47721]">Visual Prompt (Midjourney / AdCreative)</span>
                <button
                  onClick={() => copyToClipboard(aiCreativeResult.visualPrompt, 'prompt')}
                  className="text-xs text-[#64748B] hover:text-[#142A43] flex items-center gap-1 cursor-pointer"
                >
                  {copiedField === 'prompt' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'prompt' ? 'Đã sao chép' : 'Sao chép'}</span>
                </button>
              </div>
              <p className="text-xs font-mono text-[#475569] bg-white p-3 rounded-xl border border-[#DCE3EC] italic">
                "{aiCreativeResult.visualPrompt}"
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold uppercase text-[#F47721]">Kịch Bản AI Chào Khách Lần 1 (Opening Hook)</span>
                <button
                  onClick={() => copyToClipboard(aiCreativeResult.callHook, 'hook')}
                  className="text-xs text-[#64748B] hover:text-[#142A43] flex items-center gap-1 cursor-pointer"
                >
                  {copiedField === 'hook' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'hook' ? 'Đã sao chép' : 'Sao chép'}</span>
                </button>
              </div>
              <p className="text-xs text-[#142A43] bg-white p-3 rounded-xl border border-[#DCE3EC] leading-relaxed">
                {aiCreativeResult.callHook}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ADD CAMPAIGN MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-[#DCE3EC] rounded-2xl sm:rounded-3xl p-4 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl text-[#142A43]">
            <h3 className="text-lg sm:text-xl font-bold text-[#142A43] mb-1">Tạo Chiến Dịch Quảng Cáo AI Mới</h3>
            <p className="text-xs text-[#64748B] mb-5">Khởi tạo chiến dịch marketing để bắt đầu thu hút lead cho showroom</p>

            <form onSubmit={handleCreateCampaign} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#142A43] font-bold mb-1">Tên chiến dịch *</label>
                <input
                  type="text"
                  required
                  value={newCampaignForm.name}
                  onChange={(e) => setNewCampaignForm({ ...newCampaignForm, name: e.target.value })}
                  placeholder="VD: Mercedes GLC 300 - Ưu Đãi Tháng 11"
                  className="w-full px-3 py-2.5 sm:py-2 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-base sm:text-xs text-[#142A43] outline-none focus:border-[#F47721] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[#142A43] font-bold mb-1">Phân khúc xe</label>
                  <select
                    value={newCampaignForm.vehicleSegment}
                    onChange={(e) => setNewCampaignForm({ ...newCampaignForm, vehicleSegment: e.target.value })}
                    className="w-full px-3 py-2.5 sm:py-2 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-base sm:text-xs text-[#142A43] outline-none focus:border-[#F47721] cursor-pointer"
                  >
                    <option value="Luxury SUV">Luxury SUV</option>
                    <option value="Luxury Sedan">Luxury Sedan</option>
                    <option value="Xe lướt hạng sang">Xe lướt hạng sang</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#142A43] font-bold mb-1">Ngân sách (VNĐ)</label>
                  <input
                    type="number"
                    min="1000000"
                    step="1000000"
                    value={newCampaignForm.budget}
                    onChange={(e) => setNewCampaignForm({ ...newCampaignForm, budget: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 sm:py-2 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-base sm:text-xs text-[#142A43] outline-none focus:border-[#F47721] focus:bg-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#142A43] font-bold mb-1">Đối tượng mục tiêu (Target Audience)</label>
                <input
                  type="text"
                  value={newCampaignForm.targetAudience}
                  onChange={(e) => setNewCampaignForm({ ...newCampaignForm, targetAudience: e.target.value })}
                  placeholder="VD: Doanh nhân 30-50 tuổi, quan tâm xe thể thao sang trọng"
                  className="w-full px-3 py-2.5 sm:py-2 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-base sm:text-xs text-[#142A43] outline-none focus:border-[#F47721] focus:bg-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#142A43] font-semibold cursor-pointer transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#F47721] text-white font-bold hover:bg-[#E76513] cursor-pointer transition-colors shadow-xs"
                >
                  Khởi Tạo Chiến Dịch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
