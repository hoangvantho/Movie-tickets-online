"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BinhLuan = () => {
  const [binhluan, setBinhLuan] = useState([]);

  // Lấy danh sách bình luận từ API và tên phim từ movieId
  useEffect(() => {
    const fetchBinhLuan = async () => {
      try {
        const response = await fetch("http://localhost:3000/comments");
        const commentsData = await response.json();

        // Lấy tên phim dựa vào movieId
        const moviePromises = commentsData.map(async (comment) => {
          const movieResponse = await fetch(`http://localhost:3000/movie/${comment.movieId}`);
          const movieData = await movieResponse.json();
          return { ...comment, movieName: movieData.Ten }; // Giả sử `Ten` là tên phim trả về từ API
        });

        const commentsWithMovieNames = await Promise.all(moviePromises);
        setBinhLuan(commentsWithMovieNames);
      } catch (error) {
        console.error("Error fetching comments or movies:", error);
      }
    };
    fetchBinhLuan();
  }, []);

  // Xóa bình luận trên server và cập nhật danh sách bình luận
  const handleDelete = async (_id) => {
    try {
      await fetch(`http://localhost:3000/comments/${_id}`, {
        method: "DELETE",
      });
      setBinhLuan(binhluan.filter((comment) => comment._id !== _id));
      toast.success("Xóa bình luận thành công!");
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Xóa bình luận thất bại!");
    }
  };

  return (
    <main className="app-content">
      <ToastContainer />
      <Head><title>Danh sách bình luận</title></Head>
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#">
              <b>Danh sách bình luận</b>
            </a>
          </li>
        </ul>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <table className="table table-hover table-bordered" cellPadding="0" cellSpacing="0" border="0" id="sampleTable">
                <thead>
                  <tr>
                    <th width="50">STT</th>
                    <th>Nội dung</th>
                    <th>Ngày bình luận</th>
                    <th>Tên phim</th>
                    <th>Tên người dùng</th>
                    <th width="50">Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {binhluan.map((binhluan, index) => (
                    <tr key={binhluan._id}>
                      <td>{index + 1}</td>
                      <td className="max-w-[600px] break-words">{binhluan.content || binhluan.NoiDung}</td>
                      <td>{new Date(binhluan.timestamp || binhluan.NgayBinhLuan).toLocaleString()}</td>
                      <td>{binhluan.movieName || binhluan.TenPhim}</td>
                      <td>{binhluan.username || binhluan.TenDangNhap}</td>
                      <td className="table-td-center">
                        <button className="btn btn-primary mr-3 trash" type="button" title="Xóa" onClick={() => handleDelete(binhluan._id)}>
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
    </main>
  );
};

export default BinhLuan;
