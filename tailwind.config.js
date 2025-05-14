/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			content: {
				check: 'url("/views/shared/check.svg")',
				'arrow-down': 'url("/views/shared/arrow-down.svg")'
			},
			backgroundImage: {
				register: "url('/views/connexion/connexionBackground.png')",
				login: "url('/views/connexion/loginRider.png')",
				'footer-background': "url('/views/footer/footerBackground.png')",
				'dark-gradient': 'linear-gradient(180deg, #212121 0%, #0B0B0B 100%)',
				'eclipse-gradient': "url('/views/onBoard/Eclipse.svg')"
			},
			colors: {
				'black-gradient': 'linear-gradient(180deg, #212121, #0B0B0B)',
				'blue-950': '#141D52',
				'blue-900': '#22348D',
				'blue-800': '#2035B3',
				'blue-700': '#243CDE',
				'blue-600': '#2B4AFB',
				'blue-500': '#4F77FF',
				'blue-400': '#709CFF',
				'blue-300': '#99C1FF',
				'blue-200': '#BFDAFF',
				'blue-100': '#DCECFF',
				'dark-950': '#212121',
				'dark-700': '#4F4F4F',
				'dark-600': '#5D5D5D',
				'dark-500': '#6D6D6D',
				'dark-400': '#888888',
				'dark-300': '#B0B0B0',
				'dark-200': '#D1D1D1',
				'dark-100': '#E7E7E7',
				'dark-transparent': '#000000b3',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			fontFamily: {
				michroma: [
					'Michroma',
					'sans-serif'
				],
				figtree: [
					'Figtree',
					'sans-serif'
				]
			},
			fontSize: {
				pageTitle: '96px',
				title: '32px',
				subtitle: '24px',
				subtitle2: '20px',
				large: '16px',
				medium: '14px',
				small: '12px'
			},
			spacing: {
				'50vw': '50vw'
			},
			width: {
				'login-vector-height': '90dvh'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
