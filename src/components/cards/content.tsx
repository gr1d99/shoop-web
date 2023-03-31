import React, { HTMLProps } from 'react';

interface Props extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  className: React.HTMLProps<HTMLDivElement>['className'];
}
const Content = (props: Props): JSX.Element | null => {
  const { children, ...rest } = props;
  return <div {...rest}>{children}</div>;
};

export { Content };
