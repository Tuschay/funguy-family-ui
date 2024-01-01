import { BigNumber } from 'ethers';
import { type FC, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { paginatedIndexesConfig, useContractInfiniteReads } from 'wagmi';

import { AppConfig } from '@/utils/AppConfig';

import BackToTopButton from './BackToTop';
import MintToken from './MintToken';

interface Props {
  address: string;
}

const MintDisplay: FC<Props> = (props) => {
  const resultAll: JSX.Element[] = [];
  const resultUnsold: JSX.Element[] = [];
  const [page, setPage] = useState(0);
  const [showAll, setShowAll] = useState(true);
  const MAX_PAGES = 2500 / 16;
  const { data, fetchNextPage } = useContractInfiniteReads({
    cacheKey: 'wownerOfMintDisplay',
    ...paginatedIndexesConfig(
      (index) => {
        return [
          {
            address: AppConfig.addressFunguy as `0x${string}`,
            abi: AppConfig.abiFunguy,
            functionName: 'ownerOf',
            args: [BigNumber.from(index)] as const,
          },
        ];
      },
      { start: 1, perPage: 32, direction: 'increment' }
    ),
  });

  [...Array(page * 16)].forEach((_, index) => {
    if (index > 0) {
      const soldObj = data!.pages! || {};
      const soldRow = soldObj[Math.floor((index - 1) / 32)]!;
      resultAll.push(
        <MintToken
          key={index}
          address={props.address}
          id={index}
          sold={(soldRow && soldRow[(index - 1) % 32]) as boolean}
        />
      );
      if (!(soldRow && soldRow[(index - 1) % 32])) {
        resultUnsold.push(
          <MintToken
            key={index}
            address={props.address}
            id={index}
            sold={(soldRow && soldRow[(index - 1) % 32]) as boolean}
          />
        );
      }
    }
  });

  return (
    <div className="p-4">
      <InfiniteScroll
        pageStart={page}
        loadMore={() =>
          setTimeout(() => {
            setPage(page + 1);
            fetchNextPage();
          }, 1000)
        }
        hasMore={page < MAX_PAGES}
        loader={
          <div role="status" className="m-6 w-fit">
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
        }
      >
        <div className="flex flex-col">
          <label className="relative mb-4 inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              value=""
              className="peer sr-only"
              onChange={() => setShowAll(!showAll)}
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-black peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-black"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {showAll ? 'Show available' : 'Show all'}
            </span>
          </label>

          <div className="grid grid-cols-4 gap-4">
            {showAll
              ? resultAll.map((item) => {
                  return item;
                })
              : resultUnsold.map((item) => {
                  return item;
                })}
          </div>
        </div>
      </InfiniteScroll>
      <BackToTopButton />
    </div>
  );
};

export default MintDisplay;
