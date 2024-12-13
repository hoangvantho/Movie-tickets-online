"use client"; // Đảm bảo sử dụng "use client" cho component client
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";

// Import các biểu tượng Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import fa-eye và fa-eye-slash

const Login = () => {
  const [showPassword, setShowPassword] = useState(false); // Trạng thái hiển thị mật khẩu
  const formik = useFormik({
    initialValues: { usernameOrEmail: "", Matkhau: "" },
    validationSchema: Yup.object({
      usernameOrEmail: Yup.string().required("Bắt buộc"),
      Matkhau: Yup.string().required("Bắt buộc"),
    }),

    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const res = await fetch("http://localhost:3000/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usernameOrEmail: values.usernameOrEmail,
            MatKhau: values.Matkhau,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Đăng nhập thất bại");
        }

        // Lưu adminToken vào cookie
        const data = await res.json();
        document.cookie = `adminToken=${data.adminToken}; path=/; max-age=${60 * 60}`; // Thời gian sống của cookie là 1 giờ

        // Giải mã adminToken để lấy thông tin người dùng và vai trò
        const adminToken = data.adminToken;
        const payload = JSON.parse(atob(adminToken.split(".")[1])); // Decode token để lấy payload

        if (payload.IsAdmin === 0) {
          window.location.href = "/"; // Chuyển đến trang admin
        } else {
          throw new Error("Vai trò không xác định");
        }
      } catch (error) {
        setFieldError("general", error.message); // Hiển thị lỗi chung
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex justify-center items-center bg-cover bg-center w-full min-h-screen bg-[url('/images/10.jpg')]">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col justify-center items-center p-6 sm:p-8 md:p-10 rounded-lg text-black w-[90%] sm:w-[85%] md:w-[750px] lg:w-[900px] h-auto"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
      >
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl mb-5">Đăng nhập</h1>

        {formik.errors.general && <p className="text-red-500 mb-3">{formik.errors.general}</p>}

        <label htmlFor="usernameOrEmail" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">
          Tên đăng nhập <span className="text-red">*</span>
        </label>
        <input
          type="text"
          id="usernameOrEmail"
          name="usernameOrEmail"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.usernameOrEmail}
          placeholder="Tên đăng nhập"
          required
          className={`w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 rounded-md text-sm sm:text-base ${formik.touched.usernameOrEmail && formik.errors.usernameOrEmail ? "border-red-500" : "border-white"} bg-[#E8F0FE] text-black`}
        />
        {formik.touched.usernameOrEmail && formik.errors.usernameOrEmail && <p className="text-red-500">{formik.errors.usernameOrEmail}</p>}

        <label htmlFor="MatKhau" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">
          Mật khẩu <span className="text-red">*</span>
        </label>
        <div className="relative w-full md:w-[520px]">
          <input
            type={showPassword ? "text" : "password"}
            id="MatKhau"
            name="Matkhau"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Matkhau}
            placeholder="Mật khẩu"
            required
            className={`w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 rounded-md text-sm sm:text-base ${formik.touched.Matkhau && formik.errors.Matkhau ? "border-red-500" : "border-white"} bg-[#E8F0FE] text-black`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)} // Toggle trạng thái mật khẩu
            className="absolute right-2 top-[40%]  border-none focus:outline-none transform -translate-y-1/2 text-xl text-black"
          >
            {/* Sử dụng Font Awesome icons */}
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </button>
        </div>
        {formik.touched.Matkhau && formik.errors.Matkhau && <p className="text-red-500">{formik.errors.Matkhau}</p>}

        <div className="flex justify-between mb-3 text-xs sm:text-sm w-full md:w-[520px]">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Nhớ tài khoản
          </label>
          <Link href="#" className="text-black">
            Quên mật khẩu?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full md:w-[520px] text-white h-[40px] sm:h-[45px] bg-[#000000] rounded-full text-sm sm:text-lg font-bold"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Login;
