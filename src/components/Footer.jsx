import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark-1 pb-16">
      <div className="w-full md:w-10/12 m-auto flex flex-col items-center md:-translate-x-2">
        <div className="border-b-1 border-dark-2 w-full"></div>
        <div className="flex justify-between mt-8">
          <a className="text-light-4 text-sm mx-4 hover:underline hover:text-white hover:cursor-pointer transition-all duration-100">About</a>
          <a className="text-light-4 text-sm mx-4 hover:underline hover:text-white hover:cursor-pointer transition-all duration-100">Contact</a>
          <a className="text-light-4 text-sm mx-4 hover:underline hover:text-white hover:cursor-pointer transition-all duration-100">FAQ</a>
          <a className="text-light-4 text-sm mx-4 hover:underline hover:text-white hover:cursor-pointer transition-all duration-100">Privacy Policy</a>
        </div>
        <div className="text-light-4 text-sm mt-6">&copy; 2025 FESOMDb</div>
      </div>
    </footer>
  );
};

export default Footer;
