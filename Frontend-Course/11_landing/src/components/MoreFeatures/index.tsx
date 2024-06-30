import React, { useEffect, useState } from "react";
import s from "./MoreFeatures.module.scss";
import {
  features_chats,
  features_orders,
  features_payments,
  Feature,
} from "./features";
import pymnts from "../../assets/features/featuredCompanys/pymntsCom.svg";
import techCrunch from "../../assets/features/featuredCompanys/techCrunch.svg";
import techiNasia from "../../assets/features/featuredCompanys/techiNasia.svg";
import ventureBeat from "../../assets/features/featuredCompanys/ventureBeat.svg";
import dots from "../../assets/features/dots.svg";
import stars_lot from "../../assets/features/start_lot.svg";
import grey_square from "../../assets/features/grey_square.svg";
import small_square from "../../assets/features/small_square.svg";

const MoreFeatures: React.FC = () => {
  const possibleCompany = [pymnts, techCrunch, techiNasia, ventureBeat];
  const possibleFeatures: string[] = ["Chats", "Orders", "Payments"];
  const [featureType, setFeatureType] = useState("Chats");
  const [currentFeature, setCurrentFeature] = useState<Feature>(
    features_chats[0]
  );
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    switch (featureType) {
      case "Chats":
        setCurrentFeature(features_chats[0]);
        break;
      case "Orders":
        setCurrentFeature(features_orders[0]);
        break;
      case "Payments":
        setCurrentFeature(features_payments[0]);
        break;
      default:
        setCurrentFeature(features_chats[0]);
    }
    setAnimationKey((prevKey) => prevKey + 1);
  }, [featureType]);

  const renderFeatures = (features: Feature[]) => {
    return features.map((feature, index) => (
      <div key={index} className={s.more_features_description}>
        <ul>
          <li>
            <span>
              <img src={small_square} alt="" />
            </span>{" "}
            {feature.feature_1}
          </li>
          <li>
            <span>
              <img src={small_square} alt="" />
            </span>{" "}
            {feature.feature_2}
          </li>
          <li>
            <span>
              <img src={small_square} alt="" />
            </span>{" "}
            {feature.feature_3}
          </li>
        </ul>
      </div>
    ));
  };

  const getFeatures = () => {
    switch (featureType) {
      case "Chats":
        return renderFeatures(features_chats);
      case "Orders":
        return renderFeatures(features_orders);
      case "Payments":
        return renderFeatures(features_payments);
      default:
        return null;
    }
  };

  return (
    <div className={s.container_features}>
      <div className={s.wrapper_more_features}>
        <div className={s.more_features_container}>
          <div className={s.more_features_grey_square}>
            <img src={grey_square} alt="" />
          </div>
          <div className={s.more_features_title}>
            <h1>
              Smarter supply chain transactions.{" "}
              <span
                key={animationKey}
                className={`${s.more_buddy} ${s.typing}`}
              >
                {currentFeature.title}
              </span>
            </h1>
          </div>
          <div className={s.more_features_choose}>
            {possibleFeatures.map((feature, index) => (
              <button
                key={index}
                className={`${s.more_features_button} ${
                  featureType === feature ? s.active : ""
                }`}
                onClick={() => setFeatureType(feature)}
              >
                {feature}
              </button>
            ))}
          </div>
          <div className={s.more_features_description}>{getFeatures()}</div>
        </div>
        <div className={s.more_features_image}>
          <div className={s.red_square}>
            <div className={s.red_square_inner}>
              <div className={s.red_square_dots}>
                <img src={dots} alt="" />
              </div>
              <div className={s.red_square_image} key={animationKey}>
                <img src={currentFeature.image} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={s.featured_on_wrapper}>
        <div className={s.featured_on_stars}>
          <img src={stars_lot} alt="" />
        </div>
        <div className={s.featured_on_container}>
          <div className={s.featured_on_title}>
            <p>Featured On</p>
          </div>
          <div className={s.separate_line}></div>
          <div className={s.featured_on_company}>
            {possibleCompany.map((company, index) => (
              <img key={index} src={company} alt="" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreFeatures;
