import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login page content', () => {
  render(<App />);
  // Adjust this text to something you know appears on the login page, e.g., a heading or button text
  const loginText = screen.getByText(/login/i);
  expect(loginText).toBeInTheDocument();
});

test('renders watermark text', () => {
  render(<App />);
  const watermark = screen.getByText(/designed by: strategic knights/i);
  expect(watermark).toBeInTheDocument();
});
