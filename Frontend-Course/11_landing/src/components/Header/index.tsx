import React from "react";
import s from "./Header.module.scss";
import tinvio from "../../assets/header/tinvioIcon.svg";

const Header: React.FC = () => {
  return (
    <div className={s.header_wrapper}>
      <div className={s.header_container}>
        <div className={s.header_logo}>
          <img src={tinvio} height={60} width={162} alt="Company Logo" />
        </div>
        <div className={s.navbar_container}>
          <ol className={s.navbar}>
            <li>Home</li>
            <li>Features</li>
            <li>Company</li>
          </ol>
        </div>
        <div className={s.button_container}>
          <button className={s.get_started_btn}>Get started</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
