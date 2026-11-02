// ==========================================
// AUTOLEAD SYSTEMS - DATA MODELS & SEED DATA
// Tuân thủ nghiêm ngặt 2 miền dữ liệu độc lập:
// Domain A: B2B Showroom Inquiries (Sales Page)
// Domain B: Car Buyer Leads (CRM Operations)
// ==========================================

export const INITIAL_B2B_INQUIRIES = [
  {
    id: 'B2B-101',
    dealershipName: 'Mercedes-Benz Haxaco Sài Gòn',
    contactPerson: 'Ông Nguyễn Trọng Đức',
    phone: '0903847291',
    email: 'duc.nguyen@haxaco.com.vn',
    location: 'Quận Bình Thạnh, TP. Hồ Chí Minh',
    dealershipType: 'Đại lý chính hãng xe sang',
    monthlyLeadVolume: '150 - 300 leads/tháng',
    status: 'Đang triển khai 30 ngày',
    notes: 'Cần tối ưu chuyển đổi phân khúc GLC và E-Class, giảm tải cho 12 nhân viên sales.',
    submittedAt: '2026-10-25 09:30'
  },
  {
    id: 'B2B-102',
    dealershipName: 'Porsche Saigon Studio & Gallery',
    contactPerson: 'Bà Lê Khánh Linh',
    phone: '0918234567',
    email: 'linh.le@porsche-saigon.vn',
    location: 'Quận 7, TP. Hồ Chí Minh',
    dealershipType: 'Đại lý siêu sang',
    monthlyLeadVolume: '80 - 150 leads/tháng',
    status: 'Đã tư vấn & Thống nhất tiêu chí',
    notes: 'Yêu cầu kịch bản AI lọc kỹ khả năng tài chính và phân khúc Macan / Cayenne.',
    submittedAt: '2026-10-28 14:15'
  },
  {
    id: 'B2B-103',
    dealershipName: 'Auto 568 Luxury Used Cars',
    contactPerson: 'Ông Vũ Tuấn Kiệt',
    phone: '0937889922',
    email: 'kiet.auto568@gmail.com',
    location: 'Cầu Giấy, TP. Hà Nội',
    dealershipType: 'Showroom xe lướt cao cấp',
    monthlyLeadVolume: '200 - 400 leads/tháng',
    status: 'Chờ liên hệ',
    notes: 'Muốn tự động hoá tiếp nhận khách từ kênh Zalo và TikTok Ads.',
    submittedAt: '2026-10-31 16:40'
  }
];

export const INITIAL_CRM_LEADS = [
  {
    id: 'LEAD-2024-001',
    customerName: 'Hoàng Minh Tuấn',
    phone: '0912 345 678',
    email: 'tuan.hoangminh@gmail.com',
    leadSource: 'Meta Ads (Facebook)',
    campaignName: 'GLC 300 4MATIC - Luxury Weekend',
    interestedVehicle: 'Mercedes-Benz GLC 300 4MATIC 2024',
    vehicleSegment: 'Luxury SUV',
    purchasePurpose: 'Gia đình & Công việc ngoại giao',
    expectedBudget: '2.8 - 3.2 tỷ VNĐ',
    expectedPurchasingTime: 'Trong 2 tuần tới',
    readinessToVisitShowroom: 'Sẵn sàng thứ 7 tuần này',
    assignedSalesperson: 'Trần Tuấn Anh',
    createdAt: '2026-10-30 08:30',
    status: 'Appointment Booked',
    qualificationDetails: {
      hasValidContact: true,
      hasClearDemand: true,
      hasSpecificModel: true,
      meetsTargetCriteria: true,
      agreesToVisitShowroom: true,
      hasSpecificDateTime: true,
      confirmedInSystem: true,
      aiScore: 96,
      aiExplanation: 'Khách hàng có ngân sách rõ ràng (3 tỷ), đã xác nhận số điện thoại Zalo chính chủ, đồng ý đến showroom lái thử GLC 300 lúc 14:00 Thứ Bảy.',
      suggestedAction: 'Bàn giao hồ sơ xe và catalogue màu nội thất cho Sales Tuấn Anh tiếp đón.'
    },
    notes: [
      { date: '2026-10-30 08:31', author: 'AI Agent', content: 'Tiếp nhận thông tin từ Lead Form Facebook. Gửi tin nhắn chào tự động qua Zalo.' },
      { date: '2026-10-30 08:35', author: 'AI Agent', content: 'Khách phản hồi Zalo: Thích màu Trắng Polar, nội thất Nâu da bò. Đặt lịch thử 14:00 Thứ Bảy.' }
    ],
    interactionHistory: [
      { type: 'form', channel: 'Meta Ads', time: '2026-10-30 08:30', detail: 'Điền form quảng cáo GLC 300 ưu đãi lệ phí trước bạ' },
      { type: 'zalo', channel: 'Zalo OA', time: '2026-10-30 08:31', detail: 'AI gửi brochure và video đánh giá chi tiết GLC 300' },
      { type: 'ai-call', channel: 'Callio AI Call', time: '2026-10-30 08:34', detail: 'Cuộc gọi 90s: Xác nhận nhu cầu lái thử, khách chọn chiều thứ 7' },
      { type: 'status-change', channel: 'System', time: '2026-10-30 08:36', detail: 'Chuyển trạng thái sang Appointment Booked (Đạt 7/7 tiêu chí)' }
    ]
  },
  {
    id: 'LEAD-2024-002',
    customerName: 'Nguyễn Bích Phương',
    phone: '0988 776 543',
    email: 'bichphuong.nguyen@vietin.com',
    leadSource: 'Google Search Ads',
    campaignName: 'Porsche Macan 2024 - Khẳng Định Đẳng Cấp',
    interestedVehicle: 'Porsche Macan GTS 2023 (Lướt 8.000km)',
    vehicleSegment: 'Xe lướt hạng sang',
    purchasePurpose: 'Xe cá nhân hàng ngày',
    expectedBudget: 'Khoảng 4.2 tỷ VNĐ',
    expectedPurchasingTime: 'Trong tháng này',
    readinessToVisitShowroom: 'Sẵn sàng sáng Chủ Nhật',
    assignedSalesperson: 'Lê Thu Hà',
    createdAt: '2026-10-30 10:15',
    status: 'Showroom Visit',
    qualificationDetails: {
      hasValidContact: true,
      hasClearDemand: true,
      hasSpecificModel: true,
      meetsTargetCriteria: true,
      agreesToVisitShowroom: true,
      hasSpecificDateTime: true,
      confirmedInSystem: true,
      aiScore: 98,
      aiExplanation: 'Khách hàng phân khúc cao cấp, đã hoàn thành lái thử sáng Chủ Nhật với Sales Thu Hà. Rất ưng ý chất lượng xe lướt.',
      suggestedAction: 'Soạn thảo bảng tính trả góp ngân hàng và phương án sang tên bàn giao xe.'
    },
    notes: [
      { date: '2026-10-30 10:20', author: 'AI Agent', content: 'Đã gửi thông số kiểm định 111 điểm chính hãng của chiếc Macan GTS.' },
      { date: '2026-10-31 09:30', author: 'Lê Thu Hà (Sales)', content: 'Khách đến showroom đúng hẹn, chạy thử cung đường Phú Mỹ Hưng, đánh giá xe rất mới.' }
    ],
    interactionHistory: [
      { type: 'form', channel: 'Google Ads', time: '2026-10-30 10:15', detail: 'Tìm kiếm từ khóa: "Porsche Macan lướt chính hãng TP.HCM"' },
      { type: 'zalo', channel: 'Zalo OA', time: '2026-10-30 10:16', detail: 'AI cung cấp hình chụp thực tế nội ngoại thất và số VIN' },
      { type: 'status-change', channel: 'System', time: '2026-10-31 09:45', detail: 'Check-in tại Showroom: Chuyển trạng thái sang Showroom Visit' }
    ]
  },
  {
    id: 'LEAD-2024-003',
    customerName: 'Đặng Quốc Huy',
    phone: '0909 112 334',
    email: 'huy.dangquoc@gmail.com',
    leadSource: 'TikTok Ads',
    campaignName: 'BMW X5 xDrive40i - Trải Nghiệm Thủ Lĩnh',
    interestedVehicle: 'BMW X5 xDrive40i M Sport',
    vehicleSegment: 'Luxury SUV',
    purchasePurpose: 'Nâng cấp từ xe Sedan phổ thông',
    expectedBudget: '3.5 - 4 tỷ VNĐ',
    expectedPurchasingTime: 'Trong 1 tháng tới',
    readinessToVisitShowroom: 'Cần sắp xếp lịch công tác',
    assignedSalesperson: 'Nguyễn Hoàng Nam',
    createdAt: '2026-10-31 14:00',
    status: 'Qualified Lead',
    qualificationDetails: {
      hasValidContact: true,
      hasClearDemand: true,
      hasSpecificModel: true,
      meetsTargetCriteria: true,
      agreesToVisitShowroom: true,
      hasSpecificDateTime: false,
      confirmedInSystem: false,
      aiScore: 82,
      aiExplanation: 'Khách có nhu cầu và tài chính thật, quan tâm X5 M Sport nhưng đang đi công tác Hải Phòng, hẹn thứ 5 tuần sau chốt giờ cụ thể.',
      suggestedAction: 'AI tự động gửi video so sánh X5 và GLE vào thứ 4 để hâm nóng tương tác.'
    },
    notes: [
      { date: '2026-10-31 14:05', author: 'AI Agent', content: 'Đã hoàn tất sàng lọc 5/7 tiêu chí. Cần chốt ngày giờ cụ thể để đạt chuẩn Billable Appointment.' }
    ],
    interactionHistory: [
      { type: 'form', channel: 'TikTok Ads', time: '2026-10-31 14:00', detail: 'Click video review tính năng Hỗ trợ lùi xe tự động X5' },
      { type: 'ai-call', channel: 'Callio AI Call', time: '2026-10-31 14:04', detail: 'Trao đổi 2 phút: Xác nhận ngân sách và thời điểm mua xe' }
    ]
  },
  {
    id: 'LEAD-2024-004',
    customerName: 'Phạm Thành Long',
    phone: '0977 456 789',
    email: 'long.pt@investcorp.vn',
    leadSource: 'Meta Ads (Facebook)',
    campaignName: 'Mercedes-Benz E-Class Exclusive',
    interestedVehicle: 'Mercedes-Benz E200 Exclusive 2024',
    vehicleSegment: 'Luxury Sedan',
    purchasePurpose: 'Công ty đưa đón đối tác',
    expectedBudget: 'Khoảng 2.5 tỷ VNĐ',
    expectedPurchasingTime: 'Tuần sau',
    readinessToVisitShowroom: 'Đang xem xét',
    assignedSalesperson: 'Chưa phân bổ',
    createdAt: '2026-11-01 09:10',
    status: 'Contacted',
    qualificationDetails: {
      hasValidContact: true,
      hasClearDemand: true,
      hasSpecificModel: true,
      meetsTargetCriteria: true,
      agreesToVisitShowroom: false,
      hasSpecificDateTime: false,
      confirmedInSystem: false,
      aiScore: 65,
      aiExplanation: 'Đã xác thực số điện thoại và phân khúc xe E-Class. Đang chờ khách phản hồi khung giờ lái thử tận nơi hoặc tại showroom.',
      suggestedAction: 'Kích hoạt kịch bản AI: Gợi ý mang xe đến cơ quan lái thử tận nơi.'
    },
    notes: [
      { date: '2026-11-01 09:12', author: 'AI Agent', content: 'Gửi bảng giá lăn bánh và chính sách khấu trừ thuế doanh nghiệp.' }
    ],
    interactionHistory: [
      { type: 'form', channel: 'Meta Ads', time: '2026-11-01 09:10', detail: 'Điền form quan tâm gói vay ưu đãi 0% lãi suất' },
      { type: 'zalo', channel: 'Zalo OA', time: '2026-11-01 09:11', detail: 'Đã kết bạn Zalo thành công, gửi tài liệu pháp lý xe' }
    ]
  },
  {
    id: 'LEAD-2024-005',
    customerName: 'Võ Minh Quân',
    phone: '0932 889 001',
    email: 'quan.vm@gmail.com',
    leadSource: 'Zalo OA',
    campaignName: 'Lexus RX 350 - Tinh Hoa Đẳng Cấp',
    interestedVehicle: 'Lexus RX 350 Premium 2023 (Lướt)',
    vehicleSegment: 'Xe lướt hạng sang',
    purchasePurpose: 'Gia đình',
    expectedBudget: 'Khoảng 3.3 tỷ VNĐ',
    expectedPurchasingTime: 'Trong 3 ngày',
    readinessToVisitShowroom: 'Sẵn sàng',
    assignedSalesperson: 'Trần Tuấn Anh',
    createdAt: '2026-11-01 10:45',
    status: 'New Lead',
    qualificationDetails: {
      hasValidContact: true,
      hasClearDemand: false,
      hasSpecificModel: true,
      meetsTargetCriteria: false,
      agreesToVisitShowroom: false,
      hasSpecificDateTime: false,
      confirmedInSystem: false,
      aiScore: 40,
      aiExplanation: 'Lead mới đổ về hệ thống từ Zalo OA. AI đang trong hàng đợi kích hoạt liên hệ lần 1.',
      suggestedAction: 'Kích hoạt gọi AI thoại tự động trong vòng 60 giây theo quy trình Lean.'
    },
    notes: [
      { date: '2026-11-01 10:45', author: 'System', content: 'Ghi nhận lead mới, bắt đầu bộ đếm thời gian phản hồi (Response Timer).' }
    ],
    interactionHistory: [
      { type: 'zalo', channel: 'Zalo OA', time: '2026-11-01 10:45', detail: 'Nhấp quan tâm mẫu RX 350 lướt màu Đen' }
    ]
  },
  {
    id: 'LEAD-2024-006',
    customerName: 'Trịnh Thảo Vy',
    phone: '0944 556 677',
    email: 'thaovy.trinh@fashionista.vn',
    leadSource: 'Website Showcase',
    campaignName: 'Audi Q5 Sportback - Phong Cách Của Bạn',
    interestedVehicle: 'Audi Q5 Sportback 45 TFSI',
    vehicleSegment: 'Luxury SUV',
    purchasePurpose: 'Cá nhân',
    expectedBudget: '2.6 - 2.8 tỷ VNĐ',
    expectedPurchasingTime: 'Ngay trong tuần',
    readinessToVisitShowroom: 'Đã hoàn tất lái thử',
    assignedSalesperson: 'Lê Thu Hà',
    createdAt: '2026-10-27 15:30',
    status: 'Sales Opportunity',
    qualificationDetails: {
      hasValidContact: true,
      hasClearDemand: true,
      hasSpecificModel: true,
      meetsTargetCriteria: true,
      agreesToVisitShowroom: true,
      hasSpecificDateTime: true,
      confirmedInSystem: true,
      aiScore: 100,
      aiExplanation: 'Đã hoàn thành xuất sắc toàn bộ quy trình: Lái thử thành công $\\rightarrow$ Đang đàm phán hợp đồng đặt cọc 100 triệu.',
      suggestedAction: 'Trình Giám đốc phê duyệt gói tặng phụ kiện Ceramic và phim cách nhiệt.'
    },
    notes: [
      { date: '2026-10-28 10:00', author: 'Lê Thu Hà (Sales)', content: 'Khách hàng rất hài lòng về cảm giác lái đầm chắc của Audi Q5. Dự kiến chuyển cọc ngày mai.' }
    ],
    interactionHistory: [
      { type: 'form', channel: 'Website', time: '2026-10-27 15:30', detail: 'Đăng ký lái thử trực tuyến' },
      { type: 'ai-call', channel: 'Callio AI Call', time: '2026-10-27 15:32', detail: 'AI chốt lịch lái thử 09:30 ngày 28/10' },
      { type: 'status-change', channel: 'System', time: '2026-10-28 11:30', detail: 'Chuyển sang Sales Opportunity sau khi lái thử đạt' }
    ]
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: 'APT-01',
    leadId: 'LEAD-2024-001',
    customerName: 'Hoàng Minh Tuấn',
    customerPhone: '0912 345 678',
    vehicleModel: 'Mercedes-Benz GLC 300 4MATIC 2024',
    appointmentDate: '2026-11-07', // Thứ Bảy
    appointmentTime: '14:00 - 15:30',
    salesperson: 'Trần Tuấn Anh',
    status: 'Confirmed',
    isQualifiedAppointment: true,
    billableFee: 300000,
    qualificationChecklist: {
      validContact: true,
      clearDemand: true,
      specificModel: true,
      meetsCriteria: true,
      agreedVisit: true,
      specificTime: true,
      confirmedInSystem: true
    },
    notes: 'Khách yêu cầu xe lái thử màu Trắng hoặc Bạc, có trang bị gói âm thanh Burmester.'
  },
  {
    id: 'APT-02',
    leadId: 'LEAD-2024-002',
    customerName: 'Nguyễn Bích Phương',
    customerPhone: '0988 776 543',
    vehicleModel: 'Porsche Macan GTS 2023 (Lướt)',
    appointmentDate: '2026-10-31',
    appointmentTime: '09:00 - 10:30',
    salesperson: 'Lê Thu Hà',
    status: 'Completed',
    isQualifiedAppointment: true,
    billableFee: 300000,
    qualificationChecklist: {
      validContact: true,
      clearDemand: true,
      specificModel: true,
      meetsCriteria: true,
      agreedVisit: true,
      specificTime: true,
      confirmedInSystem: true
    },
    notes: 'Đã hoàn thành buổi lái thử. Khách chuyển sang giai đoạn đàm phán hợp đồng.'
  },
  {
    id: 'APT-03',
    leadId: 'LEAD-2024-006',
    customerName: 'Trịnh Thảo Vy',
    customerPhone: '0944 556 677',
    vehicleModel: 'Audi Q5 Sportback 45 TFSI',
    appointmentDate: '2026-10-28',
    appointmentTime: '09:30 - 11:00',
    salesperson: 'Lê Thu Hà',
    status: 'Completed',
    isQualifiedAppointment: true,
    billableFee: 300000,
    qualificationChecklist: {
      validContact: true,
      clearDemand: true,
      specificModel: true,
      meetsCriteria: true,
      agreedVisit: true,
      specificTime: true,
      confirmedInSystem: true
    },
    notes: 'Lịch hẹn chất lượng cao. Khách hài lòng 100%.'
  },
  {
    id: 'APT-04',
    leadId: 'LEAD-2024-007',
    customerName: 'Lê Viết Dũng',
    customerPhone: '0908 667 889',
    vehicleModel: 'Mercedes-Benz C300 AMG 2024',
    appointmentDate: '2026-11-05',
    appointmentTime: '10:00 - 11:30',
    salesperson: 'Trần Tuấn Anh',
    status: 'Pending Confirmation',
    isQualifiedAppointment: false,
    billableFee: 0,
    qualificationChecklist: {
      validContact: true,
      clearDemand: true,
      specificModel: true,
      meetsCriteria: true,
      agreedVisit: true,
      specificTime: true,
      confirmedInSystem: false
    },
    notes: 'Chờ khách xác nhận lại qua tin nhắn Zalo trước 24h.'
  }
];

export const INITIAL_CAMPAIGNS = [
  {
    id: 'CMP-01',
    name: 'GLC 300 4MATIC - Luxury Weekend',
    vehicleSegment: 'Luxury SUV',
    channels: ['Meta Ads', 'Zalo Ads'],
    budget: 25000000,
    leadsGenerated: 48,
    qualifiedLeads: 22,
    appointmentsBooked: 14,
    status: 'Active',
    cpa: 285000,
    targetAudience: 'Doanh nhân 30-50 tuổi, sở thích Golf, đầu tư BĐS tại TP.HCM & Hà Nội'
  },
  {
    id: 'CMP-02',
    name: 'Porsche Macan 2024 - Khẳng Định Đẳng Cấp',
    vehicleSegment: 'Xe lướt hạng sang',
    channels: ['Google Search', 'Meta Ads'],
    budget: 35000000,
    leadsGenerated: 32,
    qualifiedLeads: 18,
    appointmentsBooked: 11,
    status: 'Active',
    cpa: 310000,
    targetAudience: 'Chủ doanh nghiệp, thu nhập trên 150 triệu/tháng'
  },
  {
    id: 'CMP-03',
    name: 'BMW X5 xDrive40i - Trải Nghiệm Thủ Lĩnh',
    vehicleSegment: 'Luxury SUV',
    channels: ['TikTok Ads', 'Meta Ads'],
    budget: 18000000,
    leadsGenerated: 29,
    qualifiedLeads: 12,
    appointmentsBooked: 7,
    status: 'Active',
    cpa: 340000,
    targetAudience: 'Nam giới 32-48 tuổi yêu thích công nghệ xe hơi'
  }
];

export const QUALIFICATION_CRITERIA_LIST = [
  { id: 'c1', label: '1. Thông tin liên hệ hợp lệ (SĐT chính chủ, Zalo, Email)', field: 'hasValidContact' },
  { id: 'c2', label: '2. Nhu cầu tìm hiểu hoặc mua xe rõ ràng', field: 'hasClearDemand' },
  { id: 'c3', label: '3. Mẫu xe hoặc phân khúc xe cụ thể', field: 'hasSpecificModel' },
  { id: 'c4', label: '4. Đáp ứng tiêu chuẩn khách hàng mục tiêu của đại lý', field: 'meetsTargetCriteria' },
  { id: 'c5', label: '5. Đồng ý đến showroom hoặc trải nghiệm lái thử', field: 'agreesToVisitShowroom' },
  { id: 'c6', label: '6. Có ngày và giờ lái thử cụ thể', field: 'hasSpecificDateTime' },
  { id: 'c7', label: '7. Lịch hẹn được xác nhận và ghi nhận trên hệ thống', field: 'confirmedInSystem' }
];

export const VEHICLE_OPTIONS = [
  'Mercedes-Benz GLC 300 4MATIC 2024',
  'Mercedes-Benz E200 Exclusive 2024',
  'Mercedes-Benz C300 AMG 2024',
  'Porsche Macan GTS 2023 (Lướt)',
  'Porsche Cayenne 2022 (Lướt)',
  'BMW X5 xDrive40i M Sport',
  'BMW 530i M Sport 2023',
  'Lexus RX 350 Premium 2023',
  'Audi Q5 Sportback 45 TFSI'
];

export const SALESPERSON_LIST = [
  'Trần Tuấn Anh (Senior Sales)',
  'Lê Thu Hà (Chuyên viên xe sang)',
  'Nguyễn Hoàng Nam (Chuyên viên xe lướt)',
  'Phạm Minh Đức (Tư vấn xe cao cấp)'
];
