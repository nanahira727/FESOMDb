import React, { useRef, useState } from "react";

const Tilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const [newClass, setNewClass] = useState(className);
  const [initialMove, setInitialMove] = useState(true);
  const itemRef = useRef();

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * -3;
    const tiltY = (relativeX - 0.5) * 3;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

    setTransformStyle(newTransform);
    if (initialMove) {
      setInitialMove(false);
      setNewClass("transition-transform duration-100");
      setTimeout(() => {
        setNewClass("");
      }, 100);
    }
    // if (initialMove) {
    //   setNewClass("transition-all duration-50");
    //   setInitialMove(false);
    // } else {
    //   setNewClass("");
    // }
  };

  const handleMouseLeave = () => {
    const newTransform = `none`;

    setTransformStyle(newTransform);
    setNewClass("transition-all duration-300");
    setInitialMove(true);
  };

  return (
    <div
      className={`group ${newClass}`}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export default Tilt;
