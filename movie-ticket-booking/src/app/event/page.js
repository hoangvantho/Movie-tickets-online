"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const EventPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/event");
        if (!response.ok) throw new Error("Failed to fetch events.");
        const data = await response.json();
        setEvents(data); // Store fetched events in state
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchEvents(); // Call the fetch function when component mounts
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#2C2C2C' }}>
      <div className="max-w-[1410px] w-full">
        <h1 className="text-3xl font-bold mt-10 mb-10 text-[#F5CF49]">Chương Trình Khuyến Mãi</h1>
        <div className="space-y-6 mb-4">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="mb-8 flex flex-col md:flex-row overflow-hidden rounded-lg shadow"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)' }}
            >
              {/* Conditionally render the layout based on index */}
              {index % 2 === 0 ? (
                // Image on the left for even index
                <>
                  <div className="md:w-1/2 h-[300px] md:h-[450px] flex justify-center items-center">
                    <img
                      src={event.Anh}
                      alt={event.Ten}
                      layout="intrinsic"
                      className="object-cover w-[600px] h-[350px]"
                    />
                  </div>
                  <div className="p-8 md:w-1/2 flex flex-col justify-between">
                    <h2 className="text-[32px] font-semibold text-[#F5CF49]">{event.Ten}</h2>
                    <p className="text-gray-300 mb-2">{event.NoiDung}</p>
                    <div className="text-white justify-between">
                      <p>Ngày bắt đầu: <span className="font-medium">{event.NgayBatDau}</span></p>
                      <p className="mb-5">Ngày kết thúc: <span className="font-medium">{event.NgayKetThuc}</span></p>
                      <p className="font-semibold">Lưu ý</p>
                      <span className="font-medium">{event.Luuy}</span>
                      <p className="mt-2 font-semibold">Điều kiện</p>
                      <span className="font-medium">{event.DieuKien}</span>
                    </div>
                    <Link href="/movielist">
                      <button className="mt-6 bg-[#F5CF49] text-black py-2 px-4 rounded hover:bg-[#e0b52e] transition duration-200 text-lg font-semibold">
                        Đặt Vé Ngay
                      </button>
                    </Link>
                  </div>
                </>
              ) : (
                // Image on the right for odd index
                <>
                  <div className="p-8 md:w-1/2 flex flex-col justify-between">
                    <h2 className="text-[32px] font-semibold text-[#F5CF49]">{event.Ten}</h2>
                    <p className="text-gray-300 mb-4">{event.NoiDung}</p>
                    <div className="text-white">
                      <p>Ngày bắt đầu: <span className="font-medium">{event.NgayBatDau}</span></p>
                      <p className="mb-5">Ngày kết thúc: <span className="font-medium">{event.NgayKetThuc}</span></p>
                      <p className="font-semibold">Lưu ý</p>
                      <span className="font-medium">{event.Luuy}</span>
                      <p className="mt-2 font-semibold">Điều kiện</p>
                      <span className="font-medium">{event.DieuKien}</span>
                    </div>
                    <Link href="/movielist">
                      <button className="mt-6 bg-[#F5CF49] text-black py-2 px-4 rounded hover:bg-[#e0b52e] transition duration-200 text-lg font-semibold">
                        Đặt Vé Ngay
                      </button>
                    </Link>
                  </div>
                  <div className="md:w-1/2 h-[300px] md:h-[450px] flex justify-center items-center">
                    <img
                      src={event.Anh}
                      alt={event.Ten}
                      layout="intrinsic"
                      className="object-cover w-[600px] h-[350px]"
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
