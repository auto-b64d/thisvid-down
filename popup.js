chrome.tabs.query({ active: true, currentWindow: true }, ([ tab ]) => {
	chrome.tabs.sendMessage(tab.id, { content: 'download-start' }, msg => {
		console.log('msg', msg)
		if (msg.content !== 'download-reply') return
		chrome.downloads.download({ ...msg.value, conflictAction: 'uniquify' }, () => {
			window.close()
		})
	})
})
