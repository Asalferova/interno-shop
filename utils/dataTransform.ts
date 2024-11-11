import { cloneDeep, get, isArray, isEmpty, isNil, mapValues, pickBy } from 'lodash-es'
import type { LocationQueryRaw, LocationQuery } from 'vue-router'

export const removeEmptyProperties = <T extends Record<string, any>>(value: T) => {
	if (!value || !Object.keys(value).length) {
		return {}
	}
	return pickBy<T>(cloneDeep(value), (prop) => {
		if (typeof prop === 'object' || typeof prop === 'string') {
			return !isEmpty(prop)
		}

		return !isNil(prop)
	})
}

export const applyQuery = <T extends {}>(queryValues: LocationQuery, defaultValues: T) => {
	if (typeof queryValues !== 'object') {
		console.warn('queryValues must be an object')
		return
	}

	if (!Object.keys(queryValues).length) {
		return {}
	}
	const values = mapValues(queryValues, (item, key) => {
		const defaultItem = get(defaultValues, key)

		if (isArray(defaultItem) && !isArray(item)) {
			return [item]
		}

		return item
	})

	return values
}

export const updateQuery = (query: LocationQueryRaw) => {
	const router = useRouter()
	router.replace({ query })
}
