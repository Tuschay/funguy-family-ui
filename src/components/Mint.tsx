import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ToastContainer } from 'react-toastify';
import { useAccount } from 'wagmi';

import ClientOnly from '@/hooks/clientOnly';

import MintDisplay from './MintDisplay';

const Mint = () => {
  const { address } = useAccount();
  return (
    <ClientOnly>
      {address && (
        <>
          <MintDisplay address={address} />
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

export default Mint;
