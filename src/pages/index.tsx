import Account from '@/components/Account';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Tokens = () => {
  return (
    <Main
      meta={<Meta title="Funguy Family" description="Funguy Family" />}
      title="Wallet"
      description="View your FunguyFamily and $TSHY tokens. Your FunguyFamily are generating $TSHY as long as they are in your wallet. Check your balance below, and claim any available $TSHY coins."
    >
      <Account />
    </Main>
  );
};

export default Tokens;
