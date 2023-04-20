import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { type ResourceRelationshipData } from '../../types';

const CartNav = ({ items }: { items: ResourceRelationshipData[] }) => {
  return (
    <div className="relative inline-flex">
      <ShoppingCartIcon className="h-5 w-5" />
      <span className="block px-1 font-bold" data-cy="cart-items-count">
        {items.length}
      </span>
    </div>
  );
};

export { CartNav };
