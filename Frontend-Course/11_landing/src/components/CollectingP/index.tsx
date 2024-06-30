import React from "react";
import s from "../CollectingP/CollectingP.module.scss";
import collecting_proof from "../../assets/collecting/collecting_proof.svg";
import collecting_proof_mobile from "../../assets/collecting/collecting_phone_proof.svg";
import red_rectangle from "../../assets/collecting/red_rectangle.svg";
import stars from "../../assets/collecting/stars.svg";
import romb from "../../assets/collecting/romb.svg";

const CollectingP: React.FC = () => {
  return (
    <div className={s.collecting_wrapper}>
      <div className={s.collecting_information_wrapper}>
        <div className={s.collecting_information}>
          <img className={s.romb_svg} src={romb} alt="" />
          <img
            className={s.stars_svg}
            width={86.59}
            height={79.25}
            src={stars}
            alt=""
          />
          <h1 className={s.collecting_information_title_text}>
            Collecting payments <br />
            <span className={s.spanned_is_easy}>is easy</span>, right?
          </h1>
          <p>
            Manage all your supply chain transactions <br /> in one dashboard.
            Get paid faster, reconcile <br /> quicker, grow bigger.
          </p>
          <div className={s.button_container}>
            <button className={s.get_started_btn_red}>Get started Now</button>
            <p> It's free to try! 😎</p>
          </div>
        </div>
      </div>
      <div className={s.collecting_images}>
        <img
          width={1500.82}
          height={1209.93}
          className={s.red_rectangle}
          src={red_rectangle}
          alt=""
        />
        <div className={s.mobile_container}>
          <img width={200} src={collecting_proof_mobile} alt="" />
        </div>
        <div className={s.pc_container}>
          <img width={800} src={collecting_proof} alt="" />
        </div>
      </div>
    </div>
  );
};

export default CollectingP;
