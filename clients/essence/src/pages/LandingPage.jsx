import React from "react";

const LandingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-[30px]">Welcome to ShopX</h1>
      <p>This page is under construction</p>
      <p>
        Visit{" "}
        <a href="/tshop" style={{ textDecoration: "underline" }}>
          Essence
        </a>{" "}
        instead
      </p>
    </div>
  );
};

export default LandingPage;
