import MovieList from "../component/MovieList";

const DanhSachPhim = () => {
  return <MovieList apiUrl="http://localhost:3000/movie/movies" title="Danh Sách Phim" />;
};

export default DanhSachPhim;