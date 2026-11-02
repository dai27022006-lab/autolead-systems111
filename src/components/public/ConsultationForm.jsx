import React, { useState } from 'react';
import {
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Send,
  Loader2,
  Sparkles
} from 'lucide-react';
import { PixelShowroom } from './PixelIcons';
import { submitShowroomLead } from '../../services/supabase';

export default function ConsultationForm({ isModal = false, onClose }) {
  const [formData, setFormData] = useState({
    showroom_name: '',
    contact_name: '',
    phone: '',
    email: '',
    showroom_type: 'luxury',
    showroom_location: 'TP. Hồ Chí Minh',
    monthly_lead_volume: '50-150',
    consultation_need: '',
    consent: false
  });

  const [selectedNeeds, setSelectedNeeds] = useState([
    'Quản lý và sàng lọc lead',
    'Tối ưu quy trình đặt lịch lái thử'
  ]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [successInfo, setSuccessInfo] = useState(null);

  const needOptions = [
    'Quản lý và sàng lọc lead',
    'Tối ưu quy trình đặt lịch lái thử',
    'Tìm hiểu dịch vụ AutoLead Systems'
  ];

  const toggleNeed = (option) => {
    if (selectedNeeds.includes(option)) {
      setSelectedNeeds(selectedNeeds.filter((n) => n !== option));
    } else {
      setSelectedNeeds([...selectedNeeds, option]);
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.showroom_name.trim()) {
      errs.showroom_name = 'Vui lòng nhập tên showroom hoặc đại lý của bạn.';
    }
    if (!formData.contact_name.trim()) {
      errs.contact_name = 'Vui lòng nhập họ và tên người đại diện.';
    }
    const cleanPhone = formData.phone.replace(/\s+/g, '');
    if (!cleanPhone) {
      errs.phone = 'Vui lòng nhập số điện thoại liên hệ.';
    } else if (!/^(0[3|5|7|8|9])[0-9]{8}$/.test(cleanPhone)) {
      errs.phone = 'Số điện thoại không đúng định dạng di động Việt Nam (10 chữ số).';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Địa chỉ email không hợp lệ.';
    }
    if (!formData.consent) {
      errs.consent = 'Vui lòng xác nhận đồng ý để AutoLead Systems liên hệ tư vấn.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const payload = {
        ...formData,
        consultation_need: selectedNeeds.join(', ') || 'Tư vấn tổng quan hệ thống'
      };

      const result = await submitShowroomLead(payload);
      if (result && result.success) {
        setSubmitSuccess(true);
        setSuccessInfo(result);
      } else {
        setErrors({
          form: result?.error || 'Không thể lưu thông tin. Vui lòng kiểm tra lại kết nối mạng.'
        });
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setErrors({ form: 'Có lỗi xảy ra trong quá trình gửi yêu cầu. Vui lòng thử lại.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const content = (
    <div className="space-y-6">
      {submitSuccess ? (
        <div className="p-8 text-center space-y-4 rounded-3xl bg-emerald-50 border border-emerald-200">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-emerald-950">Đăng Ký Thành Công!</h3>
            <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
              Cảm ơn quý đại lý <strong>{formData.showroom_name}</strong> và đại diện{' '}
              <strong>{formData.contact_name}</strong>. Chuyên viên AutoLead Systems sẽ liên hệ qua số{' '}
              <strong>{formData.phone}</strong> trong vòng 30 phút làm việc.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/80 border border-emerald-200 text-xs font-mono text-emerald-900 inline-block">
            Nguồn lưu trữ: {successInfo?.source === 'supabase' ? 'Supabase Database' : 'AutoLead Cloud'} • Trạng thái: Đã tiếp nhận
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setSubmitSuccess(false);
                setFormData({
                  showroom_name: '',
                  contact_name: '',
                  phone: '',
                  email: '',
                  showroom_type: 'luxury',
                  showroom_location: 'TP. Hồ Chí Minh',
                  monthly_lead_volume: '50-150',
                  consultation_need: '',
                  consent: false
                });
                if (onClose) onClose();
              }}
              className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-[#F47721] hover:bg-[#E76513] transition-all cursor-pointer shadow-xs"
            >
              Gửi yêu cầu khác
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {errors.form && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errors.form}</span>
            </div>
          )}

          {/* Row 1: Showroom Name & Contact Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="showroom_name" className="block text-xs font-semibold text-[#142A43] mb-1.5">
                Tên đại lý / Showroom <span className="text-[#F47721]">*</span>
              </label>
              <div className="relative">
                <input
                  id="showroom_name"
                  type="text"
                  value={formData.showroom_name}
                  onChange={(e) => setFormData({ ...formData, showroom_name: e.target.value })}
                  placeholder="VD: Mercedes Haxaco Sài Gòn"
                  disabled={isSubmitting}
                  className={`w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-[#F8F9F5] border text-base sm:text-xs text-[#142A43] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:ring-1 transition-all disabled:opacity-50 ${
                    errors.showroom_name
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-[#DCE3EC] focus:border-[#F47721] focus:ring-[#F47721]'
                  }`}
                />
                <Building2 className="w-4 h-4 text-[#64748B] absolute right-3.5 top-3" />
              </div>
              {errors.showroom_name && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.showroom_name}</p>
              )}
            </div>

            <div>
              <label htmlFor="contact_name" className="block text-xs font-semibold text-[#142A43] mb-1.5">
                Tên người liên hệ <span className="text-[#F47721]">*</span>
              </label>
              <div className="relative">
                <input
                  id="contact_name"
                  type="text"
                  value={formData.contact_name}
                  onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                  placeholder="VD: Trần Tuấn Anh (Trưởng phòng)"
                  disabled={isSubmitting}
                  className={`w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-[#F8F9F5] border text-base sm:text-xs text-[#142A43] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:ring-1 transition-all disabled:opacity-50 ${
                    errors.contact_name
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-[#DCE3EC] focus:border-[#F47721] focus:ring-[#F47721]'
                  }`}
                />
                <User className="w-4 h-4 text-[#64748B] absolute right-3.5 top-3" />
              </div>
              {errors.contact_name && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.contact_name}</p>
              )}
            </div>
          </div>

          {/* Row 2: Phone & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-[#142A43] mb-1.5">
                Số điện thoại / Zalo <span className="text-[#F47721]">*</span>
              </label>
              <div className="relative">
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="VD: 0912 345 678"
                  disabled={isSubmitting}
                  className={`w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-[#F8F9F5] border text-base sm:text-xs text-[#142A43] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:ring-1 transition-all disabled:opacity-50 ${
                    errors.phone
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-[#DCE3EC] focus:border-[#F47721] focus:ring-[#F47721]'
                  }`}
                />
                <Phone className="w-4 h-4 text-[#64748B] absolute right-3.5 top-3" />
              </div>
              {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-[#142A43] mb-1.5">
                Email doanh nghiệp
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="VD: director@dealership.vn"
                  disabled={isSubmitting}
                  className={`w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-[#F8F9F5] border text-base sm:text-xs text-[#142A43] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:ring-1 transition-all disabled:opacity-50 ${
                    errors.email
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-[#DCE3EC] focus:border-[#F47721] focus:ring-[#F47721]'
                  }`}
                />
                <Mail className="w-4 h-4 text-[#64748B] absolute right-3.5 top-3" />
              </div>
              {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Row 3: Showroom Type & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="showroom_type" className="block text-xs font-semibold text-[#142A43] mb-1.5">
                Phân khúc xe đại lý đang kinh doanh
              </label>
              <select
                id="showroom_type"
                value={formData.showroom_type}
                onChange={(e) => setFormData({ ...formData, showroom_type: e.target.value })}
                disabled={isSubmitting}
                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-base sm:text-xs text-[#142A43] focus:bg-white focus:outline-none focus:border-[#F47721] focus:ring-1 focus:ring-[#F47721] transition-all cursor-pointer disabled:opacity-50"
              >
                <option value="luxury">Đại lý ô tô hạng sang mới (Mercedes, BMW, Porsche, Lexus...)</option>
                <option value="preowned">Showroom ô tô đã qua sử dụng / Xe lướt cao cấp</option>
                <option value="both">Đa phân khúc (Xe mới và Xe lướt kết hợp)</option>
                <option value="general">Đại lý phân phối xe phổ thông (Toyota, Hyundai, Ford...)</option>
              </select>
            </div>

            <div>
              <label htmlFor="showroom_location" className="block text-xs font-semibold text-[#142A43] mb-1.5">
                Khu vực địa lý showroom
              </label>
              <div className="relative">
                <select
                  id="showroom_location"
                  value={formData.showroom_location}
                  onChange={(e) => setFormData({ ...formData, showroom_location: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-base sm:text-xs text-[#142A43] focus:bg-white focus:outline-none focus:border-[#F47721] focus:ring-1 focus:ring-[#F47721] transition-all cursor-pointer disabled:opacity-50"
                >
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Bình Dương">Bình Dương</option>
                  <option value="Đồng Nai">Đồng Nai</option>
                  <option value="Hải Phòng">Hải Phòng</option>
                  <option value="Cần Thơ">Cần Thơ</option>
                  <option value="Khác">Tỉnh / Thành phố khác</option>
                </select>
                <MapPin className="w-4 h-4 text-[#64748B] absolute right-3.5 top-3 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 4: Monthly Lead Volume */}
          <div>
            <label htmlFor="monthly_lead_volume" className="block text-xs font-semibold text-[#142A43] mb-1.5">
              Số lượng lead hàng tháng hiện tại của showroom
            </label>
            <div className="relative">
              <select
                id="monthly_lead_volume"
                value={formData.monthly_lead_volume}
                onChange={(e) => setFormData({ ...formData, monthly_lead_volume: e.target.value })}
                disabled={isSubmitting}
                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-base sm:text-xs text-[#142A43] focus:bg-white focus:outline-none focus:border-[#F47721] focus:ring-1 focus:ring-[#F47721] transition-all cursor-pointer disabled:opacity-50"
              >
                <option value="<50">Dưới 50 lead / tháng</option>
                <option value="50-150">50 - 150 lead / tháng</option>
                <option value="150-300">150 - 300 lead / tháng</option>
                <option value=">300">Trên 300 lead / tháng</option>
              </select>
              <TrendingUp className="w-4 h-4 text-[#64748B] absolute right-3.5 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Row 5: Consultation Need Choices */}
          <div>
            <span className="block text-xs font-semibold text-[#142A43] mb-2">
              Nhu cầu quan tâm ưu tiên:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {needOptions.map((opt) => {
                const isSelected = selectedNeeds.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => !isSubmitting && toggleNeed(opt)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center gap-2.5 transition-all text-left ${
                      isSelected
                        ? 'bg-[#07182D] border-[#07182D] text-white font-medium shadow-xs'
                        : 'bg-[#F8F9F5] border-[#DCE3EC] text-[#142A43] hover:bg-slate-100 hover:border-[#64748B]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className="w-3.5 h-3.5 rounded border-[#DCE3EC] text-[#F47721] pointer-events-none"
                    />
                    <span className="leading-snug">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="pt-2">
            <label htmlFor="consent" className="flex items-start gap-3 cursor-pointer group">
              <input
                id="consent"
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                disabled={isSubmitting}
                className="mt-0.5 w-4 h-4 rounded border-[#DCE3EC] text-[#F47721] focus:ring-[#F47721] cursor-pointer disabled:opacity-50"
              />
              <span className="text-xs text-[#64748B] leading-relaxed group-hover:text-[#142A43]">
                Tôi xác nhận là đại diện showroom/đại lý và{' '}
                <strong className="text-[#142A43]">
                  đồng ý cho phép AutoLead Systems liên hệ tư vấn 30 phút
                </strong>{' '}
                theo thông tin đã cung cấp. <span className="text-[#F47721]">*</span>
              </span>
            </label>
            {errors.consent && (
              <p className="text-[11px] text-rose-600 mt-1.5 ml-7">{errors.consent}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-[#F47721] hover:bg-[#E76513] shadow-md shadow-[#F47721]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang lưu trữ dữ liệu...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Đăng ký tư vấn 30 phút</span>
                </>
              )}
            </button>
          </div>

          <p className="text-[11px] text-center text-[#64748B]">
            Cam kết bảo mật dữ liệu: Thông tin của đại lý chỉ phục vụ mục đích khảo sát tư vấn và không cung cấp cho bên thứ ba.
          </p>
        </form>
      )}
    </div>
  );

  if (isModal) {
    return content;
  }

  return (
    <section id="consultation" className="py-20 md:py-24 bg-[#F8F9F5] relative border-b border-[#DCE3EC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#DCE3EC] text-xs font-bold text-[#F47721] font-mono shadow-xs">
            <PixelShowroom size={16} />
            <span>ĐĂNG KÝ KHẢO SÁT & TƯ VẤN SHOWROOM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#142A43] tracking-tight">
            Khởi Động Hệ Thống AutoLead Cùng Đại Lý
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
            Điền thông tin bên dưới để chuyên gia của chúng tôi liên hệ khảo sát thực tế quy trình và xây dựng phương án triển khai tối ưu cho showroom của bạn.
          </p>
        </div>

        <div className="p-4 sm:p-10 rounded-2xl sm:rounded-3xl bg-white border border-[#DCE3EC] shadow-sm">
          {content}
        </div>
      </div>
    </section>
  );
}
