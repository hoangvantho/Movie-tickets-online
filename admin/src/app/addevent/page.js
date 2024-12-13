"use client"; // Mark this component as a client component

import Head from "next/head";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

const ThemSuKien = () => {
  const [newEvent, setNewEvent] = useState({
    Ten: "",
    NoiDung: "",
    Anh: null,
    NgayBatDau: "",
    NgayKetThuc: "",
    Luuy: "",
    DieuKien: "",
    Giam: "",
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setNewEvent((prev) => ({
      ...prev,
      Anh: e.target.files[0], // Handle image upload
    }));
  };

  const handleSubmitNewEvent = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("newEvent", JSON.stringify(newEvent)); // Serialize newEvent as JSON string

    if (newEvent.Anh) {
      formData.append("Anh", newEvent.Anh); // Include image if uploaded
    }

    try {
      const response = await fetch("http://localhost:3000/event/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to add event.");

      const data = await response.json();
      toast.success("Thêm sự kiện thành công!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/event");
      }, 2000);
    } catch (error) {
      console.error("Lỗi khi thêm sự kiện:", error);
      alert("Có lỗi xảy ra! Vui lòng thử lại.");
    }
  };

  return (
    <>
      <Head>
        <title>Thêm Sự Kiện</title>
      </Head>
      <main className="app-content">
        <div className="app-title">
          <h1>Thêm sự kiện mới</h1>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <h3 className="tile-title">Tạo mới sự kiện</h3>
              <div className="tile-body">
                <Form onSubmit={handleSubmitNewEvent} className="row">
                  <Form.Group className="form-group col-md-4" controlId="formTen">
                    <Form.Label>Tên Sự Kiện</Form.Label>
                    <Form.Control
                      type="text"
                      name="Ten"
                      value={newEvent.Ten}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="form-group col-md-4" controlId="formNoiDung">
                    <Form.Label>Nội Dung</Form.Label>
                    <Form.Control
                      type="text"
                      name="NoiDung"
                      value={newEvent.NoiDung}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="form-group col-md-4" controlId="formAnh">
                    <Form.Label>Ảnh Sự Kiện</Form.Label>
                    <Form.Control
                      type="file"
                      name="Anh"
                      onChange={handleFileChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="form-group col-md-4" controlId="formNgayBatDau">
                    <Form.Label>Ngày Bắt Đầu</Form.Label>
                    <Form.Control
                      type="date"
                      name="NgayBatDau"
                      value={newEvent.NgayBatDau}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="form-group col-md-4" controlId="formNgayKetThuc">
                    <Form.Label>Ngày Kết Thúc</Form.Label>
                    <Form.Control
                      type="date"
                      name="NgayKetThuc"
                      value={newEvent.NgayKetThuc}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="form-group col-md-4" controlId="formLuuy">
                    <Form.Label>Ghi Chú</Form.Label>
                    <Form.Control
                      type="text"
                      name="Luuy"
                      value={newEvent.Luuy}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="form-group col-md-4" controlId="formDieuKien">
                    <Form.Label>Điều Kiện</Form.Label>
                    <Form.Control
                      type="text"
                      name="DieuKien"
                      value={newEvent.DieuKien}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="form-group col-md-4" controlId="formGiam">
                    <Form.Label>Giam</Form.Label>
                    <Form.Control
                      type="text"
                      name="Giam"
                      value={newEvent.Giam}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <div className="form-group col-md-12">
                    <Button
                      type="submit"
                      className="btn-save mr-3"
                    >
                      Lưu lại    </Button>
                    <Button
                      onClick={() => router.push("/event")}
                      className="btn-cancel "
                    >
                      Hủy Bỏ
                    </Button>
                  </div>

                </Form>
                <ToastContainer /> {/* Include the ToastContainer here */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ThemSuKien;