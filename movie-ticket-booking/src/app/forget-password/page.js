'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/users/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Mã xác thực đã được gửi tới email của bạn');
        router.push(`/verify-code?email=${encodeURIComponent(email)}`); // Pass email via URL
      } else {
        setMessage(data.message || 'Có lỗi xảy ra');
      }
    } catch (error) {
      setMessage('Yêu cầu thất bại, vui lòng thử lại');
      console.error('Request failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-cover bg-center w-full min-h-screen bg-[url('../../public/images/10.jpg')]">
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center p-6 sm:p-8 md:p-10 rounded-lg text-white w-[90%] sm:w-[85%] md:w-[750px] lg:w-[900px] h-auto" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl mb-5">Quên mật khẩu</h1>
        {message && <p className="text-red-500 mb-5">{message}</p>}
        <div>
          <label htmlFor="email" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 rounded-md text-sm sm:text-base bg-[#E8F0FE] text-black"
            placeholder="Nhập email của bạn"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-[520px] h-[40px] sm:h-[45px] bg-black rounded-full text-sm sm:text-lg font-bold cursor-pointer mt-5">
          {loading ? 'Đang gửi...' : 'Gửi mã xác thực'}
        </button>
      </form>


    </div>
  );
};

export default ForgotPassword;
