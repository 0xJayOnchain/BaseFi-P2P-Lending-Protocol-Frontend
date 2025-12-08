import '@testing-library/jest-dom';
import React from 'react';
// Jest globals are available at runtime; inform TypeScript for this setup file.
declare const jest: any;

// Mock next/image to render a standard img for tests without JSX syntax
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => React.createElement('img', props),
}));

// Silence next/link warnings by rendering children
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: any) => children,
}));
