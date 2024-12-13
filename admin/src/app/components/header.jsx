import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faSignOutAlt, faIdCard, faUser, faTags, faTasks, faTicketAlt, faCommentDots, faFilm, faCalendarCheck, faChartPie, faCog } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // Thêm trạng thái để kiểm tra quyền admin
    const router = useRouter();

    useEffect(() => {
        const token = document.cookie.split(';').find(c => c.trim().startsWith('adminToken='));
        const tokenValue = token?.split('=')[1];

        if (!tokenValue) {
            router.push('/login');
        } else {
            setIsLoggedIn(true);
            const getUser = async () => {
                try {
                    const response = await fetch('http://localhost:3000/admin/detailadmin', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${tokenValue}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUser(data);
                        setIsAdmin(data.Quyen === 'Admin'); // Kiểm tra quyền admin
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
    }, [router]);

    const handleLogout = () => {
        document.cookie = 'adminToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
        setIsLoggedIn(false);
        router.push('/login');
    };

    return (
        <>
            <header className="app-header">
                <a className="app-sidebar__toggle" href="#" data-toggle="sidebar" aria-label="Hide Sidebar"></a>
                <ul className="app-nav">
                    <li>
                        <button onClick={handleLogout} className="app-nav__item">
                            <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
                        </button>
                    </li>
                </ul>
            </header>
            <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
            <aside className="app-sidebar">
                <Link href="/">
                    <div className="app-sidebar__user mb-2">
                        <img className="app-sidebar__user-avatar mb-2" src={`http://localhost:3000/${user?.Anh}`} alt="User   Image" />
                        <div>
                            <p className="app-sidebar__user-name"><b>{user?.HoTen || "Admin"}</b></p>
                            <p className="app-sidebar__user-designation">Chào mừng bạn trở lại</p>
                        </div>
                    </div>
                </Link>
                <hr />
                <ul className="app-menu">
                    <li>
                        <Link className="app-menu__item" href="/">
                            <FontAwesomeIcon icon={faCartShopping} className="app-menu__icon w-4 h-4" />
                            <span className="app-menu__label">Bảng điều khiển</span>
                        </Link>
                    </li>
                    {isAdmin && (
                        <li>
                            <Link className="app-menu__item" href="/revenuestatistics">
                                <FontAwesomeIcon icon={faChartPie} className="app-menu__icon w-4 h-4" />
                                <span className="app-menu__label">Báo cáo doanh thu</span>
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link className="app-menu__item" href="/showtimes">
                            <FontAwesomeIcon icon={faFilm} className="app-menu__icon w-4 h-4" />
                            <span className="app-menu__label">Quản lý suất chiếu</span>
                        </Link>
                    </li>
                    {isAdmin && (
                        <>
                            {/* <li>
                                <Link className="app-menu__item" href="/admin">
                                    <FontAwesomeIcon icon={faIdCard} className="app-menu__icon w-4 h-4" />
                                    <span className="app-menu__label">Quản lý admin</span>
                                </Link>
                            </li> */}
                            <li>
                                <Link className="app-menu__item" href="/employee">
                                    <FontAwesomeIcon icon={faIdCard} className="app-menu__icon w-4 h-4" />
                                    <span className="app-menu__label">Quản lý nhân viên</span>
                                </Link>
                            </li>
                            <li>
                                <Link className="app-menu__item" href="/customer">
                                    <FontAwesomeIcon icon={faUser} className="app-menu__icon w-4 h-4" />
                                    <span className="app-menu__label">Quản lý khách hàng</span>
                                </Link>
                            </li></>
                    )}
                    <li>
                        <Link className="app-menu__item" href="/movie">
                            <FontAwesomeIcon icon={faTags} className="app-menu__icon w-4 h-4" />
                            <span className="app-menu__label">Quản lý phim</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/categories">
                            <FontAwesomeIcon icon={faTasks} className="app-menu__icon w-4 h-4" />
                            <span className="app-menu__label">Quản lý thể loại</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/invoice">
                            <FontAwesomeIcon icon={faTicketAlt} className="app-menu__icon w-4 h-4" />
                            <span className="app-menu__label">Quản lý hóa đơn</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/combo">
                            <FontAwesomeIcon icon={faTasks} className="app-menu__icon w-4 h-4" />
                            <span className="app-menu__label">Quản lý Combo</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/comment">
                            <FontAwesomeIcon icon={faCommentDots} className="app-menu__icon w-4 h-4" />
                            <span className="app-menu__label">Quản lý bình luận</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/theater">
                            <FontAwesomeIcon icon={faFilm} className="app-menu__icon w-4 h-4" />
                            <span className="app-menu__label">Quản lý rạp</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/event">
                            <FontAwesomeIcon icon={faCalendarCheck} className="app-menu__icon w-4 h-4" />
                            <span className="app-menu__label">Quản lí khuyến mãi</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/blog">
                            <FontAwesomeIcon icon={faChartPie} className="app-menu__icon w-4 h-4" />
                            <span className="app-menu__label">Quản lí blog</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="#">
                            <FontAwesomeIcon icon={faCog} className="app-menu__icon w-4 h-4" />
                            <span className="app-menu__label">Cài đặt hệ thống</span>
                        </Link>
                    </li>
                </ul>
            </aside>
        </>
    );
};

export default Header;