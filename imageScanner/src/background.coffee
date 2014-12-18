window.imageSrc = []
clearimageSrc = ->
        window.imageSrc = []
localStorage.setItem("mainArticleflag", "true")
###
==================================================
タブ切り替えイベントを取得時の処理
==================================================
###
chrome.tabs.onActivated.addListener(
    (activeInfo) ->
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
    (result, sender, sendResponse) ->
        if result.refresh =="refreshrequest"
            clearimageSrc()
            sendResponse({mainArticleflag: localStorage.getItem("mainArticleflag")})
        else if result.name == "image num"
            chrome.browserAction.setBadgeText({text: String(result.num)})
        else if result.name == "delete child"
            window.imageSrc.splice(result.num, 1)
            chrome.browserAction.setBadgeText({text: String(window.imageSrc.length)})
            chrome.runtime.sendMessage({name: "refresh after delete"})
        else 
            window.imageSrc = result.image
)

###
==================================================
右クリックメニューに追加する処理
==================================================
###
parentId = chrome.contextMenus.create({
    title: "メニュー"
})
chrome.contextMenus.create({
    title: "画像の再読み込み"
    parentId: parentId
    onclick: ->
        chrome.tabs.reload()
})
parentId2 = chrome.contextMenus.create({
    title: "画像の取得方法"
    parentId: parentId
})
chrome.contextMenus.create({
    title: "ページ内の全て"
    parentId: parentId2
    onclick: ->
        localStorage.setItem("mainArticleflag", "false")
})
chrome.contextMenus.create({
    title: "メイン記事のみ"
    parentId: parentId2
    onclick: ->
        localStorage.setItem("mainArticleflag", "true")
})


chrome.contextMenus.create({
    title: "不具合報告"
    parentId: parentId
    onclick: ->
        window.open("http://t.co/yWaeawIe5d")
})
