import type { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';
import {
  HomeIcon,
} from '@heroicons/react/24/solid';

const Menu: FC = () => {
  const router = useRouter();

  interface NavItemProps {
    url: string;
    name: string;
    current: boolean;
    icon: string;
  };

  const NavItem = ({ url, name, current, icon }: NavItemProps) => {
    return (
      <Link className="w-full inline-block" href={url} aria-current={current ? 'page' : undefined}>
        <button
          className={clsx(
            'w-full h-6 space-x-2 text-left px-5 font-bold cursor-pointer tracking-wide',
            {
              'text-black border-r-4 border-r-rose-400': current,
            }
          )}
        >
          {icon === 'Home' && (<HomeIcon className="inline w-6 h-6 pb-1" />)}
          <span>{name}</span>
        </button>
      </Link>
    );
  };

  const NavItems = () => {
    const { pathname, query } = useRouter();
    return (
      <>
        <NavItem url={`/`} name="Home" current={pathname == '/'} icon="Home" />
      </>
    );
  };

  return (
    <NavItems />
  );
}

export default Menu;
