# HƯỚNG DẪN CÀI ĐẶT & VẬN HÀNH HỆ THỐNG (ENVIRONMENT SETUP GUIDE)
## AutoLead Systems – Master Integrated Platform

Tài liệu này hướng dẫn chi tiết cách khởi động, vận hành và kiểm thử toàn bộ hệ thống AutoLead Systems trên máy tính cục bộ cũng như chia sẻ đường link online qua Cloudflare Tunnel cho Giảng viên và Hội đồng đánh giá.

---

## 1. YÊU CẦU HỆ THỐNG

- **Hệ điều hành:** Windows 10/11 (hoặc macOS/Linux).
- **Node.js:** Phiên bản 18.x hoặc 20.x trở lên.
- **Python:** Phiên bản 3.9+ (để chạy bộ kiểm thử tự động).
- **Trình duyệt:** Google Chrome, Microsoft Edge, Firefox hoặc Safari phiên bản mới.

---

## 2. CẤU TRÚC THƯ MỤC DỰ ÁN

```text
C:\Users\vanvung\Desktop\autolead-systems-integrated\
├── public\
│   └── assets\                  # 4 hình ảnh 16-bit Pixel Art gốc của bạn Thắng
├── src\
│   ├── assets\                  # Tài nguyên tĩnh nội bộ
│   ├── components\
│   │   ├── buyer\               # [Đại] Cổng BuyerDemo 5 bước của người mua xe
│   │   ├── public\              # [Thắng] 8 Section 16-Bit Pixel Art B2B Sales Page
│   │   │   ├── PixelIcons.jsx   # 10 biểu tượng SVG 16-bit nguyên bản
│   │   │   ├── PixelFringe.jsx  # Đường viền zíc-zắc dither cỏ 16-bit
│   │   │   ├── Hero.jsx         # Section 1: Hero + 3 thẻ AI trạng thái
│   │   │   ├── Highlights.jsx   # Section 2: 4 giá trị nổi bật
│   │   │   ├── Problems.jsx     # Section 3: 6 thách thức showroom
│   │   │   ├── Solutions.jsx    # Section 4: 6 giải pháp B2B toàn diện
│   │   │   ├── HowItWorks.jsx   # Section 5: Đường đua tác nghiệp 5 chặng
│   │   │   ├── Pricing.jsx      # Section 6: Bảng giá + Calculator tương tác live
│   │   │   ├── Roadmap.jsx      # Section 7: Lộ trình 30 ngày bàn giao
│   │   │   ├── CommitmentsAndFaq.jsx # Section 8: Cam kết & FAQ
│   │   │   ├── ConsultationForm.jsx  # Form tư vấn đối tác B2B (Domain A)
│   │   │   ├── ConsultationModal.jsx # Popup form tư vấn nhanh
│   │   │   ├── B2BInquiriesModal.jsx # Cửa sổ đối soát yêu cầu đại lý
│   │   │   └── Footer.jsx       # Footer 16-bit bản quyền & thông tin đồ án
│   │   ├── saas\                # [Đại] 9 mô-đun CRM quản trị tác nghiệp showroom
│   │   └── Navbar.jsx           # Thanh điều hướng AutoLead PIXEL WORLD
│   ├── services\
│   │   ├── api.js               # API Client kết nối Express & xử lý 409 Conflict
│   │   ├── storage.js           # Bộ lưu trữ offline fallback an toàn
│   │   └── supabase.js          # Adapter Supabase với khả năng tự phục hồi
│   ├── App.jsx                  # Điều phối 3 trải nghiệm người dùng
│   ├── main.jsx                 # Entry point của React 19
│   └── index.css                # Tailwind CSS + cấu hình pixelated rendering
├── server\
│   ├── data\
│   │   ├── database.json        # Database trạng thái động
│   │   └── seed.js              # Dữ liệu mẫu chuẩn bị sẵn
│   ├── db.js                    # Tầng truy xuất dữ liệu & thuật toán chống trùng lịch
│   └── index.js                 # Full-stack Express REST API Server
├── docs\
│   ├── integration\             # Toàn bộ 6 tài liệu báo cáo kỹ thuật học thuật
│   └── *.docx                   # Tài liệu Word đồ án của Đại và Thắng
├── chay_web.bat                 # Script chạy nhanh web cục bộ 1-click
├── chay_cloudflare_tunnel.bat   # Script mở link online Cloudflare 1-click
└── package.json                 # Quản lý thư viện và dependencies
```

---

## 3. CÁC CÁCH KHỞI ĐỘNG HỆ THỐNG

### Cách 1: Sử dụng File chạy nhanh (Khuyên dùng)
1. Mở thư mục `C:\Users\vanvung\Desktop\autolead-systems-integrated`.
2. **Nhấp đúp chuột vào file `chay_web.bat`**:
   - Cửa sổ màu xanh lá cây sẽ tự động khởi động server và mở trình duyệt tại địa chỉ: `http://localhost:5173`.

### Cách 2: Chạy qua dòng lệnh Terminal
Mở PowerShell hoặc CMD tại thư mục dự án và chạy:
```powershell
# Chạy máy chủ Full-stack (cả API và giao diện Web)
node server/index.js
```
Truy cập trình duyệt: `http://localhost:5173`.

### Cách 3: Chia sẻ Link Online qua Cloudflare Tunnel (Cho Thầy Cô xem từ xa)
1. Nhấp đúp chuột vào file `chay_cloudflare_tunnel.bat`.
2. Chờ 3–5 giây, cửa sổ console sẽ hiển thị đường link có đuôi:
   `https://[ngau-nhien].trycloudflare.com`
3. Sao chép đường link này gửi cho Thầy Cô hoặc bạn bè truy cập trực tiếp từ điện thoại hoặc máy tính khác mà không cần cấu hình mạng.

> [!TIP]
> **Mẹo xử lý khi cửa sổ Console bị "đóng băng" (QuickEdit Mode trên Windows):**
> Nếu bạn vô tình nhấp chuột vào bên trong cửa sổ console màu đen của Windows, tiêu đề cửa sổ sẽ hiện chữ *"Select Administrator..."* và tiến trình tạm dừng lại. Bạn chỉ cần nhấn phím **Enter** hoặc **Esc** là chương trình sẽ tiếp tục chạy bình thường ngay lập tức!

---

## 4. TÀI KHOẢN TRẢI NGHIỆM ĐĂNG NHẬP SHOWROOM CRM

Hệ thống đã thiết lập sẵn các tài khoản demo chuẩn để Thầy Cô và Hội đồng đăng nhập vào Cổng CRM tác nghiệp:

| Vai trò | Email đăng nhập | Mật khẩu | Tên hiển thị & Đơn vị |
|---------|-----------------|----------|-----------------------|
| **Trưởng nhóm kinh doanh (Dealer Manager)** | `dealer@haxaco.vn` | `demo123` | Trần Tuấn Anh — Mercedes-Benz Haxaco Sài Gòn |
| **Quản trị viên hệ thống (Admin)** | `admin@autolead.com` | `demo123` | Nguyễn Văn Đại — AutoLead Systems HQ |
| **Phụ trách Core MVP (Đại)** | `dai@autolead.systems` | `demo123` | Trần Quang Đại — Lead Developer |
| **Phụ trách B2B Sale Page (Thắng)** | `thang@autolead.systems` | `demo123` | Nguyễn Việt Thắng — B2B Growth Lead |

---

## 5. HƯỚNG DẪN CHẠY BỘ KIỂM THỬ TỰ ĐỘNG (20 TEST CASES)

Để kiểm chứng toàn bộ 20 ca kiểm thử kỹ thuật và nghiệp vụ, mở PowerShell tại thư mục dự án và chạy:
```powershell
python "C:\Users\vanvung\.gemini\antigravity\brain\b4cebb43-7bc6-4d9a-86c6-9f4e5614d25b\scratch\run_full_system_tests.py"
```
Kết quả mong đợi:
```text
TEST RUN SUMMARY: 20/20 PASSED (100.0%)
```

---

## 6. BIẾN MÔI TRƯỜNG (.ENV)

File `.env` nằm tại thư mục gốc của dự án:
```env
# Cổng server chạy full-stack
PORT=5173

# Kết nối Supabase Table 'showroom_leads'
VITE_SUPABASE_URL=https://placeholder-autolead.supabase.co
VITE_SUPABASE_ANON_KEY=placeholder-anon-key
```
*Lưu ý: Khi chưa điền thông tin Supabase thật, hệ thống tự động kích hoạt bộ chuyển mạch Fallback lưu dữ liệu vào Express Server và LocalStorage mà không hề phát sinh lỗi.*
