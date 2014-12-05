console.log("I am content script")
chrome.runtime.sendMessage("clear")
console.log(document.images)
console.log(document.images.length)

for i in [0..document.images.length-1]
chrome.runtime.sendMessage(document.images[i].src)
