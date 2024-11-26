import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineNuxtConfig({
	telemetry: false,
	devtools: {
		componentInspector: false
	},
	device: {
		refreshOnResize: true
	},
	app: {
		head: {
			htmlAttrs: {
				lang: 'ru'
			},
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ name: 'description', content: 'Interno - маркетплейс книг с широким выбором жанров и удобным интерфейсом для поиска и покупки' },
				{ name: 'format-detection', content: 'telephone=no' }
			],
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
			]
		}
	},
	runtimeConfig: {
		public: {
			apiBase: process.env.NUXT_PUBLIC_API_BASE,
			apiPrefix: '/api/',
			baseUrl: process.env.NUXT_BASE_URL
		}
	},
	proxy: {
		proxies: {
			'/api/': {
				target: process.env.NUXT_PUBLIC_API_BASE,
				changeOrigin: true,
				headers: {
					'X-Appwrite-Project': process.env.APP_WRITE_ID,
					'Content-Type': 'application/json'
				},
				rewrite: path => path.replace(/^\/api/, ''),
				configure: (proxy) => {
					proxy.on('proxyRes', (proxyRes) => {
						const cookies = proxyRes.headers['set-cookie']
						if (cookies) {
							const newCookies = cookies.map(cookie =>
								cookie.replace(/Domain=\.cloud\.appwrite\.io/i, 'Domain=localhost')
							)
							proxyRes.headers['set-cookie'] = newCookies
						}
					})
				}
			},
			'/upload': {
				target: process.env.NUXT_PUBLIC_API_BASE,
				changeOrigin: true,
				headers: {
					'X-Appwrite-Project': process.env.APP_WRITE_ID
				},
				rewrite: path => path.replace(/^\/upload/, '')
			}
		}
	},
	build: {
		transpile: ['vuesocialsharing', 'vite-plugin-svg-icons']
	},

	modules: [
		['@nuxtjs/eslint-module', { lintOnStart: false, emitError: false, emitWarning: false }],
		['@nuxtjs/stylelint-module', { lintOnStart: false }],
		'@nuxtjs/i18n',
		'@nuxtjs/color-mode',
		'@vueuse/nuxt',
		'@nuxt-alt/http',
		'@nuxt-alt/proxy',
		'@pinia/nuxt',
		'nuxt-swiper',
		'@vue-final-modal/nuxt',
		'@nuxtjs/device',
		'@pinia-plugin-persistedstate/nuxt'
	],
	css: [
		'vue-final-modal/style.css',
		'normalize.css/normalize.css',
		'~/assets/scss/main.scss'
	],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "@/assets/scss/core.scss" as *;',
					silenceDeprecations: ['legacy-js-api']
				}
			}
		},
		plugins: [
			createSvgIconsPlugin({
				// Specify the icon folder to be cached
				iconDirs: [
					path.resolve(process.cwd(), 'assets/icon')
				],
				// Specify symbolId format
				symbolId: 'icon-[dir]-[name]',

				/**
					* custom dom id
					* @default: __svg__icons__dom__
					*/
				customDomId: '__svg__icons__dom__'
			})
		]
	},
	i18n: {
		locales: [
			{
				code: 'en',
				language: 'en-GB',
				file: 'en.js'
			},
			{
				code: 'ru',
				language: 'ru-RU',
				file: 'ru.js'
			}
		],
		strategy: 'no_prefix',
		defaultLocale: 'ru',
		langDir: 'locales',
		detectBrowserLanguage: false
	}
})
