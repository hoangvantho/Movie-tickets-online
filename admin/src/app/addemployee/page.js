'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for the toast

const ThemNhanVien = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    HoTen: '',
    TenDangNhap: '',
    MatKhau: '',
    Anh: null,
    DiaChi: '',
    NgaySinh: '',
    GioTinh: '',
    SDT: '',
    ChucVu: '',
    Tinhtrang: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const validateUserName = (username) => {
    const usernameRegex = /^[a-zA-Z0-9]{6,}$/; // Tên đăng nhập ít nhất 6 ký tự, không có ký tự đặc biệt
    return usernameRegex.test(username);
  };

  const validatePhoneNumber = (phone) => {
    return phone.length === 10 && /^[0-9]+$/.test(phone); // Kiểm tra số điện thoại 10 chữ số
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/; // Kiểm tra mật khẩu
    return passwordRegex.test(password);
  };

  const checkUserExists = async () => {
    const response = await fetch('http://localhost:3000/employees/check-username', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        TenDangNhap: formData.TenDangNhap,
        SDT: formData.SDT,
      }),
    });

    if (!response.ok) {
      const errorResult = await response.json();
      return errorResult.message; // Trả về thông báo lỗi từ server
    }

    return null; // Không có lỗi
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra tên đăng nhập
    if (!validateUserName(formData.TenDangNhap)) {
      toast.error('Tên đăng nhập phải ít nhất 6 ký tự và không có ký tự đặc biệt.');
      return;
    }

    // Kiểm tra số điện thoại
    if (!validatePhoneNumber(formData.SDT)) {
      toast.error('Số điện thoại phải có đúng 10 chữ số.');
      return;
    }

    // Kiểm tra mật khẩu
    if (!validatePassword(formData.MatKhau)) {
      toast.error('Mật khẩu phải ít nhất 6 ký tự, bắt đầu bằng chữ hoa, có số, chữ và ít nhất 1 ký tự đặc biệt.');
      return;
    }

    // Kiểm tra tên đăng nhập và số điện thoại đã tồn tại
    const existsMessage = await checkUserExists();
    if (existsMessage) {
      toast.error(existsMessage);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('MatKhau', formData.MatKhau);

    for (const key in formData) {
      if (key !== 'MatKhau') {
        formDataToSend.append(key, formData[key]);
      }
    }

    setIsSubmitting(true);
    toast.info('Đang gửi...');

    try {
      const response = await fetch('http://localhost:3000/employees/add', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorResult = await response.json();
        console.error('Lỗi từ server:', errorResult);
        toast.error(`Có lỗi xảy ra: ${errorResult.message || 'Vui lòng thử lại sau.'}`); // Thông báo lỗi
        return;
      }

      const result = await response.json();
      toast.success(result.message); // Hiển thị thông báo thành công

      // Chờ 3 giây trước khi chuyển hướng
      setTimeout(() => {
        router.push('/employee');
      }, 3000);

      // Reset form sau khi thành công
      setFormData({
        HoTen: '',
        TenDangNhap: '',
        MatKhau: '',
        Anh: null,
        DiaChi: '',
        NgaySinh: '',
        GioTinh: '',
        SDT: '',
        ChucVu: '',
        Tinhtrang: '',
      });
    } catch (error) {
      console.error('Có lỗi xảy ra khi gửi yêu cầu:', error);
      toast.error('Có lỗi xảy ra khi gửi yêu cầu, vui lòng thử lại.'); // Thông báo lỗi
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Thêm nhân viên</title>
      </Head>
      <main className="app-content">
        <div className="app-title">
          <h1>Thêm nhân viên mới</h1>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <h3 className="tile-title">Tạo mới nhân viên</h3>
              <div className="tile-body">
                <form className="row" onSubmit={handleSubmit}>
                  <div className="form-group col-md-4">
                    <label className="control-label">Họ và tên</label>
                    <input className="form-control" type="text" name="HoTen" onChange={handleChange} required />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Tên đăng nhập</label>
                    <input className="form-control" type="text" name="TenDangNhap" onChange={handleChange} required />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Mật khẩu</label>
                    <input className="form-control" type="password" name="MatKhau" onChange={handleChange} required />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Địa chỉ</label>
                    <input className="form-control" type="text" name="DiaChi" onChange={handleChange} required />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Ngày sinh</label>
                    <input className="form-control" type="date" name="NgaySinh" onChange={handleChange} required />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Số điện thoại</label>
                    <input className="form-control" type="text" name="SDT" onChange={handleChange} required />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Giới tính</label>
                    <select className="form-control" name="GioTinh" onChange={handleChange} required>
                      <option value="">-- Chọn giới tính --</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Chức vụ</label>
                    <select className="form-control" name="ChucVu" onChange={handleChange} required>
                      <option value="">-- Chọn chức vụ --</option>
                      <option value="Bán hàng">Bán hàng</option>
                      <option value="Tư vấn">Tư vấn</option>
                      <option value="Thu Ngân">Thu Ngân</option>
                      <option value="Quản kho">Quản kho</option>
                      <option value="Kiểm hàng">Kiểm hàng</option>
                      <option value="Bảo vệ">Bảo vệ</option>
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Tình trạng</label>
                    <select className="form-control" name="Tinhtrang" onChange={handleChange} required>
                      <option value="">-- Chọn tình trạng --</option>
                      <option value="Hoạt động">Hoạt động</option>
                      <option value="Tạm nghỉ">Tạm nghỉ</option>
                      <option value="Nghỉ việc">Nghỉ việc</option>
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Ảnh 3x4 nhân viên</label>
                    <input type="file" name="Anh" onChange={handleChange} required />
                  </div>
                  <div className="form-group col-md-12">
                    <button className="btn btn-save mr-3" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Đang lưu...' : 'Lưu lại'}
                    </button>
                    <a className="btn btn-cancel" href="/employee">Hủy bỏ</a>
                  </div>
                </form>
                <ToastContainer /> {/* Đặt ToastContainer ở đây */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ThemNhanVien;
