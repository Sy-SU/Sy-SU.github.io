import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('personal homepage', () => {
  it('renders the public profile and background content', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'Senyang Su' })).toBeVisible();
    expect(screen.getByRole('img', { name: 'Portrait of Senyang Su' })).toBeVisible();
    expect(screen.queryByText('苏森阳')).not.toBeInTheDocument();
    expect(screen.getByText(/Master’s Student/, { selector: '.role' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Background' })).toBeVisible();
    expect(screen.getByText('Information and Computing Science')).toBeVisible();
    expect(screen.getByText('Gold Award')).toBeVisible();
  });

  it('renders public contact links and hides empty interfaces', () => {
    render(<App />);

    expect(screen.queryByRole('heading', { name: 'Research' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute(
      'href',
      'mailto:susenyang@hust.edu.cn',
    );
    expect(
      screen
        .getAllByRole('link', { name: 'GitHub' })
        .find(link => link.getAttribute('href') === 'https://github.com/Sy-SU'),
    ).toBeDefined();
    expect(screen.queryByRole('link', { name: 'Scholar' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'CV' })).not.toBeInTheDocument();
    expect(screen.queryByRole('navigation')).not.toHaveTextContent('Research');
  });

  it('renders the selected project with verified destinations', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Projects' })).toBeVisible();
    expect(screen.getByText('3D Shape Tokenization', { selector: 'h3' })).toBeVisible();
    expect(screen.getByRole('link', { name: /Project website/ })).toHaveAttribute(
      'href',
      'https://sy-su.github.io/3D-Shape-Tokenization/',
    );
    expect(
      screen
        .getAllByRole('link', { name: 'GitHub' })
        .find(
          link =>
            link.getAttribute('href') ===
            'https://github.com/Sy-SU/3D-Shape-Tokenization',
        ),
    ).toBeDefined();
  });

  it('opens the compact navigation and closes it with Escape', () => {
    render(<App />);

    const openButton = screen.getByRole('button', { name: 'Open navigation' });
    const navigation = screen.getByRole('navigation', { name: 'Main navigation' });

    fireEvent.click(openButton);
    expect(screen.getByRole('button', { name: 'Close navigation' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(navigation).toHaveClass('is-open');

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.getByRole('button', { name: 'Open navigation' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(navigation).not.toHaveClass('is-open');
  });
});
