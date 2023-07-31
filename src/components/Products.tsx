import Product from './Product';

type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

const productsData: ProductType[] = [
  {
    id: 1,
    name: 'Tuschay Studios Coloring Book',
    description: 'Description of Product 1',
    price: 1999,
    image: '/product1.jpg',
  },
  {
    id: 2,
    name: 'Funguys Kingdom T-Shirt',
    description: 'Description of Product 2',
    price: 999,
    image: '/product2.jpeg',
  },
];

const Products: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {productsData.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
