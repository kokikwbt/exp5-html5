console.log("I am content script")
console.log(document.images)
console.log(document.images.length)

for i in [0..document.images.length]
    chrome.runtime.sendMessage(document.images[i].src)
