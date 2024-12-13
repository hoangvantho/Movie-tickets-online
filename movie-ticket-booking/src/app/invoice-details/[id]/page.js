"use client";
import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { QRCode } from "react-qr-code";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faClipboard, faXmark } from '@fortawesome/free-solid-svg-icons';


const ChiTietHoaDon = () => {
  const { id } = useParams();
  const router = useRouter();

  const [hoaDon, setHoaDon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hàm để định dạng ngày
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      weekday: "long", // Thứ trong tuần
      year: "numeric", // Năm
      month: "long", // Tháng
      day: "numeric", // Ngày
    });
  };
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await fetch(`http://localhost:3000/checkout/${id}`);
        if (!res.ok) throw new Error("Không thể tải hóa đơn.");
        const data = await res.json();
        setHoaDon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);

  const handleShare = (method) => {
    const url = `https://s9391bnm-3001.asse.devtunnels.ms/invoice-details/${id}`;
    const socialUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `Mời bạn xem chi tiết hóa đơn của tôi: ${url}`
      )}`,
    };
    if (method === "copy") {
      navigator.clipboard.writeText(url).then(() => alert("Đã sao chép liên kết!"));
    } else {
      window.open(socialUrls[method], "_blank", "width=600,height=400");
    }
    setIsModalOpen(false);
  };

  const handleDownload = () => {
    html2canvas(document.getElementById("invoice")).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = "hoa_don.png";
      link.click();
    });
  };

  const handleCancel = async () => {
    // Kiểm tra trạng thái hóa đơn trước khi hủy
    if (hoaDon.TrangThai !== "Đã Thanh Toán") {
      setMessage("Chỉ có thể hủy các hóa đơn có trạng thái 'Đã Thanh Toán'.");
      return;
    }

    if (confirm("Bạn có chắc chắn muốn hủy hóa đơn này không?")) {
      try {
        const token = document.cookie
          .split(";")
          .find((c) => c.trim().startsWith("token="));
        const tokenValue = token?.split("=")[1];

        const res = await fetch(`http://localhost:3000/showtimes/huyghedadat`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokenValue}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            IdPhong: hoaDon.IdPhong,  // Thay thế bằng thuộc tính tương ứng trong hoaDon
            GioChieu: hoaDon.ThoiGian,   // Thay thế bằng thuộc tính tương ứng trong hoaDon
            IdPhim: hoaDon.IdPhim,  // Thay thế bằng thuộc tính tương ứng trong hoaDon
            SoGhe: hoaDon.SoGhe, // Thay thế bằng thuộc tính tương ứng trong hoaDon
            NgayChieu: hoaDon.NgayChieu, // Thay thế bằng thuộc tính tương ứng trong hoaDon
            InvoiceId: hoaDon.id
          }),
        });

        if (!res.ok) throw new Error("Hủy hóa đơn không thành công");

        setMessage("Hóa đơn đã được hủy thành công!");
        setHoaDon(null); // Cập nhật trạng thái hóa đơn
      } catch (err) {
        setMessage(err.message);
      }
      router.push("/"); // Chuyển hướng về trang chủ
    }
  };

  if (loading) return <div className="text-gray-800">Đang tải...</div>;
  if (error) return <div className="text-red-500">{`Lỗi: ${error}`}</div>;
  if (!hoaDon) return <div className="text-gray-800">Không tìm thấy hóa đơn.</div>;

  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-700 text-center mb-4">CHI TIẾT HÓA ĐƠN</h2>
      <div id="invoice" className="bg-white shadow-md rounded-lg p-6">
        <table className="w-full bg-gray-50">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th className="py-2 px-4 text-left">Thông tin</th>
              <th className="py-2 px-4 text-left">Chi tiết</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 font-semibold">
            {/* Render các thông tin cần thiết */}
            <tr className="border-t hover:bg-gray-100">
              <td className="py-2 px-4">Mã hóa đơn</td>
              <td className="py-2 px-4">{hoaDon._id}</td>
            </tr>
            <tr className="border-t hover:bg-gray-100">
              <td className="py-2 px-4">Tên Khách Hàng</td>
              <td className="py-2 px-4">{hoaDon.TenKhachHang}</td>
            </tr>
            <tr className="border-t hover:bg-gray-100">
              <td className="py-2 px-4">Email</td>
              <td className="py-2 px-4">{hoaDon.Email}</td>
            </tr>
            <tr className="border-t hover:bg-gray-100">
              <td className="py-2 px-4">Tên Phim</td>
              <td className="py-2 px-4">{hoaDon.TenPhim}</td>
            </tr>
            <tr className="border-t hover:bg-gray-100">
              <td className="py-2 px-4">Ngày Mua</td>
              <td className="py-2 px-4">{formatDate(hoaDon.NgayMua)}</td>
            </tr>
            <tr className="border-t hover:bg-gray-100">
              <td className="py-2 px-4">Phương Thức Thanh Toán</td>
              <td className="py-2 px-4">{hoaDon.PhuongThucThanhToan}</td>
            </tr>
            <tr className="border-t hover:bg-gray-100">
              <td className="py-2 px-4">Rạp</td>
              <td className="py-2 px-4">{hoaDon.Rap}</td>
            </tr>
            <tr className="border-t hover:bg-gray-100">
              <td className="py-2 px-4">Thời gian chiếu</td>
              <td className="py-2 px-4">{hoaDon.ThoiGian} - {hoaDon.NgayChieu}</td>
            </tr>
            <tr className="border-t hover:bg-gray-100">
              <td className="py-2 px-4">Phòng Chiếu & Số Ghế</td>
              <td className="py-2 px-4">{hoaDon.PhongChieu} | {hoaDon.SoGhe.join(", ")}</td>
            </tr>
            <tr className="border-t hover:bg-gray-100">
              <td className="py-2 px-4">Tổng Tiền</td>
              <td className="py-2 px-4">{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", }).format(hoaDon.TongTien)}</td>
            </tr>
            <tr className="border-t hover:bg-gray-100">
              <td className="py-2 px-4">Combo</td>
              <td className="py-2 px-4">{hoaDon.Combo ? hoaDon.Combo : "Không có"}</td>
            </tr>
            <tr className="border-t hover:bg-gray-100">
              <td className="py-2 px-4">Trạng Thái</td>
              <td className="py-2 px-4">{hoaDon.TrangThai}</td>
            </tr>
            <tr className="border-t hover:bg-gray-100">
              <td className="py-2 px-4">Ngày Tạo</td>
              <td className="py-2 px-4">{formatDate(hoaDon.createdAt)}</td>
            </tr>

          </tbody>
        </table>
        <div className="mt-4 flex justify-center">
          <QRCode value={`https://s9391bnm-3001.asse.devtunnels.ms/invoice-details/${hoaDon.id}`} size={128} />
        </div>
      </div>

      {message && <div className="mt-2 text-green-500">{message}</div>}

      <div className="flex justify-center space-x-4 mt-6">
        <button className="text-black bg-gray-50 shadow-md rounded-lg p-3 font-bold w-[200px]" onClick={handleDownload}>Tải Xuống</button>
        <button className="text-black bg-gray-50 shadow-md rounded-lg p-3 font-bold w-[200px]" onClick={() => setIsModalOpen(true)}>Chia Sẻ</button>
        <button className="text-black bg-gray-50 shadow-md rounded-lg p-3 font-bold w-[200px]" onClick={handleCancel}>Hủy Đơn</button>
        <Link href="/" className="text-black bg-gray-50 shadow-md rounded-lg p-3 font-bold w-[200px]">Trang Chủ</Link>
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-black bg-white p-6 rounded-lg shadow-2xl w-[400px] h-[300px] border-2 border-white transition-transform transform ">
            <div className="font-semibold text-gray-800 mb-4 text-[18px] text-center">Chọn phương thức chia sẻ</div>
            <div className="flex flex-col items-center space-y-4">
              <button
                className="text-white bg-[#1877F2] hover:bg-[#145dbf] rounded-lg p-3 py-2 px-4 flex items-center justify-center w-full transition-all duration-300 ease-in-out"
                onClick={() => handleShare("facebook")}>
                <FontAwesomeIcon icon={faFacebook} size="lg" />
                <span className="ml-2">Facebook</span>
              </button>
              <button
                className="text-white bg-[#1DA1F2] hover:bg-[#1991c8] rounded-lg p-3 py-2 px-4 flex items-center justify-center w-full transition-all duration-300 ease-in-out"
                onClick={() => handleShare("twitter")}>
                <FontAwesomeIcon icon={faTwitter} size="lg" />
                <span className="ml-2">Twitter</span>
              </button>
              <button
                className="text-black bg-[#F5CF49] hover:bg-[#f0b741] rounded-lg p-3 py-2 px-4 flex items-center justify-center w-full transition-all duration-300 ease-in-out"
                onClick={() => handleShare("copy")}>
                <FontAwesomeIcon icon={faClipboard} size="lg" />
                <span className="ml-2">Sao chép liên kết</span>
              </button>
              <button
                className="text-white bg-[#FF4B5C] hover:bg-[#e74049] py-2 px-4 rounded-lg flex items-center justify-center w-full transition-all duration-300 ease-in-out mt-4"
                onClick={() => setIsModalOpen(false)}>
                <FontAwesomeIcon icon={faXmark} size="lg" />
                <span className="ml-2">Đóng</span>
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default ChiTietHoaDon;
