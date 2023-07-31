import { useState } from 'react';

import PlaceOrderModal from './PlaceOrderModal';

type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

const Product: React.FC<{ product: ProductType }> = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveFormData = (formData) => {
    // Handle the form data here, e.g., save it to the server
    console.log(formData);
  };

  return (
    <div className="flex h-full flex-col rounded-lg border p-4 shadow-md">
      <div className="flex-1">
        <img
          src={product.image}
          alt={product.name}
          className="mb-4 h-auto w-full object-cover"
        />
        <h2 className="mb-2 text-lg font-bold">{product.name}</h2>
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
            productId={product.id}
            productPrice={product.price}
            onClose={handleCloseModal}
            onSave={handleSaveFormData}
          />
        )}
      </div>
    </div>
  );
};

export default Product;
