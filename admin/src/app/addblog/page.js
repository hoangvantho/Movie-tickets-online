"use client"; 
import Head from "next/head";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBlog = () => {
  const [newBlog, setNewBlog] = useState({
    TenBlog: "",
    Anh: null,
    LuotXem: "",
  });

  const notifySuccess = () => {
    toast.success("Thêm blog thành công!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "LuotXem");
    if (value && isNaN(value)) {
      setError("Chỉ được nhập số lượt xem.");
    } else {
      setError(""); // Xóa lỗi nếu giá trị là số
    }
  };

  const handleFileChange = (e) => {
    setNewBlog((prev) => ({
      ...prev,
      Anh: e.target.files[0],
    }));
  };

  const handleSubmitNewBlog = async (e) => {
    e.preventDefault();

    if (isNaN(newBlog.LuotXem)) {
      setError("Chỉ được nhập số lượt xem.");
      return;
    }

    const formData = new FormData();
    formData.append("newBlog", JSON.stringify(newBlog));

    if (newBlog.Anh) {
      formData.append("Anh", newBlog.Anh);
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3000/blog/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to add blog.");

      const data = await response.json();
      notifySuccess();
      // Delay navigation for 2 seconds
      setTimeout(() => {
        router.push("/blog");
      }, 2000); 
    } catch (error) {
      console.error("Lỗi khi thêm blog:", error);
      alert("Có lỗi xảy ra! Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <>
      <Head>
        <title>Thêm Blog</title>
      </Head>
      <main className="app-content">
        <div className="app-title">
          <h1>Thêm Blog Mới</h1>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <h3 className="tile-title">Tạo Mới Blog</h3>
              <div className="tile-body">
                <Form onSubmit={handleSubmitNewBlog} className="row">
                  <Form.Group
                    className="form-group col-md-4"
                    controlId="formTenBlog"
                  >
                    <Form.Label>Tên Blog</Form.Label>
                    <Form.Control
                      type="text"
                      name="TenBlog"
                      value={newBlog.TenBlog}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="form-group col-md-4"
                    controlId="formAnh"
                  >
                    <Form.Label>Ảnh Blog</Form.Label>
                    <Form.Control
                      type="file"
                      name="Anh"
                      onChange={handleFileChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="form-group col-md-4 mb-5"
                    controlId="formTLuotXem"
                  >
                    <Form.Label>Lượt Xem</Form.Label>
                    <Form.Control
                      type="number"
                      name="LuotXem"
                      value={newBlog.LuotXem}
                      onChange={handleInputChange}
                      min="0" // Đảm bảo giá trị nhỏ nhất là 0
                      required
                      placeholder="0 Lượt xem"
                    />
                    {error && <div className="text-danger">{error}</div>}
                  </Form.Group>

                  <div className="form-group col-md-12">
                    <Button
                      className="btn btn-save mr-3"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Đang Lưu..." : "Lưu Lại"}
                    </Button>
                    <a className="btn btn-cancel" href="/blog">
                      Hủy Bỏ
                    </a>
                  </div>
                </Form>
                {statusMessage && (
                  <div className="status-message">{statusMessage}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      <ToastContainer />
      </main>
    </>
  );
};

export default AddBlog;