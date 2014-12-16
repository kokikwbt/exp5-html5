###
==================================================
###
window.imageData = []
favData = []
fav = []
console.log(fav)
###
==================================================
ImageDataクラス．読み込んだ画像１枚ごとに各html要素
を１つのまとまりとして動的に生成しpopup.htmlに表示
する．
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
        img.onclick = ->
            window.open(img.src)
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
        imageName.value = 'default'    #初期ファイル名を生成して代入したい
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
        #tweetButton.setAttribute("data-via", "_k5x")
        tweetButton.setAttribute("data-count", "none")
        tweetButton.innerHTML = "Tweet"
        script = document.createElement("script")
        script.type = "text/javascript"
        script.src = "./tweet.js"
        script.src = "./widgets.js"
        tweetButton.appendChild(script)

        favButton = document.createElement("img")
        favButton.src = "./image/unfav.png"
        favButton.style.height = "20px"
        favButton.onclick = ->
            favButton.src = "./image/fav.png"
            if localStorage.length == 0
                fav = [img.src]
                localStorage.setItem("fav", JSON.stringify(fav))
            else
                fav = JSON.parse(localStorage.getItem("fav"))
                fav.push(img.src)
                localStorage.setItem("fav", JSON.stringify(fav))
            favBox = document.getElementById "fav_data"
            favData.push(new FavData(favBox, img.src))

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
        newChild.appendChild(favButton)
        newChild.appendChild(hrEnd)
        parentDiv.insertBefore(newChild, refChild)    #親ノードの末尾に挿入

###
==================================================
FavDataクラス
==================================================
###
class FavData
    constructor: (refChild, src) ->
        parentDiv = refChild.parentNode
        newChild = document.createElement("div")
        newChild.style = "display:inline;"

        div = document.createElement "div"
        div.style.width = "160px"
        div.style.height = "160px"
        div.id = "fav_data_left"        
        img = document.createElement "img"
        img.id = "fav_data_left"
        img.src = src
        img.onclick = ->
            window.open img.src
        div.appendChild img

        deleteButton = document.createElement "img"
        deleteButton.src = "./image/deleteButton.png"
        deleteButton.id = "delete_button"
        deleteButton.onclick = ->
            parentDiv.removeChild(newChild)
            fav = []
            if document.getElementById("fav").childNodes.length > 3
                for i in [1..document.getElementById("fav").childNodes.length-3]
                    fav[i-1] = document.getElementById("fav").childNodes[i].childNodes[1].childNodes[0].src
            localStorage.clear("fav")
            localStorage.setItem("fav", JSON.stringify(fav))
        chbox = document.createElement "div"
        chbox.innerHTML = '<input type="checkbox" name="checkbox">'

        imageName = document.createElement "textarea"
        imageName.value = 'default'
        imageName.cols = "25"
        imageName.rows = "1"

        saveButton = document.createElement "button"
        saveButton.innerHTML = "save"
        saveButton.onclick = ->
            filename = imageName.value
            chrome.downloads.download({url: img.src, filename: filename})

        tweetButton = document.createElement "a"
        tweetButton.setAttribute("href", "https://twitter.com/share")
        tweetButton.setAttribute("class", "twitter-share-button")
        tweetButton.setAttribute("data-url", img.src)
        tweetButton.innerHTML = "Tweet"
        script = document.createElement "script"
        script.type = "text/javascript"
        script.src = "./tweet.js"
        script.src = "./widgets.js"
        tweetButton.appendChild script

        hrMid = document.createElement "hr"
        hrMid.id = "hr_mid"
        hrEnd = document.createElement "hr"
        hrEnd.id = "hr_end"
        br = document.createElement "br"
        
        newChild.appendChild deleteButton
        newChild.appendChild div
        newChild.appendChild chbox
        newChild.appendChild imageName
        newChild.appendChild br
        newChild.appendChild saveButton
        newChild.appendChild hrMid
        newChild.appendChild tweetButton
        newChild.appendChild hrEnd
        parentDiv.insertBefore(newChild,refChild)

###
==================================================
zipファイル生成
==================================================
###

create_zip = (src) ->
    zip = new JSZip()
    for i in [0..src.length]
        zip.add(src[i], imgData, {base64: true})    
    content = zip.generate()
    location.href="data:application/zip;base64," + content;
    chrome.downloads.download({url: "data:application/zip;base64," + content})

###
==================================================
ページが読み込まれた時の処理
==================================================
###
window.onload = ->
    ###
    -----------------
    select all button
    -----------------
    ###
    selectAllButton = document.getElementById "select_all_button"
    selectAllButton.onclick = ->
        console.log("pushed select all button")
        if document.getElementById("main").style.display == "block"
            for i in [1..document.getElementById("main").childNodes.length-3]
                document.getElementById("main").childNodes[i].childNodes[2].childNodes[0].checked = true
        else
            for i in [1..document.getElementById("fav").childNodes.length-3]
                document.getElementById("fav").childNodes[i].childNodes[2].childNodes[0].checked = true


    ###
    -----------------
    cancel all button
    -----------------
    ###
    cancelAllButton = document.getElementById "cancel_all_button"
    cancelAllButton.onclick = ->
        console.log("pushed cancel all button")
        if document.getElementById("main").style.display == "block"
            for i in [1..document.getElementById("main").childNodes.length-3]
                document.getElementById("main").childNodes[i].childNodes[2].childNodes[0].checked = false
        else
            for i in [1..document.getElementById("fav").childNodes.length-3]
                document.getElementById("fav").childNodes[i].childNodes[2].childNodes[0].checked = false
    ###
    -----------
    save button
    -----------
    ###
    saveAllButton = document.getElementById "save_button"
    saveAllButton.onclick = ->
        if document.getElementById("format").value == "default"
            if document.getElementById("main").style.display == "block" 
                for i in [1..document.getElementById("main").childNodes.length-3]
                    if document.getElementById("main").childNodes[i].childNodes[2].childNodes[0].checked
                        chrome.downloads.download({url: document.getElementById("main").childNodes[i].childNodes[1].childNodes[0].src, filename: document.getElementById("main").childNodes[i].childNodes[3].value})
            else
                for i in [1..document.getElementById("fav").childNodes.length-3]
                    if document.getElementById("fav").childNodes[i].childNodes[2].childNodes[0].checked
                        chrome.downloads.download({url: document.getElementById("fav").childNodes[i].childNodes[1].childNodes[0].src, filename: document.getElementById("main").childNodes[i].childNodes[3].value})
        else
            if document.getElementById("main").style.display == "block"
                zip = new JSZip()
                zip_buffer = 0
                xhr_buffer = 0
                for i in [1..document.getElementById("main").childNodes.length-3]
                    if document.getElementById("main").childNodes[i].childNodes[2].childNodes[0].checked
                        zip_buffer++
                        console.log("zip"+zip_buffer)
                        xhr = new XMLHttpRequest()
                        xhr.open('GET', document.getElementById("main").childNodes[i].childNodes[1].childNodes[0].src, true)
                        xhr.responseType = 'arraybuffer'
                        xhr.onload = (evt) ->
                            arraybuffer = new Uint8Array(this.response)
#                            tmpurl = document.getElementById("main").childNodes[i].childNodes[1].childNodes[0].src
#                            filename = tmpurl.replace(/^(.*)\//,'')
                            zip.file(xhr_buffer + ".png", arraybuffer)
                            xhr_buffer++
                            console.log("xhr"+xhr_buffer)
                            if zip_buffer == xhr_buffer
                                content = zip.generate()
                                location.href="data:application/zip;base64," + content
                                chrome.downloads.download({url: "data:application/zip;base64," + content})

#                        zip.file("default"+i+"", document.getElementById("main").childNodes[i].childNodes[1].childNodes[0].src, {base64: false})
                        
                        xhr.send()
            else
                
    ###
    ---------
    addButton
    ---------
    ###
#    addButton = document.getElementById "add_button"
#    addButton.onclick = ->
#        create_zip(

    ###
    ---------
    ImageData
    ---------
    ###
    imageBox = document.getElementById "image_data"
    window.imageData[i] = new ImageData(imageBox, i) for i in [0..chrome.extension.getBackgroundPage().imageSrc.length-1]

    ###
    ---------
    favData
    ---------
    ###
    if localStorage.length > 0
        fav = JSON.parse(localStorage.getItem("fav"))
        favBox = document.getElementById "fav_data"
        if fav.length > 0
            favData[i] = new FavData(favBox, fav[i]) for i in [0..fav.length-1]

    ###
    ----------
     タブ設定
    ----------
    ###
    document.getElementById("main").style.display = "none"
    document.getElementById("fav").style.display = "none"
    document.getElementById("main").style.display = "block"
    tab1 = document.getElementById "tab1"
    tab1.onclick = ->
        document.getElementById("fav").style.display = "none"
        document.getElementById("main").style.display = "block"
    tab2 = document.getElementById "tab2"
    tab2.onclick = ->
        document.getElementById("main").style.display = "none"
        document.getElementById("fav").style.display = "block"

###
==================================================
###
