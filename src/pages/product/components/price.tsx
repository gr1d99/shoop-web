import { utils } from '../../../utils';

const ProductPrice = ({ size, price }: { size: 'sm' | 'md' | 'lg'; price: number }) => {
  const priceStyles = `text-${size} font-extrabold antialiased`;
  return (
    <>
      <div className="flex items-center space-x-4">
        <h2 className={priceStyles}>{utils.locales.toCurrency(price)}</h2>
        <small className="text-gray-500 line-through">Ksh 99</small>
      </div>
    </>
  );
};

export { ProductPrice };
