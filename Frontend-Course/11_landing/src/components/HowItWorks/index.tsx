import React from "react";
import s from "./HowItWorks.module.scss";
import procces_showing from "../../assets/process/procces_showing.svg";
import play_button from "../../assets/process/play_button.svg";
import dots from "../../assets/process/dots.svg";

const HowItWorks: React.FC = () => {
  return (
    <div className={s.wrapper_how_it_works}>
      <div className={s.dots_absolute}>
        <img src={dots} alt="" />
      </div>
      <div className={s.how_process}>
        <img src={procces_showing} alt="" />
      </div>
      <div className={s.how_text}>
        <div className={s.how_text_content}>
          <h1>Check out how it works </h1>
          <p>
            It’s easy! Exchange messages, create or confirm orders, send <br />{" "}
            invoices, and collect payments across your supply chain — all <br />
            within one dashboard.
          </p>
          <div className={s.play_button}>
            <img src={play_button} alt="" />
            <button>Play video</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
