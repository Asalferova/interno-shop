export const loadScript = (src: string): Promise<void> => {
	return new Promise((resolve, reject) => {
		if (document.querySelector(`script[src="${src}"]`)) {
			resolve()
			return
		}
		const script = document.createElement('script')
		script.src = src
		script.async = true
		script.onload = () => resolve()
		script.onerror = () => reject(new Error(`Ошибка загрузки скрипта: ${src}`))
		document.head.appendChild(script)
	})
}
