"use client"; // Mark this file as a client component
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faTimes, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// Toast
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
const Blog = () => {
  const router = useRouter();
  const [showShowtimes, setShowShowtimes] = useState(false);
  const [showShoweditblog, setShowShoweditblog] = useState(false);
  const [blogList, setBlogList] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedBlog, setEditedBlog] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [editError, setEditError] = useState("");
  const [selectedLichChieuId, setSelectedblogdetail] = useState(null);
  const [lichchieu, setLichChieu] = useState([]);
  const [error, setError] = useState("");
  const handleAddBlogDetail = () => {
    router.push('/addblogdetail'); // Điều hướng đến trang "add-bogdetail"
  };
  const [blogData, setBlogData] = useState({
    NoiDung1: "",
    NoiDung2: "",
    NoiDung3: "",
    NoiDung4: "",
    NoiDung5: "",
    Anh: "",
  });

  const handleCloseShowtimes = () => {
    setShowShowtimes(false);
  };
  const [selectedEditBlog, setSelectededitblog] = useState(null);

  const notify = () => {
    toast.success('Xóa blog thành công!', {
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

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/blogdetail/edit/${selectedEditBlog}`);
        // Update the state with fetched data
        setBlogData(response.data);

      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    if (selectedEditBlog) fetchBlogData();
  }, [selectedEditBlog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,  // Dynamically update the field
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the blog with the new data
      await axios.put(`http://localhost:3000/blogdetail/edit/${selectedEditBlog}`, {
        newBlog: blogData
      });
      setShowShoweditblog(false);
      alert("dã thực hiện thay đổi blogdetail");
      window.location.reload();// Close the modal after successful update
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };
  const handleDeleteBlog = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/blogdetail/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log("Blogdetail deleted successfully");
        alert("Đã thực hiện xóa blogdetail");
        window.location.reload();
        setShowShowtimes(false);
      } else {
        console.log("Blog not found");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const notifyEditSuccess = () => {
    toast.success('Sửa bài viết thành công!', {
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

  useEffect(() => {
    const fetchLichId = async () => {
      if (!selectedLichChieuId) return;

      try {
        const responseDetail = await fetch(`http://localhost:3000/blog/${selectedLichChieuId}/details`);
        if (!responseDetail.ok) {
          throw new Error("Không thể lấy chi tiết lịch chiếu");
        }
        const dataDetail = await responseDetail.json();

        setLichChieu(dataDetail);

      } catch (error) {
        console.error("Lỗi khi lấy chi tiết phòng chiếu:", error);
      }
    };

    fetchLichId();
  }, [selectedLichChieuId]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:3000/blog");
        if (!response.ok) throw new Error("Failed to fetch blogs.");
        const data = await response.json();
        setBlogList(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) return;

    try {
      const response = await fetch(`http://localhost:3000/blog/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete blog.");

      // Update the blog list by filtering out the deleted blog
      setBlogList((prev) => prev.filter((blog) => blog._id !== id));

      notify();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleShowMore = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBlog(null);
  };

  const handleAddBlog = () => {
    router.push("/addblog");
  };

  const handleEditBlog = (blog) => {
    setEditedBlog(blog);
    setSelectedFile(null); // Reset file selection when editing
    setShowEditModal(true);
    setEditError(""); // Reset edit error when opening the edit modal
  };

  const handleSaveChanges = async () => {
    const { LuotXem } = editedBlog;

    // Validate "Lượt xem"
    if (LuotXem && isNaN(LuotXem)) {
      setEditError("Chỉ được nhập số lượt xem.");
      return;
    } else {
      setEditError(""); // Clear error if valid
    }

    const formData = new FormData();

    const blogData = {
      TenBlog: editedBlog.TenBlog,
      LuotXem: LuotXem || '0 lượt xem',
    };

    formData.append('newBlog', JSON.stringify(blogData));

    if (selectedFile) {
      formData.append('Anh', selectedFile);
    }

    try {
      const response = await fetch(`http://localhost:3000/blog/edit/${editedBlog._id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update blog.');
      }

      const result = await response.json();
      console.log('Update result:', result);
      notifyEditSuccess(); // Notify on successful edit
      setShowEditModal(false); // Close the modal on success
      // Refresh the blog list
      const updatedBlogs = blogList.map((blog) => blog._id === result._id ? result : blog);
      setBlogList(updatedBlogs);
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleNewBlogFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Update the selected file
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <main className="app-content">
      <Head>
        <title>Danh sách bài viết</title>
      </Head>
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <b>Danh sách bài viết</b>
          </li>
        </ul>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              {showShowtimes && (
                <div className="absolute top-0 left-0 right-0 mx-auto max-w-4xl bg-white shadow-2xl rounded-lg z-10 overflow-y-auto max-h-[48rem] border ">
                  <div className="flex justify-between items-center  sticky top-0 bg-white py-4">
                    <button onClick={handleAddBlogDetail} className="ml-3 btn btn-add">
                      <i className="fas fa-plus"></i> Thêm mới
                    </button>
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="text-xl mx-6 cursor-pointer transition duration-300 ease-in-out"
                      onClick={handleCloseShowtimes}
                    />
                  </div>

                  {lichchieu.map((lich) => (
                    <div key={lich.id} className="border-b-2 border-grey-300 pb-6  last:border-b-0  px-6">
                      <div className="mt-4 space-y-3">
                        <h4 className="text-xl font-semibold text-black">{lich.NoiDung1 || "Detailed info line 1"}</h4>
                        <p className="text-black">{lich.NoiDung2 || "Detailed info line 2"}</p>
                        <p className="text-black">{lich.NoiDung4 || "Detailed info line 3"}</p>
                        <p className="text-black">{lich.NoiDung5 || "Detailed info line 3"}</p>
                        <p className="text-black">{lich.NoiDung6 || "Detailed info line 3"}</p>
                        <img
                          src={lich.Anh || ""}
                          alt="Showtimes image"
                          className=" w-40 h-40 mt-4 w-full max-w-lg mx-auto rounded-md shadow-md border border-green-200"
                        />
                      </div>
                      <div className="flex  items-center mb-6">
                        <button
                          onClick=
                          {() => {
                            setSelectededitblog(lich.id);
                            setShowShoweditblog(true)
                          }}
                          className="btn btn-primary mr-3"
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>

                        <button onClick={() => { const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa không?"); if (isConfirmed) { handleDeleteBlog(lich.id); } }} className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}


              {showShoweditblog && (
                <div className="absolute top-0 left-0 right-0 mx-auto max-w-4xl bg-white shadow-2xl rounded-lg z-10 overflow-y-auto border">
                  <div calssName="modal-content ">
                    <div className="modal-body p-4">
                      <h5>Chỉnh Sửa Blog</h5>
                      <h6>Đang chỉnh sửa blog với ID: {selectedEditBlog}</h6>
                      <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label htmlFor="NoiDung1" className="control-label">Nội Dung 1:</label>
                            <input type="text" id="NoiDung1" name="NoiDung1" value={blogData.NoiDung1} onChange={handleChange} className="form-control" />
                          </div>

                          <div className="form-group col-md-6">
                            <label htmlFor="NoiDung2" className="control-label">Nội Dung 2:</label>
                            <input type="text" id="NoiDung2" name="NoiDung2" value={blogData.NoiDung2} onChange={handleChange} className="form-control" />
                          </div>

                          <div className="form-group col-md-6">
                            <label htmlFor="NoiDung3" className="control-label">Nội Dung 3:</label>
                            <input type="text" id="NoiDung3" name="NoiDung3" value={blogData.NoiDung3} onChange={handleChange} className="form-control" />
                          </div>

                          <div className="form-group col-md-6">
                            <label htmlFor="NoiDung4" className="control-label">Nội Dung 4:</label>
                            <input type="text" id="NoiDung4" name="NoiDung4" value={blogData.NoiDung4} onChange={handleChange} className="form-control" />
                          </div>

                          <div className="form-group col-md-6">
                            <label htmlFor="NoiDung5" className="control-label">Nội Dung 5:</label>
                            <input type="text" id="NoiDung5" name="NoiDung5" value={blogData.NoiDung5} onChange={handleChange} className="form-control" />
                          </div>

                          <div className="form-group col-md-6">
                            <label htmlFor="Anh" className="control-label">Ảnh:</label>
                            <input type="text" id="Anh" name="Anh" value={blogData.Anh} onChange={handleChange} className="form-control" />
                          </div>
                        </div>

                        <div className="flex  mt-8">
                          <button type="submit" className="btn btn-save mr-3">Lưu lại</button>
                          <button type="button" onClick={() => setShowShoweditblog(false)} className="btn btn-cancel">Hủy bỏ</button>
                        </div>
                      </form>
                    </div>
                  </div></div>

              )}

              <div className="row element-button">
                <div className="col-sm-2"><Button className="btn btn-add" onClick={handleAddBlog}><i className="fas fa-plus"></i> Thêm mới</Button></div>
              </div>

              <table className="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên blog</th>
                    <th>Ảnh</th>
                    <th>Lượt xem</th>
                    <th>Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {blogList.map((blog) => (
                    <tr key={blog._id}>
                      <td>{blog.id}</td>
                      <td>{blog.TenBlog}</td>
                      <td><img src={blog.Anh} alt={blog.TieuDe} style={{ width: "100px", height: "auto" }} /></td>
                      <td>{blog.LuotXem} lượt xem</td>
                      <td className="table-td-center">
                        <button className="btn btn-primary mr-3" type="button" title="Sửa" onClick={() => handleEditBlog(blog)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                        <button className="btn btn-danger mr-3" type="button" title="Xóa" onClick={() => handleDelete(blog._id)}><FontAwesomeIcon icon={faTrash} /></button>
                        <button onClick={() => { setSelectedblogdetail(blog.id); setShowShowtimes(true); }}><FontAwesomeIcon icon={faFileAlt} className="btn btn-info" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal to show more info about the selected blog */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBlog?.TieuDe}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBlog && (
            <div>
              <img src={selectedBlog.Anh} alt={selectedBlog.TieuDe} style={{ width: "100%", height: "auto" }} />
              <p>{selectedBlog.NoiDung}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* Edit Blog Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa thông tin bài viết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="form-group col-md-6">
              <label className="control-label">Tên blog</label>
              <input className="form-control" type="text" value={editedBlog.TenBlog || ""} onChange={(e) => setEditedBlog({ ...editedBlog, TenBlog: e.target.value })} />
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Lượt xem</label>
              <input className="form-control" type="text" value={editedBlog.LuotXem || ""} onChange={(e) => setEditedBlog({ ...editedBlog, LuotXem: e.target.value })} />
              {editError && <p style={{ color: 'red' }}>{editError}</p>}
            </div>
            <div className="form-group col-md-12">
              <label className="control-label">Chọn ảnh</label>
              <input type="file" onChange={handleNewBlogFileChange} accept="image/*" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSaveChanges} className="btn btn-save" > Lưu lại</Button>
          <Button onClick={() => setShowEditModal(false)} className="btn btn-cancel" >Hủy bỏ </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast container for notifications */}
      <ToastContainer />

    </main>
  );
};

export default Blog;