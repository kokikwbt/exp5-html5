class ImageData
    constructor : (refChild, i) ->
        parentDiv = refChild.parentNode #親ノードを取得
        newChild = document.createElement("div") #子ノードを生成
        newChild.style = "display:inline;"
        
        img = document.createElement("img")
        img.id = "image_data_left"
        img.src = chrome.extension.getBackgroundPage().imageSrc[i]

        deleteButton = document.createElement("img")
        deleteButton.id = "delete_button"
        deleteButton.src = "./image/deleteButton.png"
        deleteButton.onclick = ->
            parentDiv.removeChild(newChild)
            console.log("delete button was pushed")

        imageName = document.createElement("textarea")
        imageName.id = "hr"
        imageName.value = 'sample.png'    #初期ファイル名を生成して代入したい
        imageName.cols = "25"
        imageName.rows = "1"
  
        hr =  document.createElement("hr")
        hr.id = "hr"

        newChild.appendChild(img)
        newChild.appendChild(deleteButton)
        newChild.appendChild(imageName)
        newChild.appendChild(hr)
        parentDiv.insertBefore(newChild, refChild)    #親ノードの末尾に挿入

    delete : () ->
        @.parentDiv.removeChild(@.newChild)
    

#画像データを追加するメソッド
addImageData = (refChild, i) ->
    parentDiv = refChild.parentNode    #親ノードを取得
    newChild = document.createElement("div")    #子ノードを生成
    newChild.style = "display:inline;"

    newImg = document.createElement("img")
    newImg.id = "image_data"
    newImg.src = chrome.extension.getBackgroundPage().imageSrc[i]

    deleteButton = document.createElement("img")
    deleteButton.id = "delete_button"
    deleteButton.src = "./image/deleteButton.png"
    deleteButton.onclick = () ->
        

    #ファイル名入力フォーム作成
    textArea = document.createElement("textarea")
    textArea.id = "hr"
    textArea.value = 'sample.png'    #初期ファイル名を生成して代入したい
    textArea.cols = "25"
    textArea.rows = "1"

    hr =  document.createElement("hr")
    hr.id = "hr"

    newChild.appendChild(newImg)
    newChild.appendChild(deleteButton)
    newChild.appendChild(textArea)
    newChild.appendChild(hr)
    parentDiv.insertBefore(newChild, refChild)    #親ノードの末尾に挿入 

#ページが読み込まれた時の処理
window.onload = ->

    #addButton
    addButton = document.getElementById "add_button"
    addButton.onclick = ->
        addImageData(imageData) for i in [0..2]

    #ImageData
    imageBox = document.getElementById "image_data"
    imageData = []
    imageData[i] = new ImageData(imageBox, i) for i in [0..chrome.extension.getBackgroundPage().imageSrc.length-1]
