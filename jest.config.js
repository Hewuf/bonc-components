module.exports = {
  moduleFileExtensions: ['js', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest'
  },
  testMatch: ['<rootDir>/src/**/__tests__/*.(js|jsx|ts|tsx)|<rootDir>/src/**/*.(spec|test).(js|jsx|ts|tsx)'],
};