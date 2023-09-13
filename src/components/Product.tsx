import type { BigNumber } from 'ethers';
import { useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';

import { AppConfig } from '@/utils/AppConfig';

import PlaceOrderModal from './PlaceOrderModal';

type ProductProps = {
  product: any;
  client: any;
};

const Product: React.FC<ProductProps> = ({ product, client }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const productVariantId = product.variants[0].id;
  const productImage = product.images[0].src;
  const productTitle = product.title;
  const productDescription = product.description;
  const productTSHYPrice = product.variants[0].selectedOptions[0].value;
  const productAvailable = product.availableForSale;

  const { address } = useAccount();
  const [balance, setBalance] = useState('0');

  useContractRead({
    address: AppConfig.addressCoin as `0x${string}`,
    abi: AppConfig.abiCoin,
    functionName: 'balanceOf',
    args: [address],
    onSuccess: (data: BigNumber) => {
      // eslint-disable-next-line no-underscore-dangle
      setBalance(Number(parseInt(data._hex, 16) / 10 ** 18).toFixed(2));
    },
  });

  return (
    <div className="flex h-full flex-col rounded-lg border p-4 shadow-md">
      <div className="flex-1">
        <img
          src={productImage}
          alt={productTitle}
          className="mb-4 h-auto w-full object-cover"
        />
        <h2 className="mb-2 text-lg font-bold">{productTitle}</h2>
        <p className="text-gray-600">{productDescription}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="font-semibold text-black">{productTSHYPrice} $TSHY</p>
        {balance > productTSHYPrice ? (
          <button
            disabled={!productAvailable}
            onClick={handleOpenModal}
            className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-700"
          >
            {productAvailable ? 'Buy Now' : 'Sold Out'}
          </button>
        ) : (
          <button
            disabled
            className="cursor-not-allowed rounded-md bg-black px-4 py-2 text-white opacity-20 "
          >
            Not Enough $TSHY
          </button>
        )}
        {showModal && (
          <PlaceOrderModal
            productVariantId={productVariantId}
            productTSHYPrice={productTSHYPrice}
            onClose={handleCloseModal}
            client={client}
          />
        )}
      </div>
    </div>
  );
};

export default Product;
