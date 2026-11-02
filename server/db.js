import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SEED_CARS, SEED_LEADS, SEED_APPOINTMENTS, SEED_B2B_INQUIRIES } from './data/seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'data', 'database.json');

const ALL_TIME_SLOTS = [
  '09:00 - 10:30',
  '10:30 - 12:00',
  '14:00 - 15:30',
  '16:00 - 17:30'
];

function initDB() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DB_PATH)) {
    const initialData = {
      cars: SEED_CARS,
      leads: SEED_LEADS,
      appointments: SEED_APPOINTMENTS,
      b2bInquiries: SEED_B2B_INQUIRIES,
      version: 1,
      lastUpdated: new Date().toISOString()
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }

  try {
    const content = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error parsing database.json, reinitializing:', err);
    const initialData = {
      cars: SEED_CARS,
      leads: SEED_LEADS,
      appointments: SEED_APPOINTMENTS,
      b2bInquiries: SEED_B2B_INQUIRIES,
      version: 1,
      lastUpdated: new Date().toISOString()
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
}

function readDB() {
  if (!fs.existsSync(DB_PATH)) {
    return initDB();
  }
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

function writeDB(data) {
  data.lastUpdated = new Date().toISOString();
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export const db = {
  // Cars
  getCars: () => {
    return readDB().cars || [];
  },

  // Leads (Domain B - Buyer Leads)
  getLeads: () => {
    return readDB().leads || [];
  },

  getLeadById: (id) => {
    const leads = readDB().leads || [];
    return leads.find((l) => l.id === id);
  },

  addLead: (leadData) => {
    const data = readDB();
    const leads = data.leads || [];
    const newId = `LEAD-2024-${String(leads.length + 1).padStart(3, '0')}`;

    const newLead = {
      id: newId,
      customerName: leadData.customerName,
      phone: leadData.phone,
      email: leadData.email || '',
      leadSource: leadData.leadSource || 'Buyer Demo Form',
      interestedVehicle: leadData.interestedVehicle || 'Mercedes-Benz C200 Avantgarde 2024',
      vehicleSegment: leadData.vehicleSegment || 'Luxury Sedan',
      purchasePurpose: leadData.purchasePurpose || 'Chưa cung cấp',
      expectedBudget: leadData.expectedBudget || 'Chưa cung cấp',
      expectedPurchasingTime: leadData.expectedPurchasingTime || 'Chưa cung cấp',
      readinessToVisitShowroom: leadData.readinessToVisitShowroom || 'Đang cân nhắc',
      assignedSalesperson: 'Trần Tuấn Anh (Trưởng nhóm)',
      createdAt: new Date().toLocaleString('vi-VN', { hour12: false }),
      status: leadData.status || 'New Lead',
      qualificationDetails: leadData.qualificationDetails || {
        hasValidContact: Boolean(leadData.phone),
        hasClearDemand: false,
        hasSpecificModel: Boolean(leadData.interestedVehicle),
        meetsTargetCriteria: true,
        agreesToVisitShowroom: false,
        hasSpecificDateTime: false,
        confirmedInSystem: false,
        aiScore: 45,
        aiExplanation: 'Lead mới khởi tạo từ Buyer Demo. Cần làm bộ câu hỏi thẩm định nhu cầu.',
        suggestedAction: 'Bắt đầu tương tác qua bộ câu hỏi sàng lọc AI.'
      },
      notes: [
        {
          date: new Date().toLocaleString('vi-VN', { hour12: false }),
          author: 'System',
          content: 'Tiếp nhận thông tin khách hàng từ cổng Buyer Demo.'
        }
      ],
      interactionHistory: [
        {
          type: 'form',
          channel: 'Buyer Demo Form',
          time: new Date().toLocaleString('vi-VN', { hour12: false }),
          detail: `Khách hàng đăng ký lái thử mẫu ${leadData.interestedVehicle || 'Mercedes-Benz C200'}`
        }
      ]
    };

    leads.unshift(newLead);
    data.leads = leads;
    writeDB(data);
    return newLead;
  },

  updateLead: (id, updates) => {
    const data = readDB();
    const leads = data.leads || [];
    const index = leads.findIndex((l) => l.id === id);
    if (index === -1) return null;

    leads[index] = { ...leads[index], ...updates };
    data.leads = leads;
    writeDB(data);
    return leads[index];
  },

  updateLeadStatus: (id, newStatus) => {
    const data = readDB();
    const leads = data.leads || [];
    const lead = leads.find((l) => l.id === id);
    if (!lead) return null;

    lead.status = newStatus;
    if (!lead.notes) lead.notes = [];
    lead.notes.unshift({
      date: new Date().toLocaleString('vi-VN', { hour12: false }),
      author: 'CRM Manager',
      content: `Chuyển trạng thái sang "${newStatus}"`
    });
    if (!lead.interactionHistory) lead.interactionHistory = [];
    lead.interactionHistory.unshift({
      type: 'status-change',
      channel: 'CRM System',
      time: new Date().toLocaleString('vi-VN', { hour12: false }),
      detail: `Tiến độ tác nghiệp: Chuyển sang ${newStatus}`
    });

    data.leads = leads;
    writeDB(data);
    return lead;
  },

  // Appointments (Domain B)
  getAppointments: () => {
    return readDB().appointments || [];
  },

  addAppointment: (aptData) => {
    const data = readDB();
    const appointments = data.appointments || [];
    const newId = `APT-${String(appointments.length + 1).padStart(2, '0')}`;

    const newApt = {
      id: newId,
      leadId: aptData.leadId,
      customerName: aptData.customerName,
      customerPhone: aptData.customerPhone,
      vehicleModel: aptData.vehicleModel,
      appointmentDate: aptData.appointmentDate,
      appointmentTime: aptData.appointmentTime,
      salesperson: aptData.salesperson || 'Trần Tuấn Anh',
      status: 'Confirmed',
      isQualifiedAppointment: true,
      billableFee: 300000,
      notes: aptData.notes || 'Khách đặt qua Buyer Demo sau khi đạt chuẩn 7 tiêu chí.',
      createdAt: new Date().toLocaleString('vi-VN', { hour12: false })
    };

    appointments.unshift(newApt);
    data.appointments = appointments;

    // Also update corresponding lead status to 'Appointment Booked'
    if (aptData.leadId) {
      const leads = data.leads || [];
      const lead = leads.find((l) => l.id === aptData.leadId);
      if (lead) {
        lead.status = 'Appointment Booked';
        if (lead.qualificationDetails) {
          lead.qualificationDetails.hasSpecificDateTime = true;
          lead.qualificationDetails.confirmedInSystem = true;
          lead.qualificationDetails.aiScore = 98;
          lead.qualificationDetails.aiExplanation = `Đã chốt lịch lái thử ${newApt.vehicleModel} vào ${newApt.appointmentDate} lúc ${newApt.appointmentTime}. Đạt 7/7 tiêu chí chất lượng.`;
        }
        if (!lead.notes) lead.notes = [];
        lead.notes.unshift({
          date: new Date().toLocaleString('vi-VN', { hour12: false }),
          author: 'Automated Booking Engine',
          content: `Đã xác nhận lịch hẹn ${newId} cho dòng xe ${newApt.vehicleModel}. Phí nghiệm thu: 300.000 VNĐ.`
        });
      }
    }

    writeDB(data);
    return newApt;
  },

  updateAppointmentStatus: (id, newStatus) => {
    const data = readDB();
    const appointments = data.appointments || [];
    const apt = appointments.find((a) => a.id === id);
    if (!apt) return null;

    apt.status = newStatus;
    if (newStatus === 'Confirmed' || newStatus === 'Completed') {
      apt.billableFee = 300000;
    } else {
      apt.billableFee = 0; // Cancelled or No-show not billable
    }

    data.appointments = appointments;
    writeDB(data);
    return apt;
  },

  // Available Slots with CONFLICT CHECK (Chống đặt trùng lịch)
  getAvailableSlots: (date, vehicleModel) => {
    const appointments = readDB().appointments || [];
    // Find slots already taken on this date for this vehicle model
    const bookedSlots = appointments
      .filter(
        (a) =>
          a.appointmentDate === date &&
          a.vehicleModel === vehicleModel &&
          a.status !== 'Cancelled'
      )
      .map((a) => a.appointmentTime);

    return ALL_TIME_SLOTS.map((slot) => ({
      slot,
      isAvailable: !bookedSlots.includes(slot),
      bookedBy: bookedSlots.includes(slot) ? 'Đã có khách hẹn' : null
    }));
  },

  // Domain A: B2B Showroom Inquiries
  getB2BInquiries: () => {
    return readDB().b2bInquiries || [];
  },

  addB2BInquiry: (inquiry) => {
    const data = readDB();
    const inquiries = data.b2bInquiries || [];
    const newInquiry = {
      ...inquiry,
      id: `B2B-${Date.now().toString().slice(-4)}`,
      submittedAt: new Date().toLocaleString('vi-VN', { hour12: false }),
      status: 'Chờ liên hệ'
    };
    inquiries.unshift(newInquiry);
    data.b2bInquiries = inquiries;
    writeDB(data);
    return newInquiry;
  },

  // Dashboard Stats
  getDashboardStats: () => {
    const d = readDB();
    const leads = d.leads || [];
    const appointments = d.appointments || [];

    const totalLeads = leads.length;
    const newLeads = leads.filter((l) => l.status === 'New Lead').length;
    const contactedLeads = leads.filter((l) => l.status === 'Contacted').length;
    const qualifiedLeads = leads.filter((l) => l.status === 'Qualified Lead').length;
    const bookedAppointments = leads.filter((l) => l.status === 'Appointment Booked').length;
    const showroomVisits = leads.filter((l) => l.status === 'Showroom Visit').length;
    const salesOpportunities = leads.filter((l) => l.status === 'Sales Opportunity').length;

    const billableAppointments = appointments.filter(
      (a) =>
        a.isQualifiedAppointment &&
        (a.status === 'Confirmed' || a.status === 'Completed')
    );
    const totalBillableFee = billableAppointments.length * 300000;

    return {
      totalLeads,
      newLeads,
      contactedLeads,
      qualifiedLeads,
      bookedAppointments,
      showroomVisits,
      salesOpportunities,
      totalAppointments: appointments.length,
      billableAppointmentsCount: billableAppointments.length,
      totalBillableFee,
      setupFee: 15000000,
      totalBilling: 15000000 + totalBillableFee
    };
  },

  resetDatabase: () => {
    const initialData = {
      cars: SEED_CARS,
      leads: SEED_LEADS,
      appointments: SEED_APPOINTMENTS,
      b2bInquiries: SEED_B2B_INQUIRIES,
      version: 1,
      lastUpdated: new Date().toISOString()
    };
    writeDB(initialData);
    return initialData;
  }
};
