"use client"; // Mark this component as a client component

import Head from "next/head";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ThemTheLoai = () => {
  const [newCategory, setNewCategory] = useState({
    Ten: "",
    Anh: null, // Assuming you want to upload an image
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setNewCategory((prev) => ({
      ...prev,
      Anh: e.target.files[0], // Handle image upload
    }));
  };

  const handleSubmitNewCategory = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Ten", newCategory.Ten); // Change here

    if (newCategory.Anh) {
      formData.append("Anh", newCategory.Anh);
    }

    try {
      const response = await fetch("http://localhost:3000/categories/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to add category.");

      const data = await response.json();
      toast.success("Thêm thể loại thành công!", {
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
        router.push("/categories");
      }, 2000);
    } catch (error) {
      console.error("Lỗi khi thêm thể loại:", error);
      alert("Có lỗi xảy ra! Vui lòng thử lại.");
    }
  };


  return (
    <>
      <Head>
        <title>Thêm Thể Loại</title>
      </Head>
      <main className="app-content">
        <div className="app-title">
          <h1>Thêm thể loại mới</h1>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <h3 className="tile-title">Tạo mới thể loại</h3>
              <div className="tile-body">
                <Form onSubmit={handleSubmitNewCategory} className="row">
                  <Form.Group className="form-group col-md-4" controlId="formTen">
                    <Form.Label>Tên Thể Loại</Form.Label>
                    <Form.Control
                      type="text"
                      name="Ten"
                      value={newCategory.Ten}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <div className="form-group col-md-12">
                    <Button type="submit" className="btn btn-save mr-3">
                      Lưu lại
                    </Button>
                    <Button className="btn btn-cancel" onClick={() => router.push("/categories")}>
                      Hủy bỏ
                    </Button>
                  </div>
                </Form>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ThemTheLoai;