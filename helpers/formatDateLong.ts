// /**
//  * Форматировать дату в длинном формате в зависимости от текущей локали
//  * @param dateString - Строка даты в формате ISO
//  * @returns Отформатированная дата в длинном формате (месяц, день, год)
//  */

// import { DateTime } from 'luxon'

// export function formatDateLong (dateString: string) {
// 	const { locale } = useI18n()
// 	return DateTime.fromISO(dateString).setLocale(locale.value).toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' })
// }
