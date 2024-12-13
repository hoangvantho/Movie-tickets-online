"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
// Toast
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faPlus,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

const QuanLyPhongChieu = ({ params }) => {
  const { id: rapId } = params;
  // const { name: tenRap } = params;
  const [raps, setRaps] = useState([]);
  const [phongChieu, setPhongChieu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPhong, setCurrentPhong] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPhongChieu, setNewPhongChieu] = useState({
    TenPhongChieu: "",
    SoLuongGhe: "",
    Ghe: [],
  });
  const tenRaps = raps.map((rap) => rap.TenRap);
  const [showtimes, setShowtimes] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  console.log(tenRaps);

  const notifyXoa = () => {
    toast.success("Xóa phòng thành công thành công!", {
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

  const notifyThem = () => {
    toast.success("Thêm phòng thành công!", {
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

  const notifySua = () => {
    toast.success("Sửa phòng thành công!", {
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


  const notifyTrungThem = () => {
    toast.error("Thêm phòng trùng tên, hãy thử lại!", {
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

  const notifyTrungSua = () => {
    toast.error("Sửa phòng trùng phòng, hãy thử lại!", {
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

  const [currentHang, setCurrentHang] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchRaps = async () => {
      try {
        const response = await fetch("http://localhost:3000/theater");
        const data = await response.json();
        setRaps(data);
        setLoading(false);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy dữ liệu rạp:", error);
        setLoading(false);
      }
    };

    fetchRaps();
  }, []);

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await fetch("http://localhost:3000/showtimes");
        if (!response.ok) throw new Error("Không thể tải dữ liệu suất chiếu");
        const data = await response.json();
        setShowtimes(data);
      } catch (error) {
        console.error("Lỗi khi tải suất chiếu:", error);
      }
    };

    fetchShowtimes();
  }, []);

  useEffect(() => {
    const fetchPhongChieu = async () => {
      if (rapId) {
        try {
          const response = await fetch(
            `http://localhost:3000/theater/${rapId}/phong-chieu`
          );
          const data = await response.json();
          console.log("Phong Chieu Data:", data); // Log the data
          setPhongChieu(data);
          setLoading(false);
        } catch (error) {
          console.error("Có lỗi xảy ra khi lấy dữ liệu phòng chiếu:", error);
          setLoading(false);
        }
      }
    };
    fetchPhongChieu();
  }, [rapId]);

  const handleAddPhongChieu = async () => {
    // Kiểm tra trùng lặp tên phòng chiếu trước khi gửi yêu cầu
    const isDuplicate = phongChieu.some(
      (phong) =>
        phong.TenPhongChieu.trim().toLowerCase() ===
        newPhongChieu.TenPhongChieu.trim().toLowerCase()
    );

    if (isDuplicate) {
      notifyTrungThem();
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/theater/${rapId}/phong-chieu`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPhongChieu),
        }
      );

      if (response.ok) {
        const addedPhongChieu = await response.json();
        setPhongChieu((prev) => [...prev, addedPhongChieu.newPhongChieu]);
        console.log("Phòng chiếu mới:", addedPhongChieu.newPhongChieu);
        setNewPhongChieu({ TenPhongChieu: "", SoLuongGhe: "", Ghe: [] });
        setIsAddModalOpen(false);
        notifyThem();
      } else {
        alert("Có lỗi xảy ra khi thêm phòng chiếu!");
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };

  const handleAddGhe = () => {
    const danhSachGhe = newPhongChieu.Ghe || [];
    danhSachGhe.push({ Hang: currentHang, DanhSachGhe: [] });
    const soHang = Math.ceil(newPhongChieu.SoLuongGhe / 0);

    let gheId = 1;
    for (let hang = 1; hang <= soHang; hang++) {
      const hangData = { Hang: `H${hang}`, DanhSachGhe: [] };
      for (let i = 1; i <= 10 && gheId <= newPhongChieu.SoLuongGhe; i++) {
        hangData.DanhSachGhe.push({ id: gheId++, tenGhe: `H${hang}G${i}` });
      }
      danhSachGhe.push(hangData);
    }

    setNewPhongChieu((prev) => ({ ...prev, Ghe: danhSachGhe }));
  };

  const handleEditPhongChieu = async () => {
    try {
      // Chuẩn bị payload
      const payload = {
        TenPhongChieu: currentPhong.TenPhongChieu,
        SoLuongGhe: currentPhong.SoLuongGhe,
        Ghe: currentPhong.Ghe,
      };

      console.log("Payload gửi đi:", payload);

      // Gửi yêu cầu PUT tới API
      const response = await fetch(
        `http://localhost:3000/theater/${rapId}/phong-chieu/${currentPhong.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      // Xử lý lỗi từ phản hồi API
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Lỗi từ API:", errorData);

        // Kiểm tra lỗi cụ thể và hiển thị thông báo phù hợp
        if (
          errorData.message ===
          "Tên phòng chiếu đã tồn tại. Vui lòng chọn tên khác!"
        ) {
          notifyTrungSua();
        } else {
          alert("Cập nhật không thành công! Vui lòng thử lại.");
        }

        return;
      }

      // Nhận dữ liệu phòng chiếu đã cập nhật từ API
      const updatedPhongChieu = await response.json();
      console.log("Phòng chiếu sau khi cập nhật:", updatedPhongChieu);

      // Cập nhật danh sách phòng chiếu trong state
      setPhongChieu((prev) =>
        prev.map((phong) =>
          phong.id === currentPhong.id ? { ...phong, ...payload } : phong
        )
      );

      // Thông báo thành công và đóng modal
      notifySua();
      setIsEditModalOpen(false);
      setCurrentPhong(null);
    } catch (error) {
      // Xử lý lỗi bất ngờ
      console.error("Đã xảy ra lỗi trong quá trình sửa phòng chiếu:", error);
      alert("Đã xảy ra lỗi, vui lòng thử lại sau!");
    }
  };

  const handleDeletePhongChieu = async (phongId) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa phòng chiếu này không?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:3000/theater/${rapId}/phong-chieu/${phongId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          // Cập nhật danh sách phòng chiếu trong state
          setPhongChieu((prev) =>
            prev.filter((phong) => phong._id !== phongId)
          );
          console.log("Xóa phòng chiếu thành công!");
          notifyXoa();
        } else {
          const errorDetails = await response.json();
          console.error("API Error:", errorDetails);
          alert("Có lỗi xảy ra khi xóa phòng chiếu!");
        }
      } catch (error) {
        console.error("Có lỗi xảy ra khi xóa phòng chiếu:", error);
      }
    }
  };

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <>
      <main className="app-content">
        <Head>
          <title>Quản lý phòng chiếu</title>
        </Head>
        <div className="app-title">
          <ul className="app-breadcrumb breadcrumb side">
            <li className="breadcrumb-item active">
              <a href="#">
                <b>Quản lý phòng chiếu cho {tenRaps}</b>
              </a>
            </li>
          </ul>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <div className="tile-body">
                <div className="row element-button">
                  <div className="col-sm-2">
                    <button
                      onClick={() => setIsAddModalOpen(true)}
                      className="btn btn-add"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                      Thêm mới
                    </button>
                  </div>
                </div>

                {Array.isArray(phongChieu) && phongChieu.length > 0 ? (
                  <table className="table table-hover table-bordered js-copytextarea">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Tên phòng chiếu</th>
                        <th>Số lượng ghế</th>
                        <th>Tên ghế</th>
                        <th width="130">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {phongChieu.map((phong, index) => (
                        <tr key={phong.id}>
                          <td>{index + 1}</td>
                          <td>{phong.TenPhongChieu}</td>
                          <td>{phong.SoLuongGhe}</td>
                          <td>
                            {phong.Ghe.map((row, rowIndex) => (
                              <div key={rowIndex} className="mb-4">
                                <div className="flex">
                                  <div className="mb-2">
                                    <strong className="block mb-1 mr-7">
                                      {row.Hang}
                                    </strong>
                                  </div>
                                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-2">
                                    {row.Ghe.map((ghe, gheIndex) => {
                                      const isBooked = showtimes.some(
                                        (showtime) =>
                                          showtime.IdPhong === phong.id &&
                                          showtime.DaDatGhe.includes(ghe)
                                      );

                                      return (
                                        <div
                                          key={gheIndex}
                                          className={`px-4 py-3 text-center text-sm rounded ${isBooked
                                              ? "bg-red-500 text-white cursor-not-allowed"
                                              : "bg-blue-500 text-white"
                                            }`}
                                          title={
                                            isBooked
                                              ? "Ghế đã đặt - Không thể chỉnh sửa"
                                              : ""
                                          }
                                        >
                                          {ghe}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </td>

                          <td>
                            <button
                              className="btn btn-primary mr-3"
                              onClick={() => {
                                setIsEditModalOpen(true);
                                setCurrentPhong(phong);
                              }}
                            >
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDeletePhongChieu(phong.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>Không có phòng chiếu nào được tìm thấy.</p>
                )}

                <button
                  onClick={() => router.back()}
                  className="btn btn-danger"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                  Trở về
                </button>

                {isEditModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg max-w-4xl w-full shadow-lg overflow-y-auto max-h-[90vh]">
                      {/* Header */}
                      <div className="row">
                        <div className="form-group col-md-12">
                          <h5>Sửa phòng chiếu</h5>
                        </div>
                      </div>
                      {/* Chỉnh sửa thông tin phòng chiếu */}
                      <div className="row">
                        <div className="form-group col-md-6">
                          <label className="control-label">
                            Tên phòng chiếu
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={currentPhong?.TenPhongChieu || ""}
                            onChange={(e) =>
                              setCurrentPhong({
                                ...currentPhong,
                                TenPhongChieu: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label className="control-label">Số lượng ghế</label>
                          <input
                            type="number"
                            className="form-control"
                            value={currentPhong?.SoLuongGhe || ""}
                            onChange={(e) => {
                              const newSoLuongGhe = parseInt(
                                e.target.value,
                                10
                              );
                              if (isNaN(newSoLuongGhe) || newSoLuongGhe <= 0) {
                                // Nếu số lượng ghế không hợp lệ, trả về trạng thái cũ
                                setCurrentPhong({
                                  ...currentPhong,
                                  SoLuongGhe: 0,
                                  Ghe: [],
                                });
                                return;
                              }

                              // Lấy danh sách ghế hiện tại
                              const currentSeats = currentPhong?.Ghe || [];

                              // Đảm bảo có ít nhất một hàng với số ghế mặc định
                              const defaultSeatsPerRow = 10; // Số ghế mặc định mỗi hàng
                              const rowsCount = Math.ceil(
                                newSoLuongGhe / defaultSeatsPerRow
                              );

                              // Tạo danh sách ghế mới
                              const updatedGhe = Array.from(
                                { length: rowsCount },
                                (_, rowIndex) => {
                                  const hang =
                                    currentSeats[rowIndex]?.Hang ||
                                    String.fromCharCode(65 + rowIndex); // A, B, C...
                                  const gheCountForRow = Math.min(
                                    newSoLuongGhe -
                                    rowIndex * defaultSeatsPerRow,
                                    defaultSeatsPerRow
                                  );
                                  const ghe = Array.from(
                                    { length: gheCountForRow },
                                    (_, seatIndex) =>
                                      currentSeats[rowIndex]?.Ghe?.[
                                      seatIndex
                                      ] || `${hang}${seatIndex + 1}`
                                  );
                                  return { Hang: hang, Ghe: ghe };
                                }
                              );

                              // Cập nhật trạng thái phòng chiếu
                              setCurrentPhong({
                                ...currentPhong,
                                SoLuongGhe: newSoLuongGhe,
                                Ghe: updatedGhe,
                              });
                            }}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="form-group col-md-12">
                          <h5>Chỉnh sửa danh sách ghế</h5>
                        </div>
                      </div>

                      {/* Chỉnh sửa danh sách ghế */}
                      <div className="row">
                        {currentPhong?.Ghe?.map((hang, index) => (
                          <div key={index} className="mb-6">
                            {/* Tên hàng */}
                            <div className="form-group col-md-12">
                              <label className="control-label">
                                Hàng: {hang.Hang} - Số ghế: {hang.Ghe.length}
                              </label>

                              {/* Danh sách ghế */}
                              <div className="flex flex-wrap gap-3">
                                {hang.Ghe.map((ghe, gheIndex) => (
                                  <div
                                    key={gheIndex}
                                    className="flex items-center gap-2"
                                  >
                                    <input
                                      type="text"
                                      value={ghe}
                                      onChange={(e) => {
                                        // Cập nhật ghế hiện tại
                                        const updatedRow = hang.Ghe.map(
                                          (g, i) =>
                                            i === gheIndex
                                              ? e.target.value.trim()
                                              : g
                                        );

                                        // Cập nhật hàng ghế
                                        const updatedGhe = currentPhong.Ghe.map(
                                          (h, i) =>
                                            i === index
                                              ? { ...h, Ghe: updatedRow }
                                              : h
                                        );

                                        // Cập nhật tổng số lượng ghế
                                        const updatedPhong = {
                                          ...currentPhong,
                                          Ghe: updatedGhe,
                                          SoLuongGhe: updatedGhe.reduce(
                                            (sum, h) => sum + h.Ghe.length,
                                            0
                                          ),
                                        };

                                        setCurrentPhong(updatedPhong);
                                      }}
                                      className="form-control"
                                    />
                                    {/* Nút xóa ghế */}
                                    <button
                                      onClick={() => {
                                        // Xóa ghế tại vị trí gheIndex
                                        const updatedRow = hang.Ghe.filter(
                                          (g, i) => i !== gheIndex
                                        );

                                        // Cập nhật hàng ghế
                                        const updatedGhe = currentPhong.Ghe.map(
                                          (h, i) =>
                                            i === index
                                              ? { ...h, Ghe: updatedRow }
                                              : h
                                        );

                                        // Cập nhật tổng số lượng ghế
                                        const updatedPhong = {
                                          ...currentPhong,
                                          Ghe: updatedGhe,
                                          SoLuongGhe: updatedGhe.reduce(
                                            (sum, h) => sum + h.Ghe.length,
                                            0
                                          ),
                                        };

                                        setCurrentPhong(updatedPhong);
                                      }}
                                      className="btn btn-danger"
                                    >
                                      -
                                    </button>
                                  </div>
                                ))}

                                {/* Nút thêm ghế */}
                                <button
                                  onClick={() => {
                                    // Thêm ghế mới
                                    const newGhe = [...hang.Ghe, ""]; // Add a new empty seat
                                    const updatedGhe = currentPhong.Ghe.map(
                                      (h, i) =>
                                        i === index ? { ...h, Ghe: newGhe } : h
                                    );

                                    // Cập nhật tổng số lượng ghế
                                    const updatedPhong = {
                                      ...currentPhong,
                                      Ghe: updatedGhe,
                                      SoLuongGhe: updatedGhe.reduce(
                                        (sum, h) => sum + h.Ghe.length,
                                        0
                                      ),
                                    };
                                    setCurrentPhong(updatedPhong);
                                  }}
                                  className="btn btn-add"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={handleEditPhongChieu}
                        className="btn btn-save mr-3"
                      >
                        Lưu lại
                      </button>
                      <button
                        onClick={() => setIsEditModalOpen(false)}
                        className="btn btn-cancel"
                      >
                        Hủy bỏ
                      </button>
                    </div>
                  </div>
                )}

                {/* Modal thêm phòng chiếu */}
                {isAddModalOpen && (
                  <div
                    className="modal fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
                    style={{ display: isAddModalOpen ? "block" : "none" }}
                  >
                    <div
                      className="modal-dialog modal-dialog-centered"
                      role="document"
                    >
                      <div className="modal-content">
                        <div className="modal-body">
                          <div className="row">
                            <div className="form-group col-md-12">
                              <h5>Thêm phòng chiếu mới</h5>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label className="control-label">
                                Tên phòng chiếu
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Tên phòng chiếu"
                                value={newPhongChieu.TenPhongChieu}
                                onChange={(e) =>
                                  setNewPhongChieu({
                                    ...newPhongChieu,
                                    TenPhongChieu: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label className="control-label">
                                Số lượng ghế
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Số lượng ghế"
                                value={newPhongChieu.SoLuongGhe}
                                onChange={(e) =>
                                  setNewPhongChieu({
                                    ...newPhongChieu,
                                    SoLuongGhe: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <button
                            onClick={handleAddPhongChieu}
                            className="btn btn-save mr-3"
                          >
                            Lưu lại
                          </button>
                          <button
                            onClick={() => setIsAddModalOpen(false)}
                            className="btn btn-cancel"
                          >
                            Hủy bỏ
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default QuanLyPhongChieu;
