import common from '~/locales/en/common'
import profile from '~/locales/en/profile'
import auth from '~/locales/en/auth'

export default defineI18nLocale(() => {
	return {
		...common,
		auth,
		profile
	}
})
