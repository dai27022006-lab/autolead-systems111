import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  MessageSquare,
  PhoneCall,
  Send,
  Copy,
  Check,
  ShieldCheck,
  HelpCircle,
  Clock,
  Car
} from 'lucide-react';
import { VEHICLE_OPTIONS } from '../../data/mockData.js';

export default function AiAssistant({ leads = [] }) {
  const safeLeads = Array.isArray(leads) ? leads : [];
  const [selectedLead, setSelectedLead] = useState(safeLeads[0] || null);
  const [selectedScenario, setSelectedScenario] = useState('zalo_greeting');
  const [copied, setCopied] = useState(false);

  // Chat simulator state
  const [chatMessages, setChatMessages] = useState([
    { sender: 'customer', text: 'Chào em, anh vừa thấy bài đăng GLC 300. Bản này lăn bánh tại TP.HCM tầm bao nhiêu?', time: '10:15' },
    { sender: 'ai', text: 'Dạ em chào anh Tuấn! Em là trợ lý tư vấn số của Mercedes Haxaco. Mẫu GLC 300 4MATIC 2024 hiện đang có ưu đãi 50% trước bạ và gói bảo dưỡng 2 năm chính hãng. Giá lăn bánh dự kiến khoảng 3.1 tỷ VNĐ ạ.', time: '10:15' },
    { sender: 'customer', text: 'Cuối tuần này bên em có xe sẵn để anh chạy thử không?', time: '10:16' },
    { sender: 'ai', text: 'Dạ có sẵn xe màu Trắng và Đen tại showroom luôn ạ! Thứ Bảy này vào lúc 14:00 anh Tuấn có tiện ghé showroom bên em tại Bình Thạnh để lái thử thực tế không ạ? Em xin phép giữ lịch riêng cho anh nhé!', time: '10:16' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  // Pre-configured AI Response Scripts for Showroom Sales
  const scripts = {
    zalo_greeting: {
      title: 'Kịch bản 1: Tiếp nhận Lead mới trong 60 giây (Zalo)',
      text: `Dạ em chào anh/chị ${selectedLead?.customerName || 'Quý khách'}!\nEm là trợ lý tư vấn số của Showroom Ô tô. Em vừa nhận được thông tin anh/chị quan tâm đến mẫu ${selectedLead?.interestedVehicle || 'xe sang'}.\n\nEm đã chuẩn bị sẵn cuốn Brochure điện tử (E-catalogue) và bảng tính dự toán chi phí lăn bánh chi tiết cho dòng xe này. Anh/chị cho em xin phép gửi qua Zalo này nhé ạ?`
    },
    objection_price: {
      title: 'Kịch bản 2: Xử lý khi khách chê giá cao hơn thị trường',
      text: `Dạ em hoàn toàn hiểu băn khoăn của anh/chị ạ! Giá của bên em đã bao gồm gói bảo hành chính hãng mở rộng, kiểm định 111 hạng mục nghiêm ngặt và cam kết xe nguyên bản không đâm đụng, thủy kích. Ngoài ra khi anh/chị đến showroom lái thử trong tuần này, Ban Giám Đốc sẽ duyệt thêm gói phụ kiện cao cấp trị giá 40 triệu đồng ạ.`
    },
    appointment_confirm: {
      title: 'Kịch bản 3: Xác nhận lịch hẹn lái thử chuẩn 7 điều kiện',
      text: `Dạ trân trọng kính mời anh/chị ${selectedLead?.customerName || 'Quý khách'} đến trải nghiệm lái thử mẫu ${selectedLead?.interestedVehicle || 'xe'}.\n📍 Địa điểm: Phòng chờ VIP Showroom.\n⏰ Thời gian: Đã khóa lịch riêng theo yêu cầu của anh/chị.\nChuyên viên tư vấn cấp cao sẽ chuẩn bị xe sạch sẽ và sẵn sàng đón tiếp chu đáo nhất ạ!`
    },
    no_show_recovery: {
      title: 'Kịch bản 4: Kích hoạt lại khách vắng mặt (No-show Recovery)',
      text: `Dạ em chào anh/chị! Hôm nay chắc anh/chị có việc bận đột xuất nên chưa kịp ghé showroom lái thử xe. Em hoàn toàn thông cảm ạ. Dạ xe của bên em vẫn được giữ chỗ, không biết sáng mai hoặc chiều Chủ Nhật anh/chị có tiện ghé qua không, hoặc bên em có thể mang xe tận nhà cho anh/chị lái thử trải nghiệm ạ!`
    }
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userMessage = { sender: 'customer', text: inputMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    const updated = [...chatMessages, userMessage];
    setChatMessages(updated);
    setInputMsg('');

    // Simulated Smart AI Response after 600ms
    setTimeout(() => {
      let reply = 'Dạ em đã ghi nhận yêu cầu của anh/chị. Em đang điều phối chuyên viên chuẩn bị hồ sơ xe và gửi lại ngay ạ!';
      if (inputMsg.toLowerCase().includes('giá') || inputMsg.toLowerCase().includes('nhiêu')) {
        reply = 'Dạ giá bán niêm yết hiện tại rất tốt và có hỗ trợ trả góp 85% giá trị xe. Anh/chị có muốn em gửi bảng tính lãi suất mỗi tháng qua không ạ?';
      } else if (inputMsg.toLowerCase().includes('lái thử') || inputMsg.toLowerCase().includes('hẹn')) {
        reply = 'Dạ tuyệt vời ạ! Em xin phép giữ lịch lái thử riêng cho anh/chị. Anh/chị có thể cho em xin khung giờ thuận tiện nhất được không ạ?';
      }

      setChatMessages(prev => [...prev, {
        sender: 'ai',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 600);
  };

  const copyScript = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F47721]"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#F47721]">
              Chức Năng 2 Trong Lời Chào Hàng
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-[#142A43] mt-0.5">
            Trợ Lý AI Tác Nghiệp & Theo Dõi Tương Tác Đa Kênh
          </h2>
          <p className="text-xs text-[#64748B]">
            Hỗ trợ nhân viên tư vấn xử lý từ chối, tạo kịch bản Zalo tự động và mô phỏng tương tác thực tế
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-white border border-[#DCE3EC] text-xs font-mono font-bold text-[#F47721] flex items-center gap-2 shadow-2xs">
          <Bot className="w-4 h-4" />
          <span>Simulated Omnichannel Engine</span>
        </div>
      </div>

      {/* Grid: AI Script Generator + Simulated Live Chat Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Left: AI Response Scripts for Sales */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#DCE3EC] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0] mb-5">
              <h3 className="text-base font-bold text-[#142A43] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F47721]" />
                Kịch Bản AI Gợi Ý Cho Nhân Viên Sales
              </h3>
              <select
                value={selectedLead?.id}
                onChange={(e) => setSelectedLead(leads.find(l => l.id === e.target.value))}
                className="w-full sm:w-auto px-2.5 py-1.5 rounded-lg bg-[#F8F9F5] border border-[#DCE3EC] text-xs text-[#142A43] outline-none focus:border-[#F47721]"
              >
                {leads.map(l => (
                  <option key={l.id} value={l.id}>{l.customerName} ({l.interestedVehicle?.slice(0, 15)}...)</option>
                ))}
              </select>
            </div>

            {/* Scenario buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {[
                { id: 'zalo_greeting', label: '1. Chào Mừng & Gửi Brochure' },
                { id: 'objection_price', label: '2. Xử Lý Giá Cao' },
                { id: 'appointment_confirm', label: '3. Khóa Lịch Hẹn Lái Thử' },
                { id: 'no_show_recovery', label: '4. Cứu Lead No-Show' }
              ].map(sc => (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScenario(sc.id)}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-left border transition-all cursor-pointer ${
                    selectedScenario === sc.id
                      ? 'bg-orange-50 text-[#F47721] border-2 border-[#F47721] font-bold shadow-2xs'
                      : 'bg-[#F8F9F5] text-[#64748B] border border-[#DCE3EC] hover:border-slate-300'
                  }`}
                >
                  {sc.label}
                </button>
              ))}
            </div>

            {/* Script Display */}
            <div className="p-4 rounded-2xl bg-[#F8F9F5] border border-[#DCE3EC]">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#E2E8F0] text-xs">
                <span className="font-bold text-[#F47721]">{scripts[selectedScenario].title}</span>
                <button
                  onClick={() => copyScript(scripts[selectedScenario].text)}
                  className="text-[#64748B] hover:text-[#142A43] flex items-center gap-1 cursor-pointer font-medium"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Đã chép' : 'Sao chép tin nhắn'}</span>
                </button>
              </div>
              <div className="text-xs text-[#142A43] whitespace-pre-line leading-relaxed font-sans max-h-56 overflow-y-auto">
                {scripts[selectedScenario].text}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Kịch bản đã được kiểm chứng tỷ lệ phản hồi Zalo &gt; 65% trong ngành xe ô tô.</span>
          </div>
        </div>

        {/* Right: Simulated Omnichannel Zalo & Call Chat Sandbox */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#DCE3EC] shadow-xs flex flex-col h-[520px]">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
                Z
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#142A43]">Mô Phỏng Trò Chuyện Zalo OA Khách Hàng</h4>
                <span className="text-[10px] text-emerald-700 font-medium">AI Chăm Sóc Tự Động • Hoạt động 24/7</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-mono text-[#64748B] border border-[#DCE3EC]">
              Response: &lt;60s
            </span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto space-y-3 p-2 text-xs">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'customer' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === 'customer'
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-2xs'
                      : 'bg-[#F8F9F5] text-[#142A43] border border-[#DCE3EC] rounded-tl-none shadow-2xs'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
                <span className="text-[9px] text-[#94A3B8] font-mono mt-0.5 px-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendChat} className="pt-3 border-t border-[#E2E8F0] flex gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Nhập câu hỏi mô phỏng của người mua xe..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#F8F9F5] border border-[#DCE3EC] text-[#142A43] text-base sm:text-xs outline-none focus:border-[#F47721] focus:bg-white"
            />
            <button
              type="submit"
              className="px-4 py-2.5 min-h-[44px] min-w-[44px] rounded-xl bg-[#F47721] hover:bg-[#E76513] text-white text-xs font-bold flex items-center justify-center cursor-pointer shrink-0 transition-colors shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
