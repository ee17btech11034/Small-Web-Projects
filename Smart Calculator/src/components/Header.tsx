import React from 'react';

interface SectionHeaderProps {
  title: string;
}

export const Header: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <div className="w-full flex items-center justify-center py-4 font-mono">
      <h2 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-wide text-gray-900 dark:text-slate-100 transitioning-text">
        {title}
      </h2>
    </div>
  );
};
