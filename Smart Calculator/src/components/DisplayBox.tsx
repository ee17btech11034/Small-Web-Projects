import React from 'react';

interface DisplayBoxProps {
  children?: React.ReactNode;
  props?: {
    classes: string;
  };
}

export const DisplayBox: React.FC<DisplayBoxProps> = ({ children, props }) => {
  return (
    <div className={`w-full max-w-md mx-auto p-5 my-2 rounded-2xl border transition-all duration-200
                    bg-gray-50 dark:bg-slate-900 
                    border-b-amber-500 dark:border-slate-800 
                    shadow-md font-mono
                    min-h-[140px] md:min-h-[290px] 
                    flex ${props?.classes}`}>
      {children}
    </div>
  );
};
