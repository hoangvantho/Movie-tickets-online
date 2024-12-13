"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [paymentInfo, setPaymentInfo] = useState({});
  const [error, setError] = useState("");
  const [hasSavedInvoice, setHasSavedInvoice] = useState(false);
  const orderId = searchParams.get("vnp_OrderInfo");
  const amount = searchParams.get("vnp_Amount");
  const message = searchParams.get("message");
  const code = searchParams.get("code");
  const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");  // Lấy mã phản hồi

  useEffect(() => {
    // Nếu mã phản hồi là không thành công hoặc bị hủy, hiển thị lỗi
    if (vnp_ResponseCode !== "00") {
      setError("Giao dịch không thành công. Vui lòng thử lại.");
      return;
    }

    let isInvoiceSaved = false; // Biến cờ để đảm bảo chỉ gửi một lần

    const saveInvoice = async () => {
      if (isInvoiceSaved) return; // Nếu đã gửi thì dừng lại
      isInvoiceSaved = true;

      // Lấy thông tin thanh toán từ cookie
      const tokenValue = Cookies.get("paymentInfo");
      if (!tokenValue) {
        setError("Không tìm thấy thông tin thanh toán.");
        return;
      }

      const info = JSON.parse(tokenValue);
      setPaymentInfo(info);
      console.log("Payment Info:", info);

      if (!info) {
        setError("Thông tin thanh toán không hợp lệ.");
        return;
      }

      const token = Cookies.get("token");
      if (!token) {
        setError("Không tìm thấy token xác thực.");
        return;
      }

      // Kiểm tra xem thông tin suất chiếu có đầy đủ không
      if (!info.PhongChieu || !info.ThoiGian || !info.SoGhe) {
        setError("Thông tin suất chiếu không hợp lệ.");
        return;
      }

      // Chuyển đổi ghế thành định dạng mong muốn nếu cần
      let formattedSeats = [];
      if (Array.isArray(info.SoGhe)) {
        // Nếu SoGhe là mảng, xử lý bình thường
        formattedSeats = info.SoGhe.map(ghe => ghe.replace(/^[A-Za-z]-/, "").replace(/\s+/g, ""));
      } else if (typeof info.SoGhe === "string") {
        // Nếu SoGhe là chuỗi, chuyển đổi nó thành mảng
        formattedSeats = info.SoGhe.split(",").map(ghe => ghe.replace(/^[A-Za-z]-/, "").replace(/\s+/g, ""));
      } else {
        // Nếu SoGhe không phải mảng hoặc chuỗi, báo lỗi
        setError("Dữ liệu ghế không hợp lệ.");
        return;
      }

      const invoiceData = {
        NgayMua: info.NgayMua,
        orderId: info.orderId,
        Rap: info.Rap,
        userId: info.userId,
        PhuongThucThanhToan: info.PhuongThucThanhToan,
        TenPhim: info.TenPhim,
        ThoiGian: info.ThoiGian,
        NgayChieu: info.NgayChieu,
        SoGhe: formattedSeats, // Đảm bảo sử dụng ghế đã được định dạng lại
        PhongChieu: info.PhongChieu,
        GiaVe: info.GiaVe,
        TongTien: info.TongTien,
        TenKhachHang: info.TenKhachHang,
        Email: info.Email,
        Combo: info.Combo,
        IdPhong: info.IdPhong,
        IdPhim: info.IdPhim,
      };

      console.log("Invoice Data:", invoiceData);

      try {
        const response = await fetch("http://localhost:3000/checkout/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(invoiceData),
        });

        if (!response.ok) {
          throw new Error("Không thể tạo hóa đơn.");
        }

        const result = await response.json();
        console.log("Hóa đơn đã được tạo:", result);

        // Kiểm tra nếu có ID hóa đơn để chuyển hướng
        if (result.id) {
          // Chuyển hướng sau 7 giây
          setTimeout(() => {
            router.push(`/invoice-details/${result.id}`);
          }, 5000); // 5000ms = 5 giây
          await sendEmail(info.Email, invoiceData);
        } else {
          setError("Không có ID hóa đơn để chuyển hướng.");
        }

        // Gọi API cập nhật ghế đã đặt sau khi tạo hóa đơn thành công
        const updateSeatsResponse = await fetch("http://localhost:3000/showtimes/capnhatghedadat", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            IdPhong: info.IdPhong,  // Đảm bảo IdPhong là đúng
            GioChieu: info.ThoiGian,   // Đảm bảo GioChieu là đúng
            IdPhim: info.IdPhim,  // Thêm IdPhim nếu cần
            SoGhe: formattedSeats,      // Đảm bảo SoGhe là mảng đã được xử lý
          }),
        });

        if (updateSeatsResponse.ok) {
          console.log("Cập nhật ghế đã đặt thành công.");
        } else {
          console.error("Không thể cập nhật ghế.");
        }

      } catch (error) {
        console.error("Lỗi thanh toán:", error);
        setError("Đã xảy ra lỗi khi thanh toán.");
      }
    };

    const sendEmail = async (email, invoiceData) => {
      try {
        const response = await fetch("http://localhost:3000/checkout/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            invoiceData: invoiceData,
          }),
        });

        if (!response.ok) {
          throw new Error("Không thể gửi email.");
        }

        console.log("Email đã được gửi.");
      } catch (error) {
        console.error("Lỗi gửi email:", error);
        setError("Đã xảy ra lỗi khi gửi email.");
      }
    };

    saveInvoice();
  }, [vnp_ResponseCode]); // Chạy lại khi vnp_ResponseCode thay đổi

  return (
    <div className="container mx-auto my-10 flex justify-center items-center h-[500px]">
      <div className="bg-gray-100 p-10 rounded-lg shadow-xl text-center w-full max-w-xl transition-all duration-300 hover:shadow-2xl">
        {/* Icon */}
        <div className="text-6xl mb-6">
          {error ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.293 4.293a1 1 0 011.414 0L10 7.586l3.293-3.293a1 1 0 111.414 1.414L11.414 9l3.293 3.293a1 1 0 01-1.414 1.414L10 10.414l-3.293 3.293a1 1 0 11-1.414-1.414L8.586 9 5.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8.293 13.293a1 1 0 011.414 0L12 16.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          {error ? "Thanh toán thất bại!" : "Thanh toán thành công!"}
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600">
          {error ? "Đã xảy ra lỗi khi thanh toán. Vui lòng thử lại." : "Cảm ơn bạn đã hoàn tất thanh toán. Chúc bạn có một ngày vui vẻ!"}
        </p>
      </div>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </div>
  );
};

export default PaymentSuccess;