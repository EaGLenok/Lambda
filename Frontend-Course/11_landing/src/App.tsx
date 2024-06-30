import React from "react";
import s from "./global.module.scss";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div className={s.main_wrapper}>
      <div className={s.header}>
        <Header />
      </div>
      <div className={s.content}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
