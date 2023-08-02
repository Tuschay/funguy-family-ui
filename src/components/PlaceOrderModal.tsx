/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useAccount } from 'wagmi';

interface PlaceOrderModalProps {
  onClose: () => void;
  productVariantId: string;
  productPrice: number;
  client: any;
}

const PlaceOrderModal: React.FC<PlaceOrderModalProps> = ({
  onClose,
  productPrice,
  productVariantId,
  client,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [shopifyShippingUrl, setShopifyShippingUrl] = useState<string | null>(
    null
  );
  const { isConnected } = useAccount();

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

  const approved = false;

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-lg"
      onClick={handleBackgroundClick}
    >
      {productPrice && (
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
                    className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  >
                    {approved ? `${productPrice} $TSHY` : `Approve TSHY`}
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
                {shopifyShippingUrl && approved ? (
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
                    className="cursor-not-allowed rounded-md bg-blue-500 px-4 py-2 text-white opacity-50 hover:bg-blue-600"
                  >
                    Purchase Shipping
                  </button>
                )}
              </div>
              <div className="mt-4">
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
          {currentStep === 3 && (
            <div>
              <h2 className="mb-4 text-xl font-medium">Order Completed</h2>
              <p className="text-green-500">Thank you for your order!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlaceOrderModal;
