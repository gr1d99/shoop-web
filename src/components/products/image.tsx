import React from 'react';
import { type Image } from '../../types';
import { Link } from 'react-router-dom';

const ProductImage = ({ image, slug }: { image: Image | undefined; slug: string }) => {
  console.log(image);
  let imageName = '';
  let imageAlt = '';
  let imageUrl = 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-01.jpg';
  if (image !== undefined) {
    const { name, url, alt } = image;
    imageName = name;
    imageAlt = alt ?? name;
    imageUrl = url;
  }
  return (
    <div className="aspect-square overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
      <Link to={`/product/${slug}`}>
        <img
          title={imageName}
          src={imageUrl}
          alt={imageAlt}
          className="h-full w-full object-cover object-center"
          data-cy="product-image"
        />
      </Link>
    </div>
  );
};

export { ProductImage };
