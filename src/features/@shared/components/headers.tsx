'use client';
import Image from 'next/image';
import { BellIcon, ChevronDownIcon } from './icon';

export const Header = ({ title }: { title?: string }) => {
  return (
    <header className="flex w-full justify-between">
      <h1 className="text-[28px] font-semibold">{title}</h1>
      <div className="flex items-center space-x-6">
        <button type="button">
          <BellIcon />
        </button>
        <button className="flex items-center space-x-3" type="button">
          <Image
            loading="lazy"
            src="./icon-profile-dummy.svg"
            alt=""
            width={40}
            height={40}
          />
          <ChevronDownIcon />
        </button>
      </div>
    </header>
  );
};
