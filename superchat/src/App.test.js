import { render, screen } from '@testing-library/react';
import App from './App';

// Test to check if the App component loads properly
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
