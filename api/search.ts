import type { SearchFetchResponse } from '~/types/search'
import { getApiUrl } from '.'

const search = {
	getSuggestions: async (request: string[], locale: string) : Promise<SearchFetchResponse> => {
		const params = {
			queries: [
				{
					method: "select",
					values: ["name", "author"]
				},
				{
					method: 'limit',
					values: [5]
				},
				{
					method: "or",
					values: [
						{
							method: "contains",
							attribute: "name",
							values: request
						},
						{
							method: "contains",
							attribute: "author",
							values: request
						}
					]
				},
				{
					method: 'equal',
					attribute: 'locale',
					values: [locale]
				}
			]
		}
		return await $http.$get(getApiUrl('internoBD', 'products'), { params })
	}
}

export default search
