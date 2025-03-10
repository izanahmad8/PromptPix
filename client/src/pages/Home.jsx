import React from "react";
import Header from "../components/Header";
import Steps from "../components/Steps";
import Description from "../components/Description";
import Testimonial from "../components/Testimonial";
import MagicBtn from "../components/MagicBtn";

export default function Home() {
  return (
    <div>
      <Header />
      <Steps />
      <Description />
      <Testimonial />
      <MagicBtn />
    </div>
  );
}
