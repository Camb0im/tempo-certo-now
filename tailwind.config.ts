
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// TempoCerto Brand Identity Colors
				"brand": {
					primary: "#3A506B",      // Azul Ardósia Profundo
					secondary: "#6FFFB0",    // Verde Menta Vibrante
					ice: "#F0F7F4",          // Branco Gelo
					"gray-soft": "#BCCCDC",  // Cinza Suave
					"gray-medium": "#8A9BA8" // Cinza Médio
				},
				// TempoCerto minimalista colors (mantendo compatibilidade)
				"tc-blue": "#3A506B",
				"tc-blue-dark": "#2563EB",
				"tc-purple": "#6366F1",
				"tc-purple-dark": "#4F46E5",
				"tc-green": "#6FFFB0",
				"tc-green-dark": "#059669",
				"tc-red": "#EF4444",
				"tc-red-dark": "#DC2626",
				"tc-gray": {
					50: "#F0F7F4",
					100: "#F4F4F5",
					200: "#BCCCDC",
					300: "#D1D5DB",
					400: "#9CA3AF",
					500: "#8A9BA8",
					600: "#4B5563",
					700: "#374151",
					800: "#1F2937",
					900: "#3A506B"
				},
				"tc-dark": {
					bg: "#1E1E2F",
					card: "#252540",
					accent: "#121212"
				}
			},
			borderRadius: {
				lg: '12px',
				md: '8px',
				sm: '6px'
			},
			fontFamily: {
				sans: ['Nunito Sans', 'Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
				display: ['Nunito Sans', 'Manrope', 'Inter', 'sans-serif']
			},
			fontSize: {
				'base': ['16px', '24px'],
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem'
			},
			boxShadow: {
				'minimal': '0 2px 8px rgba(58, 80, 107, 0.08)',
				'card': '0 4px 12px rgba(58, 80, 107, 0.12)',
				'modal': '0 8px 32px rgba(58, 80, 107, 0.16)',
				'brand': '0 4px 20px rgba(111, 255, 176, 0.15)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(4px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.96)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(8px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'brand-pulse': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'slide-up': 'slide-up 0.3s ease-out',
				'brand-pulse': 'brand-pulse 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
