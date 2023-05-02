import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import ClientOnly from '@/hooks/clientOnly';

import CoinDisplay from './CoinDisplay';
import TokenDisplay from './TokenDisplay';

const Account = () => {
  const { address } = useAccount();
  return (
    <ClientOnly>
      {address && (
        <>
          <CoinDisplay address={address} />
          <TokenDisplay address={address} />
        </>
      )}
      {!address && (
        <ConnectButton
          showBalance={false}
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full',
          }}
        />
      )}
    </ClientOnly>
  );
};

export default Account;
