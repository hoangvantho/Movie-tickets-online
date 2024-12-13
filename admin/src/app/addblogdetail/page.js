"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AddBlogForm = () => {
    const [newBlog, setNewBlog] = useState({
        MaBlog: "",
        NoiDung1: "",
        NoiDung2: "",
        NoiDung3: "",
        NoiDung4: "",
        NoiDung5: "",
        Anh: "",
    });

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBlog((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/blogdetail/add", {
                method: "POST",  // Gửi yêu cầu POST
                headers: {
                    "Content-Type": "application/json",  // Chỉ định dữ liệu là JSON
                },
                body: JSON.stringify({
                    newBlog,  // Gửi dữ liệu blog dưới dạng JSON
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to add blog");
            }

            const data = await response.json();  // Nhận dữ liệu phản hồi từ server
            alert(" Đã thêm thành công ");
            router.push('/blog');
            setNewBlog({
                MaBlog: "",
                NoiDung1: "",
                NoiDung2: "",
                NoiDung3: "",
                NoiDung4: "",
                NoiDung5: "",
                Anh: "",
            });
        } catch (err) {
            console.error("Error adding blog:", err);
        }
    };

    return (
        <main className="app-content">
            <div className="app-title"><h1>Thêm Blog Mới</h1></div>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <h3 className="tile-title">Tạo Mới Blog</h3>
                        <div className="tile-body">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="MaBlog" className="block text-sm font-medium">Mã Blog</label>
                                        <input type="text" id="MaBlog" name="MaBlog" value={newBlog.MaBlog} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md text-sm" required />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="Anh" className="block text-sm font-medium">Ảnh</label>
                                        <input type="text" id="Anh" name="Anh" value={newBlog.Anh} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md text-sm" required />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="NoiDung1" className="block text-sm font-medium">Nội Dung 1</label>
                                        <textarea id="NoiDung1" name="NoiDung1" value={newBlog.NoiDung1} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md text-sm" required />
                                    </div>

                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="NoiDung2" className="block text-sm font-medium">Nội Dung 2</label>
                                        <textarea id="NoiDung2" name="NoiDung2" value={newBlog.NoiDung2} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md text-sm" required />
                                    </div>

                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="NoiDung3" className="block text-sm font-medium">Nội Dung 3</label>
                                        <textarea id="NoiDung3" name="NoiDung3" value={newBlog.NoiDung3} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md text-sm" required />
                                    </div>

                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="NoiDung4" className="block text-sm font-medium">Nội Dung 4</label>
                                        <textarea id="NoiDung4" name="NoiDung4" value={newBlog.NoiDung4} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md text-sm" required />
                                    </div>

                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="NoiDung5" className="block text-sm font-medium">Nội Dung 5</label>
                                        <textarea id="NoiDung5" name="NoiDung5" value={newBlog.NoiDung5} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md text-sm" required />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button type="submit" className="btn btn-save mr-3">Lưu lại</button>
                                    <Link href="/blog"><button type="button" className="btn btn-cancel">Hủy bỏ</button></Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    );
};

export default AddBlogForm;