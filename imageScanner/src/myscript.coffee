MainArticleClassName = [
	"articleText"
	"article_body"
	"article-body-more"
	"mainmore"
	"article-body-inner"
	"article-body"
	"entry-body"
	"centernaka"
	"entrybody"
	"mainEntryMore"
	"entry_body"
	"entry_text"
	"blogbody"
	"section"
	"articles-body"
	"world"
	]	

getImgSrc = ->
	img =[]
	chrome.runtime.sendMessage({name: "image num",num: document.images.length})
	for i in [0..document.images.length-1]
        img[i] = document.images[i].src
    console.log(img)
    chrome.runtime.sendMessage({image:img})

getImgSrcMainArticle = ->
	img = []
	tempimg =[]
	tempimg2 =[]
	elements = []
	console.log(MainArticleClassName.length)
	for i in [0..MainArticleClassName.length]
		elements[i]=document.getElementsByClassName(MainArticleClassName[i])
	console.log(elements) 
	for i in [0..MainArticleClassName.length-1]
		if elements[i].length ==1
			console.log (elements[i])
			temp = []
			temp = elements[i][0].getElementsByTagName("img")
			console.log(temp)
			tempimg =[]
			for j in [0..temp.length-1]
				console.log(i)
				console.log(j)
				tempimg[j]=temp[j].src
				console.log(tempimg)
			tempimg2.push(tempimg)
			console.log(img)
			

	console.log(tempimg2)
	tempimg2.sort
	console.log(tempimg2)
	img=tempimg2[0]
	console.log(img)
	if (!(img?))
		getImgSrc()
		return
	chrome.runtime.sendMessage({name: "image num",num: img.length})
	chrome.runtime.sendMessage({image:img})



main = ->
	console.log(document.images)
	console.log(document.images.length)
	chrome.runtime.sendMessage(refresh: "refreshrequest")
	MainArticleflag =true	
	if(MainArticleflag==true)
		getImgSrcMainArticle()
	else
		getImgSrc()

main()

