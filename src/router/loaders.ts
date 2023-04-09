import { type LoaderFunctionArgs } from 'react-router-dom';
import { fetchCategories } from '../pages/home/api/categories';
import { type TNavigation, type TNavigationChildren } from '../components/nav/types';
import { fetchProducts } from '../pages/products/api/products';
import { type ProductRequestParams } from '../types';
import api from '../api';
import { type CategoryProductsLoader, type CategoryResponse } from './types';
import { type ProductResponse } from '../pages/products/types';

const navigation: TNavigation = {
  Home: {
    isButton: false,
    name: 'Home',
    href: '/',
    icon: null,
    current: true,
    children: [],
    dataCy: 'home-nav'
  },
  Categories: {
    isButton: true,
    name: 'Categories',
    href: '#',
    icon: null,
    current: false,
    children: [],
    dataCy: 'category-nav'
  }
};
const rootLoader = async (_args: LoaderFunctionArgs) => {
  try {
    const { data } = await fetchCategories({ page: 1, limit: 10 });
    const categoriesChildren: TNavigationChildren = data.map((category) => {
      const { id, attributes } = category;
      const { name, slug } = attributes;
      const href =
        slug !== null && typeof slug === 'string' ? `/category/${slug}` : `/categories/${id}`;
      return {
        id,
        name,
        href,
        current: false,
        dataCy: `${name}-nav-item`
      };
    });
    return {
      ...navigation,
      Categories: { ...navigation.Categories, children: categoriesChildren }
    };
  } catch (e) {
    console.error(e);
    return navigation;
  }
};

const categoriesProductsLoader = async (
  args: LoaderFunctionArgs
): Promise<CategoryProductsLoader | any> => {
  const { params } = args;
  const { categorySlug } = params as { categorySlug: string };
  try {
    const reqParams = { category_slug: categorySlug };
    const category = await api.getOne<CategoryResponse>(`/categories/${categorySlug}`);
    const data = await fetchProducts(reqParams as ProductRequestParams);
    return { products: data, category };
  } catch (e) {
    return e;
  }
};

const productLoader = async (args: LoaderFunctionArgs): Promise<CategoryProductsLoader | any> => {
  const { params } = args;
  const { productSlug } = params as { productSlug: string };
  try {
    const product = await api.getOne<ProductResponse>(`/products/${productSlug}`);
    console.log(product);
    return product.data;
  } catch (e) {
    return e;
  }
};

export const routerLoaders = {
  rootLoader,
  productLoader,
  categoriesProductsLoader
};
