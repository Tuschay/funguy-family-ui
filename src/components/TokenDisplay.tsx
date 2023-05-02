import type { BigNumber } from 'ethers';
import { type FC, useState } from 'react';
import { useContractRead } from 'wagmi';

import { AppConfig } from '@/utils/AppConfig';

import Token from './Token';

interface Props {
  address: string;
}

const TokenDisplay: FC<Props> = (props) => {
  const [balance, setBalance] = useState(0);
  useContractRead({
    address: '0x53EF7Dd9087e98406F1f68fb4c23494bDb5cEdA4',
    abi: AppConfig.abiFunguy,
    functionName: 'balanceOf',
    args: [props.address],
    onSuccess: (data: BigNumber) => {
      // eslint-disable-next-line no-console
      console.log('Success - token', data);
      // eslint-disable-next-line no-underscore-dangle
      setBalance(parseInt(data._hex, 16));
    },
  });
  return (
    <div className="p-4">
      <div className="grid grid-cols-4 gap-4">
        {[...Array(balance)].map((_, index) => {
          return <Token key={index} address={props.address} id={index} />;
        })}
      </div>
    </div>
  );
};

export default TokenDisplay;
