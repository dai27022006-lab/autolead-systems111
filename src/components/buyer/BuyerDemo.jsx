import React, { useState, useEffect } from 'react';
import {
  Car,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Bot
} from 'lucide-react';
import { api } from '../../services/api';

export default function BuyerDemo({ onNavigateToCRM }) {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // 1: Select Car, 2: Contact Info, 3: AI Qualification, 4: Pick Slot, 5: Success

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [createdLead, setCreatedLead] = useState(null);

  // AI Questionnaire
  const [purchasePurpose, setPurchasePurpose] = useState('Gia đình & Công việc ngoại giao');
  const [expectedPurchasingTime, setExpectedPurchasingTime] = useState('Trong 2 tuần tới');
  const [expectedBudget, setExpectedBudget] = useState('1.5 - 2.0 tỷ VNĐ');
  const [readinessToVisitShowroom, setReadinessToVisitShowroom] = useState('Sẵn sàng lái thử trong tuần này');

  // AI Result
  const [aiResult, setAiResult] = useState(null);

  // Slot booking
  const [appointmentDate, setAppointmentDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);

  // Loading & Error states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Load cars on mount
  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    setIsLoading(true);
    try {
      const data = await api.getCars();
      setCars(data);
      if (data && data.length > 0) {
        // Prioritize Mercedes-Benz C200 as default
        const c200 = data.find((c) => c.id === 'car-c200') || data[0];
        setSelectedCar(c200);
      }
    } catch (e) {
      console.warn('Failed to load cars:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // Load available slots when date or car changes
  useEffect(() => {
    if (currentStep === 4 && selectedCar && appointmentDate) {
      loadSlots();
    }
  }, [currentStep, appointmentDate, selectedCar]);

  const loadSlots = async () => {
    setIsLoading(true);
    try {
      const slots = await api.getAvailableSlots(appointmentDate, selectedCar.name);
      setAvailableSlots(slots);
      const firstAvail = slots.find((s) => s.isAvailable);
      if (firstAvail) setSelectedSlot(firstAvail.slot);
    } catch (e) {
      console.warn('Failed to load slots:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 2 SUBMIT: Create Lead
  const handleCreateLead = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim()) {
      setErrorMsg('Vui lòng nhập họ tên người lái thử.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Vui lòng nhập số điện thoại liên hệ.');
      return;
    }
    if (!/^(0[3|5|7|8|9])[0-9]{8}$/.test(phone.replace(/\s+/g, ''))) {
      setErrorMsg('Số điện thoại không hợp lệ (cần 10 số, bắt đầu bằng 03, 05, 07, 08, 09).');
      return;
    }

    setIsLoading(true);
    try {
      const lead = await api.createBuyerLead({
        customerName: customerName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        interestedVehicle: selectedCar?.name || 'Mercedes-Benz C200 Avantgarde 2024',
        vehicleSegment: selectedCar?.segment || 'Luxury Sedan'
      });
      setCreatedLead(lead);
      setCurrentStep(3); // Go to AI qualification questions
    } catch (err) {
      console.error('Error creating buyer lead:', err);
      setErrorMsg('Lỗi khi gửi thông tin, vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 3 SUBMIT: AI Qualification
  const handleQualify = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const result = await api.qualifyBuyerLead({
        leadId: createdLead?.id || 'LEAD-DEMO',
        purchasePurpose,
        expectedPurchasingTime,
        expectedBudget,
        readinessToVisitShowroom
      });
      setAiResult(result);
      setCurrentStep(4); // Advance to slot picker
    } catch (err) {
      console.error('Error qualifying lead:', err);
      setErrorMsg('Lỗi khi thẩm định, vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 4 SUBMIT: Book Appointment
  const handleBookAppointment = async () => {
    if (!selectedSlot) {
      setErrorMsg('Vui lòng chọn một khung giờ lái thử còn trống.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    try {
      const apt = await api.bookAppointment({
        leadId: createdLead?.id || 'LEAD-DEMO',
        customerName: customerName.trim(),
        customerPhone: phone.trim(),
        vehicleModel: selectedCar.name,
        appointmentDate,
        appointmentTime: selectedSlot,
        notes: `Mục đích: ${purchasePurpose}. Dự kiến mua: ${expectedPurchasingTime}.`
      });
      setConfirmedAppointment(apt);
      setCurrentStep(5); // Success confirmation
    } catch (err) {
      console.error('Error booking appointment:', err);
      setErrorMsg(err.message || 'Khung giờ này vừa có người đặt, vui lòng chọn khung giờ khác.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-8 sm:py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Explanation Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DCE3EC] mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F47721] shrink-0">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F47721]">
                Cổng Người Mua Xe (Buyer Demo Portal)
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Quy Trình Tạo Lead Thật
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
              Mô phỏng trải nghiệm người mua xe: Chọn xe → Điền thông tin → AI Sàng lọc → Khóa lịch trống → Dữ liệu tự động đẩy về CRM đại lý.
            </p>
          </div>
        </div>

        <button
          onClick={onNavigateToCRM}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-[#142A43] border border-[#DCE3EC] shrink-0 cursor-pointer transition-colors shadow-xs"
        >
          <span>Xem CRM Đại Lý</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#F47721]" />
        </button>
      </div>

      {/* Core Positioning Note */}
      <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-xs text-[#142A43] shadow-xs flex items-start gap-3.5 text-left">
        <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center shrink-0 mt-0.5 text-[#F47721]">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <p className="font-bold text-[#142A43] text-xs uppercase tracking-wide font-mono flex items-center gap-2">
            <span>Nguyên lý vận hành AutoLead Systems</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-[#F47721] border border-orange-200 font-bold">
              Bổ trợ Form
            </span>
          </p>
          <p className="text-xs text-[#475569] leading-relaxed">
            Các form đăng ký lái thử hiện nay chủ yếu hỗ trợ khách hàng chủ động cung cấp thông tin và gửi yêu cầu đến đại lý. <strong>AutoLead Systems không thay thế những form này</strong> mà <strong>bổ sung một hệ thống tự động hóa phía sau</strong>, giúp đại lý tiếp tục chăm sóc, sàng lọc, theo dõi và chuyển đổi khách hàng tiềm năng thành những lịch hẹn lái thử đủ điều kiện. Qua đó, đại lý không chỉ thu thập được thông tin khách hàng mà còn khai thác hiệu quả hơn nguồn khách hàng đã có.
          </p>
        </div>
      </div>

      {/* 5-Step Visual Stepper */}
      <div className="mb-6 sm:mb-8">
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5 text-center text-xs">
          {[
            { num: 1, label: '1. Chọn xe', short: '1. Xe' },
            { num: 2, label: '2. Thông tin khách', short: '2. Khách' },
            { num: 3, label: '3. AI Sàng lọc', short: '3. AI' },
            { num: 4, label: '4. Khóa lịch trống', short: '4. Lịch' },
            { num: 5, label: '5. Hoàn tất', short: '5. Xong' }
          ].map((st) => (
            <div
              key={st.num}
              className={`p-2 sm:p-2.5 rounded-xl border transition-all ${
                currentStep === st.num
                  ? 'bg-[#F47721] border-[#F47721] text-white font-bold shadow-md'
                  : currentStep > st.num
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700 font-semibold'
                  : 'bg-white border-[#DCE3EC] text-[#94A3B8]'
              }`}
            >
              <span className="block text-[10px] sm:text-[11px] truncate sm:hidden">{st.short}</span>
              <span className="hidden sm:block text-[11px] truncate">{st.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Global Error Banner */}
      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 shadow-xs">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* STEP 1: SELECT CAR */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-black text-[#142A43]">Bước 1: Chọn Mẫu Xe Lái Thử</h3>
            <p className="text-xs text-[#64748B] mt-1">
              Chọn mẫu xe bạn muốn trải nghiệm thực tế (Mặc định gợi ý mẫu <strong className="text-[#F47721]">Mercedes-Benz C200</strong>)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {cars.map((car) => {
              const isSelected = selectedCar?.id === car.id;
              const isC200 = car.id === 'car-c200';
              return (
                <div
                  key={car.id}
                  onClick={() => setSelectedCar(car)}
                  className={`rounded-2xl overflow-hidden border transition-all cursor-pointer group flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-2 border-[#F47721] shadow-lg ring-2 ring-[#F47721]/20'
                      : 'bg-white border border-[#DCE3EC] hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-[#142A43] border border-[#DCE3EC]">
                        {car.segment}
                      </span>
                      {isC200 && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#F47721] text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                          Mẫu xe demo chính
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold text-[#142A43] group-hover:text-[#F47721] transition-colors">
                        {car.name}
                      </h4>
                      <p className="text-xs font-mono font-bold text-[#F47721] mt-1">
                        Giá niêm yết: {car.price}
                      </p>
                      <p className="text-xs text-[#64748B] mt-2 line-clamp-2">
                        {car.specs}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                      <span className="text-emerald-600 flex items-center gap-1 text-[11px] font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {car.status}
                      </span>
                      <span className={`font-bold ${isSelected ? 'text-[#F47721]' : 'text-slate-400'}`}>
                        {isSelected ? '✓ Đang chọn' : 'Nhấp để chọn'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setCurrentStep(2)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#F47721] hover:bg-[#E76513] text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Bước 2: Điền thông tin lái thử →</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: ENTER CONTACT INFORMATION */}
      {currentStep === 2 && (
        <div className="max-w-xl mx-auto rounded-2xl sm:rounded-3xl bg-white border border-[#DCE3EC] p-5 sm:p-8 shadow-md">
          <div className="text-center mb-6">
            <h3 className="text-xl font-black text-[#142A43]">Bước 2: Nhập Thông Tin Khách Hàng Demo</h3>
            <p className="text-xs text-[#64748B] mt-1">
              Nhập họ tên và số điện thoại để hệ thống lưu hồ sơ Lead thật vào cơ sở dữ liệu showroom
            </p>
          </div>

          {/* Selected Car Capsule */}
          <div className="p-3.5 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] mb-6 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <Car className="w-5 h-5 text-[#F47721]" />
              <div>
                <span className="font-bold text-[#142A43] block">{selectedCar?.name}</span>
                <span className="text-[11px] text-[#64748B]">{selectedCar?.segment} • {selectedCar?.price}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="text-[#F47721] text-xs font-semibold hover:underline cursor-pointer"
            >
              Đổi xe
            </button>
          </div>

          <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#142A43] font-bold mb-1">
                Họ và tên khách hàng demo <span className="text-[#F47721]">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ví dụ: Trần Quang Đại"
                  className="w-full pl-9 pr-3 py-2.5 sm:py-2.5 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-base sm:text-xs text-[#142A43] placeholder-slate-400 outline-none focus:border-[#F47721] focus:bg-white focus:ring-1 focus:ring-[#F47721] transition-all"
                />
              </div>
              <p className="text-[10px] text-[#64748B] mt-1">
                Bạn có thể nhập tên của bạn hoặc thành viên nhóm để kiểm thử luồng CRM.
              </p>
            </div>

            <div>
              <label className="block text-[#142A43] font-bold mb-1">
                Số điện thoại liên hệ <span className="text-[#F47721]">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0912 345 678"
                  className="w-full pl-9 pr-3 py-2.5 sm:py-2.5 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-base sm:text-xs text-[#142A43] placeholder-slate-400 outline-none focus:border-[#F47721] focus:bg-white focus:ring-1 focus:ring-[#F47721] transition-all"
                />
              </div>
              <p className="text-[10px] text-[#64748B] mt-1">
                Định dạng 10 số Việt Nam (Hệ thống có bộ kiểm tra validate thật).
              </p>
            </div>

            <div>
              <label className="block text-[#142A43] font-bold mb-1">
                Email nhận thư mời lái thử (Tùy chọn)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="dai.nguyen@example.com"
                  className="w-full pl-9 pr-3 py-2.5 sm:py-2.5 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-base sm:text-xs text-[#142A43] placeholder-slate-400 outline-none focus:border-[#F47721] focus:bg-white focus:ring-1 focus:ring-[#F47721] transition-all"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#142A43] font-semibold cursor-pointer min-h-[44px] transition-colors"
              >
                Quay lại
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 rounded-xl bg-[#F47721] hover:bg-[#E76513] text-white font-bold cursor-pointer flex items-center gap-2 min-h-[44px] shadow-sm hover:shadow transition-all"
              >
                {isLoading ? <span>Đang lưu Lead...</span> : <span>Lưu Lead & Bắt Đầu AI Sàng Lọc →</span>}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 3: AI QUALIFICATION QUESTIONNAIRE */}
      {currentStep === 3 && (
        <div className="max-w-2xl mx-auto rounded-2xl sm:rounded-3xl bg-white border border-[#DCE3EC] p-5 sm:p-8 shadow-md space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#F47721] text-xs font-bold uppercase tracking-wider mb-2">
              <Bot className="w-3.5 h-3.5" />
              Bộ Câu Hỏi Sàng Lọc Tự Động (AI Assistant)
            </div>
            <h3 className="text-xl font-black text-[#142A43]">Bước 3: AI Thu Thập & Thẩm Định Nhu Cầu</h3>
            <p className="text-xs text-[#64748B] mt-1">
              Thu thập thông tin để đánh giá 7 tiêu chuẩn chất lượng (TQM) trước khi chuyển lịch cho showroom
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-xs flex flex-col sm:flex-row justify-between gap-1.5 text-[#64748B]">
            <span>Khách hàng: <strong className="text-[#142A43]">{customerName}</strong> ({phone})</span>
            <span>Mẫu xe: <strong className="text-[#F47721]">{selectedCar?.name}</strong></span>
          </div>

          <div className="space-y-5 text-xs">
            {/* Question 1 */}
            <div>
              <label className="block text-[#142A43] font-bold mb-2">
                1. Mục đích chính khi mua mẫu xe {selectedCar?.name}?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  'Gia đình & Công việc ngoại giao',
                  'Xe cá nhân di chuyển hàng ngày',
                  'Nâng cấp từ dòng xe phổ thông'
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setPurchasePurpose(opt)}
                    className={`p-3 rounded-xl border text-left font-medium transition-all cursor-pointer ${
                      purchasePurpose === opt
                        ? 'bg-orange-50 border-2 border-[#F47721] text-[#142A43] font-bold shadow-xs'
                        : 'bg-[#F8F9F5] border border-[#DCE3EC] text-[#64748B] hover:border-slate-300 hover:text-[#142A43]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2 */}
            <div>
              <label className="block text-[#142A43] font-bold mb-2">
                2. Thời điểm dự kiến nhận xe về gara của anh/chị?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  'Trong 2 tuần tới',
                  'Trong tháng này',
                  'Đang trong giai đoạn khảo sát'
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setExpectedPurchasingTime(opt)}
                    className={`p-3 rounded-xl border text-left font-medium transition-all cursor-pointer ${
                      expectedPurchasingTime === opt
                        ? 'bg-orange-50 border-2 border-[#F47721] text-[#142A43] font-bold shadow-xs'
                        : 'bg-[#F8F9F5] border border-[#DCE3EC] text-[#64748B] hover:border-slate-300 hover:text-[#142A43]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3 */}
            <div>
              <label className="block text-[#142A43] font-bold mb-2">
                3. Khoảng tài chính chuẩn bị dự kiến (Tự nguyện cung cấp)?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  'Khoảng 1.5 - 2.0 tỷ VNĐ',
                  'Khoảng 2.0 - 3.0 tỷ VNĐ',
                  'Chưa tiết lộ cụ thể'
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setExpectedBudget(opt)}
                    className={`p-3 rounded-xl border text-left font-medium transition-all cursor-pointer ${
                      expectedBudget === opt
                        ? 'bg-orange-50 border-2 border-[#F47721] text-[#142A43] font-bold shadow-xs'
                        : 'bg-[#F8F9F5] border border-[#DCE3EC] text-[#64748B] hover:border-slate-300 hover:text-[#142A43]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 4 */}
            <div>
              <label className="block text-[#142A43] font-bold mb-2">
                4. Anh/chị có sẵn sàng ghé Showroom để lái thử thực tế không?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  'Sẵn sàng lái thử trong tuần này',
                  'Muốn lái thử vào cuối tuần'
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setReadinessToVisitShowroom(opt)}
                    className={`p-3 rounded-xl border text-left font-medium transition-all cursor-pointer ${
                      readinessToVisitShowroom === opt
                        ? 'bg-orange-50 border-2 border-[#F47721] text-[#142A43] font-bold shadow-xs'
                        : 'bg-[#F8F9F5] border border-[#DCE3EC] text-[#64748B] hover:border-slate-300 hover:text-[#142A43]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#142A43] font-semibold cursor-pointer transition-colors"
            >
              Quay lại
            </button>

            <button
              type="button"
              onClick={handleQualify}
              disabled={isLoading}
              className="px-6 py-2.5 rounded-xl bg-[#F47721] hover:bg-[#E76513] text-white font-bold cursor-pointer flex items-center gap-2 shadow-sm hover:shadow transition-all"
            >
              {isLoading ? <span>AI đang phân tích...</span> : <span>Chấm Điểm AI & Xem Kết Quả →</span>}
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: PICK APPOINTMENT SLOT (Conflict Prevention Enabled) */}
      {currentStep === 4 && (
        <div className="max-w-2xl mx-auto rounded-2xl sm:rounded-3xl bg-white border border-[#DCE3EC] p-5 sm:p-8 shadow-md space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-black text-[#142A43]">Bước 4: Chọn Khung Giờ Trống & Đặt Lịch Lái Thử</h3>
            <p className="text-xs text-[#64748B] mt-1">
              Hệ thống tự động kiểm tra lịch bận của xe để <strong className="text-rose-600">chống trùng lịch (Conflict Prevention)</strong>
            </p>
          </div>

          {/* AI Qualification Score Card Result */}
          {aiResult && (
            <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#142A43] flex items-center gap-1.5 uppercase">
                  <Sparkles className="w-4 h-4 text-[#F47721]" />
                  Kết Quả Phân Loại AI:
                </span>
                <span className="text-sm font-black text-[#F47721]">
                  AI Score: {aiResult.aiScore}% (ĐỦ ĐIỀU KIỆN)
                </span>
              </div>
              <p className="text-xs text-[#475569] leading-relaxed">
                {aiResult.aiExplanation}
              </p>
              <div className="mt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Đã đạt 7/7 tiêu chuẩn. Đủ điều kiện tính phí hiệu quả CPA 300.000 VNĐ.</span>
              </div>
            </div>
          )}

          {/* Date Picker */}
          <div>
            <label className="block text-[#142A43] font-bold text-xs mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#F47721]" />
              Chọn ngày muốn trải nghiệm xe tại Showroom:
            </label>
            <input
              type="date"
              value={appointmentDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-base sm:text-xs text-[#142A43] outline-none focus:border-[#F47721] focus:bg-white focus:ring-1 focus:ring-[#F47721] transition-all"
            />
          </div>

          {/* Slots with Conflict Prevention */}
          <div>
            <label className="block text-[#142A43] font-bold text-xs mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#F47721]" />
              Các khung giờ của mẫu xe {selectedCar?.name}:
            </label>

            {isLoading ? (
              <div className="py-6 text-center text-xs text-[#64748B]">Đang kiểm tra lịch trống của xe...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
                {availableSlots.map((slotObj) => (
                  <button
                    key={slotObj.slot}
                    type="button"
                    disabled={!slotObj.isAvailable}
                    onClick={() => setSelectedSlot(slotObj.slot)}
                    className={`p-3.5 rounded-xl border text-left transition-all min-h-[48px] ${
                      !slotObj.isAvailable
                        ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed line-through'
                        : selectedSlot === slotObj.slot
                        ? 'bg-orange-50 border-2 border-[#F47721] text-[#142A43] font-bold shadow-xs'
                        : 'bg-[#F8F9F5] border border-[#DCE3EC] text-[#142A43] hover:border-slate-300 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{slotObj.slot}</span>
                      {!slotObj.isAvailable && (
                        <span className="text-[10px] text-rose-500 font-semibold">Đã có người đặt</span>
                      )}
                      {slotObj.isAvailable && selectedSlot === slotObj.slot && (
                        <CheckCircle2 className="w-4 h-4 text-[#F47721]" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#142A43] font-semibold text-xs cursor-pointer text-center min-h-[44px] transition-colors"
            >
              Quay lại
            </button>

            <button
              type="button"
              onClick={handleBookAppointment}
              disabled={isLoading || !selectedSlot}
              className="px-6 py-2.5 rounded-xl bg-[#F47721] hover:bg-[#E76513] text-white text-xs font-bold cursor-pointer flex items-center justify-center gap-2 shadow-sm min-h-[44px] transition-all"
            >
              {isLoading ? <span>Đang xác nhận lịch...</span> : <span>Xác Nhận Đặt Lịch Lái Thử Thành Công →</span>}
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: SUCCESS CONFIRMATION & SEAMLESS TRANSITION TO CRM */}
      {currentStep === 5 && confirmedAppointment && (
        <div className="max-w-2xl mx-auto rounded-2xl sm:rounded-3xl bg-white border border-[#DCE3EC] p-5 sm:p-10 shadow-lg text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Đặt Lịch Lái Thử Hoàn Tất
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#142A43]">Xác Nhận Cuộc Hẹn Đủ Điều Kiện Thành Công!</h3>
            <p className="text-xs text-[#64748B] mt-1">
              Mã lịch hẹn hệ thống: <strong className="text-[#F47721] font-mono text-sm">{confirmedAppointment.id}</strong>
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F8F9F5] border border-[#DCE3EC] text-left text-xs space-y-2.5 text-[#142A43]">
            <div className="flex justify-between">
              <span className="text-[#64748B]">Khách hàng:</span>
              <strong className="text-[#142A43]">{confirmedAppointment.customerName}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Số điện thoại:</span>
              <span className="font-mono text-[#142A43]">{confirmedAppointment.customerPhone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Xe lái thử:</span>
              <strong className="text-[#F47721]">{confirmedAppointment.vehicleModel}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Thời gian hẹn:</span>
              <span className="font-semibold text-[#142A43]">{confirmedAppointment.appointmentDate} • {confirmedAppointment.appointmentTime}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#E2E8F0]">
              <span className="text-[#64748B]">Phí nghiệm thu đối tác:</span>
              <span className="text-emerald-700 font-black">+300.000 VNĐ (Qualified CPA)</span>
            </div>
          </div>

          {/* CALL TO ACTION: OPEN DEALER CRM TO VERIFY */}
          <div className="p-5 rounded-2xl bg-orange-50/50 border border-orange-200 text-left space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#142A43]">
              <ShieldCheck className="w-4 h-4 text-[#F47721]" />
              <span>Dữ liệu đã được đồng bộ tức thì vào CRM Đại lý!</span>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed">
              Bây giờ, bạn có thể chuyển sang giao diện <strong>CRM Đại Lý</strong> để chứng kiến khách hàng <strong>{confirmedAppointment.customerName}</strong> và lịch hẹn <strong>{confirmedAppointment.id}</strong> đã tự động xuất hiện trên bảng Kanban và Calendar mà không bị mất dữ liệu khi F5.
            </p>
            <button
              onClick={onNavigateToCRM}
              className="w-full py-3.5 rounded-xl bg-[#F47721] hover:bg-[#E76513] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Mở CRM Đại Lý Để Kiểm Tra Ngay →</span>
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setCurrentStep(1);
                setCustomerName('');
                setPhone('');
                setEmail('');
                setCreatedLead(null);
                setConfirmedAppointment(null);
              }}
              className="text-xs text-[#64748B] hover:text-[#142A43] underline cursor-pointer"
            >
              Thử đặt một lượt khác với khách hàng mới
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
