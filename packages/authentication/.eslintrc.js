module.exports = {
	rules: {
		'import/no-extraneous-dependencies': [ 'error', { packageDir: __dirname } ],
	},
	overrides: [
		{
			files: [ '*.stories.jsx', '*.stories.tsx' ],
			rules: {
				'import/no-extraneous-dependencies': 'off',
			},
		},
	],
};
