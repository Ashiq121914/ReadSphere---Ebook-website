import React from "react";

const Footer = () => {
  const fullDate = new Date().getFullYear();
  return (
    <footer className="border-t p-5 text-center">
      <span>© {`${fullDate}`} ReadSphere, All rights reserved.</span>
    </footer>
  );
};

export default Footer;
