'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import axios from 'axios';
import https from 'https';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

const CheckoutPage = () => {
  const router = useRouter();
  const [buttonColor1, setButtonColor1] = useState('#F5CF49');
  const [buttonColor2, setButtonColor2] = useState('#F5CF49');
  const [bookingInfo, setBookingInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [discountCode, setDiscountCode] = useState(''); // State for discount code
  const [discountApplied, setDiscountApplied] = useState(false); // Check if discount is applied
  const [discountAmount, setDiscountAmount] = useState(0);
  const [remainingTime, setRemainingTime] = useState(300); // 5 minutes
  const [error, setError] = useState(''); // State for error message
  const [bankCode, setBankCode] = useState("VNBANK");
  const [language, setLanguage] = useState("vn");
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState("bank");
  const [paymentUrl, setPaymentUrl] = useState("");

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  const axiosClient = axios.create({
    baseURL: 'http://localhost:3000/order',
    httpsAgent: agent,
  });

  axiosClient.interceptors.request.use((config) => {
    config.headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Max-Age": "1800",
      "Access-Control-Allow-Headers": "content-type",
      "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH, OPTIONS",
      ...config.headers,
    };
    return config;
  });

  axiosClient.interceptors.response.use(
    (response) => {
      if (response.status === 200 && response.data) {
        return response.data;
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const paymentData = Cookies.get("paymentInfo");
    if (paymentData) {
      setPaymentInfo(JSON.parse(paymentData));
    }
    const data = Cookies.get("bookingInfo");
    if (data) {
      const info = JSON.parse(data);
      setBookingInfo(info);

      const tokenValue = Cookies.get("token");
      if (tokenValue) {
        fetchUserDetails(tokenValue);
      } else {
        alert("Vui lòng đăng nhập lại.");
      }
      const currentTime = new Date().getTime();
      const holdTimeInSeconds = 300; // 5 minutes
      const expirationTime = currentTime + holdTimeInSeconds * 1000;

      Cookies.set("holdExpiration", expirationTime);

      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = expirationTime - now;

        if (distance < 0) {
          clearInterval(interval);
          setRemainingTime(0);
          Cookies.remove("holdExpiration");
        } else {
          setRemainingTime(Math.floor(distance / 1000));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  const fetchUserDetails = async (tokenValue) => {
    try {
      const response = await fetch("http://localhost:3000/users/detailuser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenValue}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data1 = await response.json();
        setUserInfo(data1);
      } else {
        console.error("Failed to fetch user data", response.status, response.statusText);
        alert("Vui lòng đăng nhập lại.");
      }
    } catch (error) {
      console.error("An error occurred while fetching user data:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const handlePayment = async () => {
    // Check if a payment method has been selected
    const tokenValue = Cookies.get("token");
    if (!bankCode) {
      setError('Bạn phải chọn phương thức thanh toán.'); // Set error message if not selected
      return;
    }
    setError(''); // Clear error message if a payment method is selected
    


    const paymentData = {
      NgayMua: new Date().toISOString(),
      orderId: Date.now(),
      Rap: "Ticket Quận 12",
      userId: userInfo ? userInfo.userId : 'Chưa có thông tin',
      PhuongThucThanhToan: bankCode,
      TenPhim: bookingInfo ? bookingInfo.movieName : "Chưa có thông tin",
      ThoiGian: bookingInfo ? bookingInfo.showtimeTime : "Chưa có thông tin",
      NgayChieu: bookingInfo ? bookingInfo.showtimeDate : "Chưa có thông tin",
      SoGhe: bookingInfo ? bookingInfo.selectedSeats.join(", ") : "chưa có thống tin",
      PhongChieu: bookingInfo ? bookingInfo.room : "Chưa có thông tin",
      GiaVe: bookingInfo ? bookingInfo.ticketTypes.map(ticket => ticket.price).reduce((a, b) => a + b, 0) : 0,
      TongTien: bookingInfo ? bookingInfo.totalAmount - discountAmount : 0,
      TenKhachHang: userInfo ? userInfo.Ten : "Chưa có thông tin",
      Email: userInfo ? userInfo.Email : "Chưa có thông tin",
      Combo: bookingInfo
        ? bookingInfo.combos.map(combo => `${combo.name} (${combo.quantity})`).join(", ")
        : "null",
      IdPhong: bookingInfo ? bookingInfo.IdPhong : "null",
      IdPhim: bookingInfo ? bookingInfo.IdPhim : "null",
    };

    try {
      // Giả sử bạn sẽ gửi thông tin thanh toán đến server
      const response = await fetch('http://localhost:3000/order/create_payment_url', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create invoice');
        return;
      }
      

      const result = await response.json();
      console.log('Invoice created:', result);

      // Lưu thông tin thanh toán vào token hoặc cookies với thời hạn 1 ngày
      Cookies.set('paymentInfo', JSON.stringify(paymentData), { expires: 1 });


    } catch (error) {
      console.error('Payment error:', error);
      setError('Đã xảy ra lỗi khi thanh toán.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Đảm bảo thông tin thanh toán hợp lệ
    if (!paymentInfo || !paymentInfo.TongTien || !paymentInfo.orderId) {
      alert("Thông tin thanh toán không đầy đủ.");
      return;
    }

    const amount = paymentInfo.TongTien;
    const orderId = paymentInfo.orderId;

    if (selectedPaymentType === "bank") {
      try {
        const response = await axiosClient.post("/create_payment_url", {
          amount: amount,
          orderId: orderId,
          bankCode: bankCode,
          language: language,
        });

        console.log("Response from API:", response); // Kiểm tra response trả về

        // Kiểm tra nếu response là một chuỗi URL
        if (typeof response === 'string' && response.startsWith("http")) {
          setPaymentUrl(response);  // Lưu URL thanh toán vào state
          router.push(response);    // Chuyển hướng đến trang thanh toán
        } else {
          console.warn("paymentUrl không hợp lệ hoặc không có.");
          alert("Lỗi khi tạo liên kết thanh toán");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Đã xảy ra lỗi khi thanh toán.");
      }
    }
  };

  const handlePaymentAndSubmit = (event) => {
    event.preventDefault();

    handlePayment();  // Call payment logic
    handleSubmit(event);  // Call form submission logic
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const applyDiscountCode = async () => {
    if (discountApplied) {
      setError('Bạn chỉ có thể áp dụng một mã giảm giá.');
      return;
    }

    try {
      // Gửi yêu cầu tới API để kiểm tra mã giảm giá
      const response = await fetch(`http://localhost:3000/event/discount/${discountCode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Mã giảm giá không hợp lệ.');
      }

      const data = await response.json();

      // Kiểm tra nếu dữ liệu trả về có mã giảm giá và tỷ lệ giảm
      if (data && data.MaGiamGia && data.discountPercent) {
        const discountPercent = data.discountPercent;
        setDiscountAmount(bookingInfo.totalAmount * (discountPercent / 100)); // Tính tiền giảm
        setDiscountApplied(true);
        setError('');
      } else {
        setError('Mã giảm giá không hợp lệ.');
      }
    } catch (error) {
      console.error('Error fetching discount:', error);
      setError('Mã giảm giá không hợp lệ.');
    }
  };

  return (
    <section className="text-white bg-[rgba(0,0,0,0.3)]">
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold">TRANG THANH TOÁN</h1>
        <hr className="border-gray-600 mb-4" />
        {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error message if exists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1410px] mx-auto">
          <div>
            <div className="mb-4">
              <div className="flex justify-between p-4 bg-[rgba(0,0,0,0.6)]">
                <div>
                  <p className="font-bold">Tên khách hàng</p>
                  <p>{userInfo ? userInfo.Ten : "Tạm chưa có thông tin"}</p> {/* Display user name */}
                </div>
                <div>
                  <p className="font-bold">Số điện thoại</p>
                  <p>{userInfo ? userInfo.SDT : "Tạm chưa có thông tin"}</p> {/* Display user phone */}
                </div>
                <div>
                  <p className="font-bold">Email</p>
                  <p>{userInfo ? userInfo.Email : "Tạm chưa có thông tin"}</p> {/* Display user email */}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {/* Payment Method Selection */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold">Chọn phương thức thanh toán</span>
                  {error && <span className="text-red-500 text-sm">{error}</span>} {/* Display error message if exists */}
                </div>
                <label className="w-full flex items-center p-3 bg-[#E8F0FE] text-black border border-gray-600 rounded-lg cursor-pointer mb-2">
                  <input className="mr-2" name="payment" type="radio" onChange={() => setBankCode('Momo')} />
                  <img alt="Momo logo" className="mr-2" height="24" src="https://storage.googleapis.com/a1aa/image/9wrjggel7jXQcCNtBhX99ZH3wSe0ZP3MLp2PuOTVD3jqJCnTA.jpg" width="24" />
                  <span>Thanh toán qua Momo</span>
                </label>
                <label className="w-full flex items-center p-3 bg-[#E8F0FE] text-black border border-gray-600 rounded-lg cursor-pointer mb-2">
                  <input className="mr-2" type="radio" name="bankCode" value="VNBANK" checked={selectedPaymentType === "bank" && bankCode === "VNBANK"} onChange={() => { setBankCode("VNBANK"); setSelectedPaymentType("bank"); }} />
                  <img alt="Nội địa logo" className="mr-2" height="24" src="https://storage.googleapis.com/a1aa/image/BMhFtv7NofUuDyLI2zUYcccGbHCsByXh6jcSNVwWljV0EhzJA.jpg" width="24" />
                  <span>Thanh toán qua Thẻ nội địa</span>
                </label>
                <label className="w-full flex items-center p-3 bg-[#E8F0FE] text-black border border-gray-600 rounded-lg cursor-pointer mb-2">
                  <input className="mr-2" name="payment" type="radio" onChange={() => setBankCode('internationalCard')} />
                  <img alt="Quốc tế logo" className="mr-2" height="24" src="https://storage.googleapis.com/a1aa/image/eSRLxk1FwCQlGS1yllkaauZIYG6KHdVRgAowAyn6rtn1EhzJA.jpg" width="24" />
                  <span>Thanh toán qua thẻ quốc tế</span>
                </label>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <i className="fas fa-tag text-[#F5CF49] mr-2"></i>
                <span className="font-bold">Chọn hoặc nhập mã giảm giá</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  className="w-full p-2 bg-[#E8F0FE] border border-gray-600 rounded text-black"
                  placeholder="Nhập mã giảm giá"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  type="text"
                />
                <button
                  className="p-2 bg-[#F5CF49] text-black rounded"
                  onClick={applyDiscountCode}
                >
                  <FontAwesomeIcon icon={faTag} className="" />
                </button>
              </div>

              {discountApplied && (
                <div className="text-green-500 mt-2">
                  Đã áp dụng mã giảm giá. Số tiền được giảm: {discountAmount.toLocaleString()} VND
                </div>
              )}
            </div>
            <div className="flex justify-start mt-4 space-x-4">
              <button className="py-2 font-semibold rounded w-[150px]" style={{ backgroundColor: buttonColor1, color: 'black' }} onMouseOver={() => setButtonColor1('#FFD700')} onMouseOut={() => setButtonColor1('#F5CF49')} onClick={() => window.history.back()} >  QUAY LẠI </button>
              <button className="py-2 font-semibold rounded w-[150px]" style={{ backgroundColor: buttonColor2, color: 'black' }} onMouseOver={() => setButtonColor2('#FFD700')} onMouseOut={() => setButtonColor2('#F5CF49')} onClick={handlePaymentAndSubmit}>THANH TOÁN</button>
            </div>
          </div>
          <div>
            <div className="bg-[rgba(0,0,0,0.6)] p-4 ">
              <h2 className="font-bold text-lg">{bookingInfo ? bookingInfo.movieName : "Không có tên phim"}</h2>
              <div className="flex justify-between items-center">
                <span className="text-[#F5CF49]">Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)</span>
                <span className="bg-[#F5CF49] text-[14px] text-black px-2 py-1 rounded">THỜI GIAN GIỮ VÉ: {formatTime(remainingTime)}</span>
              </div>
              <p className="mt-2">Ticket Quận 12</p>
              <p className="text-gray-400">271 Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, Thành Phố Hồ Chí Minh</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="font-bold">THỜI GIAN</p>
                  <p>{bookingInfo ? bookingInfo.showtimeTime : "Tạm chưa có thống tin"}</p>
                </div>
                <div>
                  <p className="font-bold">NGÀY CHIẾU</p>
                  <p>{bookingInfo ? bookingInfo.showtimeDate : "Tạm chưa có thống tin"}</p>
                </div>
                <div>
                  <p className="font-bold">PHÒNG</p>
                  <p>{bookingInfo ? bookingInfo.room : "Tạm chưa có thống tin"}</p>
                </div>
                <div>
                  <p className="font-bold">SỐ VÉ</p>
                  <p>{bookingInfo ? bookingInfo.selectedSeats.length : "Tạm chưa có thống tin"}</p>
                </div>
                <div>
                  <p className="font-bold">LOẠI VÉ</p>
                  <p>{bookingInfo ? bookingInfo.ticketTypes.map(ticket => `${ticket.name}`).join(", ") : "Tạm chưa có thống tin"}</p>
                </div>
                <div>
                  <p className="font-bold">SỐ GHẾ</p>
                  <p>{bookingInfo ? bookingInfo.selectedSeats.join(", ") : "Tạm chưa có thống tin"}</p>
                </div>
                <div>
                  <p className='font-bold'>Combo</p>
                  <p>
                    {bookingInfo && bookingInfo.combos && bookingInfo.combos.length > 0
                      ? bookingInfo.combos.map(ticket => ticket.name).join(", ")
                      : "Tạm chưa có thông tin"}
                  </p>
                </div>
                <div>
                  <p className='font-bold'>Số Lượng Combo</p>
                  <p>
                    {bookingInfo && bookingInfo.combos && bookingInfo.combos.length > 0
                      ? bookingInfo.combos.map(ticket => ticket.quantity).join(", ")
                      : "Tạm chưa có thông tin"}
                  </p>
                </div>
              </div>
              <hr className="border-gray-600 my-4" />
              <div className="flex justify-between items-center">
                <span className="font-bold">SỐ TIỀN CẦN THANH TOÁN</span>
                <p>Tổng cộng: <span className="text-[#F5CF49]">{(bookingInfo ? bookingInfo.totalAmount - discountAmount : 0).toLocaleString()} VND</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
