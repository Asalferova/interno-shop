import common from '~/locales/ru/common'
import profile from '~/locales/ru/profile'
import auth from '~/locales/ru/auth'
import ad from '~/locales/ru/ad'

export default defineI18nLocale(() => {
	return {
		...common,
		auth,
		profile,
		ad
	}
})
