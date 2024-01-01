// BackToTopButton.js
import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate the scroll amount
      const scrollAmount = window.scrollY;

      // Get the viewport height
      const viewportHeight = window.innerHeight;

      // Update the visibility state
      setIsVisible(scrollAmount >= viewportHeight / 2);
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`hover: fixed bottom-8 right-8 rounded-full border-2 border-black bg-white px-4 py-2 text-black transition-all duration-300 hover:bg-black hover:text-white ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={scrollToTop}
    >
      <FaArrowUp />
    </button>
  );
};

export default BackToTopButton;
