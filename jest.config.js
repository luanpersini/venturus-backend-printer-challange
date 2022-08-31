module.exports = {
  rootDir: './',
  roots: ["<rootDir>/src/", "<rootDir>/tests/"],
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',    
    '!**/tests/**',
    '!**/__tests__/**',
    '!**/**.module.ts'
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  moduleNameMapper: {   
    "@api/(.*)": ["<rootDir>/src/api/$1"],   
    "@infrastructure/(.*)": ["<rootDir>/src/infrastructure/$1"],
    "@modules/(.*)": ["<rootDir>/src/modules/$1"],
    "@tests/(.*)": ["<rootDir>/tests/$1"],
    "src/(.*)": ["<rootDir>/src/$1"],
    "@src/(.*)": ["<rootDir>/src/$1"]
  }
}