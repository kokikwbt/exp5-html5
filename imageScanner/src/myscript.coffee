console.log("I am content script")
console.log(document.images)
console.log(document.images.length)
chrome.runtime.sendMessage(refresh: "refreshrequest")
console.log ("Sendrefreshrequest")
img = []
for i in [0..document.images.length-1]
	img[i] =document.images[i].src
console.log(img)
chrome.runtime.sendMessage(image:img);
