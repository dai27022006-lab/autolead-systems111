// Dữ liệu chi tiết thông số kỹ thuật, bảng giá lăn bánh và ưu đãi cho từng dòng xe
// Phục vụ tính năng hiển thị thông tin chi tiết xe (Car Detail Modal) trong Cổng Người Mua Xe (Buyer Portal)

export const CAR_DETAILED_DATA = {
  'car-c200': {
    id: 'car-c200',
    name: 'Mercedes-Benz C200 Avantgarde 2024',
    subtitle: 'Sedan hạng sang thế hệ mới - Định chuẩn phong cách doanh nhân trẻ',
    segment: 'Luxury Sedan',
    badge: 'Mẫu Xe Demo Chính',
    price: '1.599.000.000 VNĐ',
    rawPrice: 1599000000,
    onTheRoad: {
      tphcm: '1.782.000.000 VNĐ',
      hanoi: '1.814.000.000 VNĐ',
      provinces: '1.763.000.000 VNĐ'
    },
    installment: {
      minPrepay: '320.000.000 VNĐ (20%)',
      monthlyPayment: 'Từ 18.500.000 VNĐ/tháng',
      tenor: 'Vay tối đa 8 năm (96 tháng)',
      bankRate: 'Lãi suất ưu đãi cố định 6.9%/năm đầu tiên, thủ tục duyệt trong 30 phút'
    },
    fees: [
      { name: 'Giá niêm yết chính hãng (VAT)', amount: '1.599.000.000 VNĐ', note: 'Đã bao gồm thuế GTGT 10%' },
      { name: 'Lệ phí trước bạ (10% TP.HCM)', amount: '159.900.000 VNĐ', note: 'Đang áp dụng ưu đãi giảm 50% còn ~79.950.000 VNĐ' },
      { name: 'Phí đăng ký biển số mới', amount: '20.000.000 VNĐ', note: 'Áp dụng cho TP.HCM & Hà Nội' },
      { name: 'Phí đăng kiểm lưu hành', amount: '340.000 VNĐ', note: 'Chu kỳ đăng kiểm 36 tháng cho xe mới' },
      { name: 'Phí bảo trì đường bộ (1 năm)', amount: '1.560.000 VNĐ', note: 'Quy định nhà nước cho xe cá nhân dưới 9 chỗ' },
      { name: 'Bảo hiểm TNDS bắt buộc (1 năm)', amount: '480.000 VNĐ', note: 'Bảo hiểm trách nhiệm dân sự' },
      { name: 'Bảo hiểm vật chất xe 2 chiều (1.5%)', amount: 'Miễn phí tặng kèm', note: 'Ưu đãi showroom trị giá 24.000.000 VNĐ' }
    ],
    promotions: [
      'Hỗ trợ 50% lệ phí trước bạ cho khách hàng đặt lịch lái thử trực tuyến',
      'Tặng gói bảo dưỡng định kỳ chính hãng 02 năm (hoặc 40.000 km)',
      'Tặng gói dán phim cách nhiệt 3M Crystalline cao cấp toàn bộ kính xe',
      'Tặng gói phủ Ceramic Pro 9H bảo vệ lớp sơn bóng bẩy',
      'Tặng bảo hiểm vật chất thân xe 01 năm chính hãng'
    ],
    specs: [
      { label: 'Động cơ', value: '1.5L Turbo I4 kết hợp công nghệ điện Mild-Hybrid EQ Boost' },
      { label: 'Công suất cực đại', value: '204 mã lực (HP) tại 5.800 – 6.100 vòng/phút' },
      { label: 'Mô-men xoắn cực đại', value: '300 Nm tại 1.800 – 4.000 vòng/phút' },
      { label: 'Hộp số', value: 'Tự động 9 cấp 9G-TRONIC chuyển số êm ái' },
      { label: 'Hệ dẫn động', value: 'Cầu sau (RWD) cho cảm giác lái đầm chắc và linh hoạt' },
      { label: 'Tăng tốc 0 – 100 km/h', value: '7.3 giây' },
      { label: 'Vận tốc tối đa', value: '246 km/h' },
      { label: 'Kích thước DxRxC', value: '4.751 x 1.890 x 1.437 (mm)' },
      { label: 'Chiều dài cơ sở', value: '2.865 mm (rộng rãi nhất phân khúc D)' },
      { label: 'Mức tiêu thụ nhiên liệu', value: '6.8L – 7.5L / 100km hỗn hợp' },
      { label: 'Mâm xe & Lốp', value: '17 inch 5 chấu kép thể thao, lốp Run-flat an toàn' }
    ],
    features: [
      'Màn hình cảm ứng trung tâm OLED 11.9 inch độ phân giải cao hướng 6 độ về người lái',
      'Bảng đồng hồ kỹ thuật số 12.3 inch với 3 phong cách hiển thị tùy biến đa dạng',
      'Hệ điều hành MBUX thế hệ thứ 2 với trợ lý ảo điều khiển giọng nói thông minh',
      'Cụm đèn trước LED High Performance tự động bật/tắt và điều chỉnh vùng sáng',
      'Hệ thống phanh chủ động Active Brake Assist phòng ngừa va chạm phía trước',
      'Hỗ trợ đỗ xe chủ động PARKTRONIC tự động lùi xe vào chuồng dọc & ngang',
      'Đèn viền nội thất Ambient Light 64 màu tùy chọn theo tâm trạng người lái',
      'Kết nối Apple CarPlay & Android Auto không dây, sạc điện thoại không dây chuẩn Qi'
    ],
    testDriveInfo: {
      showroom: 'Mercedes-Benz Haxaco Sài Gòn (Điện Biên Phủ & Võ Văn Kiệt)',
      colorsAvailable: ['Trắng Polar (Sẵn xe)', 'Đen Obsidian (Sẵn xe)', 'Xám Selenite', 'Đỏ Hyacinth'],
      status: 'Xe sẵn sàng - Đầy đủ nhiên liệu, điều hòa mát rượi, sẵn sàng đón khách'
    }
  },

  'car-glc300': {
    id: 'car-glc300',
    name: 'Mercedes-Benz GLC 300 4MATIC 2024',
    subtitle: 'SUV hạng sang cỡ trung bán chạy số 1 Việt Nam - Đỉnh cao công nghệ & uy lực',
    segment: 'Luxury SUV',
    badge: 'Mẫu SUV Bán Chạy Nhất',
    price: '2.799.000.000 VNĐ',
    rawPrice: 2799000000,
    onTheRoad: {
      tphcm: '3.102.000.000 VNĐ',
      hanoi: '3.158.000.000 VNĐ',
      provinces: '3.083.000.000 VNĐ'
    },
    installment: {
      minPrepay: '560.000.000 VNĐ (20%)',
      monthlyPayment: 'Từ 32.000.000 VNĐ/tháng',
      tenor: 'Vay tối đa 8 năm (96 tháng)',
      bankRate: 'Hỗ trợ gói vay lãi suất đặc quyền từ Ngân hàng đối tác, giải ngân trong ngày'
    },
    fees: [
      { name: 'Giá niêm yết chính hãng (VAT)', amount: '2.799.000.000 VNĐ', note: 'Đã bao gồm thuế GTGT 10%' },
      { name: 'Lệ phí trước bạ (10% TP.HCM)', amount: '279.900.000 VNĐ', note: 'Ưu đãi hỗ trợ 50% còn ~139.950.000 VNĐ' },
      { name: 'Phí đăng ký biển số mới', amount: '20.000.000 VNĐ', note: 'Khu vực TP.HCM / Hà Nội' },
      { name: 'Phí đăng kiểm lưu hành', amount: '340.000 VNĐ', note: 'Chu kỳ 36 tháng đối với xe đăng ký mới' },
      { name: 'Phí bảo trì đường bộ (1 năm)', amount: '1.560.000 VNĐ', note: 'Phí đường bộ bắt buộc' },
      { name: 'Bảo hiểm TNDS bắt buộc (1 năm)', amount: '480.000 VNĐ', note: 'Bảo hiểm trách nhiệm dân sự xe con' },
      { name: 'Bảo hiểm vật chất xe 2 chiều (1.5%)', amount: 'Miễn phí tặng kèm', note: 'Ưu đãi showroom trị giá 42.000.000 VNĐ' }
    ],
    promotions: [
      'Tặng 50% lệ phí trước bạ trị giá lên đến 140.000.000 VNĐ',
      'Tặng 01 năm bảo hiểm vật chất chính hãng Mercedes-Benz Insurance',
      'Tặng 02 năm bảo dưỡng miễn phí tại tất cả xưởng dịch vụ chính hãng Haxaco',
      'Tặng gói phụ kiện cao cấp: Bệ bước chân điện thể thao, Camera hành trình 4K, Phim 3M Crystalline',
      'Chính sách thu cũ đổi mới (Trade-in) trợ giá trực tiếp thêm 30.000.000 VNĐ'
    ],
    specs: [
      { label: 'Động cơ', value: '2.0L Turbo I4 thế hệ mới kết hợp Mild-Hybrid EQ Boost' },
      { label: 'Công suất cực đại', value: '258 mã lực (HP) tại 5.800 vòng/phút' },
      { label: 'Mô-men xoắn cực đại', value: '400 Nm tại 2.000 – 3.200 vòng/phút' },
      { label: 'Hộp số', value: 'Tự động 9 cấp 9G-TRONIC thế hệ mới' },
      { label: 'Hệ dẫn động', value: '4 bánh toàn thời gian 4MATIC vượt mọi địa hình' },
      { label: 'Tăng tốc 0 – 100 km/h', value: '6.2 giây (rất nhanh cho một mẫu SUV cỡ trung)' },
      { label: 'Vận tốc tối đa', value: '240 km/h' },
      { label: 'Kích thước DxRxC', value: '4.716 x 1.890 x 1.640 (mm)' },
      { label: 'Chiều dài cơ sở', value: '2.888 mm' },
      { label: 'Mâm xe', value: 'AMG 20 inch thể thao đa chấu phong cách hiện đại' },
      { label: 'Khoang hành lý', value: '620 lít (Mở rộng lên đến 1.680 lít khi gập hàng ghế sau)' }
    ],
    features: [
      'Cửa sổ trời toàn cảnh Panoramic Sunroof siêu rộng chỉnh điện',
      'Hệ thống âm thanh vòm Burmester 3D Surround 15 loa công suất 710 Watt',
      'Cụm đèn trước Digital Light thông minh nhất thế giới với công nghệ chiếu biểu tượng',
      'Chế độ lái Off-road kèm tính năng Nắp capo trong suốt (Transparent Bonnet)',
      'Camera 360 độ độ phân giải siêu nét kèm chế độ xem mô phỏng 3D',
      'Gói an toàn hỗ trợ lái Driving Assistance Package Plus, cảnh báo điểm mù, giữ làn chủ động',
      'Cốp sau đóng mở điện EASY-PACK tích hợp tính năng đá cốp rảnh tay (Hands-free Access)'
    ],
    testDriveInfo: {
      showroom: 'Mercedes-Benz Haxaco Sài Gòn (Trưng bày & Sẵn xe lái thử)',
      colorsAvailable: ['Trắng Polar (Xe demo chính)', 'Đen Obsidian (Sẵn xe)', 'Xanh Cavansite', 'Bạc High-tech'],
      status: 'Xe sẵn sàng - Đầy đủ nhiên liệu, hỗ trợ lái thử nội đô và chạy cao tốc thực tế'
    }
  },

  'car-e200': {
    id: 'car-e200',
    name: 'Mercedes-Benz E200 Exclusive 2024',
    subtitle: 'Sedan thương gia cao cấp - Biểu tượng của sự thành đạt và lịch lãm',
    segment: 'Executive Sedan',
    badge: 'Đẳng Cấp Thương Gia',
    price: '2.540.000.000 VNĐ',
    rawPrice: 2540000000,
    onTheRoad: {
      tphcm: '2.817.000.000 VNĐ',
      hanoi: '2.868.000.000 VNĐ',
      provinces: '2.798.000.000 VNĐ'
    },
    installment: {
      minPrepay: '508.000.000 VNĐ (20%)',
      monthlyPayment: 'Từ 29.500.000 VNĐ/tháng',
      tenor: 'Vay tối đa 8 năm (96 tháng)',
      bankRate: 'Hỗ trợ khách hàng doanh nghiệp vay khấu trừ thuế VAT, duyệt hồ sơ nhanh'
    },
    fees: [
      { name: 'Giá niêm yết chính hãng (VAT)', amount: '2.540.000.000 VNĐ', note: 'Đã bao gồm thuế GTGT 10%' },
      { name: 'Lệ phí trước bạ (10% TP.HCM)', amount: '254.000.000 VNĐ', note: 'Có chương trình ưu đãi tiền mặt trực tiếp' },
      { name: 'Phí đăng ký biển số mới', amount: '20.000.000 VNĐ', note: 'Khu vực TP.HCM / Hà Nội' },
      { name: 'Phí đăng kiểm lưu hành', amount: '340.000 VNĐ', note: 'Chu kỳ 36 tháng cho xe mới' },
      { name: 'Phí bảo trì đường bộ (1 năm)', amount: '1.560.000 VNĐ', note: 'Phí đường bộ bắt buộc' },
      { name: 'Bảo hiểm TNDS bắt buộc (1 năm)', amount: '480.000 VNĐ', note: 'Bảo hiểm trách nhiệm dân sự' },
      { name: 'Bảo hiểm vật chất xe 2 chiều (1.5%)', amount: 'Miễn phí tặng kèm', note: 'Ưu đãi showroom trị giá 38.000.000 VNĐ' }
    ],
    promotions: [
      'Ưu đãi đặc biệt giảm trực tiếp tiền mặt lên tới 100.000.000 VNĐ trong tháng',
      'Tặng gói phủ Ceramic Pro 9H bảo vệ nước sơn bóng sang trọng',
      'Tặng voucher phụ kiện chính hãng trị giá 30.000.000 VNĐ',
      'Miễn phí toàn bộ công bảo dưỡng định kỳ trong 03 năm đầu',
      'Đặc quyền phòng chờ VIP cao cấp và dịch vụ cứu hộ đưa đón tận nơi'
    ],
    specs: [
      { label: 'Động cơ', value: '2.0L Turbo I4 tăng áp cuộn đôi thế hệ mới' },
      { label: 'Công suất cực đại', value: '197 mã lực (HP) tại 5.500 – 6.100 vòng/phút' },
      { label: 'Mô-men xoắn cực đại', value: '320 Nm tại 1.650 – 4.000 vòng/phút' },
      { label: 'Hộp số', value: 'Tự động 9 cấp 9G-TRONIC siêu êm' },
      { label: 'Hệ dẫn động', value: 'Cầu sau (RWD) chuẩn sedan thể thao sang trọng' },
      { label: 'Tăng tốc 0 – 100 km/h', value: '7.5 giây' },
      { label: 'Kích thước DxRxC', value: '4.930 x 1.852 x 1.468 (mm)' },
      { label: 'Chiều dài cơ sở', value: '2.939 mm (Khoang hành khách siêu rộng rãi chuẩn ông chủ)' },
      { label: 'Hệ thống treo', value: 'AGILITY CONTROL êm ái hàng đầu phân khúc E-Class' },
      { label: 'Mâm xe', value: '18 inch đa chấu Exclusive phong cách cổ điển quyền quý' }
    ],
    features: [
      'Biểu tượng ngôi sao 3 cánh đứng danh giá uy nghiêm trên nắp capo xe',
      'Nội thất ốp gỗ tần bì bóng Burled Walnut màu nâu cao cấp chống trầy xước',
      'Hệ thống tạo hương thơm thông minh AIR-BALANCE với nước hoa chính hãng',
      'Hệ thống lọc không khí ion hóa khử sạch bụi mịn PM2.5 bảo vệ sức khỏe gia đình',
      'Cửa hít tự động 4 cánh êm dịu, không gây tiếng ồn khi đóng cửa',
      'Rèm che nắng kính sau chỉnh điện và rèm che nắng 2 cửa sổ sau',
      'Bảng đồng hồ kép Widescreen Cockpit 12.3 inch trải dài sắc nét'
    ],
    testDriveInfo: {
      showroom: 'Mercedes-Benz Haxaco Sài Gòn',
      colorsAvailable: ['Đen Obsidian (Xe lái thử doanh nhân)', 'Trắng Polar', 'Nâu Citrine'],
      status: 'Xe sẵn sàng - Trải nghiệm cách âm tuyệt đỉnh và khoang sau êm ái'
    }
  },

  'car-macan': {
    id: 'car-macan',
    name: 'Porsche Macan GTS 2023 (Lướt 8.000km)',
    subtitle: 'SUV thể thao thuần chất Đức - 440 mã lực đỉnh cao hiệu năng Porsche',
    segment: 'Luxury Compact SUV',
    badge: 'Hiệu Năng Thể Thao Porsche',
    price: '4.250.000.000 VNĐ',
    rawPrice: 4250000000,
    onTheRoad: {
      tphcm: '4.340.000.000 VNĐ (Chỉ 2% trước bạ)',
      hanoi: '4.340.000.000 VNĐ (Chỉ 2% trước bạ)',
      provinces: '4.335.000.000 VNĐ'
    },
    installment: {
      minPrepay: '1.275.000.000 VNĐ (30%)',
      monthlyPayment: 'Từ 45.000.000 VNĐ/tháng',
      tenor: 'Vay tối đa 7 năm (84 tháng)',
      bankRate: 'Hỗ trợ các gói vay ngân hàng quốc tế, bảo lãnh thủ tục sang tên đổi biển số'
    },
    fees: [
      { name: 'Giá xe lướt chính hãng (ODO 8.000km)', amount: '4.250.000.000 VNĐ', note: 'Tiết kiệm hơn 600 triệu so với mua xe mới' },
      { name: 'Lệ phí trước bạ xe lướt (chỉ 2%)', amount: '85.000.000 VNĐ', note: 'Áp dụng cho xe đã qua sử dụng đăng ký lại' },
      { name: 'Phí cấp đổi biển số & sang tên', amount: '150.000 VNĐ', note: 'Chi phí biển số xe sang tên' },
      { name: 'Phí đăng kiểm lưu hành', amount: '340.000 VNĐ', note: 'Thời hạn kiểm định theo quy định' },
      { name: 'Phí bảo trì đường bộ (1 năm)', amount: '1.560.000 VNĐ', note: 'Phí đường bộ bắt buộc' },
      { name: 'Bảo hiểm TNDS bắt buộc (1 năm)', amount: '480.000 VNĐ', note: 'Bảo hiểm trách nhiệm dân sự' },
      { name: 'Kiểm định 111 hạng mục Porsche Approved', amount: 'Đã hoàn thành 100%', note: 'Chứng nhận chất lượng chính hãng toàn diện' }
    ],
    promotions: [
      'Chứng nhận bảo hành chính hãng Porsche Approved còn hiệu lực 02 năm không giới hạn km',
      'Tặng gói bảo dưỡng miễn phí tại trung tâm dịch vụ Porsche Sài Gòn',
      'Cam kết văn bản: Không đâm đụng, không ngập nước, ODO zin 8.000 km',
      'Hỗ trợ toàn bộ thủ tục sang tên đổi biển số VIP trong vòng 48 giờ',
      'Trải nghiệm cung đường lái thử thể thao chuyên biệt tại Quận 7'
    ],
    specs: [
      { label: 'Động cơ', value: '2.9L V6 Twin-Turbo kép hiệu năng thể thao đỉnh cao' },
      { label: 'Công suất cực đại', value: '440 mã lực (HP) tại 5.700 – 6.600 vòng/phút' },
      { label: 'Mô-men xoắn cực đại', value: '550 Nm tại 1.900 – 5.600 vòng/phút' },
      { label: 'Hộp số', value: 'Ly hợp kép PDK 7 cấp sang số chớp nhoáng trứ danh của Porsche' },
      { label: 'Hệ dẫn động', value: '4 bánh toàn phần chủ động AWD kèm Porsche Traction Management (PTM)' },
      { label: 'Tăng tốc 0 – 100 km/h', value: 'Chỉ 4.3 giây (kèm gói thể thao Sport Chrono Package)' },
      { label: 'Tốc độ tối đa', value: '272 km/h' },
      { label: 'Hệ thống treo', value: 'Treo khí nén thích ứng PASM hạ thấp gầm 10mm khi chạy tốc độ cao' },
      { label: 'Mâm xe', value: '21 inch RS Spyder Design sơn đen mờ thể thao GTS' },
      { label: 'Kích thước DxRxC', value: '4.726 x 1.927 x 1.596 (mm)' }
    ],
    features: [
      'Hệ thống ống xả thể thao Porsche Sports Exhaust với nút bấm mở van gầm rú uy lực',
      'Gói thể thao Sport Chrono Package với đồng hồ thể thao kinh điển trên bảng taplo',
      'Dàn âm thanh vòm đỉnh cao BOSE Surround Sound 14 loa công suất 665 Watt',
      'Ghế thể thao GTS chỉnh điện 18 hướng nhớ vị trí ôm sát lưng phong cách xe đua',
      'Nội thất bọc da cao cấp phối da lộn Alcantara thể thao kèm chỉ khâu màu đỏ tương phản',
      'Hệ thống đèn pha LED cua theo góc lái Porsche Dynamic Light System Plus (PDLS Plus)',
      'Vô lăng thể thao GT đa chức năng tích hợp núm xoay chuyển 4 chế độ lái Sport Response'
    ],
    testDriveInfo: {
      showroom: 'Porsche Saigon Studio & Auto 568 Luxury Showroom',
      colorsAvailable: ['Trắng Carrara White (Sẵn xe)', 'Đỏ Carmine Red', 'Xám Volcano Grey'],
      status: 'Xe sẵn sàng - Cảm nhận uy lực động cơ 440HP dính chặt lưng ghế khi đạp ga'
    }
  }
};

// Hàm trợ giúp lấy thông tin chi tiết xe dựa vào ID hoặc tên xe
export function getCarDetails(car) {
  if (!car) return CAR_DETAILED_DATA['car-c200'];

  const carId = car.id || '';
  if (CAR_DETAILED_DATA[carId]) {
    return { ...CAR_DETAILED_DATA[carId], image: car.image || CAR_DETAILED_DATA[carId].image };
  }

  // Khớp theo tên hoặc từ khóa
  const name = String(car.name || '').toLowerCase();
  if (name.includes('c200') || name.includes('c-class') || name.includes('c300')) {
    return { ...CAR_DETAILED_DATA['car-c200'], name: car.name, image: car.image };
  }
  if (name.includes('glc') || name.includes('glc300') || name.includes('glc 300')) {
    return { ...CAR_DETAILED_DATA['car-glc300'], name: car.name, image: car.image };
  }
  if (name.includes('e200') || name.includes('e-class') || name.includes('e300')) {
    return { ...CAR_DETAILED_DATA['car-e200'], name: car.name, image: car.image };
  }
  if (name.includes('macan') || name.includes('porsche') || name.includes('cayenne')) {
    return { ...CAR_DETAILED_DATA['car-macan'], name: car.name, image: car.image };
  }

  // Fallback mặc định
  return {
    ...CAR_DETAILED_DATA['car-c200'],
    id: car.id || 'car-custom',
    name: car.name || 'Xe Sang Trải Nghiệm',
    segment: car.segment || 'Luxury Car',
    price: car.price || 'Liên hệ báo giá',
    image: car.image
  };
}
