"use client"; // Mark this component as a client component

import Head from "next/head";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ThemSanPham = () => {
  const [theloai, setTheloai] = useState([]);
  const [newPhim, setNewPhim] = useState({
    Ten: "",
    Trailer: "",
    Anh: null,
    TrangThai: "Sắp chiếu",
    TheLoai: {
      ThoiLuong: "",
      QuocGia: "Việt Nam",
      KieuPhim: "",
      NgonNgu: "Tiếng Việt",
      KhuyenCao: "",
    },
    MoTa: {
      DaoDien: "",
      DienVien: "",
      NgayKhoiChieu: "",
    },
    ThongTinPhim: "",
  });

  const notify = () => {
    toast.success("Xóa phim thành công!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name in newPhim.TheLoai) {
      setNewPhim((prev) => ({
        ...prev,
        TheLoai: {
          ...prev.TheLoai,
          [name]: value,
        },
      }));
    } else if (name in newPhim.MoTa) {
      setNewPhim((prev) => ({
        ...prev,
        MoTa: {
          ...prev.MoTa,
          [name]: value,
        },
      }));
    } else {
      setNewPhim((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    setNewPhim((prev) => ({
      ...prev,
      Anh: e.target.files[0],
    }));
  };

  const handleSubmitNewPhim = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "newPhim",
      JSON.stringify({
        Ten: newPhim.Ten,
        Trailer: newPhim.Trailer,
        TrangThai: newPhim.TrangThai,
        TheLoai: newPhim.TheLoai,
        MoTa: newPhim.MoTa,
        ThongTinPhim: newPhim.ThongTinPhim,
      })
    );

    if (newPhim.Anh) {
      formData.append("Anh", newPhim.Anh);
    }

    try {
      const response = await fetch("http://localhost:3000/movie/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to add product.");

      const data = await response.json();
      notify();
      router.push("/movie");
    } catch (error) {
      console.error("Lỗi khi thêm phim:", error);
      alert("Có lỗi xảy ra! Vui lòng thử lại.");
    }
  };

  // Fetch theloai data from the backend API
  useEffect(() => {
    const fetchTheLoai = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTheloai(data);
      } catch (error) {
        console.error("Lỗi khi lấy thể loại:", error);
      }
    };

    fetchTheLoai();
  }, []);

  return (
    <>
      <Head>
        <title>Thêm phim</title>
      </Head>
      <main className="app-content">
        <div className="app-title">
          <h1>Thêm phim Mới</h1>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <h3 className="tile-title">Tạo Mới Phim</h3>
              <div className="tile-body">
                <Form onSubmit={handleSubmitNewPhim} className="row">
                  <Form.Group
                    className="form-group col-md-4"
                    controlId="formTen"
                  >
                    <Form.Label>Tên phim</Form.Label>
                    <Form.Control
                      type="text"
                      name="Ten"
                      value={newPhim.Ten}
                      onChange={(e) =>
                        setNewPhim((prev) => ({ ...prev, Ten: e.target.value }))
                      }
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="form-group col-md-4"
                    controlId="formTrailer"
                  >
                    <Form.Label>Trailer phim</Form.Label>
                    <Form.Control
                      type="text"
                      name="Trailer"
                      value={newPhim.Trailer}
                      onChange={(e) =>
                        setNewPhim((prev) => ({ ...prev, Trailer: e.target.value }))
                      }
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="form-group col-md-4"
                    controlId="formAnh"
                  >
                    <Form.Label>Ảnh phim</Form.Label>
                    <Form.Control
                      type="file"
                      name="Anh"
                      onChange={handleFileChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="form-group col-md-4"
                    controlId="formTrangThai"
                  >
                    <Form.Label>Tình Trạng</Form.Label>
                    <Form.Control
                      as="select"
                      name="TrangThai"
                      value={newPhim.TrangThai}
                      onChange={(e) =>
                        setNewPhim((prev) => ({
                          ...prev,
                          TrangThai: e.target.value,
                        }))
                      }
                      required
                    >
                      <option value="">-- Chọn Tình Trạng --</option>
                      <option>dangchieu</option>
                      <option>sapchieu</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group
                    className="form-group col-md-4"
                    controlId="formKieuPhim"
                  >
                    <Form.Label>Kiểu Phim</Form.Label>
                    <Form.Control
                      as="select"
                      name="KieuPhim"
                      value={newPhim.TheLoai.KieuPhim}  // Bind to KieuPhim
                      onChange={handleInputChange} // Use handleInputChange here
                      required
                    >
                      <option value="">-- Chọn Kiểu Phim --</option>
                      {theloai.map((item) => (
                        <option key={item.id} value={item.Ten}>
                          {item.Ten}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group
                    className="form-group col-md-4"
                    controlId="formThoiLuong"
                  >
                    <Form.Label>Thời Lượng</Form.Label>
                    <Form.Control
                      type="text"
                      name="ThoiLuong"
                      value={newPhim.TheLoai.ThoiLuong}
                      onChange={handleInputChange} // Use handleInputChange here
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="form-group col-md-4"
                    controlId="formQuocGia"
                  >
                    <Form.Label>Quốc Gia</Form.Label>
                    <Form.Control
                      as="select"
                      name="QuocGia"
                      value={newPhim.TheLoai.QuocGia}
                      onChange={handleInputChange} // Use handleInputChange here
                      required
                    >
                      <option value="Việt Nam">Việt Nam</option>
                      <option value="Mỹ">Mỹ</option>
                      <option value="Nhật Bản">Nhật Bản</option>
                      <option value="Hàn Quốc">Hàn Quốc</option>
                      <option value="Pháp">Pháp</option>
                      <option value="Trung Quốc">Trung Quốc</option>
                      {/* Add more countries as needed */}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group
                    className="form-group col-md-4"
                    controlId="formNgonNgu"
                  >
                    <Form.Label>Ngôn Ngữ</Form.Label>
                    <Form.Control
                      as="select"
                      name="NgonNgu"
                      value={newPhim.TheLoai.NgonNgu}
                      onChange={handleInputChange} // Use handleInputChange here
                      required
                    >
                      <option value="Tiếng Việt">Tiếng Việt</option>
                      <option value="Tiếng Anh">Tiếng Anh</option>
                      <option value="Tiếng Hàn">Tiếng Hàn</option>
                      <option value="Tiếng Nhật">Tiếng Nhật</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group
                    className="form-group col-md-4"
                    controlId="formKhuyenCao"
                  >
                    <Form.Label>Khuyến Cáo</Form.Label>
                    <Form.Control
                      as="select"
                      name="KhuyenCao"
                      value={newPhim.TheLoai.KhuyenCao}
                      onChange={handleInputChange} // Use handleInputChange here
                      required
                    >
                      <option value="">-- Chọn Khuyến Cáo --</option>
                      <option>T18: Phim dành cho khán giả từ đủ 16 tuổi trở lên (18+)</option>
                      <option>T16: Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)</option>
                      <option>T13: Phim dành cho khán giả từ đủ 16 tuổi trở lên (13+)</option>
                      {/* Add more ratings as needed */}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group
                    className="form-group col-md-4"
                    controlId="formDaoDien"
                  >
                    <Form.Label>Đạo Diễn</Form.Label>
                    <Form.Control
                      type="text"
                      name="DaoDien"
                      value={newPhim.MoTa.DaoDien}
                      onChange={handleInputChange} // Use handleInputChange here
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="form-group col-md-4"
                    controlId="formDienVien"
                  >
                    <Form.Label>Diễn Viên</Form.Label>
                    <Form.Control
                      type="text"
                      name="DienVien"
                      value={newPhim.MoTa.DienVien}
                      onChange={handleInputChange} // Use handleInputChange here
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="form-group col-md-4"
                    controlId="formNgayKhoiChieu"
                  >
                    <Form.Label>Ngày Khởi Chiếu</Form.Label>
                    <Form.Control
                      type="date"
                      name="NgayKhoiChieu"
                      value={newPhim.MoTa.NgayKhoiChieu}
                      onChange={handleInputChange} // Use handleInputChange here
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="form-group col-md-4"
                    controlId="formThongTinPhim"
                  >
                    <Form.Label>Thông Tin Phim</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="ThongTinPhim"
                      value={newPhim.ThongTinPhim}
                      onChange={handleInputChange} // Use handleInputChange here
                      required
                    />
                  </Form.Group>

                  <div className="form-group col-md-12">
                    <Button type="submit" className="btn btn-save mr-3">
                      Lưu lại
                    </Button>
                    <a className="btn btn-cancel" href="/movie">Hủy bỏ</a>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </main>
    </>
  );
};

export default ThemSanPham;