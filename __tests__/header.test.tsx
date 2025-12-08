import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../src/components/Header';

describe('Header', () => {
  it('renders BaseFi title and theme toggle', () => {
    render(<Header />);
    expect(screen.getByText('BaseFi')).toBeInTheDocument();
    const toggle = screen.getByRole('button', { name: /dark mode|light mode/i });
    expect(toggle).toBeInTheDocument();
  });

  it('toggles dark mode class on html element', () => {
    render(<Header />);
    const toggle = screen.getByRole('button', { name: /dark mode|light mode/i });
    const html = document.documentElement;
    const initialHasDark = html.classList.contains('dark');
    fireEvent.click(toggle);
    const afterHasDark = html.classList.contains('dark');
    expect(afterHasDark).not.toEqual(initialHasDark);
  });
});
