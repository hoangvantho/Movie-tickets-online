"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

const Register = () => {
  const [step, setStep] = useState(1); // Steps: 1 - Enter Email, 2 - Verify Code, 3 - Register
  const [Email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    Ten: "",
    SDT: "",
    NgaySinh: "",
    DiaChi: "",
    Email: "",
    GioiTinh: "",
    MatKhau: "",
    TenDangNhap: "",
    confirmPassword: "",
    Anh: null,
  });

  useEffect(() => {
    let interval;
    if (step === 2) { // Start the timer when step 2 is reached
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            clearInterval(interval);
            alert("Mã xác nhận hết thời gian. Vui lòng tải lại trang.");
            window.location.reload(); // Reload the page when the timer expires
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000); // Update every second
    }

    return () => {
      clearInterval(interval); // Clean up interval on step change
    };
  }, [step]); // Only run the effect when the step changes
  const handleChange = (e, index) => {
    const { value } = e.target;

    // Kiểm tra giá trị nhập vào, chỉ cho phép số từ 0-9
    if (/^\d?$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Tự động chuyển sang ô tiếp theo nếu người dùng nhập một số
      if (value && index < verificationCode.length - 1) {
        document.getElementById(`verificationCode${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newCode = [...verificationCode];

      // Nếu ô hiện tại rỗng, chuyển về ô trước đó và xóa ký tự
      if (verificationCode[index] === "" && index > 0) {
        document.getElementById(`verificationCode${index - 1}`).focus();
        newCode[index - 1] = "";
      } else {
        newCode[index] = "";
      }

      setVerificationCode(newCode);
    }

    // Điều hướng qua các ô bằng phím mũi tên
    if (e.key === "ArrowLeft" && index > 0) {
      document.getElementById(`verificationCode${index - 1}`).focus();
    }

    if (e.key === "ArrowRight" && index < verificationCode.length - 1) {
      document.getElementById(`verificationCode${index + 1}`).focus();
    }
  };




  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/users/users/send-code",  // Correct URL
        { Email: Email }
      );

      if (response.data.success) {
        alert("Mã xác nhận đã được gửi đến email của bạn!");
        setStep(2);
      } else {
        setErrorMessage("Gửi mã thất bại!");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Email đã tồn tại xin nhập Email khác! ");
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();

    const fullCode = verificationCode.join('');
    if (!Email || !fullCode) {
      alert("Email và mã xác nhận là bắt buộc!");
      return;
    }

    setIsVerifying(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/users/users/verify-code", // URL for verifying code
        { Email, verificationCode: fullCode },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.success) {
        setErrorMessage("Xác nhập thành công  ");
        setStep(3);
        setFormData({ ...formData, Email }); // Update formData with the verified email
        localStorage.setItem("verifiedEmail", Email); // Store email after successful verification
      } else {
        setErrorMessage("Sai mã xác nhận mời nhập lại ");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Sai mã xác nhận mời nhập lại ");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    // Validate all required fields
    if (!formData.Ten || !formData.SDT || !formData.NgaySinh || !formData.DiaChi || !formData.TenDangNhap) {
      alert("Tất cả các trường là bắt buộc!");
      return;
    }

    // Check password match and terms agreement
    if (formData.MatKhau !== formData.confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }

    if (!agreeTerms) {
      alert("Bạn cần đồng ý với điều khoản của website.");
      return;
    }

    // Password validation logic
    if (formData.MatKhau.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/;
    if (!passwordRegex.test(formData.MatKhau)) {
      alert("Mật khẩu phải chứa ít nhất một số, một chữ hoa và một ký tự đặc biệt.");
      return;
    }

    try {
      setIsSubmitting(true); // Set loading state
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await axios.post(
        "http://localhost:3000/users/register",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response) {
        alert("Bạn đã đăng ký thành công!"); window.location.href = "http://localhost:3001/login";
      } else {
        alert(response.data.message || "Đăng ký thất bại!");
      }
    } catch (error) {
      alert("Có lỗi xảy ra khi đăng ký tài khoản.");
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };


  const handleFileChange = (e) => {
    setFormData({ ...formData, Anh: e.target.files[0] });
  };

  return (
    <div className="flex justify-center items-center bg-cover bg-center py-4 w-full h-full bg-[url('../../public/images/10.jpg')]">
      <form
        className="flex flex-col justify-center items-center p-6 sm:p-8 md:p-10 rounded-lg text-white w-[90%] sm:w-[85%] md:w-[750px] lg:w-[900px] h-auto" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        onSubmit={
          step === 1
            ? handleEmailSubmit
            : step === 2
              ? handleVerificationSubmit
              : handleRegistrationSubmit
        }
      >
        {step === 1 && (
          <>
            <h1 className="text-xl font-semibold mb-4 text-center">Nhập Email</h1>
            {errorMessage && (
              <div className="text-red-500 text-center mb-4">{errorMessage}</div>
            )}
            <label htmlFor="Email" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]" > Email <span className="text-red">*</span></label>
            <input
              type="Email"
              id="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#E8F0FE] text-black"
            />
            <button
              type="submit"
              className="w-full md:w-[520px] h-[40px] sm:h-[45px] bg-black border border-[#F5CF49] rounded-[10px] text-sm sm:text-lg font-bold cursor-pointer text-white hover:bg-[#F5CF49] hover:text-black transition-colors"
            >
              Gửi mã xác nhận
            </button>


          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-xl font-semibold mb-4">Xác nhận mã</h1>
            <div className="text-red-500 text-center mb-4">{errorMessage}</div>

            <div className="flex justify-center space-x-2 mb-4">
              {verificationCode.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  id={`verificationCode${index}`}
                  value={value}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  maxLength="1"
                  inputMode="numeric" // Gợi ý bàn phím số trên các thiết bị di động
                  pattern="[0-9]*" // Chỉ cho phép số
                  className="p-2 border rounded text-black w-12 text-center"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {/* Display the countdown timer */}
            <div className="text-center mb-4">
              <p className="text-red-500">
                Thời gian còn lại: {Math.floor(timer / 60)}:
                {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
              </p>
            </div>

            <button
              type="submit"
              className="w-full md:w-[520px] h-[40px] sm:h-[45px] bg-black border border-[#F5CF49] rounded-[10px] text-sm sm:text-lg font-bold cursor-pointer text-white hover:bg-[#F5CF49] hover:text-black transition-colors"
              disabled={isVerifying}
            >
              {isVerifying ? "Đang xác thực..." : "Xác thực"}
            </button>
          </>

        )}

        {step === 3 && (
          <>
            <h1 className="text-xl font-semibold mb-4 text-center">Đăng ký tài khoản</h1>

            <label htmlFor="Ten" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">
              Họ và tên <span className="text-red">*</span>
            </label>
            <input
              type="text"
              id="Ten"
              value={formData.Ten}
              onChange={(e) => setFormData({ ...formData, Ten: e.target.value })}
              required
              className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#E8F0FE] text-black"
            />

            <label htmlFor="Anh" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">
              Chọn hình ảnh đại diện <span className="text-red">*</span>
            </label>
            <input
              type="file"
              id="Anh"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#E8F0FE] text-black"
            />

            <label htmlFor="Email" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">
              Email <span className="text-red">*</span>
            </label>
            <input
              type="email"
              id="Email"
              value={Email}
              className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#E8F0FE] text-black"
              readOnly
            />

            <label htmlFor="SDT" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">
              Số điện thoại <span className="text-red">*</span>
            </label>
            <input
              type="text"
              id="SDT"
              value={formData.SDT}
              onChange={(e) => setFormData({ ...formData, SDT: e.target.value })}
              required
              className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#E8F0FE] text-black"
            />

            <label htmlFor="TenDangNhap" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">
              Tên đăng nhập <span className="text-red">*</span>
            </label>
            <input
              type="text"
              id="TenDangNhap"
              value={formData.TenDangNhap}
              onChange={(e) => setFormData({ ...formData, TenDangNhap: e.target.value })}
              required
              className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#E8F0FE] text-black"
            />

            <label htmlFor="NgaySinh" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">
              Ngày sinh <span className="text-red">*</span>
            </label>
            <input
              type="date"
              id="NgaySinh"
              value={formData.NgaySinh}
              onChange={(e) => setFormData({ ...formData, NgaySinh: e.target.value })}
              required
              className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#E8F0FE] text-black"
            />

            <label htmlFor="DiaChi" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">
              Địa chỉ <span className="text-red">*</span>
            </label>
            <input
              type="text"
              id="DiaChi"
              value={formData.DiaChi}
              onChange={(e) => setFormData({ ...formData, DiaChi: e.target.value })}
              required
              className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#E8F0FE] text-black"
            />

            <label htmlFor="GioiTinh" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">
              Giới tính <span className="text-red">*</span>
            </label>
            <select
              id="GioiTinh"
              value={formData.GioiTinh}
              onChange={(e) => setFormData({ ...formData, GioiTinh: e.target.value })}
              required
              className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#E8F0FE] text-black"
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>

            <label htmlFor="MatKhau" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px] relative">
              Mật khẩu
            </label>
            <div className="relative w-full md:w-[520px]">
              <input
                type={showPassword ? "text" : "password"}
                id="MatKhau"
                value={formData.MatKhau}
                onChange={(e) => setFormData({ ...formData, MatKhau: e.target.value })}
                required
                className="w-full h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#E8F0FE] text-black pr-10"
              />
              <span
                className="absolute right-3 top-[40%] transform -translate-y-1/2 text-black cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} aria-hidden="true"></i>
              </span>
            </div>

            <label htmlFor="confirmPassword" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">
              Xác nhận mật khẩu
            </label>
            <div className="relative w-full md:w-[520px]">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#E8F0FE] text-black"
              />
              <span className="absolute right-3 top-[40%] transform -translate-y-1/2 text-black cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}><i className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`} aria-hidden="true" ></i></span>
            </div>
            <div className="flex items-center mb-4 w-full md:w-[520px]">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="agreeTerms" className="text-base sm:text-lg">
                Tôi đồng ý với{" "}
                <Link href="/terms" className="text-yellow">
                  điều khoản sử dụng
                </Link>
              </label>
            </div>

            <button type="submit" className="w-full md:w-[520px] h-[40px] sm:h-[45px] bg-black border border-[#F5CF49] rounded-[10px] text-sm sm:text-lg font-bold cursor-pointer text-white hover:bg-[#F5CF49] hover:text-black transition-colors"> Đăng ký</button>

            <div className="mt-4">
              <span className="text-sm"> Bạn đã có tài khoản?{" "} <Link href="/login" className="text-yellow"> Đăng nhập </Link> </span>
            </div>
          </>

        )}
      </form>
    </div>
  );
};

export default Register;