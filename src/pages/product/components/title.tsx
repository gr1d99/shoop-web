import React from 'react';

const ProductTitle = ({ title }: { title: string }) => {
  return (
    <div>
      <h1 className="text-lg font-bold antialiased">{title}</h1>
    </div>
  );
};
export { ProductTitle };
