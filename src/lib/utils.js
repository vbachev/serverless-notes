export const debounce = (callback = () => {}, delay = 0) => {
	let timeout
	return function () {
		const args = arguments
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			callback(...args)
		}, delay)
	}
}