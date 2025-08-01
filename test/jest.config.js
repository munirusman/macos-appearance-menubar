module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.js', '**/?(*.)+(spec|test).js'],
  collectCoverageFrom: [
    '../main.js',
    '../utils.js',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/coverage/**',
    '!**/test/**'
  ],
  coverageDirectory: '../coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
}; 