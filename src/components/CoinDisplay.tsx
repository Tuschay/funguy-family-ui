import 'react-toastify/dist/ReactToastify.css';

import { BigNumber } from 'ethers';
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
  const [coins, setCoins] = useState('0');
  useContractRead({
    // address: '0x7B093653Bf2f9A9812c8b4D67FcDb7183857B288',
    address: AppConfig.addressCoin as `0x${string}`,
    abi: AppConfig.abiCoin,
    functionName: 'pending',
    args: [props.address],
    onSuccess: (data: BigNumber) => {
      // eslint-disable-next-line no-console
      console.log('hex num', parseInt(data._hex, 16) / (Math.pow(10,18)))
      // eslint-disable-next-line no-underscore-dangle
      setCoins(Number(parseInt(data._hex, 16) / (Math.pow(10,18))).toPrecision(4));
    },
  });

  const [balance, setBalance] = useState('0');
  useContractRead({
    address: AppConfig.addressCoin as `0x${string}`,
    abi: AppConfig.abiCoin,
    functionName: 'balanceOf',
    args: [props.address],
    onSuccess: (data: BigNumber) => {
      // eslint-disable-next-line no-console
      // console.log('Success - coin', data);
      // eslint-disable-next-line no-underscore-dangle
      setBalance(Number(parseInt(data._hex, 16) / (Math.pow(10,18))).toPrecision(4));
    },
  });

  const { config } = usePrepareContractWrite({
    address: AppConfig.addressCoin as `0x${string}`,
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
      setBalance(Number(Number(balance) + Number(coins)).toString());
      setCoins('0');
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
