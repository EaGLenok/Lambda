import React from "react";
import s from "./WhyTinvio.module.scss";
import { testimonials } from "./slide.data";

const WhyTinvio: React.FC = () => {
  const [currentSlide, setCurrentSlde] = React.useState(0);
  let slide = testimonials[currentSlide];
  return (
    <div className={s.why_tinvio_wrapper}>
      <div className={s.why_tinvio_block}>
        <div className={s.why_tinvio_content}>
          <div className={s.why_tinvio_slider}>
            <div className={s.slider_desc_container}>{slide.text}</div>
            <div className={s.slider_image_container}>{slide.image}</div>
            <div className={s.slider_company_container}>
              {slide.companyLogo}
            </div>
            <div className={s.slider_buttons_container}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyTinvio;
