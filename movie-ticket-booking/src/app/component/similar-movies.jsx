import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const TuongTu = ({ movieId }) => { // Nhận movieId qua props
    const [similarMovies, setSimilarMovies] = useState([]);
    const [error, setError] = useState(null); // Thêm trạng thái lỗi

    useEffect(() => {
        if (movieId) {
            fetchCategoryId(movieId);
        }
    }, [movieId]);

    const fetchCategoryId = async (movieId) => {
        try {
            const response = await axios.get(`http://localhost:3000/movie/${movieId}`);
            const categoryId = response.data.IdDanhMuc; // Lấy IdDanhMuc từ dữ liệu API

            if (categoryId) {
                fetchSimilarMovies(categoryId);
            } else {
                setError('Không tìm thấy danh mục phim.');
            }
        } catch (error) {
            console.error('Error fetching category ID:', error);
            setError('Lỗi khi tải thông tin danh mục.');
        }
    };

    const fetchSimilarMovies = async (categoryId) => {
        try {
            const response = await axios.get(`http://localhost:3000/categories/danhmuc/${categoryId}`);
            const movies = response.data;

            // Sắp xếp ngẫu nhiên các phim
            const shuffledMovies = movies.sort(() => Math.random() - 0.5);

            // Giới hạn số lượng phim là 5
            const limitedMovies = shuffledMovies.slice(0, 5);

            setSimilarMovies(limitedMovies); // Cập nhật danh sách phim tương tự
        } catch (error) {
            console.error('Error fetching similar movies:', error);
            setError('Lỗi khi tải phim tương tự.');
        }
    };

    return (
        <section className="bg-[rgba(0,0,0,0.3)] py-8">
            <h2 className="font-bold text-[#f5cf49] text-center text-4xl mb-8">Phim cùng thể loại</h2>
            <div className="max-w-[1410px] mx-auto ">
                {error && <p>{error}</p>}
                <div className="flex flex-wrap justify-center">
                    {similarMovies.map((movie) => (
                        <Link href={`/details/${movie.id}`} key={movie.id}>
                            <div className="relative w-64 h-80 m-2 overflow-hidden rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
                                <img src={movie.Anh} alt={movie.Ten} className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110" />
                                {/* Lớp phủ hiện thông tin phim khi hover */}
                                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 hover:opacity-100 rounded-lg">
                                    <h3 className="text-white text-lg font-semibold text-center mb-2 px-2">{movie.Ten}</h3>
                                    <ul className="sap-chieu__info">
                                        <li><i className="fa-solid fa-tag" style={{ color: "#FFD43B" }}></i>{" "}&nbsp; {movie.TheLoai.KieuPhim} </li>
                                        <li><i className="fa-solid fa-clock" style={{ color: "#FFD43B" }}></i>{" "} &nbsp; {movie.TheLoai.ThoiLuong}</li>
                                        <li><i className="fa-solid fa-earth-americas" style={{ color: "#FFD43B" }}></i>{" "} &nbsp; {movie.TheLoai.QuocGia}</li>
                                        <li><i className="fa-solid fa-comment" style={{ color: "#FFD43B" }} ></i>{" "}&nbsp; {movie.TheLoai.NgonNgu}</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex justify-center">  <span className="block text-center max-w-[250px] mx-auto truncate"> {movie.Ten} </span></div>
                        </Link>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default TuongTu;
