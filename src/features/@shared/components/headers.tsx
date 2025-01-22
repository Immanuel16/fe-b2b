'use client';
import Image from 'next/image';
import { BellIcon, ChevronDownIcon } from './icon';
import { useState } from 'react';
import { useLogoutExternal } from '@/features/login/utils/query';
import { useUserId } from '../utils/use-userid';
import { encrypt } from '../utils/formatter';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export const Header = ({ title }: { title?: string }) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const onShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const { mutateAsync: logoutExternal } = useLogoutExternal();

  const onLogoutExternal = async () => {
    const userId = await useUserId();
    try {
      await logoutExternal({ email: encrypt(userId) });
      deleteCookie('token');
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <header className="flex w-full justify-between">
      <h1 className="text-[28px] font-semibold">{title}</h1>
      <div className="relative flex items-center space-x-6">
        <button type="button">
          <BellIcon />
        </button>
        <button
          className="flex items-center space-x-3"
          type="button"
          onClick={onShowMenu}
        >
          <Image
            loading="lazy"
            src="./icon-profile-dummy.svg"
            alt=""
            width={40}
            height={40}
          />
          <i className={`${showMenu ? 'rotate-180' : ''}`}>
            <ChevronDownIcon />
          </i>
        </button>
        {showMenu && (
          <div className="absolute top-12 z-10 flex w-fit flex-col space-y-3 rounded-lg bg-white px-6 py-4 shadow-md">
            <button onClick={onLogoutExternal}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};
