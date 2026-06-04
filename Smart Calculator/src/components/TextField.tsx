import React from 'react';

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
}

export const TextField: React.FC<TextFieldProps> = ({ 
  label, 
  placeholder='placeholder', 
  value, 
}) => {
  return (
    <div className="flex flex-col w-full gap-1.5 font-mono lg:gap-2">
      {label && (
        <label className="text-xs lg:text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
          {label}
        </label>
      )}
      <input
        type="text"
        value={value}
        readOnly
        placeholder={placeholder}
        className="w-full px-4 py-2.5 lg:px-5 lg:py-4 rounded-xl border font-medium lg:font-bold text-sm transition-all outline-none
                   bg-gray-50 dark:bg-slate-900 
                   text-gray-900 dark:text-slate-100 
                   border-gray-200 dark:border-slate-700 
                   focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10"
      />
    </div>
  );
};
