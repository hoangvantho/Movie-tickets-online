'use client'; // Ensures that this component is client-side only
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEdit } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { QRCode } from "react-qr-code";
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faClipboard, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/navigation"; // Use the 'next/navigation' package

const Profile = () => {
  const [accountInfo, setAccountInfo] = useState({});
  const [invoices, setInvoices] = useState([]);
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [message, setMessage] = useState("");
  const [isClient, setIsClient] = useState(false); // Client-side check state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter(); // Initialize the router
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
    setIsClient(true); // Ensures router actions happen only after the component mounts on the client side


  }, []);

  // Toggle invoice details modal
  const toggleInvoiceDetails = (invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoiceDetails(!showInvoiceDetails);
  };

  const handleDownload = () => {
    html2canvas(document.getElementById("invoice")).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = "hoa_don.png";
      link.click();
    });
  };

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

  // Handle canceling the invoice
  const handleCancel = async () => {
    const token = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("token="));
    const tokenValue = token?.split("=")[1];

    if (selectedInvoice.TrangThai !== "Đã Thanh Toán") {
      setMessage("Chỉ có thể hủy các vé có trạng thái 'Đã Thanh Toán'.");
      return;
    }

    if (confirm("Bạn có chắc chắn muốn hủy hóa đơn này không?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/showtimes/huyghedadat`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${tokenValue}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              IdPhong: selectedInvoice.IdPhong,
              GioChieu: selectedInvoice.ThoiGian,
              IdPhim: selectedInvoice.IdPhim,
              SoGhe: selectedInvoice.SoGhe,
              NgayChieu: selectedInvoice.NgayChieu,
              InvoiceId: selectedInvoice.id
            }),

          }

        );

        if (!response.ok) {
          throw new Error("Hủy hóa đơn không thành công");
        }

        setMessage("Hóa đơn đã được hủy thành công!");
        setInvoices(invoices.filter(invoice => invoice.id !== selectedInvoice.id));
        setShowInvoiceDetails(false); // Close the invoice details view after cancellation
      } catch (error) {
        console.error("Error canceling invoice: ", error);
        setMessage(error.message);
      }
    }

    // Navigate to the invoice page only on the client side
    if (isClient) {
      router.push("/invoice"); // Navigate to the invoice page
    }
  };

  useEffect(() => {
    const token = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("token="));
    const tokenValue = token?.split("=")[1];

    if (tokenValue) {
      const getUserInfo = async () => {
        try {
          const response = await fetch(
            "http://localhost:3000/users/detailuser",
            {
              method: "GET",
              headers: { Authorization: `Bearer ${tokenValue}`, "Content-Type": "application/json" },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setAccountInfo(data);
            fetchInvoices(data.userId); // Fetch invoices for the user after getting user info
          } else {
            console.error("Failed to fetch user data");
            alert("Vui lòng đăng nhập lại.");
          }
        } catch (error) {
          console.error("An error occurred while fetching user data:", error);
          alert("Có lỗi xảy ra, vui lòng thử lại.");
        }
      };

      const fetchInvoices = async (userId) => {
        try {
          const response = await fetch(
            `http://localhost:3000/checkout?userId=${userId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${tokenValue}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setInvoices(data);
          } else {
            console.error("Failed to fetch invoices");
          }
        } catch (error) {
          console.error("An error occurred while fetching invoices:", error);
        }
      };

      getUserInfo();
    }
  }, []);

  return (
    <section className="flex flex-col justify-center items-center w-full px-4">
      <div className="w-full max-w-[1410px]">
        <div className="relative h-[300px] bg-cover bg-center border-3 border-white mb-4" style={{ backgroundImage: "url('../images/background.png')" }}></div>
        <div className="relative -mt-20 flex flex-col md:flex-row">
          <div className="flex flex-col items-center w-full md:w-1/4">
            <img src={`http://localhost:3000/images/${accountInfo.Anh}`} alt="Profile" className="rounded-full w-36 h-36 border-5 border-white object-cover" />
            <div className="flex justify-center mt-1"><h2 className="text-3xl text-center font-semibold text-white">{accountInfo.Ten}</h2></div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-5 mb-8 gap-4">
          <div className="w-full md:w-1/4 p-6 bg-[rgba(0,0,0,0.6)] text-white h-[300px]">
            <nav className="space-y-4">
              <Link href="/profile" className="flex items-center text-lg text-white no-underline"><FontAwesomeIcon icon={faUser} className="mr-2 w-4" /> Thông tin khách hàng</Link>
              <Link href="/comment" className="flex items-center text-lg text-white no-underline"><FontAwesomeIcon icon={faEdit} className="mr-2 w-4" /> Lịch sử bình luận</Link>
              <Link href="/invoice" className="flex items-center text-lg text-white no-underline"><FontAwesomeIcon icon={faEdit} className="mr-2 w-4" /> Lịch sử mua hàng</Link>
            </nav>
          </div>

          <div className="w-full md:w-3/4">
            <h2 className="text-2xl mb-2 text-white font-semibold">LỊCH SỬ HÓA ĐƠN </h2>
            <table className="w-full border-collapse bg-gray-800 text-white">
              <thead>
                <tr>
                  <th className="bg-[#F5CF49] text-[#000000] px-2 py-2">Tên phim </th>
                  <th className="bg-[#F5CF49] text-[#000000] px-2 py-2">Ngày mua </th>
                  <th className="bg-[#F5CF49] text-[#000000] px-2 py-2">Chi tiết </th>
                </tr>
              </thead>
              <tbody>
                {invoices.length > 0 ? (
                  invoices.map((invoice) => (
                    <tr className="bg-[rgba(0,0,0,0.6)] border-b-2 border-gray-800" key={invoice._id}>
                      <td className="text-center px-2 py-2">{invoice.TenPhim}</td>
                      <td className="text-center px-2 py-2">{new Date(invoice.NgayMua).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })}</td>
                      <td className="text-center px-2 py-2">
                        <button onClick={() => toggleInvoiceDetails(invoice)} className="w-[117px] h-[35px] bg-[#F5CF49] text-[#000000] rounded hover:bg-[#2C2C2C] hover:text-[#ffffff] hover:border-2 hover:border-[#F5CF49] hover:border-solid">
                          Chi tiết
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3" className="text-center px-2 py-2">Không có hóa đơn nào.</td></tr>
                )}
              </tbody>
            </table>

            {showInvoiceDetails && selectedInvoice && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
                        <tr className="border-t hover:bg-gray-100">
                          <td className="py-2 px-4">Mã hóa đơn</td>
                          <td className="py-2 px-4">{selectedInvoice._id}</td>
                        </tr>
                        <tr className="border-t hover:bg-gray-100">
                          <td className="py-2 px-4">Tên Khách Hàng</td>
                          <td className="py-2 px-4">{selectedInvoice.TenKhachHang}</td>
                        </tr>
                        <tr className="border-t hover:bg-gray-100">
                          <td className="py-2 px-4">Email</td>
                          <td className="py-2 px-4">{selectedInvoice.Email}</td>
                        </tr>
                        <tr className="border-t hover:bg-gray-100">
                          <td className="py-2 px-4">Tên Phim</td>
                          <td className="py-2 px-4">{selectedInvoice.TenPhim}</td>
                        </tr>
                        <tr className="border-t hover:bg-gray-100">
                          <td className="py-2 px-4">Ngày Mua</td>
                          <td className="py-2 px-4">{formatDate(selectedInvoice.NgayMua)}</td>
                        </tr>
                        <tr className="border-t hover:bg-gray-100">
                          <td className="py-2 px-4">Phương Thức Thanh Toán</td>
                          <td className="py-2 px-4">{selectedInvoice.PhuongThucThanhToan}</td>
                        </tr>
                        <tr className="border-t hover:bg-gray-100">
                          <td className="py-2 px-4">Rạp</td>
                          <td className="py-2 px-4">{selectedInvoice.Rap}</td>
                        </tr>
                        <tr className="border-t hover:bg-gray-100">
                          <td className="py-2 px-4">Thời gian chiếu</td>
                          <td className="py-2 px-4">{selectedInvoice.ThoiGian} - {selectedInvoice.NgayChieu}</td>
                        </tr>
                        <tr className="border-t hover:bg-gray-100">
                          <td className="py-2 px-4">Phòng Chiếu & Số Ghế</td>
                          <td className="py-2 px-4">{selectedInvoice.PhongChieu} {selectedInvoice.SoGhe.join(", ")}</td>
                        </tr>
                        <tr className="border-t hover:bg-gray-100">
                          <td className="py-2 px-4">Tổng Tiền</td>
                          <td className="py-2 px-4">{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", }).format(selectedInvoice.TongTien)}</td>
                        </tr>
                        <tr className="border-t hover:bg-gray-100">
                          <td className="py-2 px-4">Combo</td>
                          <td className="py-2 px-4">{selectedInvoice.Combo ? selectedInvoice.Combo : "Không có"}</td>
                        </tr>
                        <tr className="border-t hover:bg-gray-100">
                          <td className="py-2 px-4">Trạng Thái</td>
                          <td className="py-2 px-4">{selectedInvoice.TrangThai}</td>
                        </tr>
                        <tr className="border-t hover:bg-gray-100">
                          <td className="py-2 px-4">Ngày Tạo</td>
                          <td className="py-2 px-4">{formatDate(selectedInvoice.createdAt)}</td>
                        </tr>

                      </tbody>
                    </table>
                    <div className="mt-4 flex justify-center">
                      <QRCode value={`https://s9391bnm-3001.asse.devtunnels.ms/invoice-details/${selectedInvoice.id}`} size={128} />
                    </div>
                  </div>

                  {message && <div className="mt-2 text-green-500">{message}</div>}

                  <div className="flex justify-center space-x-4 mt-6">
                    <button className="text-black bg-gray-50 shadow-md rounded-lg p-3 font-bold w-[200px]" onClick={handleDownload}>Tải Xuống</button>
                    <button className="text-black bg-gray-50 shadow-md rounded-lg p-3 font-bold w-[200px]" onClick={() => setIsModalOpen(true)}>Chia Sẻ</button>
                    {selectedInvoice.TrangThai === "Đã Thanh Toán" && (
                      <button onClick={handleCancel} className="w-[200px] bg-[#dc3545] font-bold text-white rounded hover:bg-white hover:text-red-500 transition-colors">
                        Hủy đơn
                      </button>
                    )}
                    {selectedInvoice.TrangThai === "Đã Hủy" && (
                      <button
                        disabled
                        className="w-[200px] bg-gray-400 font-bold text-white rounded cursor-not-allowed">
                        Đã Hủy
                      </button>
                    )}
                    <button onClick={() => toggleInvoiceDetails(null)} className="w-[200px] bg-[#dc3545] font-bold text-white rounded hover:bg-white hover:text-red-500 transition-colors">Đóng lại</button>
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
              </div>
            )}

            {message && <div className="mt-4 text-red-500">{message}</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
