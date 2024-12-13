'use client';
import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần của ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Invoice = {
  _id: string;
  id: number;
  userId: number;
  NgayMua: string;
  Rap: string;
  PhuongThucThanhToan: string;
  TenPhim: string;
  ThoiGian: string;
  NgayChieu: string;
  SoGhe: string[];
  PhongChieu: string;
  GiaVe: number;
  TongTien: number;
  TenKhachHang: string;
  Email: string;
  Combo: string | null;
  IdPhong: number;
  TrangThai: string;
  createdAt: string;
};
type Account = {
  _id: string;
  Ten: string;
  NgaySinh: string;
  SDT: string;
  createdAt: string;
  userId: number;
  Email: string;
};

export default function Home() {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalInvoicesInMonth, setTotalInvoicesInMonth] = useState(0);
  const [totalMovies, setTotalMovies] = useState(0);
  const [newAccounts, setNewAccounts] = useState<Account[]>([]);
  const [topMovies, setTopMovies] = useState<{ TenPhim: string; count: number }[]>([]);
  const [topCustomers, setTopCustomers] = useState<{ Ten: string, SDT: string, SoLuongHoaDon: number, Email: string }[]>([]);
  const [monthlyRevenueData, setMonthlyRevenueData] = useState<number[]>([]);
  const [sixMonthRevenueData, setSixMonthRevenueData] = useState<number[]>([]);

  // Define currentMonth here
  const now = new Date();
  const currentMonth = now.getMonth(); // Month is 0-indexed, so add 1
  useEffect(() => {
    // Gọi API để lấy danh sách khách hàng
    const fetchAccounts = async () => {
      try {
        const response = await fetch("http://localhost:3000/account");
        const data = await response.json();

        // Đếm số lượng khách hàng
        setTotalCustomers(data.length);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    // Hàm lấy hóa đơn và tính toán
    const fetchInvoices = async () => {
      try {
        const response = await fetch("http://localhost:3000/invoice");
        const data: Invoice[] = await response.json(); // Áp dụng kiểu `Invoice[]`

        // Lọc hóa đơn trong tháng hiện tại
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();

        const invoicesThisMonth = data.filter((invoice: Invoice) => {
          const invoiceDate = new Date(invoice.NgayMua);
          return (
            invoiceDate.getMonth() + 1 === currentMonth &&
            invoiceDate.getFullYear() === currentYear
          );
        });

        setTotalInvoicesInMonth(invoicesThisMonth.length);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:3000/movie");
        const data = await response.json();

        // Đếm tổng số sản phẩm
        setTotalMovies(data.length);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    // Hàm lấy danh sách 5 khách hàng mới nhất
    const fetchNewAccounts = async () => {
      try {
        const response = await fetch("http://localhost:3000/account");
        const data = await response.json();

        // Giả sử userId tăng dần theo thứ tự khách hàng mới
        const sortedAccounts = data
          .sort((a: any, b: any) => b.userId - a.userId) // Sắp xếp theo userId giảm dần
          .slice(0, 5); // Lấy 5 khách hàng mới nhất

        setNewAccounts(sortedAccounts);
      } catch (error) {
        console.error("Error fetching new accounts:", error);
      }
    };

    const fetchTopMovies = async () => {
      try {
        const response = await fetch("http://localhost:3000/invoice");
        const data: Invoice[] = await response.json();

        // Đếm số lượng hóa đơn theo từng bộ phim
        const movieCountMap: { [key: string]: number } = {};

        data.forEach((invoice) => {
          if (invoice.TenPhim) {
            movieCountMap[invoice.TenPhim] =
              (movieCountMap[invoice.TenPhim] || 0) + 1;
          }
        });

        // Chuyển map thành mảng và sắp xếp
        const sortedMovies = Object.entries(movieCountMap)
          .map(([TenPhim, count]) => ({ TenPhim, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10); // Lấy top 10 bộ phim

        setTopMovies(sortedMovies);
      } catch (error) {
        console.error("Error fetching top movies:", error);
      }
    };

    // Hàm lấy danh sách hóa đơn và khách hàng
    const fetchTopCustomers = async () => {
      try {
        const invoiceResponse = await fetch("http://localhost:3000/invoice");
        const invoiceData: Invoice[] = await invoiceResponse.json();

        const accountResponse = await fetch("http://localhost:3000/account");
        const accountData: Account[] = await accountResponse.json();

        // Đếm số lượng hóa đơn của mỗi khách hàng theo email
        const customerPurchaseCount: { [key: string]: number } = {};

        invoiceData.forEach((invoice) => {
          const customerEmail = invoice.Email; // Dùng Email để đếm số lượng hóa đơn
          customerPurchaseCount[customerEmail] = (customerPurchaseCount[customerEmail] || 0) + 1;
        });

        // Chuyển object thành mảng và sắp xếp theo số lượng hóa đơn giảm dần
        const sortedCustomers = Object.entries(customerPurchaseCount)
          .map(([email, count]) => {
            const account = accountData.find(acc => acc.Email === email); // Tìm thông tin khách hàng dựa trên email
            return {
              Ten: account ? account.Ten : 'Không xác định',
              SDT: account ? account.SDT : 'Không xác định',
              SoLuongHoaDon: count,
              Email: email,
            };
          })
          .sort((a, b) => b.SoLuongHoaDon - a.SoLuongHoaDon)
          .slice(0, 5); // Lấy top 5 khách hàng mua nhiều nhất

        setTopCustomers(sortedCustomers); // Lưu vào state top 5 khách hàng
      } catch (error) {
        console.error("Error fetching top customers:", error);
      }
    };

    // Hàm lấy doanh thu theo ngày trong tháng
    const fetchDailyRevenueData = async () => {
      try {
        const response = await fetch("http://localhost:3000/invoice");
        const data: Invoice[] = await response.json();

        const now = new Date();
        const currentMonth = now.getMonth(); // Tháng hiện tại (0-11)
        const currentYear = now.getFullYear(); // Năm hiện tại

        // Khởi tạo mảng doanh thu theo ngày
        const dailyRevenue = Array.from({ length: new Date(currentYear, currentMonth + 1, 0).getDate() }, () => 0);

        // Lọc hóa đơn trong tháng hiện tại và tính doanh thu theo ngày
        data.forEach((invoice) => {
          const invoiceDate = new Date(invoice.NgayMua);
          // Kiểm tra trạng thái hóa đơn là "Đã Thanh Toán"
          if (invoiceDate.getMonth() === currentMonth && invoiceDate.getFullYear() === currentYear && invoice.TrangThai === "Đã Thanh Toán") {
            const day = invoiceDate.getDate() - 1; // Giảm 1 vì mảng bắt đầu từ 0
            dailyRevenue[day] += invoice.TongTien;
          }
        });

        setMonthlyRevenueData(dailyRevenue); // Cập nhật doanh thu theo ngày
      } catch (error) {
        console.error("Error fetching daily revenue data:", error);
      }
    };

    // Hàm lấy doanh thu theo tháng trong 6 tháng
    const fetchSixMonthRevenueData = async () => {
      try {
        const response = await fetch("http://localhost:3000/invoice");
        const data: Invoice[] = await response.json();

        const now = new Date();
        const currentMonth = now.getMonth(); // Tháng hiện tại (0-11)
        const currentYear = now.getFullYear(); // Năm hiện tại

        // Khởi tạo mảng doanh thu cho 6 tháng qua
        const sixMonthRevenue = Array.from({ length: 6 }, () => 0);

        // Lặp qua từng hóa đơn và tính toán doanh thu cho 6 tháng qua
        data.forEach((invoice) => {
          const invoiceDate = new Date(invoice.NgayMua);
          const invoiceMonth = invoiceDate.getMonth(); // Tháng của hóa đơn (0-11)
          const invoiceYear = invoiceDate.getFullYear(); // Năm của hóa đơn

          // Kiểm tra xem hóa đơn có nằm trong 6 tháng qua không và có trạng thái "Đã Thanh Toán"
          if (invoice.TrangThai === "Đã Thanh Toán" &&
            ((invoiceYear === currentYear && invoiceMonth >= currentMonth - 5 && invoiceMonth <= currentMonth) ||
              (invoiceYear === currentYear - 1 && currentMonth === 0 && invoiceMonth === 11))) {

            const monthIndex = (currentMonth - invoiceMonth + 6) % 6; // Tính chỉ số cho mảng doanh thu
            sixMonthRevenue[monthIndex] += invoice.TongTien; // Cộng doanh thu vào tháng tương ứng
          }
        });

        setSixMonthRevenueData(sixMonthRevenue); // Cập nhật trạng thái với doanh thu đã tính toán
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu doanh thu 6 tháng:", error);
      }
    };

    fetchAccounts();
    fetchInvoices();
    fetchMovies();
    fetchNewAccounts();
    fetchTopMovies();
    fetchTopCustomers();
    fetchDailyRevenueData();
    fetchSixMonthRevenueData();
  }, []);

  // Biểu đồ thống kê doanh thu theo ngày trong tháng
  const monthlyRevenueChartData = {
    labels: Array.from({ length: monthlyRevenueData.length }, (_, i) => `${i + 1}`),
    datasets: [
      {
        label: 'Doanh thu',
        data: monthlyRevenueData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
      },
    ],
  };
  // Cấu hình cho biểu đồ
  const options = {
    scales: {
      x: {
        ticks: {
          maxRotation: 0, // Không xoay nhãn
          minRotation: 0, // Không xoay nhãn
        },
      },
    },
  };

  // Cập nhật tiêu đề để hiển thị tháng
  const monthNames = ["tháng 1", "tháng 2", "tháng 3", "tháng 4", "tháng 5", "tháng 6", "tháng 7", "tháng 8", "tháng 9", "tháng 10", "tháng 11", "tháng 12"];
  const currentMonthName = monthNames[currentMonth];

  // Cập nhật nhãn cho biểu đồ
  const sixMonthRevenueChartData = {
    labels: Array.from({ length: 6 }, (_, i) => {
      const monthIndex = (currentMonth - i + 12) % 12; // Lấy tên tháng
      return monthNames[monthIndex]; // monthNames là mảng chứa tên tháng
    }).reverse(), // Đảo ngược để hiển thị tháng gần nhất trước
    datasets: [
      {
        label: 'Doanh thu 6 tháng',
        data: [...sixMonthRevenueData].reverse(), // Tạo bản sao và đảo ngược dữ liệu để khớp với nhãn
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <main className="app-content">
      <div className="row">
        <div className="col-md-12">
          <div className="app-title">
            <ul className="app-breadcrumb breadcrumb">
              <li className="breadcrumb-item">
                <a href="#"><b>Bảng điều khiển</b></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        {/* Left */}
        <div className="col-md-12 col-lg-6">
          <div className="row">
            {/* Widget Tổng khách hàng */}
            <div className="col-md-6">
              <div className="widget-small primary coloured-icon">
                <i className="icon bx bxs-user-account fa-3x"></i>
                <div className="info">
                  <h4>Tổng khách hàng</h4>
                  <p><b>{totalCustomers} khách hàng</b></p>
                  <p className="info-tong">Tổng số khách hàng được quản lý.</p>
                </div>
              </div>
            </div>
            {/* Widget Tổng sản phẩm */}
            <div className="col-md-6">
              <div className="widget-small info coloured-icon">
                <i className="icon bx bxs-data fa-3x"></i>
                <div className="info">
                  <h4>Tổng bộ phim hiện có</h4>
                  <p><b>{totalMovies} bộ phim</b></p>
                  <p className="info-tong">Tổng số bộ phim được quản lý.</p>
                </div>
              </div>
            </div>
            {/* Widget Tổng đơn hàng */}
            <div className="col-md-6">
              <div className="widget-small warning coloured-icon">
                <i className="icon bx bxs-shopping-bags fa-3x"></i>
                <div className="info">
                  <h4>Tổng đơn hàng</h4>
                  <p><b>{totalInvoicesInMonth} đơn hàng</b></p>
                  <p className="info-tong">Tổng số hóa đơn bán hàng trong tháng.</p>
                </div>
              </div>
            </div>
            {/* Top phim bán chạy trong tháng */}
            <div className="col-md-12">
              <div className="tile">
                <h3 className="tile-title">Top 10 Phim Bán Chạy</h3>
                <div>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Tên phim</th>
                        <th>Số lượng hóa đơn bán ra</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topMovies.map((movie, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{movie.TenPhim}</td>
                          <td>{movie.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Khách hàng mới */}
            <div className="col-md-12">
              <div className="tile">
                <h3 className="tile-title">Khách hàng mới</h3>
                <div>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Tên khách hàng</th>
                        <th>Ngày sinh</th>
                        <th>Số điện thoại</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newAccounts.map((account, index) => (
                        <tr key={account._id}>
                          <td>{index + 1}</td>
                          <td>{account.Ten}</td>
                          <td>{new Date(account.NgaySinh).toLocaleDateString()}</td>
                          <td>
                            <span className="tag tag-success">{account.SDT}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="col-md-12 col-lg-6">
          <div className="row">
            {/* Biểu đồ */}
            <div className="col-md-12">
              <div className="tile">
                <h3 className="tile-title">Thống kê doanh thu {currentMonthName} năm {now.getFullYear()}</h3>
                <Line data={monthlyRevenueChartData} options={options} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tile">
                <h3 className="tile-title">Thống kê 6 tháng doanh thu năm {now.getFullYear()}</h3>
                <Line data={sixMonthRevenueChartData} options={options} />
              </div>
            </div>
            {/*  */}
            <div className="col-md-12">
              <div className="tile">
                <h3 className="tile-title">Top 5 Khách Hàng Mua Hóa Đơn Nhiều Nhất</h3>
                <div>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Tên khách hàng</th>
                        <th>Số lượng hóa đơn</th>
                        <th>Số điện thoại</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topCustomers.map((customer, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{customer.Ten}</td>
                          <td>{customer.SoLuongHoaDon}</td>
                          <td>{customer.SDT}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
