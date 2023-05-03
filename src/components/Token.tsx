import { type FC, useState } from 'react';
import { useContractRead } from 'wagmi';

import { AppConfig } from '@/utils/AppConfig';

import TokenData from './TokenData';

interface Props {
  address: string;
  id: number;
}

const Token: FC<Props> = (props) => {
  const [token, setToken] = useState(-1);
  useContractRead({
    address: '0x1eb43807f17cf22890fda80a55866a65a2984614',
    abi: AppConfig.abiFunguy,
    functionName: 'tokenOfOwnerByIndex',
    args: [props.address, props.id],
    onSuccess: (data: any) => {
      // eslint-disable-next-line no-console
      console.log('Success - tokenOfOwnerByIndex', data);
      // eslint-disable-next-line no-underscore-dangle
      setToken(parseInt(data._hex, 16));
    },
  });
  if (token >= 0) {
    return <TokenData id={token} />;
  }

  return null;
};

export default Token;
