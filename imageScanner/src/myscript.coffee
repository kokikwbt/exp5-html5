MainArticleClassName =[]

MainArticleClassNamePre = [
	"article"
	"articles"
	"Article"
	"Articles"
	"main"
	"Main"
	"entry"
	"Entry"
	"blog"
	"Blog"
	"section"
	"Section"
	"world"
	"World"
]

MainArticleClassNamePost = [
	"more"
	"More"
	"Text"
	"text"
	"Body"
	"body"
	"inner"
	"Inner"
]

MainArticleIdName = [
	"mainmore"
	"page-contents"
	"kiji"
]


MakeMainArticleClassName = ->
	for i in [0..MainArticleClassNamePre.length-1]
		MainArticleClassName.push(MainArticleClassNamePre[i])
		for j in [0..MainArticleClassNamePost.length-1]
			MainArticleClassName.push(MainArticleClassNamePre[i]+MainArticleClassNamePost[j])
			MainArticleClassName.push(MainArticleClassNamePre[i]+'-'+MainArticleClassNamePost[j])
			MainArticleClassName.push(MainArticleClassNamePre[i]+'_'+MainArticleClassNamePost[j])
			for k in [0..MainArticleClassNamePost.length-1]
				MainArticleClassName.push(MainArticleClassNamePre[i]+MainArticleClassNamePost[j]+MainArticleClassNamePost[k])
				MainArticleClassName.push(MainArticleClassNamePre[i]+'-'+MainArticleClassNamePost[j]+'-'+MainArticleClassNamePost[k])
				MainArticleClassName.push(MainArticleClassNamePre[i]+'_'+MainArticleClassNamePost[j]+'_'+MainArticleClassNamePost[k])

getImgSrc = ->
	img =[]
	chrome.runtime.sendMessage({name: "image num",num: document.images.length}, () ->)
	for i in [0..document.images.length-1]
        img[i] = document.images[i].src
    chrome.runtime.sendMessage({image:img}, () ->)

getImgSrcMainArticle = ->
	img = []
	tempimg =[]
	tempimg2 =[]
	elements = []
	MakeMainArticleClassName()
	for i in [0..MainArticleClassName.length]
		elements.push(document.getElementsByClassName(MainArticleClassName[i]))
	
	for i in [0..elements.length-1]
		if elements[i].length ==1
			temp = []
			temp = elements[i][0].getElementsByTagName("img")
			tempimg =[]
			for j in [0..temp.length-1]
				tempimg[j]=temp[j].src
			tempimg2.push(tempimg)
		#同じクラスが2つあった場合はブログ等のトップページと考え全スキャンに変更する。
		else if elements[i].length >= 2
			getImgSrc()
			return

	for i in [0..MainArticleIdName.length]
		elements.push(document.getElementById(MainArticleIdName[i]))
	for i in [0..MainArticleIdName.length-1]
		if elements[i].length ==1
			temp = []
			temp = elements[i][0].getElementsByTagName("img")
			tempimg =[]
			for j in [0..temp.length-1]
				tempimg[j]=temp[j].src
			tempimg2.push(tempimg)
		#同じクラスが2つあった場合はブログ等のトップページと考え全スキャンに変更する。
		else if elements[i].length >= 2
			getImgSrc()
			return

			
	compareLength = (a,b) ->
		a.length - b.length
	tempimg2.sort compareLength
	img=tempimg2[0]

	#クラスやタグで検索した結果
	if (!(img?))
		getImgSrc()
		return
	
	chrome.runtime.sendMessage({name: "image num",num: img.length}, () ->)
	chrome.runtime.sendMessage({image:img}, () ->)

main = ->
        chrome.runtime.sendMessage({refresh: "refreshrequest"},
            (response) ->
                if response.mainArticleflag == "true"
                    getImgSrcMainArticle()
                else
                    getImgSrc()
        )

main()
chrome.extension.onRequest.addListener(
    (request,sender,sendResponse) ->
        sendResponse({farewell:"goodbye"})
        main()
)