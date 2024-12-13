// src/app/search.js
"use client";
import React from 'react';
import { useRouter } from 'next/navigation'; // Dùng đúng useRouter
import MovieList from '../component/MovieList'; // MovieList component

const SearchPage = () => {
  const router = useRouter();
  const { query } = router;

  return (
    <div className="search-results">
      <h2>Kết quả tìm kiếm cho: {query.name}</h2>
      <MovieList apiUrl={`http://localhost:3000/`} title={`Kết quả tìm kiếm cho "${query.name}"`} />
    </div>
  );
};

export default SearchPage;
