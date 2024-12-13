"use client";

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMapLocationDot, faPhone, faEnvelope, faArrowLeft, faCakeCandles, faEdit, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const EditProfile = () => {
  const [accountInfo, setAccountInfo] = useState({});
  const [updatedInfo, setUpdatedInfo] = useState({});
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    const token = document.cookie.split(';').find(c => c.trim().startsWith('token='));
    const tokenValue = token?.split('=')[1];

    if (tokenValue) {
      const getUserInfo = async () => {
        try {
          const response = await fetch('http://localhost:3000/users/detailuser', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${tokenValue}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const data = await response.json();
            setAccountInfo(data);
            setUpdatedInfo(data); // Initialize updatedInfo with current account info
          } else {
            console.error('Failed to fetch user data');
            alert('Vui lòng đăng nhập lại.');
          }
        } catch (error) {
          console.error('An error occurred while fetching user data:', error);
          alert('Có lỗi xảy ra, vui lòng thử lại.');
        }
      };

      getUserInfo();
    }
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const token = document.cookie.split(';').find(c => c.trim().startsWith('token='));
    const tokenValue = token?.split('=')[1];

    if (tokenValue) {
      try {
        const response = await fetch(`http://localhost:3000/users/updateUser/${accountInfo.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${tokenValue}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedInfo)
        });

        if (response.ok) {
          alert("Cập nhật thông tin thành công!");
          window.location.reload();
          setAccountInfo(updatedInfo); // Update accountInfo with the new info
        } else {
          console.error("Update failed");
          alert("Cập nhật không thành công. Vui lòng thử lại.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    const tokenValue = document.cookie.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1];

    if (tokenValue) {
      try {
        const response = await fetch(`http://localhost:3000/users/updatepassword/${accountInfo.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${tokenValue}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            oldPassword,
            newPassword
          })
        });

        if (response.ok) {
          alert("Đổi mật khẩu thành công!");
          // Xóa các giá trị trong form sau khi thành công
          setOldPassword('');
          setNewPassword('');
          setConfirmPassword('');
        } else {
          console.error("Update failed");
          const data = await response.json();
          alert(data.message || "Đổi mật khẩu không thành công. Vui lòng thử lại.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
      }
    }
  };



  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting...");
    const formData = new FormData();
    formData.append("Anh", selectedFile);

    try {
      const response = await fetch(`http://localhost:3000/users/updateprofilepicture/${accountInfo.id}`, {
        method: "PUT",
        body: formData,
      });
      if (!selectedFile) {
        console.log("No file selected."); // Kiểm tra xem có file đã được chọn không
        return;
      }


      if (!response.ok) {
        alert("Đã xảy ra lỗi trong quá trình cập nhật ảnh.");
      }

      const data = await response.json();
      alert("Đổi ảnh thành công!");
      window.location.reload();
      console.log(data.message); // Thông báo thành công
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex justify-center items-center w-full px-4">
      <div className="w-full max-w-[1410px]">
        <div className="relative h-[300px] bg-cover bg-center border-3 border-white mb-4" style={{ backgroundImage: "url('../images/background.png')" }}></div>
        <div className="relative -mt-20 flex flex-col md:flex-row">
          <div className="flex flex-col items-center w-full md:w-1/4" >
            <form className="relative " onSubmit={handleSubmit}>
              <img src={`http://localhost:3000/images/${accountInfo.Anh}`} alt="Profile" className="rounded-full w-36 h-36 border-5 border-white object-cover" style={{ zIndex: '99999', filter: 'blur(3px)' }} />
              <label
                htmlFor="Anh"
                className="text-[#ffff] text-xl absolute top-12 mt-3  " style={{ marginLeft: '40px' }}
              >
                Chọn ảnh
              </label>
              <input
                id="Anh"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <button type="submit" className="mt-4 bg-[#F5CF49] text-[#000000] py-2 px-5 rounded-lg ml-5" style={{ zIndex: '99999' }}>
                Lưu ảnh
              </button>

            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-5 mb-8 gap-4">
          <div className="w-full md:w-1/4 p-6 bg-[rgba(0,0,0,0.6)]  h-[300px] text-white">
            <nav className="space-y-4 ">
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
            <div className="flex justify-between mt-4 flex-col md:flex-row">
              <Link href="/profile">
                <button className="bg-[#F5CF49] text-[#000000] py-2 px-4 rounded-lg mb-2 md:mb-0 md:mr-2 w-full md:w-auto">
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-1" style={{ width: '20px', height: '20px' }} /> Quay lại
                </button>
              </Link>
            </div>
          </div>

          <div className="w-full md:w-3/4 p-6  text-white">
            <h2 className="text-3xl font-bold mb-6">CHỈNH SỬA THÔNG TIN CÁ NHÂN</h2>
            <div className="bg-[rgba(0,0,0,0.6)] p-6 rounded-lg mb-6">
              <h2 className="text-2xl font-semibold mb-4">Thông tin cá nhân</h2>
              <form onSubmit={handleSave}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                  <div className="form-group">
                    <label className="text-white" htmlFor="Ten">Họ và Tên:</label>
                    <input
                      type="text"
                      name="Ten"
                      id="Ten"
                      value={updatedInfo.Ten || ''}
                      onChange={handleChange}
                      className="w-full p-2  bg-[#E8F0FE] text-black rounded"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-white" htmlFor="sdt">SĐT:</label>
                    <input
                      type="text"
                      name="SDT"
                      id="sdt"
                      value={updatedInfo.SDT || ''}
                      onChange={handleChange}
                      className="w-full p-2  bg-[#E8F0FE] text-black rounded text-white"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-white" htmlFor="email">Email:</label>
                    <input
                      type="email"
                      name="Email"
                      id="email"
                      value={updatedInfo.Email || ''}
                      onChange={handleChange}
                      className="w-full p-2  bg-[#E8F0FE] text-black rounded text-white"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-white" htmlFor="ngaysinh">Ngày sinh:</label>
                    <input
                      type="date"
                      name="NgaySinh"
                      id="ngaysinh"
                      value={updatedInfo.NgaySinh ? new Date(updatedInfo.NgaySinh).toISOString().slice(0, 10) : ''}
                      onChange={handleChange}
                      className="w-full p-2  bg-[#E8F0FE] text-black rounded text-white"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-white" htmlFor="diachi">Địa chỉ:</label>
                    <input
                      type="text"
                      name="DiaChi"
                      id="diachi"
                      value={updatedInfo.DiaChi || ''}
                      onChange={handleChange}
                      className="w-full p-2  bg-[#E8F0FE] text-black rounded text-white"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="bg-[#F5CF49] w-[150px] text-[#000000] py-2 px-4 rounded-lg mt-4 ">
                  Cập nhật
                </button>
              </form>
            </div>

            <h2 className="text-2xl mb-2 text-white font-semibold mt-8">ĐỔI MẬT KHẨU</h2>
            <div className="bg-black bg-opacity-50 p-6 rounded-lg mb-6">
              <form onSubmit={handlePasswordChange}>
                <div className="grid grid-cols-1 gap-4">
                  <div className="form-group">
                    <label className="text-white" htmlFor="oldPassword">Mật khẩu cũ:</label>
                    <input
                      type="password"
                      id="oldPassword"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full p-2  bg-[#E8F0FE] text-black rounded text-white"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-white" htmlFor="newPassword">Mật khẩu mới:</label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-2  bg-[#E8F0FE] text-black rounded text-white"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-white" htmlFor="confirmPassword">Xác nhận mật khẩu mới:</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-2  bg-[#E8F0FE] text-black rounded text-white"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="bg-[#F5CF49] text-[#000000] py-2 px-4 rounded-lg mt-4 w-[150px]">
                  Đổi mật khẩu
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;