import React from "react";
import s from "./Home.module.scss";
import CollectingP from "../../components/CollectingP";
import HowItWorks from "../../components/HowItWorks";
import MoreFeatures from "../../components/MoreFeatures";
import WhyTinvio from "../../components/WhyTinvio";

const Home: React.FC = () => {
  return (
    <div className={s.home_wrapper}>
      <div className={s.content_collecting}>
        <CollectingP />
      </div>
      <div className={s.content_how_it_works}>
        <HowItWorks />
      </div>
      <div className={s.content_more_features}>
        <MoreFeatures />
      </div>
      <div className={s.content_why_tinvio}>
        <WhyTinvio />
      </div>
    </div>
  );
};

export default Home;
