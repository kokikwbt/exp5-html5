imageData = []

class ImageData
    constructor : (refChild, i) ->
        parentDiv = refChild.parentNode #親ノードを取得
        newChild = document.createElement("div") #子ノードを生成
        newChild.style = "display:inline;"
        child_num = i
        
        img = document.createElement("img")
        img.id = "image_data_left"
        img.src = chrome.extension.getBackgroundPage().imageSrc[child_num]

        deleteButton = document.createElement("img")
        deleteButton.id = "delete_button"
        deleteButton.src = "./image/deleteButton.png"
        deleteButton.onclick = ->
            parentDiv.removeChild(newChild)
            #chrome.runtime.sendMessage({name: "delete child",num: child_num})

        imageName = document.createElement("textarea")
        imageName.id = "hr"
        imageName.value = 'sample.png'    #初期ファイル名を生成して代入したい
        imageName.cols = "25"
        imageName.rows = "1"
  
        saveButton = document.createElement("button")
        saveButton.innerHTML = "save"
        saveButton.onclick = ->
            filename = imageName.value
            chrome.downloads.download({url: chrome.extension.getBackgroundPage().imageSrc[child_num],filename: filename})

        hr =  document.createElement("hr")
        hr.id = "hr"

        br = document.createElement("br")

        newChild.appendChild(deleteButton)
        newChild.appendChild(img)
        newChild.appendChild(imageName)
        newChild.appendChild(document.createElement("hr"))
        newChild.appendChild(saveButton)
        newChild.appendChild(hr)
        parentDiv.insertBefore(newChild, refChild)    #親ノードの末尾に挿入

    delete : () ->
        @.parentDiv.removeChild(@.newChild)
   
###
 <a href="https://twitter.com/share" class="twitter-share-button" data-via="imageScanner" data-size="large" data-count="none">Tweet</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
###

###
chrome.extension.onMessage.addListener(
    (result) ->
        if result.name == "refresh after delete"
            imageData = splice(imageData.length)
            imageBox = document.getElementById "image_data"
            imageData[i] = new ImageData(imageBox, i) for i in [0..chrome.extension.getBackgroundPage().imageSrc.length]
)
###

#ページが読み込まれた時の処理
window.onload = ->

    #select all button
    selectAllButton = document.getElementById "select_all_button"
    selectAllButton.onclick = ->
        console.log("pushed select all button")
        
    #cancel all button
    cancelAllButton = document.getElementById "cancel_all_button"
    cancelAllButton.onclick = ->
        console.log("pushed cancel all button")
        
    #save button
    saveAllButton = document.getElementById "save_button"
    saveAllButton.onclick = ->
        console.log("pushed save all button")

    #addButton
    addButton = document.getElementById "add_button"
    addButton.onclick = ->
        addImageData(imageData) for i in [0..2]

    #ImageData
    imageBox = document.getElementById "image_data"
    imageData[i] = new ImageData(imageBox, i) for i in [0..chrome.extension.getBackgroundPage().imageSrc.length-1]
###
========================================================
###