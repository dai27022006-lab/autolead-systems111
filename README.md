# AUTOLEAD SYSTEMS (B2B AI Lead Generation & Test Drive Appointment Platform)

> **Dự án Giữa kỳ môn học**: Quản trị tác nghiệp Thương mại Điện tử  
> **Trường**: Đại học Công nghiệp TP.HCM (IUH) – Khoa Thương mại & Du lịch  
> **Giảng viên hướng dẫn**: PGS. TS. Bùi Thành Khoa  
> **Nhóm tác giả**: Dự án thực hành MVP Web SaaS & B2B Operations  
> **Kho lưu trữ GitHub**: [https://github.com/dai27022006-lab/autolead-systems](https://github.com/dai27022006-lab/autolead-systems)  
> **Bản demo trực tuyến**: [Cloudflare Live Tunnel](https://happens-peninsula-moore-dates.trycloudflare.com)

---

## 1. TỔNG QUAN DỰ ÁN & MÔ HÌNH KINH DOANH (BUSINESS CONTEXT)

**AutoLead Systems** không đơn thuần là một phần mềm tạo trang đích (Landing Page) hay chatbot thông thường, mà là một **Hệ thống Quản trị Tác nghiệp TMĐT B2B toàn diện**, kết nối liền mạch chuỗi giá trị:
$$\text{Meta Ads} \longrightarrow \text{Tiếp nhận Lead} \longrightarrow \text{AI Sàng lọc (TQM)} \longrightarrow \text{Đặt Lịch Lái Thử Tự Động} \longrightarrow \text{Bàn Giao Showroom (CRM)}$$

### Khách hàng mục tiêu:
1. **Đại lý ủy quyền chính hãng xe sang** (Mercedes-Benz, BMW, Porsche, Audi, Lexus,...).
2. **Showroom xe đã qua sử dụng phân khúc cao cấp** (Auto 568, Sơn Tùng Auto,...).

### Lời chào hàng thương mại (Official Business Offer):
* **Phí thiết lập ban đầu (Setup Package)**: `15.000.000 VNĐ` (Bàn giao trọn gói trong 30 ngày gồm phân tích tác nghiệp, cấu hình kịch bản AI, tích hợp CRM, đào tạo đội ngũ).
* **Phí hoa hồng tác nghiệp (Performance Fee)**: `300.000 VNĐ / cuộc hẹn lái thử hợp lệ` (Đáp ứng chuẩn 7/7 tiêu chí TQM).

---

## 2. KIẾN TRÚC TÁC NGHIỆP & PHẠM VI MVP (OPERATIONS ARCHITECTURE)

Hệ thống phân định nghiêm ngặt **Hai Miền Dữ Liệu Tác Nghiệp (Data Domains)**:
* **Miền A – Sales Page Inquiries (Khách hàng B2B)**: Đại diện đại lý đăng ký thuê dịch vụ AutoLead trên trang chủ công khai (Public Landing Page).
* **Miền B – CRM Customer Leads (Người mua xe cá nhân)**: Khách hàng mua xe do quảng cáo đưa về, tham gia hành trình trải nghiệm Buyer Demo và được quản lý trên CRM nội bộ.

### 6 Chức năng cốt lõi theo Lời chào hàng:
1. **AI Advertising & Creative Studio**: Sinh nội dung quảng cáo đa góc độ (Pain-point, Social Proof, Urgency), gợi ý nhắm mục tiêu tệp khách hàng thu nhập cao.
2. **AI Lead Reception & Follow-up**: Mô phỏng tiếp nhận đa kênh (Zalo/Web) phản hồi dưới 60 giây, giảm thiểu thời gian chờ (Idle Time).
3. **AI Lead Qualification (Định lượng TQM)**: Chấm điểm nhu cầu (1.5 - 5 tỷ, thời gian mua, sẵn sàng đến showroom) và phân loại Cold / Warm / Qualified Lead minh bạch.
4. **Automated Test Drive Appointment**: Lịch trực quan, tự động kiểm tra xung đột khung giờ (`Conflict Prevention HTTP 409`), chống đặt trùng xe và trùng giờ.
5. **CRM & Lead Operations**: Bảng Kanban 6 giai đoạn tác nghiệp, kiểm soát giới hạn tồn đọng (**Lean WIP Limit**), Drawer hồ sơ khách hàng.
6. **Performance Tracking & VSM Analytics**: Báo cáo dòng giá trị (VSM), đối chiếu mô hình I-T-O (Input-Transformation-Output) và bảng kê đối soát doanh thu CPA (300.000 VNĐ/cuộc hẹn).

---

## 3. ĐỐI CHIẾU 10 CHƯƠNG MÔN HỌC QUẢN TRỊ TÁC NGHIỆP TMĐT

| Chương | Chủ đề môn học (Giảng trình PGS.TS. Bùi Thành Khoa) | Thể hiện cụ thể trên Hệ thống AutoLead Systems |
| :--- | :--- | :--- |
| **Chương 1** | Bản chất Quản trị Tác nghiệp TMĐT | Mô hình **I-T-O**: Input (Leads) $\rightarrow$ Transformation (AI Scoring + Khóa slot) $\rightarrow$ Output (Lịch hẹn hợp lệ + Doanh thu CPA). |
| **Chương 2** | Quá trình tác nghiệp & Chuỗi giá trị | Sơ đồ **BPMN** & Đo lường **VSM**: Giảm Lead-time từ 6 giờ (thủ công) xuống **dưới 60 giây** (AI). |
| **Chương 3** | Thiết kế dịch vụ & Sản phẩm mới | Quy trình **MVP Design Thinking**: Giải quyết bài toán thất thoát lead và quá tải của tư vấn viên. |
| **Chương 4** | Hoạch định công suất (Capacity Planning) | Thuật toán kiểm soát khung giờ trống theo từng dòng xe, phân bổ tối đa 4 ca lái thử/ngày. |
| **Chương 5** | Quản trị tinh gọn (Lean / JIT) | **Lean Kanban**: Cảnh báo vi phạm WIP Limit ($>15$ leads), loại bỏ 8 lãng phí (Muda) trong phản hồi khách. |
| **Chương 6** | Quản trị nhà cung cấp công nghệ | Chuẩn hóa quy trình bàn giao dịch vụ, phân định chi phí thuê ngoài (Outsourcing) và phí nền tảng. |
| **Chương 7** | Quản trị chất lượng dịch vụ (TQM) | **7 Tiêu chuẩn nghiệm thu cuộc hẹn**: Kiểm tra thông tin, nhu cầu rõ ràng, mẫu xe cụ thể, đồng ý showroom, ngày giờ xác định, hệ thống ghi nhận. |
| **Chương 8** | Cải tiến liên tục (PDCA / Six Sigma) | Bảng theo dõi nguyên nhân No-Show và đề xuất tái tiếp cận (Remarketing PDCA). |
| **Chương 9** | Công nghệ số & Trí tuệ nhân tạo (AI) | Mô hình **Hybrid AI**: Kết hợp Natural Language Scripting và Ma trận chấm điểm luật (loại bỏ ảo giác Hallucination). |
| **Chương 10** | Chiến lược tác nghiệp & Lợi thế cạnh tranh | **Hill Framework**: Order Qualifiers (Phản hồi tức thì, bảo mật) & Order Winners (Cam kết CPA 300.000 VNĐ). |

---

## 4. HƯỚNG DẪN CÀI ĐẶT & CHẠY LOCAL (QUICKSTART)

### Yêu cầu hệ thống:
* **Node.js**: Phiên bản 18.x trở lên.
* **NPM**: Phiên bản 9.x trở lên.

### Các bước khởi chạy:
```bash
# 1. Giải nén thư mục và truy cập vào dự án
cd autolead-systems

# 2. Cài đặt các thư viện phụ thuộc
npm install

# 3. Biên dịch mã nguồn Frontend React + Vite
npm run build

# 4. Khởi chạy máy chủ Full-Stack Express (Backend API + Frontend)
npm start
```
* Ứng dụng sẽ hoạt động tại: **`http://localhost:5173`**

---

## 5. TÀI KHOẢN TRẢI NGHIỆM HỆ THỐNG (DEMO CREDENTIALS)

* **Giao diện Khách hàng mua xe (Buyer Portal)**: Mở trực tiếp trên web, chọn mẫu xe **Mercedes-Benz C200 Avantgarde 2024**, trả lời 4 câu hỏi AI và chọn ngày giờ lái thử.
* **Giao diện CRM Đại lý Showroom**:
  * **Email**: `dealer@haxaco.vn` (hoặc `admin@autolead.com`)
  * **Mật khẩu**: `demo123`
  * *(Hệ thống có tích hợp sẵn nút bấm **Đăng Nhập Nhanh 1-Click** để phục vụ việc thuyết trình nhanh gọn).*

---

## 6. DANH MỤC THƯ MỤC NGUỒN (PROJECT STRUCTURE)

```text
autolead-systems/
├── dist/                      # Thư mục mã nguồn sau khi build
├── public/                    # Tài nguyên tĩnh, favicon, icons
├── server/
│   ├── data/
│   │   ├── database.json      # Cơ sở dữ liệu lưu trữ bền vững (Leads, Appointments, Inquiries)
│   │   └── seed.js            # Dữ liệu mẫu ban đầu của showroom
│   ├── db.js                  # Tầng truy xuất dữ liệu & thuật toán chống đặt trùng lịch
│   └── index.js               # Máy chủ Express.js RESTful API & phục vụ SPA
├── src/
│   ├── components/
│   │   ├── buyer/             # Trải nghiệm Buyer Journey 5 bước
│   │   │   └── BuyerDemo.jsx
│   │   ├── public/            # Part A: Landing Page B2B cho đại lý
│   │   │   ├── Hero.jsx, Problems.jsx, Solutions.jsx, Pricing.jsx,...
│   │   └── saas/              # Part B: SaaS CRM Console 9 phân hệ
│   │       ├── DashboardOverview.jsx, LeadManagement.jsx, LeadQualification.jsx,...
│   ├── services/
│   │   ├── api.js             # API Client kết nối Backend
│   │   └── storage.js         # Fallback Storage dự phòng
│   ├── App.jsx                # Điều hướng phân hệ
│   └── index.css              # Giao diện Tailwind CSS v4 & Automotive Dark Theme
├── package.json               # Cấu hình phụ thuộc và Scripts khởi chạy
└── README.md                  # Tài liệu tổng quan dự án
```

---
*© 2026 AutoLead Systems – Đề án Quản trị tác nghiệp Thương mại Điện tử.*
