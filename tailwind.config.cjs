/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		colors: {
			gray: '#474748',
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#ed4202',

					secondary: '#C8CBCD',

					accent: '#D59B6C',

					neutral: '#836B5D',

					'base-100': '#030303',
					'base-200': '#1A1A1B',
					'base-300': '#272729',
					border: '#474748',

					info: '#42AEBD',

					success: '#489380',

					warning: '#EB8014',

					error: '#E01A2E',
				},
			},
		],
	},
};
