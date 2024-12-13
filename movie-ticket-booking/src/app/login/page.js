"use client"; // Đảm bảo sử dụng "use client" cho component client
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation"; // Sử dụng useRouter để chuyển trang
import Link from "next/link";

// Import các biểu tượng Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import fa-eye và fa-eye-slash

const Login = () => {
  const router = useRouter(); // Tạo router để chuyển trang
  const [showPassword, setShowPassword] = useState(false); // Trạng thái hiển thị mật khẩu

  const formik = useFormik({
    initialValues: { usernameOrEmail: "", MatKhau: "" },
    validationSchema: Yup.object({
      usernameOrEmail: Yup.string().required("Bắt buộc"),
      MatKhau: Yup.string().required("Bắt buộc"),
    }),

    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const res = await fetch('http://localhost:3000/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ usernameOrEmail: values.usernameOrEmail, MatKhau: values.MatKhau }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Đăng nhập thất bại');
        }

        const data = await res.json();
        console.log(data); // Kiểm tra token từ response
        if (!data.token) {
          throw new Error("Token không hợp lệ.");
        }

        document.cookie = `token=${data.token}; path=/`; // Không set max-age hay expires => Session cookie

        const token = data.token;
        const payload = JSON.parse(atob(token.split(".")[1]));

        if (payload.IsAdmin) {
          window.location.href = "/"; // Điều hướng trang Admin
        } else {
          router.push("/"); // Điều hướng trang cho người dùng thông thường
        }
      } catch (error) {
        setFieldError('general', error.message); // Hiển thị lỗi chung
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="flex justify-center items-center bg-cover bg-center w-full min-h-screen bg-[url('../../public/images/10.jpg')]">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col justify-center items-center p-6 sm:p-8 md:p-10 rounded-lg text-white w-[90%] sm:w-[85%] md:w-[750px] lg:w-[900px] h-auto"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      >
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl mb-5">Đăng nhập</h1>

        {formik.errors.general && (
          <p className="text-red-500 mb-3">{formik.errors.general}</p>
        )}

        <label
          htmlFor="usernameOrEmail"
          className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]"
        >
          Tên đăng nhập hoặc email<span className="text-red">*</span>
        </label>
        <input
          type="text"
          id="usernameOrEmail"
          name="usernameOrEmail"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.usernameOrEmail}
          placeholder="Tên đăng nhập hoặc email"
          required
          className={`w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 rounded-md text-sm sm:text-base ${formik.touched.usernameOrEmail && formik.errors.usernameOrEmail
            ? "border-red-500"
            : "border-white"
            } bg-[#E8F0FE] text-black `}
        />
        {formik.touched.usernameOrEmail && formik.errors.usernameOrEmail && (
          <p className="text-red-500">{formik.errors.usernameOrEmail}</p>
        )}

        <label
          htmlFor="MatKhau"
          className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]"
        >
          Mật khẩu <span className="text-red">*</span>
        </label>
        <div className="relative w-full md:w-[520px]">
          <input
            type={showPassword ? "text" : "password"}
            id="MatKhau"
            name="MatKhau"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.MatKhau}
            placeholder="Mật khẩu"
            required
            className={`w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 rounded-md text-sm sm:text-base ${formik.touched.MatKhau && formik.errors.MatKhau
              ? "border-red-500"
              : "border-white"
              } bg-[#E8F0FE] text-black `}
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-2 top-[40%] transform -translate-y-1/2 text-xl text-black"
          >
            {/* Sử dụng Font Awesome icons */}
            {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
          </button>
        </div>
        {formik.touched.MatKhau && formik.errors.MatKhau && (
          <p className="text-red-500">{formik.errors.MatKhau}</p>
        )}

        <div className="flex justify-between mb-3 text-xs sm:text-sm w-full md:w-[520px]">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Nhớ tài khoản
          </label>
          <Link href="/forget-password" className="text-[#F5CF49]">
            Quên mật khẩu?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full md:w-[520px] h-[40px] sm:h-[45px] bg-black rounded-full text-sm sm:text-lg font-bold cursor-pointer"
        >
          Đăng nhập
        </button>
        <hr className="my-5 w-full" />

        <div className="flex justify-center items-center text-xs sm:text-sm">
          <p>Bạn chưa có tài khoản?</p>{" "}
          <Link href="/register" className="text-[#F5CF49] ml-1">
            Đăng ký ngay!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
