import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <div>
      <Navbar page={"home"} />
      <Hero />
    </div>
  );
};

export default Home;
