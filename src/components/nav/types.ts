import { type HeroIcon } from '@heroicons/react/*';

export interface TNavigationChild {
  readonly id: string;
  name: string;
  href: string;
  current: boolean;
  dataCy: string;
}
export type TNavigationChildren = TNavigationChild[];
export interface TNavigationItem {
  name: TNavigationChild['name'];
  href: TNavigationChild['href'];
  isButton: boolean;
  icon: null | typeof HeroIcon;
  current: TNavigationChild['current'];
  children: TNavigationChildren | [];
  dataCy: string;
}
export interface TNavigation {
  Home: TNavigationItem;
  Categories: TNavigationItem;
}
