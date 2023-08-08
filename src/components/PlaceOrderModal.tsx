/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BigNumber, ethers } from 'ethers';
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AiOutlineCloseCircle } from 'react-icons/ai';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FaSpinner } from 'react-icons/fa';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import { AppConfig } from '@/utils/AppConfig';

interface PlaceOrderModalProps {
  onClose: () => void;
  productVariantId: string;
  productTSHYPrice: string;
  client: any;
}

const PlaceOrderModal: React.FC<PlaceOrderModalProps> = ({
  onClose,
  productTSHYPrice,
  productVariantId,
  client,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [shopifyShippingUrl, setShopifyShippingUrl] = useState<string | null>(
    null
  );
  const { isConnected, address } = useAccount();

  const handleNextStep = async () => {
    if (currentStep === 1) {
      const checkout = await client.checkout.create();

      const checkoutId = checkout.id;

      const lineItemsToAdd = [
        {
          variantId: productVariantId,
          quantity: 1,
        },
      ];

      const addedItemCheckout = await client.checkout.addLineItems(
        checkoutId,
        lineItemsToAdd
      );

      const { webUrl } = addedItemCheckout;

      setShopifyShippingUrl(webUrl);
    }

    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Get the token allowance for the current user
  const { data: tokenAllowance } = useContractRead({
    address: AppConfig.addressTestCoin as `0x${string}`,
    abi: AppConfig.abiTestToken,
    functionName: 'allowance',
    args: [address, AppConfig.addressTestMerchandiseSale],
  });

  const productPriceContract = ethers.utils.parseUnits(productTSHYPrice);

  const { config: approveTokenConfig } = usePrepareContractWrite({
    address: AppConfig.addressTestCoin as `0x${string}`,
    abi: AppConfig.abiTestToken,
    functionName: 'approve',
    args: [AppConfig.addressTestMerchandiseSale, productPriceContract],
    overrides: {
      gasLimit: BigNumber.from(Number(144000 * 1.2).toString()),
    },
  });

  const { write: approveWrite, data: approveTokenData } = useContractWrite({
    ...approveTokenConfig,
  });

  const { isLoading: isPendingApproval, isSuccess: isSuccessApproval } =
    useWaitForTransaction({
      hash: approveTokenData?.hash,
    });

  const needsApproval = Number(tokenAllowance) < Number(productTSHYPrice);

  const { config: buyProductConfig } = usePrepareContractWrite({
    address: AppConfig.addressTestMerchandiseSale as `0x${string}`,
    abi: AppConfig.abiTestMerchandiseSale,
    functionName: 'buyProduct',
    args: [productPriceContract],
    overrides: {
      gasLimit: BigNumber.from(Number(144000 * 1.2).toString()),
    },
  });

  const { write: buyWrite, data: buyProductData } = useContractWrite({
    ...buyProductConfig,
  });

  const { isLoading: isPendingBuy, isSuccess: isSuccessBuy } =
    useWaitForTransaction({
      hash: buyProductData?.hash,
    });

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-lg"
      onClick={handleBackgroundClick}
    >
      {productTSHYPrice && (
        <div
          className="relative mx-2 w-full max-w-xl overflow-y-auto rounded-lg bg-white p-6 pt-12"
          style={{ maxHeight: '80vh' }}
        >
          <AiOutlineCloseCircle
            className="absolute right-3 top-3 cursor-pointer text-3xl text-gray-500 hover:text-gray-600"
            onClick={onClose}
          />
          {currentStep === 1 && (
            <>
              <h2 className="mb-4 text-xl font-medium">Step 1: Overview</h2>
              <p>
                On the next step, first complete the TSHY transaction. Once the
                transaction is completed, you can purchase shipping via Shopify.
              </p>
              <div className="mt-4 flex w-full justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Next
                </button>
              </div>
            </>
          )}
          {currentStep === 2 && (
            <div>
              <h2 className="mb-4 text-xl font-medium">Step 2: Buy Product</h2>
              <div className="mb-4 grid w-full grid-cols-1 gap-4">
                <h3 className="mt-2">Connect wallet and purchase with TSHY</h3>
                {/* Button 1: Display the product price */}
                {isConnected ? (
                  <button
                    type="button"
                    className={`flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 ${
                      isPendingApproval || isPendingBuy || isSuccessBuy
                        ? 'cursor-not-allowed opacity-70'
                        : ''
                    }`}
                    onClick={() =>
                      needsApproval ? approveWrite?.() : buyWrite?.()
                    }
                    disabled={isPendingApproval || isPendingBuy || isSuccessBuy}
                  >
                    {!needsApproval
                      ? `${productTSHYPrice} $TSHY`
                      : `Approve TSHY`}
                    {(isPendingApproval || isPendingBuy) && (
                      <span className="ml-2">
                        <FaSpinner className="animate-spin" />
                      </span>
                    )}
                  </button>
                ) : (
                  <ConnectButton
                    showBalance={false}
                    accountStatus={{
                      smallScreen: 'avatar',
                      largeScreen: 'full',
                    }}
                  />
                )}

                {/* Button 2: Purchase Shipping Button */}
                <h3 className="mt-2">Purchase shipping with Shopify</h3>
                {shopifyShippingUrl && isSuccessBuy ? (
                  <a
                    href={shopifyShippingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md bg-blue-500 px-4 py-2 text-center text-white hover:bg-blue-600"
                  >
                    Purchase Shipping
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="cursor-not-allowed rounded-md bg-blue-500/50 px-4 py-2 text-white opacity-50 hover:bg-blue-600"
                  >
                    Purchase Shipping
                  </button>
                )}
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                >
                  Back
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlaceOrderModal;
