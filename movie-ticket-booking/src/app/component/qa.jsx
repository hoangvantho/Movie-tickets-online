'use client';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState } from 'react';

const QA = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const questions = [
        { question: "Có thể mua vé xem phim những rạp nào trên ScreenTime?", answer: "Bạn có thể mua vé tại nhiều rạp khác nhau. Vui lòng xem danh sách các rạp trên trang chính." },
        { question: "Lợi ích của việc mua vé xem phim trên ScreenTime?", answer: "Mua vé trên ScreenTime mang lại nhiều tiện lợi như tiết kiệm thời gian và giá vé ưu đãi." },
        { question: "Có thể mua vé xem phim kèm bắp nước hay không?", answer: "Có, bạn có thể chọn mua kèm bắp nước khi đặt vé." },
        { question: "Mua vé xem phim tại ScreenTime có đắt hơn mua trực tiếp tại rạp không?", answer: "Giá vé tại ScreenTime thường không chênh lệch nhiều so với giá vé tại rạp." },
        { question: "Vé xem phim có được đổi trả, hoàn hủy không?", answer: "Chúng tôi không hỗ trợ đổi trả vé, nhưng bạn có thể hoàn hủy trong vòng 24 giờ." },
    ];

    return (
        <section style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)', padding: '40px' }}>
            <div className="mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-center items-start">
                    <div className="mb-8 md:mb-0 text-center md:text-left">
                        <h1 className="text-4xl font-bold text-[#F5CF49]">Bạn hỏi, chúng tôi trả lời</h1>
                        <p className="mt-4 text-gray-300">
                            Không tìm thấy câu hỏi của bạn. Vui lòng xem thêm <a href="#" className="underline text-[#F5CF49]">tại đây</a>
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 md:ml-8">
                        <ul className="space-y-4">
                            {questions.map((item, index) => (
                                <li key={index}>
                                    <div 
                                        className="border-b border-gray-600 py-2 flex justify-between items-center text-white" 
                                        style={{ fontSize: '18px', cursor: 'pointer' }} 
                                        onClick={() => toggleAnswer(index)}
                                    >
                                        <span>{item.question}</span>
                                        <i className={`fas fa-chevron-${openIndex === index ? 'up' : 'down'}`}></i>
                                    </div>
                                    {openIndex === index && (
                                        <div className="text-gray-300 text-xl py-2">{item.answer}</div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QA;
