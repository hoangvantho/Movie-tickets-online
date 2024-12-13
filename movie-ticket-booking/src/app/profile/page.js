"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEdit } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

// Custom hook for auto-login and fetching user info
const useAutoLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    const token = document.cookie.split(';').find(c => c.trim().startsWith('token='));
    const tokenValue = token?.split('=')[1];

    if (tokenValue) {
      setIsLoggedIn(true);

      const getUserInfo = async () => {
        try {
          const response = await fetch("http://localhost:3000/users/detailuser", {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${tokenValue}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            setAccountInfo(data);
          } else {
            console.error("Failed to fetch user data");
            setIsLoggedIn(false);
            alert("Vui lòng đăng nhập lại.");
          }
        } catch (error) {
          console.error("An error occurred while fetching user data:", error);
          alert("Có lỗi xảy ra, vui lòng thử lại.");
        }
      };

      getUserInfo();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return { isLoggedIn, accountInfo };
};

function Profile() {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const { isLoggedIn, accountInfo } = useAutoLogin(); // Get the values from the custom hook

  const toggleOrderDetails = () => {
    setShowOrderDetails(!showOrderDetails);
  };

  return (
    <section className="flex flex-col justify-center items-center w-full px-4 ">
      <div className="w-full max-w-[1410px]">
        <div
          className="relative h-[300px] bg-cover bg-center border-3 border-white mb-4"
          style={{ backgroundImage: "url('../images/background1.jpg')" }}
        ></div>
        <div className="relative -mt-20 flex flex-col md:flex-row">
          <div className="flex flex-col items-center w-full md:w-1/4">
            <img
              src={`http://localhost:3000/images/${accountInfo?.Anh}`} // Profile image
              alt="Profile"
              className="rounded-full w-36 h-36 border-5 border-white object-cover"
            />
            <div className="flex justify-center mt-1">
              <h2 className="text-3xl text-center font-semibold text-white">
                {accountInfo?.Ten || "Chưa có tên"} {/* Display user's name */}
              </h2>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-5 mb-8 gap-4">
          <div className="w-full md:w-1/4 p-6 bg-[rgba(0,0,0,0.6)] text-white h-[300px]">
            <nav className="space-y-4">
              <Link
                href="/profile"
                className="flex items-center text-lg text-white no-underline"
              >
                <FontAwesomeIcon icon={faUser} className="mr-2 w-4" /> Thông tin
                khách hàng
              </Link>
              <Link
                href="/comment"
                className="flex items-center text-lg text-white no-underline"
              >
                <FontAwesomeIcon icon={faEdit} className="mr-2 w-4" /> Lịch sử
                bình luận
              </Link>
              <Link
                href="/invoice"
                className="flex items-center text-lg text-white no-underline"
              >
                <FontAwesomeIcon icon={faEdit} className="mr-2 w-4" /> Lịch sử
                mua hàng
              </Link>
            </nav>
          </div>

          {/* Show user profile information if logged in */}
          {isLoggedIn && (
            <div className="w-full md:w-3/4 p-6 text-white">
              <h1 className="text-3xl font-bold mb-6">THÔNG TIN KHÁCH HÀNG</h1>
              <div className="bg-[rgba(0,0,0,0.6)] bg-opacity-50 p-6 rounded-lg mb-6">
                <h2 className="text-2xl font-semibold mb-4">Thông tin cá nhân</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-2">Họ và tên</label>
                    <input
                      type="text"
                      defaultValue={accountInfo?.Ten || ""}
                      className="w-full p-2 bg-[#E8F0FE] text-black rounded"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Ngày sinh</label>
                    <input
                      type="text"
                      defaultValue={
                        accountInfo?.NgaySinh
                          ? new Date(accountInfo?.NgaySinh).toLocaleDateString(
                            "vi-VN",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )
                          : ""
                      }
                      className="w-full p-2 bg-[#E8F0FE] text-black rounded"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Số điện thoại</label>
                    <input
                      type="text"
                      defaultValue={accountInfo?.SDT || ""}
                      className="w-full p-2 bg-[#E8F0FE] text-black rounded"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Email</label>
                    <input
                      type="text"
                      defaultValue={accountInfo?.Email || ""}
                      className="w-full p-2 bg-[#E8F0FE] text-black rounded"
                      readOnly
                    />
                  </div>


                  {/* Button to Edit Profile */}
                  <div className="flex justify-between mt-4 flex-col md:flex-row">
                    <Link href="/editprofile">
                      <button className="bg-[#F5CF49] font-bold text-[#000000] py-2 px-4 rounded-lg mb-2 md:mb-0 md:mr-2 w-full md:w-auto">
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="mr-1 "
                          style={{ width: "20px", height: "20px" }}
                        />{" "}
                        Sửa
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
