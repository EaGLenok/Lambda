export interface Testimonial {
  frame: number;
  text: string;
  author: string;
  role: string;
  company: string;
  companyLogo: string;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    frame: 1,
    text: "Tribe definitely helps to reduce the time and errors in order management between stores and suppliers. The app is easy to use and available on any mobile or web, and the team is friendly and always helpful.",
    author: "Fatima Zika",
    role: "Co-founder, CEO",
    company: "Shukran General Store",
    companyLogo: "",
    image: "",
  },
  {
    frame: 2,
    text: "Tribe helps our business run smoother. We can manage our customers' orders, receivables, and track inventory. Tribe has reduced the time needed for creating, handling and processing of our customers.",
    author: "Anurodh Chakrapani",
    role: "Assistant General Manager",
    company: "Vibrant Food Pvt Ltd.",
    companyLogo: "",
    image: "",
  },
  {
    frame: 3,
    text: "With Tribe, it's easier for my customers to make payments across various locations. Their payments go directly into the business's account while I can monitor the transactions at any time.",
    author: "Rodrigo Lamosa",
    role: "Owner",
    company: "Moonface",
    companyLogo: "",
    image: "",
  },
  {
    frame: 4,
    text: "Tribe has been a foundational partner and solution. We now have faster and more efficient operations within our facilities, which makes order processing and deliveries smoother than ever before.",
    author: "Kris Smith",
    role: "Head of Logistics",
    company: "Veggie Delight",
    companyLogo: ",
    image: "",
  },
];
