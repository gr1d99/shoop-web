import type React from 'react';

export interface TNavigationChild {
  name: string;
  href: string;
  current: boolean;
}
export type TNavigationChildren = TNavigationChild[];
export interface TNavigationItem {
  name: TNavigationChild['name'];
  href: TNavigationChild['href'];
  icon: null | React.ReactNode;
  current: TNavigationChild['current'];
  children: TNavigationChildren | [];
}
export type TNavigationItems = TNavigationItem[];
