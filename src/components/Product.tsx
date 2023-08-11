import { useState } from 'react';

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
        <p className="font-semibold text-blue-600">{productTSHYPrice} $TSHY</p>
        <button
          onClick={handleOpenModal}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Buy Now
        </button>
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
