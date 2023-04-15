import type React from 'react';
import { type HeroIcon } from '@heroicons/react/*';

export type ButtonVariant = 'primary' | 'secondary' | 'default';
export interface Props extends React.ComponentPropsWithoutRef<'button'> {
  variant: ButtonVariant;
  loading: boolean;
  icon?: null | undefined | typeof HeroIcon;
  label: string;
  type: 'button' | 'submit';
  rounded?: boolean;
  'data-cy': string;
}

export interface AddToCartBtnProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'children'> {
  label: string;
  inCart: boolean;
  itemIndex: number;
  target: 'desktop' | 'mobile';
}
