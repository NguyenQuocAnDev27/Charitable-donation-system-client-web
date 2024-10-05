// import { ProjectDonate } from "@/types/project";

// const projects_data: ProjectDonate[] = [
//   {
//     project_id: 1,
//     project_name: "Xây Dựng Trường Học Mới Cho Trẻ Em Vùng Cao",
//     description: "Xây dựng cơ sở hạ tầng trường học tại các vùng cao hẻo lánh, nhằm mang lại cơ hội học tập cho trẻ em nghèo.",
//     goal_amount: 5000000000, // 5 tỷ VND
//     current_amount: 1500000000, // 1.5 tỷ VND
//     start_date: new Date("2024-09-01"),
//     end_date: new Date("2024-12-01"),
//     status: "pending",
//     project_manager_id: 1,
//     project_manager_name: 'Hội Khuyến Học Việt Nam',
//     created_at: new Date("2024-09-20T20:46:33.637Z"),
//     updated_at: new Date("2024-09-20T20:46:33.637Z"),
//   },
//   {
//     project_id: 2,
//     project_name: "Chương Trình Hỗ Trợ Sữa Cho Trẻ Em Nghèo",
//     description: "Hỗ trợ cung cấp sữa miễn phí cho trẻ em dưới 5 tuổi tại các vùng kinh tế khó khăn.",
//     goal_amount: 3000000000, // 3 tỷ VND
//     current_amount: 1200000000, // 1.2 tỷ VND
//     start_date: new Date("2024-09-15"),
//     end_date: new Date("2024-12-30"),
//     status: "pending",
//     project_manager_id: 2,
//     project_manager_name: 'Quỹ Sữa Vươn Cao Việt Nam',
//     created_at: new Date("2024-09-22T20:46:33.637Z"),
//     updated_at: new Date("2024-09-22T20:46:33.637Z"),
//   },
//   {
//     project_id: 3,
//     project_name: "Quỹ Mổ Tim Cho Trẻ Em Bị Dị Tật Bẩm Sinh",
//     description: "Hỗ trợ chi phí mổ tim cho trẻ em nghèo bị dị tật bẩm sinh cần phẫu thuật kịp thời.",
//     goal_amount: 7000000000, // 7 tỷ VND
//     current_amount: 3500000000, // 3.5 tỷ VND
//     start_date: new Date("2024-10-01"),
//     end_date: new Date("2025-01-01"),
//     status: "pending",
//     project_manager_id: 3,
//     project_manager_name: 'Quỹ Thiện Tâm',
//     created_at: new Date("2024-10-01T10:00:00Z"),
//     updated_at: new Date("2024-10-01T10:00:00Z"),
//   },
//   {
//     project_id: 4,
//     project_name: "Xây Nhà Tình Thương Cho Gia Đình Nghèo",
//     description: "Xây dựng nhà tình thương cho các hộ gia đình nghèo không có điều kiện sở hữu nhà ở ổn định.",
//     goal_amount: 4000000000, // 4 tỷ VND
//     current_amount: 1500000000, // 1.5 tỷ VND
//     start_date: new Date("2024-09-20"),
//     end_date: new Date("2024-12-20"),
//     status: "completed",
//     project_manager_id: 4,
//     project_manager_name: 'Hội Chữ Thập Đỏ Việt Nam',
//     created_at: new Date("2024-09-20T20:46:33.637Z"),
//     updated_at: new Date("2024-09-20T20:46:33.637Z"),
//   },
//   {
//     project_id: 5,
//     project_name: "Chương Trình Tiếp Sức Mùa Thi",
//     description: "Hỗ trợ chi phí đi lại và ăn ở cho học sinh vùng sâu, vùng xa trong mùa thi tuyển sinh quốc gia.",
//     goal_amount: 2000000000, // 2 tỷ VND
//     current_amount: 500000000, // 500 triệu VND
//     start_date: new Date("2024-09-25"),
//     end_date: new Date("2024-12-25"),
//     status: "pending",
//     project_manager_id: 5,
//     project_manager_name: 'Đoàn Thanh Niên Việt Nam',
//     created_at: new Date("2024-09-25T20:46:33.637Z"),
//     updated_at: new Date("2024-09-25T20:46:33.637Z"),
//   },
//   {
//     project_id: 6,
//     project_name: "Quỹ Cứu Trợ Thiên Tai Miền Trung",
//     description: "Hỗ trợ khắc phục hậu quả thiên tai, cứu trợ khẩn cấp cho người dân miền Trung trong mùa bão lũ.",
//     goal_amount: 15000000000, // 15 tỷ VND
//     current_amount: 10000000000, // 10 tỷ VND
//     start_date: new Date("2024-10-01"),
//     end_date: new Date("2024-12-30"),
//     status: "completed",
//     project_manager_id: 6,
//     project_manager_name: 'Mặt Trận Tổ Quốc Việt Nam',
//     created_at: new Date("2024-10-01T12:00:00Z"),
//     updated_at: new Date("2024-10-01T12:00:00Z"),
//   },
//   {
//     project_id: 7,
//     project_name: "Chiến Dịch Trồng Cây Gây Rừng",
//     description: "Tái tạo rừng tự nhiên thông qua việc trồng cây xanh tại các khu vực rừng bị phá hủy.",
//     goal_amount: 20000000000, // 20 tỷ VND
//     current_amount: 7500000000, // 7.5 tỷ VND
//     start_date: new Date("2024-10-15"),
//     end_date: new Date("2025-01-15"),
//     status: "pending",
//     project_manager_id: 7,
//     project_manager_name: 'Quỹ Bảo Vệ Môi Trường Việt Nam',
//     created_at: new Date("2024-10-15T10:00:00Z"),
//     updated_at: new Date("2024-10-15T10:00:00Z"),
//   },
//   {
//     project_id: 8,
//     project_name: "Hỗ Trợ Khởi Nghiệp Cho Thanh Niên Nông Thôn",
//     description: "Hỗ trợ vốn khởi nghiệp cho các bạn trẻ tại vùng nông thôn có ý tưởng phát triển kinh tế nhưng thiếu nguồn vốn.",
//     goal_amount: 12000000000, // 12 tỷ VND
//     current_amount: 6000000000, // 6 tỷ VND
//     start_date: new Date("2024-09-15"),
//     end_date: new Date("2025-02-15"),
//     status: "pending",
//     project_manager_id: 8,
//     project_manager_name: 'Đoàn Thanh Niên Việt Nam',
//     created_at: new Date("2024-09-15T10:00:00Z"),
//     updated_at: new Date("2024-09-15T10:00:00Z"),
//   },
//   {
//     project_id: 9,
//     project_name: "Quỹ Khám Chữa Bệnh Miễn Phí Cho Người Nghèo",
//     description: "Hỗ trợ khám chữa bệnh miễn phí cho người nghèo tại các bệnh viện công lập trên toàn quốc.",
//     goal_amount: 10000000000, // 10 tỷ VND
//     current_amount: 5000000000, // 5 tỷ VND
//     start_date: new Date("2024-10-01"),
//     end_date: new Date("2025-03-01"),
//     status: "pending",
//     project_manager_id: 9,
//     project_manager_name: 'Bộ Y Tế Việt Nam',
//     created_at: new Date("2024-10-01T12:00:00Z"),
//     updated_at: new Date("2024-10-01T12:00:00Z"),
//   },
//   {
//     project_id: 10,
//     project_name: "Chương Trình Cấp Nước Sạch Nông Thôn",
//     description: "Hỗ trợ lắp đặt hệ thống cấp nước sạch cho người dân vùng sâu, vùng xa, giúp cải thiện chất lượng cuộc sống.",
//     goal_amount: 8000000000, // 8 tỷ VND
//     current_amount: 4500000000, // 4.5 tỷ VND
//     start_date: new Date("2024-09-10"),
//     end_date: new Date("2025-01-10"),
//     status: "pending",
//     project_manager_id: 10,
//     project_manager_name: 'Tổ Chức Nước Sạch Việt Nam',
//     created_at: new Date("2024-09-10T10:00:00Z"),
//     updated_at: new Date("2024-09-10T10:00:00Z"),
//   },
//   {
//     project_id: 11,
//     project_name: "Quỹ Hỗ Trợ Bệnh Nhân Ung Thư",
//     description: "Hỗ trợ bệnh nhân ung thư có hoàn cảnh khó khăn trong việc điều trị và chăm sóc sức khỏe.",
//     goal_amount: 10000000000, // 10 tỷ VND
//     current_amount: 3500000000, // 3.5 tỷ VND
//     start_date: new Date("2024-10-01"),
//     end_date: new Date("2025-02-01"),
//     status: "pending",
//     project_manager_id: 11,
//     project_manager_name: "Quỹ Ngày Mai Tươi Sáng",
//     created_at: new Date("2024-10-01T20:00:00Z"),
//     updated_at: new Date("2024-10-01T20:00:00Z"),
//   },
//   {
//     project_id: 12,
//     project_name: "Cải Tạo Hệ Thống Đường Xã Nông Thôn",
//     description: "Cải tạo và xây dựng lại các con đường giao thông tại các xã nông thôn, giúp cải thiện đời sống người dân.",
//     goal_amount: 12000000000, // 12 tỷ VND
//     current_amount: 8000000000, // 8 tỷ VND
//     start_date: new Date("2024-11-01"),
//     end_date: new Date("2025-02-01"),
//     status: "pending",
//     project_manager_id: 12,
//     project_manager_name: "Sở Giao Thông Vận Tải Việt Nam",
//     created_at: new Date("2024-11-01T10:00:00Z"),
//     updated_at: new Date("2024-11-01T10:00:00Z"),
//   },
//   {
//     project_id: 13,
//     project_name: "Chương Trình Cấp Học Bổng Toàn Phần Cho Sinh Viên Nghèo",
//     description: "Cung cấp học bổng toàn phần cho sinh viên nghèo có thành tích học tập xuất sắc.",
//     goal_amount: 8000000000, // 8 tỷ VND
//     current_amount: 4500000000, // 4.5 tỷ VND
//     start_date: new Date("2024-10-15"),
//     end_date: new Date("2025-01-15"),
//     status: "pending",
//     project_manager_id: 13,
//     project_manager_name: "Quỹ Khuyến Học Việt Nam",
//     created_at: new Date("2024-10-15T12:00:00Z"),
//     updated_at: new Date("2024-10-15T12:00:00Z"),
//   },
//   {
//     project_id: 14,
//     project_name: "Dự Án Cải Tạo Khu Vui Chơi Cho Trẻ Em",
//     description: "Nâng cấp và cải tạo các khu vui chơi công cộng cho trẻ em tại các khu vực đông dân cư.",
//     goal_amount: 6000000000, // 6 tỷ VND
//     current_amount: 2000000000, // 2 tỷ VND
//     start_date: new Date("2024-10-20"),
//     end_date: new Date("2025-02-20"),
//     status: "pending",
//     project_manager_id: 14,
//     project_manager_name: "Sở Văn Hóa và Thể Thao",
//     created_at: new Date("2024-10-20T08:00:00Z"),
//     updated_at: new Date("2024-10-20T08:00:00Z"),
//   },
//   {
//     project_id: 15,
//     project_name: "Hỗ Trợ Dinh Dưỡng Cho Trẻ Em Suy Dinh Dưỡng",
//     description: "Chương trình hỗ trợ thực phẩm và dinh dưỡng cho trẻ em bị suy dinh dưỡng tại các khu vực khó khăn.",
//     goal_amount: 9000000000, // 9 tỷ VND
//     current_amount: 6000000000, // 6 tỷ VND
//     start_date: new Date("2024-09-15"),
//     end_date: new Date("2024-12-15"),
//     status: "completed",
//     project_manager_id: 15,
//     project_manager_name: "Tổ Chức UNICEF Việt Nam",
//     created_at: new Date("2024-09-15T09:00:00Z"),
//     updated_at: new Date("2024-09-15T09:00:00Z"),
//   },
//   {
//     project_id: 16,
//     project_name: "Chương Trình Tặng Sách Cho Trẻ Em Vùng Cao",
//     description: "Tặng sách giáo khoa và tài liệu học tập cho trẻ em tại các trường học vùng cao, vùng sâu, vùng xa.",
//     goal_amount: 5000000000, // 5 tỷ VND
//     current_amount: 2000000000, // 2 tỷ VND
//     start_date: new Date("2024-11-01"),
//     end_date: new Date("2025-01-31"),
//     status: "pending",
//     project_manager_id: 16,
//     project_manager_name: "Hội Khuyến Học Việt Nam",
//     created_at: new Date("2024-11-01T10:00:00Z"),
//     updated_at: new Date("2024-11-01T10:00:00Z"),
//   },
//   {
//     project_id: 17,
//     project_name: "Chương Trình Phát Triển Nghề Cho Người Khuyết Tật",
//     description: "Hỗ trợ đào tạo nghề và tạo việc làm cho người khuyết tật, giúp họ tự lập và phát triển kinh tế.",
//     goal_amount: 12000000000, // 12 tỷ VND
//     current_amount: 8000000000, // 8 tỷ VND
//     start_date: new Date("2024-10-01"),
//     end_date: new Date("2025-01-01"),
//     status: "pending",
//     project_manager_id: 17,
//     project_manager_name: "Quỹ Vì Người Khuyết Tật",
//     created_at: new Date("2024-10-01T12:00:00Z"),
//     updated_at: new Date("2024-10-01T12:00:00Z"),
//   },
//   {
//     project_id: 18,
//     project_name: "Chương Trình Hỗ Trợ Người Cao Tuổi Không Nơi Nương Tựa",
//     description: "Chương trình chăm sóc sức khỏe và hỗ trợ nơi ở cho người cao tuổi cô đơn không nơi nương tựa.",
//     goal_amount: 10000000000, // 10 tỷ VND
//     current_amount: 5000000000, // 5 tỷ VND
//     start_date: new Date("2024-09-01"),
//     end_date: new Date("2024-12-01"),
//     status: "pending",
//     project_manager_id: 18,
//     project_manager_name: "Viện Dưỡng Lão Việt Nam",
//     created_at: new Date("2024-09-01T10:00:00Z"),
//     updated_at: new Date("2024-09-01T10:00:00Z"),
//   },
//   {
//     project_id: 19,
//     project_name: "Quỹ Hỗ Trợ Phụ Nữ Vùng Biên Giới Khởi Nghiệp",
//     description: "Hỗ trợ vốn vay không lãi suất cho phụ nữ nghèo ở vùng biên giới phát triển kinh tế gia đình.",
//     goal_amount: 5000000000, // 5 tỷ VND
//     current_amount: 3000000000, // 3 tỷ VND
//     start_date: new Date("2024-11-01"),
//     end_date: new Date("2025-02-01"),
//     status: "pending",
//     project_manager_id: 19,
//     project_manager_name: "Hội Liên Hiệp Phụ Nữ Việt Nam",
//     created_at: new Date("2024-11-01T10:00:00Z"),
//     updated_at: new Date("2024-11-01T10:00:00Z"),
//   },
//   {
//     project_id: 20,
//     project_name: "Chương Trình Chống Biến Đổi Khí Hậu",
//     description: "Hỗ trợ các hoạt động phòng chống biến đổi khí hậu, bao gồm trồng rừng và phát triển năng lượng sạch.",
//     goal_amount: 20000000000, // 20 tỷ VND
//     current_amount: 12000000000, // 12 tỷ VND
//     start_date: new Date("2024-10-15"),
//     end_date: new Date("2025-02-15"),
//     status: "pending",
//     project_manager_id: 20,
//     project_manager_name: "Bộ Tài Nguyên và Môi Trường",
//     created_at: new Date("2024-10-15T10:00:00Z"),
//     updated_at: new Date("2024-10-15T10:00:00Z"),
//   },
//   {
//     project_id: 21,
//     project_name: "Quỹ Hỗ Trợ Nông Dân Trồng Cây Dược Liệu",
//     description: "Hỗ trợ nông dân vùng cao trồng và phát triển cây dược liệu để tạo sinh kế bền vững.",
//     goal_amount: 7000000000, // 7 tỷ VND
//     current_amount: 3500000000, // 3.5 tỷ VND
//     start_date: new Date("2024-09-10"),
//     end_date: new Date("2024-12-31"),
//     status: "pending",
//     project_manager_id: 21,
//     project_manager_name: "Tổ Chức Dược Liệu Việt Nam",
//     created_at: new Date("2024-09-10T08:00:00Z"),
//     updated_at: new Date("2024-09-10T08:00:00Z"),
//   },
//   {
//     project_id: 22,
//     project_name: "Chương Trình Cải Tạo Khu Nghỉ Dưỡng Cho Người Cao Tuổi",
//     description: "Cải tạo khu nghỉ dưỡng và chăm sóc sức khỏe cho người cao tuổi, đảm bảo môi trường sống lành mạnh.",
//     goal_amount: 6000000000, // 6 tỷ VND
//     current_amount: 2000000000, // 2 tỷ VND
//     start_date: new Date("2024-10-20"),
//     end_date: new Date("2025-01-20"),
//     status: "pending",
//     project_manager_id: 22,
//     project_manager_name: "Viện Dưỡng Lão Việt Nam",
//     created_at: new Date("2024-10-20T10:00:00Z"),
//     updated_at: new Date("2024-10-20T10:00:00Z"),
//   },
//   {
//     project_id: 23,
//     project_name: "Xây Dựng Cơ Sở Y Tế Miền Núi",
//     description: "Xây dựng và trang bị cơ sở y tế tại các khu vực miền núi, phục vụ khám chữa bệnh cho người dân.",
//     goal_amount: 8000000000, // 8 tỷ VND
//     current_amount: 4000000000, // 4 tỷ VND
//     start_date: new Date("2024-11-01"),
//     end_date: new Date("2025-02-01"),
//     status: "pending",
//     project_manager_id: 23,
//     project_manager_name: "Bộ Y Tế Việt Nam",
//     created_at: new Date("2024-11-01T10:00:00Z"),
//     updated_at: new Date("2024-11-01T10:00:00Z"),
//   },
//   {
//     project_id: 24,
//     project_name: "Chương Trình Nước Sạch Vùng Biển",
//     description: "Cung cấp hệ thống xử lý nước biển thành nước ngọt cho các đảo và khu vực ven biển.",
//     goal_amount: 10000000000, // 10 tỷ VND
//     current_amount: 5000000000, // 5 tỷ VND
//     start_date: new Date("2024-09-01"),
//     end_date: new Date("2024-12-01"),
//     status: "pending",
//     project_manager_id: 24,
//     project_manager_name: "Công Ty Cổ Phần Nước Sạch",
//     created_at: new Date("2024-09-01T10:00:00Z"),
//     updated_at: new Date("2024-09-01T10:00:00Z"),
//   },
//   {
//     project_id: 25,
//     project_name: "Chương Trình Tái Chế Rác Thải Nhựa",
//     description: "Tạo ra các cơ sở tái chế rác thải nhựa, góp phần giảm ô nhiễm môi trường và tạo việc làm cho lao động địa phương.",
//     goal_amount: 15000000000, // 15 tỷ VND
//     current_amount: 10000000000, // 10 tỷ VND
//     start_date: new Date("2024-10-01"),
//     end_date: new Date("2025-02-01"),
//     status: "pending",
//     project_manager_id: 25,
//     project_manager_name: "Tổ Chức Môi Trường Xanh Việt Nam",
//     created_at: new Date("2024-10-01T10:00:00Z"),
//     updated_at: new Date("2024-10-01T10:00:00Z"),
//   },
//   {
//     project_id: 26,
//     project_name: "Hỗ Trợ Xây Dựng Trường Mầm Non Miền Núi",
//     description: "Xây dựng và trang bị các trường mầm non tại vùng sâu vùng xa nhằm giúp trẻ em được học tập sớm.",
//     goal_amount: 7000000000, // 7 tỷ VND
//     current_amount: 4500000000, // 4.5 tỷ VND
//     start_date: new Date("2024-09-10"),
//     end_date: new Date("2025-01-10"),
//     status: "pending",
//     project_manager_id: 26,
//     project_manager_name: "Hội Khuyến Học Việt Nam",
//     created_at: new Date("2024-09-10T10:00:00Z"),
//     updated_at: new Date("2024-09-10T10:00:00Z"),
//   },
//   {
//     project_id: 27,
//     project_name: "Quỹ Hỗ Trợ Học Bổng Cho Sinh Viên Nghèo Vượt Khó",
//     description: "Tạo học bổng cho sinh viên có hoàn cảnh khó khăn nhưng có thành tích học tập xuất sắc tại các trường đại học.",
//     goal_amount: 5000000000, // 5 tỷ VND
//     current_amount: 2500000000, // 2.5 tỷ VND
//     start_date: new Date("2024-09-01"),
//     end_date: new Date("2024-12-01"),
//     status: "pending",
//     project_manager_id: 27,
//     project_manager_name: "Quỹ Hỗ Trợ Sinh Viên Việt Nam",
//     created_at: new Date("2024-09-01T08:00:00Z"),
//     updated_at: new Date("2024-09-01T08:00:00Z"),
//   },
//   {
//     project_id: 28,
//     project_name: "Chương Trình Cải Tạo Môi Trường Rừng Quốc Gia",
//     description: "Tái tạo và bảo vệ các khu rừng quốc gia đã bị suy thoái, góp phần chống biến đổi khí hậu.",
//     goal_amount: 8000000000, // 8 tỷ VND
//     current_amount: 4000000000, // 4 tỷ VND
//     start_date: new Date("2024-11-15"),
//     end_date: new Date("2025-02-15"),
//     status: "pending",
//     project_manager_id: 28,
//     project_manager_name: "Quỹ Bảo Vệ Môi Trường Quốc Gia",
//     created_at: new Date("2024-11-15T10:00:00Z"),
//     updated_at: new Date("2024-11-15T10:00:00Z"),
//   },
//   {
//     project_id: 29,
//     project_name: "Quỹ Hỗ Trợ Xây Nhà Cho Người Khuyết Tật",
//     description: "Xây nhà ở miễn phí cho người khuyết tật gặp khó khăn trong việc tiếp cận các hỗ trợ tài chính từ ngân hàng.",
//     goal_amount: 10000000000, // 10 tỷ VND
//     current_amount: 5000000000, // 5 tỷ VND
//     start_date: new Date("2024-09-01"),
//     end_date: new Date("2025-01-01"),
//     status: "pending",
//     project_manager_id: 29,
//     project_manager_name: "Quỹ Hỗ Trợ Người Khuyết Tật Việt Nam",
//     created_at: new Date("2024-09-01T10:00:00Z"),
//     updated_at: new Date("2024-09-01T10:00:00Z"),
//   },
//   {
//     project_id: 30,
//     project_name: "Quỹ Hỗ Trợ Tái Hòa Nhập Cho Người Mãn Hạn Tù",
//     description: "Cung cấp hỗ trợ việc làm và tái hòa nhập xã hội cho những người mãn hạn tù trở lại đời sống thường nhật.",
//     goal_amount: 7000000000, // 7 tỷ VND
//     current_amount: 3500000000, // 3.5 tỷ VND
//     start_date: new Date("2024-10-01"),
//     end_date: new Date("2025-02-01"),
//     status: "pending",
//     project_manager_id: 30,
//     project_manager_name: "Quỹ Tái Hòa Nhập Việt Nam",
//     created_at: new Date("2024-10-01T10:00:00Z"),
//     updated_at: new Date("2024-10-01T10:00:00Z"),
//   },
// ];

// export default projects_data;
