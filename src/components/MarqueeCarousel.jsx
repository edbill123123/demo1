import React, { useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/MarqueeCarousel.css"; // 引入自訂樣式

const images = [
  `${process.env.PUBLIC_URL}/assets/img/volleyball-bg1.png`, // 置入圖片的路徑
  `${process.env.PUBLIC_URL}/assets/img/volleyball-bg2.png`, // 置入圖片的路徑
  `${process.env.PUBLIC_URL}/assets/img/volleyball-bg3.png`, // 置入圖片的路徑
];

const MarqueeCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    infinite: true, // 讓輪播可以循環播放
    speed: 1000, // 滑動速度，單位是毫秒
    slidesToShow: 1, // 每次顯示的圖片數量
    slidesToScroll: 1, // 每次滑動時移動多少張圖片
    autoplay: true, // 啟用自動播放
    autoplaySpeed: 5000, // 設定自動播放的速度，單位為毫秒
    beforeChange: (_oldIndex, newIndex) => setCurrentSlide(newIndex), // 更新當前 slide
    customPaging: (i) => (
      <div className={`custom-dot ${currentSlide === i ? "active" : ""}`}>
        {/* 長條形的點 */}
      </div>
    ),
    dotsClass: "slick-dots custom-dots", // 自訂 dots 的 class
    dots: true,
    arrows: true

  };

  return (
    <div style={{ width: "100%", height: "auto", overflowX: "hidden" }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <img key={index} src={image} height="700px" alt="img" />
        ))}
      </Slider>
    </div>
  );
};

export default MarqueeCarousel;
