'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const VerifyCode = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email'); // Get email from query

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/users/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: email, verificationCode }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('resetEmail', email); // Store email only after successful verification
        router.push('/reset-password'); // Redirect to reset password page
      } else {
        setMessage(data.message || 'Mã xác thực không chính xác');
      }
    } catch (error) {
      setMessage('Có lỗi xảy ra, vui lòng thử lại');
      console.error('Verification failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-cover bg-center w-full min-h-screen bg-[url('../../public/images/10.jpg')]">
      <form onSubmit={handleVerificationSubmit} className="flex flex-col justify-center items-center p-6 sm:p-8 md:p-10 rounded-lg text-white w-[90%] sm:w-[85%] md:w-[750px] lg:w-[900px] h-auto"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl mb-5">Nhập mã xác thực</h1>
        {message && <p className="text-red-500">{message}</p>}
        <div>
          <label htmlFor="verificationCode" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">Mã xác thực:</label>
          <input
            type="text"
            id="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
            className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 rounded-md text-sm sm:text-base bg-[#E8F0FE] text-black "
            placeholder="Nhập mã xác thực"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-[520px] h-[40px] sm:h-[45px] bg-black rounded-full text-sm sm:text-lg font-bold cursor-pointer mt-5"
        >
          {loading ? 'Đang xác thực...' : 'Xác nhận mã'}
        </button>
      </form>
    </div>


  );
};

export default VerifyCode;
