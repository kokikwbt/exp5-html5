#画像データを追加するメソッド
addImageData = (refChild) ->
    parentDiv = refChild.parentNode    #親ノードを取得
    newChild = document.createElement("div")    #子ノードを生成
    newChild.style = "display:inline;"

    newImg = document.createElement("img")
    newImg.id = "image_data_left"
    newImg.style.width = "100px"
    newImg.style.height = "100px"
    newImg.src = "document.images.src"#./sample.png"

    deleteButton = document.createElement("img")
    deleteButton.id = "image_data_right"
    deleteButton.style.width = "10px"
    deleteButton.style.height = "10px"
    deleteButton.src = "./deleteButton.png"

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
#    alert("window.onload") #for debug

    #addButton
    addButton = document.getElementById "add_button"
    #click event
    addButton.onclick = ->
#        alert("addButton") #for debug
        addImageData(imageData) for i in [0..2]

    #ImageData
    imageData = document.getElementById "image_data"
    addImageData(imageData) for i in [0..2]

