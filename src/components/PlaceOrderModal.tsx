import type { ChangeEvent, FormEvent } from 'react';
import React, { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import Input from './Input';

interface FormData {
  address1: string;
  address2: string;
  city: string;
  countryCode: string;
  firstName: string;
  lastName: string;
  phone: string;
  province: string;
  provinceCode: string;
  zip: string;
}

interface PlaceOrderModalProps {
  onClose: () => void;
  onSave: (formData: FormData) => void;
  productId: number;
  productPrice: number;
}

const PlaceOrderModal: React.FC<PlaceOrderModalProps> = ({
  onClose,
  onSave,
  productPrice,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [formData, setFormData] = useState<FormData>({
    address1: '',
    address2: '',
    city: '',
    countryCode: '',
    firstName: '',
    lastName: '',
    phone: '',
    province: '',
    provinceCode: '',
    zip: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentStep === 1) {
      handleNextStep(); // Proceed to the next step if the current step is 1
    } else if (currentStep === 2) {
      // You can add any additional processing or validation for Step 2 here if needed
      handleNextStep();
    } else {
      // Save the form data or handle the completion of the order here
      onSave(formData); // Pass the form data to the parent component
      setTimeout(() => {
        onClose(); // Close the modal after a few seconds
      }, 3000);
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close the modal when clicking anywhere in the blurred background
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-lg"
      onClick={handleBackgroundClick}
    >
      {productPrice && (
        <div
          className="relative w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 pt-12"
          style={{ maxHeight: '80vh' }}
        >
          <AiOutlineCloseCircle
            className="absolute right-3 top-3 cursor-pointer text-3xl text-gray-500 hover:text-gray-600"
            onClick={onClose}
          />
          {currentStep === 1 && (
            <>
              <h2 className="mb-4 text-xl font-medium">
                Step 1: Shipping Info
              </h2>
              <form
                className="grid gap-4 md:grid-cols-2"
                onSubmit={handleSubmit}
              >
                <Input
                  label="First Name"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Address Line 1"
                  name="address1"
                  type="text"
                  value={formData.address1}
                  onChange={handleChange}
                  className="md:col-span-2"
                  required
                />
                <Input
                  label="Address Line 2"
                  name="address2"
                  type="text"
                  value={formData.address2}
                  onChange={handleChange}
                  className="md:col-span-2"
                />
                <Input
                  label="City"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Zip"
                  name="zip"
                  type="text"
                  value={formData.zip}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Country Code"
                  name="countryCode"
                  type="text"
                  value={formData.countryCode}
                  onChange={handleChange}
                />
                <Input
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <Input
                  label="Province"
                  name="province"
                  type="text"
                  value={formData.province}
                  onChange={handleChange}
                />
                <Input
                  label="Province Code"
                  name="provinceCode"
                  type="text"
                  value={formData.provinceCode}
                  onChange={handleChange}
                />

                <div className="col-span-2 flex justify-between">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  >
                    Next
                  </button>
                </div>
              </form>
            </>
          )}
          {currentStep === 2 && (
            <div>
              <h2 className="mb-4 text-xl font-medium">Step 2: Buy Product</h2>
              <div className="mb-4 grid w-full grid-cols-2 gap-4">
                {/* Button 1: Display the product price */}
                <button
                  type="button"
                  className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  {productPrice} $TSHY
                </button>

                {/* Button 2: Purchase Shipping Button */}
                <button
                  type="button"
                  className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Purchase Shipping
                </button>
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
