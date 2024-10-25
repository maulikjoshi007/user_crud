module.exports = {
    preset: 'ts-jest', // Use ts-jest preset to handle TypeScript files
    testEnvironment: 'node', // Use the Node.js environment for testing
    transform: {
      '^.+\\.ts?$': 'ts-jest', // Transform TypeScript files using ts-jest
    },
    moduleFileExtensions: ['ts', 'js'], // Support both .ts and .js files
    transformIgnorePatterns: ['/node_modules/'], // Ignore node_modules from transformation
  };
  