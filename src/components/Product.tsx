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

  return (
    <div className="flex h-full flex-col rounded-lg border p-4 shadow-md">
      <div className="flex-1">
        <img
          src={product.images[0].src}
          alt={product.title}
          className="mb-4 h-auto w-full object-cover"
        />
        <h2 className="mb-2 text-lg font-bold">{product.title}</h2>
        <p className="text-gray-600">{product.description}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="font-semibold text-blue-600">{product.price} $TSHY</p>
        <button
          onClick={handleOpenModal}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Buy Now
        </button>
        {showModal && (
          <PlaceOrderModal
            productPrice={999}
            productVariantId={product.variants[0].id}
            onClose={handleCloseModal}
            client={client}
          />
        )}
      </div>
    </div>
  );
};

export default Product;
