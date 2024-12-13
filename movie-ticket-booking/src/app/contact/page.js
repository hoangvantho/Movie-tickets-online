// pages/contact.js
"use client";
import React, { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra thông tin trước khi gửi
    if (!name || !email || !message) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    // Xử lý gửi thông tin (có thể gửi đến API hoặc gửi email)
    // Ở đây chỉ là một ví dụ đơn giản
    console.log("Tên:", name);
    console.log("Email:", email);
    console.log("Tin nhắn:", message);

    setSuccessMessage("Cảm ơn bạn đã liên hệ với chúng tôi!");
    setName("");
    setEmail("");
    setMessage("");
    setErrorMessage("");
  };

  return (
    <section className="bg-[rgba(0,0,0,0.3)] py-8">
      <div className="container bg-[rgba(0,0,0,0.6)] mx-auto px-4 max-w-[600px]">
        <h1 className="text-center text-[30px] font-bold text-[#F5CF49] mb-4">Liên Hệ Chúng Tôi</h1>
        
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        {successMessage && <div className="text-green-500">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="bg-[rgba(0,0,0,0.6)] text-[#FFFFFF] p-6 rounded shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-[#FFF]">Tên của bạn</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-[#E8F0FE] text-black border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-[#FFF]">Email của bạn</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-[#E8F0FE] text-black border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-[#FFF]">Tin nhắn</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full text-black p-2 border border-gray-300 rounded"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#F5CF49] text-black font-bold py-2 px-4 rounded hover:bg-yellow-300"
          >
            Gửi
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;