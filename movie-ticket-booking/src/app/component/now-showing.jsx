"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import "../../../public/styles/sapchieu.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute right-[-25px] top-1/2 transform -translate-y-1/2 bg-[#2C2C2C] border-2 border-[#F5CD49] rounded-full w-10 h-10 flex items-center justify-center cursor-pointer z-10"
      onClick={onClick}
      style={{ width: '40px', height: '40px' }}
    >
      <i className="fa-solid fa-chevron-right text-white text-lg"></i>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute left-[-25px] top-1/2 transform -translate-y-1/2 bg-[#2C2C2C] border-2 border-[#F5CD49] rounded-full w-10 h-10 flex items-center justify-center cursor-pointer z-10"
      onClick={onClick}
      style={{ width: '40px', height: '40px' }}
    >
      <i className="fa-solid fa-chevron-left text-white text-lg"></i>
    </div>
  );
};

const DangChieu = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/movie/dangchieu"
        );
        console.log("Response status:", response.status);
        if (!response.ok) throw new Error("Failed to fetch movies.");

        const data = await response.json();
        console.log("Fetched data:", data);
        setMovies(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchMovies();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="dang-chieu">
      <div className=" bg-[#000000]">
        <div
          className="dang-chieu__container mx-auto py-8 max-w-full"
          style={{
            maxWidth: "1410px",
            height: "550px",
            backgroundImage: "url(/images/background.png)",
          }}
        >
          <h2 className="sap-chieu__title pt-4">Phim đang chiếu</h2>
          <div className="sap-chieu__slider">
            <Slider {...settings}>
              {movies.map((movie) => (
                <Link href={`/details/${movie.id}`}>
                  <div key={movie.id} className="sap-chieu__card mx-3">
                    <img
                      src={movie.Anh}
                      alt={movie.Ten}
                      className="w-full max-w-[250px] h-auto cursor-pointer"
                    />
                    <div className="sap-chieu__overlay">
                      <p className="sap-chieu__card-title">{movie.Ten}</p>
                      <ul className="sap-chieu__info">
                        <li>
                          <i className="fa-solid fa-tag text-yellow-400"></i>
                          &nbsp; {movie.TheLoai.KieuPhim}
                        </li>
                        <li>
                          <i className="fa-solid fa-clock text-yellow-400"></i>
                          &nbsp; {movie.TheLoai.ThoiLuong}
                        </li>
                        <li>
                          <i className="fa-solid fa-earth-americas text-yellow-400"></i>
                          &nbsp; {movie.TheLoai.QuocGia}
                        </li>
                        <li>
                          <i className="fa-solid fa-comment text-yellow-400"></i>
                          &nbsp; {movie.TheLoai.NgonNgu}
                        </li>
                      </ul>
                    </div>
                  </div>
                </Link>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DangChieu;
