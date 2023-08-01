import Products from '@/components/Products';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Shop = () => (
  <Main
    meta={
      <Meta
        title="Funguy Family Shop"
        description="Use your $TSHY coins to buy items."
      />
    }
    title="Shop"
    description="Exchange your $TSHY coins for physical items."
  >
    <Products />
  </Main>
);

export default Shop;
