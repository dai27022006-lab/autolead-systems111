# -*- coding: utf-8 -*-
import docx
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

def create_report_doc():
    doc = docx.Document()

    # Set Margins (2cm top/bottom, 2.5cm left/right)
    for section in doc.sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)

    # Set default style font
    style = doc.styles['Normal']
    style.font.name = 'Times New Roman'
    style.font.size = Pt(12)
    style.font.color.rgb = RGBColor(0, 0, 0)

    def add_p(text, bold=False, italic=False, space_after=4, align=WD_ALIGN_PARAGRAPH.JUSTIFY):
        p = doc.add_paragraph()
        p.alignment = align
        p.paragraph_format.line_spacing = 1.0
        p.paragraph_format.space_after = Pt(space_after)
        p.paragraph_format.space_before = Pt(0)
        run = p.add_run(text)
        run.font.name = 'Times New Roman'
        run.font.size = Pt(12)
        run.font.color.rgb = RGBColor(0, 0, 0)
        run.bold = bold
        run.italic = italic
        return p

    def add_heading_1(text):
        p = doc.add_paragraph()
        p.paragraph_format.line_spacing = 1.0
        p.paragraph_format.space_before = Pt(6)
        p.paragraph_format.space_after = Pt(4)
        run = p.add_run(text)
        run.font.name = 'Times New Roman'
        run.font.size = Pt(12)
        run.font.color.rgb = RGBColor(0, 0, 0)
        run.bold = True
        return p

    def add_heading_2(text):
        p = doc.add_paragraph()
        p.paragraph_format.line_spacing = 1.0
        p.paragraph_format.space_before = Pt(4)
        p.paragraph_format.space_after = Pt(2)
        run = p.add_run(text)
        run.font.name = 'Times New Roman'
        run.font.size = Pt(12)
        run.font.color.rgb = RGBColor(0, 0, 0)
        run.bold = True
        return p

    # 1.2 Heading
    add_heading_1('1.2. Thiết kế và phát triển MVP — Đại')
    add_p('Nhằm kiểm chứng tính khả thi của mô hình kinh doanh và quy trình tác nghiệp tự động hóa, nhóm tiến hành thiết kế và phát triển bản sản phẩm khả dụng tối thiểu (Minimum Viable Product - MVP) cho nền tảng AutoLead Systems. Mục tiêu cốt lõi của giai đoạn này là xây dựng luồng vận hành khép kín từ khâu thu nhận khách hàng tiềm năng đến quản lý lịch hẹn lái thử trên hệ thống CRM, đảm bảo loại bỏ lãng phí và tối ưu hóa năng lực phục vụ theo đúng nguyên lý tinh gọn.')

    # 1.2.1
    add_heading_2('1.2.1. Phạm vi và chức năng cốt lõi của MVP')
    add_p('Về phạm vi tác nghiệp, MVP tập trung giải quyết triệt để bài toán chuyển đổi lead thành cuộc hẹn trải nghiệm thực tế cho các đại lý xe hơi phân khúc cao cấp (mẫu thử nghiệm: Mercedes-Benz C200 Avantgarde 2024). Nhóm chủ động khoanh vùng phạm vi phát triển, không tích hợp cổng thanh toán xe trực tuyến hay chạy quảng cáo thực tế nhằm tiết kiệm ngân sách và kiểm soát rủi ro vận hành.')
    add_p('Hệ thống được thiết kế phân định rạch ròi giữa hai miền dữ liệu độc lập: (1) Miền dữ liệu A thu thập thông tin các đại lý, showroom có nhu cầu thuê giải pháp tác nghiệp trên Landing Page; (2) Miền dữ liệu B quản lý hồ sơ và lịch hẹn của từng khách mua xe cá nhân trên CRM đại lý.')
    add_p('Bốn chức năng cốt lõi được hoàn thiện bao gồm: (1) Tiếp nhận lead tự động với cơ chế kiểm tra định dạng số điện thoại Việt Nam; (2) Bộ câu hỏi sàng lọc nhu cầu định lượng theo chuẩn chất lượng dịch vụ (TQM) nhằm phân loại chính xác khách hàng tiềm năng; (3) Thuật toán kiểm tra và chống đặt trùng lịch hẹn (Conflict Prevention), tự động khóa các khung giờ đã có người đăng ký; (4) Hệ thống CRM đại lý đồng bộ tức thì, hỗ trợ quản lý trạng thái lead và đối soát doanh thu theo phí hoa hồng 300.000 VNĐ/cuộc hẹn đạt chuẩn.')

    # 1.2.2
    add_heading_2('1.2.2. Giao diện và các thành phần chức năng')
    add_p('Giao diện MVP được thiết kế trực quan theo phong cách hiện đại với hai phân hệ chính:')
    add_p('• Cổng trải nghiệm khách hàng (Buyer Portal): Dẫn dắt người mua xe qua hành trình 5 bước liền mạch gồm: Khảo sát dòng xe mẫu -> Điền thông tin cá nhân -> Trả lời 4 câu hỏi khảo sát nhu cầu -> Chọn khung giờ lái thử còn trống trong tuần -> Nhận mã xác nhận cuộc hẹn tức thì.')
    add_p('• Bảng điều khiển tác nghiệp CRM (Dealer Console): Dành cho ban quản lý showroom với 9 phân hệ chức năng, nổi bật gồm: Dashboard tổng quan hiển thị phễu chuyển đổi I-T-O và cảnh báo giới hạn tồn đọng (Lean WIP Limit); Bảng Kanban và danh sách bảng biểu quản lý chi tiết từng lead; Lịch theo dõi khung giờ lái thử; Studio tạo nội dung quảng cáo và kịch bản chăm sóc khách hàng qua Zalo.')

    # 1.2.3
    add_heading_2('1.2.3. Ứng dụng AI/Vibe Coding trong phát triển MVP')
    add_p('Trong khâu tác nghiệp, nhóm ứng dụng mô hình Hybrid AI: Kết hợp công nghệ sinh kịch bản ngôn ngữ tự nhiên để gợi ý nội dung tương tác, đồng thời áp dụng ma trận chấm điểm luật (Rule-based Decision Matrix) trong khâu sàng lọc chất lượng lead. Việc sử dụng ma trận định lượng giúp hệ thống đánh giá khách quan, minh bạch và loại bỏ hoàn toàn rủi ro ảo giác (hallucination) của AI khi giao dịch sản phẩm giá trị cao.')
    add_p('Trong khâu lập trình, nhóm áp dụng phương pháp Vibe Coding để tăng tốc chu kỳ phát triển. Thông qua việc mô tả cấu trúc tác nghiệp và yêu cầu logic bằng ngôn ngữ tự nhiên, các công cụ AI hỗ trợ sinh mã nguồn nhanh chóng cho tầng backend Express.js, thuật toán kiểm tra xung đột slot thời gian thực và xây dựng toàn bộ giao diện người dùng bằng React và Tailwind CSS. Nhờ đó, thời gian hoàn thiện bản MVP đầy đủ chức năng được rút ngắn từ nhiều tuần xuống chỉ còn vài ngày mà vẫn đảm bảo độ tin cậy vận hành.')

    # 1.2.4
    add_heading_2('1.2.4. Kết quả triển khai, minh họa hoạt động hệ thống')
    add_p('Hệ thống MVP đã được triển khai vận hành thực tế trên môi trường máy chủ với cơ sở dữ liệu lưu trữ bền vững (Persistent Database). Toàn bộ dữ liệu khách hàng và trạng thái lịch hẹn được duy trì ổn định ngay cả khi làm mới trang hoặc khởi động lại hệ thống.')
    add_p('Kịch bản kiểm thử quy trình thực tế đã được thực hiện thành công 100%: Người dùng thử nghiệm chọn xe Mercedes-Benz C200, hoàn thành 4 câu hỏi sàng lọc và đạt 100 điểm tiềm năng (Qualified Lead). Khi người dùng chọn khung giờ 09:00 ngày tiếp theo, hệ thống lập tức xuất mã hẹn APT-03 và tự động khóa slot này để ngăn chặn đặt trùng. Đồng thời tại tài khoản CRM của đại lý, thông tin khách hàng và lịch hẹn mới lập tức hiển thị trên bảng Kanban và lịch lái thử, chỉ số doanh thu đối soát trên Dashboard tự động ghi nhận thêm 300.000 VNĐ đúng theo hợp đồng dịch vụ.')

    # Bàn giao
    add_heading_2('Bàn giao sản phẩm:')
    add_p('• Trạng thái sản phẩm: MVP hoạt động đầy đủ luồng tác nghiệp thực tế (End-to-End Operational Flow).')
    add_p('• Đường link trải nghiệm trực tuyến: https://happens-peninsula-moore-dates.trycloudflare.com')
    add_p('• Kho lưu trữ mã nguồn GitHub: https://github.com/dai27022006-lab/autolead-systems')
    add_p('• Tài khoản đăng nhập đại lý: dealer@haxaco.vn | Mật khẩu: demo123 (có tích hợp nút đăng nhập nhanh 1-click).')
    add_p('• File mã nguồn đóng gói nộp bài: autolead-systems-project.zip (đã lưu tại Desktop và Downloads).')

    # Save documents
    path1 = r'C:\Users\vanvung\Downloads\1.2_Thiet_Ke_Va_Phat_Trien_MVP_Dai.docx'
    path2 = r'C:\Users\vanvung\Desktop\1.2_Thiet_Ke_Va_Phat_Trien_MVP_Dai.docx'
    doc.save(path1)
    doc.save(path2)
    print('DOCX GENERATED SUCCESSFULLY AT:', path1, 'AND', path2)

if __name__ == '__main__':
    create_report_doc()
