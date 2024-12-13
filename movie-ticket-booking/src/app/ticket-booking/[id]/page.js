"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const DatVe = () => {
  const { id } = useParams();
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movies, setMovies] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [DaDatGhe, setDaDatGhe] = useState([]);
  const [comboQuantities, setComboQuantities] = useState({});
  const [ticketQuantities, setTicketQuantities] = useState({});
  const [raps, setRaps] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [seats, setSeats] = useState([]);
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCinema, setShowCinema] = useState(false);
  const [selectedRap, setSelectedRap] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState(null); // Lưu ID phòng đã chọn
  const [selectedDate, setSelectedDate] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedTicketType, setSelectedTicketType] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const calculateTotal = () => {
    const ticketPrice = selectedSeats.length > 0 ? ticketTypes.reduce((acc, type) => {
      return acc + (type.GiaVe * ticketQuantities[type.id]); // Tính giá vé chỉ khi có ghế được chọn
    }, 0) : 0; // Nếu không có ghế nào được chọn, giá vé là 0
    const comboPrice = combos.reduce((acc, combo) => {
      return acc + (combo.Gia * comboQuantities[combo.id]); // Giả sử mỗi combo có thuộc tính price và quantity
    }, 0);
    const total = (ticketPrice + comboPrice) // Tính tổng
    setTotalAmount(total);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieResponse = await fetch(`http://localhost:3000/movie/${id}`);
        const moviesData = await movieResponse.json();
        setMovies(moviesData);

        const ticketResponse = await fetch('http://localhost:3000/ticket-types');
        const ticketTypesData = await ticketResponse.json();
        setTicketTypes(ticketTypesData);

        const initialTicketQuantities = ticketTypesData.reduce((acc, ticket) => {
          acc[ticket.id] = 0;
          return acc;
        }, {});
        setTicketQuantities(initialTicketQuantities);

        const comboResponse = await fetch('http://localhost:3000/combo');
        const combosData = await comboResponse.json();
        setCombos(combosData);

        const initialComboQuantities = combosData.reduce((acc, combo) => {
          acc[combo.id] = 0;
          return acc;
        }, {});
        setComboQuantities(initialComboQuantities);

        const showtimeResponse = await fetch(`http://localhost:3000/showtimes/phim/${id}`);
        const showtimesData = await showtimeResponse.json();
        setShowtimes(showtimesData);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    calculateTotal();
  }, []);

  useEffect(() => {
    calculateTotal(); // Gọi hàm tính tổng khi có thay đổi
  }, [selectedSeats, ticketQuantities, comboQuantities]);


  const handleSuatChieuClick = async (showtime) => {
    try {
      // Fetch lại danh sách suất chiếu
      const showtimeResponse = await fetch(
        `http://localhost:3000/showtimes/phim/${id}/dangchieu`
      );
      const showtimesData = await showtimeResponse.json();
      setShowtimes(showtimesData);
      setShowCinema(true);
      setSelectedDate(showtime.NgayChieu); // Lưu Ngày đã chọn

      // Fetch lại danh sách phòng
      const roomsResponse = await fetch(
        `http://localhost:3000/showtimes/phim/${id}`
      );
      const roomsData = await roomsResponse.json();

      // Lọc các phòng chỉ dựa trên IdPhong của showtimesData
      const filteredRooms = roomsData.filter((room) =>
        showtimesData.some((showtime) => showtime.IdPhong === room.IdPhong)
      );

      setRooms(filteredRooms);
      setSelectedRoomId(showtime.IdPhong); // Lưu ID phòng đã chọn
    } catch (error) {
      console.error("Error fetching showtimes:", error);
    }
  };

  // const handleGioChieuClick = async (showtime) => {
  //   setSelectedShowtime(showtime);
  //   setSelectedRoomId(showtime.IdPhong);
  //   // Fetch ghế tương ứng với giờ chiếu
  //   try {
  //     const seatsResponse = await fetch(`http://localhost:3000/showtimes/ghe/${showtime.IdPhong}/${showtime.GioChieu}`);
  //     const seatsData = await seatsResponse.json();
  //     setSeats(seatsData);

  //     // Cập nhật trạng thái ghế đã đặt
  //     const bookedSeats = seatsData.flatMap(row =>
  //       row.Ghe.filter(seat => seat.DaDat).map(seat => `${row.Hang}-${seat.Ghe}`)
  //     );
  //     setDaDatGhe(bookedSeats);
  //   } catch (error) {
  //     console.error("Error fetching seats:", error);
  //   }
  // };
  const handleGioChieuClick = async (showtime) => {
    setSelectedShowtime(showtime);
    setSelectedRoomId(showtime.IdPhong);
    // Fetch ghế tương ứng với giờ chiếu
    try {
      const seatsResponse = await fetch(`http://localhost:3000/showtimes/ghe/${showtime.IdPhong}/${showtime.GioChieu}/${id}`); // Thêm IdPhim vào URL
      const seatsData = await seatsResponse.json();
      setSeats(seatsData);

      // Cập nhật trạng thái ghế đã đặt
      const bookedSeats = seatsData.flatMap(row =>
        row.Ghe.filter(seat => seat.DaDat).map(seat => `${row.Hang}-${seat.Ghe}`)
      );
      setDaDatGhe(bookedSeats);
    } catch (error) {
      console.error("Error fetching seats:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const getDayOfWeek = (dateString) => {
    const [day, month, year] = dateString.split("/").map(Number);
    const date = new Date(year, month - 1, day);
    const days = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
    return days[date.getDay()];
  };

  const groupedRooms = rooms.reduce((acc, room) => {
    const showtimesForRoom = showtimes.filter(
      (showtime) =>
        showtime.IdPhong === room.IdPhong &&
        showtime.NgayChieu === selectedDate
    );

    if (showtimesForRoom.length > 0) {
      const existingRoom = acc.find((r) => r.IdPhong === room.IdPhong);

      if (!existingRoom) {
        acc.push({
          ...room,
          showtimes: showtimesForRoom,
        });
      }
    }

    return acc;
  }, []);

  const handleTicketQuantityChange = (ticketId, change) => {
    setTicketQuantities((prev) => {
      const updatedQuantities = {
        ...prev,
        [ticketId]: Math.max(0, prev[ticketId] + change),
      };

      // Tính tổng số vé
      const totalTickets = Object.values(updatedQuantities).reduce(
        (acc, quantity) => acc + quantity,
        0
      );

      if (change > 0) {
        setSelectedTicketType(ticketId); // Lưu loại vé khi tăng số lượng
      } else {
        // Nếu giảm số lượng, kiểm tra nếu số lượng đã về 0 thì không chọn
        if (updatedQuantities[ticketId] === 0) {
          setSelectedTicketType(null);
        }
      }

      // Giới hạn số ghế chọn theo số lượng vé
      if (selectedSeats.length > totalTickets) {
        setSelectedSeats(selectedSeats.slice(0, totalTickets));
      }
      return updatedQuantities;

    });
  };

  const handleComboQuantityChange = (comboId, change) => {
    setComboQuantities((prev) => {
      const updatedQuantities = {
        ...prev,
        [comboId]: Math.max(0, prev[comboId] + change),
      };
      return updatedQuantities;
    });
  }

  const toggleSeatSelection = (row, seat) => {
    const seatCode = `${row}-${seat}`;
    const totalTickets = Object.values(ticketQuantities).reduce(
      (acc, quantity) => acc + quantity,

    );

    if (!totalTickets) {
      alert("Vui lòng chọn số lượng vé trước khi chọn ghế.");
      return;
    }

    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatCode)) {
        return prevSelectedSeats.filter((s) => s !== seatCode);
      } else if (prevSelectedSeats.length < totalTickets) {
        return [...prevSelectedSeats, seatCode];
      } else {
        alert("Số ghế chọn không được vượt quá số vé đã chọn");
      }
      return prevSelectedSeats;
    });
  };

  const handleContinue = () => {

    const isLoggedIn = Cookies.get("token");
    if (!isLoggedIn) {
      alert("Vui lòng đăng nhập để đặt vé.");

      return;
    }
    const numberOfTickets = Object.values(ticketQuantities).reduce((acc, quantity) => acc + quantity, 0);
    const numberOfSeats = selectedSeats.length;
    if (numberOfTickets !== numberOfSeats) {
      alert("Số loại vé và số ghế phải bằng nhau để thực hiện thanh toán.");
      return; // Ngừng quá trình thanh toán
    }

    const selectedTicketTypes = ticketTypes
      .filter(ticketType => ticketQuantities[ticketType.id] > 0) // Filter selected ticket types
      .map(ticketType => ({
        name: ticketType.TenVe,
        price: ticketType.GiaVe,
        quantity: ticketQuantities[ticketType.id] // Quantity of selected ticket types
      }));

    const selectedCombos = combos
      .filter(combo => comboQuantities[combo.id] > 0) // Filter selected combos
      .map(combo => ({
        name: combo.TenCombo,
        price: combo.Gia,
        quantity: comboQuantities[combo.id] // Quantity of selected combos
      }));

    // Find the selected showtime and room corresponding to the selected IDs
    const selectedShowtime = showtimes.find(showtime => showtime.IdPhong === selectedRoomId && showtime.NgayChieu === selectedDate);
    const selectedRoom = rooms.find(room => room.IdPhong === selectedRoomId);

    const holdTimeInMinutes = 5; // Change this value if needed
    const holdTime = new Date(Date.now() + holdTimeInMinutes * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Include date and time separately if selectedShowtime is found
    const showtimeDate = selectedShowtime ? selectedShowtime.NgayChieu : null; // Date
    const showtimeTime = selectedShowtime ? selectedShowtime.GioChieu : null; // Time

    // Save necessary information to cookie
    Cookies.set("bookingInfo", JSON.stringify({
      IdPhim: Number(id),
      selectedSeats: selectedSeats.map(seatCode => seatCode.split('-')[1]),      // List of selected seats
      ticketQuantities,    // Ticket quantities
      combos: selectedCombos || null, // Combo quantities
      totalAmount,         // Total amount
      movieName: movies.Ten,   // Movie name
      showtimeDate,        // Showtime date
      showtimeTime,        // Showtime time
      room: selectedRoom ? selectedRoom.TenPhongChieu : "null", // Room name
      ticketTypes: selectedTicketTypes,
      holdTime,
      IdPhong: selectedRoomId
    }), { expires: 30 / 1440 });  // Expires in 5 minutes (1 day / 288)

    // Redirect or perform other actions after saving to cookie
    router.push("/checkout");
  };

  return (
    <div className="flex mx-auto text-white bg-[rgba(0,0,0,0.7)] shadow-lg w-full max-w-[1410px] mx-auto">
      <section className="w-1/3 sticky top-0">
        <div className="flex justify-center  sticky top-6">
          <div className="flex flex-col md:flex-col items-center  gap-20  mt-8">
            {/* left box image */}
            <div className="md:w-1/2 flex mb-8 md:mb-0">
              <img src={movies.Anh} alt={movies.title} className="object-cover" style={{ height: "auto", width: "auto" }} />
            </div>
          </div>
        </div>
      </section>

      <div className="w-2/3 mr-8">
        {/* Suất Chiếu Section */}
        <section className="pb-10">
          <h1 className="text-center text-[40px] font-bold mt-20 pb-3">LỊCH CHIẾU</h1>
          <div className="flex justify-center gap-4 mt-6">
            {Object.entries(
              showtimes
                .reduce((acc, showtime) => {
                  const key = showtime.NgayChieu;
                  if (!acc[key]) {
                    acc[key] = { ...showtime };
                  }
                  return acc;
                }, {})
            )
              .filter(([date]) => {
                // Lọc chỉ các suất chiếu trong tương lai
                const [day, month, year] = date.split("/").map(Number);
                const showtimeDate = new Date(year, month - 1, day);
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Đặt thời gian về đầu ngày
                return showtimeDate >= today; // Chỉ giữ ngày hiện tại hoặc tương lai
              })
              .sort(([dateA], [dateB]) => {
                // Sắp xếp ngày
                const [dayA, monthA, yearA] = dateA.split("/").map(Number);
                const [dayB, monthB, yearB] = dateB.split("/").map(Number);
                return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB);
              })
              .map(([_, showtime], index) => {
                const [day, month, year] = showtime.NgayChieu.split("/").map(Number);
                const showtimeDate = new Date(year, month - 1, day);

                return (
                  <div
                    key={index}
                    onClick={() => handleSuatChieuClick(showtime)}
                    className={`h-[95px] w-[110px] border-2 text-center flex flex-col justify-center items-center rounded transition duration-300 group mr-3 border-[#F5CF49] hover:bg-[#F5CF49]`}
                  >
                    <h2 className="font-bold text-[#F5CF49] transition duration-300 group-hover:text-white">
                      {showtime.NgayChieu}
                    </h2>
                    <p className="font-semibold text-[18px] text-[#F5CF49] transition duration-300 group-hover:text-black">
                      {getDayOfWeek(showtime.NgayChieu)}
                    </p>
                  </div>
                );
              })}
          </div>
        </section>



        {showCinema && selectedDate && ( // Hiển thị danh sách phòng chiếu nếu đã chọn Ngày
          <section className="mt-10">
            <h2 className="text-[40px] font-bold mb-4 text-center mt-20 pb-3">DANH SÁCH PHÒNG CHIẾU</h2>
            <div className="flex flex-col items-center">
              {groupedRooms.map((room) => (
                <div key={room.IdPhong} className="bg-[#1c1c1c] w-full max-w-[1035px] p-4 mb-4 rounded">
                  <div className="flex justify-between">
                    <h3 className="text-[28px] text-[#F5CF49] font-semibold hover:text-white">
                      {room.TenPhongChieu}
                    </h3>
                  </div>
                  <div className="flex flex-row justify-start">
                    {/* Hiển thị giờ chiếu cho phòng */}
                    {room.showtimes.map((showtime, index) => (
                      <div
                        key={index}
                        className={`mt-2 w-[120px] h-[40px] text-center flex flex-row justify-center items-center rounded cursor-pointer mr-4 
                    ${selectedShowtime === showtime ? 'bg-[#2C2C2C] border-2 border-[#F5CF49] text-white' : 'bg-[#F5CF49] text-black'}`}
                        onClick={() => handleGioChieuClick(showtime)} >
                        <p className="text-[14px] font-bold hover:text-white">
                          {showtime.GioChieu}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}


        {/* Chọn Loại Vé Section */}
        {showCinema && selectedDate && (
          <section className="mt-10 px-4 md:px-0 pb-10">
            <h2 className="text-[30px] md:text-[40px] font-bold mt-20 mb-5 text-center">CHỌN LOẠI VÉ </h2>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              {ticketTypes.map((ticketType) => (
                <div key={ticketType.id} className="w-full md:w-[313px] h-[150px] bg-gradient-to-r from-gray-500 via-gray-700 to-gray-500 p-4 rounded flex flex-col justify-between mx-auto md:mx-0">
                  <h3 className="text-lg text-[18px] font-bold hover:text-yellow-400">{ticketType.TenVe}</h3>
                  <p className="text-[14px] text-white font-bold">Giá: {ticketType.GiaVe.toLocaleString()} VND</p>
                  <div className="w-[92px] h-[31px] bg-[#F5CF49] flex items-center justify-center space-x-2 mt-2 mx-auto rounded">
                    <button className="text-black font-bold p-1" onClick={() => handleTicketQuantityChange(ticketType.id, -1)}>-</button>
                    <span className="text-black font-bold p-1"> {ticketQuantities[ticketType.id]}</span>
                    <button className="text-black font-bold p-1" onClick={() => handleTicketQuantityChange(ticketType.id, 1)}> +</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Seat Selection Section */}
        {seats.length > 0 && (
          <>
            <section className="mt-10">
              <h2 className="text-[40px] font-bold mb-4 text-center">Danh Sách Ghế</h2>
              <div className="flex flex-col items-center">
                <img src="/images/img-screen.png" className="mb-14 w-[500px]" />
                {seats.map((row) => (
                  <div key={row.Hang} className="flex items-center mb-4">
                    <span className="font-bold mr-4">{row.Hang}: </span>
                    {row.Ghe.map((ghe, index) => {
                      const seatCode = `${row.Hang}-${ghe.Ghe}`;
                      const isSelected = selectedSeats.includes(seatCode);
                      const isBooked = ghe.DaDat; // Sử dụng thuộc tính DaDat từ dữ liệu mới

                      return (
                        <div
                          key={index}
                          onClick={() => {
                            if (!isBooked) {
                              toggleSeatSelection(row.Hang, ghe.Ghe);
                            }
                          }}
                          className={`ml-2 w-[70px] h-[40px] flex items-center justify-center rounded cursor-pointer 
                    ${isSelected ? "bg-[#F5CF49]" : isBooked ? "bg-gray-800" : "bg-gray-500"}`}
                          onMouseEnter={(e) => {
                            if (isBooked) {
                              e.target.style.cursor = "not-allowed"; // Thay đổi con trỏ khi rê chuột lên ghế đã đặt
                            }
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.cursor = "pointer"; // Reset con trỏ khi rời khỏi ghế
                          }}
                        >
                          <p className="font-bold text-white">{ghe.Ghe}</p>

                          {/* Hiển thị ghi chú cho ghế đã đặt khi rê chuột vào ghế đã đặt */}
                          {isBooked && (
                            <div
                              className="absolute bg-white text-red-600 text-xs p-1 rounded-md top-[-20px] left-[50%] transform -translate-x-1/2"
                              style={{ display: isBooked ? "block" : "none" }}
                            >
                              Ghế đã đặt
                            </div>
                          )}
                        </div>
                      );
                    })}

                  </div>

                ))}
                <div class="flex space-x-4 text-sm">
                  <div class="flex items-center">
                    <div class="w-4 h-4 bg-gray-500 border border-white mr-2"></div>
                    <span>Chưa đặt</span>
                  </div>
                  <div class="flex items-center">
                    <div class="w-4 h-4 bg-gray-800 border border-white mr-2"></div>
                    <span>Đã đặt</span>
                  </div>
                  <div class="flex items-center">
                    <div class="w-4 h-4 bg-[#F5CF49] border border-white mr-2"></div>
                    <span>Đang chọn</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-[40px] font-bold mt-20 mb-5 text-center">CHỌN COMBO</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {combos.map((item) => (
                  <div key={item.id} className="w-[350px] p-4 flex items-center gap-4">
                    {/* Left: Combo Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={`${item.Anh}`}
                        alt={item.TenCombo}
                        className="h-[130px] w-[130px] object-cover rounded"
                      />
                    </div>
                    {/* Right: Combo Info */}
                    <div>
                      <h3 className="mb-2 text-[16px] font-bold">{item.TenCombo}</h3>
                      <p className="mb-2 text-[14px] font-bold">{item.NoiDung}</p>
                      <p className="mb-2 text-[14px] font-bold">
                        Giá: {item.Gia.toLocaleString()} VND
                      </p>
                      <div className="w-[92px] h-[31px] bg-[#F5CF49] flex items-center justify-center space-x-2 mt-2 rounded">
                        <button
                          className="text-black p-1 font-bold"
                          onClick={() => handleComboQuantityChange(item.id, -1)}
                        >
                          -
                        </button>
                        <span className="text-black p-1 font-bold">{comboQuantities[item.id]}</span>
                        <button
                          className="text-black p-1 font-bold"
                          onClick={() => handleComboQuantityChange(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tổng tiền */}
            <section className="mt-10 pb-5">
              <div className="flex justify-between items-center mr-3">
                <div className="flex-grow"></div>
                <h2 className="text-center text-[20px] font-bold flex-grow">
                  Tổng Tiền: {totalAmount.toLocaleString()} VNĐ
                </h2>
                <button
                  onClick={handleContinue}
                  className={`font-bold m-3 w-[150px] h-[40px] rounded hover:bg-yellow-300 ${Object.values(ticketQuantities).some(quantity => quantity > 0) && selectedSeats.length > 0 ? 'bg-[#F5CF49] text-black' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
                  disabled={!(Object.values(ticketQuantities).some(quantity => quantity > 0) && selectedSeats.length > 0)}
                >
                  Tiếp tục
                </button>
              </div>
            </section>
          </>
        )}


      </div>
    </div>
  );
};

export default DatVe;