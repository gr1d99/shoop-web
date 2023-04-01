import type React from 'react';
import { type HeroIcon } from '@heroicons/react/*';

export interface TNavigationChild {
  name: string;
  href: string;
  current: boolean;
}
export type TNavigationChildren = TNavigationChild[];
export interface TNavigationItem {
  name: TNavigationChild['name'];
  href: TNavigationChild['href'];
  icon: null | typeof HeroIcon;
  current: TNavigationChild['current'];
  children: TNavigationChildren | [];
}
export type TNavigationItems = TNavigationItem[];
