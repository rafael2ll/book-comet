/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleDirectories: ['node_modules', 'src'],
    setupFilesAfterEnv: ['./tests/core/setup.ts'],
    moduleNameMapper: {
        '@db/(.*)': ['<rootDir>/src/db/$1'],
        '@core/(.*)': ['<rootDir>/src/core/$1'],
        '@usecases/(.*)': ['<rootDir>/src/usecase/$1'],
        '@errors/(.*)': ['<rootDir>/src/core/errors/$1'],
    },
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
}
