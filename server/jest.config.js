module.exports = {
	preset: 'ts-jest',
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: 'src',
	testRegex: '.*\\.spec\\.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
	testEnvironment: 'node',
	moduleDirectories: ['node_modules', 'src'],
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/$1',
		'^@common/(.*)$': '<rootDir>/common/$1',
		'^@modules/(.*)$': '<rootDir>/modules/$1',
		'^@app/(.*)$': '<rootDir>/app/$1',
	},
};
