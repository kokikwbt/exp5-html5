console.log(window)

window.imageSrc = []

clearimageSrc = ->
	window.imageSrc = []

chrome.extension.onMessage.addListener(
    (result) ->
    	console.log(result)
    	if result.refresh =="refreshrequest"
    		clearimageSrc()
    		console.log (window.imageSrc)
    		console.log	("ClearimageSrc")
    	else 
    		window.imageSrc = result.image
    		console.log (window.imageSrc)
)