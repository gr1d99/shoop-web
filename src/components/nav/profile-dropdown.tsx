import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { LoginLabel } from '../login-label';
import React, { Fragment } from 'react';
import { utils } from '../../utils';
import { useCurrentUser } from '../../utils/hooks/use-current-user';

const ProfileDropdown = ({
  hideSidebar,
  authenticated,
  signOutUser,
  target
}: {
  authenticated: boolean;
  signOutUser: () => Promise<void>;
  hideSidebar: () => void;
  target: 'mobile' | 'desktop';
}): JSX.Element => {
  const navigation: Array<{
    name: string;
    isLink: boolean;
    href?: string;
    action: () => any;
    'data-cy': string;
  }> = [
    { name: 'Sign Out', isLink: false, href: '', action: signOutUser, 'data-cy': 'logout-btn' }
  ];
  const { user, userLoaded } = useCurrentUser();
  const handleLogout = (cbk: () => void): void => {
    hideSidebar();
    cbk();
  };

  return (
    <>
      {authenticated ? (
        <Menu as="div" className="relative">
          <Menu.Button
            className="-m-1.5 flex items-center p-1.5"
            data-cy={`user-profile-dropdown-${target}`}>
            <span className="sr-only">Open user menu</span>
            <img
              className="h-8 w-8 rounded-full bg-gray-50"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            {authenticated && userLoaded && user !== null ? (
              <span className="hidden lg:flex lg:items-center">
                <span
                  className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                  aria-hidden="true"
                  data-cy="current-username">
                  {user.attributes.first_name}
                </span>
                <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            ) : null}
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95">
            <Menu.Items className="absolute left-0 z-10 -mt-28 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              {navigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <>
                      {item.isLink ? (
                        <a
                          href={item.href}
                          className={utils.classNames(
                            active ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-sm leading-6 text-gray-900'
                          )}>
                          {item.name}
                        </a>
                      ) : (
                        <button
                          className={utils.classNames(
                            active ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-sm leading-6 text-gray-900'
                          )}
                          onClick={() => {
                            if (item.name === 'Sign Out') {
                              handleLogout(item.action);
                            } else {
                              item.action();
                            }
                          }}
                          data-cy={item['data-cy']}>
                          {item.name}
                        </button>
                      )}
                    </>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        <LoginLabel hideSidebar={hideSidebar} target={target} />
      )}
    </>
  );
};

ProfileDropdown.defaultProps = {
  target: 'desktop'
};

export { ProfileDropdown };
