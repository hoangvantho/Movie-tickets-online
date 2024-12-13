'use client';
import React, { useState, useEffect } from 'react'; // Thêm useEffect
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCombo = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    TenCombo: '',
    NoiDung: '',
    Gia: '',
    Anh: null,
  });

  const [existingCombos, setExistingCombos] = useState([]); // Danh sách combo hiện tại
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Lấy danh sách combo hiện tại
    const fetchCombos = async () => {
      try {
        const response = await fetch('http://localhost:3000/combo/');
        const data = await response.json();
        setExistingCombos(data);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy danh sách combo:', error);
      }
    };

    fetchCombos();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra giá tiền
    const price = parseFloat(formData.Gia);
    if (isNaN(price) || price <= 0) {
      toast.error('Giá phải là một số lớn hơn 0.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    // Kiểm tra tên combo có trùng không
    if (existingCombos.some(combo => combo.TenCombo === formData.TenCombo)) {
      toast.error('Tên combo đã tồn tại. Vui lòng chọn tên khác.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    setIsSubmitting(true);
    toast.info('Đang gửi dữ liệu...', {
      position: 'top-right',
      autoClose: 3000,
    });

    try {
      const response = await fetch('http://localhost:3000/combo/add', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorResult = await response.json();
        console.error('Lỗi từ server:', errorResult);
        toast.error(`Có lỗi xảy ra: ${errorResult.message || 'Vui lòng thử lại sau.'}`, {
          position: 'top-right',
          autoClose: 3000,
        });
        return;
      }

      const result = await response.json();
      toast.success(result.message, {
        position: 'top-right',
        autoClose: 3000,
      });

      // Chuyển hướng về trang danh sách combo sau khi lưu thành công
      setTimeout(() => {
        router.push('/combo');
      }, 3000); // Đợi 3 giây trước khi chuyển hướng

      // Reset form sau khi thành công
      setFormData({
        TenCombo: '',
        NoiDung: '',
        Gia: '',
        Anh: null,
      });
    } catch (error) {
      console.error('Có lỗi xảy ra khi gửi yêu cầu:', error);
      toast.error('Có lỗi xảy ra khi gửi yêu cầu, vui lòng thử lại.', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Thêm combo</title>
      </Head>
      <main className="app-content">
        <div className="app-title">
          <h1>Thêm combo mới</h1>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <h3 className="tile-title">Tạo mới combo</h3>
              <div className="tile-body">
                <form className="row" onSubmit={handleSubmit}>
                  <div className="form-group col-md-4">
                    <label className="control-label">Tên combo</label>
                    <input className="form-control" type="text" name="TenCombo" value={formData.TenCombo} onChange={handleChange} required />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Nội dung</label>
                    <input className="form-control" type="text" name="NoiDung" value={formData.NoiDung} onChange={handleChange} required />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Giá</label>
                    <input className="form-control" type="number" name="Gia" value={formData.Gia} onChange={handleChange} required />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Ảnh</label>
                    <input type="file" name="Anh" onChange={handleChange} required />
                  </div>
                  <div className="form-group col-md-12">
                    <button className="btn btn-save mr-3" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Đang lưu...' : 'Lưu lại'}
                    </button>
                    <a className="btn btn-cancel" href="/combo">Hủy bỏ</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Thông báo Toast */}
        <ToastContainer transition={Bounce} />
      </main>
    </>
  );
};

export default AddCombo;
