import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ToastContainer } from 'react-toastify';
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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ClientOnly>
  );
};

export default Account;
