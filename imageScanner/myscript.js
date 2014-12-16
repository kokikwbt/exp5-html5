(function() {
  var MainArticleClassName, getImgSrc, getImgSrcMainArticle, main;

  MainArticleClassName = ["articleText", "article_body", "article-body-more", "mainmore", "article-body-inner", "article-body", "entry-body", "centernaka", "entrybody", "mainEntryMore", "entry_body", "entry_text", "blogbody", "section", "articles-body", "world"];

  getImgSrc = function() {
    var i, img, _i, _ref;
    img = [];
    chrome.runtime.sendMessage({
      name: "image num",
      num: document.images.length
    });
    for (i = _i = 0, _ref = document.images.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      img[i] = document.images[i].src;
    }
    console.log(img);
    return chrome.runtime.sendMessage({
      image: img
    });
  };

  getImgSrcMainArticle = function() {
    var elements, i, img, j, temp, tempimg, tempimg2, _i, _j, _k, _ref, _ref1, _ref2;
    img = [];
    tempimg = [];
    tempimg2 = [];
    elements = [];
    console.log(MainArticleClassName.length);
    for (i = _i = 0, _ref = MainArticleClassName.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      elements[i] = document.getElementsByClassName(MainArticleClassName[i]);
    }
    console.log(elements);
    for (i = _j = 0, _ref1 = MainArticleClassName.length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
      if (elements[i].length === 1) {
        console.log(elements[i]);
        temp = [];
        temp = elements[i][0].getElementsByTagName("img");
        console.log(temp);
        tempimg = [];
        for (j = _k = 0, _ref2 = temp.length - 1; 0 <= _ref2 ? _k <= _ref2 : _k >= _ref2; j = 0 <= _ref2 ? ++_k : --_k) {
          console.log(i);
          console.log(j);
          tempimg[j] = temp[j].src;
          console.log(tempimg);
        }
        tempimg2.push(tempimg);
        console.log(img);
      }
    }
    console.log(tempimg2);
    tempimg2.sort;
    console.log(tempimg2);
    img = tempimg2[0];
    console.log(img);
    if (!(img != null)) {
      getImgSrc();
      return;
    }
    chrome.runtime.sendMessage({
      name: "image num",
      num: img.length
    });
    return chrome.runtime.sendMessage({
      image: img
    });
  };

  main = function() {
    var MainArticleflag;
    console.log(document.images);
    console.log(document.images.length);
    chrome.runtime.sendMessage({
      refresh: "refreshrequest"
    });
    MainArticleflag = true;
    if (MainArticleflag === true) {
      return getImgSrcMainArticle();
    } else {
      return getImgSrc();
    }
  };

  main();

  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    sendResponse({
      farewell: "goodbye"
    });
    return main();
  });

}).call(this);
