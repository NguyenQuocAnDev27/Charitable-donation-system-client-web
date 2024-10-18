import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Về chúng tôi",
  description: "Trang thông tin về SGU Charity - tổ chức từ thiện thuộc Trường Đại học Sài Gòn.",
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb pageName="Về chúng tôi" description="" />

      <section className="pb-[120px] pt-[20px] bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
            Giới Thiệu Về SGU Charity
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            SGU Charity là tổ chức từ thiện thuộc Trường Đại học Sài Gòn (SGU), chuyên hỗ trợ sinh viên có hoàn cảnh khó khăn và cung cấp viện trợ cho các khu vực bị ảnh hưởng bởi lũ lụt, bão và thiên tai. Với mục tiêu đem lại sự thay đổi tích cực, chúng tôi tận dụng các nguồn lực tài chính để hỗ trợ sinh viên và cộng đồng.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Sứ Mệnh
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Sứ mệnh của chúng tôi là giúp đỡ các sinh viên gặp khó khăn trong học tập cũng như hỗ trợ các hoạt động cứu trợ thiên tai tại Việt Nam. Chúng tôi cam kết xây dựng một mạng lưới hỗ trợ cho sinh viên và cộng đồng trong thời điểm cần thiết nhất.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Các Chương Trình Chính
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            SGU Charity triển khai nhiều chương trình hỗ trợ tài chính cho sinh viên như học bổng và trợ cấp khẩn cấp. Bên cạnh đó, chúng tôi còn điều phối các hoạt động cứu trợ khẩn cấp cho những khu vực bị ảnh hưởng nặng nề bởi lũ lụt và bão.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Liên Hệ
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            <strong>Văn phòng tại Hà Nội:</strong> Tầng 4, 16 Ngô Quyền, Quận Hoàn Kiếm <br />
            Điện thoại: 024.3936 5426 <br /><br />

            <strong>Văn phòng tại TP.HCM:</strong> 273 An Dương Vương, phường 3, quận 5, thành phố Hồ Chí Minh, Việt Nam<br />
            Điện thoại: 028.3526 0208 <br /><br />
            
            <strong>Đường dây nóng:</strong> <br />
            - Cho sinh viên cần hỗ trợ: 090 488 5555 <br />
            - Cho các đối tác gây quỹ: 090 211 0550 <br />
            - Hoặc inbox tại fanpage facebook dưới đây <br /><br />

            <strong>Facebook:</strong> <a href="https://www.facebook.com/SaigonUni.SGU" target="_blank" className="text-blue2 dark:text-blue3 hover:underline">Sai Gon University Charity</a> <br />
          </p>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
