import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { BigNumber } from 'ethers';
import Link from 'next/link';
import { useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';

import { AppConfig } from '@/utils/AppConfig';

const TopNav = () => {
  const { address } = useAccount();

  const [balance, setBalance] = useState(0);
  useContractRead({
    address: '0x7B093653Bf2f9A9812c8b4D67FcDb7183857B288',
    abi: AppConfig.abiCoin,
    functionName: 'balanceOf',
    args: [address],
    onSuccess: (data: BigNumber) => {
      // eslint-disable-next-line no-console
      console.log('Success - coin', data);
      // eslint-disable-next-line no-underscore-dangle
      setBalance(parseInt(data._hex, 16));
    },
  });
  return (
    <nav className="flex flex-wrap items-center justify-between bg-black p-6">
      <div className="mr-6 flex shrink-0 items-center text-white">
        {/* @TODO: Icon */}
        {/* <svg
          className="mr-2 h-8 w-8 fill-current"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
        </svg> */}
        <span className="text-xl font-semibold tracking-tight">
          Funguy Family
        </span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center rounded border border-teal-400 px-3 py-2 text-white hover:border-white hover:text-white">
          <svg
            className="h-3 w-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="block w-full grow lg:flex lg:w-auto lg:items-center">
        <div className="text-sm lg:grow">
          <Link
            href="/"
            className="mr-4 mt-4 block text-white hover:text-white lg:mt-0 lg:inline-block"
          >
            Wallet
          </Link>
          <Link
            href="/shop/"
            className="mr-4 mt-4 block text-white hover:text-white lg:mt-0 lg:inline-block"
          >
            Shop
          </Link>
        </div>
        <div className="flex flex-row">
          <div className="mr-2 select-none rounded-lg border border-white p-2 font-bold text-white">
            {balance} $TSHY
          </div>
          <ConnectButton
            showBalance={false}
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'full',
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
