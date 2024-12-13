import MovieList from "../component/MovieList";

const SapChieu = () => {
    return <MovieList apiUrl="http://localhost:3000/movie/movies?trangThai=sapchieu" title="Phim Sắp Chiếu" />;
};

export default SapChieu;