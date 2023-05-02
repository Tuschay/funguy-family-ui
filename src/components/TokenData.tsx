import Image from 'next/image';
import { type FC, useState } from 'react';
import { useContractRead } from 'wagmi';

import { AppConfig } from '@/utils/AppConfig';

interface Props {
  id: number;
}

interface Metadata {
  name: string;
  description: string;
  image: string;
  attributes: { trait_type: string; value: string }[];
}

const TokenData: FC<Props> = (props) => {
  const [token, setToken] = useState({} as Metadata);
  useContractRead({
    address: '0x53EF7Dd9087e98406F1f68fb4c23494bDb5cEdA4',
    abi: AppConfig.abiFunguy,
    functionName: 'tokenURI',
    args: [props.id],
    onSuccess: (data: string) => {
      // eslint-disable-next-line no-console
      console.log('Success - tokenURI', data);
      // eslint-disable-next-line no-underscore-dangle
      fetch(data.replace('ipfs://', 'https://ipfs.io/ipfs/'))
        .then((value) => {
          // console.log('response: ', value.json());
          return value.json();
        })
        .then((value) => {
          console.log(value);
          setToken(value);
        });
    },
  });

  const imageUrl = token.image?.replace('ipfs://', 'https://ipfs.io/ipfs/');

  return (
    <div className="max-w-sm overflow-hidden rounded shadow-lg">
      {token.image && (
        <Image
          className="w-full"
          width={172}
          height={172}
          src={imageUrl}
          alt="Funguy Family token"
        />
      )}
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{token.name}</div>
      </div>
    </div>
  );
};

export default TokenData;
