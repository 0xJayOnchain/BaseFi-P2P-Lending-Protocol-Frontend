/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // Mock CSS imports
    '^.+\\.(css|less|scss|sass)$': '<rootDir>/__tests__/__mocks__/styleMock.js',
    // Next.js alias support if used
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
        },
        isolatedModules: true,
        diagnostics: true,
      },
    ],
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverageFrom: [
    'app/**/*.tsx',
    'src/**/*.tsx',
    '!app/**/layout.tsx',
  ],
};
