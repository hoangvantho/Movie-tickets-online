'use client';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isMobileSubMenuOpen, setIsMobileSubMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const router = useRouter();
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const fetchData = async (value) => {
    // Kiểm tra nếu giá trị không hợp lệ (chẳng hạn giá trị trống)
    if (!value.trim()) {
      console.log("Search term is required");
      setResults([]);  // Hoặc xử lý theo cách bạn muốn khi không có giá trị tìm kiếm
      return;
    }

    try {
      const query = encodeURIComponent(value);  // Mã hóa giá trị tìm kiếm
      const response = await fetch(`http://localhost:3000/search?name=${value}`);

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const json = await response.json();
      setResults(json);
    } catch (error) {
      console.error("Error in search:", error);
      setResults([]);
    }
  };

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      router.push(`/searchResult?name=${input}`);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  useEffect(() => {
    const token = document.cookie.split(';').find(c => c.trim().startsWith('token='));
    const tokenValue = token?.split('=')[1];

    if (tokenValue) {
      setIsLoggedIn(true);
      const getUser = async () => {
        try {
          const response = await fetch('http://localhost:3000/users/detailuser', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${tokenValue}`, // Dùng tokenValue ở đây
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            console.error('Failed to fetch user data');
            setIsLoggedIn(false);
            alert('Vui lòng đăng nhập lại.');
          }
        } catch (error) {
          console.error('An error occurred while fetching user data:', error);
          alert('Có lỗi xảy ra, vui lòng thử lại.');
        }
      };
      getUser();
    }
  }, []);

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
    setIsLoggedIn(false);
    router.push('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(prev => !prev);
  };

  const toggleMobileSubMenu = () => {
    setIsMobileSubMenuOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setIsMobileSubMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <header className="bg-[rgba(0,0,0,0.8)] relative z-10">
      <div className="max-w-[1410px] mx-auto flex items-center justify-between flex-wrap">
        <div className="flex items-center h-[100px]">
          <Link href="/">
            <img src="/images/logo.png" alt="Logo" className="w-[200px] h-[100px]" />
          </Link>
        </div>

        <div className="xl:hidden ml-auto">
          <button onClick={toggleMenu} className="text-white">
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>

        <nav className="ml-8 w-full xl:w-auto hidden xl:block">
          <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6 items-center justify-center">
            <li><Link href="/" className="text-[#FFFFFF] no-underline hover:text-[#F5CF49] transition-colors duration-300 h-[50px] flex items-center">Trang Chủ</Link></li>
            <li onMouseEnter={() => setIsSubMenuOpen(true)} // Show submenu on hover
              onMouseLeave={() => setIsSubMenuOpen(false)} className="relative text-[#FFFFFF] no-underline hover:text-[#F5CF49] transition-colors duration-300 h-[50px] flex items-center">

              Pages
              {isSubMenuOpen && (
                <ul className="absolute top-10 left-0 mt-2 bg-white pl-0 rounded shadow-lg w-[200px] z-20">
                  <li><Link href="/contact" className="block no-underline py-2 pl-[2rem] text-black hover:bg-gray-200">Liên hệ</Link></li>
                  <li><Link href="/movielist" className="block no-underline py-2 pl-[2rem] text-black hover:bg-gray-200">Danh sách phim</Link></li>
                  <li><Link href="/now-showing" className="block no-underline py-2 pl-[2rem] text-black hover:bg-gray-200">Phim đang chiếu</Link></li>
                  <li><Link href="/coming-soon" className="block no-underline py-2 pl-[2rem] text-black hover:bg-gray-200">Phim sắp chiếu</Link></li>
                </ul>
              )}
            </li>
            <li><Link href="/about" className="text-[#FFFFFF] no-underline hover:text-[#F5CF49] transition-colors duration-300">Giới thiệu</Link></li>
            <li><Link href="/showtimes" className="text-[#FFFFFF] no-underline hover:text-[#F5CF49] transition-colors duration-300">Lịch chiếu</Link></li>
            <li><Link href="/event" className="text-[#FFFFFF] no-underline hover:text-[#F5CF49] transition-colors duration-300">Sự kiện</Link></li>
          </ul>
        </nav>

        {/* Search Bar */}
        <div className="hidden lg:block relative ml-8">
          <div className="flex items-center border-2 rounded px-3 w-full max-w-md">
            <i className="fas fa-search text-white mr-2"></i>
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={input}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={handleSearch}
              className="bg-transparent text-white w-full outline-none"
            />
          </div>
        </div>

        {/* Mobile Search Icon */}
        <div className="ml-8 relative lg:hidden">
          <button className="text-white">
            <i className="fas fa-search"></i>
          </button>
        </div>

        {/* User Name or Login Button */}
        <div className="ml-8">
          {isLoggedIn ? (
            <>
              <div className='flex gap-4 items-center'>
                <div className='text-center  border-solid'>
                  <Link className='no-underline uppercase' href="/profile">
                    <Image className='rounded-full' src={`http://localhost:3000/images/${user.Anh}`} width={40} height={40} />
                  </Link>
                </div>
                <button onClick={handleLogout} className=" w-[45px] h-[30px] bg-[#F5CF49] text-[#000000] rounded hover:bg-[#2C2C2C] hover:text-[#ffffff] hover:border-2 hover:border-[#F5CF49] hover:border-solid"><FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" /></button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="hidden sm:inline-block border-2 border-[#F5CF49] bg-[#2C2C2C] text-[#FFFFFF] font-semibold w-[117px] h-[30px] rounded hover:bg-[#F5CF49] hover:text-[#000000] hover:font-bold transition uppercase text-[14px]">
                  Đăng Nhập
                </button>
              </Link>
              <Link href="/login">
                <button className="sm:hidden">
                  <i className="fas fa-user text-[#FFFFFF] text-2xl"></i>
                </button>
              </Link>
            </>
          )}
        </div>

        {isMenuOpen && (
          <div className="absolute top-[100px] left-1/2 transform -translate-x-1/2 w-[200px] bg-white z-50 xl:hidden">
            <ul className="flex flex-col items-center space-y-4 py-4">
              <li><Link href="/" className="text-black no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300">Trang Chủ</Link></li>
              <li className="relative">
                <button onClick={toggleMobileSubMenu} className="text-black no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300">Pages</button>
                {isMobileSubMenuOpen && (
                  <ul className="absolute left-0 mt-2 bg-white rounded shadow-lg w-[200px] z-50" ref={menuRef}>
                    <li><Link href="/contact" className="block px-4 py-2 text-black hover:bg-gray-200">Liên hệ</Link></li>
                    <li><Link href="/danhsachphim" className="block px-4 py-2 text-black hover:bg-gray-200">Danh sách phim</Link></li>
                    <li><Link href="/now-showing" className="block px-4 py-2 text-black hover:bg-gray-200">Phim đang chiếu</Link></li>
                    <li><Link href="/coming-soon" className="block px-4 py-2 text-black hover:bg-gray-200">Phim sắp chiếu</Link></li>
                  </ul>
                )}
              </li>
              <li><Link href="/about" className="text-black no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300">Giới thiệu</Link></li>
              <li><Link href="#" className="text-black no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300">Xem vé</Link></li>
              <li><Link href="/event" className="text-black no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300">Sự kiện</Link></li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;