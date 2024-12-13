'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { ToastContainer, toast, Bounce } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho Toastify
import Cookies from 'js-cookie';

const QuanLiAdmin = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAdmin, setCurrentAdmin] = useState(null);
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);  // State to store super admin check result

    useEffect(() => {
        const adminToken = Cookies.get('adminToken');

        if (adminToken) {
            try {
                const decodedToken = JSON.parse(atob(adminToken.split('.')[1]));
                if (decodedToken.Quyen === 'Admin') {
                    setIsSuperAdmin(true);
                } else {
                    setIsSuperAdmin(false);
                }
            } catch (error) {
                console.error('Lỗi giải mã token:', error);
                setIsSuperAdmin(false);
            }
        } else {
            setIsSuperAdmin(false);
        }
    }, []);

    useEffect(() => {
        const fetchAdmins = async () => {
            if (!isSuperAdmin) {
                toast.error('Bạn không có quyền truy cập vào danh sách admin.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/admin', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${Cookies.get('adminToken')}`,
                    },
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Có lỗi xảy ra khi lấy dữ liệu admin.');
                }

                const data = await response.json();
                setAdmins(data);
            } catch (error) {
                console.error('Có lỗi xảy ra khi lấy dữ liệu admin:', error);
            } finally {
                setLoading(false);
            }
        };

        if (isSuperAdmin) {
            fetchAdmins();
        }
    }, [isSuperAdmin]);

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^[0-9]{10}$/; // Kiểm tra số điện thoại có đúng 10 chữ số không
        return phoneRegex.test(phone);
    };

    const handleEditClick = async (adminId) => {
        const response = await fetch(`http://localhost:3000/admin/${adminId}`);
        const data = await response.json();
        setCurrentAdmin(data);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentAdmin(null);
        setFile(null);
        setErrorMessage(''); // Reset thông báo lỗi khi đóng modal
    };

    const handleSave = async () => {
        if (currentAdmin) {
            if (!validatePhoneNumber(currentAdmin.SDT)) {
                setErrorMessage('Số điện thoại phải có 10 chữ số.');
                return; // Ngừng thực hiện nếu số điện thoại không hợp lệ
            }

            const response = await fetch(`http://localhost:3000/admin/check-username`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ SDT: currentAdmin.SDT, id: currentAdmin._id })
            });

            const result = await response.json();
            if (!response.ok) {
                setErrorMessage(result.message);
                return; // Ngừng thực hiện nếu số điện thoại đã tồn tại
            }

            const formData = new FormData();
            formData.append('HoTen', currentAdmin.HoTen);
            formData.append('TenDangNhap', currentAdmin.TenDangNhap);
            formData.append('MatKhau', currentAdmin.MatKhau); // Nếu cần thiết
            formData.append('DiaChi', currentAdmin.DiaChi);
            formData.append('NgaySinh', currentAdmin.NgaySinh);
            formData.append('GioTinh', currentAdmin.GioTinh);
            formData.append('SDT', currentAdmin.SDT);
            formData.append('ChucVu', currentAdmin.ChucVu);
            formData.append('Tinhtrang', currentAdmin.Tinhtrang);
            if (file) {
                formData.append('Anh', file); // Thêm ảnh mới vào formData
            }

            try {
                await fetch(`http://localhost:3000/admin/edit/${currentAdmin._id}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${Cookies.get('adminToken')}`,
                    },
                    body: formData,
                });

                // Cập nhật danh sách admin mà không cần tải lại trang
                setAdmins((prev) =>
                    prev.map((adm) =>
                        adm._id === currentAdmin._id
                            ? { ...currentAdmin, Anh: file ? `/images/${file.name}` : adm.Anh }
                            : adm
                    )
                );

                toast.success('Cập nhật admin thành công!', {
                    position: 'top-right',
                    autoClose: 3000,
                });
                handleCloseModal();
            } catch (error) {
                console.error('Có lỗi xảy ra khi cập nhật admin:', error);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentAdmin((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDelete = async (adminId) => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa admin này không?');

        if (confirmDelete) {
            try {
                await fetch(`http://localhost:3000/admin/delete/${adminId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${Cookies.get('adminToken')}`,
                    },
                });

                setAdmins((prev) => prev.filter((adm) => adm._id !== adminId));
                toast.success('Xóa admin thành công!', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            } catch (error) {
                console.error('Có lỗi xảy ra khi xóa admin:', error);
            }
        }
    };

    return (
        <>
            <main className="app-content">
                <Head>
                    <title>Danh sách admin</title>
                </Head>
                <div className="app-title">
                    <ul className="app-breadcrumb breadcrumb side">
                        <li className="breadcrumb-item active">
                            <a href="#"><b>Danh sách admin</b></a>
                        </li>
                    </ul>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="tile">
                            <div className="tile-body">
                                <div className="row element-button">
                                    <div className="col-sm-2">
                                        <Link href="/addadmin" className="btn btn-add">
                                            <FontAwesomeIcon icon={faPlus} /> Thêm mới
                                        </Link>
                                    </div>
                                </div>
                                <table className="table table-hover table-bordered js-copytextarea" id="sampleTable">
                                    <thead>
                                        <tr>
                                            <th width="50">STT</th>
                                            <th>Họ và tên</th>
                                            <th>Tài khoản</th>
                                            <th>Ảnh thẻ</th>
                                            <th>Địa chỉ</th>
                                            <th>Ngày sinh</th>
                                            <th>Giới tính</th>
                                            <th>SĐT</th>
                                            <th>Chức vụ</th>
                                            <th>Tình trạng</th>
                                            <th>Tính năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {admins.length > 0 ? (
                                            admins.map((admin, index) => (
                                                <tr key={admin._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{admin.HoTen}</td>
                                                    <td>{admin.TenDangNhap}</td>
                                                    <td><img className="w-12 h-12 rounded-full object-cover" src={`http://localhost:3000/${admin.Anh}`} alt={admin.HoTen} /></td>
                                                    <td>{admin.DiaChi}</td>
                                                    <td>{admin.NgaySinh}</td>
                                                    <td>{admin.GioTinh}</td>
                                                    <td>{admin.SDT}</td>
                                                    <td>{admin.ChucVu}</td>
                                                    <td>{admin.Tinhtrang}</td>
                                                    <td>
                                                        <button className="btn btn-primary mr-3" type=" button" onClick={() => handleEditClick(admin._id)}>
                                                            <FontAwesomeIcon icon={faPenToSquare} />
                                                        </button>
                                                        <button className="btn btn-danger" type="button" onClick={() => handleDelete(admin._id)}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="10">Không có admin nào được tìm thấy</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal chỉnh sửa admin */}
            <div className={`modal fade ${isModalOpen ? 'show' : ''}`} id="ModalUP" tabIndex="-1" role="dialog" aria-hidden={!isModalOpen} data-backdrop="static" data-keyboard="false" style={{ display: isModalOpen ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="row">
                                <div className="form-group col-md-12">
                                    <h5>Chỉnh sửa thông tin admin</h5>
                                    {errorMessage && <p className="text-danger">{errorMessage}</p>} {/* Hiển thị thông báo lỗi */}
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label className="control-label">ID admin</label>
                                    <input className="form-control" type="text" value={currentAdmin?._id || ''} disabled />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="control-label">Họ và tên</label>
                                    <input className="form-control" type="text" name="HoTen" value={currentAdmin?.HoTen || ''} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="control-label">Tài khoản</label>
                                    <input className="form-control" type="text" value={currentAdmin?.TenDangNhap || ''} disabled />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="control-label">Số điện thoại</label>
                                    <input className="form-control" type="text" name="SDT" value={currentAdmin?.SDT || ''} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="control-label">Địa chỉ</label>
                                    <input className="form-control" type="text" name="DiaChi" value={currentAdmin?.DiaChi || ''} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="control-label">Ngày sinh</label>
                                    <input className="form-control" type="date" name="NgaySinh" value={currentAdmin?.NgaySinh?.split('T')[0] || ''} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="control-label">Giới tính</label>
                                    <select className="form-control" name="GioTinh" value={currentAdmin?.GioTinh || ''} onChange={handleInputChange} required>
                                        <option value="">Chọn giới tính</option>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="control-label">Chức vụ</label>
                                    <select className="form-control" name="ChucVu" value={currentAdmin?.ChucVu || ''} onChange={handleInputChange}>
                                        <option >Quản trị viên</option>
                                        <option >Quản lý</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="control-label">Tình trạng</label>
                                    <select className="form-control" name="Tinhtrang" value={currentAdmin?.Tinhtrang || ''} onChange={handleInputChange}>
                                        <option value="">Chọn tình trạng</option>
                                        <option value="Hoạt động">Hoạt động</option>
                                        <option value="Nghỉ việc">Nghỉ việc</option>
                                        <option value="Tạm nghỉ">Tạm nghỉ</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="control-label">Ảnh thẻ</label>
                                    <input className="form-control" type="file" onChange={handleFileChange} />
                                </div>
                            </div>
                            <button className="btn btn-save mr-3" type="button" onClick={handleSave}>Lưu lại</button>
                            <button className="btn btn-cancel" type="button" onClick={handleCloseModal}>Hủy bỏ</button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer transition={Bounce} />
        </>
    );
};

export default QuanLiAdmin;