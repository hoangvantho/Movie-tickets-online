'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Tải react-slick chỉ khi component được mounted
const Slider = dynamic(() => import('react-slick'), { ssr: false });

const Banner = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setIsMounted(true);
    // Fetch dữ liệu từ API
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:3000/movie');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchMovies();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Tắt mũi tên điều hướng nếu bạn không cần
  };

  if (!isMounted) return null; // Trả về null nếu chưa mounted

  return (
    <section className="bg-[#2C2C2C] py-6">
      <div className="max-w-[1410px] mx-auto">
        <Slider {...settings}>
          {movies.map((movie) => (
            <div key={movie._id} className="mx-auto bg-[rgba(0,0,0,0.6)] py-6 rounded-lg h-[440px]">
              <div className="flex flex-col md:flex-row items-center justify-around h-full">
                <div className="textBox mb-4 md:mb-0 text-center md:text-left text-white ml-20">
                  <h2 className="text-2xl font-bold mb-2">{movie.Ten}</h2>
                  <div className="text-center mt-20">
                    <Link href={`/details/${movie.id}`}><button className="border-2 border-[#F5CF49] bg-[#2C2C2C] text-[#FFFFFF] font-semibold w-[150px] h-[40px] rounded hover:bg-[#F5CF49] hover:text-[#000000] transition uppercase text-[16px]">Xem thêm</button></Link>
                  </div>
                </div>
                <div className="imageBox flex justify-center mr-20"><img src={movie.Anh} alt={movie.Ten} className="w-full h-[392px]" /></div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Banner;