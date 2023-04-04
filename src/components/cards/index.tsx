import { Header } from './header';
import { Content } from './content';
import { Footer } from './footer';
import React from 'react';
const Card = (props: { children: React.ReactNode }): JSX.Element => {
  const { children } = props;
  return <div className="flex flex-col rounded bg-gray-100 py-4">{children}</div>;
};

Card.Header = Header;
Card.Content = Content;
Card.Footer = Footer;

export default Card;
