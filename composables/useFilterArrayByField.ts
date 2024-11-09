export const useFilterArrayByField = <T>(arr: T[], fild: keyof T, value: Ref<any>) => {
	return computed(() => {
		return arr.filter(el => el[fild] === value.value)
	})
}
