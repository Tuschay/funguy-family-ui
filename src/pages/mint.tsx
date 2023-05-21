import Mint from '@/components/Mint';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Tokens = () => {
  return (
    <Main
      meta={<Meta title="Funguy Family Mint" description="Funguy Family" />}
      title="Mint"
      description="Choose any FunguyFamily below for 50 MATIC."
    >
      <Mint />
    </Main>
  );
};

export default Tokens;
