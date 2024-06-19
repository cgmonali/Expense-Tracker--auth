import React from 'react';
import { render } from '@testing-library/react';
import VerifyEmailButton from './VerifyEmailButton';

test('renders Verify Email button', () => {
  const { getByText } = render(<VerifyEmailButton />);
  const buttonElement = getByText(/Verify Email/i);
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveClass('VerifyBtn'); 
});
