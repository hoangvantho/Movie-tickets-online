import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="text-white bg-[rgba(0,0,0,0.8)] py-8">
      <section className="flex justify-center items-center ">
        <div className="mb-4 flex justify-between md:items-start max-w-[1410px] w-full flex-col md:flex-row">
          <div className="flex flex-col items-center pr-4">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Screentime logo"
                width={206}
                height={169}
                className="mx-auto mb-4"
              /></Link>
            <div className="flex justify-center space-x-4 mb-4">
              <a href="#" className="text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-tiktok"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center mt-20">
            <h3 style={{ fontSize: "20px" }} className="font-bold mb-2 text-left ">XEM PHIM</h3>
            <ul className="space-y-1 text-center text-base">
              <li><a href="/now-showing">Phim đang chiếu</a></li>
              <li><a href="/coming-soon">Phim sắp chiếu</a></li>
              <li>Suất chiếu đặc biệt</li>
            </ul>
          </div>

          <div className="flex flex-col items-center mt-20">
            <h3 style={{ fontSize: "20px" }} className="font-bold mb-2 text-left ">STICKER MAN</h3>
            <ul className="space-y-1 text-center text-base">
              <li><a href="/about">Giới thiệu</a></li>
              <li><a href="/contact">Liên hệ</a></li>
              <li>Tuyển dụng</li>
            </ul>
          </div>

          <div className="flex flex-col items-center mt-20">
            <h3 style={{ fontSize: "20px" }} className="font-bold mb-2 text-left ">THUÊ SỰ KIỆN</h3>
            <ul className="space-y-1 text-center text-base">
              <li>Thuê rạp</li>
              <li>Các loại hình cho thuê khác</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="flex justify-between flex-col md:flex-row items-center mb-4 text-base max-w-[1410px] mx-auto">
        <div>
          <p>© 2024 Screentime. All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          <a href="#">Chính sách bảo mật</a>
          <a href="#">Tin điện ảnh</a>
          <a href="#">Hỏi và đáp</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;