"use client"; // Đảm bảo rằng đây là một component client
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

// Định nghĩa schema xác thực
const validationSchema = Yup.object().shape({
  TenRap: Yup.string().required('Tên rạp không được bỏ trống'),
  ViTri: Yup.string().required('Vị trí không được bỏ trống'),
  PhongChieu: Yup.array().of(
    Yup.object().shape({
      TenPhongChieu: Yup.string().required('Tên phòng chiếu không được bỏ trống'),
      SoLuongGhe: Yup.number()
        .required('Số lượng ghế không được bỏ trống')
        .positive('Phải là số dương')
        .integer('Phải là số nguyên'),
      Ghe: Yup.array().of(Yup.object().shape({
        id: Yup.string().required('ID ghế không được bỏ trống'),
        TenGhe: Yup.string().required('Tên ghế không được bỏ trống'),
      })).required('Phải có ít nhất một ghế')
    })
  ).required('Phải có ít nhất một phòng chiếu'),
});

const AddRapChieu = () => {
  const router = useRouter();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch('http://localhost:3000/theater', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (response.ok) {
        alert('Rạp chiếu đã được thêm thành công!');
        router.push('/page/theater'); // Chuyển hướng về trang danh sách rạp chiếu
      } else {
        const errorData = await response.json(); // Đọc phản hồi
        alert(errorData.message || 'Có lỗi xảy ra, vui lòng thử lại sau.');
      }
    } catch (error) {
      console.error('Lỗi khi thêm rạp chiếu:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại sau.');
    } finally {
      setSubmitting(false);
      resetForm(); // Đặt lại form sau khi hoàn tất
    }
  };

  return (
    <div className="app-content">
      <div className="app-title">
        <h1>Thêm Rạp Chiếu</h1>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <h3 className="tile-title">Tạo Mới Rạp Chiếu</h3>
            <div className="tile-body">
              <Formik
                initialValues={{ TenRap: '', ViTri: '', PhongChieu: [{ TenPhongChieu: '', SoLuongGhe: '', Ghe: [{ id: '', TenGhe: '' }] }] }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, setFieldValue, isSubmitting }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="TenRap">Tên Rạp</label>
                      <Field
                        className="form-control"
                        id="TenRap"
                        name="TenRap"
                        type="text"
                      />
                      <ErrorMessage name="TenRap" component="div" className="text-danger" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="ViTri">Vị Trí</label>
                      <Field
                        className="form-control"
                        id="ViTri"
                        name="ViTri"
                        type="text"
                      />
                      <ErrorMessage name="ViTri" component="div" className="text-danger" />
                    </div>
                    <div className="form-group">
                      <label>Danh Sách Phòng Chiếu</label>
                      <FieldArray name="PhongChieu">
                        {({ remove, push }) => (
                          <>
                            {values.PhongChieu.length > 0 &&
                              values.PhongChieu.map((phongChieu, index) => (
                                <div key={index} className="mb-3">
                                  <h5>Phòng Chiếu {index + 1}</h5>
                                  <div className="form-group">
                                    <label htmlFor={`PhongChieu.${index}.TenPhongChieu`}>Tên Phòng Chiếu</label>
                                    <Field
                                      className="form-control"
                                      id={`PhongChieu.${index}.TenPhongChieu`}
                                      name={`PhongChieu.${index}.TenPhongChieu`}
                                      type="text"
                                    />
                                    <ErrorMessage name={`PhongChieu.${index}.TenPhongChieu`} component="div" className="text-danger" />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor={`PhongChieu.${index}.SoLuongGhe`}>Số Lượng Ghế</label>
                                    <Field
                                      className="form-control"
                                      id={`PhongChieu.${index}.SoLuongGhe`}
                                      name={`PhongChieu.${index}.SoLuongGhe`}
                                      type="number"
                                      min="1"
                                    />
                                    <ErrorMessage name={`PhongChieu.${index}.SoLuongGhe`} component="div" className="text-danger" />
                                  </div>

                                  {/* Thêm danh sách ghế */}
                                  <FieldArray name={`PhongChieu.${index}.Ghe`}>
                                    {({ remove: removeSeat, push: pushSeat }) => (
                                      <>
                                        {phongChieu.Ghe.length > 0 && phongChieu.Ghe.map((seat, seatIndex) => (
                                          <div key={seatIndex} className="mb-3">
                                            <h6>Ghế {seatIndex + 1}</h6>
                                            <div className="form-group">
                                              <label htmlFor={`PhongChieu.${index}.Ghe.${seatIndex}.id`}>ID Ghế</label>
                                              <Field
                                                className="form-control"
                                                id={`PhongChieu.${index}.Ghe.${seatIndex}.id`}
                                                name={`PhongChieu.${index}.Ghe.${seatIndex}.id`}
                                                type="text"
                                              />
                                              <ErrorMessage name={`PhongChieu.${index}.Ghe.${seatIndex}.id`} component="div" className="text-danger" />
                                            </div>
                                            <div className="form-group">
                                              <label htmlFor={`PhongChieu.${index}.Ghe.${seatIndex}.TenGhe`}>Tên Ghế</label>
                                              <Field
                                                className="form-control"
                                                id={`PhongChieu.${index}.Ghe.${seatIndex}.TenGhe`}
                                                name={`PhongChieu.${index}.Ghe.${seatIndex}.TenGhe`}
                                                type="text"
                                              />
                                              <ErrorMessage name={`PhongChieu.${index}.Ghe.${seatIndex}.TenGhe`} component="div" className="text-danger" />
                                            </div>
                                            <button type="button" className="btn btn-danger" onClick={() => removeSeat(seatIndex)}>
                                              Xóa Ghế
                                            </button>
                                          </div>
                                        ))}
                                        <button type="button" className="btn btn-success" onClick={() => pushSeat({ id: '', TenGhe: '' })}>
                                          Thêm Ghế
                                        </button>
                                      </>
                                    )}
                                  </FieldArray>
                                  <button type="button" className="btn btn-danger" onClick={() => remove(index)}>
                                    Xóa Phòng Chiếu
                                  </button>
                                </div>
                              ))}
                            <button type="button" className="btn btn-success" onClick={() => push({ TenPhongChieu: '', SoLuongGhe: '', Ghe: [{ id: '', TenGhe: '' }] })}>
                              Thêm Phòng Chiếu
                            </button>
                          </>
                        )}
                      </FieldArray>
                    </div>
                    <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                      Lưu lại
                    </button>
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={() => router.push('/theater')}
                    >
                      Hủy bỏ
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRapChieu;