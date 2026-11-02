import {
  INITIAL_B2B_INQUIRIES,
  INITIAL_CRM_LEADS,
  INITIAL_APPOINTMENTS,
  INITIAL_CAMPAIGNS
} from '../data/mockData.js';


const KEYS = {
  B2B_INQUIRIES: 'autolead_b2b_inquiries_v1',
  CRM_LEADS: 'autolead_crm_leads_v1',
  APPOINTMENTS: 'autolead_appointments_v1',
  CAMPAIGNS: 'autolead_campaigns_v1',
  SETTINGS: 'autolead_settings_v1'
};

// Initialize or get from localStorage
export const storageService = {
  getB2BInquiries: () => {
    const raw = localStorage.getItem(KEYS.B2B_INQUIRIES);
    if (!raw) {
      localStorage.setItem(KEYS.B2B_INQUIRIES, JSON.stringify(INITIAL_B2B_INQUIRIES));
      return INITIAL_B2B_INQUIRIES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_B2B_INQUIRIES;
    }
  },

  addB2BInquiry: (inquiry) => {
    const inquiries = storageService.getB2BInquiries();
    const newInquiry = {
      ...inquiry,
      id: `B2B-${Date.now().toString().slice(-4)}`,
      submittedAt: new Date().toLocaleString('vi-VN', { hour12: false }),
      status: 'Chờ liên hệ'
    };
    const updated = [newInquiry, ...inquiries];
    localStorage.setItem(KEYS.B2B_INQUIRIES, JSON.stringify(updated));
    return newInquiry;
  },

  getCRMLeads: () => {
    const raw = localStorage.getItem(KEYS.CRM_LEADS);
    if (!raw) {
      localStorage.setItem(KEYS.CRM_LEADS, JSON.stringify(INITIAL_CRM_LEADS));
      return INITIAL_CRM_LEADS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_CRM_LEADS;
    }
  },

  addCRMLead: (lead) => {
    const leads = storageService.getCRMLeads();
    const newLead = {
      ...lead,
      id: `LEAD-2024-${String(leads.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toLocaleString('vi-VN', { hour12: false }),
      status: lead.status || 'New Lead',
      qualificationDetails: lead.qualificationDetails || {
        hasValidContact: true,
        hasClearDemand: true,
        hasSpecificModel: Boolean(lead.interestedVehicle),
        meetsTargetCriteria: true,
        agreesToVisitShowroom: false,
        hasSpecificDateTime: false,
        confirmedInSystem: false,
        aiScore: 50,
        aiExplanation: 'Lead mới thêm thủ công. Cần kích hoạt follow-up để sàng lọc.',
        suggestedAction: 'Gửi Zalo giới thiệu thông số xe và chính sách lái thử.'
      },
      notes: [{
        date: new Date().toLocaleString('vi-VN', { hour12: false }),
        author: 'Showroom Manager',
        content: 'Khởi tạo thông tin khách hàng trên hệ thống CRM.'
      }],
      interactionHistory: [{
        type: 'form',
        channel: lead.leadSource || 'Meta Ads',
        time: new Date().toLocaleString('vi-VN', { hour12: false }),
        detail: `Tiếp nhận khách quan tâm ${lead.interestedVehicle || 'xe sang'}`
      }]
    };
    const updated = [newLead, ...leads];
    localStorage.setItem(KEYS.CRM_LEADS, JSON.stringify(updated));
    return newLead;
  },

  updateCRMLead: (updatedLead) => {
    const leads = storageService.getCRMLeads();
    const index = leads.findIndex(l => l.id === updatedLead.id);
    if (index !== -1) {
      leads[index] = updatedLead;
      localStorage.setItem(KEYS.CRM_LEADS, JSON.stringify(leads));
    }
    return updatedLead;
  },

  updateLeadStatus: (leadId, newStatus) => {
    const leads = storageService.getCRMLeads();
    const lead = leads.find(l => l.id === leadId);
    if (lead) {
      lead.status = newStatus;
      lead.notes.unshift({
        date: new Date().toLocaleString('vi-VN', { hour12: false }),
        author: 'Kanban Manager',
        content: `Chuyển trạng thái sang "${newStatus}"`
      });
      lead.interactionHistory.unshift({
        type: 'status-change',
        channel: 'System',
        time: new Date().toLocaleString('vi-VN', { hour12: false }),
        detail: `Quy trình tác nghiệp: Chuyển sang giai đoạn ${newStatus}`
      });
      localStorage.setItem(KEYS.CRM_LEADS, JSON.stringify(leads));
    }
    return lead;
  },

  getAppointments: () => {
    const raw = localStorage.getItem(KEYS.APPOINTMENTS);
    if (!raw) {
      localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
      return INITIAL_APPOINTMENTS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  },

  addAppointment: (apt) => {
    const appointments = storageService.getAppointments();
    const newApt = {
      ...apt,
      id: `APT-${String(appointments.length + 1).padStart(2, '0')}`,
      billableFee: apt.isQualifiedAppointment ? 300000 : 0
    };
    const updated = [newApt, ...appointments];
    localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(updated));
    return newApt;
  },

  updateAppointmentStatus: (aptId, newStatus) => {
    const appointments = storageService.getAppointments();
    const apt = appointments.find(a => a.id === aptId);
    if (apt) {
      apt.status = newStatus;
      // Chỉ tính phí nếu Confirmed hoặc Completed và đủ tiêu chí
      if ((newStatus === 'Confirmed' || newStatus === 'Completed') && apt.isQualifiedAppointment) {
        apt.billableFee = 300000;
      } else if (newStatus === 'Cancelled' || newStatus === 'No-show') {
        apt.billableFee = 0;
      }
      localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(appointments));
    }
    return apt;
  },

  getCampaigns: () => {
    const raw = localStorage.getItem(KEYS.CAMPAIGNS);
    if (!raw) {
      localStorage.setItem(KEYS.CAMPAIGNS, JSON.stringify(INITIAL_CAMPAIGNS));
      return INITIAL_CAMPAIGNS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_CAMPAIGNS;
    }
  },

  addCampaign: (campaign) => {
    const campaigns = storageService.getCampaigns();
    const newCamp = {
      ...campaign,
      id: `CMP-${String(campaigns.length + 1).padStart(2, '0')}`,
      leadsGenerated: 0,
      qualifiedLeads: 0,
      appointmentsBooked: 0,
      cpa: 0,
      status: 'Active'
    };
    const updated = [newCamp, ...campaigns];
    localStorage.setItem(KEYS.CAMPAIGNS, JSON.stringify(updated));
    return newCamp;
  },

  resetAllData: () => {
    localStorage.setItem(KEYS.B2B_INQUIRIES, JSON.stringify(INITIAL_B2B_INQUIRIES));
    localStorage.setItem(KEYS.CRM_LEADS, JSON.stringify(INITIAL_CRM_LEADS));
    localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
    localStorage.setItem(KEYS.CAMPAIGNS, JSON.stringify(INITIAL_CAMPAIGNS));
    return true;
  }
};
