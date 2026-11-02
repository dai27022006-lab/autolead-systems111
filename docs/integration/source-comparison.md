# AUTOLEAD SYSTEMS – SOURCE COMPARISON AUDIT REPORT
**Học phần**: Quản trị tác nghiệp Thương mại Điện tử (IUH)  
**Đề tài**: Hệ thống AI tạo khách hàng tiềm năng và đặt lịch lái thử cho đại lý ô tô  
**Thời gian kiểm toán**: 02/11/2026  
**Chuyên gia thực hiện**: Senior Full-Stack Architect & Integration Engineer  

---

## 1. TỔNG QUAN PHẠM VI HAI DỰ ÁN NGUỒN

| Thuộc tính | Dự án A: Core MVP (Bạn Đại) | Dự án B: B2B Sale Page (Bạn Thắng) |
| :--- | :--- | :--- |
| **Đường dẫn nguồn** | `C:/Users/vanvung/Downloads/autolead-systems-project` | `C:/Users/vanvung/Desktop/autolead-systems` (Zalo Temp) |
| **Phân công đề cương** | **Chương 1 (Mục 1.2)**: Thiết kế & phát triển MVP | **Chương 3 (Mục 3.3 & 3.4)**: Thiết kế, phát triển & kiểm thử Sale Page |
| **Đối tượng người dùng** | 1. Người mua xe cá nhân (Buyer Portal)<br>2. Ban quản lý & tư vấn viên Showroom (SaaS CRM) | Đại diện ban lãnh đạo Showroom/Đại lý ô tô (B2B Clients) |
| **Trọng tâm chức năng** | - Luồng đặt lịch lái thử 5 bước<br>- Bảng Kanban 6 giai đoạn với Lean WIP Limit<br>- Sàng lọc AI 7 tiêu chuẩn TQM<br>- Lịch lái thử thông minh chống trùng slot<br>- Chiến dịch quảng cáo, VSM Analytics, Trợ lý AI | - 8 phân vùng chào hàng theo Lời chào hàng Offer<br>- Bộ tính toán ngân sách kéo thả linh hoạt<br>- Biểu mẫu đăng ký B2B & Supabase Adapter<br>- Bộ mỹ thuật Pixel Art 16-bit độc quyền |
| **Công nghệ nền** | React 19, Tailwind CSS v4, Lucide React, Express 5, JSON DB | React 19, Tailwind CSS v4, @supabase/supabase-js, Pixel Art Assets |

---

## 2. MA TRẬN SO SÁNH CẤU TRÚC TỆP TIN (FILE-BY-FILE AUDIT)

```
[Tổng số đường dẫn tương đối phát hiện]: 72 tệp tin
├── [Trùng khớp hoàn toàn (Identical)]: 38 tệp
├── [Có sự khác biệt nội dung (Modified)]: 7 tệp
├── [Chỉ có ở Dự án A (Đại)]: 0 tệp
└── [Chỉ có ở Dự án B (Thắng)]: 27 tệp (chủ yếu là Assets Pixel Art, Docs và Script báo cáo)
```

### 2.1. Chi tiết các tệp tin có sự sai khác (Modified Files)
1. **`package.json` & `package-lock.json`**:
   - *Dự án A*: Chứa dependencies chuẩn của Vite, React, Express, Lucide, Tailwind.
   - *Dự án B*: Bổ sung thêm `@supabase/supabase-js` và `tslib`.
   - *Quyết định tích hợp*: Giữ toàn bộ dependencies của Dự án A, bổ sung `@supabase/supabase-js` và `tslib` để hỗ trợ đồng thời Express Backend và Supabase Client.
2. **`index.html`**:
   - *Dự án A*: Cấu hình theme tối mặc định (`#0b1019`), font Plus Jakarta Sans.
   - *Dự án B*: Cấu hình font Plus Jakarta Sans và JetBrains Mono, meta tags SEO cho ngành ô tô, class pixel crisp rendering.
   - *Quyết định tích hợp*: Sử dụng template nâng cao của Dự án B, đảm bảo hỗ trợ cả trang chủ Sale Page sáng (`#F8F9F5`) và phân hệ CRM tối (`#101B2B`).
3. **`src/components/public/ConsultationForm.jsx`**:
   - *Dự án A*: Lưu thông tin vào local `storageService` (Miền A).
   - *Dự án B*: Thêm thao tác insert vào bảng Supabase `showroom_leads`.
   - *Quyết định tích hợp*: Tích hợp cả hai: gọi Supabase làm nguồn dữ liệu chính, đồng thời lưu vào Express Backend API / LocalStorage làm cơ chế dự phòng an toàn (Failover Protection).

### 2.2. Tài nguyên độc quyền của Dự án B (Thắng) cần chuyển giao
- 4 tệp ảnh Pixel Art 16-bit nguyên bản:
  - `hero-pixel-automotive-world.jpg` (Banner Hero không gian thế giới ô tô)
  - `dealership-pixel-cars.jpg` (Hình ảnh showroom và xe hơi pixel art)
  - `dealership-sales-consultation.jpg` (Quy trình tư vấn và bàn giao sales)
  - `automotive-detail.jpg` (Chi tiết kỹ thuật và bảng tính chi phí)
- Tệp cấu hình môi trường `.env` và `.env.example`.
- Báo cáo Word học thuật: `3.3_3.4_Bao_cao_SalePage_Thang.docx` và `generate_word_report.py`.

---

## 3. PHÂN TÍCH XUNG ĐỘT KỸ THUẬT & DỮ LIỆU (CONFLICT ANALYSIS)

| Điểm xung đột | Hiện trạng Dự án A & B | Giải pháp kiến trúc thống nhất |
| :--- | :--- | :--- |
| **Xung đột 1: Phân định Miền dữ liệu** | Dự án A lưu inquiry B2B vào LocalStorage; Dự án B gửi Supabase `showroom_leads`. | Tuân thủ Quy định số 3 đề cương: Tách bạch rõ **Miền A (Showroom Leads)** và **Miền B (Buyer CRM Leads)**. Form B2B gửi Supabase và đồng bộ về viewer nội bộ. |
| **Xung đột 2: Xung đột lịch hẹn (HTTP 409)** | Khi server trả mã lỗi 409 (trùng xe/giờ), client cũ bắt lỗi nhưng vô tình lưu fallback làm sai lệch logic. | Sửa triệt để: Trả lỗi HTTP 409 trực tiếp lên giao diện người dùng, ngăn chặn tuyệt đối đặt trùng lịch. |
| **Xung đột 3: Đánh giá tiêu chuẩn TQM** | Chưa có khóa chặn chặt chẽ giữa 7 tiêu chí TQM và trạng thái billable của lịch hẹn. | Áp dụng logic chuẩn: Chỉ những lịch hẹn thỏa mãn đủ 7/7 tiêu chí TQM mới được đánh dấu hợp lệ và tính phí 300.000 VNĐ. |
| **Xung đột 4: Điều hướng mặc định** | Dự án A mở thẳng `buyer` demo; Dự án B tập trung vào Sale Page. | Đặt **Public Sale Page** làm trang đích chính (`/`), cung cấp nút chuyển hướng trực tiếp sang **Buyer Portal** (`/demo`) và **Dealer CRM** (`/crm`). |
