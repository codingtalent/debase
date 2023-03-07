import type { FC } from 'react';
import Image from 'next/image'

const Loading: FC = () => {
  return (
    <div className="grid place-items-center">
      <svg viewBox="0 0 16 16" fill="none" className="loading-icon running w-[18px] h-[18px]">
        <g opacity="0.75">
          <path d="M14 2.66669V8.00002" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 8V13.3333" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 8C14 4.6863 11.3137 2 8 2C6.30483 2 4.77387 2.70299 3.6827 3.83333M2 8C2 11.3137 4.6863 14 8 14C9.61853 14 11.0874 13.3591 12.1667 12.3173" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
};

export default Loading;
