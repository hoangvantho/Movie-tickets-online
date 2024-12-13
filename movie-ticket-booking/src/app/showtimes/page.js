"use client"; // Đánh dấu đây là Client Component
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link từ Next.js

const LichChieuPage = () => {
  const [lichChieu, setLichChieu] = useState([]);
  const [theLoaiList, setTheLoaiList] = useState([]);

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const lichChieuResponse = await fetch("http://localhost:3000/showtimes/dangchieu");
        const theLoaiResponse = await fetch("http://localhost:3000/categories");

        const lichChieuData = await lichChieuResponse.json();
        const theLoaiData = await theLoaiResponse.json();

        // Kết hợp thông tin thể loại và chuyển đổi 'GioChieu' thành mảng
        const lichChieuWithTheLoai = lichChieuData.map((item) => {
          const matchedTheLoai = theLoaiData.find(tl => tl.id === item.IdPhim); // Sửa ID cho đúng mối quan hệ
          return {
            ...item,
            theLoai: matchedTheLoai ? matchedTheLoai.Ten : "Không xác định", // Lấy tên thể loại
            gio: item.GioChieu.split(","), // Chuyển đổi chuỗi thời gian thành mảng
          };
        });

        // Gộp các phim có cùng tên và ngày chiếu
        const groupedMovies = [];
        lichChieuWithTheLoai.forEach(phim => {
          const found = groupedMovies.find(group =>
            group.Ten === phim.Ten && group.NgayChieu === phim.NgayChieu
          );

          if (found) {
            // Nếu đã có phim trong nhóm, thêm khung giờ vào
            found.gio.push(...phim.gio);
          } else {
            // Nếu chưa có, tạo mới một nhóm
            groupedMovies.push({ ...phim, gio: [...phim.gio] });
          }
        });

        // Sắp xếp các giờ chiếu theo thứ tự
        groupedMovies.forEach(phim => {
          phim.gio.sort((a, b) => {
            const timeA = a.split(':').reduce((acc, time) => (60 * acc) + +time); // Chuyển đổi giờ thành phút
            const timeB = b.split(':').reduce((acc, time) => (60 * acc) + +time);
            return timeA - timeB; // Sắp xếp theo thứ tự tăng dần
          });
        });

        setLichChieu(groupedMovies);
        setTheLoaiList(theLoaiData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  const [selectedDate, setSelectedDate] = useState('');

  const filteredMovies = lichChieu.filter(phim =>
    (selectedDate === '' || phim.NgayChieu === selectedDate)
  );

  return (
    <div className="text-white min-h-screen p-5 bg-[rgba(0,0,0,0.3)]">
      <div className="max-w-[1410px] mx-auto mb-10">
        <h1 className="text-3xl font-bold mb-10">Lịch Chiếu Phim</h1>

        <div className="grid grid-cols-1 gap-4">
          {filteredMovies.map((phim) => (
            <div key={phim._id} className="p-4 rounded-lg shadow bg-[rgba(0,0,0,0.6)] flex flex-col md:flex-row md:items-start">
              {/* Bên trái chứa ảnh và thể loại */}
              <div className="flex-1 flex flex-col md:flex-row">
                <div className="relative w-full md:w-[240px] h-[320px]">
                  <Image
                    src={phim.Anh || "/images/default.jpg"}
                    alt={phim.Ten}
                    layout="fill"
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="ml-0 md:ml-4 mt-4 md:mt-0 flex-1">
                  <h2 className="text-2xl font-semibold">{phim.Ten}</h2>
                  <p className="text-white mt-2">
                    <span className="font-bold">Kiểu phim:</span> {phim.KieuPhim}
                  </p>
                  <p className="text-white">
                    <span className="font-bold">Thời lượng:</span> {phim.ThoiLuong}
                  </p>
                  <p className="text-white">
                    <span className="font-bold">Đạo diễn:</span> {phim.DaoDien}
                  </p>
                  <p className="text-white">
                    <span className="font-bold">Diễn viên:</span> {phim.DienVien}
                  </p>
                </div>
              </div>

              {/* Bên phải chứa thông tin rạp và thời gian chiếu */}
              <div className="mt-4 md:mt-0 md:ml-10 flex-1">
                <p className="text-gray-400">Phòng: {phim.TenPhongChieu}</p>
                <p className="text-white">
                  <span className="font-bold">Ngày chiếu:</span> {phim.NgayChieu}
                </p>
                <div className="mt-2 flex flex-wrap">
                  {phim.gio.map((show, index) => (
                    <Link
                      key={index} // Sử dụng index cho key
                      href={`/ticket-booking/${phim.IdPhim}`} // Điều hướng đến trang đặt vé
                    >
                      <button
                        className={`bg-[#F5CF49] hover:bg-[#e6b632] text-gray-900 py-2 px-4 rounded mr-2 mb-2`}
                      >
                        {show}
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LichChieuPage;
