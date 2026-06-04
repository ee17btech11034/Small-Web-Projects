import React from 'react';
import { BUTTON_THEMES } from '../constants/buttonThemes'; // Adjust path if needed
import type { ButtonType } from '../constants/buttonThemes'; // Adjust path if needed

interface RoundButtonProps {
  label: string;
  onClick: (label:string) => void;
  variant: ButtonType; // "number" | "operation" | "function" | "control"
}

export const RoundButton: React.FC<RoundButtonProps> = ({ label, onClick, variant }) => {
  // Extract the specific color classes based on the variant prop
  const { bgColor, hoverBgColor, borderColor, hoverBorderColor, textColor } = BUTTON_THEMES[variant];

  return (
    <button
      onClick={()=>onClick(label)}
      className={`w-12 h-10 m-2.5 flex items-center justify-center font-mono font-bold text-lg rounded-full border-b-4 transition-all duration-75 outline-none
                 shadow-[0_4px_6px_rgba(0,0,0,0.15)]
                 active:translate-y-1 
                 active:border-b-0 
                 active:shadow-inner
                 cursor-pointer
                 ${bgColor} ${hoverBgColor} ${borderColor} ${hoverBorderColor} ${textColor}`}
    >
      {label}
    </button>
  );
};
