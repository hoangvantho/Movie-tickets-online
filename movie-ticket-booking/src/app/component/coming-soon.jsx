"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import "../../../public/styles/sapchieu.css";

const SapChieu = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:3000/movie/sapchieu");
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

  return (
    <>
      <section className="sap-chieu">
        <h2 className="sap-chieu__title">Phim sắp chiếu</h2>
        <div className="sap-chieu__container">
          <div className="sap-chieu__row">
            {movies.map((movie) => (
              <Link key={movie.id} href={`/details/${movie.id}`} passHref className="no-underline"> {/* Added class here */}
                <div className="sap-chieu__card cursor-pointer">
                  <img
                    src={movie.Anh}
                    alt={movie.Ten}
                    className="sap-chieu__image"
                  />
                  <div className="sap-chieu__overlay">
                    <p className="sap-chieu__card-title">{movie.Ten}</p>
                    <ul className="sap-chieu__info">
                      <li>
                        <i
                          className="fa-solid fa-tag"
                          style={{ color: "#FFD43B" }}
                        ></i>{" "}
                        &nbsp; {movie.TheLoai.KieuPhim}
                      </li>
                      <li>
                        <i
                          className="fa-solid fa-clock"
                          style={{ color: "#FFD43B" }}
                        ></i>{" "}
                        &nbsp; {movie.TheLoai.ThoiLuong}
                      </li>
                      <li>
                        <i
                          className="fa-solid fa-earth-americas"
                          style={{ color: "#FFD43B" }}
                        ></i>{" "}
                        &nbsp; {movie.TheLoai.QuocGia}
                      </li>
                      <li>
                        <i
                          className="fa-solid fa-comment"
                          style={{ color: "#FFD43B" }}
                        ></i>{" "}
                        &nbsp; {movie.TheLoai.NgonNgu}
                      </li>
                    </ul>
                  </div>
                  <h6 className="SapChieu-name">{movie.Ten}</h6>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="button-container">
          <button className="button-hover">
            <Link className="no-underline" href="/coming-soon">Xem thêm</Link>
          </button>
        </div>
      </section>
    </>
  );
};

export default SapChieu;