import phones_chats from "../../assets/features/phones_rectangle_red.svg";
import phones_orders from "../../assets/features/phones_rectangle_red_orders.svg";
import phones_payments from "../../assets/features/phones_rectangle_red_payments.svg";

export interface Feature {
  type: string;
  title: string;
  feature_1: string;
  feature_2: string;
  feature_3: string;
  image: string;
}

export const features_chats: Feature[] = [
  {
    type: "Chats",
    title: "More buddy",
    feature_1: "Create chats with any business (even if they're not on Tinvio)",
    feature_2: "Fully integrated with your favorite chat apps",
    feature_3: "Real-time messages and alerts",
    image: phones_chats,
  },
];

export const features_orders: Feature[] = [
  {
    type: "Orders",
    title: "More speedy",
    feature_1: "Create or confirm purchase orders at lightning speed",
    feature_2: "Manage inventory details and availability in real-time",
    feature_3: "24/7 order insights and data reports",
    image: phones_orders,
  },
];

export const features_payments: Feature[] = [
  {
    type: "Payments",
    title: "More money",
    feature_1: "Send invoices and easily track them until they’re paid",
    feature_2: "Real-time payments settlement and reconciliation",
    feature_3: "Safe, secure, and compliant",
    image: phones_payments,
  },
];
