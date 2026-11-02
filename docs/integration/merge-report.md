# BÁO CÁO HỢP NHẤT DỰ ÁN (MERGE REPORT)
## AutoLead Systems – Master Integration (Đại + Thắng)
**Học phần:** Quản trị tác nghiệp Thương mại điện tử  
**Giảng viên hướng dẫn:** ThS. Huỳnh Hồ Trúc Triết  
**Thời gian thực hiện:** Tháng 11/2026  
**Thư mục hoàn chỉnh:** `C:\Users\vanvung\Desktop\autolead-systems-integrated`

---

## 1. TỔNG QUAN HỢP NHẤT

Dự án AutoLead Systems được hình thành từ sự kết hợp của 2 cấu phần học thuật chuyên sâu:
1. **Dự án A (Trần Quang Đại - Phần 1.2):** Thiết kế và phát triển Core MVP, Buyer Portal (Hành trình 5 bước của người mua xe cá nhân), Automotive CRM (Quản trị quan hệ khách hàng, phân bổ sales, thẩm định lead theo 7 tiêu chí TQM, phân tích hiệu suất VSM, Express API & Database).
2. **Dự án B (Nguyễn Việt Thắng - Phần 3.3 & 3.4):** Xây dựng B2B Sales Page thu hút đối tác đại lý ô tô, bộ nhận diện thương hiệu 16-bit Pixel Art độc đáo, công cụ tính ngân sách tương tác, Form đăng ký tư vấn đối tác với lưu trữ Supabase và kiểm thử hệ thống.

---

## 2. NGUYÊN TẮC HỢP NHẤT BẮT BUỘC

1. **Bảo tồn nguyên vẹn cấu trúc:** Không xóa bỏ tính năng của bên nào. Giữ nguyên 5 bước hành trình BuyerDemo của Đại và 9 mô-đun CRM.
2. **Kế thừa nhận diện 16-bit Pixel Art:** Tích hợp trọn vẹn phong cách 16-bit (Sky Blue `#4A98E8`, Warm White `#F8F9F5`, Grass Green `#75A94C`, Dark Navy `#142A43`, CTA Orange `#F47721`, Pixel Fringe SVG dither, và 10 biểu tượng pixel chuyên biệt).
3. **Phân tách miền dữ liệu (Dual Domain Isolation):**
   - **Miền A (Showroom Consultation Inquiries):** Dành cho đại diện showroom, lưu trữ qua Supabase table `showroom_leads` với cơ chế fallback tự động sang Express server `/api/dealer/b2b-inquiries` và LocalStorage.
   - **Miền B (Car Buyer Leads & Appointments):** Dành cho khách mua xe cá nhân và nhân viên showroom tác nghiệp, lưu trữ qua Express REST API và `server/data/database.json`.
4. **Trang chủ mặc định:** Trang đích đầu tiên khi truy cập là **B2B Sales Website (Experience A)** với đầy đủ các nút chuyển đổi trải nghiệm linh hoạt sang Buyer Portal (Experience B) và Dealer CRM (Experience C).

---

## 3. NHẬT KÝ CHI TIẾT CÁC THAY ĐỔI & FILE ĐÃ HỢP NHẤT

| STT | File / Mô-đun | Nguồn gốc | Thay đổi thực hiện |
|-----|---------------|-----------|-------------------|
| 1 | `src/components/public/PixelIcons.jsx` | Khôi phục từ Thắng | Trích xuất và chuẩn hóa 10 biểu tượng pixel 16-bit SVG nguyên bản: PixelCarOrange, PixelCarBlue, PixelShowroom, PixelWrench, PixelCalendar, PixelChart, PixelClock, PixelFlag, PixelMoney, PixelShield. |
| 2 | `src/components/public/PixelFringe.jsx` | Khôi phục từ Thắng | Xây dựng component đường viền zíc-zắc dither cỏ 16-bit chuyển tiếp mượt mà từ Hero xuống các section. |
| 3 | `src/components/public/Hero.jsx` | Thắng (B2B Sale Page) | Thay thế giao diện dark mode cũ bằng phong cách 16-bit Pixel Art, nền `hero-pixel-automotive-world.jpg`, 3 thẻ trạng thái AI động, Offer chính thức 15M + 300k. |
| 4 | `src/components/public/Highlights.jsx` | Thắng | 4 thẻ giá trị cốt lõi ngay dưới Hero: Tối ưu chi phí, Tăng tỷ lệ hẹn lái thử, Quy trình rõ ràng, Phù hợp xe mới & lướt. |
| 5 | `src/components/public/Problems.jsx` | Thắng | 6 thách thức vận hành showroom + khối hình ảnh Pixel Art `dealership-pixel-cars.jpg`. |
| 6 | `src/components/public/Solutions.jsx` | Thắng | 6 mô-đun chức năng B2B (AI Ads, Reception, Qualification, Appointment, CRM, VSM Analytics) kèm các hạng mục bàn giao chi tiết. |
| 7 | `src/components/public/HowItWorks.jsx` | Thắng | Quy trình "Đường đua tác nghiệp" 5 chặng với đường line kẻ sọc vàng đứt đoạn + hình ảnh `dealership-sales-consultation.jpg`. |
| 8 | `src/components/public/Pricing.jsx` | Thắng | Bảng giá chính thức (15M setup + 300k/lịch hẹn) + **Thanh trượt Calculator tương tác** tính ngân sách live + Danh sách 7 tiêu chuẩn TQM nghiệm thu + Hình ảnh `automotive-detail.jpg`. |
| 9 | `src/components/public/Roadmap.jsx` | Thắng | Lộ trình triển khai 4 giai đoạn trong 30 ngày (Khảo sát -> Thiết kế -> Tích hợp -> Bàn giao). |
| 10 | `src/components/public/CommitmentsAndFaq.jsx` | Thắng | 3 cam kết chất lượng của AutoLead + Accordion 4 câu hỏi thường gặp FAQ. |
| 11 | `src/components/public/ConsultationForm.jsx` | Thắng | Form đăng ký tư vấn đối tác với đầy đủ 8 trường bắt buộc + 2 trường bổ sung (khu vực, quy mô lead), kết nối Supabase có fallback tự động. |
| 12 | `src/components/public/ConsultationModal.jsx` | Tích hợp mới | Modal hiển thị form tư vấn khi người dùng nhấn nút "Đăng ký tư vấn 30 phút" ở bất kỳ vị trí nào trên trang. |
| 13 | `src/components/public/B2BInquiriesModal.jsx` | Thắng | Cửa sổ kiểm tra và đối soát các yêu cầu tư vấn B2B showroom (Domain A) dành cho ban quản lý. |
| 14 | `src/components/public/Footer.jsx` | Thắng | Footer 16-bit Pixel Art, viền fringe dither, thông tin đồ án môn học và điều hướng 3 trải nghiệm. |
| 15 | `src/components/Navbar.jsx` | Thắng + Tích hợp | Logo AutoLead PIXEL WORLD, hiệu ứng đổi màu khi cuộn trang, thanh menu anchor và 3 nút chuyển đổi trải nghiệm người dùng. |
| 16 | `src/services/supabase.js` | Thắng + Tích hợp | Adapter Supabase an toàn, tự động nhận diện kết nối hoặc fallback sang Express server/LocalStorage mà không làm gián đoạn trải nghiệm người dùng. |
| 17 | `src/services/api.js` | Đại + Fix lỗi | Xử lý triệt để lỗi HTTP 409 Conflict (không nuốt lỗi để lưu trùng lặp vào localStorage), bổ sung API cho B2B Inquiries, sửa lỗi xác thực đăng nhập. |
| 18 | `src/App.jsx` | Tích hợp Master | Đặt `public` làm giao diện mặc định; tích hợp hash routing (`#demo`, `#crm`, `#hero`); thêm thanh điều hướng quay lại giữa các portal. |
| 19 | `server/index.js` & `server/db.js` | Đại + Fix lỗi | Sửa Bug 10 (chính sách xác thực đăng nhập nghiêm ngặt); thêm endpoint `POST /api/dealer/b2b-inquiries`; chuẩn hóa toàn bộ chuỗi tiếng Việt UTF-8. |
| 20 | `public/assets/` | Tài nguyên Pixel Thắng | Chuyển giao toàn bộ 4 ảnh Pixel Art chất lượng cao vào thư mục tĩnh của dự án. |

---

## 4. XỬ LÝ CÁC XUNG ĐỘT KỸ THUẬT & SỬA LỖI TRỌNG YẾU

### 1. Sửa lỗi xung đột trùng lịch (HTTP 409 Conflict - Bug 5)
- **Vấn đề cũ:** Khi khách hàng đặt lịch trùng giờ với lịch đã có, backend trả về HTTP 409 nhưng hàm `fetchJSON` trong `api.js` bắt lỗi ngoại lệ và rơi vào khối fallback `storageService.addAppointment`, dẫn đến việc lịch trùng vẫn được ghi vào bộ nhớ local.
- **Giải pháp:** Cập nhật `api.js` để re-throw lỗi 409 và 400. `BuyerDemo.jsx` nhận đúng lỗi 409 và hiển thị thông báo tiếng Việt màu đỏ: *"Khung giờ này vào ngày ... của mẫu xe ... đã có khách khác đặt trước. Vui lòng chọn khung giờ khác."* Giữ nguyên form để khách hàng chọn giờ khác.

### 2. Sửa lỗi xác thực tài khoản Đại lý (Bug 10)
- **Vấn đề cũ:** `server/index.js` sử dụng toán tử `|| password === 'demo123'`, cho phép nhập bất kỳ email rác nào chỉ cần mật khẩu là `demo123` vẫn đăng nhập thành công.
- **Giải pháp:** Bắt buộc kiểm tra đồng thời cả email hợp lệ nằm trong danh sách cấp phép (`dealer@haxaco.vn`, `admin@autolead.com`, `dai@autolead.systems`, `thang@autolead.systems`) VÀ mật khẩu chính xác.

### 3. Phân tách miền dữ liệu (Domain Isolation)
- Yêu cầu tư vấn của đại diện đại lý (Domain A) hoàn toàn tách biệt khỏi danh sách lead người mua xe cá nhân (Domain B).
- Bổ sung endpoint `POST /api/dealer/b2b-inquiries` trên Express server để đảm bảo dữ liệu Domain A luôn được lưu trữ an toàn ngay cả khi môi trường không có kết nối internet hoặc chưa thiết lập khóa Supabase.

### 4. Tiêu chuẩn 7 tiêu chí TQM (TQM Gating)
- Trong `LeadQualification.jsx`, một lịch hẹn chỉ được xác nhận đủ điều kiện tính phí nghiệm thu 300.000 VNĐ khi thỏa mãn đầy đủ cả 7/7 tiêu chí chất lượng. Khi thiếu dù chỉ 1 tiêu chí, hệ thống giữ trạng thái "Contacted" hoặc "Chưa đạt chuẩn", hướng dẫn tư vấn viên tiếp tục thu thập thông tin.

---

## 5. KẾT LUẬN

Hệ thống hợp nhất tại `C:\Users\vanvung\Desktop\autolead-systems-integrated` đã đạt được sự đồng nhất 100% giữa thiết kế nhận diện 16-bit Pixel Art của bạn Thắng và nền tảng nghiệp vụ vận hành chuyên sâu của bạn Đại. Ứng dụng sẵn sàng cho việc nghiệm thu, báo cáo học phần và triển khai thực tế.
