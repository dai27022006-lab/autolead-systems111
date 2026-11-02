import { storageService } from './storage.js';

const API_BASE = '/api';

async function fetchJSON(url, options = {}) {
  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const errorMsg = data?.message || `HTTP error ${res.status}`;
      const err = new Error(errorMsg);
      err.status = res.status;
      err.data = data;
      throw err;
    }

    return data;
  } catch (err) {
    // If it's an explicit 409 Conflict or 400 Bad Request, re-throw so the UI displays the error!
    if (err.status === 409 || err.status === 400 || err.status === 401) {
      throw err;
    }
    console.warn(`API call failed for ${url}, using local fallback:`, err);
    return null;
  }
}

export const api = {
  // Cars (Demo Inventory)
  getCars: async () => {
    const res = await fetchJSON(`${API_BASE}/cars`);
    if (res && res.success) return res.data;
    return [
      {
        id: 'car-c200',
        name: 'Mercedes-Benz C200 Avantgarde 2024',
        segment: 'Luxury Sedan',
        price: '1.599.000.000 VNĐ',
        specs: 'Động cơ 1.5L Turbo Mild-Hybrid 204HP, Hộp số 9G-TRONIC, Màn hình 11.9 inch',
        image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
        status: 'Sẵn sàng lái thử'
      },
      {
        id: 'car-glc300',
        name: 'Mercedes-Benz GLC 300 4MATIC 2024',
        segment: 'Luxury SUV',
        price: '2.799.000.000 VNĐ',
        specs: 'Động cơ 2.0L Turbo 258HP, Dẫn động 4 bánh toàn thời gian 4MATIC, Cửa sổ trời',
        image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80',
        status: 'Sẵn sàng lái thử'
      },
      {
        id: 'car-e300',
        name: 'Mercedes-Benz E300 AMG 2024',
        segment: 'Executive Sedan',
        price: '3.209.000.000 VNĐ',
        specs: 'Gói thể thao AMG Line cao cấp, Đèn Digital Light, Hệ thống âm thanh Burmester',
        image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
        status: 'Sẵn sàng lái thử'
      },
      {
        id: 'car-porsche-macan',
        name: 'Porsche Macan GTS 2023 (Xe Lướt Cao Cấp)',
        segment: 'Sport Compact SUV',
        price: '4.850.000.000 VNĐ',
        specs: 'Odo 9.500 km, Động cơ 2.9L V6 Twin-Turbo 440HP, Lịch sử bảo dưỡng chính hãng',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
        status: 'Sẵn sàng lái thử'
      }
    ];
  },

  // Auth: Dealer Demo Login (Bug 10 Fix)
  login: async (email, password) => {
    try {
      const res = await fetchJSON(`${API_BASE}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      if (res && res.success) {
        localStorage.setItem('autolead_dealer_token', res.token);
        localStorage.setItem('autolead_dealer_user', JSON.stringify(res.user));
        return res;
      }
    } catch (err) {
      if (err.status === 401) throw err;
    }

    // Local authentication fallback if server offline
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
        name: 'Nguyễn Việt Thắng (B2B Lead)',
        role: 'B2B Growth Manager',
        showroom: 'AutoLead Showroom Partner Unit'
      }
    ];

    const match = validUsers.find((u) => u.email === cleanEmail && u.password === password);
    if (match) {
      const userObj = {
        id: match.id,
        name: match.name,
        role: match.role,
        showroom: match.showroom,
        email: match.email
      };
      localStorage.setItem('autolead_dealer_token', `offline-token-${match.id}`);
      localStorage.setItem('autolead_dealer_user', JSON.stringify(userObj));
      return { success: true, user: userObj, token: `offline-token-${match.id}` };
    }

    const err = new Error('Email hoặc mật khẩu không chính xác. Tài khoản demo: dealer@haxaco.vn / demo123');
    err.status = 401;
    throw err;
  },

  getCurrentUser: () => {
    try {
      const u = localStorage.getItem('autolead_dealer_user');
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem('autolead_dealer_token');
    localStorage.removeItem('autolead_dealer_user');
  },

  // Buyer Journey Step 1: Create Lead
  createBuyerLead: async (leadData) => {
    const res = await fetchJSON(`${API_BASE}/buyer/lead`, {
      method: 'POST',
      body: JSON.stringify(leadData)
    });
    if (res && res.success) return res.data;

    // Fallback to storageService
    return storageService.addLead(leadData);
  },

  // Buyer Journey Step 2: AI Qualification Questionnaire
  qualifyBuyerLead: async (qualificationData) => {
    const res = await fetchJSON(`${API_BASE}/buyer/qualify`, {
      method: 'POST',
      body: JSON.stringify(qualificationData)
    });
    if (res && res.success) return res;

    return {
      success: true,
      isQualified: true,
      aiScore: 95,
      aiExplanation: 'Khách hàng quan tâm mẫu xe cụ thể, tài chính phù hợp và sẵn sàng đến showroom trải nghiệm thực tế.',
      data: { id: qualificationData.leadId, status: 'Qualified Lead' }
    };
  },

  // Buyer Journey Step 3: Check Available Slots
  getAvailableSlots: async (date, vehicleModel) => {
    const res = await fetchJSON(
      `${API_BASE}/buyer/slots?date=${encodeURIComponent(date)}&vehicleModel=${encodeURIComponent(vehicleModel)}`
    );
    if (res && res.success) return res.slots;

    const apts = storageService.getAppointments();
    const booked = apts
      .filter((a) => a.appointmentDate === date && a.vehicleModel === vehicleModel && a.status !== 'Cancelled')
      .map((a) => a.appointmentTime);
    const allSlots = ['09:00 - 10:30', '10:30 - 12:00', '14:00 - 15:30', '16:00 - 17:30'];
    return allSlots.map((s) => ({
      slot: s,
      isAvailable: !booked.includes(s),
      bookedBy: booked.includes(s) ? 'Đã có khách hẹn' : null
    }));
  },

  // Buyer Journey Step 4: Book Appointment (Bug 5 Fix - Propagates 409 Conflict)
  bookAppointment: async (appointmentData) => {
    try {
      const res = await fetchJSON(`${API_BASE}/buyer/appointment`, {
        method: 'POST',
        body: JSON.stringify(appointmentData)
      });
      if (res && res.success) return res.data;
    } catch (err) {
      if (err.status === 409) {
        // DO NOT silently save duplicate appointment in localStorage! Re-throw to UI.
        throw err;
      }
      console.warn('Backend booking failed with non-conflict error:', err);
    }

    // Local offline check if server is unreachable
    const apts = storageService.getAppointments();
    const isConflict = apts.some(
      (a) =>
        a.appointmentDate === appointmentData.appointmentDate &&
        a.appointmentTime === appointmentData.appointmentTime &&
        a.vehicleModel === appointmentData.vehicleModel &&
        a.status !== 'Cancelled'
    );

    if (isConflict) {
      const conflictErr = new Error(
        `Khung giờ ${appointmentData.appointmentTime} vào ngày ${appointmentData.appointmentDate} của mẫu xe ${appointmentData.vehicleModel} đã có khách khác đặt trước. Vui lòng chọn khung giờ khác.`
      );
      conflictErr.status = 409;
      throw conflictErr;
    }

    const newApt = storageService.addAppointment({
      ...appointmentData,
      isQualifiedAppointment: true,
      status: 'Confirmed'
    });
    if (appointmentData.leadId) {
      storageService.updateLeadStatus(appointmentData.leadId, 'Appointment Booked');
    }
    return newApt;
  },

  // Dealer CRM Endpoints
  getDealerLeads: async () => {
    const res = await fetchJSON(`${API_BASE}/dealer/leads`);
    if (res && res.success) return res.data;
    return storageService.getLeads();
  },

  updateLeadStatus: async (leadId, newStatus) => {
    const res = await fetchJSON(`${API_BASE}/dealer/leads/${leadId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status: newStatus })
    });
    if (res && res.success) return res.data;
    return storageService.updateLeadStatus(leadId, newStatus);
  },

  getDealerAppointments: async () => {
    const res = await fetchJSON(`${API_BASE}/dealer/appointments`);
    if (res && res.success) return res.data;
    return storageService.getAppointments();
  },

  updateAppointmentStatus: async (aptId, newStatus) => {
    const res = await fetchJSON(`${API_BASE}/dealer/appointments/${aptId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status: newStatus })
    });
    if (res && res.success) return res.data;
    return storageService.updateAppointmentStatus(aptId, newStatus);
  },

  getDashboardStats: async () => {
    const res = await fetchJSON(`${API_BASE}/dealer/dashboard`);
    if (res && res.success) return res.data;
    return storageService.getDashboardStats();
  },

  // Domain A: B2B Inquiries
  getB2BInquiries: async () => {
    const res = await fetchJSON(`${API_BASE}/dealer/b2b-inquiries`);
    if (res && res.success) return res.data;
    return storageService.getB2BInquiries();
  },

  createB2BInquiry: async (inquiryData) => {
    const res = await fetchJSON(`${API_BASE}/dealer/b2b-inquiries`, {
      method: 'POST',
      body: JSON.stringify(inquiryData)
    });
    if (res && res.success) return res.data;
    return storageService.addB2BInquiry(inquiryData);
  },

  resetDatabase: async () => {
    await fetchJSON(`${API_BASE}/dealer/reset`, { method: 'POST' });
    storageService.resetToSeed();
    return true;
  }
};
