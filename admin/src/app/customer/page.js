'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify'; // Thêm import cho ToastContainer và toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho Toast

const TaiKhoan = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('http://localhost:3000/account/');
        const data = await response.json();
        setAccounts(data);
        setLoading(false);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu tài khoản:', error);
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  const handleDelete = async (accountId) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa tài khoản này không?');

    if (confirmDelete) {
      try {
        await fetch(`http://localhost:3000/account/delete/${accountId}`, {
          method: 'DELETE',
        });

        setAccounts((prev) => prev.filter((acc) => acc._id !== accountId));
        toast.success('Xóa tài khoản thành công!');
      } catch (error) {
        console.error('Có lỗi xảy ra khi xóa tài khoản:', error);
        toast.error('Có lỗi xảy ra khi xóa tài khoản.');
      }
    }
  };

  const handleLock = async (accountId) => {
    const confirmLock = window.confirm('Bạn có chắc chắn muốn khóa tài khoản này không?');

    if (confirmLock) {
      try {
        await fetch(`http://localhost:3000/account/lock/${accountId}`, {
          method: 'PUT',
        });

        setAccounts((prev) =>
          prev.map((acc) => (acc._id === accountId ? { ...acc, IsLocked: true } : acc))
        );

        toast.success('Khóa tài khoản thành công!');
      } catch (error) {
        console.error('Có lỗi xảy ra khi khóa tài khoản:', error);
        toast.error('Có lỗi xảy ra khi khóa tài khoản.');
      }
    }
  };

  const handleUnlock = async (accountId) => {
    const confirmUnlock = window.confirm('Bạn có chắc chắn muốn mở khóa tài khoản này không?');

    if (confirmUnlock) {
      try {
        await fetch(`http://localhost:3000/account/unlock/${accountId}`, {
          method: 'PUT',
        });

        setAccounts((prev) =>
          prev.map((acc) => (acc._id === accountId ? { ...acc, IsLocked: false } : acc))
        );

        toast.success('Mở khóa tài khoản thành công!');
      } catch (error) {
        console.error('Có lỗi xảy ra khi mở khóa tài khoản:', error);
        toast.error('Có lỗi xảy ra khi mở khóa tài khoản.');
      }
    }
  };

  return (
    <>
      <main className="app-content">
        <Head>
          <title>Danh sách tài khoản</title>
        </Head>
        <div className="app-title">
          <ul className="app-breadcrumb breadcrumb side">
            <li className="breadcrumb-item active">
              <a href="#"><b>Danh sách tài khoản</b></a>
            </li>
          </ul>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <div className="tile-body">
                <div className="row element-button">
                  <div className="col-sm-2">
                  </div>
                </div>
                <table className="table table-hover table-bordered js-copytextarea" id="sampleTable">
                  <thead>
                    <tr>
                      <th width="50">STT</th>
                      <th>Tên</th>
                      <th>Tên đăng nhập</th>
                      <th>Ảnh thẻ</th>
                      <th>Địa chỉ</th>
                      <th>Ngày sinh</th>
                      <th>Giới tính</th>
                      <th>SĐT</th>
                      <th>Email</th>
                      <th width="130">Tính năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts.length > 0 ? (
                      accounts.map((account, index) => (
                        <tr key={account._id}>
                          <td>{index + 1}</td>
                          <td>{account.Ten}</td>
                          <td>{account.TenDangNhap}</td>
                          <td><img className="w-12 h-12 rounded-full object-cover" src={`http://localhost:3000/images/${account.Anh}`} alt={account.Ten} /></td>
                          <td>{account.DiaChi}</td>
                          <td>{account.NgaySinh}</td>
                          <td>{account.GioiTinh}</td>
                          <td>{account.SDT}</td>
                          <td>{account.Email}</td>
                          <td>
                            <button className="btn btn-danger mr-3" type="button" onClick={() => handleDelete(account._id)}>
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                            {account.IsLocked ? (
                              <button className="btn btn-success" type="button" onClick={() => handleUnlock(account._id)}>
                                <FontAwesomeIcon icon={faUnlock} />
                              </button>
                            ) : (
                              <button className="btn btn-warning" type="button" onClick={() => handleLock(account._id)}>
                                <FontAwesomeIcon icon={faLock} />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10">Không có tài khoản nào được tìm thấy</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ToastContainer /> {/* Thêm ToastContainer vào cuối để hiển thị thông báo */}
    </>
  );
};

export default TaiKhoan;
