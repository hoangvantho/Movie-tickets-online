import MovieList from "../component/MovieList";

const DangChieu = () => {
  return <MovieList apiUrl="http://localhost:3000/movie/movies?trangThai=dangchieu" title="Phim Đang Chiếu" />;
};

export default DangChieu;