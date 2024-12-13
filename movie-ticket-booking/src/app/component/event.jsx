"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic"; // Import dynamic để sử dụng Slider
import Link from "next/link";

// Dynamically import the slider
const Slider = dynamic(() => import('react-slick'), { ssr: false });

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/event");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return <p className="text-center">Loading events...</p>;
  }
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  // Cài đặt cho slider
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 1,
    rows: 2,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          rows: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 2
        }
      }
    ]
  };

  return (
    <section style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}>
      <div className="pt-10">
        <h1 className='text-center uppercase text-[40px] text-[#FFFFFF] font-bold mb-8'>Khuyến mãi</h1>
      </div>
      <div className="mx-auto w-full" style={{ maxWidth: '1410px', paddingBottom: '80px' }}>
        <Slider {...settings}>
          {events.map(item => (
            <div className="rounded-lg overflow-hidden" key={item.id}>
              <Link href={"/event"} >
                <img
                  src={item.Anh}
                  className="w-full h-[212px] p-2 object-cover rounded-lg" // Thêm lớp rounded-lg
                  alt={`Image ${item.id}`}
                />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Event;
