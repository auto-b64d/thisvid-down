chrome.tabs.query({ active: true, currentWindow: true }, ([ tab ]) => {
	if (!/^https:\/\/thisvid\.com\/videos\/.+/.test(tab.url)) return
	chrome.tabs.sendMessage(tab.id, { content: 'download-start' }, msg => {
		if (msg.content === 'video-not-loaded') {
			document.body.innerText = '아직 다운로드 불가능'
		} else if (msg.content === 'download-reply') {
			chrome.downloads.download({ ...msg.value, conflictAction: 'uniquify',  }, () => {
				window.close()
			})
		}
	})
})
