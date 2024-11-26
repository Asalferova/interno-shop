<template>
	<div class="ui-date-picker">
		<div class="ui-date-picker__label">
			{{ $t('DateOfBirth') }}
		</div>
		<div class="ui-date-picker__content">
			<ui-dropdown v-model:select-item="initValue.selectedDay" placeholder="DD" :items="days" />
			<ui-dropdown v-model:select-item="initValue.selectedMonth" placeholder="MM" :items="months" />
			<ui-dropdown v-model:select-item="initValue.selectedYear" placeholder="YYYY" :items="years" />
		</div>
	</div>
</template>

<script setup lang="ts">

const props = defineProps({
	dateValue: {
		type: String,
		default: "",
	},
});

const dateToObject = computed(() => {
	const currentDate = props.dateValue ?? ''

	const [day, month, year] = currentDate.split(/[.|-]/g)

	return {
		day: day ?? '',
		month: month ?? '',
		year: year ?? ''
	}
})

const initValue = ref({
	selectedDay: dateToObject.value.day,
	selectedMonth: dateToObject.value.month,
	selectedYear: dateToObject.value.year
})

const emit = defineEmits<{
	'update:date-value': [e: string]
}>()

watch(initValue.value, (val) => {
	if (!val.selectedDay || !val.selectedMonth || !val.selectedYear) {
		return ''
	}

	emit('update:date-value', `${val.selectedDay}-${val.selectedMonth}-${val.selectedYear}`)
})

const days = computed<string[]>(() => {
	const daysData = []
	const daysNumberOfMonth = new Date(+initValue.value.selectedYear, +initValue.value.selectedMonth, 0).getDate()
	for (let day = 1; day < daysNumberOfMonth + 1; day++) {
		if (day < 10) {
			daysData.push(`0${day}`)
		} else { daysData.push(`${day}`) }
	}
	return daysData
})

watch(() => days.value.length, () => {
	if (days.value.length < +initValue.value.selectedDay) {
		initValue.value.selectedDay = '1'
	}
})

const months = computed(() => {
	const monthsData = []
	for (let month = 1; month < 13; month++) {
		if (month < 10) {
			monthsData.push(`0${month}`)
		} else { monthsData.push(`${month}`) }
	}
	return monthsData
})

const years = computed(() => {
	const currentYear = (new Date()).getFullYear()
	const yearsData = []
	for (let year = currentYear; year > currentYear - 100; year--) { yearsData.push(`${year}`) }
	return yearsData
})
</script>

<style scoped lang="scss">
.ui-date-picker {
	@include wrapperWithError;

	&__label {
		color: $text-primary;
		font-size: 22px;
		margin-bottom: 5px;
	}

	&__content {
		position: relative;
		height: 56px;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		gap: 5px;
		max-width: 316px;
	}
}
</style>
