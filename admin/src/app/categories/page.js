"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TheLoai = () => {
  const [theloai, setTheloai] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editedCategory, setEditedCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editError, setEditError] = useState("");

  const notify = () => {
    toast.success('Xóa thể loại thành công!', {
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

  const notifyEditSuccess = () => {
    toast.success("Chỉnh sửa thể loại thành công!", {
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
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTheLoai();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa thể loại này không?")) return;

    try {
      const response = await fetch(`http://localhost:3000/categories/delete/${id}`, { // Ensure endpoint is correct
        method: "DELETE",
      });

      if (response.ok) {
        // If delete is successful, filter out the deleted category from the list
        setTheloai((prev) => prev.filter((category) => category._id !== id));
        notify(); // Show success toast notification
      } else {
        const errorData = await response.json();
        console.error("Delete error:", errorData.message || "Failed to delete category.");
        toast.error("Xóa thể loại thất bại!");
      }
    } catch (error) {
      console.error("Delete error:", error.message);
      toast.error("Đã xảy ra lỗi khi xóa thể loại.");
    }
  };

  const handleEdit = (category) => {
    setEditedCategory(category);
    setShowEditModal(true);
    setEditError("");
  };

  const handleSaveChanges = async () => {
    if (!editedCategory.TenTheLoai) {
      setEditError("Tên thể loại không được để trống.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/categories/edit/${editedCategory._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ TenTheLoai: editedCategory.TenTheLoai }), // Ensure the correct field name
      });

      if (!response.ok) {
        throw new Error("Failed to update category.");
      }

      const updatedCategory = await response.json();
      setTheloai((prev) =>
        prev.map((cat) => (cat._id === updatedCategory._id ? updatedCategory : cat))
      );
      notifyEditSuccess();
      setShowEditModal(false);
    } catch (error) {
      setEditError("Đã xảy ra lỗi khi cập nhật thể loại.");
      console.error("Update error:", error);
    }
  };

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main className="app-content">
      <Head>
        <title>Danh sách thể loại</title>
      </Head>
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#">
              <b>Danh sách thể loại</b>
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
                  <a
                    className="btn btn-add "
                    href="/addcategories"
                    title="Thêm"
                  >
                    <i className="fas fa-plus"></i> Thêm mới
                  </a>
                </div>
              </div>
              <table
                className="table table-hover table-bordered"
                cellPadding="0"
                cellSpacing="0"
                border="0"
              >
                <thead>
                  <tr>
                    <th width="50">STT</th>
                    <th>Tên thể loại</th>
                    <th width="120">Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {theloai.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.Ten}</td>
                      <td className="table-td-center">
                        <button
                          className="btn btn-primary  edit mr-3"
                          type="button"
                          title="Sửa"
                          onClick={() => handleEdit(item)}
                        >
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            style={{ color: "#f59d39" }}
                          />
                        </button>
                        <button
                          className="btn btn-primary  trash "
                          type="button"
                          title="Xóa"
                          onClick={() => handleDelete(item._id)}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{ color: "#de0400" }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Category Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa thể loại</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label className="control-label">Tên thể loại</label>
            <input
              className="form-control"
              type="text"
              value={editedCategory?.TenTheLoai || ""}
              onChange={(e) =>
                setEditedCategory({ ...editedCategory, TenTheLoai: e.target.value })
              }
            />
            {editError && <p style={{ color: "red" }}>{editError}</p>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSaveChanges} className="btn btn-save">
            Lưu lại
          </Button>
          <Button onClick={() => setShowEditModal(false)} className="btn btn-cancel">
            Hủy bỏ
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast container for notifications */}
      <ToastContainer />
    </main>
  );
};

export default TheLoai;
