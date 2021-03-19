module.exports = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },

  moduleFileExtensions: ['js', 'json', 'ts', 'jsx', 'tsx', 'node'],
  rootDir: './',

  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx)?$',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    'src/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/src/__mocks__/matchFile.mock.js',
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/matchFile.mock.js',
  },
  clearMocks: true,

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: [
    // '@testing-library/react/cleanup-after-each',
    '@testing-library/jest-dom/extend-expect',
    '<rootDir>/src/setupTests.js',
  ],
  automock: false,
  setupFiles: ['./setupJest.js'],
};
