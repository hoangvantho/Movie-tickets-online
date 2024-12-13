'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ThemAdmin = () => {
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
    const usernameRegex = /^[a-zA-Z0-9]{6,}$/;
    return usernameRegex.test(username);
  };

  const validatePhoneNumber = (phone) => {
    return phone.length === 10 && /^[0-9]+$/.test(phone);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
    return passwordRegex.test(password);
  };

  const checkUserExists = async () => {
    const response = await fetch('http://localhost:3000/admin/check-username', { // Cập nhật endpoint
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
      return errorResult.message;
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateUserName(formData.TenDangNhap)) {
      toast.error('Tên đăng nhập phải ít nhất 6 ký tự và không có ký tự đặc biệt.');
      return;
    }

    if (!validatePhoneNumber(formData.SDT)) {
      toast.error('Số điện thoại phải có đúng 10 chữ số.');
      return;
    }

    if (!validatePassword(formData.MatKhau)) {
      toast.error('Mật khẩu phải ít nhất 6 ký tự, bắt đầu bằng chữ hoa, có số, chữ và ít nhất 1 ký tự đặc biệt.');
      return;
    }

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
      const response = await fetch('http://localhost:3000/admin/add', { // Cập nhật endpoint
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorResult = await response.json();
        console.error('Lỗi từ server:', errorResult);
        toast .error(`Có lỗi xảy ra: ${errorResult.message || 'Vui lòng thử lại sau.'}`);
        return;
      }

      const result = await response.json();
      toast.success(result.message);

      setTimeout(() => {
        router.push('/admin'); // Cập nhật đường dẫn chuyển hướng
      }, 3000);

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
      toast.error('Có lỗi xảy ra khi gửi yêu cầu, vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Thêm admin</title>
      </Head>
      <main className="app-content">
        <div className="app-title">
          <h1>Thêm admin mới</h1>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <h3 className="tile-title">Tạo mới admin</h3>
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
                      <option value="Quản trị viên">Quản trị viên</option>
                      <option value="Quản lý">Quản lý</option>
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
                    <label class Name="control-label">Ảnh 3x4 admin</label>
                    <input type="file" name="Anh" onChange={handleChange} required />
                  </div>
                  <div className="form-group col-md-12">
                    <button className="btn btn-save mr-3" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Đang lưu...' : 'Lưu lại'}
                    </button>
                    <a className="btn btn-cancel" href="/admin">Hủy bỏ</a>
                  </div>
                </form>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ThemAdmin;