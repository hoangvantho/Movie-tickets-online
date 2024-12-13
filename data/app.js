var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bcryptjs = require('bcryptjs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var eventsRouter = require('./routes/events');
var searchRouter = require('./routes/search');
var employeesRouter = require('./routes/employees');
var movieRouter = require('./routes/movie');
var categoriesRouter = require('./routes/categories');
var blogRouter = require('./routes/blog');
var blogdetailRouter = require('./routes/blogdetail');
var accountRouter = require('./routes/account');
var authRouter = require('./routes/auth');
var comboRouter = require('./routes/combo');
var theaterRouter = require('./routes/theater');
var showtimesRouter = require('./routes/showtimes');
var tickettypesRouter = require('./routes/ticket-types');
var commentRouter = require('./routes/comments');
var checkoutRouter = require('./routes/checkout');
var invoiceRouter = require('./routes/invoice');
var orderRouter = require('./routes/order');
var adminRouter = require('./routes/admin');
var app = express();

// Cấu hình middleware CORS
app.use(cors({
  origin: (origin, callback) => {
    // Cho phép truy cập từ mọi nguồn gốc
    callback(null, origin || true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức được phép
  credentials: true // Cho phép cookie và các thông tin xác thực khác
}));

// Serve the uploads folder as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/event', eventsRouter);
app.use('/search', searchRouter);
app.use('/employees', employeesRouter);
app.use('/movie', movieRouter);
app.use('/categories', categoriesRouter);
app.use('/blog', blogRouter);
app.use('/blogdetail', blogdetailRouter);
app.use('/account', accountRouter);
app.use('/auth', authRouter);
app.use('/combo', comboRouter);
app.use('/theater', theaterRouter);
app.use('/showtimes', showtimesRouter);
app.use('/ticket-types', tickettypesRouter);
app.use('/comments', commentRouter);
app.use('/checkout', checkoutRouter);
app.use('/invoice', invoiceRouter);
app.use('/order', orderRouter);
app.use('/admin', adminRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;