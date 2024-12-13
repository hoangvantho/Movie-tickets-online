import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#2C2C2C' }}>
      <div className="max-w-[1410px] w-full p-8 rounded-lg transition-transform transform  duration-300" style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)' }}>
        <h1 className="text-4xl font-bold text-center text-F5CF49 mb-6">
          Về <span className="text-yellow-400">Screen Time</span>
        </h1>
        <img
          src={`/images/logo.png`}
          alt="Cinema"
          className="w-full h-64 object-cover rounded-md mb-6"
        />
        <p className="text-gray-300 text-lg mb-4 transition-colors duration-300 hover:text-F5CF49">
          Chào mừng bạn đến với <span className="font-semibold text-yellow-400">Screen Time</span>,
          nền tảng bán vé xem phim trực tuyến hàng đầu! Với chúng tôi, bạn có thể dễ dàng
          tìm kiếm và đặt vé cho các bộ phim mới nhất đang chiếu tại rạp gần bạn.
        </p>
        <p className="text-gray-300 text-lg mb-4 transition-colors duration-300 hover:text-F5CF49">
          Tại Screen Time, chúng tôi cung cấp một trải nghiệm thân thiện với người dùng,
          cho phép bạn dễ dàng lựa chọn phim, thời gian chiếu và chỗ ngồi ưa thích của mình.
          Chúng tôi cam kết mang đến thông tin chính xác và cập nhật về các bộ phim,
          cùng với các ưu đãi hấp dẫn để bạn có thể thưởng thức những giây phút giải trí tuyệt vời.
        </p>
        <p className="text-gray-300 text-lg mb-4 transition-colors duration-300 hover:text-F5CF49">
          Với đội ngũ tận tâm, chúng tôi luôn nỗ lực cải thiện dịch vụ và đáp ứng nhu cầu
          của khách hàng. Hãy tham gia cùng chúng tôi trong hành trình khám phá thế giới
          điện ảnh và trải nghiệm những bộ phim đỉnh cao!
        </p>
        <p className="text-gray-300 text-lg mb-4 transition-colors duration-300 hover:text-F5CF49">
          Cảm ơn bạn đã chọn <span className="font-semibold text-yellow-400">Screen Time</span>.
          Chúng tôi hy vọng bạn sẽ có những trải nghiệm xem phim tuyệt vời!
        </p>
        <footer className="mt-6 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} <span className="font-semibold text-yellow-400">Screen Time</span>. Tất cả các quyền được bảo lưu.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default About;
