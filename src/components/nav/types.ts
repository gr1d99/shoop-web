import { type HeroIcon } from '@heroicons/react/*';

export interface TNavigationChild {
  readonly id: string;
  name: string;
  href: string;
  current: boolean;
}
export type TNavigationChildren = TNavigationChild[];
export interface TNavigationItem {
  name: TNavigationChild['name'];
  href: TNavigationChild['href'];
  isButton: boolean;
  icon: null | typeof HeroIcon;
  current: TNavigationChild['current'];
  children: TNavigationChildren | [];
}
export interface TNavigation {
  Home: TNavigationItem;
  Categories: TNavigationItem;
}
