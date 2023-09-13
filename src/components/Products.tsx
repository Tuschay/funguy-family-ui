/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { TbShirt } from 'react-icons/tb';
import Client from 'shopify-buy';

import Product from './Product';

type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

const Products: React.FC = () => {
  const [shopifyProducts, setShopifyProducts] = useState<ProductType[]>([]);

  // Initializing a client to return content in the store's primary language
  const client = Client.buildClient({
    domain: 'e1395f-2.myshopify.com',
    storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_API as string,
    apiVersion: '',
  });
  useEffect(() => {
    client.product.fetchAll().then(
      (products: any) => {
        setShopifyProducts(products);
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.error('Error fetching products:', error);
      }
    );
  }, []);

  if (!shopifyProducts.length) {
    return (
      <div className="rounded-md bg-slate-100 p-16 text-center">
        <TbShirt className="w-full text-6xl" />
        <p>Merch not available at this time</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {shopifyProducts.map((product) => (
        <Product key={product.id} product={product} client={client} />
      ))}
    </div>
  );
};

export default Products;
