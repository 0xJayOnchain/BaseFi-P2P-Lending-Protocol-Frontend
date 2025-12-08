import { render, screen } from '@testing-library/react';
import Home from '../app/page';

describe('Home page', () => {
  it('renders BaseFi Frontend title', () => {
    render(<Home />);
    expect(screen.getByText(/BaseFi Frontend/i)).toBeInTheDocument();
  });

  it('has navigation links', () => {
    render(<Home />);
    expect(screen.getByText(/Lender Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Borrower Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample Loan #1/i)).toBeInTheDocument();
  });
});
