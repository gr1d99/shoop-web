const ProductPrice = ({ size }: { size: 'sm' | 'md' | 'lg' }) => {
  const priceStyles = `text-${size} font-extrabold antialiased`;
  return (
    <>
      <div className="flex items-center space-x-4">
        <h2 className={priceStyles}>Ksh 100</h2>
        <small className="text-gray-500 line-through">Ksh 99</small>
      </div>
    </>
  );
};

export { ProductPrice };
