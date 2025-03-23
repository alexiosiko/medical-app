"use client"

// components/TypewriterText.js
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TypewriterText = ({ text, className }: {
	text: string,
	className?: string,
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const lastChars = text.slice(-30);
    let index = 0;

    const interval = setInterval(() => {
      setDisplayedText(lastChars.slice(0, index + 1));
      index++;

      if (index >= lastChars.length) clearInterval(interval);
    }, 100); // Adjust speed here (in ms)

    return () => clearInterval(interval);
  }, [text]);

  return (
    <h1 className={`${className} text-wrap`}>
      {/* Non-animated part */}
      <span className="">{text.slice(0, -15)}</span>
      {/* Typing animation */}
		{displayedText}
    </h1>
  );
};

export default TypewriterText;
