const formatElement = document.getElementById('format')
let timeout = null

const requestSaveSoon = () => {
	cancelCurrentTimeout()
	timeout = setTimeout(() => {
		chrome.storage.local.set({
			format: formatElement.value
		})
	}, 300)
}
const cancelCurrentTimeout = () => {
	if (timeout !== null) {
		clearTimeout(timeout)
		timeout = null
	}
}

formatElement.addEventListener('input', () => {
	requestSaveSoon()
})

chrome.storage.local.get('format', ({ format }) => {
	formatElement.value = format ?? ''
})
