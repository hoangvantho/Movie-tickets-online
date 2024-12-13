"use client"; // Đảm bảo đây là Client Component
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Sử dụng 'next/navigation' cho Next.js 13+

const BlogSection = () => {
  const router = useRouter(); // Initialize useRouter
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:3000/blog/limit/?limit=10");
        if (!response.ok) {
          throw new Error("lỗi ở fetch blogs");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = (id) => {
    router.push(`/blogdetail?id=${id}`); 
  };

  if (loading) {
    return <p className="text-center">Loading blogs...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <section className="text-white py-8" style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)' }}>
      <h2 className="font-bold text-[#F5CF49] text-center text-[30px] mb-2">Blog Phim Ảnh</h2>
      <h6 className="mb-6 text-center text-[#737373] text-[17px] font-normal mb-[55px]">
        Tổng hợp và Review các bộ phim hot, bom tấn, phim chiếu rạp hay mỗi ngày
      </h6>
      <div className="mx-auto mb-[40px]" style={{ maxWidth: '1410px' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[15px]">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => handleBlogClick(blog.id)}
            >
              <img
                src={`${blog.Anh}`} // Adjust this path as needed
                alt={blog.TenBlog}
                className="w-[270px] h-[122px] object-cover rounded-[4px]"
              />
              <div className="p-2">
                <h3 className="text-xl font-semibold mb-2">{blog.TenBlog}</h3>
                <p className="text-sm">{blog.LuotXem} lượt xem</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mb-[20px]">
        <button className="border-2 font-bold hover:font-bold border-[#F5CF49] bg-[#2C2C2C] text-[#FFFFFF] font-semibold w-[150px] h-[40px] rounded hover:bg-[#F5CF49] hover:text-[#000000]  text-[16px]">
          Xem thêm
        </button>
      </div>
    </section>
  );
};

export default BlogSection;