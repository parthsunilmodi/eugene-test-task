import React from 'react';
import Home from './index';
import { render, fireEvent } from 'test-utils';
import '@testing-library/jest-dom';

test('renders with input', () => {
  const { getByTestId } = render(<Home />)
  expect(getByTestId('input')).toBeInTheDocument();
});

test('renders with submit button', () => {
  const { getByText } = render(<Home />)
  expect(getByText('Submit')).toBeInTheDocument();
})

test('renders with input change', () => {
    const { getByTestId, getByText } = render(<Home />)
  const famousProgrammerInHistory = 'Test'

  const input = getByTestId('input')
  fireEvent.change(input, famousProgrammerInHistory)

  const button = getByText('Submit')
  fireEvent.click(button)
})