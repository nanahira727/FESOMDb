import React from "react";

const Button = ({ title, id, rightIcon, leftIcon, containerClass }) => {
  return (
    <button
      id={id}
      className={`flex justify-center items-center group relative z-10 w-fit cursor-pointer overflow-hidden rounded-md bg-dark-3 px-3 py-2 text-light-2 ${containerClass} hover:bg-white hover:border-white hover:text-black transition-all duration-100 select-none`}
    >
      {leftIcon}
      <span className="relative inline-flex overflow-hidden ml-1 mr-1 text-sm">
        <div>{title}</div>
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
