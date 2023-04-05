import React from 'react';
import { type Props } from './types';
import { utils } from '../../utils';

const Button = (props: Omit<Props, 'children'>): JSX.Element => {
  const { variant, icon, loading, label, ...rest } = props;
  return (
    <button className={utils.themes.getButtonTheme(variant)} disabled={loading} {...rest}>
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
  variant: 'default'
};

export default Button;
