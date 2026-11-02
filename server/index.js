import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5173;

app.use(cors());
app.use(express.json());

// API ROUTES
// 1. Cars (Demo Models)
app.get('/api/cars', (req, res) => {
  res.json({ success: true, data: db.getCars() });
});

// 2. Auth: Dealer Demo Login (Strict Validation - Bug 10 Fix)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const cleanEmail = (email || '').trim().toLowerCase();

  const validUsers = [
    {
      email: 'dealer@haxaco.vn',
      password: 'demo123',
      id: 'usr-01',
      name: 'Trần Tuấn Anh (Trưởng Nhóm Bán Hàng)',
      role: 'Dealer Manager',
      showroom: 'Mercedes-Benz Haxaco Sài Gòn'
    },
    {
      email: 'admin@autolead.com',
      password: 'demo123',
      id: 'usr-admin',
      name: 'Nguyễn Văn Đại (Quản trị viên Hệ thống)',
      role: 'System Admin',
      showroom: 'AutoLead Systems Headquarters'
    },
    {
      email: 'dai@autolead.systems',
      password: 'demo123',
      id: 'usr-dai',
      name: 'Trần Quang Đại (Core MVP Lead)',
      role: 'Core Architect',
      showroom: 'AutoLead Systems Tech Unit'
    },
    {
      email: 'thang@autolead.systems',
      password: 'demo123',
      id: 'usr-thang',
      name: 'Nguyễn Việt Thắng (B2B Growth Lead)',
      role: 'B2B Growth Manager',
      showroom: 'AutoLead Showroom Partner Unit'
    }
  ];

  const foundUser = validUsers.find(
    (u) => u.email === cleanEmail && u.password === password
  );

  if (foundUser) {
    return res.json({
      success: true,
      user: {
        id: foundUser.id,
        name: foundUser.name,
        role: foundUser.role,
        showroom: foundUser.showroom,
        email: foundUser.email
      },
      token: `demo-jwt-token-${foundUser.id}-2026`
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Email hoặc mật khẩu không chính xác. Tài khoản demo: dealer@haxaco.vn / demo123'
  });
});

// 3. Buyer Journey Step 1: Create Lead (Domain B)
app.post('/api/buyer/lead', (req, res) => {
  const { customerName, phone, email, interestedVehicle, vehicleSegment } = req.body;
  if (!customerName || !phone) {
    return res.status(400).json({ success: false, message: 'Vui lòng cung cấp họ tên và số điện thoại.' });
  }

  // Validate VN mobile phone
  const cleanPhone = phone.replace(/\s+/g, '');
  if (!/^(0[3|5|7|8|9])[0-9]{8}$/.test(cleanPhone)) {
    return res.status(400).json({
      success: false,
      message: 'Số điện thoại không đúng định dạng di động Việt Nam (10 chữ số).'
    });
  }

  const newLead = db.addLead({
    customerName,
    phone: cleanPhone,
    email: email || '',
    interestedVehicle: interestedVehicle || 'Mercedes-Benz C200 Avantgarde 2024',
    vehicleSegment: vehicleSegment || 'Luxury Sedan',
    leadSource: 'Buyer Demo Portal'
  });

  res.status(201).json({
    success: true,
    message: 'Khởi tạo lead người mua xe thành công.',
    data: newLead
  });
});

// 4. Buyer Journey Step 2: AI Qualification Questionnaire
app.post('/api/buyer/qualify', (req, res) => {
  const { leadId, purchasePurpose, expectedPurchasingTime, expectedBudget, readinessToVisitShowroom } = req.body;
  if (!leadId) {
    return res.status(400).json({ success: false, message: 'Thiếu mã leadId.' });
  }

  const existingLead = db.getLeadById(leadId);
  if (!existingLead) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy thông tin khách hàng.' });
  }

  // Calculate qualification score based on answers
  let score = 50;
  if (purchasePurpose) score += 15;
  if (expectedPurchasingTime && !expectedPurchasingTime.includes('Khảo sát')) score += 15;
  if (expectedBudget && expectedBudget !== 'Chưa tiết lộ') score += 10;
  if (readinessToVisitShowroom && readinessToVisitShowroom.includes('Sẵn sàng')) score += 10;

  const isQualified = score >= 80;
  const newStatus = isQualified ? 'Qualified Lead' : 'Contacted';

  const aiExplanation = isQualified
    ? `Khách hàng đáp ứng tiêu chuẩn chất lượng (Điểm AI: ${score}%): Nhu cầu sử dụng rõ ràng (${purchasePurpose}), dự kiến mua ${expectedPurchasingTime}, sẵn sàng ghé showroom trải nghiệm thực tế.`
    : `Khách hàng đang trong quá trình khảo sát thông tin (Điểm AI: ${score}%). Cần tư vấn viên chủ động gửi thêm catalogue và thông số kỹ thuật.`;

  const updatedLead = db.updateLead(leadId, {
    purchasePurpose,
    expectedPurchasingTime,
    expectedBudget,
    readinessToVisitShowroom,
    status: newStatus,
    qualificationDetails: {
      hasValidContact: true,
      hasClearDemand: true,
      hasSpecificModel: true,
      meetsTargetCriteria: true,
      agreesToVisitShowroom: readinessToVisitShowroom?.includes('Sẵn sàng') || false,
      hasSpecificDateTime: false,
      confirmedInSystem: false,
      aiScore: score,
      aiExplanation,
      suggestedAction: isQualified
        ? 'Chuyển sang bước chọn ngày giờ lái thử để đạt chuẩn 7/7 tiêu chuẩn (Phí nghiệm thu: 300.000 VNĐ).'
        : 'Gợi ý khung giờ trải nghiệm cuối tuần để thuyết phục khách đặt lịch.'
    }
  });

  res.json({
    success: true,
    isQualified,
    aiScore: score,
    aiExplanation,
    data: updatedLead
  });
});

// 5. Buyer Journey Step 3: Check Available Time Slots (Conflict Prevention / Chống đặt trùng)
app.get('/api/buyer/slots', (req, res) => {
  const { date, vehicleModel } = req.query;
  if (!date || !vehicleModel) {
    return res.status(400).json({ success: false, message: 'Cần cung cấp ngày và dòng xe lái thử.' });
  }

  const slots = db.getAvailableSlots(date, vehicleModel);
  res.json({
    success: true,
    date,
    vehicleModel,
    slots
  });
});

// 6. Buyer Journey Step 4: Book Test Drive Appointment (Bug 5 Fix - HTTP 409 Conflict)
app.post('/api/buyer/appointment', (req, res) => {
  const { leadId, customerName, customerPhone, vehicleModel, appointmentDate, appointmentTime, notes } = req.body;
  if (!customerName || !customerPhone || !vehicleModel || !appointmentDate || !appointmentTime) {
    return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin đặt lịch.' });
  }

  // Double booking conflict check
  const slots = db.getAvailableSlots(appointmentDate, vehicleModel);
  const chosenSlot = slots.find((s) => s.slot === appointmentTime);
  if (chosenSlot && !chosenSlot.isAvailable) {
    return res.status(409).json({
      success: false,
      message: `Khung giờ ${appointmentTime} vào ngày ${appointmentDate} của mẫu xe ${vehicleModel} đã có khách khác đặt trước. Vui lòng chọn khung giờ khác.`
    });
  }

  const newApt = db.addAppointment({
    leadId,
    customerName,
    customerPhone,
    vehicleModel,
    appointmentDate,
    appointmentTime,
    notes
  });

  res.status(201).json({
    success: true,
    message: 'Đặt lịch lái thử thành công!',
    data: newApt
  });
});

// 7. Dealer CRM Endpoints (Domain B)
app.get('/api/dealer/leads', (req, res) => {
  res.json({ success: true, data: db.getLeads() });
});

app.put('/api/dealer/leads/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = db.updateLeadStatus(id, status);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy lead.' });
  }
  res.json({ success: true, data: updated });
});

app.get('/api/dealer/appointments', (req, res) => {
  res.json({ success: true, data: db.getAppointments() });
});

app.put('/api/dealer/appointments/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = db.updateAppointmentStatus(id, status);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy lịch hẹn.' });
  }
  res.json({ success: true, data: updated });
});

app.get('/api/dealer/dashboard', (req, res) => {
  res.json({ success: true, data: db.getDashboardStats() });
});

// 8. Domain A: B2B Showroom Inquiries Endpoints (GET & POST)
app.get('/api/dealer/b2b-inquiries', (req, res) => {
  res.json({ success: true, data: db.getB2BInquiries() });
});

app.post('/api/dealer/b2b-inquiries', (req, res) => {
  const inquiry = req.body;
  if (!inquiry || !inquiry.phone || !inquiry.showroom_name) {
    return res.status(400).json({
      success: false,
      message: 'Vui lòng cung cấp đầy đủ tên đại lý và số điện thoại liên hệ.'
    });
  }
  const created = db.addB2BInquiry(inquiry);
  res.status(201).json({
    success: true,
    message: 'Đăng ký tư vấn B2B Showroom thành công!',
    data: created
  });
});

app.post('/api/dealer/reset', (req, res) => {
  db.resetDatabase();
  res.json({ success: true, message: 'Đã khôi phục dữ liệu mẫu gốc thành công.' });
});

// SERVE STATIC CLIENT BUILD
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// Fallback to index.html for SPA routes (Express 5 compatible)
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// START SERVER
app.listen(PORT, '0.0.0.0', () => {
  console.log(`AutoLead Systems Backend & Full-Stack Server listening on http://0.0.0.0:${PORT}`);
});
