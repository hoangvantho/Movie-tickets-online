"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Profile = () => {
  const [accountInfo, setAccountInfo] = useState({});
  const [comments, setComments] = useState([]);
  const [showCommentDetails, setShowCommentDetails] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [expandedComments, setExpandedComments] = useState({});

  const toggleCommentDetails = (comment) => {
    setSelectedComment(comment);
    setShowCommentDetails(!showCommentDetails);
  };

  useEffect(() => {
    const token = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("token="));
    const tokenValue = token?.split("=")[1];

    if (tokenValue) {
      const getUserInfo = async () => {
        try {
          const response = await fetch(
            "http://localhost:3000/users/detailuser",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${tokenValue}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setAccountInfo(data);
            fetchComments(data.userId);
          } else {
            alert("Vui lòng đăng nhập lại.");
            document.cookie =
              "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          }
        } catch (error) {
          console.error("An error occurred while fetching user data:", error);
          alert("Có lỗi xảy ra, vui lòng thử lại.");
        }
      };

      const fetchComments = async (userId) => {
        try {
          const response = await fetch(
            `http://localhost:3000/comments?userId=${userId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${tokenValue}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const commentsData = await response.json();
            const commentsWithMovies = await Promise.all(
              commentsData.map(async (comment) => {
                const movieResponse = await fetch(
                  `http://localhost:3000/movie/${comment.movieId}`
                );
                const movieData = await movieResponse.json();
                return {
                  ...comment,
                  movieName: movieData?.Ten || "Không xác định",
                };
              })
            );
            setComments(commentsWithMovies);
          } else {
            console.error("Failed to fetch comments");
          }
        } catch (error) {
          console.error("An error occurred while fetching comments:", error);
        }
      };

      getUserInfo();
    } else {
      alert("Vui lòng đăng nhập để tiếp tục.");
    }
  }, []);

  const toggleExpand = (id) => {
    setExpandedComments((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the expanded state for the clicked comment
    }));
  };

  return (
    <section className="flex flex-col justify-center items-center w-full px-4">
      <div className="w-full max-w-[1410px]">
        <div className="relative h-[300px] bg-cover bg-center border-3 border-white mb-4" style={{ backgroundImage: "url('../images/background.png')" }} ></div>
        <div className="relative -mt-20 flex flex-col md:flex-row">
          <div className="flex flex-col items-center w-full md:w-1/4">
            <img src={`http://localhost:3000/images/${accountInfo.Anh}`} alt="Profile" className="rounded-full w-36 h-36 border-5 border-white object-cover" />
            <div className="flex justify-center mt-1">
              <h2 className="text-3xl text-center font -semibold text-white">
                {accountInfo.Ten}
              </h2>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-5 mb-8 gap-4">
          <div className="w-full md:w-1/4 p-6 bg-[rgba(0,0,0,0.6)] text-white h-[300px]">
            <nav className="space-y-4">
              <Link href="/profile" className="flex items-center text-lg text-white no-underline">
                <FontAwesomeIcon icon={faUser} className="mr-2 w-4" /> Thông tin khách hàng
              </Link>
              <Link href="/comment" className="flex items-center text-lg text-white no-underline">
                <FontAwesomeIcon icon={faEdit} className="mr-2 w-4" /> Lịch sử bình luận
              </Link>
              <Link href="/invoice" className="flex items-center text-lg text-white no-underline">
                <FontAwesomeIcon icon={faEdit} className="mr-2 w-4" /> Lịch sử mua hàng
              </Link>
            </nav>
          </div>

          <div className="w-full md:w-3/4">
            <h2 className="text-2xl mb-2 text-white font-semibold">
              LỊCH SỬ BÌNH LUẬN
            </h2>
            <table className="w-full border-collapse bg-gray-800 text-white">
            <thead>
              <tr>
                <th className="bg-[#F5CF49] text-[#000000] px-2 py-2">Tên phim</th>
                <th className="bg-[#F5CF49] text-[#000000] px-2 py-2">Nội dung</th>
                <th className="bg-[#F5CF49] text-[#000000] px-2 py-2">Ngày bình luận</th>
                <th className="bg-[#F5CF49] text-[#000000] px-2 py-2">Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <tr className="bg-[rgba(0,0,0,0.6)] border-b border-gray-800" key={comment._id}>
                    <td className="text-center px-2 py-2">{comment.movieName}</td>
                    <td className="text-center px-2 py-2">
                      {comment.content.length > 50
                        ? `${comment.content.substring(0, 50)}...`
                        : comment.content}
                    </td>
                    <td className="text-center px-2 py-2">
                      {new Date(comment.timestamp).toLocaleDateString()}
                    </td>
                    <td className="text-center px-2 py-2">
                      <button
                        onClick={() => toggleCommentDetails(comment)}
                        className="w-[117px] h-[35px] bg-[#F5CF49] text-[#000000] rounded hover:bg-[#2C2C2C] hover:text-[#ffffff] hover:border-2 hover:border-[#F5CF49] hover:border-solid"
                      >
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center px-2 py-2">
                    Không có bình luận nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

            {showCommentDetails && selectedComment && (
              <div className="mt-4 p-4 bg-[rgba(0,0,0,0.6)] border border-[#F5CF49] rounded">
                <h3 className="text-xl text-white">Chi tiết bình luận</h3>

                <p className="text-[18px] sm:text-[16px] text-white mb-2 break-words">
                  <strong className="text-white inline whitespace-nowrap">Tên phim: </strong>
                  <span className="inline">{selectedComment.movieName}</span>
                </p>

                <p className="text-[18px] sm:text-[16px] text-white mb-2 break-words">
                  <strong className="text-white inline whitespace-nowrap">Nội dung: </strong>
                  <span className="inline">{selectedComment.content}</span>
                </p>

                <p className="text-white">
                  <strong className="text-white">Ngày bình luận:</strong>{" "}
                  {new Date(selectedComment.timestamp).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
                <button
                  onClick={() => toggleCommentDetails(null)}
                  className="mt-2 bg-red-500 text-white rounded px-2 py-1"
                >
                  Đóng
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;