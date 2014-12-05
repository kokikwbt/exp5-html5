console.log(window)

window.imageSrc = []

clearimageSrc = ->
	window.imageSrc =[]

myalert = ->
    alert("read background.js from popup!")

chrome.extension.onMessage.addListener(
    (result) ->
    	if result == "clear"
    			clearimageSrc();

        else
        	console.log(result)
            window.imageSrc.push(result)
)