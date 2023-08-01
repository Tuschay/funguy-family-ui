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

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
  domain: 'your-shop-name.myshopify.com',
  storefrontAccessToken: 'your-storefront-access-token',
  apiVersion: 'v1',
});

const Products: React.FC = () => {
  const [shopifyProducts, setShopifyProducts] = useState<ProductType[]>([]);
  const [productError, setProductError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch all products in your shop
    client.product.fetchAll().then(
      (products: any) => {
        // Set the fetched products in the component state
        setShopifyProducts(products);
      },
      (error) => {
        // Handle the fetch error and set the error state
        setProductError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', error);
      }
    );
  }, []);

  if (productError || !shopifyProducts.length) {
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
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
