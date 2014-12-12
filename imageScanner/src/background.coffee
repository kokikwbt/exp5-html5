console.log(window)

window.imageSrc = []

clearimageSrc = ->
        window.imageSrc = []

###
==================================================
タブ切り替えイベントを取得時の処理
==================================================
###
chrome.tabs.onActivated.addListener(
    (activeInfo) ->
        console.log("you changed tabs")
        chrome.tabs.getSelected(null,
            (tab)->
                chrome.tabs.sendRequest(activeInfo.tabId,{changed:"changed"},
                    (response)->
                        console.log(response)
                        console.log("test")
            )   
        )
)


###
==================================================
メッセージを取得時の処理
==================================================
###
chrome.extension.onMessage.addListener(
    (result) ->
        console.log(result)
        if result.refresh =="refreshrequest"
            clearimageSrc()
            console.log (window.imageSrc)
            console.log ("ClearimageSrc")     
        else if result.name == "image num"
            chrome.browserAction.setBadgeText({text: String(result.num)})
        else if result.name == "delete child"
            window.imageSrc.splice(result.num, 1)
            console.log(window.imageSrc.length)
            chrome.browserAction.setBadgeText({text: String(window.imageSrc.length)})
            chrome.runtime.sendMessage({name: "refresh after delete"})
        else 
            window.imageSrc = result.image
)
