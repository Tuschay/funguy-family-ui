import { render, screen } from '@testing-library/react';

import Shop from '@/pages/shop';

// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
// The mock has been moved to `__mocks__` folder to avoid duplication

describe('Shop page', () => {
  describe('Render method', () => {
    it('should have two paragraphs of `Lorem ipsum`', () => {
      render(<Shop />);

      const paragraph = screen.getAllByText(/Lorem ipsum/);

      expect(paragraph).toHaveLength(2);
    });
  });
});
