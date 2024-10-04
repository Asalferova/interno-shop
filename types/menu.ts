import type { RouteLocationRaw } from 'vue-router'

export interface MenuType {
	key: string,
	label: string,
	icon?: string,
	path?: string,
	to?: RouteLocationRaw
}
