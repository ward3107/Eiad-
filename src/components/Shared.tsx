import React from 'react';

export const ClinicLogo = () => (
  <svg viewBox="0 0 200 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M10 80 C 40 80, 60 20, 80 50 C 100 80, 120 20, 140 50 C 160 80, 180 80, 190 80" 
      className="stroke-[#1E4D92] dark:stroke-[#4B9CD3]" 
      strokeWidth="8" 
      strokeLinecap="round" 
    />
    <circle cx="85" cy="35" r="8" className="fill-[#1E4D92] dark:fill-[#4B9CD3]" />
    <path d="M75 55 Q 85 45 95 55" className="stroke-[#1E4D92] dark:stroke-[#4B9CD3]" strokeWidth="6" strokeLinecap="round" />
    <circle cx="125" cy="25" r="6" className="fill-[#4B9CD3] dark:fill-[#1E4D92]" />
    <path d="M115 45 Q 125 35 135 45" className="stroke-[#4B9CD3] dark:stroke-[#1E4D92]" strokeWidth="5" strokeLinecap="round" />
    <rect x="10" y="85" width="180" height="4" className="fill-[#1E4D92] dark:fill-[#4B9CD3]" rx="2" />
  </svg>
);

export const Skeleton = ({ className }: { className: string, key?: React.Key }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl ${className}`} />
);
