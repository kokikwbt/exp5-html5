console.log(window)

window.imageSrc = []

myalert = ->
    alert("read background.js from popup!")

chrome.extension.onMessage.addListener(
    (result) ->
            console.log(result)
            window.imageSrc.push(result)
)