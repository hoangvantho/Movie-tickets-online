"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Bọc trang chi tiết bài viết trong Suspense
const BlogDetailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");
  const [blogDetail, setBlogDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [blogsame, setBlog] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch("http://localhost:3000/blog/limit/?limit=4");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, []);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      if (!blogId) return;
      try {
        const responseDetail = await fetch(`http://localhost:3000/blog/${blogId}/details`);
        if (!responseDetail.ok) {
          throw new Error("Không thể lấy chi tiết blog");
        }
        const dataDetail = await responseDetail.json();
        setBlogDetail(dataDetail.filter((blog) => blog.MaBlog === parseInt(blogId, 10)));

        const responseBlog = await fetch(`http://localhost:3000/blog/${blogId}`);
        if (!responseBlog.ok) {
          throw new Error("Không thể lấy thông tin blog");
        }
        const dataBlog = await responseBlog.json();
        setBlogs(dataBlog);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [blogId]);

  if (loading) return <p className="text-center">Đang tải chi tiết blog...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (blogDetail.length === 0) return <p className="text-center">Không tìm thấy chi tiết blog.</p>;

  return (
    <div className="min-h-screen bg-[#0807079c] p-4">
      <div className="max-w-[1410px] mx-auto">
        <div className="relative bg-cover bg-center h-80 rounded-lg">
          {blogs && (
            <img
              src={blogs.Anh}
              alt="Blog Image"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>
        <div className="mt-5">
          <h1 className="text-3xl font-bold">{blogs?.TenBlog}</h1>
          <p className="text-lg mt-2">{blogs?.Titil}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mt-8 justify-between">
          <div className="flex-col max-w-[1000px]">
            {blogDetail.map((blog) => (
              <main key={blog._id} className="flex-1 bg-[#000000] rounded-lg shadow p-6 overflow-auto">
                <h2 className="text-2xl text-[#F5CF49] font-bold">{blog.NoiDung1}</h2>
                <p className="mt-2 text-white">{blog.NoiDung2}</p>
                <p className="text-white">{blog.NoiDung3}</p>
                <p className="text-white">{blog.NoiDung4}</p>
                <p className="mt-4 text-white">{blog.NoiDung5}</p>

                <div className="mt-8">
                  <div className="bg-gray-200 rounded-lg shadow-lg overflow-hidden w-full">
                    <img
                      src={blog.Anh}
                      alt="Movie Poster"
                      className="w-full h-80 object-cover"
                    />
                  </div>
                </div>
              </main>
            ))}
          </div>

          <aside className="lg:w-1/3 bg-[#181616] rounded-lg shadow p-4 h-full sticky top-4">
            <h2 className="text-2xl font-semibold text-[#F5CF49] mb-4">Mục Lục</h2>
            {blogDetail.map((blog1) => (
              <ul className="mt-6">
                <li key={blog1._id} className="text-wight-500 hover:underline text-xlcursor-pointer">
                  {blog1.NoiDung1}
                </li>
              </ul>
            ))}
          </aside>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Bài viết liên quan</h2>
          <div className="grid gap-4">
            {blogsame.map((blogs) => (
              <div key={blogs.id} className="bg-black flex rounded-lg shadow p-4 mt-2">
                <img
                  src={blogs.Anh}
                  alt="Bài viết liên quan"
                  className="w-1/4 h-40 object-cover mb-2 rounded"
                />
                <div className="flex-col ml-9">
                  <p className="text-white">Tổng hợp phim</p>
                  <h3 className="text-[#f5cf49] text-2xl font-semibold">{blogs.TenBlog}</h3>
                  <p className="text-white mt-6">{blogs.Titil}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 bg-[#F5CF49] text-black py-2 px-4 rounded">Xem thêm</button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
