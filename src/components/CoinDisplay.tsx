import 'react-toastify/dist/ReactToastify.css';

import type { BigNumber } from 'ethers';
import { type FC, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';

import { AppConfig } from '@/utils/AppConfig';

interface Props {
  address: string;
}

const CoinDisplay: FC<Props> = (props) => {
  const [coins, setCoins] = useState(0);
  useContractRead({
    // address: '0xab6c728e77fd325c1c290c46d9d0378c37a6116e',
    address: '0x7B093653Bf2f9A9812c8b4D67FcDb7183857B288',
    abi: AppConfig.abiCoin,
    functionName: 'pending',
    args: [props.address],
    onSuccess: (data: BigNumber) => {
      // eslint-disable-next-line no-console
      // console.log('Success - coin', data);
      // eslint-disable-next-line no-underscore-dangle
      setCoins(parseInt(data._hex, 16));
    },
  });

  const [balance, setBalance] = useState(0);
  useContractRead({
    address: '0xab6c728e77fd325c1c290c46d9d0378c37a6116e',
    abi: AppConfig.abiCoin,
    functionName: 'balanceOf',
    args: [props.address],
    onSuccess: (data: BigNumber) => {
      // eslint-disable-next-line no-console
      // console.log('Success - coin', data);
      // eslint-disable-next-line no-underscore-dangle
      setBalance(parseInt(data._hex, 16));
    },
  });

  const { config } = usePrepareContractWrite({
    address: '0xab6c728e77fd325c1c290c46d9d0378c37a6116e',
    abi: AppConfig.abiCoin,
    functionName: 'claim',
  });
  const { write } = useContractWrite({
    ...config,
    onMutate(_args) {
      toast.dismiss();
      toast.info('Claiming $TSHY coins.', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    },
    onError(_error) {
      toast.dismiss();
      toast.error('Error claiming $TSHY coins. Please try again.', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    },
    onSuccess(_data) {
      toast.dismiss();
      toast.success('$TSHY coins claimed!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setBalance(balance + coins);
      setCoins(0);
    },
  });

  return (
    <div className="flex flex-row items-center justify-between p-4">
      <div className="flex select-none flex-col items-center">
        <div className="text-sm italic">My balance</div>
        <div className=" rounded-lg border border-black p-2 font-bold shadow-lg">
          {balance} $TSHY
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="select-none text-sm italic">Claim $TSHY</div>
        <button
          disabled={!write}
          onClick={() => write?.()}
          className="rounded-lg bg-black p-2 font-bold text-white shadow-lg"
        >
          Claim {coins}
        </button>
      </div>
    </div>
  );
};

export default CoinDisplay;
