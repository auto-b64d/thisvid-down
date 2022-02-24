const fillZero = n => n.toString().padStart(2, '0')

chrome.runtime.onMessage.addListener(({ content }, _, sendResponse) => {
	if (content !== 'download-start') return
	const id = document.querySelector('meta[property="og:url"]').getAttribute('content').match(/\/([\w-]+)\/$/)[1]
	const name = document.querySelector('.headline').children[0].innerHTML
	const now = new Date()
	const date = `${now.getFullYear()}${fillZero(now.getMonth() + 1)}${fillZero(now.getDate())}_${fillZero(now.getHours())}${fillZero(now.getMinutes())}${fillZero(now.getSeconds())}`
	const duration = document.querySelectorAll('.title-description')[2].innerHTML
	chrome.storage.local.get('format', ({ format }) => {
		const formatItems = [
			[ 'id', id ],
			[ 'name', name ],
			[ 'duration', duration ],
			[ 'now', date ],
		]
		sendResponse({
			content: 'download-reply',
			value: {
				url: document.querySelector('video.fp-engine').getAttribute('src'),
				filename: formatItems.reduce((f, [ key, value ]) => f.replace(RegExp(`\\[${key}\\]`, 'g'), value), format || '[now].mp4')
			},
		})
	})
	return true // if listener sends response asynchronously listener should return true
})