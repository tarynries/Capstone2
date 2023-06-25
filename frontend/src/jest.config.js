module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
        '<rootDir>/node_modules/',
    ],
    setupFiles: ['<rootDir>/src/setupTests.js'],
};
