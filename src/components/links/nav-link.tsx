import { utils } from '../../utils';
import React from 'react';
import { type TNavigationItem } from '../nav/types';

const NavLink = ({ item }: { item: TNavigationItem }): JSX.Element => {
  const { isButton } = item;
  return (
    <>
      {isButton ? (
        <button
          className={utils.classNames(
            item.current
              ? 'bg-gray-50 text-indigo-600'
              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
          )}>
          {item.icon !== null ? (
            <item.icon
              className={utils.classNames(
                item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                'h-6 w-6 shrink-0'
              )}
              aria-hidden="true"
            />
          ) : null}
          {item.name}
        </button>
      ) : (
        <a
          href={item.href}
          className={utils.classNames(
            item.current
              ? 'bg-gray-50 text-indigo-600'
              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
          )}>
          {item.icon !== null ? (
            <item.icon
              className={utils.classNames(
                item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                'h-6 w-6 shrink-0'
              )}
              aria-hidden="true"
            />
          ) : null}
          {item.name}
        </a>
      )}
    </>
  );
};

export { NavLink };
