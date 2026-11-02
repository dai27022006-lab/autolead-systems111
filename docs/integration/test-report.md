# BÁO CÁO KIỂM THỬ HỆ THỐNG TOÀN DIỆN (TEST REPORT)
## AutoLead Systems – Master Integrated Quality Assurance
**Học phần:** Quản trị tác nghiệp Thương mại điện tử  
**Bộ công cụ kiểm thử:** Python Integration Test Suite (`run_full_system_tests.py`) + Manual QA Testing  
**Kết quả kiểm thử:** **20 / 20 Test Cases PASSED (100.0%)**  
**Thời gian thực hiện:** 02/11/2026

---

## 1. MỤC TIÊU & PHẠM VI KIỂM THỬ

Báo cáo này đánh giá chất lượng toàn diện của sản phẩm tích hợp AutoLead Systems, bao gồm:
1. Tính toàn vẹn giao diện B2B Sales Page 16-bit Pixel Art (Thắng).
2. Quy trình hành trình 5 bước đặt lịch lái thử của khách hàng cá nhân (Đại).
3. Hệ thống ngăn chặn xung đột trùng lịch lái thử (HTTP 409 Conflict Handling).
4. Phân tách miền dữ liệu độc lập giữa Domain A (Đại diện Showroom) và Domain B (Người mua xe).
5. Cơ chế lưu trữ Supabase với khả năng tự phục hồi (Fallback to Express / LocalStorage).
6. Tính năng xác thực đăng nhập đại lý nghiêm ngặt (Strict Authentication).
7. Công thức tính chi phí dịch vụ và đo lường ROI minh bạch ($15.000.000 + N \times 300.000$).

---

## 2. KẾT QUẢ KIỂM THỬ TỰ ĐỘNG (AUTOMATED TEST SUITE MATRIX)

| Mã kiểm thử | Phân hệ | Tên ca kiểm thử | Dữ liệu đầu vào & Thao tác | Kết quả kỳ vọng | Kết quả thực tế | Trạng thái |
|-------------|---------|-----------------|----------------------------|-----------------|-----------------|:----------:|
| **TC-01** | Frontend Web | Kiểm tra Web tĩnh trang chủ | `GET /` | Trả về mã HTTP 200, nội dung HTML chứa AutoLead Systems | HTTP 200, dung lượng 2.139 bytes | **PASS** ✅ |
| **TC-02** | Catalog API | Truy xuất danh mục xe lái thử | `GET /api/cars` | Trả về danh sách >= 4 mẫu xe (C200, GLC 300, E300, Porsche Macan) | HTTP 200, tìm thấy đủ 4 dòng xe | **PASS** ✅ |
| **TC-03** | Auth | Từ chối đăng nhập sai tài khoản | `POST /api/auth/login` (email sai, mật khẩu sai) | Trả về mã HTTP 401 Unauthorized | HTTP 401 từ chối truy cập | **PASS** ✅ |
| **TC-04** | Auth (Bug 10) | Từ chối email lạ có pass `demo123` | `POST /api/auth/login` (`unknown@user.vn`, `demo123`) | Trả về mã HTTP 401 (Xác thực nghiêm ngặt) | HTTP 401 từ chối truy cập | **PASS** ✅ |
| **TC-05** | Auth | Đăng nhập tài khoản Đại lý hợp lệ | `POST /api/auth/login` (`dealer@haxaco.vn`, `demo123`) | Trả về HTTP 200 kèm JWT token và thông tin showroom | HTTP 200, user: Trần Tuấn Anh | **PASS** ✅ |
| **TC-06** | Auth | Đăng nhập tài khoản Core Lead (Đại) | `POST /api/auth/login` (`dai@autolead.systems`, `demo123`) | Trả về HTTP 200, phân quyền Core Architect | HTTP 200, role: Core Architect | **PASS** ✅ |
| **TC-07** | Auth | Đăng nhập tài khoản B2B Lead (Thắng) | `POST /api/auth/login` (`thang@autolead.systems`, `demo123`) | Trả về HTTP 200, phân quyền B2B Growth Manager | HTTP 200, role: B2B Growth Manager | **PASS** ✅ |
| **TC-08** | Buyer Portal | Từ chối số điện thoại sai định dạng | `POST /api/buyer/lead` (SĐT `12345`) | Trả về HTTP 400 Bad Request, báo lỗi định dạng SĐT VN | HTTP 400, báo lỗi 10 chữ số | **PASS** ✅ |
| **TC-09** | Buyer Portal | Khởi tạo khách hàng mua xe hợp lệ | `POST /api/buyer/lead` (Nguyễn Hoàng Nam, SĐT `0918123456`) | Trả về HTTP 201 Created, sinh mã `LEAD-2024-xxx` | HTTP 201, mã: LEAD-2024-003 | **PASS** ✅ |
| **TC-10** | AI Qualification | Thẩm định nhu cầu qua bộ câu hỏi | `POST /api/buyer/qualify` (Nhu cầu thực, dự kiến 1 tháng) | Trả về điểm AI >= 80%, gán nhãn `Qualified Lead` | HTTP 200, Điểm AI: 100%, Qualified: True | **PASS** ✅ |
| **TC-11** | Appointments | Kiểm tra slot trống theo xe & ngày | `GET /api/buyer/slots` (`GLC 300`, ngày `2026-11-20`) | Trả về 4 khung giờ với trạng thái `isAvailable` | HTTP 200, đủ 4 khung giờ khả dụng | **PASS** ✅ |
| **TC-12** | Appointments | Đặt lịch lái thử lần đầu thành công | `POST /api/buyer/appointment` (Khung giờ `09:00 - 10:30`) | Trả về HTTP 201 Created, sinh mã `APT-xx` | HTTP 201, mã: APT-03 | **PASS** ✅ |
| **TC-13** | Xung đột (Bug 5) | Ngăn chặn trùng lịch lái thử | `POST /api/buyer/appointment` (Cùng xe, cùng ngày, cùng giờ) | **Trả về HTTP 409 Conflict**, thông báo tiếng Việt | HTTP 409, báo rõ khung giờ đã có khách | **PASS** ✅ |
| **TC-14** | Domain A | Tiếp nhận yêu cầu tư vấn Showroom | `POST /api/dealer/b2b-inquiries` (Đại lý Haxaco) | Trả về HTTP 201 Created, lưu vào bảng Domain A | HTTP 201, sinh mã B2B-4211 | **PASS** ✅ |
| **TC-15** | Domain Isolation | Cách ly dữ liệu Domain A và B | Đối soát bảng `b2b_inquiries` và `leads` | Dữ liệu showroom Domain A không bị lẫn vào lead người mua xe | Cách ly 100%: Domain A (2 bản ghi), Domain B (3 lead) | **PASS** ✅ |
| **TC-16** | CRM Operations | Cập nhật tiến độ phễu lead | `PUT /api/dealer/leads/:id/status` -> `Showroom Visit` | Trả về HTTP 200, cập nhật trạng thái và nhật ký tương tác | HTTP 200, trạng thái: Showroom Visit | **PASS** ✅ |
| **TC-17** | CRM Operations | Xác nhận hoàn thành lịch lái thử | `PUT /api/dealer/appointments/:id/status` -> `Completed` | Trả về HTTP 200, xác nhận nghiệm thu phí 300.000 VNĐ | HTTP 200, trạng thái: Completed | **PASS** ✅ |
| **TC-18** | Billing Formula | Kiểm tra công thức thanh toán | `GET /api/dealer/dashboard` | `Total = 15.000.000 + (N_billable * 300.000)` | Khớp 100%: Setup 15M + 900k = 15.900.000 VNĐ | **PASS** ✅ |
| **TC-19** | Pixel Assets | Kiểm tra 4 tài nguyên ảnh 16-bit | `GET /assets/*.jpg` cho cả 4 ảnh pixel | Trả về HTTP 200, kích thước > 10KB mỗi ảnh | Đủ 4 ảnh pixel, hiển thị sắc nét | **PASS** ✅ |
| **TC-20** | System Recovery | Khôi phục cơ sở dữ liệu mẫu gốc | `POST /api/dealer/reset` | Trả về HTTP 200, đưa database về trạng thái demo chuẩn | HTTP 200, reset seed thành công | **PASS** ✅ |

---

## 3. KẾT QUẢ KIỂM THỬ TRẢI NGHIỆM GIAO DIỆN (MANUAL UI/UX QA)

1. **Trải nghiệm A – Public B2B Sales Page (16-Bit Pixel Art):**
   - Nền showroom pixel 16-bit tải mượt mà, không bị nhòe pixel nhờ thuộc tính CSS `image-rendering: pixelated; shape-rendering: crispEdges`.
   - Đường viền zíc-zắc Pixel Fringe chuyển tiếp hoàn hảo giữa màu cỏ `#75A94C` và nền trắng section.
   - Thanh trượt tính toán ngân sách (Pricing Slider) hoạt động mượt mà theo thời gian thực (10 đến 100 cuộc hẹn), số liệu cập nhật tức thì.
   - Form tư vấn B2B mở nhanh dưới dạng modal popup và có phiên bản in-page cố định; xác thực đầy đủ 8 trường trước khi gửi.
   - Cửa sổ "Quản lý" (B2B Inquiries Modal) hiển thị danh sách các đại lý đã đăng ký kèm nguồn lưu trữ rõ ràng.

2. **Trải nghiệm B – Buyer Portal (5-Step Journey):**
   - Bước 1 (Chọn xe): Hiển thị danh mục xe sang với thông số chi tiết.
   - Bước 2 (Thông tin cá nhân): Bắt lỗi số điện thoại Việt Nam chuẩn xác.
   - Bước 3 (Bộ câu hỏi thẩm định): Điểm AI tự động tính toán minh bạch.
   - Bước 4 (Đặt lịch lái thử): Ngăn chặn chọn lại slot đã được đặt trước; khi cố tình gửi trùng, giao diện hiển thị cảnh báo đỏ và giữ nguyên thông tin để khách chọn khung giờ khác.
   - Bước 5 (Xác nhận thành công): Hiển thị thẻ xác nhận đầy đủ mã lịch hẹn.

3. **Trải nghiệm C – Dealer SaaS CRM:**
   - Đăng nhập bảo mật, phân quyền chuẩn xác theo vai trò.
   - 9 tab chức năng hoạt động đồng bộ: Tổng quan, Kanban Leads, Thẩm định TQM 7 tiêu chí, Lịch hẹn, Chiến dịch, AI Assistant, Báo cáo VSM, Yêu cầu B2B, Cấu hình.
   - Nút quay lại trang chủ B2B ở thanh header hoạt động mượt mà, hỗ trợ điều hướng hai chiều liền mạch.

---

## 4. KẾT LUẬN NGHIỆM THU

Hệ thống đã vượt qua 100% các tiêu chí kiểm thử kỹ thuật và nghiệp vụ, đáp ứng đầy đủ yêu cầu của Đề cương Giữa kỳ học phần Quản trị tác nghiệp Thương mại điện tử.
