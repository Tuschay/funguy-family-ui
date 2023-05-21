/* eslint-disable no-nested-ternary */
import { BigNumber, ethers } from 'ethers';
import Image from 'next/image';
import { type FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import { AppConfig } from '@/utils/AppConfig';

interface Props {
  id: number;
  sold: boolean;
}

interface Metadata {
  name: string;
  description: string;
  image: string;
  attributes: { trait_type: string; value: string }[];
}

const MintTokenData: FC<Props> = (props) => {
  const [token, setToken] = useState({} as Metadata);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    fetch(`https://ipfs.io/ipfs/${AppConfig.ipfsHash}/${props.id}`)
      .then((value) => {
        return value.json();
      })
      .then((value) => {
        setToken(value);
      });
  }, []);

  const imageUrl = token.image?.replace('ipfs://', 'https://ipfs.io/ipfs/');

  const { config, isFetchedAfterMount } = usePrepareContractWrite({
    address: AppConfig.addressFunguy as `0x${string}`,
    abi: AppConfig.abiFunguy,
    functionName: 'mint',
    args: [props.id],
    overrides: {
      value: ethers.utils.parseEther('50'),
      gasLimit: BigNumber.from(Number(144000 * 1.2).toString()),
    },
    scopeKey: 'mintToken',
  });
  const { write } = useContractWrite({
    ...config,
    onMutate(_args) {
      toast.dismiss();
      toast.info(`Minting FunguyFamily #${props.id}`, {
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
      toast.error('Error minting FunguyFamily. Please try again.', {
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
      toast.success(`FunguyFamily #${props.id} is yours!`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setDisable(true);
    },
  });

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
      <div className="flex flex-col items-center justify-center px-6 py-4">
        <div className="mb-2 text-xl font-bold">Funguy #{props.id}</div>
        <button
          className="rounded-lg bg-black px-5 py-2 text-white disabled:bg-gray-200 disabled:text-gray-400"
          disabled={disable || !isFetchedAfterMount || props.sold}
          onClick={() => write?.()}
        >
          {!isFetchedAfterMount ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="mr-2 h-8 w-8 animate-spin fill-black text-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : disable || !write || props.sold ? (
            'Sold'
          ) : (
            'Mint'
          )}
        </button>
      </div>
    </div>
  );
};

export default MintTokenData;
