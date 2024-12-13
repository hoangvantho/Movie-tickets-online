const MongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://screntime12:Y3PO2213Sq4kcmlM@cluster0.zv8zx.mongodb.net/";
const dbName = "Ticker_Movie";

const data = {

  // ----- Phim -----
  Phim: [
    {
      id: 1,
      Ten: "ĐỐ ANH CỒNG ĐƯỢC TÔI",
      Trailer: "https://www.youtube.com/embed/JgUWVooKSrA",
      TheLoai: {
        KieuPhim: "Hài, Hành Động",
        ThoiLuong: "118'",
        QuocGia: "Hàn quốc",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T18: Phim dành cho khán giả từ đủ 18 tuổi trở lên (18+)",
      },
      Anh: "/images/phim/Do-anh-cong-duoc-toi.jpg",
      IdDanhMuc: 4,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "RYOO Seung-wan",
        DienVien: "HWANG Jung-min, JUNG Hae-in",
        NgayKhoiChieu: "Thứ Sáu, 27/09/2024",
      },
      ThongTinPhim:
        "Các thanh tra kỳ cựu nổi tiếng đã hoạt động trở lại! Thám tử Seo Do-cheol (HWANG Jung-min) và đội điều tra tội phạm nguy hiểm của anh không ngừng truy lùng tội phạm cả ngày lẫn đêm, đặt cược cả cuộc sống cá nhân của họ. Nhận một vụ án sát hại một giáo sư, đội thanh tra nhận ra những mối liên hệ với các vụ án trong quá khứ và nảy sinh những nghi ngờ về một kẻ giết người hàng loạt. Điều này đã khiến cả nước rơi vào tình trạng hỗn loạn. Khi đội thanh tra đi sâu vào cuộc điều tra, kẻ sát nhân đã chế nhạo họ bằng cách công khai tung ra một đoạn giới thiệu trực tuyến, chỉ ra nạn nhân tiếp theo và làm gia tăng sự hỗn loạn. Để giải quyết mối đe dọa ngày càng leo thang, nhóm đã kết nạp một sĩ quan tân binh trẻ Park Sun-woo (JUNG Hae-in), dẫn đến những khúc mắc và đầy rẫy bất ngờ trong vụ án.",
    },
    {
      id: 2,
      Ten: "VENOM: KÈO CUỐI",
      Trailer: "https://www.youtube.com/embed/I1q-jmvPNn0",
      TheLoai: {
        KieuPhim: "Hành Động, Khoa Học Viễn Tưởng",
        ThoiLuong: "109'",
        QuocGia: "Khác",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T13: Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)",
      },
      Anh: "/images/phim/venom.jpg",
      IdDanhMuc: 2,
      TrangThai: "sapchieu",
      MoTa: {
        DaoDien: "Kelly Marcel",
        DienVien: "Tom Hardy, Juno Temple, Chiwetel Ejiofor, Clark Backo, Stephen Graham",
        NgayKhoiChieu: "25/10/2024",
      },
      ThongTinPhim:
        "Tom Hardy sẽ tái xuất trong bom tấn Venom: The Last Dance (Tựa Việt: Venom: Kèo Cuối) và phải đối mặt với kẻ thù lớn nhất từ trước đến nay - toàn bộ chủng tộc Symbiote.",
    },
    {
      id: 3,
      Trailer: "https://www.youtube.com/embed/3Q6ILUwMwM4",
      Ten: "NGÀY XƯA CÓ MỘT CHUYỆN TÌNH (T16)",
      TheLoai: {
        KieuPhim: "Tình Cảm",
        ThoiLuong: "118'",
        QuocGia: "Việt Nam",
        NgonNgu: "Việt Nam",
        KhuyenCao: "T16: Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)",
      },
      Anh: "/images/phim/ngay-xua-co-mot-chuyen-tinh-official.webp",
      IdDanhMuc: 1,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "Trịnh Đình Lê Minh",
        DienVien: "Avin Lu, Ngọc Xuân, Đỗ Nhật Hoàng, Thanh Tú, Bảo Tiên, Hạo Khang",
        NgayKhoiChieu: "01/11/2024",
      },
      ThongTinPhim:
        "Ngày Xưa Có Một Chuyện Tình xoay quanh câu chuyện tình bạn, tình yêu giữa hai chàng trai và một cô gái từ thuở ấu thơ cho đến khi trưởng thành, phải đối mặt với những thử thách của số phận. Trải dài trong 4 giai đoạn từ năm 1987 - 2000, ba người bạn cùng tuổi - Vinh, Miền, Phúc đã cùng yêu, cùng bỡ ngỡ bước vào đời, va vấp và vượt qua.",
    },
    {
      id: 4,
      Trailer: "https://www.youtube.com/embed/G95mJ72aY28",
      Ten: "LOOK BACK: LIỆU TA CÓ DÁM NHÌN LẠI (T13)",
      TheLoai: {
        KieuPhim: "Anime",
        ThoiLuong: "58'",
        QuocGia: "Nhật Bản",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T13: Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)",
      },
      Anh: "/images/phim/look-back.jpg",
      IdDanhMuc: 5,
      TrangThai: "sapchieu",
      MoTa: {
        DaoDien: "Kiyotaka Oshiyama",
        DienVien: "Yumi Kawai, Mizuki Yoshida",
        NgayKhoiChieu: "Thứ Sáu, 20/09/2024",
      },
      ThongTinPhim:
        "Fujino tự tin thái quá, trong khi Kyomoto lại sống khép kín, cả hai dường như không thể khác biệt hơn, nhưng tình yêu mãnh liệt dành cho manga đã trở thành sợi dây duy nhất kết nối họ. Thế nhưng, một ngày nọ, một biến cố đã xảy ra, khiến thế giới của họ hoàn toàn thay đổi… “Look Back - Liệu ta có dám nhìn lại” là một câu chuyện trưởng thành đầy xúc động và day dứt.",
    },
    {
      id: 5,
      Trailer: "https://www.youtube.com/embed/MtZ_hf7tLxk",
      Ten: "LÀM GIÀU VỚI MA (T16)",
      TheLoai: {
        KieuPhim: "Hài, Tâm Lý",
        ThoiLuong: "112'",
        QuocGia: "Việt Nam",
        NgonNgu: "VN",
        KhuyenCao: "T16: Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)",
      },
      Anh: "/images/phim/lam-giau-voi-ma.jpg",
      IdDanhMuc: 3,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "Trung Lùn",
        DienVien: "Hoài Linh, Tuấn Trần, Lê Giang",
        NgayKhoiChieu: "Thứ Sáu, 30/08/2024",
      },
      ThongTinPhim:
        "Làm Giàu Với Ma kể về Lanh (Tuấn Trần) - con trai của ông Đạo làm nghề mai táng (Hoài Linh), lâm vào đường cùng vì cờ bạc. Trong cơn túng quẫn, “duyên tình” đẩy đưa anh gặp một ma nữ (Diệp Bảo Ngọc) và cùng nhau thực hiện những “kèo thơm” để phục vụ mục đích của cả hai.",
    },
    {
      id: 6,
      Ten: "ANH TRAI VƯỢT MỌI TAM TAI (T16)",
      Trailer: "https://www.youtube.com/embed/hBbndPyAPeg",
      TheLoai: {
        KieuPhim: "Hài",
        ThoiLuong: "96'",
        QuocGia: "Hàn Quốc",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T16: Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)",
      },
      Anh: "/images/phim/anh-trai-vuot-moi-tam-tai.jpg",
      IdDanhMuc: 3,
      TrangThai: "sapchieu",
      MoTa: {
        DaoDien: "Kim Jae-hoon",
        DienVien: "Park Sung-woong, Kwak Si-yang, Yoon Kyung-ho",
        NgayKhoiChieu: "Thứ Sáu, 13/09/2024",
      },
      ThongTinPhim:
        "Cho Su-gwang là một thanh tra cực kỳ nóng tính, dù có tỷ lệ bắt giữ tội phạm ấn tượng nhưng anh luôn gặp khó khăn trong việc kiểm soát cơn giận của mình. Vì liên tục tấn công các nghi phạm, Cho Su-gwang bị chuyển đến đảo Jeju. Tại đây, vị thanh tra nhận nhiệm vụ truy bắt kẻ lừa đảo giỏi nhất Hàn Quốc - Kim In-hae với 7 tiền án, nổi tiếng thông minh và có khả năng “thiên biến vạn hoá” để ngụy trang hoàn hảo mọi nhân dạng. Cùng lúc đó, Kim In-hae bất ngờ dính vào vụ án mạng nghiêm trọng có liên quan đến tên trùm xã hội đen đang nhăm nhe “thôn tính” đảo Jeju. Trước tình hình nguy cấp phải “giải cứu” hòn đảo Jeju và triệt phá đường dây nguy hiểm của tên trùm xã hội đen, thanh tra Cho Su-gwang bất đắc dĩ phải hợp tác cùng nghi phạm Kim In-hae, tận dụng triệt để các kỹ năng từ phá án đến lừa đảo trên hành trình rượt đuổi vừa gay cấn vừa hài hước để có thể hoàn thành nhiệm vụ cam go.",
    },
    {
      id: 7,
      Trailer: "https://www.youtube.com/embed/QJ8E9R70csY",
      Ten: "CÔ DÂU HÀO MÔN (T18)",
      TheLoai: {
        KieuPhim: "Tình Cảm, Tâm Lý",
        ThoiLuong: "114'",
        QuocGia: "Việt Nam",
        NgonNgu: "Việt Nam",
        KhuyenCao: "T18: Phim dành cho khán giả từ đủ 18 tuổi trở lên (18+)",
      },
      Anh: "/images/phim/co-dau-hao-mon-official.webp",
      IdDanhMuc: 1,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "Vũ Ngọc Đãng",
        DienVien: "Uyển Ân, Samuel An, Kiều Minh Tuấn, Thu Trang, Lê Giang, NSND Hồng Vân",
        NgayKhoiChieu: "18/10/2024",
      },
      ThongTinPhim: "Uyển Ân chính thức lên xe hoa trong thế giới thượng lưu của đạo diễn Vũ Ngọc Đãng qua bộ phim Cô Dâu Hào Môn. Bộ phim xoay quanh câu chuyện làm dâu nhà hào môn dưới góc nhìn hài hước và châm biếm, hé lộ những câu chuyện kén dâu chọn rể trong giới thượng lưu. Phối hợp cùng Uyển Ân ở các phân đoạn tình cảm trong bộ phim lần này là diễn viên Samuel An. Anh được đạo diễn Vũ Ngọc Đãng “đo ni đóng giày” cho vai cậu thiếu gia Bảo Hoàng với ngoại hình điển trai, phong cách lịch lãm và gia thế khủng.",
    },
    {
      id: 8,
      Trailer: "https://www.youtube.com/embed/AfybuJ8zOAI",
      Ten: "VÂY HÃM TẠI ĐÀI BẮC (T18)",
      TheLoai: {
        KieuPhim: "Hồi Hộp, Tâm Lý",
        ThoiLuong: "100'",
        QuocGia: "Khác",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T18: Phim dành cho khán giả từ đủ 18 tuổi trở lên (18+)"
      },
      Anh: "/images/phim/vay-ham-tai-dai-bac-poster.webp",
      IdDanhMuc: 3,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "George Huang",
        DienVien: "Luke Evans, Sung Kang, Gwei Lun-Mei",
        NgayKhoiChieu: "31/10/2024"
      },
      ThongTinPhim: "Theo chân John Lawlor là một đặc vụ DEA cừ khôi bất khả chiến bại, anh sẽ không tiếc hi sinh bất cứ điều gì để hoàn thành nhiệm vụ được giao. Trong khi đó, Joey Kwang là \"người vận chuyển\" hàng đầu ở Đài Bắc với tốc độ không ai sánh bằng và tư duy nhạy bén mà không ai có thể theo kịp cô. Vô tình số phận đã đưa họ đến với nhau trước khi thế lực tội phạm chia cắt họ. 15 năm sau, số phận một lần nữa đẩy Joey và John va chạm nhau trong tình cảnh bất đắc dĩ vào cuối tuần tại Đài Bắc. Và cả hai sẽ khám phá ra rằng điều duy nhất khó hơn việc yêu… chính là yêu lại."
    },
    {
      id: 9,
      Trailer: "https://www.youtube.com/embed/9tDZpBbg8Ow",
      Ten: "ELLI VÀ BÍ ẨN CHIẾC TÀU MA LT (P)",
      TheLoai: {
        KieuPhim: "Hoạt hình",
        ThoiLuong: "86'",
        QuocGia: "Khác",
        NgonNgu: "Lồng Tiếng",
        KhuyenCao: "P: Phim dành cho khán giả mọi lứa tuổi"
      },
      Anh: "/images/phim/elli.webp",
      IdDanhMuc: 5,
      TrangThai: "sapchieu",
      MoTa: {
        DaoDien: "Piet De Rycker, Jesper Moller, Jens Moller",
        DienVien: "Dalia Schmidt-FoB, Oliver Kalkofe",
        NgayKhoiChieu: "25/10/2024"
      },
      ThongTinPhim: "Một hồn ma nhỏ vô gia cư gõ cửa nhà những cư dân lập dị của Chuyến tàu ma để tìm kiếm một nơi thuộc về, cô bé vô tình thu hút sự chú ý từ \"thế giới bên ngoài\" và phải hợp tác với phi hành đoàn quái vật hỗn tạp trong một nhiệm vụ điên rồ."
    },
    {
      id: 10,
      Trailer: "https://www.youtube.com/embed/O_JcwpDergM",
      Ten: "HỌC VIỆN ANH HÙNG: YOU'RE THE NEXT",
      TheLoai: {
        KieuPhim: "Anime",
        ThoiLuong: "99'",
        QuocGia: "Nhật Bản",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "K: Phim dành cho khán giả từ dưới 13 tuổi với điều kiện xem cùng cha, mẹ hoặc người giám hộ"
      },
      Anh: "/images/phim/hoc-vien-anh-hung.webp",
      IdDanhMuc: 5,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "Okamura Tensai",
        DienVien: "Gerard Caster, Van Barr Jr., Nasim Benelkour",
        NgayKhoiChieu: "08/11/2024"
      },
      ThongTinPhim: "My Hero Academia: You're Next chuyển thể từ bộ truyện tranh ăn khách My Hero Academia. Vào mùa xuân năm thứ hai, trong khi Nhật Bản đang bị tàn phá bởi các cuộc chiến, một người đàn ông bí ẩn bất ngờ xuất hiện có tên là Dark Might. Đối mặt với Deku và những người bạn, hắn tự xưng mình là biểu tượng mới thay thế All Might với tuyên bố hùng hồn: \"Tiếp theo là đến lượt ta!\". Với dã tâm của mình, Dark Might sử dụng năng lực để tạo ra một pháo đài khổng lồ và nhốt người dân cùng anh hùng vào đó. Deku, Bakugo, Todoroki cùng lớp 1-A của trường U.A. dũng cảm đối đầu với Dark Might và tổ chức tội phạm bí ẩn do hắn cầm đầu, mang tên \"Gia đình Gollini\". Liệu họ có thể ngăn chặn tham vọng của biểu tượng mới Dark Might và bảo vệ thế giới?"
    },
    {
      id: 11,
      Trailer: "https://www.youtube.com/embed/L8GYbHu20nQ",
      Ten: "NHỮNG NHÀ VÔ ĐỊCH (T16)",
      TheLoai: {
        KieuPhim: "Hoạt hình, Chính Kịch",
        ThoiLuong: "119'",
        QuocGia: "Khác",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T16: Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)"
      },
      Anh: "/images/phim/Nh_ng_nh_v_ch_09.webp",
      IdDanhMuc: 4,
      TrangThai: "sapchieu",
      MoTa: {
        DaoDien: "Soleen Yusef",
        DienVien: "",
        NgayKhoiChieu: "09/11/2024"
      },
      ThongTinPhim: "Bộ phim đưa người xem dõi theo hành trình của Mona, một cô bé 11 tuổi trốn khỏi Syria bị chiến tranh tàn phá cùng gia đình và định cư tại Berlin. Gặp khó khăn trong việc thích nghi với môi trường mới, Mona phải đối mặt với sự bắt nạt và cô lập tại trường học mới. Tuy nhiên, cuộc sống của cô bước sang một trang mới khi một giáo viên tận tâm, ông Che, nhận ra tài năng chơi bóng đá của cô và khuyến khích cô tham gia đội bóng nữ của trường. Qua bóng đá, Mona học được tầm quan trọng của tinh thần đồng đội, sự kiên cường và việc tìm kiếm chỗ đứng của mình trong một thế giới mới."
    },
    {
      id: 12,
      Trailer: "https://www.youtube.com/embed/jz-LPOpWBqM",
      Ten: "PHÒNG GIÁO VIÊN (T13)",
      TheLoai: {
        KieuPhim: "Chính Kịch",
        ThoiLuong: "98'",
        QuocGia: "Khác",
        NgonNgu: "VN",
        KhuyenCao: "T18: Phim dành cho khán giả từ đủ 18 tuổi trở lên (18+)"
      },
      Anh: "/images/phim/Ph_ng_Gi_o_Vi_n__06.webp",
      IdDanhMuc: 4,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "İlker Çatak",
        DienVien: "",
        NgayKhoiChieu: "06/11/2024"
      },
      ThongTinPhim: "Carla Nowak là một giáo viên thể dục và toán tận tâm, bắt đầu công việc đầu tiên tại một trường trung học ở Đức. Chủ nghĩa lý tưởng của cô nhanh chóng khiến cô nổi bật giữa các đồng nghiệp. Khi một loạt vụ trộm xảy ra trong trường và một trong những học sinh của cô bị cáo buộc, Carla quyết tâm tìm ra sự thật. Trong quá trình đối mặt với những bậc phụ huynh giận dữ, đồng nghiệp cứng đầu và học sinh nổi loạn, cô bị cuốn vào những thực tế khắc nghiệt của hệ thống giáo dục."
    },
    {
      id: 13,
      Trailer: "https://www.youtube.com/embed/2T_mKyH17mY",
      Ten: "MẬT MÃ ĐỎ",
      TheLoai: {
        KieuPhim: "Hài, Phiêu Lưu, Hành Động",
        ThoiLuong: "99'",
        QuocGia: "Khác",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T13: Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)"
      },
      Anh: "/images/phim/mat-ma-do.webp",
      IdDanhMuc: 2,
      TrangThai: "sapchieu",
      MoTa: {
        DaoDien: "Jake Kasdan",
        DienVien: "Dwayne Johnson, Chris Evans, Lucy Liu, J.K. Simmons",
        NgayKhoiChieu: "15/11/2024"
      },
      ThongTinPhim: "Red One / Mật Mã Đỏ kể về Callum Drift, người đứng đầu lực lượng an ninh Bắc Cực, phải hợp tác với Jack O'Malley, một thợ săn tiền thưởng, để tìm và giải cứu Ông già Noel sau khi ông bị bắt cóc."
    },
    {
      id: 14,
      Trailer: "https://www.youtube.com/embed/bmkR2EY_hcY",
      Ten: "CÔNG TỬ BẠC LIÊU",
      TheLoai: {
        KieuPhim: "Hài, Gia đình",
        ThoiLuong: "99'",
        QuocGia: "Việt Nam",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T16: Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)"
      },
      Anh: "/images/phim/cong-tu-bac-lieu.webp",
      IdDanhMuc: 3,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "Lý Minh Thắng",
        DienVien: "Song Luân, Kaity Nguyễn, Thiên Ân, Thành Lộc, Thanh Thủy, Hữu Châu, Công Dương, ...",
        NgayKhoiChieu: "20/12/2024"
      },
      ThongTinPhim: "Sáng tạo dựa trên những giai thoại về chàng công tử đệ nhất chơi ngông xứ Nam Kỳ, bộ phim Công Tử Bạc Liêu sẽ đưa khán giả trở về những năm đầu thế kỷ 20, khi giới thượng lưu miền Nam khiến cho vùng đất này trở thành điểm đến của những cuộc vui chơi, hình thức giải trí phô trương và tốn kém chưa từng có trước đây."
    },
    {
      id: 15,
      Trailer: "https://www.youtube.com/embed/ST08liEjNsw",
      Ten: "CHÚA TỂ CỦA NHỮNG CHIẾC NHẪN: CUỘC CHIẾN CỦA ROHIRRIM",
      TheLoai: {
        KieuPhim: "Hoạt hình, Phiêu Lưu, Hành Động",
        ThoiLuong: "99'",
        QuocGia: "Khác",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T13: Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)"
      },
      Anh: "/images/phim/chua-te-cua-nhung-chiec-nhan.webp",
      IdDanhMuc: 9,
      TrangThai: "sapchieu",
      MoTa: {
        DaoDien: "Kenji Kamiyama",
        DienVien: "Brian Cox, Gaia Wise, Luke Pasqualino, Miranda Otto,…",
        NgayKhoiChieu: "13/12/2024"
      },
      ThongTinPhim: "Lấy bối cảnh 183 năm trước những sự kiện trong bộ ba phim gốc, “Chúa Tể Của Những Chiếc Nhẫn: Cuộc Chiến Của Rohirrim\" kể về số phận của Gia tộc của Helm Hammerhand, vị vua huyền thoại của Rohan. Cuộc tấn công bất ngờ của Wulf, lãnh chúa xảo trá và tàn nhẫn của tộc Dunlending, nhằm báo thù cho cái chết của cha hắn, đã buộc Helm và thần dân của ngài phải chống cự trong pháo đài cổ Hornburg - một thành trì vững chãi sau này được biết đến với tên gọi Helm's Deep. Tình thế ngày càng tuyệt vọng, Héra, con gái của Helm, phải dốc hết sức dẫn dắt cuộc chiến chống lại kẻ địch nguy hiểm, quyết tâm tiêu diệt bọn chúng."
    },
    {
      id: 16,
      Trailer: "https://www.youtube.com/embed/T-aJxCFUN_8",
      Ten: "CAPTAIN AMERICA: THẾ GIỚI MỚI",
      TheLoai: {
        KieuPhim: "Phiêu Lưu, Siêu Anh Hùng, Hành Động",
        ThoiLuong: "99'",
        QuocGia: "Khác",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T13: Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)"
      },
      Anh: "/images/phim/captain-america-the-gioi-moi.webp",
      IdDanhMuc: 2,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "Julius Onah",
        DienVien: "Harrison Ford, Anthoy Mackie, Giancarlo Esposito, Rosa Salazar, Seth Rollins, Shira Haas",
        NgayKhoiChieu: "14/02/2025"
      },
      ThongTinPhim: "Sau cuộc gặp gỡ với tân Tổng thống Hoa Kỳ Thaddeus Ross, Sam Wilson vô tình bị cuốn vào cuộc xung đột tại một sự kiện quốc tế. Trong vai trò Captain America mới, Wilson buộc phải điều tra và lật tẩy một âm mưu toàn cầu bất chính, trước khi kẻ thủ ác nhấn chìm cả thế giới vào cảnh suy tàn."
    },
    {
      id: 17,
      Trailer: "https://www.youtube.com/embed/R4AFSgUGEEs",
      Ten: "VÕ SĨ GIÁC ĐẤU II",
      TheLoai: {
        KieuPhim: "Phiêu Lưu, Hành Động",
        ThoiLuong: "99'",
        QuocGia: "Khác",
        NgonNgu: "VN",
        KhuyenCao: "T13: Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)"
      },
      Anh: "/images/phim/vo-si-giac-dau-ii.webp",
      IdDanhMuc: 2,
      TrangThai: "sapchieu",
      MoTa: {
        DaoDien: "Ridley Scott",
        DienVien: "Paul Mescal, Joseph Quinn, Pedro Pascal, Connie Nielsen, Denzel Washington,…",
        NgayKhoiChieu: "15/11/2024"
      },
      ThongTinPhim: "Sau khi đánh mất quê hương vào tay hoàng đế bạo chúa – người đang cai trị Rome, Lucius trở thành nô lệ giác đấu trong đấu trường Colosseum và phải tìm kiếm sức mạnh từ quá khứ để đưa vinh quang trở lại cho người dân Rome."
    },
    {
      id: 18,
      Trailer: "https://www.youtube.com/embed/-OV2Fv-shro",
      Ten: "TRANSFORMERS MỘT",
      TheLoai: {
        KieuPhim: "Gia đình, Hành động, Phiêu lưu, Hoạt hình, Khoa học - Viễn tưởng",
        ThoiLuong: "123 phút",
        QuocGia: "Mỹ",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T13: Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)"
      },
      Anh: "/images/phim/transformers-mot.jpg",
      IdDanhMuc: 2,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "Josh Cooley",
        DienVien: "Chris Hemsworth; Brian Tyree Henry; Scarlett Johansson",
        NgayKhoiChieu: "27/09/2024"
      },
      ThongTinPhim: "Câu chuyện về nguồn gốc chưa từng được hé lộ của Optimus Prime và Megatron. Hai nhân vật được biết đến như những kẻ thù truyền kiếp, nhưng cũng từng là những người anh em gắn bó, đã thay đổi vận mệnh của Cybertron mãi mãi."
    },
    {
      id: 19,
      Trailer: "https://www.youtube.com/embed/CpcQcKIDYFs",
      Ten: "MỘ ĐOM ĐÓM",
      TheLoai: {
        KieuPhim: "Chiến tranh, Chính kịch, Hoạt hình",
        ThoiLuong: "89 phút",
        QuocGia: "Nhật Bản",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "K: Phim dành cho khán giả mọi lứa tuổi"
      },
      Anh: "/images/phim/mo-dom-dom.jpg",
      IdDanhMuc: 5,
      TrangThai: "sapchieu",
      MoTa: {
        DaoDien: "Takahata Isao",
        DienVien: "Tatsumi Tsutomu, Shiraishi Ayano, Shinohara Yoshiko",
        NgayKhoiChieu: "04/10/2024"
      },
      ThongTinPhim: "Bộ phim được đặt trong bối cảnh giai đoạn cuối chiến tranh thế giới thứ 2 ở Nhật, kể về câu chuyện cảm động về tình anh em của hai đứa trẻ mồ côi."
    },
    {
      id: 20,
      Trailer: "https://www.youtube.com/embed/tp_borHTCKI",
      Ten: "GÃ TRÙM VÔ DANH",
      TheLoai: {
        KieuPhim: "Chính kịch, Hành động, Hình sự",
        ThoiLuong: "110 phút",
        QuocGia: "Hàn Quốc",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T18: Phim dành cho khán giả từ đủ 18 tuổi trở lên (18+)"
      },
      Anh: "/images/phim/ga-trum-vo-danh.jpg",
      IdDanhMuc: 4,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "Lim Sung-yong",
        DienVien: "Chun Jung-myung, Jin Yi-han, Lee Shi-ah, Lee Ha-yul, Kwak Hee-sung, Kim Do-hoon-I,...",
        NgayKhoiChieu: "04/10/2024"
      },
      ThongTinPhim: "Phim kể về gã giang hồ mới nổi Kwon Sang-Gon trở thành một ông trùm băng đảng hùng mạnh. Tưởng chừng gã sẽ được sống quyền lực đứng trên xã hội, nhưng sự thật phũ phàng trong thế giới giang hồ khiến cuộc đời của gã trở thành địa ngục của âm mưu và phản bội."
    },
    {
      id: 21,
      Trailer: "https://www.youtube.com/embed/LaHRWAsZNzs",
      Ten: "Biệt Đội Hot Girl",
      TheLoai: {
        KieuPhim: "Hài, Hành động, Hình sự, Lãng mạn",
        ThoiLuong: "110 phút",
        QuocGia: "Việt Nam",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T16: Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)"
      },
      Anh: "/images/phim/vimage.jpg",
      IdDanhMuc: 2,
      TrangThai: "sapchieu",
      MoTa: {
        DaoDien: "Vĩnh Khương",
        DienVien: "NSND Hoàng Dũng, Mr Kim, Yu CHU, Sam Sony, Bảo Uyên, Tuệ Minh, Thuỳ Trang, Ái Vân, Anna Linh",
        NgayKhoiChieu: "25/10/2024"
      },
      ThongTinPhim: "Câu chuyện của 6 cô gái đến từ 3 quốc gia Châu Á. Họ không biết mình là ai? Đến từ quốc gia nào? HẮC VÔ ĐẠO một tay trùm mafia buôn ma túy, buôn người giải thoát cứu sống 6 cô gái từ lúc nhỏ và nuôi dạy các cô gái trên hoang đảo. Các cô gái trưởng thành, khao khát được yêu nhưng cuộc sống và số phận buộc họ phải thực hiện những phi vụ mạo hiểm, kể cả giết người để bảo vệ những trẻ em vô tội."
    },
    {
      id: 22,
      Trailer: "https://www.youtube.com/embed/lbLk9PzHWfg",
      Ten: "NGÀY TA ĐÃ YÊU",
      TheLoai: {
        KieuPhim: "Tình Cảm, Tâm Lý",
        ThoiLuong: "104'",
        QuocGia: "Khác",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T18: Phim dành cho khán giả từ đủ 18 tuổi trở lên (18+)",
      },
      Anh: "/images/phim/ngay-ta-da-yeu.webp",
      IdDanhMuc: 1,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "John Crowley",
        DienVien: "Andrew Garfield, Florence Pugh, ...",
        NgayKhoiChieu: "15/11/2024",
      },
      ThongTinPhim: "Định mệnh đã đưa một nữ đầu bếp đầy triển vọng và một người đàn ông vừa trải qua hôn nhân đổ vỡ đến với nhau trong tình cảnh đặc biệt. Bộ phim là cuộc tình mười năm sâu đậm của cặp đôi này, từ lúc họ rơi vào lưới tình, xây dựng tổ ấm, cho đến khi một biến cố xảy đến thay đổi hoàn toàn cuộc đời họ."
    },
    {
      id: 23,
      Trailer: "https://www.youtube.com/embed/EIARKqcXILM",
      Ten: "ĐÔI BẠN HỌC YÊU",
      TheLoai: {
        KieuPhim: "Tình Cảm, Hài",
        ThoiLuong: "99'",
        QuocGia: "Hàn Quốc",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T16: Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)",
      },
      Anh: "/images/phim/doi-ban-hoc-yeu.webp",
      IdDanhMuc: 1,
      TrangThai: "sapchieu",
      MoTa: {
        DaoDien: "E.Oni",
        DienVien: "Kim Go Eun, Steve Sanghyun Noh",
        NgayKhoiChieu: "08/11/2024",
      },
      ThongTinPhim: "Bộ phim xoay quanh đôi bạn ngỗ nghịch Jae-hee và Heung-soo cùng những khoảnh khắc “dở khóc dở cười” khi cùng chung sống trong một ngôi nhà. Jae-hee là một cô gái “cờ xanh” với tâm hồn tự do, sống hết mình với tình yêu. Ngược lại, Heung-soo lại là một “cờ đỏ” chính hiệu khi cho rằng tình yêu là sự lãng phí cảm xúc không cần thiết. Bỏ qua những tin đồn lan tràn do người khác tạo ra, Jae-hee và Heung-soo chọn sống chung nhưng yêu theo cách riêng của họ. Hai quan điểm tình yêu trái ngược sẽ đẩy cả hai sang những ngã rẽ và kết cục khác nhau. Sau cùng, Jae-hee hay Heung-soo sẽ về đích trong hành trình “học yêu” này?"
    },
    {
      id: 24,
      Trailer: "https://www.youtube.com/embed/4ALt4VT7grw",
      Ten: "CƯỜI XUYÊN BIÊN GIỚI",
      TheLoai: {
        KieuPhim: "Hài",
        ThoiLuong: "99'",
        QuocGia: "Hàn Quốc",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T13: Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)",
      },
      Anh: "/images/phim/cuoi-xuyen-bien-gioi.webp",
      IdDanhMuc: 3,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "KIM Chang-ju",
        DienVien: "Ryu Seung-ryong, Jin Sun-kyu, Igor Rafael P EDROSO, Luan B RUM DE ABREU E LIMA, JB João Batista GOMES DE O LIVEIRA, Yeom Hye-ran, Go Kyoung-pyo, Lee Soon-won",
        NgayKhoiChieu: "15/11/2024",
      },
      ThongTinPhim: "Cười Xuyên Biên Giới kể về hành trình của Jin-bong (Ryu Seung-ryong) - cựu vô địch bắn cung quốc gia, sau khi nghỉ hưu, anh đã trở thành một nhân viên văn phòng bình thường. Đứng trước nguy cơ bị sa thải, Jin-bong phải nhận một nhiệm vụ bất khả thi là bay đến nửa kia của trái đất trong nỗ lực tuyệt vọng để sinh tồn. Sống sót sau một sự cố đe doạ tính mạng, Jin-bong đã “hạ cánh” xuống khu rừng Amazon, nơi anh gặp bộ ba thổ dân bản địa có kỹ năng bắn cung thượng thừa: Sika, Eeba và Walbu. Tin rằng đã tìm ra cách để tự cứu mình, Jin-bong hợp tác với phiên dịch ngáo ngơ Bbang-sik (Jin Sun-kyu) và đưa ba chiến thần cung thủ đến Hàn Quốc cho một nhiệm vụ táo bạo."
    },
    {
      id: 25,
      Trailer: "https://www.youtube.com/embed/gm8Y562kgfs",
      Ten: "HỘI CÁ VÀNG",
      TheLoai: {
        KieuPhim: "Chính Kịch",
        ThoiLuong: "111'",
        QuocGia: "Khác",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "P: Phim dành cho khán giả mọi lứa tuổi",
      },
      Anh: "/images/phim/hoi-ca-vang.webp",
      IdDanhMuc: 4,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "Alireza Golafshan",
        DienVien: "Ryu Seung-ryong , Jin Sun-kyu, Igor Rafael P EDROSO, Luan B RUM DE ABREU E LIMA, JB João Batista GOMES DE O LIVEIRA, Yeom Hye-ran và Go Kyoung- pyo, Lee Soon-won",
        NgayKhoiChieu: "21/11/2024"
      },
      ThongTinPhim: "Oliver sống cuộc đời bận rộn của một nhà quản lý ngân hàng. Sau tai nạn kinh hoàng khiến anh liệt nửa người và phải ngồi xe lăn, cuộc sống của Oliver hoàn toàn đảo lộn. Những sự tình cờ đưa đẩy anh gặp gỡ Hội Cá vàng – một nhóm bốn người khuyết tật sống chung nhà. Một ngày nọ, các rắc rối tài chính trong quá khứ khiến Oliver và Hội Cá vàng phải lên kế hoạch thực hiện một chuyến phiêu lưu tới Thụy Sĩ; nhiệm vụ của họ: làm sao để buôn một lượng tiền bẩn về Đức trót lọt."
    },
  ],

  // ----- Thể Loại -----
  TheLoai: [
    {
      id: 1,
      Ten: "Tình Cảm",
    },
    {
      id: 2,
      Ten: "Hành động",
    },
    {
      id: 3,
      Ten: "Hài Hước",
    },
    {
      id: 4,
      Ten: "Chính kịch",
    },
    {
      id: 5,
      Ten: "Hoạt Hình - Phiêu lưu",
    },
  ],

  // ----- Blog -----
  Blog: [
    {
      id: 1,
      TenBlog: "Top phim Địch Lệ Nhiệt Ba đã làm nên tên tuổi",
      Anh: "/images/blog/blog1.jpg",
      LuotXem: "314 lượt xem",
    },
    {
      id: 2,
      TenBlog: "Phim cổ trang Trung Quốc 2024khiến bạn cực phấn khích",
      Anh: "/images/blog/blog2.jpg",
      LuotXem: "314 lượt xem",
    },
    {
      id: 3,
      TenBlog: "Top 9 phim của Bạch Lộc Khẩng định tên tuổi xứ Trung",
      Anh: "/images/blog/blog3.jpg",
      LuotXem: "314 lượt xem",
    },
    {
      id: 4,
      TenBlog: "Trò chơi con mực 2 sẽ có gì và được phát sóng khi nào?",
      Anh: "/images/blog/blog4.jpg",
      LuotXem: "314 lượt xem",
    },
    {
      id: 5,
      TenBlog: "Danh sách phim hay Netflix tháng 9/2024",
      Anh: "/images/blog/blog5.jpg",
      LuotXem: "314 lượt xem",
    },
    {
      id: 6,
      TenBlog: "Top phim xuất sắc của Vương Sở Nhiên được đánh giá cao",
      Anh: "/images/blog/blog6.jpg",
      LuotXem: "314 lượt xem",
    },
    {
      id: 7,
      TenBlog:
        "Top 12 phim hoạt hình 3D Trung Quốc hay nhất tới thời điểm hiện tại.",
      Anh: "/images/blog/blog7.jpg",
      LuotXem: "314 lượt xem",
    },
    {
      id: 8,
      TenBlog: "Danh sách phim hay Netflix tháng 8/2024",
      Anh: "/images/blog/blog8.jpg",
      LuotXem: "314 lượt xem",
    },
    {
      id: 9,
      TenBlog: "Top phim Triệu Lộ Tư đóng đáng xem nhất hiện nay",
      Anh: "/images/blog/blog9.jpg",
      LuotXem: "314 lượt xem",
    },
    {
      id: 10,
      TenBlog: "Tổng hợp phim Anime 2024 đang cực kỳ hot hiện nay",
      Anh: "/images/blog/blog10.jpg",
      LuotXem: "314 lượt xem",
    },
  ],

  Blogditals: [
    {
      id: 1,
      MaBlog: 7,
      NoiDung1: "Trảm Thần: Phàm Trần Thần Vực",
      NoiDung2: "hể loại: Anime bộ, Fantasy, Adventure, Action",
      NoiDung3: "Quốc gia: Trung Quốc",
      NoiDung4: "Ngôn ngữ: VietSub",
      NoiDung6: "Năm sản xuất: 2024",
      NoiDung5: "Câu chuyện lấy bối cảnh thời kỳ mạt thế, nơi nguy hiểm luôn rình rập. Bộ phim xoay quanh Lâm Thất Dạ, một thiếu niên được chọn làm đại diện của thần minh. Thông qua sự nỗ lực và giác ngộ của bản thân, Lâm Thất Dạ dần trở thành người gác đêm cho đô thị, với nhiệm vụ bảo vệ quê hương và đất nước khỏi những hiểm nguy. Phim không chỉ mang đến những trận chiến kịch tính mà còn khắc họa hành trình trưởng thành của một người anh hùng giữa thời đại đầy biến động.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240918160932-638622725722888616.jpg"
    },
    {
      id: 2,
      MaBlog: 7,
      NoiDung1: "Đấu Phá Thương Khung Phần 5",
      NoiDung2: "hể loại: Anime bộ, Fantasy, Adventure, Action",
      NoiDung3: "Quốc gia: Trung Quốc",
      NoiDung4: "Ngôn ngữ: VietSub",
      NoiDung5: "Năm sản xuất: 2022",
      NoiDung6: "Câu Sau 3 năm, Tiêu Viêm gặp lại Huân Nhi tại học viện Già Nam. Tại đây, hắn kết bạn với nhiều người, bao gồm Nạp Lan Hoa Viên, người sau này trở thành vợ hắn. Sau khi tốt nghiệp, Tiêu Viêm thành lập Bàn Môn và cùng bạn bè tu luyện. Để nâng cao thực lực và báo thù, Tiêu Viêm mạo hiểm vào Thiên Phần luyện Khí Tháp, thôn phệ Vẫn Lạc Tâm Viêm, và đột phá thành cường giả Đấu Khí Siêu Phẩm. Trên hành trình trở thành cao thủ và Luyện Dược Sư đỉnh cao, Tiêu Viêm được một tôn sư bí mật hướng dẫn. lấy bối cảnh thời kỳ mạt thế, nơi nguy hiểm luôn rình rập. Bộ phim xoay quanh Lâm Thất Dạ, một thiếu niên được chọn làm đại diện của thần minh. Thông qua sự nỗ lực và giác ngộ của bản thân, Lâm Thất Dạ dần trở thành người gác đêm cho đô thị, với nhiệm vụ bảo vệ quê hương và đất nước khỏi những hiểm nguy. Phim không chỉ mang đến những trận chiến kịch tính mà còn khắc họa hành trình trưởng thành của một người anh hùng giữa thời đại đầy biến động.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240815121101-638593206614745240.jpeg"
    },
    {
      id: 3,
      MaBlog: 7,
      NoiDung1: "Thế Giới Hoàn Mỹ",
      NoiDung2: "hể loại: Anime bộ, Fantasy, Adventure, Action",
      NoiDung3: "Quốc gia: Trung Quốc",
      NoiDung4: "Số tập: 182 tập",
      NoiDung7: "Tên khác: Perfect World",
      NoiDung6: "Độ tuổi: PG-13 – Từ đủ 13 tuổi trở lên",
      NoiDung5: "Câu Tần Trần sinh ra trong hoàn cảnh đầy bất hạnh khi là một cô nhi, mang trong mình phế mạch bẩm sinh khiến hắn không thể tu hành như những người khác. Tuy nhiên, với tính cách kiên trì, không chịu khuất phục trước số phận, Tần Trần đã từng bước nghịch thiên cải mệnh, vượt qua mọi giới hạn và trở thành một cường giả truyền kỳ trên Thiên Vũ đại lục. Hành trình của hắn không chỉ là một cuộc chiến chống lại số phận mà còn là minh chứng cho ý chí sắt đá và khát vọng vươn lên từ nghịch cảnh. lấy bối cảnh thời k Thế Giới Hoàn Mỹ là phim hoạt hình 3D Trung Quốc tiên hiệp, huyền bí Trung Quốc ra mắt năm 2021. Được xây dựng trên nền đồ họa 3D, phim mang đến thế giới sống động, đầy màu sắc. Chuyển thể từ tiểu thuyết cùng tên của Thần Đông, phim kể về hành trình tu đạo của Thạch Hạo, người đã trải qua nhiều thử thách và tu luyện để trở thành huyền thoại. Với cốt truyện hấp dẫn và đồ họa ấn tượng, Thế Giới Hoàn Mỹ là tác phẩm không thể bỏ qua trong năm nay.ỳ mạt thế, nơi nguy hiểm luôn rình rập. Bộ phim xoay quanh Lâm Thất Dạ, một thiếu niên được chọn làm đại diện của thần minh. Thông qua sự nỗ lực và giác ngộ của bản thân, Lâm Thất Dạ dần trở thành người gác đêm cho đô thị, với nhiệm vụ bảo vệ quê hương và đất nước khỏi những hiểm nguy. Phim không chỉ mang đến những trận chiến kịch tính mà còn khắc họa hành trình trưởng thành của một người anh hùng giữa thời đại đầy biến động.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240815133113-638593254732673837.jpeg"
    },
    {
      id: 4,
      MaBlog: 7,
      NoiDung1: "Võ Thần Chúa Tể",
      NoiDung2: "Thể loại: Huyền huyễn, Tiên hiệp, Trọng sinh báo thù",
      NoiDung3: "Quốc gia: Trung Quốc",
      NoiDung4: "Tác giả: Ám Ma Sư",
      NoiDung6: "Tên khác: Perfect World",
      NoiDung5: "Câu chuyện lấy bối cảnh thời k Thế Giới Hoàn Mỹ là phim hoạt hình 3D Trung Quốc tiên hiệp, huyền bí Trung Quốc ra mắt năm 2021. Được xây dựng trên nền đồ họa 3D, phim mang đến thế giới sống động, đầy màu sắc. Chuyển thể từ tiểu thuyết cùng tên của Thần Đông, phim kể về hành trình tu đạo của Thạch Hạo, người đã trải qua nhiều thử thách và tu luyện để trở thành huyền thoại. Với cốt truyện hấp dẫn và đồ họa ấn tượng, Thế Giới Hoàn Mỹ là tác phẩm không thể bỏ qua trong năm nay.ỳ mạt thế, nơi nguy hiểm luôn rình rập. Bộ phim xoay quanh Lâm Thất Dạ, một thiếu niên được chọn làm đại diện của thần minh. Thông qua sự nỗ lực và giác ngộ của bản thân, Lâm Thất Dạ dần trở thành người gác đêm cho đô thị, với nhiệm vụ bảo vệ quê hương và đất nước khỏi những hiểm nguy. Phim không chỉ mang đến những trận chiến kịch tính mà còn khắc họa hành trình trưởng thành của một người anh hùng giữa thời đại đầy biến động.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240909133748-638614858681086330.jpeg"
    },
    {
      id: 5,
      MaBlog: 7,
      NoiDung1: "Thần Ẩn Vương Tọa",
      NoiDung2: "Tác giả: Đường Gia Tam Thiếu",
      NoiDung3: "Quốc gia: Trung Quốc",
      NoiDung4: "Thể loại: Tiên Hiệp, Dị Giới",
      NoiDung5: "Câu Thần Ấn Vương Tọa của Đường Gia Tam Thiếu kể về cuộc chiến khốc liệt giữa nhân loại và ma tộc trong bối cảnh sáu đại Thánh Điện đứng lên bảo vệ loài người. Nhân vật chính, Long Hạo Thần là một thiếu niên gia nhập Thánh Điện để cứu mẹ mình, bước vào hành trình đầy bí ẩn và thử thách. Truyện khắc họa rõ nét cuộc chiến sinh tồn của nhân loại, cùng với hành trình của thiếu niên trên con đường trở thành Thần Ấn Vương Tọa – vị kỵ sĩ tối cao với sứ mệnh chống lại ma tộc. lấy bối cảnh thời k Thế Giới Hoàn Mỹ là phim hoạt hình 3D Trung Quốc tiên hiệp, huyền bí Trung Quốc ra mắt năm 2021. Được xây dựng trên nền đồ họa 3D, phim mang đến thế giới sống động, đầy màu sắc. Chuyển thể từ tiểu thuyết cùng tên của Thần Đông, phim kể về hành trình tu đạo của Thạch Hạo, người đã trải qua nhiều thử thách và tu luyện để trở thành huyền thoại. Với cốt truyện hấp dẫn và đồ họa ấn tượng, Thế Giới Hoàn Mỹ là tác phẩm không thể bỏ qua trong năm nay.ỳ mạt thế, nơi nguy hiểm luôn rình rập. Bộ phim xoay quanh Lâm Thất Dạ, một thiếu niên được chọn làm đại diện của thần minh. Thông qua sự nỗ lực và giác ngộ của bản thân, Lâm Thất Dạ dần trở thành người gác đêm cho đô thị, với nhiệm vụ bảo vệ quê hương và đất nước khỏi những hiểm nguy. Phim không chỉ mang đến những trận chiến kịch tính mà còn khắc họa hành trình trưởng thành của một người anh hùng giữa thời đại đầy biến động.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240918160511-638622723110915696.jpg"
    },
    {
      id: 6,
      MaBlog: 7,
      NoiDung1: "Thương Nguyên Đồ",
      NoiDung2: "Số tập: Hơn 50 tập",
      NoiDung3: "Thể loại: Tiên hiệp, Hành động, Anime 3D",
      NoiDung4: "Thời lượng: 20-25 phút mỗi tập",
      NoiDung5: " thương Nguyên Đồ là một anime 3D tiên hiệp Trung Quốc, phát hành năm 2023, kể về hành trình của Mạnh Xuyên, một thợ săn yêu quái trẻ tuổi. Chuyển thể từ tiểu thuyết cùng tên, phim hoạt hình 3D Trung Quốc này đưa người xem vào một thế giới đầy màu sắc, nơi Mạnh Xuyên nuôi ước mơ báo thù cho mẹ và tiêu diệt yêu quái. Cậu gia nhập đạo viện Kính Hồ, trải qua nhiều thử thách để rèn luyện và trở thành một thợ săn yêu quái xuất sắc. Phim kết hợp giữa các trận chiến hấp dẫn, tình huống hài hước, và câu chuyện sâu sắc về tình bạn, tình yêu, và sự hy sinh.k Thế Giới Hoàn Mỹ là phim hoạt hình 3D Trung Quốc tiên hiệp, huyền bí Trung Quốc ra mắt năm 2021. Được xây dựng trên nền đồ họa 3D, phim mang đến thế giới sống động, đầy màu sắc. Chuyển thể từ tiểu thuyết cùng tên của Thần Đông, phim kể về hành trình tu đạo của Thạch Hạo, người đã trải qua nhiều thử thách và tu luyện để trở thành huyền thoại. Với cốt truyện hấp dẫn và đồ họa ấn tượng, Thế Giới Hoàn Mỹ là tác phẩm không thể bỏ qua trong năm nay.ỳ mạt thế, nơi nguy hiểm luôn rình rập. Bộ phim xoay quanh Lâm Thất Dạ, một thiếu niên được chọn làm đại diện của thần minh. Thông qua sự nỗ lực và giác ngộ của bản thân, Lâm Thất Dạ dần trở thành người gác đêm cho đô thị, với nhiệm vụ bảo vệ quê hương và đất nước khỏi những hiểm nguy. Phim không chỉ mang đến những trận chiến kịch tính mà còn khắc họa hành trình trưởng thành của một người anh hùng giữa thời đại đầy biến động.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240815132957-638593253970362116.jpeg"
    },
    {
      id: 7,
      MaBlog: 7,
      NoiDung1: "Đấu La Đại Lục 2: Tuyệt Thế Đường Môn",
      NoiDung2: "Số tập: Hơn 100 tập",
      NoiDung3: "Thể loại: Huyền huyễn, Võ hiệp, Anime 3D",
      NoiDung4: "Thời lượng: 20-25 phút mỗi tập",
      NoiDung5: " Đấu La Đại Lục 2: Tuyệt Thế Đường Môn là một anime 3D thuộc thể loại huyền huyễn võ hiệp, chuyển thể từ tiểu thuyết của Đường Gia Tam Thiếu. Ra mắt năm 2023, bộ phim nhanh chóng thu hút sự yêu thích của cộng đồng fan anime.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240815133553-638593257532000558.jpeg"
    },
    {
      id: 8,
      MaBlog: 7,
      NoiDung1: "Sư Huynh À Sư Huynh ",
      NoiDung2: "Số tập: Hơn 100 tập",
      NoiDung3: "Thể loại: Huyền huyễn, Võ hiệp, Anime 3D",
      NoiDung4: "Thời lượng: 20-25 phút mỗi tập",
      NoiDung5: " Đấu La Đại Lục ư Huynh À Sư Huynh – Shi Xiong A Shi Xiong kể về Lý Trường Thọ, một thanh niên mắc bệnh hiểm nghèo, bất ngờ tái sinh vào thời thượng cổ trước đại chiến phong thần, trở thành một Luyện khí sĩ. Để đạt được trường sinh bất lão, anh luôn hành xử khiêm tốn, tránh xa nguy hiểm và lén luyện đan độc. Tuy nhiên, cuộc sống yên bình của anh bị đảo lộn khi sư phụ nhận một sư muội, và từ đó, Lý Trường Thọ bị cuốn vào hàng loạt rắc rối và hiểm nguy.: Tuyệt Thế Đường Môn là một anime 3D thuộc thể loại huyền huyễn võ hiệp, chuyển thể từ tiểu thuyết của Đường Gia Tam Thiếu. Ra mắt năm 2023, bộ phim nhanh chóng thu hút sự yêu thích của cộng đồng fan anime.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240918161654-638622730144753352.jpg"
    },
    {
      id: 9,
      MaBlog: 7,
      NoiDung1: "Kiếm Lai",
      NoiDung2: "Số tập: Hơn Tên khác: 剑来 | Sword of Coming | The Sword tập",
      NoiDung3: "Thể loại: Huyền huyễn, Võ hiệp, Anime 3D",
      NoiDung4: "Phát hành: 2023",
      NoiDung5: " Kiếm Lai - Sword of Coming (2023) kể về hành trình của một thiếu niên bình thường nhưng gặp một thanh kiếm huyền thoại, từ đó bắt đầu cuộc phiêu lưu phi thường. Thanh kiếm mang đến cho anh sức mạnh vượt qua bầu trời và núi sông, giúp anh trở thành một kiếm khách tài ba. Trong thế giới đầy nguy hiểm, anh khám phá những vùng đất kỳ diệu, đối mặt với thử thách và gặp gỡ những nhân vật đa dạng, từ những người bạn đồng hành đáng tin cậy đến những đối thủ đầy thách thức. La Đại Lục ư Huynh À Sư Huynh – Shi Xiong A Shi Xiong kể về Lý Trường Thọ, một thanh niên mắc bệnh hiểm nghèo, bất ngờ tái sinh vào thời thượng cổ trước đại chiến phong thần, trở thành một Luyện khí sĩ. Để đạt được trường sinh bất lão, anh luôn hành xử khiêm tốn, tránh xa nguy hiểm và lén luyện đan độc. Tuy nhiên, cuộc sống yên bình của anh bị đảo lộn khi sư phụ nhận một sư muội, và từ đó, Lý Trường Thọ bị cuốn vào hàng loạt rắc rối và hiểm nguy.: Tuyệt Thế Đường Môn là một anime 3D thuộc thể loại huyền huyễn võ hiệp, chuyển thể từ tiểu thuyết của Đường Gia Tam Thiếu. Ra mắt năm 2023, bộ phim nhanh chóng thu hút sự yêu thích của cộng đồng fan anime.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240918164903-638622749438490460.jpg"
    },
    {
      id: 10,
      MaBlog: 7,
      NoiDung1: "Tru Tiên",
      NoiDung2: "Thể loại: Huyền huyễn, võ hiệp",
      NoiDung3: "Thời lượng mỗi tập: Khoảng 20-25 phút/tập",
      NoiDung4: "Phát hành: 2023",
      NoiDung5: "Tru Tiên là một bộ anime 3D huyền huyễn võ hiệp được chuyển thể từ tiểu thuyết cùng tên của Tiêu Đỉnh. Bộ phim tái hiện lại một thế giới tiên hiệp đầy màu sắc và những cuộc phiêu lưu của nhân vật chính Trương Tiểu Phàm. Với đồ họa 3D đẹp mắt, cốt truyện hấp dẫn và những trận chiến mãn nhãn, Tru Tiên đã thu hút được đông đảo khán giả.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240816084758-638593948783021419.jpeg"
    },
    {
      id: 11,
      MaBlog: 7,
      NoiDung1: "Thần Võ Thiên Tôn",
      NoiDung2: "Thể loại: Hoạt hình, hành động, giả tưởng, võ hiệp",
      NoiDung3: "Tên tiếng anh: The Legend of Sky Lord",
      NoiDung4: "Phát hành: 2024",
      NoiDung5: "Thần Võ Thiên Tôn thường xoay quanh câu chuyện về một nhân vật chính vốn là một thiên tài võ học hoặc một cường giả bị phản bội, sát hại. Sau khi trọng sinh hoặc xuyên không đến một thế giới khác, nhân vật chính thường rơi vào hoàn cảnh khó khăn, bị xem thường hoặc trở thành phế vật.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240816150223-638594173435794920.jpeg"
    },

    {
      id: 12,
      MaBlog: 7,
      NoiDung1: "Tiên Nghịch",
      NoiDung2: "Thời lượng: 25 Phút/Tập",
      NoiDung3: "Tình trạng: Đang Chiếu",
      NoiDung4: "Phát hành: 2024",
      NoiDung6: "Quốc gia: Trung Quốc",
      NoiDung5: "Vương Lâm là một thiếu niên bình thường, bất ngờ bị cuốn vào thế giới tu tiên và phép thuật của nước Triệu. Ban đầu, anh không có linh căn và hoàn toàn xa lạ với thế giới này. Nhưng sau một hiểu lầm tai hại và sự xuất hiện của một khối thiết tinh bí ẩn, cuộc đời anh thay đổi mãi mãi. Vương Lâm nhận được 'Thần Bí Hạt Châu', một vật phẩm đặc biệt giúp anh dần trở thành một tu sĩ mạnh mẽ.Tuy nhiên, con đường tu tiên của Vương Lâm đầy gian nan. Anh phải đối mặt với vô vàn thử thách, chiến đấu với những thế lực hắc ám và khám phá những bí ẩn sâu thẳm của thế giới tiên hiệp. Hành trình này không chỉ là về sức mạnh, mà còn là về sự trưởng thành, trí tuệ và lòng dũng cảm của anh.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240819164320-638596826005331876.jpeg"
    },
    {
      id: 13,
      MaBlog: 7,
      NoiDung1: "Luyện Khí Mười Vạn Năm",
      NoiDung2: "Thời lượng: 25 Phút/Tập",
      NoiDung3: "Tình trạng: Đang Chiếu",
      NoiDung4: "Phát hành: 2024",
      NoiDung6: "Quốc gia: Trung Quốc",
      NoiDung5: "Mười vạn năm trước, Thiên Lam Tông từng nổi danh khắp giới tu chân, với đệ tử trong tông đều là những kẻ tài năng xuất chúng, bách chiến bách thắng. Tuy nhiên, trong khi các đệ tử khác thăng tiến, khai sơn đệ tử Từ Dương vẫn dừng lại ở Luyện Khí kỳ. Để đột phá tu vi và sớm ngày phi thăng, Từ Dương quyết định bế quan suốt vạn năm.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240820085310-638597407904956598.jpeg"
    },
    {
      id: 14,
      MaBlog: 7,
      NoiDung1: "Thôn Phệ Tinh Không",
      NoiDung2: "Tên tiếng anh: Swallowed Star",
      NoiDung3: "Tình trạng: Đang Chiếu",
      NoiDung4: "tác giả: Ngã Cật Tây Hồng Thị.",
      NoiDung6: "Quốc gia: Trung Quốc",
      NoiDung5: "Thôn Phệ Tinh Không mở ra một thế giới hiện đại tương lai đầy lạ lẫm, nơi mà nhân loại đã tiến bộ vượt bậc nhưng cũng đối diện với vô vàn hiểm nguy từ không gian vô tận. Câu chuyện xoay quanh nhân vật chính La Phong, một chàng trai với ước mơ trở thành võ giả – một nghề nghiệp đầy danh vọng và thử thách trong xã hội tương lai. Ngay từ những phân cảnh đầu tiên, bộ phim cuốn hút người xem bằng chuỗi sự kiện ly kỳ và hấp dẫn, đánh dấu hành trình đầy gian truân của La Phong.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240909133411-638614856519520501.jpeg"
    },

    {
      id: 15,
      MaBlog: 1,
      NoiDung1: "Công Tố Tinh Anh",
      NoiDung2: "Thể loại: Tâm lý, hình sự, chiến trang",
      NoiDung3: "Diễn viên: Địch Lệ Nhiệt Ba, Đồng Đại Vỹ, Cao Hâm, Vưu Tĩnh Như, Lôi Hán, Quách Già Nam, Trương Khả Doanh",
      NoiDung4: "Thời lượng: 40 Tập",
      NoiDung5: " là bộ phim xoay quanh hành trình điều tra và phá án của các công tố viên và cảnh sát, dựa trên những vụ án có thật về tội phạm công nghệ cao tại Trung Quốc. Điều thú vị ở đây là các vụ án trong phim không chỉ là sản phẩm tưởng tượng, mà chúng đều được lấy cảm hứng từ 10 vụ án điển hình đã được cơ quan Kiểm sát Trung Quốc điều tra và xử lý, mang lại cho khán giả một cảm giác rất thực tế, chân thực và gần gũi.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240910134844-638615729246888689.jpeg"
    },
    {
      id: 16,
      MaBlog: 1,
      NoiDung1: "An Lạc Truyện",
      NoiDung2: "Thể loại: Cổ trang, thần thoại",
      NoiDung3: "Diễn viên: Địch Lệ Nhiệt Ba, Cung Tuấn, Lưu Vũ Ninh",
      NoiDung4: "Thời lượng: 39 Tập",
      NoiDung5: " Chuyện phim chuyển thể từ tiểu thuyết'Đế hoàng như' của tác giả Tinh Linh, xoay quanh cuộc đời của Đế Tử Nguyên, do Địch Lệ Nhiệt Ba thủ vai. Tử Nguyên vốn được sinh ra trong một gia đình cao quý, có vị thế đặc biệt là khai quốc công thần. Tuy nhiên, cuộc sống êm đềm của cô bị đảo lộn khi gia tộc gặp biến cố lớn và bị diệt môn, khiến tất cả mọi người trong gia đình đều thiệt mạng, chỉ còn lại một mình cô sống sót. Bị đẩy vào tình cảnh đơn độc, Tử Nguyên không còn lựa chọn nào khác ngoài việc lên núi để tránh xa thế gian. Để bảo toàn danh phận và cuộc sống, cô đã đổi tên thành Nhậm An Lạc, che giấu thân phận thực sự của mình. Sau nhiều năm sống ẩn dật, cô không chỉ tồn tại mà còn trở thành trại chủ của An Lạc Trại, một nơi đầy thách thức nhưng cũng là nơi cô tự xây dựng sức mạnh mới cho bản thân",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240910135637-638615733977717947.jpg"
    },
    {
      id: 17,
      MaBlog: 1,
      NoiDung1: "Liệt Hỏa Như Ca",
      NoiDung2: "Thể loại: Cổ trang, võ thuật",
      NoiDung3: "Đạo diễn: Lương Thắng Quyền",
      NoiDung4: "Thời lượng: 52Tập",
      NoiDung5: "Liệt Hỏa Như Ca là một bộ phim được chuyển thể từ tiểu thuyết cùng tên của Minh Hiểu Khê, với Địch Lệ Nhiệt Ba vào vai nữ chính Liệt Như Ca. Như Ca là con gái của trang chủ Liệt Hỏa sơn trang, và dù sống trong sự quyền quý, nàng vẫn ẩn chứa một bí mật về thân thế của mình. Như Ca thường xuất hiện với trang phục đỏ rực, biểu tượng cho tính cách hoạt bát, mạnh mẽ, yêu ghét rõ ràng của cô. Cuộc đời của nàng không chỉ xoay quanh cuộc chiến giữa các thế lực giang hồ, mà còn gắn bó chặt chẽ với ba chàng trai: Ngân Tuyết, Chiến Phong và Ngọc Tự Hàn.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240910150305-638615773855500803.jpeg"
    },
    {
      id: 18,
      MaBlog: 1,
      NoiDung1: "Tam Sinh Tam Thế Thập Lý Đào Hoa",
      NoiDung2: "Thể loại: Lãng mạn, Tiên hiệp, Trọng sinh, Kỳ ảo",
      NoiDung3: "Đạo diễn: Lâm Ngọc Phân, Dư Thúy Hoa, Nhâm Hài Đào",
      NoiDung4: "Thời lượng: 58 Tập",
      NoiDung5: "Ngay từ những tập đầu, Tam Sinh Tam Thế Thập Lý Đào Hoa đã nhanh chóng tạo nên cơn sốt, thu hút một lượng lớn người hâm mộ và liên tục đứng đầu các bảng xếp hạng phim tại Trung Quốc. Thành công của bộ phim không chỉ đến từ cốt truyện hấp dẫn, mà còn nhờ vào diễn xuất xuất sắc của dàn diễn viên, trong đó Địch Lệ Nhiệt Ba đã tạo dấu ấn sâu sắc với vai diễn của mình. Bộ phim không chỉ mang đến cho khán giả những trải nghiệm tình cảm sâu lắng mà còn mở ra một thế giới huyền ảo, nơi tình yêu có thể vượt qua mọi rào cản về thời gian và không gian. Phim được chuyển thể từ tiểu thuyết cùng tên, xoay quanh câu chuyện tình yêu đầy trắc trở kéo dài qua ba đời, ba kiếp. Cốt truyện đan xen giữa kiếp sống, kiếp chết, giữa những đau khổ và hạnh phúc, tạo nên một mối tình vừa lãng mạn, vừa bi thương. Chính sự phức tạp trong mối quan hệ giữa các nhân vật đã khiến khán giả không thể rời mắt, từ đó giúp bộ phim trở thành một hiện tượng văn hóa.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240910151905-638615783453706605.jpg"
    },
    {
      id: 19,
      MaBlog: 1,
      NoiDung1: "Nghịch Quang Chi Luyến",
      NoiDung2: "Thể loại: Cổ trang, tâm lý, khoa học viễn tưởng",
      NoiDung3: "Diễn viên: Địch Lệ Nhiệt Ba, Mễ Nhiệt, Trịnh Đan Luy, Dương Húc Văn, Trương Dật Kiệt",
      NoiDung4: "Thời lượng: 11 Tập",
      NoiDung5: "Nghịch Quang Chi Luyến là một trong những bộ phim mới nhất của Địch Lệ Nhiệt Ba, mang đến một sắc thái khác biệt với sự pha trộn giữa yếu tố ly kỳ và hấp dẫn. Bộ phim mở ra với một tình tiết đầy bí ẩn về cô gái xuất thân từ một gia đình quyền quý, bị ép đào hôn vào ngày trọng đại của mình. Tuy nhiên, điều bất ngờ xảy ra khi ngay trong ngày cô bỏ trốn, cô đã gặp phải cái chết bí ẩn.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240910135807-638615734878192580.jpg"
    },
    {
      id: 20,
      MaBlog: 1,
      NoiDung1: "Trường Ca Hành",
      NoiDung2: "Thể loại: Cổ trang, lãng mạn",
      NoiDung3: "Diễn viên: Địch Lệ Nhiệt Ba, Triệu Lộ Tư, Lưu Vũ Ninh, Ngô Lỗi",
      NoiDung4: "Thời lượng: 59 Tập",
      NoiDung5: "Bộ phim Trường Ca Hành lấy bối cảnh vào thời nhà Đường, năm Vũ Đức thứ 9, khi nội cung xảy ra biến động lớn và loạn lạc tràn lan khắp nơi. Nhân vật chính, Lý Trường Ca, chỉ mới 14 tuổi, là một cô gái trẻ phải bước vào con đường lưu vong đầy gian nan và nguy hiểm sau biến cố trong hoàng gia.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240910144413-638615762539848188.jpeg"
    },
    {
      id: 21,
      MaBlog: 1,
      NoiDung1: "Hạnh Phúc Trong Tầm Tay",
      NoiDung2: "Thể loại: Cổ trang, lãng mạn",
      NoiDung3: "Diễn viên: Địch Lệ Nhiệt Ba, Trương Hinh Dư, Hồ Binh, Hoàng Cảnh Du,...",
      NoiDung4: "Thời lượng: 45 Tập",
      NoiDung5: "Trong bộ phim Hạnh Phúc Trong Tầm Tay, hai nhân vật chính gặp gỡ nhau qua một định mệnh đầy thú vị. Tuy nhiên, mối quan hệ của họ nhanh chóng bị cản trở bởi một vụ kiện lớn, điều này khiến cả hai không thể tiến xa hơn trong những lần đầu gặp gỡ. Cuộc sống của họ dần trở nên phức tạp hơn khi nhiều vấn đề và mâu thuẫn liên tục xuất hiện, đẩy cả hai vào tình thế khó khăn.Mặc dù vậy, sau khi cùng trải qua hàng loạt thử thách và biến cố, cả hai bắt đầu cảm nhận được sự chân thành từ phía đối phương. Từ sự hiểu lầm và bất hòa ban đầu, tình cảm giữa họ dần nảy nở và phát triển theo cách tự nhiên nhất. Cuối cùng, sau những khó khăn, họ tìm thấy sự đồng điệu và tình yêu, tạo nên một cái kết vô cùng ngọt ngào và hạnh phúc. Bộ phim là hành trình cảm xúc về tình yêu, sự tha thứ và sự trưởng thành của hai con người trước những thử thách của cuộc đời. ",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240910144758-638615764789489085.jpg"
    },
    {
      id: 22,
      MaBlog: 1,
      NoiDung1: "Nghìn lẻ một đêm",
      NoiDung2: "Thể loại: Phim lãng mạn, viễn tưởng",
      NoiDung3: "Đạo diễn: Kim Sâm",
      NoiDung4: "Thời lượng: 48 Tập",
      NoiDung5: "Trong bộ phim lần này, Địch Lệ Nhiệt Ba hóa thân thành một cô gái xinh đẹp và thông minh. Sau khi trải qua một mối tình tan vỡ, cô rơi vào nỗi đau khổ và dằn vặt. Tuy nhiên, cuộc sống của cô dần thay đổi khi xuất hiện Bách Hải, người đã tặng cô một bó hoa an ủi trong lúc khó khăn. Từ đó, anh chính thức theo đuổi cô, và một câu chuyện tình yêu bắt đầu nảy nở. Liệu cô có thể mở lòng và dành tình cảm cho chàng CEO điển trai này sau những tổn thương trong quá khứ? Câu trả lời sẽ được hé lộ trong từng diễn biến của bộ phim, hứa hẹn mang đến cho khán giả những cung bậc cảm xúc thú vị.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240910145530-638615769308728304.jpg"
    },
    {
      id: 23,
      MaBlog: 1,
      NoiDung1: "Ngự Giao Ký",
      NoiDung2: "Thể loại: Cổ trang, tình cảm",
      NoiDung3: "Diễn viên: Nhậm Gia Luân, Địch Lệ Nhiệt Ba",
      NoiDung4: "Thời lượng: 48 Tập",
      NoiDung5: "Ngự Giao Ký kể về câu chuyện tình yêu đầy trắc trở giữa hai con người đến từ hai thế giới hoàn toàn khác biệt. Trong một thế giới nơi mà con người và loài giao long – những sinh vật huyền thoại dưới nước – tồn tại, tình yêu giữa hai thế giới này bị coi là điều cấm kỵ tuyệt đối. Nhân vật chính, một con người và một giao long, đã vô tình đem lòng yêu nhau dù biết rằng, nếu bị phát hiện, một trong hai có thể phải trả giá bằng cả mạng sống.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240910141020-638615742205512271.jpeg"
    },
    {
      id: 24,
      MaBlog: 2,
      NoiDung1: "Phàm Nhân Tu Tiên",
      NoiDung2: "Thể loại: Cổ trang, tình cảm",
      NoiDung3: "Diễn viên chính: Dương Dương, Kim Thần",
      NoiDung4: "",
      NoiDung5: "Cuộc sống yên bình của Hàn Lập sớm bị đảo lộn khi chàng, trong một tình thế ngẫu nhiên, gia nhập vào một môn phái nhỏ đầy bí ẩn giữa thế giới giang hồ đầy rẫy những hiểm nguy và thách thức. Không có tài năng thiên phú hay tư chất nổi trội, Hàn Lập chỉ là một người thường giữa những kẻ đầy tham vọng và sức mạnh. Thế nhưng, chính điều đó lại làm nên sự khác biệt của chàng. Không đầu hàng số phận, Hàn Lập dựa vào nỗ lực không ngừng nghỉ, quyết tâm vượt qua từng khó khăn nhỏ nhất, từng bước một chinh phục những giới hạn của bản thân.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240909094918-638614721586602165.jpg"
    },
    {
      id: 25,
      MaBlog: 2,
      NoiDung1: "Anh Hùng Chí",
      NoiDung2: "Thể loại: Cổ trang, tình cảm",
      NoiDung3: "Diễn viên chính: Thành Nghị, Lý Nhất Đồng",
      NoiDung4: "",
      NoiDung5: "Anh hùng chí, một tác phẩm phim võ thuật Trung Quốc được chuyển thể từ tiểu thuyết cùng tên, đang thu hút sự mong đợi từ đông đảo khán giả và được dự đoán sẽ nằm trong danh sách những bộ phim cổ trang hay nhất năm 2024. Bộ phim không chỉ đơn thuần tái hiện một thế giới võ hiệp huyền bí với những pha hành động võ thuật mãn nhãn, mà còn đưa khán giả vào một cuộc phiêu lưu sâu sắc xoay quanh bốn nhân vật chính, mỗi người đều mang trong mình số phận phức tạp và nhiều bí ẩn chưa được hé lộ.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240909095020-638614722205801459.jpeg"
    },
    {
      id: 26,
      MaBlog: 2,
      NoiDung1: "Thần Điêu Đại Hiệp (Bản Điện Ảnh)",
      NoiDung2: "Dự kiến: 2024",
      NoiDung3: "Diễn viên: Vương Tử Thuần, Triệu Hoa Vi",
      NoiDung4: "",
      NoiDung5: "Vai Tiểu Long Nữ do Vương Tử Thuần, nữ diễn viên sinh năm 2001, thủ vai đã nhanh chóng thu hút sự chú ý của khán giả. Tạo hình của cô trong bộ phim nhận được nhiều đánh giá tích cực, đặc biệt là về nhan sắc và vẻ ngoài lạnh lùng, phù hợp với nhân vật huyền thoại trong lòng người hâm mộ. Tuy nhiên, dù vẻ đẹp của Vương Tử Thuần được đánh giá cao, vẫn có ý kiến cho rằng cô thiếu đi chút khí chất thần tiên và sự thanh thoát mà Tiểu Long Nữ vốn mang trong nguyên tác.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240909095619-638614725798814622.jpg"
    },
    {
      id: 27,
      MaBlog: 2,
      NoiDung1: "Liệt Diễm Chi Vũ Canh Kỷ",
      NoiDung2: "Thời gian phát sóng: 13/03/2024",
      NoiDung3: "Thời lượng: 40 tập",
      NoiDung4: "Diễn viên chính: Nhậm Gia Luân, Hình Phi",
      NoiDung5: "Nhân vật Vũ Canh đại diện cho lòng kiên nhẫn, sự quyết tâm và khả năng vượt qua những khó khăn khắc nghiệt nhất của cuộc đời. Mỗi bước đi của anh là sự hòa trộn giữa đau khổ và hi vọng, giữa thất bại và sự bền bỉ không ngừng nghỉ. Bộ phim không chỉ đơn thuần là một cuộc phiêu lưu mạo hiểm qua những vùng đất xa xôi, mà còn là sự khắc họa sâu sắc hành trình của con người trước những nghịch cảnh và lựa chọn mà cuộc đời đặt ra.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240909095734-638614726544407950.jpg"
    },
    {
      id: 28,
      MaBlog: 2,
      NoiDung1: "Hồ Yêu Tiểu Hồng Nương (Trúc Nghiệp Thiên)",
      NoiDung2: "Thời gian phát sóng: Dự kiến phát sóng 2024 ",
      NoiDung3: "Thời lượng: 30 tập",
      NoiDung4: "Diễn viên chính: Ngoài Lưu Thi Thi, Trương Vân Long",
      NoiDung5: "Hồ Yêu Tiểu Hồng Nương là một bộ phim Trung Quốc thuộc thể loại kiếm hiệp, nơi thế giới của con người và yêu quỷ cùng tồn tại, tạo nên một bối cảnh đầy mê hoặc và huyền bí. Bộ phim khám phá những cuộc xung đột khốc liệt giữa hai gia tộc quyền lực là Đông Phương và Vương Quyền, trong một cuộc chiến tranh giành quyền lực, nơi cả hai bên đều phải đối mặt với những mâu thuẫn sâu sắc và khó khăn không ngừng.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240909101249-638614735693780745.jpg"
    },
    {
      id: 29,
      MaBlog: 2,
      NoiDung1: "Tích Hoa Chỉ",
      NoiDung2: "Thời lượng 40 tập ",
      NoiDung3: "Thể loại: Cổ Trang, Tình Cảm, Chính Kịch",
      NoiDung4: "Diễn viên: Hu Yitian, Zhang Jingyi, Wu Xize, Lu Yuxiao",
      NoiDung5: "Hoa phủ, từng là gia tộc cao quý hiển hách, bỗng chốc rơi vào bi kịch khi bị tịch biên và lưu đày, chỉ còn lại những người phụ nữ và trẻ em lạc lõng, không nơi nương tựa. Trong hoàn cảnh khốn khó đó, đại tiểu thư Hoa Chỉ buộc phải thoát khỏi vỏ bọc ngốc nghếch mà cô từng khoác lên để che giấu tài năng. Không còn thời gian để giả vờ yếu đuối, Hoa Chỉ đứng lên dẫn dắt những người phụ nữ trong gia đình thực hiện một cuộc lột xác ngoạn mục. Họ không chỉ thoát khỏi cảnh đói rét, mà còn đương đầu với vô vàn thử thách đầy nguy hiểm, từng bước xây dựng lại cuộc đời trong gian truân.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240909102006-638614740060469037.jpg"
    },
    {
      id: 30,
      MaBlog: 3,
      NoiDung1: "Bắc Thượng – Northwards",
      NoiDung2: " ",
      NoiDung3: "",
      NoiDung4: "",
      NoiDung5: "'Bắc Thượng' được chuyển thể từ tiểu thuyết nổi tiếng cùng tên của nhà văn Từ Tắc Thần, một tác phẩm từng đoạt giải thưởng văn học Mao Thuẫn danh giá. Bộ phim khắc họa hành trình đầy thử thách của những người trẻ lớn lên bên dòng kênh Kinh Hàng Đại Vận Hà, vượt qua gian khó để lập nghiệp, và cuối cùng trở về quê hương phát triển.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-241009135319-638640787993130611.jpg"
    },
    {
      id: 31,
      MaBlog: 3,
      NoiDung1: "Bạch nguyệt phạn tinh – Chasing the Moon / Moonlight Mystique",
      NoiDung2: " ",
      NoiDung3: "",
      NoiDung4: "",
      NoiDung5: "Bạch Nguyệt Phạn Tinh kể về hành trình phiêu lưu đầy biến động của Bạch Thước (do Bạch Lộc thủ vai), nhị tiểu thư phủ Tướng Quân, một cô gái người phàm từ bỏ cuộc sống bình yên để bước chân vào con đường tu tiên nhằm báo hiếu và trả ơn.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-241009135355-638640788354213118.jpg"
    },
    {
      id: 31,
      MaBlog: 3,
      NoiDung1: "Dĩ ái vi doanh – Only for love (2023)",
      NoiDung2: " ",
      NoiDung3: "",
      NoiDung4: "",
      NoiDung5: "'Dĩ Ái Vi Doanh' là bộ phim đánh dấu sự xuất hiện đầy ấn tượng của Bạch Lộc trong vai Trịnh Thư Ý, một phóng viên tài năng của tạp chí Kinh tế Tài Chính. Vì hiểu lầm cháu gái của Thời Yến là tiểu tam chen ngang vào chuyện tình cảm của mình, Thư Ý quyết định lên kế hoạch 'tán đổ' Thời Yến để trả thù.Thời Yến, do Vương Hạc Đệ thủ vai, là vị tổng tài điển trai, tài năng của tập đoàn đầu tư Minh Dự Vân Sang. Bên ngoài, anh luôn tỏ ra lạnh lùng trước những lời tán tỉnh của Thư Ý, nhưng thực chất, anh đã để ý đến cô từ lâu. Sau bao nhiêu thử thách và biến cố, khi cuối cùng Thư Ý cũng chiếm được trái tim Thời Yến, cô mới bàng hoàng nhận ra rằng mình đã tán nhầm bạn trai.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-241009135434-638640788742791187.jpg"
    },
    {
      id: 32,
      MaBlog: 3,
      NoiDung1: "Chiêu Diêu – The Legends (2019)",
      NoiDung2: " ",
      NoiDung3: "",
      NoiDung4: "",
      NoiDung5: "Ciêu Diêu là một bộ phim truyền hình cổ trang kiếm hiệp kết hợp yếu tố huyền huyễn, chuyển thể từ tiểu thuyết cùng tên của tác giả Cửu Lộ Phi Hương. Bộ phim thu hút sự chú ý bởi sự tham gia của dàn diễn viên nổi tiếng như Hứa Khải, Bạch Lộc, Tiêu Yến và Đại Húc. Đây cũng là lần đầu tiên cặp đôi màn ảnh Bạch Lộc và Hứa Khải kết hợp, tạo nên nhiều phản hồi tích cực từ phía khán giả.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-241014092952-638644949921665281.jpg"
    },
    {
      id: 33,
      MaBlog: 3,
      NoiDung1: "Lucky’s First Love (2019)",
      NoiDung2: " ",
      NoiDung3: "",
      NoiDung4: "",
      NoiDung5: "Cốt truyện tập trung vào nhân vật Hình Vận (do Bạch Lộc thủ vai), một cô gái 24 tuổi sống lạc quan, yêu đời và có tính cách lương thiện. Nhờ cái tên mang ý nghĩa may mắn, Hình Vận được Hạ Kha (Hình Chiêu Lâm thủ vai) – một tổng giám đốc trẻ đầy nhiệt huyết trong lĩnh vực phát triển game – tuyển dụng vào công ty của anh với mong muốn cô trở thành vật cát tường cho công ty. Từ đây, câu chuyện tình yêu ngọt ngào nhưng cũng đầy trớ trêu giữa Hình Vận và Hạ Kha bắt đầu nảy nở.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-241014093303-638644951832514782.jpg"
    },
    {
      id: 34,
      MaBlog: 3,
      NoiDung1: "Ninh an như mộng – Story of kunning palace (2023)",
      NoiDung2: " ",
      NoiDung3: "",
      NoiDung4: "",
      NoiDung5: "Ninh An Như Mộng là tác phẩm chuyển thể từ tiểu thuyết Khôn Ninh của Thời Kính, do đạo diễn tài ba Chu Nhuệ Bân chỉ đạo. Bộ phim mở ra câu chuyện đầy kịch tính về Khương Tuyết Ninh (Bạch Lộc), người phụ nữ không ngần ngại dùng mọi thủ đoạn để bước lên ngôi hoàng hậu, nhưng cuối cùng bị ép phải tự sát. Định mệnh tưởng chừng đã khép lại, nhưng cô may mắn trùng sinh, quyết tâm thay đổi số phận nghiệt ngã.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-241009135526-638640789261193829.jpg"
    },
    {
      id: 35,
      MaBlog: 3,
      NoiDung1: "Một đời một kiếp – Forever and Ever (2021)",
      NoiDung2: " ",
      NoiDung3: "",
      NoiDung4: "",
      NoiDung5: "Trong phần này, Bạch Lộc hóa thân thành Thời Nghi, một nữ diễn viên lồng tiếng hàng đầu với tính cách dịu dàng và thân thiện. Tình cờ gặp gỡ giáo sư hóa học Châu Sinh Thần (do Nhậm Gia Luân thủ vai) tại sân bay, cả hai nhanh chóng cảm nhận được sự gắn kết đặc biệt, như thể đã quen biết từ lâu.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-241009151105-638640834659127531.jpg"
    },
    {
      id: 36,
      MaBlog: 3,
      NoiDung1: "Nửa là đường mật, nửa là đau thương – Love Is Sweet (2020)",
      NoiDung2: " ",
      NoiDung3: "",
      NoiDung4: "",
      NoiDung5: "Tại nơi làm việc mới, Giang Quân gặp lại Viên Soái – người bạn thời thơ ấu, hiện tại đã trở thành tổng tài quyền lực. Mặc dù cả hai luôn tranh cãi và dường như đứng trên hai chiến tuyến đối lập, nhưng thực tế Viên Soái đã âm thầm yêu Giang Quân suốt nhiều năm mà không dám bày tỏ tình cảm. Khi Giang Quân bắt đầu hẹn hò với người khác, Viên Soái không chấp nhận tình huống này và tìm đủ mọi cách để phá hoại mối quan hệ của cô, với mong muốn giành lại trái tim người con gái anh yêu thầm.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-241014104359-638644994391336875.jpg"
    },
    {
      id: 37,
      MaBlog: 3,
      NoiDung1: "Cảnh sát vinh dự – Ordinary greatness (2022)",
      NoiDung2: " ",
      NoiDung3: "",
      NoiDung4: "",
      NoiDung5: "Lý Đại Vi (Trương Nhược Quân) là một chàng trai ngang bướng, nghịch ngợm, đến với ngành cảnh sát theo sự ép buộc của bố mẹ. Dương Thụ (Từ Khai Sính), tốt nghiệp thạc sĩ luật từ Đại học Bắc Kinh, là hình mẫu của sự cứng nhắc và chính trực. Hạ Khiết (Bạch Lộc), thừa hưởng tinh thần kiên cường từ cha, luôn nung nấu ước mơ trở thành nữ cảnh sát mạnh mẽ. Triệu Kế Vỹ (Tào Lộ) xuất thân từ vùng nông thôn, với lòng nỗ lực không ngừng nghỉ, quyết tâm vươn lên để khẳng định bản thân trong đội ngũ.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-241009151219-638640835392555030.jpg"
    },
    {
      id: 38,
      MaBlog: 4,
      NoiDung1: "Squid Game 2 là gì?",
      NoiDung2: "Squid Game 2 là phần tiếp theo đầy kịch tính của bộ phim Hàn Quốc đình đám Trò chơi con mực, tác phẩm đã gây bão toàn cầu sau khi ra mắt trên Netflix năm 2021. Câu chuyện xoay quanh những con người cùng quẫn, phải đối mặt với thử thách sinh tử trong một cuộc thi đầy tàn nhẫn, với hy vọng giành giải thưởng khổng lồ lên tới 45,6 tỷ won. ",
      NoiDung3: "Để chạm đến mục tiêu này, họ phải tham gia những trò chơi dân gian Hàn Quốc, nhưng giờ đây đã biến thành những thử thách đẫm máu. Luật chơi đơn giản nhưng tàn nhẫn: chiến thắng để tiếp tục, thất bại đồng nghĩa với cái chết. Phần đầu của bộ phim kết thúc, để lại nhiều bí ẩn chưa được giải đáp.",
      NoiDung4: "",
      NoiDung5: "Trong thời gian chờ đợi, hãy biến ngôi nhà của bạn thành rạp chiếu phim với máy chiếu chất lượng cao, âm thanh và hình ảnh sống động, để cùng gia đình hồi tưởng lại những khoảnh khắc đáng nhớ từ Squid Game phần 1.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-241001172225-638634001458429582.jpg"
    },
    {
      id: 39,
      MaBlog: 4,
      NoiDung1: "Thời gian ra mắt Squid Game 2",
      NoiDung2: "Theo lời của anh, Squid Game 2 sẽ bắt đầu quay vào mùa hè và dự kiến quá trình quay phim sẽ kéo dài khoảng 10 tháng. Phần 1 đã có thời gian quay tương đương, nhưng tiến trình bị chậm trễ hơn dự kiến do tác động của đại dịch COVID-19.",
      NoiDung3: "Trong một cuộc phỏng vấn với Ilgan Sports, diễn viên Lee Jung Jae, người thủ vai chính Seong Gi Hun trong Squid Game 2, đã tiết lộ rằng quá trình sản xuất cho phần tiếp theo sẽ mất nhiều thời gian hơn so với phần 1. Vậy Squid Game 2 bao giờ ra mắt?",
      NoiDung4: "",
      NoiDung5: "Tuy Lee Jung Jae không biết chính xác ngày phát sóng Squid Game 2, nhưng theo anh, có khả năng phần tiếp theo sẽ được ra mắt vào cuối năm 2024.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-241001172302-638634001827082714.jpg"
    },
    {
      id: 40,
      MaBlog: 5,
      NoiDung1: "Ngày 1-10",
      NoiDung2: "21 Jump Street (2012) – Jonah Hill và Channing Tatum vào vai hai cảnh sát kém cỏi cải trang thành học sinh trung học để phá đường dây ma túy.",
      NoiDung3: "22 Jump Street (2014) – Hill và Tatum trở lại với phần tiếp theo của bộ phim hài này.",
      NoiDung4: "8 Mile (2002) – Eminem vào vai một rapper đang gặp khó khăn đến từ Detroit đang cố gắng vượt qua những trở ngại cá nhân và xã hội để thành công trong thế giới hip-hop.",
      NoiDung5: "As Above, So Below (2014) – Perdita Weeks vào vai chính trong bộ phim kinh dị được quay bằng máy quay phim tìm thấy này khi một nhóm nhà thám hiểm mạo hiểm vào hầm mộ bên dưới Paris, chỉ để khám phá ra những bí mật kinh hoàng.",
      NoiDung6: "The Girl Next Door (2004) – Emile Hirsch vào vai một học sinh cuối cấp trung học phải lòng cô gái hàng xóm, chỉ để phát hiện ra rằng cô ấy từng là một ngôi sao phim khiêu dâm.",
      NoiDung7: "The Mechanic (2011) – Jason Statham đóng cùng Ben Foster trong bộ phim kinh dị tội phạm này về một sát thủ thuê một học viên mới.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-241001172302-638634001827082714.jpg",
    },
    {
      id: 41,
      MaBlog: 5,
      NoiDung1: "Ngày 3-10",
      NoiDung2: "#OOTD: Outfit of the Designer (2024) – Phim truyền hình Indonesia.",
      NoiDung3: "Blue Box (Phần 1) Netflix Original – Phim hoạt hình.",
      NoiDung4: "Dan Da Dan (Phần 1) Tập mới hàng tuần – Phim hoạt hình",
      NoiDung5: "Ninjago: Dragons Rising (Phần 2 – Phần 2) Netflix Original – Phim hoạt hình dựa trên loạt phim ăn theo LEGO.",
      NoiDung6: "The Bad Guys: Haunted Heist (2024) Netflix Original – Một phim đặc biệt mới dựa trên bộ phim ăn khách của DreamWorks ra mắt đúng vào dịp Halloween.",
      NoiDung7: "The Mechanic (2011) – Jason Statham đóng cùng Ben Foster trong bộ phim kinh dị tội phạm này về một sát thủ thuê một học viên mới.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-upload-api-210419145303-637544407836917198.jpeg",
    },
    {
      id: 42,
      MaBlog: 5,
      NoiDung1: "Ngày 4-10",
      NoiDung2: "CTRL (2014) Netflix Original – Phim kinh dị Ấn Độ có sự tham gia của Ananya Panday và Vihaan Samat về một cặp đôi có sức ảnh hưởng tưởng chừng hoàn hảo nhưng mọi chuyện lại trở nên tồi tệ sau một vụ lừa dối và sự tham gia của AI.",
      NoiDung3: "Chúc may mắn!! (Phần 1) – Phim truyền hình lãng mạn Nhật Bản.",
      NoiDung4: "Dan Da Dan (Phần 1) Tập mới hàng tuần – Phim hoạt hình",
      NoiDung5: "Ninjago: Dragons Rising (Phần 2 – Phần 2) Netflix Original – Phim hoạt hình dựa trên loạt phim ăn theo LEGO.",
      NoiDung6: "The Bad Guys: Haunted Heist (2024) Netflix Original – Một phim đặc biệt mới dựa trên bộ phim ăn khách của DreamWorks ra mắt đúng vào dịp Halloween.",
      NoiDung7: "The Mechanic (2011) – Jason Statham đóng cùng Ben Foster trong bộ phim kinh dị tội phạm này về một sát thủ thuê một học viên mới.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-upload-api-210817141449-637648064897380091.jpeg",
    },
    {
      id: 43,
      MaBlog: 5,
      NoiDung1: "Ngày 5-10",
      NoiDung2: "Orb: On the Movements of the Earth (Phần 1 – Tập mới hàng tuần) – Loạt phim hoạt hình mới về một đứa trẻ thần đồng đang nghiên cứu trong khi trốn tránh Tòa án dị giáo.",
      NoiDung3: "Ranma1/2 (Phần 1) Netflix Original – Loạt phim hoạt hình shounen về Akane Tendo, người gặp vị hôn phu mới kỳ diệu của mình, người biến thành một cô gái khi chạm vào nước.",
      NoiDung4: "Dan Da Dan (Phần 1) Tập mới hàng tuần – Phim hoạt hình",
      NoiDung5: "Ninjago: Dragons Rising (Phần 2 – Phần 2) Netflix Original – Phim hoạt hình dựa trên loạt phim ăn theo LEGO.",
      NoiDung6: "The Bad Guys: Haunted Heist (2024) Netflix Original – Một phim đặc biệt mới dựa trên bộ phim ăn khách của DreamWorks ra mắt đúng vào dịp Halloween.",
      NoiDung7: "The Mechanic (2011) – Jason Statham đóng cùng Ben Foster trong bộ phim kinh dị tội phạm này về một sát thủ thuê một học viên mới.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-241022154819-638652088992050738.jpg",
    },
    {
      id: 44,
      MaBlog: 5,
      NoiDung1: "Ngày 6-10",
      NoiDung2: "Orb: On the Movements of the Earth (Phần 1 – Tập mới hàng tuần) – Loạt phim hoạt hình mới về một đứa trẻ thần đồng đang nghiên cứu trong khi trốn tránh Tòa án dị giáo.",
      NoiDung3: "Time Cut (2024) Netflix Original – Madison Bailey và Antonia Gentry là tiêu đề của bộ phim kinh dị mới này về một cô gái tuổi teen được gửi trở lại đầu những năm 2000 để ngăn chặn một kẻ giết người tàn bạo.",
      NoiDung4: "Vụ bắt cóc người ngoài hành tinh ở Manhattan (Phần 1) Netflix Original – Phim tài liệu về một người phụ nữ khẳng định mình bị người ngoài hành tinh bắt cóc khi đang sống ở Manhattan.",
      NoiDung5: "Ninjago: Dragons Rising (Phần 2 – Phần 2) Netflix Original – Phim hoạt hình dựa trên loạt phim ăn theo LEGO.",
      NoiDung6: "The Bad Guys: Haunted Heist (2024) Netflix Original – Một phim đặc biệt mới dựa trên bộ phim ăn khách của DreamWorks ra mắt đúng vào dịp Halloween.",
      NoiDung7: "The Mechanic (2011) – Jason Statham đóng cùng Ben Foster trong bộ phim kinh dị tội phạm này về một sát thủ thuê một học viên mới.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-upload-api-211115105152-637725703121767525.jpeg",
    },
    {
      id: 45,
      MaBlog: 5,
      NoiDung1: "Ngày 7-10",
      NoiDung2: "In Her Place (2024) Netflix Original – Phim chính kịch Chile về một nhà văn giết người tình và bắt đầu mối quan hệ với một nhân viên tính toán của tòa án.",
      NoiDung3: "Time Cut (2024) Netflix Original – Madison Bailey và Antonia Gentry là tiêu đề của bộ phim kinh dị mới này về một cô gái tuổi teen được gửi trở lại đầu những năm 2000 để ngăn chặn một kẻ giết người tàn bạo.",
      NoiDung4: "Outside (2024) Netflix Original – Phim kinh dị Philippines của đạo diễn Carlo Ledesma. Một đợt bùng phát dữ dội buộc một gia đình phải tìm nơi trú ẩn trong một ngôi nhà nông trại bỏ",
      NoiDung5: "Ninjago: Dragons Rising (Phần 2 – Phần 2) Netflix Original – Phim hoạt hình dựa trên loạt phim ăn theo LEGO.",
      NoiDung6: "The Bad Guys: Haunted Heist (2024) Netflix Original – Một phim đặc biệt mới dựa trên bộ phim ăn khách của DreamWorks ra mắt đúng vào dịp Halloween.",
      NoiDung7: "The Mechanic (2011) – Jason Statham đóng cùng Ben Foster trong bộ phim kinh dị tội phạm này về một sát thủ thuê một học viên mới.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-upload-api-210809081204-637640935248813408.jpeg",
    },
    {
      id: 46,
      MaBlog: 5,
      NoiDung1: "Ngày 8-10",
      NoiDung2: "Ali Wong: Single Lady (2024) Netflix Original – Chương trình hài độc thoại đặc biệt.",
      NoiDung3: "Dinner Time Live with David Chang (Phần 2 – TRỰC TIẾP) Netflix Original – Các tập trực tiếp hàng tuần của chương trình trò chuyện nấu ăn.",
      NoiDung4: "Her Blue Sky (2019) – Phim hoạt hình – Aoi Aioi, học sinh trung học năm thứ hai, khao khát trở thành nhạc sĩ, bị vướng vào một tình huống phức tạp khi Shinnosuke, bạn trai cũ của chị gái cô, trở về thị trấn, trong khi một phiên bản trẻ hơn của anh ta bí ẩn xuất hiện, khiến Aoi trải nghiệm mối tình đầu của mình giữa lời mời tham dự lễ hội âm nhạc và những hy sinh trong quá khứ của gia đình.",
      NoiDung5: "Ninjago: Dragons Rising (Phần 2 – Phần 2) Netflix Original – Phim hoạt hình dựa trên loạt phim ăn theo LEGO.",
      NoiDung6: "The Bad Guys: Haunted Heist (2024) Netflix Original – Một phim đặc biệt mới dựa trên bộ phim ăn khách của DreamWorks ra mắt đúng vào dịp Halloween.",
      NoiDung7: "The Mechanic (2011) – Jason Statham đóng cùng Ben Foster trong bộ phim kinh dị tội phạm này về một sát thủ thuê một học viên mới.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-upload-api-210419164756-637544476760164339.jpeg",
    },
    {
      id: 47,
      MaBlog: 5,
      NoiDung1: "Ngày 9-10",
      NoiDung2: "Deceitful Love (Phần 1) Netflix Original – Phim truyền hình lãng mạn Ý.",
      NoiDung3: "Starting 5 (Phần 1) Netflix Original – Phim tài liệu thể thao theo chân năm siêu sao NBA trong suốt mùa giải 2023/24.",
      NoiDung5: "The Secret of the River (2024) Netflix Original – Phim truyền hình về một cậu bé kỳ lạ đến một ngôi làng nhỏ ở Mexico.",
      NoiDung6: "The Bad Guys: Haunted Heist (2024) Netflix Original – Một phim đặc biệt mới dựa trên bộ phim ăn khách của DreamWorks ra mắt đúng vào dịp Halloween.",
      NoiDung7: "The Mechanic (2011) – Jason Statham đóng cùng Ben Foster trong bộ phim kinh dị tội phạm này về một sát thủ thuê một học viên mới.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-upload-api-211115142625-637725831853488797.jpg",
    },
    {
      id: 48,
      MaBlog: 5,
      NoiDung1: "Ngày 10-10",
      NoiDung2: "Girl Haunts Boy (2024) – Peyton List và Michael Cimino đóng vai chính trong bộ phim giả tưởng lãng mạn này về một cậu bé được một hồn ma đã sống trong ngôi nhà của mình hơn một thế kỷ viếng thăm.",
      NoiDung3: "Outer Banks (Phần 4 – Phần 1) Netflix Original – Năm tập đầu tiên của loạt phim truyền hình về tuổi mới lớn hàng đầu của Netflix.",
      NoiDung5: "The Life and Movies of Erşan Kuneri (Phần 2) Netflix Original – Sự trở lại của bộ phim hài tình huống Thổ Nhĩ Kỳ.",
      NoiDung6: "The Bad Guys: Haunted Heist (2024) Netflix Original – Một phim đặc biệt mới dựa trên bộ phim ăn khách của DreamWorks ra mắt đúng vào dịp Halloween.",
      NoiDung7: "The Mechanic (2011) – Jason Statham đóng cùng Ben Foster trong bộ phim kinh dị tội phạm này về một sát thủ thuê một học viên mới.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-upload-api-201117163656-637412278168940929.jpg",
    },
    {
      id: 48,
      MaBlog: 5,
      NoiDung1: "Ngày 11-10",
      NoiDung2: "Girl Haunts Boy (2024) – Peyton List và Michael Cimino đóng vai chính trong bộ phim giả tưởng lãng mạn này về một cậu bé được một hồn ma đã sống trong ngôi nhà của mình hơn một thế kỷ viếng thăm.",
      NoiDung3: "Outer Banks (Phần 4 – Phần 1) Netflix Original – Năm tập đầu tiên của loạt phim truyền hình về tuổi mới lớn hàng đầu của Netflix.",
      NoiDung5: "The Life and Movies of Erşan Kuneri (Phần 2) Netflix Original – Sự trở lại của bộ phim hài tình huống Thổ Nhĩ Kỳ.",
      NoiDung6: "The Bad Guys: Haunted Heist (2024) Netflix Original – Một phim đặc biệt mới dựa trên bộ phim ăn khách của DreamWorks ra mắt đúng vào dịp Halloween.",
      NoiDung7: "The Mechanic (2011) – Jason Statham đóng cùng Ben Foster trong bộ phim kinh dị tội phạm này về một sát thủ thuê một học viên mới.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-241022155423-638652092631802639.jpg",
    },
    {
      id: 49,
      MaBlog: 6,
      NoiDung1: "Về Vương Sở Nhiên",
      NoiDung2: "",
      NoiDung3: "",
      NoiDung5: "Với gương mặt hoàn mỹ như một tác phẩm điêu khắc tinh tế, Vương Sở Nhiên (王楚然, 21/1/1999) không chỉ đơn thuần là một biểu tượng nhan sắc, mà còn là ngôi sao đang lên giữa bầu trời đầy sao của nền giải trí Hoa ngữ. Những đường nét sắc sảo và hài hòa như được thiên nhiên ưu ái ban tặng khiến cô trở thành tâm điểm chú ý. Đầu năm 2023, Vương Sở Nhiên bất ngờ khuấy động màn ảnh với vai nữ chính trong Nghe Nói Em Thích Tôi, mang đến một làn gió mới trong cảm xúc của khán giả. Và chỉ ít lâu sau, cô lại cùng Dương Dương cháy trên màn ảnh với Khói Lửa Nhân Gian Của Tôi, không chỉ chinh phục người xem bằng diễn xuất mà còn tạo nên một dấu ấn không thể quên, khiến cái tên Vương Sở Nhiên trở thành tâm điểm của mọi bàn luận nghệ thuật.",
      NoiDung6: "",
      NoiDung7: "",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-upload-api-210809081145-637640935052134311.jpeg",
    },
    {
      id: 50,
      MaBlog: 6,
      NoiDung1: "Phong Ảnh Nhiên Mai Hương",
      NoiDung2: "Thể loại: Tình Cảm, Cổ trang",
      NoiDung3: "Đạo diễn: Quách Kính Minh",
      NoiDung4: "Diễn viên: Vương Sở Nhiên, Lý Hoành Nghị, Diêm An, Trần Vũ Hiền, Biên Trình, Âu Mễ Đức, Hồ Ý Hoàn, Tả Diệp, Đổng Tuyền, ",
      NoiDung5: "Với gương mặt hoàn mỹ như một tác phẩm điêu khắc tinh tế, Vương Sở Nhiên (王楚然, 21/1/1999) không chỉ đơn thuần là một biểu tượng nhan sắc, mà còn là ngôi sao đang lên giữa bầu trời đầy sao của nền giải trí Hoa ngữ. Những đường nét sắc sảo và hài hòa như được thiên nhiên ưu ái ban tặng khiến cô trở thành tâm điểm chú ý. Đầu năm 2023, Vương Sở Nhiên bất ngờ khuấy động màn ảnh với vai nữ chính trong Nghe Nói Em Thích Tôi, mang đến một làn gió mới trong cảm xúc của khán giả. Và chỉ ít lâu sau, cô lại cùng Dương Dương cháy trên màn ảnh với Khói Lửa Nhân Gian Của Tôi, không chỉ chinh phục người xem bằng diễn xuất mà còn tạo nên một dấu ấn không thể quên, khiến cái tên Vương Sở Nhiên trở thành tâm điểm của mọi bàn luận nghệ thuật.",
      NoiDung6: "",
      NoiDung7: "",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240906100734-638612140543731444.jpg",
    },

    {
      id: 51,
      MaBlog: 6,
      NoiDung1: "Mộc Lan Không Huynh Trưởng (2025)",
      NoiDung2: "Tên tiếng Anh: Mulan Renewal",
      NoiDung3: "Biên kịch: Trương Văn Lương ",
      NoiDung4: "Vào thời Bắc Ngụy, khi Thác Bạt Đào lên ngôi hoàng đế, vương triều đang chìm trong những cuộc chiến khốc liệt. Giữa bối cảnh ấy, Hoa Mộc Lan  một thiếu nữ mang trong mình dòng máu quân nhân lớn lên trong gia đình quân hộ nơi mà nam nhân đời đời phải tòng quân để bảo vệ quê hương. Đối diện với cảnh người cha già yếu không còn đủ sức cầm gươm, nàng không ngần ngại cải trang thành nam nhi, thay cha bước vào chiến trường đầy khốc liệt.",
      NoiDung5: "Hoa Mộc Lan không chỉ nổi bật bởi khí chất mạnh mẽ, rắn rỏi mà còn toát lên sự thuần khiết, mong manh khiến người ta vừa kính nể vừa xót xa. Được tôi luyện võ công từ nhỏ, nàng ngỡ rằng sẽ giống như cha, một chiến sĩ bất khuất, lập nên chiến công hiển hách. Thế nhưng, cuộc đời không bao giờ dễ dàng như thế. Vừa gia nhập quân doanh, nàng đã bị tổ chức tình báo chú ý và trở thành đối tượng bị điều tra. Mộc Lan bị chuyển đến một tiểu đội nhỏ, nơi mà những người lính dường như đã bị bỏ rơi trong cuộc chiến. Không chùn bước trước sự thử thách, nàng kiên cường dẫn dắt đồng đội, âm thầm nuôi chí lớn, hướng về những mục tiêu cao cả. Trong mỗi bước đi, cô gái ấy không chỉ chiến đấu với kẻ thù mà còn với số phận, biến mọi thử thách thành động lực để vươn tới tương lai.",
      NoiDung7: "",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-upload-api-210905163602-637664565622816916.jpeg",
    },
    {
      id: 52,
      MaBlog: 6,
      NoiDung1: "Liễu Chu Ký/Kiều Tàng",
      NoiDung2: "hể loại: Cổ đại, Tình Cảm, Cổ trang",
      NoiDung3: "Biên kịch: Triệu Thiên Hữu",
      NoiDung4: "Diễn viên chính: Trương Vãn Ý, Vương Sở Nhiên, Lưu Linh Tư, Thường Hoa Sâm, Trương Thỉ, Viên Vũ Huyên",
      NoiDung5: "Liễu Chu Ký (Kiều Tàng) từng được dự đoán sẽ trở thành một trong những tác phẩm cổ trang đình đám nhất năm 2024. Với sự kỳ vọng lớn từ người hâm mộ và giới phê bình, bộ phim hứa hẹn mang lại những khung cảnh hoành tráng cùng cốt truyện sâu sắc. Tuy nhiên, khi ra mắt, Liễu Chu Ký lại vấp phải những khó khăn không ngờ. Sự thiếu nhất quán trong kịch bản và một số hạn chế trong diễn xuất khiến bộ phim không thể tạo được tiếng vang ngay từ những tập đầu.",
      NoiDung7: "",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240906101010-638612142106119565.jpg",
    },
    {
      id: 53,
      MaBlog: 6,
      NoiDung1: "Khói Lửa Nhân Gian Của Tôi",
      NoiDung2: "Tên tiếng Anh: Fireworks of my heart",
      NoiDung3: "hể loại: Đô thị/Tình cảm/Đương đại",
      NoiDung4: "Diễn viên: Dương Dương, Vương Sở Nhiên, Vương Ngạn Lâm, Ngụy Đại Huân, Trương Bân Bân",
      NoiDung5: "Đáng chú ý, đây cũng là lần thứ hai trong năm, Vương Sở Nhiên đảm nhận vai diễn bác sĩ, nhưng mỗi nhân vật lại mang những cung bậc cảm xúc khác biệt. Nếu trong Nghe Nói Em Thích Tôi, cô thể hiện sự mềm mại và nhẹ nhàng, thì Hứa Thấm trong Khói Lửa Nhân Gian Của Tôi lại là sự pha trộn giữa sự mạnh mẽ đầy quyết đoán và nỗi đau bất lực trước số phận bị gia đình quản thúc quá mức. Những tầng sâu của cảm xúc này đã được Vương Sở Nhiên khắc họa một cách khéo léo, khiến khán giả không chỉ đồng cảm mà còn thực sự bị cuốn theo từng diễn biến tâm lý của nhân vật.",
      NoiDung7: "",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240906101315-638612143954662105.jpeg",
    },
    {
      id: 54,
      MaBlog: 6,
      NoiDung1: "Tình Yêu Có Khói Lửa",
      NoiDung2: "Tên tiếng Anh: Love has fireworks",
      NoiDung3: "Thể loại: Đô thị/Tình cảm",
      NoiDung4: "Đạo diễn: Sử Thành Nghiệp",
      NoiDung5: "Trong tác phẩm này, Vương Sở Nhiên vào vai Tiền Phi, một cô gái từng có tất cả – từ sự nghiệp ổn định đến một mối tình đẹp như mơ. Nhưng sự thuận lợi đó bỗng chốc tan biến khi vị hôn phu Uông Nhược Hải (do Trương Hạo Duy thủ vai) quyết định rời bỏ cô, để lại một kế hoạch hạnh phúc đầy dở dang. Từ khoảnh khắc ấy, Tiền Phi buộc phải đối diện với cuộc đời cô đơn, từng bước xây dựng lại sự nghiệp lẫn cuộc sống cá nhân. Con đường phía trước trở nên đầy gian nan, nhưng cũng chính từ đây, nhân vật Tiền Phi bắt đầu một cuộc hành trình trưởng thành, chấp nhận thử thách và tự khẳng định mình giữa cuộc đời.",
      NoiDung7: "",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240906102754-638612152744571421.jpg",
    },
    {
      id: 55,
      MaBlog: 6,
      NoiDung1: "Thượng Thực",
      NoiDung2: "Tên tiếng Anh: Royal Feast",
      NoiDung3: "Đạo diễn: Vương Uy, Bạch Vân Mặc",
      NoiDung4: "Diễn viên: Hứa Khải, Ngô Cẩn Ngôn, Vương Sở Nhiên, Vương Nhất Triết, Trương Nam, Hà Phụng Thiên, Lưu Mẫn",
      NoiDung5: "Trong bộ phim cổ trang Thượng Thực, Vương Sở Nhiên đảm nhận vai Tô Nguyệt Hoa, một nữ quan tài giỏi của cục Thượng thực. Nguyệt Hoa không chỉ nổi bật bởi vẻ đẹp thanh cao, mà còn bởi tính cách lãnh đạm, kiêu ngạo, và sự cầu toàn đến nghiêm khắc với bản thân. Tuy nhiên, ẩn sau vẻ ngoài kiên cường ấy là nỗi đau âm ỉ từ thời thơ ấu – khi mẫu thân của nàng bất ngờ rời bỏ mà không một lời từ biệt. Ký ức đó đã để lại một vết thương sâu trong lòng Tô Nguyệt Hoa, một nút thắt mà nàng chưa bao giờ có thể tháo gỡ.",
      NoiDung7: "",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240906104053-638612160530943308.jpeg",
    },
    {
      id: 56,
      MaBlog: 6,
      NoiDung1: "Xin chào mẫu thân đại nhân",
      NoiDung2: "Đạo diễn: Tào Đôn, Cảnh Xung",
      NoiDung3: "Diễn viên: Đổng Khiết, Doãn Phưởng, Triệu Ngụy, Vương Sở Nhiên",
      NoiDung4: "Biên kịch: Công Tuyết",
      NoiDung5: "Xin chào mẫu thân đại nhân, được cải biên từ tiểu thuyết Trên mây: 99 điều nhỏ bé cùng mẹ, mang đến một câu chuyện đầy xúc cảm về tình mẫu tử giữa Đinh Bích Vân (do Đổng Khiết thủ vai) và con trai Đinh Hiểu Quân (Doãn Phưởng thủ vai). Bộ phim không chỉ tập trung vào những thách thức của cuộc sống hiện đại mà còn khắc họa sâu sắc mối quan hệ phức tạp và tình yêu thương vô bờ của một người mẹ đơn thân.",
      NoiDung7: "",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240906140239-638612281595728950.jpeg",
    },
    {
      id: 56,
      MaBlog: 6,
      NoiDung1: "Thanh Bình Nhạc",
      NoiDung2: "Tên tiếng anh: Serenade of Peaceful Joy",
      NoiDung3: "Số tập: 68 tập",
      NoiDung4: "Đạo diễn: Trương Khải Đôn",
      NoiDung5: "Khi sự thật được phơi bày, Triệu Trinh không chỉ đối mặt với cú sốc về thân thế, mà còn cảm thấy gánh nặng lớn lao của lòng biết ơn đối với thái hậu, người đã nâng đỡ ông lên ngôi vị hoàng đế. Để đáp lại ân tình này, ông đã quyết định gả con gái của mình, công chúa Triệu Huy Nhu, cho Lý Vĩ, một quyết định không chỉ mang tính chất chính trị mà còn là sự đền đáp lòng ân nghĩa. Phim không chỉ là câu chuyện về quyền lực và âm mưu trong cung đình, mà còn là hành trình tìm kiếm sự thật và đối diện với những quyết định khó khăn của một vị hoàng đế phải đấu tranh giữa lòng trung thành và trách nhiệm",
      NoiDung7: "",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240906140535-638612283354168796.jpeg",
    },

  ],

  // ----- Rạp -----
  Rap: [
    {
      id: 1,
      TenRap: "Rạp ScreenTime Quận 12",
      ViTri: "Vincom Center, Quận 12, TP.HCM",
      PhongChieu: [
        {
          id: 1,
          TenPhongChieu: "Phòng 1",
          SoLuongGhe: 60,
          Ghe: [
            { Hang: "A", Ghe: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"] },
            { Hang: "B", Ghe: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"] },
            { Hang: "C", Ghe: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"] },
            { Hang: "D", Ghe: ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"] },
            { Hang: "E", Ghe: ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"] },
            { Hang: "F", Ghe: ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"] }
          ]
        },
        {
          id: 2,
          TenPhongChieu: "Phòng 2",
          SoLuongGhe: 60,
          Ghe: [
            { Hang: "A", Ghe: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"] },
            { Hang: "B", Ghe: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"] },
            { Hang: "C", Ghe: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"] },
            { Hang: "D", Ghe: ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"] },
            { Hang: "E", Ghe: ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"] },
            { Hang: "F", Ghe: ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"] }
          ]
        },
        {
          id: 3,
          TenPhongChieu: "Phòng 3",
          SoLuongGhe: 60,
          Ghe: [
            { Hang: "A", Ghe: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"] },
            { Hang: "B", Ghe: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"] },
            { Hang: "C", Ghe: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"] },
            { Hang: "D", Ghe: ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"] },
            { Hang: "E", Ghe: ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"] },
            { Hang: "F", Ghe: ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"] }
          ]
        },
        {
          id: 4,
          TenPhongChieu: "Phòng 4",
          SoLuongGhe: 60,
          Ghe: [
            { Hang: "A", Ghe: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"] },
            { Hang: "B", Ghe: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"] },
            { Hang: "C", Ghe: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"] },
            { Hang: "D", Ghe: ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"] },
            { Hang: "E", Ghe: ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"] },
            { Hang: "F", Ghe: ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"] }
          ]
        },
        {
          id: 5,
          TenPhongChieu: "Phòng 5",
          SoLuongGhe: 60,
          Ghe: [
            { Hang: "A", Ghe: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"] },
            { Hang: "B", Ghe: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"] },
            { Hang: "C", Ghe: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"] },
            { Hang: "D", Ghe: ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"] },
            { Hang: "E", Ghe: ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"] },
            { Hang: "F", Ghe: ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"] }
          ]
        },
        {
          id: 6,
          TenPhongChieu: "Phòng 6",
          SoLuongGhe: 60,
          Ghe: [
            { Hang: "A", Ghe: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"] },
            { Hang: "B", Ghe: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"] },
            { Hang: "C", Ghe: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"] },
            { Hang: "D", Ghe: ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"] },
            { Hang: "E", Ghe: ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"] },
            { Hang: "F", Ghe: ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"] }
          ]
        },
        {
          id: 7,
          TenPhongChieu: "Phòng 7",
          SoLuongGhe: 60,
          Ghe: [
            { Hang: "A", Ghe: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"] },
            { Hang: "B", Ghe: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"] },
            { Hang: "C", Ghe: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"] },
            { Hang: "D", Ghe: ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"] },
            { Hang: "E", Ghe: ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"] },
            { Hang: "F", Ghe: ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"] }
          ]
        },
        {
          id: 8,
          TenPhongChieu: "Phòng 8",
          SoLuongGhe: 60,
          Ghe: [
            { Hang: "A", Ghe: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"] },
            { Hang: "B", Ghe: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"] },
            { Hang: "C", Ghe: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"] },
            { Hang: "D", Ghe: ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"] },
            { Hang: "E", Ghe: ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"] },
            { Hang: "F", Ghe: ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"] }
          ]
        },
        {
          id: 9,
          TenPhongChieu: "Phòng 9",
          SoLuongGhe: 60,
          Ghe: [
            { Hang: "A", Ghe: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"] },
            { Hang: "B", Ghe: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"] },
            { Hang: "C", Ghe: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"] },
            { Hang: "D", Ghe: ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"] },
            { Hang: "E", Ghe: ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"] },
            { Hang: "F", Ghe: ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"] }
          ]
        },
        {
          id: 10,
          TenPhongChieu: "Phòng 10",
          SoLuongGhe: 60,
          Ghe: [
            { Hang: "A", Ghe: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"] },
            { Hang: "B", Ghe: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"] },
            { Hang: "C", Ghe: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"] },
            { Hang: "D", Ghe: ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"] },
            { Hang: "E", Ghe: ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"] },
            { Hang: "F", Ghe: ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"] }
          ]
        },
        {
          id: 11,
          TenPhongChieu: "Phòng 11",
          SoLuongGhe: 60,
          Ghe: [
            { Hang: "A", Ghe: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"] },
            { Hang: "B", Ghe: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"] },
            { Hang: "C", Ghe: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"] },
            { Hang: "D", Ghe: ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"] },
            { Hang: "E", Ghe: ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"] },
            { Hang: "F", Ghe: ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"] }
          ]
        },
        {
          id: 12,
          TenPhongChieu: "Phòng 12",
          SoLuongGhe: 60,
          Ghe: [
            { Hang: "A", Ghe: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"] },
            { Hang: "B", Ghe: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"] },
            { Hang: "C", Ghe: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"] },
            { Hang: "D", Ghe: ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"] },
            { Hang: "E", Ghe: ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"] },
            { Hang: "F", Ghe: ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"] }
          ]
        },

      ]
    }
  ],

  // ----- Suất Chiếu -----
  SuatChieu: [
    { id: 1, IdPhim: 1, IdPhong: 1, NgayChieu: "21/12/2024", GioChieu: "15:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 2, IdPhim: 2, IdPhong: 2, NgayChieu: "21/12/2024", GioChieu: "18:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 3, IdPhim: 3, IdPhong: 3, NgayChieu: "22/12/2024", GioChieu: "22:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 4, IdPhim: 4, IdPhong: 4, NgayChieu: "23/12/2024", GioChieu: "15:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 5, IdPhim: 5, IdPhong: 5, NgayChieu: "23/12/2024", GioChieu: "18:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 6, IdPhim: 6, IdPhong: 6, NgayChieu: "23/12/2024", GioChieu: "22:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 7, IdPhim: 7, IdPhong: 7, NgayChieu: "24/12/2024", GioChieu: "15:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 8, IdPhim: 8, IdPhong: 8, NgayChieu: "24/12/2024", GioChieu: "18:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 9, IdPhim: 9, IdPhong: 9, NgayChieu: "24/12/2024", GioChieu: "22:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 10, IdPhim: 10, IdPhong: 10, NgayChieu: "25/12/2024", GioChieu: "15:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 11, IdPhim: 11, IdPhong: 11, NgayChieu: "25/12/2024", GioChieu: "18:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 12, IdPhim: 12, IdPhong: 12, NgayChieu: "25/12/2024", GioChieu: "22:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 13, IdPhim: 13, IdPhong: 1, NgayChieu: "26/12/2024", GioChieu: "15:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 14, IdPhim: 14, IdPhong: 2, NgayChieu: "26/12/2024", GioChieu: "18:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 15, IdPhim: 15, IdPhong: 3, NgayChieu: "26/12/2024", GioChieu: "22:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 16, IdPhim: 16, IdPhong: 4, NgayChieu: "27/12/2024", GioChieu: "15:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 17, IdPhim: 17, IdPhong: 5, NgayChieu: "27/12/2024", GioChieu: "18:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 18, IdPhim: 18, IdPhong: 6, NgayChieu: "27/12/2024", GioChieu: "22:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 19, IdPhim: 19, IdPhong: 7, NgayChieu: "28/12/2024", GioChieu: "15:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 20, IdPhim: 20, IdPhong: 8, NgayChieu: "28/12/2024", GioChieu: "18:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 21, IdPhim: 21, IdPhong: 9, NgayChieu: "28/12/2024", GioChieu: "22:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 22, IdPhim: 22, IdPhong: 10, NgayChieu: "29/12/2024", GioChieu: "15:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 23, IdPhim: 23, IdPhong: 11, NgayChieu: "29/12/2024", GioChieu: "18:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 24, IdPhim: 24, IdPhong: 12, NgayChieu: "29/12/2024", GioChieu: "22:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 25, IdPhim: 25, IdPhong: 1, NgayChieu: "30/12/2024", GioChieu: "15:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 26, IdPhim: 1, IdPhong: 2, NgayChieu: "30/12/2024", GioChieu: "18:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 27, IdPhim: 2, IdPhong: 3, NgayChieu: "30/12/2024", GioChieu: "22:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 28, IdPhim: 3, IdPhong: 4, NgayChieu: "31/12/2024", GioChieu: "15:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 29, IdPhim: 4, IdPhong: 5, NgayChieu: "31/12/2024", GioChieu: "18:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 30, IdPhim: 5, IdPhong: 6, NgayChieu: "31/12/2024", GioChieu: "22:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 31, IdPhim: 6, IdPhong: 7, NgayChieu: "01/01/2025", GioChieu: "15:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 32, IdPhim: 7, IdPhong: 8, NgayChieu: "01/01/2025", GioChieu: "18:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 33, IdPhim: 8, IdPhong: 9, NgayChieu: "01/01/2025", GioChieu: "22:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 34, IdPhim: 9, IdPhong: 10, NgayChieu: "02/01/2025", GioChieu: "15:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 35, IdPhim: 10, IdPhong: 11, NgayChieu: "02/01/2025", GioChieu: "18:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 36, IdPhim: 11, IdPhong: 12, NgayChieu: "02/01/2025", GioChieu: "22:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 37, IdPhim: 12, IdPhong: 1, NgayChieu: "03/01/2025", GioChieu: "15:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 38, IdPhim: 13, IdPhong: 2, NgayChieu: "03/01/2025", GioChieu: "18:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 39, IdPhim: 14, IdPhong: 3, NgayChieu: "03/01/2025", GioChieu: "22:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 40, IdPhim: 15, IdPhong: 4, NgayChieu: "04/01/2025", GioChieu: "15:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 41, IdPhim: 16, IdPhong: 5, NgayChieu: "04/01/2025", GioChieu: "18:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 42, IdPhim: 17, IdPhong: 6, NgayChieu: "04/01/2025", GioChieu: "22:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 43, IdPhim: 18, IdPhong: 7, NgayChieu: "05/01/2025", GioChieu: "15:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 44, IdPhim: 19, IdPhong: 8, NgayChieu: "05/01/2025", GioChieu: "18:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 45, IdPhim: 20, IdPhong: 9, NgayChieu: "05/01/2025", GioChieu: "22:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 46, IdPhim: 21, IdPhong: 10, NgayChieu: "06/01/2025", GioChieu: "15:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 47, IdPhim: 22, IdPhong: 11, NgayChieu: "06/01/2025", GioChieu: "18:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 48, IdPhim: 23, IdPhong: 12, NgayChieu: "06/01/2025", GioChieu: "22:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 49, IdPhim: 24, IdPhong: 1, NgayChieu: "07/01/2025", GioChieu: "15:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 50, IdPhim: 25, IdPhong: 2, NgayChieu: "07/01/2025", GioChieu: "18:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 51, IdPhim: 1, IdPhong: 3, NgayChieu: "07/01/2025", GioChieu: "22:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 52, IdPhim: 2, IdPhong: 4, NgayChieu: "08/01/2025", GioChieu: "15:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 53, IdPhim: 3, IdPhong: 5, NgayChieu: "08/01/2025", GioChieu: "18:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 54, IdPhim: 4, IdPhong: 6, NgayChieu: "08/01/2025", GioChieu: "22:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 55, IdPhim: 5, IdPhong: 7, NgayChieu: "09/01/2025", GioChieu: "15:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 56, IdPhim: 6, IdPhong: 8, NgayChieu: "09/01/2025", GioChieu: "18:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 57, IdPhim: 7, IdPhong: 9, NgayChieu: "09/01/2025", GioChieu: "22:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 58, IdPhim: 8, IdPhong: 10, NgayChieu: "10/01/2025", GioChieu: "15:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 59, IdPhim: 9, IdPhong: 11, NgayChieu: "10/01/2025", GioChieu: "18:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 60, IdPhim: 10, IdPhong: 12, NgayChieu: "10/01/2025", GioChieu: "22:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 61, IdPhim: 11, IdPhong: 1, NgayChieu: "11/01/2025", GioChieu: "15:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 62, IdPhim: 12, IdPhong: 2, NgayChieu: "11/01/2025", GioChieu: "18:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 63, IdPhim: 13, IdPhong: 3, NgayChieu: "11/01/2025", GioChieu: "22:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 64, IdPhim: 14, IdPhong: 4, NgayChieu: "12/01/2025", GioChieu: "15:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 65, IdPhim: 15, IdPhong: 5, NgayChieu: "12/01/2025", GioChieu: "18:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 66, IdPhim: 16, IdPhong: 6, NgayChieu: "12/01/2025", GioChieu: "22:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 67, IdPhim: 17, IdPhong: 7, NgayChieu: "13/01/2025", GioChieu: "15:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 68, IdPhim: 18, IdPhong: 8, NgayChieu: "13/01/2025", GioChieu: "18:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 69, IdPhim: 19, IdPhong: 9, NgayChieu: "13/01/2025", GioChieu: "22:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 70, IdPhim: 20, IdPhong: 10, NgayChieu: "14/01/2025", GioChieu: "15:00", TrangThai: "DangChieu", DaDatGhe: [] }
  ],


  // ----- Loại Vé -----
  LoaiVe: [
    {
      id: 1,
      TenVe: "Người Lớn - Đơn",
      GiaVe: 75000,
    },
    {
      id: 2,
      TenVe: "HSSV-Người Cao Tuổi",
      GiaVe: 45000,
    },
  ],

  // ----- Combo -----
  Combo: [
    {
      id: 1,
      Anh: "/images/combo/combo1.jpg",
      TenCombo: "COMBO PARYPARY",
      NoiDung: "2 Bắp Ngọt 60oz + 4 Coke 22oz",
      Gia: 209000,
    },
    {
      id: 2,
      Anh: "/images/combo/combo2.jpg",
      TenCombo: "COMBO SOLO",
      NoiDung: "1 Bắp Ngọt 60oz + 1 Coke 32oz",
      Gia: 94000,
    },
    {
      id: 3,
      Anh: "/images/combo/combo3.jpg",
      TenCombo: "COMBO COUPLE",
      NoiDung: "1 Bắp Ngọt 60oz + 2 Coke 32oz",
      Gia: 115000,
    },
    {
      id: 4,
      Anh: "/images/combo/combo4.jpg",
      TenCombo: "NƯỚC SUỐI DASANI",
      NoiDung: "500/510ML",
      Gia: 20000,
    },
    {
      id: 5,
      Anh: "/images/combo/combo5.jpg",
      TenCombo: "NƯỚC TRÁI CÂY NUTRIBOOST",
      NoiDung: "",
      Gia: 28000,
    },
    {
      id: 6,
      Anh: "/images/combo/combo6.jpg",
      TenCombo: "NƯỚC CAM TEPPY",
      NoiDung: "",
      Gia: 28000,
    },
    {
      id: 7,
      Anh: "/images/combo/combo7.jpg",
      TenCombo: "FANTA",
      NoiDung: "",
      Gia: 30000,
    },
    {
      id: 8,
      Anh: "/images/combo/combo8.jpg",
      TenCombo: "SPRITE",
      NoiDung: "",
      Gia: 30000,
    },
    {
      id: 9,
      Anh: "/images/combo/combo9.jpg",
      TenCombo: "COCACOLA",
      NoiDung: "",
      Gia: 30000,
    },
  ],

  // ----- TÀI_KHOẢN -----
  TaiKhoan: [
    {
      id: "efb5ccf9-6d7d-445b-a18c-19be1a17e426",
      userId: 1,
      Email: "truonghoai2806@gmail.com",
      NgaySinh: "2004-06-28",
      DiaChi: "456 Đường XYZ, Quận 3, TP. HCM",
      GioiTinh: "Nam",
      MatKhau: "$2b$10$Pi1/sHDTlXKI15Fp5lC2heYXvogvjd0QPoCO6.8R27txyzEKhXQSW", // NguyenVanA000@
      SDT: "0395428360",
      TenDangNhap: "NguyenVanA", // Tài khoản
      Ten: "Nguyễn Văn A",
      Anh: "logovn.png",
      IsAdmin: 1,
      IsLocked: false
    }
  ],

  // ----- BÌNH_LUẬN -----
  BinhLuan: [
    {
      movieId: "1",
      userId: "1",
      content: "hehehe",
      username: "hoaidev33",
      userImage: "1733282666752-banner_event.jpg",
    }
  ],

  HoaDon: [
    { id: 1, userId: 2, NgayMua: "2024-01-15T11:32:22.000Z", Rap: "Ticket Quận 12", PhuongThucThanhToan: "VISA", TenPhim: "LÀM GIÀU VỚI MA (T16)", ThoiGian: "18:00", NgayChieu: "2024-01-20", SoGhe: ["A2", "B5"], PhongChieu: "Phòng 2", GiaVe: 85000, TongTien: 170000, TenKhachHang: "Nguyễn Minh Khánh", Email: "minhkhankh@gmail.com", Combo: "COMBO LIGHT", IdPhong: 2, IdPhim: 5, TrangThai: "Đã Thanh Toán", createdAt: { "$date": "2024-01-15T11:35:40.000Z" } },
    { id: 2, userId: 3, NgayMua: "2024-02-04T16:45:01.000Z", Rap: "Ticket Quận 12", PhuongThucThanhToan: "MOMO", TenPhim: "THE SECRET GARDEN", ThoiGian: "15:00", NgayChieu: "2024-02-10", SoGhe: ["C3"], PhongChieu: "Phòng 3", GiaVe: 65000, TongTien: 65000, TenKhachHang: "Lê Thanh Sơn", Email: "sonle@gmail.com", Combo: "COMBO FAMILY (1)", IdPhong: 3, IdPhim: 8, TrangThai: "Đã Mua", createdAt: { "$date": "2024-02-04T16:47:10.000Z" } },
    { id: 3, userId: 4, NgayMua: "2024-03-10T09:30:59.000Z", Rap: "Ticket Quận 12", PhuongThucThanhToan: "ZALOPAY", TenPhim: "JOURNEY THROUGH TIME", ThoiGian: "22:00", NgayChieu: "2024-03-15", SoGhe: ["D1", "E3"], PhongChieu: "Phòng 4", GiaVe: 90000, TongTien: 270000, TenKhachHang: "Trần Minh Tâm", Email: "minhtam@gmail.com", Combo: "COMBO DELUXE", IdPhong: 4, IdPhim: 12, TrangThai: "Đã Thanh Toán", createdAt: { "$date": "2024-03-10T09:32:08.000Z" } },
    { id: 4, userId: 5, NgayMua: "2024-04-12T14:00:00.000Z", Rap: "Ticket Quận 12", PhuongThucThanhToan: "MOMO", TenPhim: "MAGIC OF THE OCEAN", ThoiGian: "18:00", NgayChieu: "2024-04-15", SoGhe: ["A5"], PhongChieu: "Phòng 5", GiaVe: 75000, TongTien: 75000, TenKhachHang: "Nguyễn Thiện Minh", Email: "nguyenminh@gmail.com", Combo: "COMBO MEGA (1)", IdPhong: 5, IdPhim: 15, TrangThai: "Đã Mua", createdAt: { "$date": "2024-04-12T14:03:22.000Z" } },
    { id: 5, userId: 6, NgayMua: "2024-05-21T12:50:10.000Z", Rap: "Ticket Quận 12", PhuongThucThanhToan: "VNBANK", TenPhim: "THE LAST SAMURAI", ThoiGian: "15:00", NgayChieu: "2024-05-25", SoGhe: ["B3", "C7"], PhongChieu: "Phòng 6", GiaVe: 85000, TongTien: 255000, TenKhachHang: "Đoàn Minh Phúc", Email: "minhphuc@gmail.com", Combo: "COMBO FAMILY (2)", IdPhong: 6, IdPhim: 10, TrangThai: "Đã Thanh Toán", createdAt: { "$date": "2024-05-21T12:53:55.000Z" } },
    { id: 6, userId: 7, NgayMua: "2024-06-08T17:15:35.000Z", Rap: "Ticket Quận 12", PhuongThucThanhToan: "MOMO", TenPhim: "KINGDOM OF DRAGONS", ThoiGian: "18:00", NgayChieu: "2024-06-15", SoGhe: ["C2"], PhongChieu: "Phòng 7", GiaVe: 95000, TongTien: 95000, TenKhachHang: "Phan Thanh Sơn", Email: "phanthanhson@gmail.com", Combo: "COMBO LUXURY", IdPhong: 7, IdPhim: 9, TrangThai: "Đã Thanh Toán", createdAt: { "$date": "2024-06-08T17:20:01.000Z" } },
    { id: 7, userId: 8, NgayMua: "2024-07-17T13:45:12.000Z", Rap: "Ticket Quận 12", PhuongThucThanhToan: "ZALOPAY", TenPhim: "ROCKET TO THE STARS", ThoiGian: "22:00", NgayChieu: "2024-07-20", SoGhe: ["D4", "E8"], PhongChieu: "Phòng 8", GiaVe: 78000, TongTien: 234000, TenKhachHang: "Lê Minh Thái", Email: "minhthai@gmail.com", Combo: "COMBO STANDARD", IdPhong: 8, IdPhim: 16, TrangThai: "Đã Thanh Toán", createdAt: { "$date": "2024-07-17T13:47:30.000Z" } },
    { id: 8, userId: 9, NgayMua: "2024-08-03T10:10:24.000Z", Rap: "Ticket Quận 12", PhuongThucThanhToan: "VISA", TenPhim: "FANTASY WORLD", ThoiGian: "18:00", NgayChieu: "2024-08-07", SoGhe: ["A1"], PhongChieu: "Phòng 9", GiaVe: 88000, TongTien: 88000, TenKhachHang: "Trần Minh Lâm", Email: "minhlam@gmail.com", Combo: "COMBO FAMILY (1)", IdPhong: 9, IdPhim: 11, TrangThai: "Đã Thanh Toán", createdAt: { "$date": "2024-08-03T10:13:40.000Z" } },
    { id: 9, userId: 10, NgayMua: "2024-09-25T15:30:50.000Z", Rap: "Ticket Quận 12", PhuongThucThanhToan: "MOMO", TenPhim: "THE PHANTOM OF THE OPERA", ThoiGian: "22:00", NgayChieu: "2024-09-30", SoGhe: ["B1", "C9"], PhongChieu: "Phòng 10", GiaVe: 90000, TongTien: 270000, TenKhachHang: "Phan Thiên Long", Email: "thienlong@gmail.com", Combo: "COMBO MEGA", IdPhong: 10, IdPhim: 18, TrangThai: "Đã Thanh Toán", createdAt: { "$date": "2024-09-25T15:33:12.000Z" } },
    { id: 10, userId: 11, NgayMua: "2024-10-17T16:55:21.000Z", Rap: "Ticket Quận 12", PhuongThucThanhToan: "VNBANK", TenPhim: "GHOST IN THE SHELL", ThoiGian: "15:00", NgayChieu: "2024-10-20", SoGhe: ["D7", "E2"], PhongChieu: "Phòng 11", GiaVe: 78000, TongTien: 234000, TenKhachHang: "Bùi Quang Tuấn", Email: "quangtuan@gmail.com", Combo: "COMBO STANDARD", IdPhong: 11, IdPhim: 17, TrangThai: "Đã Thanh Toán", createdAt: { "$date": "2024-10-17T16:57:45.000Z" } },
    { id: 11, userId: 12, NgayMua: "2024-11-04T10:05:12.000Z", Rap: "Ticket Quận 12", PhuongThucThanhToan: "VISA", TenPhim: "THE WITCHER", ThoiGian: "18:00", NgayChieu: "2024-11-10", SoGhe: ["B2", "D6"], PhongChieu: "Phòng 12", GiaVe: 85000, TongTien: 255000, TenKhachHang: "Trần Tiến Đạt", Email: "tiendat@gmail.com", Combo: "COMBO FAMILY (2)", IdPhong: 12, IdPhim: 13, TrangThai: "Đã Thanh Toán", createdAt: { "$date": "2024-11-04T10:08:05.000Z" } },
    { id: 12, userId: 13, NgayMua: "2024-12-12T11:40:30.000Z", Rap: "Ticket Quận 12", PhuongThucThanhToan: "ZALOPAY", TenPhim: "THE LAST OF US", ThoiGian: "22:00", NgayChieu: "2024-12-15", SoGhe: ["A3"], PhongChieu: "Phòng 1", GiaVe: 70000, TongTien: 70000, TenKhachHang: "Nguyễn Quang Hòa", Email: "hoanguyen@gmail.com", Combo: "COMBO STANDARD", IdPhong: 1, IdPhim: 14, TrangThai: "Đã Thanh Toán", createdAt: { "$date": "2024-12-12T11:42:58.000Z" } }
  ],

  // ----- ADMIN -----
  Admin: [
    {
      id: 1,
      HoTen: "Nguyễn Admin",
      TenDangNhap: "admin01", // username: admin01
      MatKhau: "$2b$10$kydE/AZs.onp3OjR0i8AaeyALcHftnE2EQ0Rc8favsy2rbIKWw6ui", // password: Admin000@
      Anh: "/images/logovn.png",
      DiaChi: "3456 Đường XYZ, Quận 3, TP. HCM",
      NgaySinh: "2004-12-06",
      GioTinh: "Nam",
      SDT: "0969125712",
      ChucVu: "Quản trị viên",
      Tinhtrang: "Hoạt động",
      Quyen: "Admin",
      IsAdmin: 0
    },
    {
      id: 2,
      HoTen: "Nguyễn Nhân Viên",
      TenDangNhap: "nhanvien01", // username: nhanvien01
      MatKhau: "$2a$10$dsj3Z3GEJ2wA340QwMZyW.sTNOK6vZKQUBz/L.wScuN7AboMt8mMK", // password: Nhanvien000@
      Anh: "/images/logovn.png",
      DiaChi: "456 Đường XYZ, Quận 3, TP. HCM",
      NgaySinh: "2024-12-10",
      GioTinh: "Nam",
      SDT: "0395427388",
      ChucVu: "Bán hàng",
      Tinhtrang: "Hoạt động",
      Quyen: "NhanVien",
      IsAdmin: 0
    }
  ],

  // ----- Sukien -----
  Sukien: [
    {
      id: 1,
      Ten: "SINHNHAT1",
      NoiDung: "Khuyến mãi giảm giá khi mua vé tại ScreenTime",
      Anh: "/images/event/sinhnhat.jpg",
      NgayBatDau: "20/10/2024",
      NgayKetThuc: "22/10/2024",
      Luuy: "Áp dụng vào ngày 28 tháng 6.",
      Giam: "20%",
      DieuKien: "Áp dụng tại web 28 tháng 6.",
    },
    {
      id: 2,
      Ten: "HAIPHUONG45",
      Anh: "/images/event/haiphuong.jpg",
      NoiDung: "Đặt vé phim Hai Phượng - Bộ phim hành động kịch tính do Ngô Thanh Vân thủ vai chính",
      NgayBatDau: "05-10-2024",
      NgayKetThuc: "05-11-2024",
      Luuy: "Áp dụng vào ngày 28 tháng 6.",
      Giam: "20%",
      DieuKien:
        "Áp dụng cho học sinh sinh viên xuất trình thẻ học sinh hoặc CCCD dưới 22 tuổi.",
    },
    {
      id: 3,
      Ten: "GIANGSINH2024",
      NoiDung: "Ưu đãi vé xem phim mùa Giáng Sinh 2024 tại tất cả các rạp.",
      Anh: "/images/event/giangsinh2024.jpg",
      NgayBatDau: "01/12/2024",
      NgayKetThuc: "25/12/2024",
      Luuy: "Áp dụng cho tất cả các suất chiếu.",
      Giam: "20%",
      DieuKien: "Áp dụng khi mua trực tuyến qua ứng dụng ScreenTime.",
    },
    {
      id: 4,
      Ten: "TET2025",
      NoiDung: "Mua vé xem phim và nhận ngay lì xì Tết 2025.",
      Anh: "/images/event/tet2025.jpg",
      NgayBatDau: "01/02/2025",
      NgayKetThuc: "15/02/2025",
      Luuy: "Áp dụng trong dịp Tết Nguyên Đán.",
      Giam: "20%",
      DieuKien: "Áp dụng cho đơn hàng từ 2 vé trở lên.",
    },
    {
      id: 5,
      Ten: "BLACKFRIDAY2024",
      NoiDung: "Giảm giá 50% tất cả các phim nhân dịp Black Friday.",
      Anh: "/images/event/Black_Friday.jpg",
      NgayBatDau: "28/11/2024",
      NgayKetThuc: "29/11/2024",
      Luuy: "Áp dụng cho tất cả các suất chiếu trong ngày.",
      Giam: "20%",
      DieuKien: "Áp dụng cho các giao dịch trực tuyến.",
    },
    {
      id: 6,
      Ten: "SUMMERSALE2025",
      NoiDung: "Giảm 30% vé xem phim mùa hè 2025 tại ScreenTime.",
      Anh: "/images/event/summer.jpg",
      NgayBatDau: "01/06/2025",
      NgayKetThuc: "30/06/2025",
      Luuy: "Áp dụng vào các ngày cuối tuần.",
      Giam: "20%",
      DieuKien: "Áp dụng cho tất cả thành viên ScreenTime.",
    },
    {
      id: 7,
      Ten: "HALLOWEEN2024",
      NoiDung: "Mua vé phim kinh dị giảm 40% trong dịp Halloween.",
      Anh: "/images/event/halloween.jpg",
      NgayBatDau: "25/10/2024",
      NgayKetThuc: "31/10/2024",
      Luuy: "Áp dụng cho phim thuộc thể loại kinh dị.",
      Giam: "20%",
      DieuKien: "Áp dụng cho học sinh, sinh viên xuất trình thẻ.",
    },
    {
      id: 8,
      Ten: "QUOCKHANH2025",
      NoiDung: "Ưu đãi đặc biệt nhân dịp Quốc Khánh 2/9.",
      Anh: "/images/event/quockhanh.jpg",
      NgayBatDau: "01/09/2025",
      NgayKetThuc: "02/09/2025",
      Luuy: "Áp dụng trong ngày lễ Quốc Khánh.",
      Giam: "20%",
      DieuKien: "Áp dụng cho tất cả các khách hàng.",
    },
    {
      id: 9,
      Ten: "VALENTINE2025",
      NoiDung: "Giảm 50% cho các cặp đôi nhân dịp Valentine 2025.",
      Anh: "/images/event/valentine.jpg",
      NgayBatDau: "14/02/2025",
      NgayKetThuc: "14/02/2025",
      Luuy: "Áp dụng cho các suất chiếu buổi tối.",
      Giam: "20%",
      DieuKien: "Áp dụng cho khách hàng mua 2 vé trở lên.",
    },
    {
      id: 10,
      Ten: "WOMENSDAY2025",
      NoiDung: "Miễn phí vé cho khách hàng nữ nhân ngày 8/3.",
      Anh: "/images/event/womenday.jpg",
      NgayBatDau: "08/03/2025",
      NgayKetThuc: "08/03/2025",
      Luuy: "Áp dụng cho khách hàng nữ.",
      Giam: "20%",
      DieuKien: "Áp dụng cho suất chiếu đầu tiên trong ngày.",
    },
    {
      id: 11,
      Ten: "MOTHERSDAY2025",
      NoiDung: "Giảm giá 30% cho khách hàng đi cùng mẹ vào ngày 10/5.",
      Anh: "/images/event/mothersday.jpg",
      NgayBatDau: "10/05/2025",
      NgayKetThuc: "10/05/2025",
      Luuy: "Áp dụng cho tất cả các phim.",
      Giam: "20%",
      DieuKien: "Áp dụng cho khách hàng mua 2 vé trở lên.",
    },
    {
      id: 12,
      Ten: "THANKSGIVING2024",
      NoiDung: "Khuyến mãi dịp lễ Tạ Ơn - Mua vé xem phim giảm 20%.",
      Anh: "/images/event/thanksgiving.jpg",
      NgayBatDau: "27/11/2024",
      NgayKetThuc: "29/11/2024",
      Luuy: "Áp dụng cho tất cả các suất chiếu.",
      Giam: "20%",
      DieuKien: "Áp dụng cho giao dịch mua online.",
    },
    {
      id: 13,
      Ten: "TRUNGTET2024",
      NoiDung: "Ưu đãi Trung Thu - Giảm 25% vé phim thiếu nhi.",
      Anh: "/images/event/trungthu.jpg",
      NgayBatDau: "15/09/2024",
      NgayKetThuc: "20/09/2024",
      Luuy: "Áp dụng cho phim thiếu nhi.",
      Giam: "20%",
      DieuKien: "Áp dụng cho khách hàng dưới 12 tuổi.",
    },
  ],

};

async function main() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Kết nối thành công đến server MongoDB");
    const db = client.db(dbName);

    const collections = [
      { name: "phim", data: data.Phim },
      { name: "theloai", data: data.TheLoai },
      { name: "blog", data: data.Blog },
      { name: "rap", data: data.Rap },
      { name: "suatchieu", data: data.SuatChieu },
      { name: "loaive", data: data.LoaiVe },
      { name: "hoadon", data: data.HoaDon },
      { name: "combo", data: data.Combo },
      { name: "taikhoan", data: data.TaiKhoan },
      { name: "binhluan", data: data.BinhLuan },
      { name: "admin", data: data.Admin },
      { name: "sukien", data: data.Sukien },
      { name: "blogdetial", data: data.Blogditals },
    ];

    for (const { name, data } of collections) {
      await insertData(db, name, data);
    }

    console.log("Dữ liệu đã được nhập thành công.");
  } catch (error) {
    console.error("Lỗi khi kết nối hoặc thao tác với MongoDB:", error);
  } finally {
    await client.close();
    console.log("Đã ngắt kết nối khỏi MongoDB.");
  }
}

async function insertData(db, collectionName, data) {
  const collection = db.collection(collectionName);

  try {
    // Drop collection if it exists
    await collection.drop();
    console.log(`Đã xóa collection: ${collectionName}`);
  } catch (error) {
    console.log(
      `Không thể xóa collection ${collectionName} (có thể không tồn tại):`,
      error.message
    );
  }

  if (data && data.length) {
    await collection.insertMany(data);
    console.log(`Đã thêm dữ liệu vào collection: ${collectionName}`);
  } else {
    console.log(`Không có dữ liệu cho collection: ${collectionName}`);
  }
}

main().catch(console.error);