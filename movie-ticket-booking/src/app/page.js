import React from 'react';
import BlogSection from './component/blog';
import Event from './component/event';
import SapChieu from './component/coming-soon';
import DangChieu from './component/now-showing';
import QA from './component/qa';
import Banner from './component/banner';
// import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Home() {
  return (
    <div>
      <Banner />
      <DangChieu />
      <SapChieu />
      <Event />
      <BlogSection />
      <QA />
    </div>

  );
}






