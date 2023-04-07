import React from 'react';
import { type Props } from './types';
import { utils } from '../../utils';
import { AddToCartButton } from './add-to-cart';

const Button = (props: Omit<Props, 'children'>): JSX.Element => {
  const { variant, icon, loading, label, rounded, ...rest } = props;
  return (
    <button
      className={utils.themes.getButtonTheme(variant, !!rounded)}
      disabled={loading}
      {...rest}>
      <>
        {icon !== null ? (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">{icon}</span>
        ) : null}
      </>
      {loading ? 'Loading...' : label}
    </button>
  );
};

Button.defaultProps = {
  variant: 'default',
  rounded: false
};

export default Button;
export { AddToCartButton };
