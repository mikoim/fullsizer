chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.url) {
    chrome.downloads.download({
      url: message.url
    });
  }

  sendResponse();
});
