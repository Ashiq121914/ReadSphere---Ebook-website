import React from "react";

const Footer = () => {
  const fullDate = new Date().getFullYear();
  return (
    <footer className="border-t p-5 text-center absolute bottom-0 w-full ">
      <span>© {`${fullDate}`} ReadSphere, All rights reserved.</span>
    </footer>
  );
};

export default Footer;
