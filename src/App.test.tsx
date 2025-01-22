import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders', () => {
    render(<App />);

    screen.debug();

    // check if App components render
    // ...
  });
});
