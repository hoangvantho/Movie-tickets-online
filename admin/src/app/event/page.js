"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventList = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedEvent, setEditedEvent] = useState({
    Ten: "",
    NoiDung: "",
    Anh: null,
    NgayBatDau: "",
    NgayKetThuc: "",
    Luuy: "",
    DieuKien: "",
    Giam: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/event/");
        if (!response.ok) throw new Error("Failed to fetch events.");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sự kiện này không?")) return;

    try {
      const response = await fetch(`http://localhost:3000/event/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete event.");

      setEvents((prev) => prev.filter((event) => event._id !== id));
      toast.success("Sự kiện đã được xóa thành công!"); // Show success notification
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Có lỗi xảy ra khi xóa sự kiện."); // Show error notification
    }
  };

  const handleShowMore = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleAddEvent = () => {
    router.push("/addevent");
  };

  const handleEditEvent = (event) => {
    setEditedEvent(event);
    setSelectedFile(null); // Reset file selection when editing
    setShowEditModal(true);
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();

    // Append all necessary fields to the FormData
    formData.append('newEvent', JSON.stringify({
      Ten: editedEvent.Ten || "",
      NoiDung: editedEvent.NoiDung || "",
      NgayBatDau: editedEvent.NgayBatDau || "",
      NgayKetThuc: editedEvent.NgayKetThuc || "",
      Luuy: editedEvent.Luuy || "",
      DieuKien: editedEvent.DieuKien || "",
      Giam: editedEvent.Giam || "",
    }));

    if (selectedFile) {
      formData.append('Anh', selectedFile);
    }

    try {
      const response = await fetch(`http://localhost:3000/event/edit/${editedEvent._id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update event.');
      }

      const result = await response.json();
      console.log('Update result:', result);
      setShowEditModal(false); // Close the modal on success

      // Refresh the event list
      const updatedEvents = events.map((event) => event._id === result._id ? result : event);
      setEvents(updatedEvents);
      toast.success("Sự kiện đã được cập nhật thành công!"); // Show success notification
    } catch (error) {
      console.error('Update error:', error);
      toast.error("Có lỗi xảy ra khi cập nhật sự kiện."); // Show error notification
    }
  };

  const handleNewEventFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Update the selected file
  };

  return (
    <main className="app-content">
      <Head>
        <title>Danh sách sự kiện</title>
      </Head>
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <b>Danh sách sự kiện</b>
          </li>
        </ul>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <div className="row element-button">
                <div className="col-sm-2">
                  <Button className="btn btn-add " onClick={handleAddEvent}>
                    <i className="fas fa-plus"></i> Thêm mới
                  </Button>
                </div>
              </div>
              <table className="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th width="50">STT</th>
                    <th>Tên sự kiện</th>
                    <th>Ảnh</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th>Nội dung</th>
                    <th>Điều kiện</th>
                    <th>Giảm giá %</th>
                    <th>Lưu ý</th>
                    <th width="120">Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, index) => (
                    <tr key={event._id}>
                      <td>{index + 1}</td>
                      <td>{event.Ten}</td>
                      <td>
                        <img
                          src={event.Anh}
                          alt={event.Ten}
                          style={{ width: "100px", height: "auto" }}
                        />
                      </td>
                      <td>{event.NgayBatDau}</td>
                      <td>{event.NgayKetThuc}</td>
                      <td>{event.NoiDung}</td>
                      <td>{event.DieuKien}</td>
                      <td>{event.Giam}%</td>
                      <td>{event.Luuy}</td>
                      <td className="table-td-center">
                        <button
                          className="btn btn-primary  edit mr-3"
                          type="button"
                          title="Sửa"
                          onClick={() => handleEditEvent(event)}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#f59d39" }} />
                        </button>
                        <button
                          className="btn btn-primary  trash"
                          type="button"
                          title="Xóa"
                          onClick={() => handleDelete(event._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} style={{ color: "#de0400" }} />
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

      {/* Modal to show more info about the selected event */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent?.Ten}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <div>
              <img
                src={selectedEvent.Anh}
                alt={selectedEvent.Ten}
                style={{ width: "100%", height: "auto" }}
              />
              <p>{selectedEvent.NoiDung}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* Edit Event Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa thông tin sự kiện</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="form-group col-md-6">
              <label className="control-label">Mã sự kiện</label>
              <input className="form-control" type="text" value={editedEvent._id || ""} readOnly />
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Ảnh</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleNewEventFileChange}
              />
            </div>
            <div className="form-group col-md-12">
              <label className="control-label">Tên sự kiện</label>
              <input
                className="form-control"
                type="text"
                value={editedEvent.Ten}
                onChange={(e) => setEditedEvent({ ...editedEvent, Ten: e.target.value })}
              />
            </div>
            <div className="form-group col-md-12">
              <label className="control-label">Nội dung</label>
              <textarea
                className="form-control"
                value={editedEvent.NoiDung}
                onChange={(e) => setEditedEvent({ ...editedEvent, NoiDung: e.target.value })}
              />
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Ngày bắt đầu</label>
              <input
                type="date"
                className="form-control"
                value={editedEvent.NgayBatDau}
                onChange={(e) => setEditedEvent({ ...editedEvent, NgayBatDau: e.target.value })}
              />
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Ngày kết thúc</label>
              <input
                type="date"
                className="form-control"
                value={editedEvent.NgayKetThuc}
                onChange={(e) => setEditedEvent({ ...editedEvent, NgayKetThuc: e.target.value })}
              />
            </div>
            <div className="form-group col-md-12">
              <label className="control-label">Lưu ý</label>
              <textarea
                className="form-control"
                value={editedEvent.Luuy}
                onChange={(e) => setEditedEvent({ ...editedEvent, Luuy: e.target.value })}
              />
            </div>
            <div className="form-group col-md-12">
              <label className="control-label">Điều kiện</label>
              <textarea
                className="form-control"
                value={editedEvent.DieuKien}
                onChange={(e) => setEditedEvent({ ...editedEvent, DieuKien: e.target.value })}
              />
            </div>
            <div className="form-group col-md-12">
              <label className="control-label">Giảm giá</label>
              <textarea
                className="form-control"
                value={editedEvent.Giam}
                onChange={(e) => setEditedEvent({ ...editedEvent, Giam: e.target.value })}
              />
            </div>
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

      {/* Toast Container for notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable pauseOnFocusLoss />
    </main>
  );
};

export default EventList;