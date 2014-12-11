###
==================================================
###
window.imageData = []
###
==================================================
ImageDataクラス．popup.htmlに表示する要素を動的に
生成する．
==================================================
###
class ImageData
    constructor : (refChild, i) ->
        parentDiv = refChild.parentNode #親ノードを取得
        newChild = document.createElement("div") #子ノードを生成
        newChild.id = "box"
        newChild.style = "display:inline;"
        child_num = i
        
        div = document.createElement("div")
        div.style.width = "160px"
        div.style.height = "160px"
        div.id = "image_data_left"
        img = document.createElement("img")
        img.id = "image_data_left"
        img.src = chrome.extension.getBackgroundPage().imageSrc[child_num]
        div.appendChild(img)

        deleteButton = document.createElement("img")
        deleteButton.id = "delete_button"
        deleteButton.src = "./image/deleteButton.png"
        deleteButton.onclick = ->
            parentDiv.removeChild(newChild)
            #chrome.runtime.sendMessage({name: "delete child",num: child_num})

        chbox = document.createElement("div")
        chbox.innerHTML = '<input type="checkbox"name="checkbox">'

        imageName = document.createElement("textarea")
        imageName.value = 'sample.png'    #初期ファイル名を生成して代入したい
        imageName.cols = "25"
        imageName.rows = "1"
  
        saveButton = document.createElement("button")
        saveButton.innerHTML = "save"
        saveButton.onclick = ->
            filename = imageName.value
            chrome.downloads.download({url: chrome.extension.getBackgroundPage().imageSrc[child_num],filename: filename})

        tweetButton = document.createElement("a")
        tweetButton.setAttribute("href", "https://twitter.com/share")
        tweetButton.setAttribute("class", "twitter-share-button")
        tweetButton.setAttribute("data-url", chrome.extension.getBackgroundPage().imageSrc[child_num])
        tweetButton.setAttribute("data-via", "_k5x")
        tweetButton.setAttribute("data-count", "none")
        tweetButton.innerHTML = "Tweet"
        script = document.createElement("script")
        script.type = "text/javascript"
        script.src = "./tweet.js"
        script.src = "./widgets.js"
        tweetButton.appendChild(script)

        hrMid = document.createElement("hr")
        hrMid.id = "hr_mid"

        hrEnd = document.createElement("hr")
        hrEnd.id = "hr_end"

        br = document.createElement("br")

        newChild.appendChild(deleteButton)
        newChild.appendChild(div)
        newChild.appendChild(chbox)
        newChild.appendChild(imageName)
        newChild.appendChild(br)
        newChild.appendChild(saveButton)
        newChild.appendChild(hrMid)
        newChild.appendChild(tweetButton)
        newChild.appendChild(hrEnd)
        parentDiv.insertBefore(newChild, refChild)    #親ノードの末尾に挿入

    check : ->
        @.chbox.checked = true
###
chrome.extension.onMessage.addListener(
    (result) ->
        if result.name == "refresh after delete"
            imageData = splice(imageData.length)
            imageBox = document.getElementById "image_data"
            imageData[i] = new ImageData(imageBox, i) for i in [0..chrome.extension.getBackgroundPage().imageSrc.length]
)
###
###
==================================================
ページが読み込まれた時の処理
==================================================
###
window.onload = ->
    #select all button
    selectAllButton = document.getElementById "select_all_button"
    selectAllButton.onclick = ->
        console.log("pushed select all button")
        for i in [1..document.body.childNodes[5].childNodes.length-3]
            document.body.childNodes[5].childNodes[i].childNodes[2].childNodes[0].checked = true
    #cancel all button
    cancelAllButton = document.getElementById "cancel_all_button"
    cancelAllButton.onclick = ->
        console.log("pushed cancel all button")
        for i in [1..document.body.childNodes[5].childNodes.length-3]
            document.body.childNodes[5].childNodes[i].childNodes[2].childNodes[0].checked = false

    #save button
    saveAllButton = document.getElementById "save_button"
    saveAllButton.onclick = ->
        console.log("pushed save all button")
        for i in [1..document.body.childNodes[5].childNodes.length-3]
            if document.body.childNodes[5].childNodes[i].childNodes[2].childNodes[0].checked
                chrome.downloads.download({url: document.body.childNodes[5].childNodes[1].childNodes[1].childNodes[0].src, filename: document.body.childNodes[5].childNodes[i].childNodes[3].value})


    #addButton
    addButton = document.getElementById "add_button"


    #ImageData
    imageBox = document.getElementById "image_data"
    window.imageData[i] = new ImageData(imageBox, i) for i in [0..chrome.extension.getBackgroundPage().imageSrc.length-1]
###
==================================================
###