(function() {
  var MainArticleClassName, MainArticleClassNamePost, MainArticleClassNamePre, MainArticleIdName, MakeMainArticleClassName, getImgSrc, getImgSrcMainArticle, main;

  MainArticleClassName = [];

  MainArticleClassNamePre = ["article", "articles", "Article", "Articles", "main", "Main", "entry", "Entry", "blog", "Blog", "section", "Section", "world", "World"];

  MainArticleClassNamePost = ["more", "More", "Text", "text", "Body", "body", "inner", "Inner"];

  MainArticleIdName = ["mainmore", "page-contents", "kiji"];

  MakeMainArticleClassName = function() {
    var i, j, k, _i, _ref, _results;
    _results = [];
    for (i = _i = 0, _ref = MainArticleClassNamePre.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      MainArticleClassName.push(MainArticleClassNamePre[i]);
      _results.push((function() {
        var _j, _ref1, _results1;
        _results1 = [];
        for (j = _j = 0, _ref1 = MainArticleClassNamePost.length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
          MainArticleClassName.push(MainArticleClassNamePre[i] + MainArticleClassNamePost[j]);
          MainArticleClassName.push(MainArticleClassNamePre[i] + '-' + MainArticleClassNamePost[j]);
          MainArticleClassName.push(MainArticleClassNamePre[i] + '_' + MainArticleClassNamePost[j]);
          _results1.push((function() {
            var _k, _ref2, _results2;
            _results2 = [];
            for (k = _k = 0, _ref2 = MainArticleClassNamePost.length - 1; 0 <= _ref2 ? _k <= _ref2 : _k >= _ref2; k = 0 <= _ref2 ? ++_k : --_k) {
              MainArticleClassName.push(MainArticleClassNamePre[i] + MainArticleClassNamePost[j] + MainArticleClassNamePost[k]);
              MainArticleClassName.push(MainArticleClassNamePre[i] + '-' + MainArticleClassNamePost[j] + '-' + MainArticleClassNamePost[k]);
              _results2.push(MainArticleClassName.push(MainArticleClassNamePre[i] + '_' + MainArticleClassNamePost[j] + '_' + MainArticleClassNamePost[k]));
            }
            return _results2;
          })());
        }
        return _results1;
      })());
    }
    return _results;
  };

  getImgSrc = function() {
    var i, img, _i, _ref;
    img = [];
    chrome.runtime.sendMessage({
      name: "image num",
      num: document.images.length
    }, function() {});
    for (i = _i = 0, _ref = document.images.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      img[i] = document.images[i].src;
    }
    return chrome.runtime.sendMessage({
      image: img
    }, function() {});
  };

  getImgSrcMainArticle = function() {
    var compareLength, elements, i, img, j, temp, tempimg, tempimg2, _i, _j, _k, _l, _m, _n, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
    img = [];
    tempimg = [];
    tempimg2 = [];
    elements = [];
    MakeMainArticleClassName();
    for (i = _i = 0, _ref = MainArticleClassName.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      elements.push(document.getElementsByClassName(MainArticleClassName[i]));
    }
    for (i = _j = 0, _ref1 = elements.length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
      if (elements[i].length === 1) {
        temp = [];
        temp = elements[i][0].getElementsByTagName("img");
        tempimg = [];
        for (j = _k = 0, _ref2 = temp.length - 1; 0 <= _ref2 ? _k <= _ref2 : _k >= _ref2; j = 0 <= _ref2 ? ++_k : --_k) {
          tempimg[j] = temp[j].src;
        }
        tempimg2.push(tempimg);
      } else if (elements[i].length >= 2) {
        getImgSrc();
        return;
      }
    }
    for (i = _l = 0, _ref3 = MainArticleIdName.length; 0 <= _ref3 ? _l <= _ref3 : _l >= _ref3; i = 0 <= _ref3 ? ++_l : --_l) {
      elements.push(document.getElementById(MainArticleIdName[i]));
    }
    for (i = _m = 0, _ref4 = MainArticleIdName.length - 1; 0 <= _ref4 ? _m <= _ref4 : _m >= _ref4; i = 0 <= _ref4 ? ++_m : --_m) {
      if (elements[i].length === 1) {
        temp = [];
        temp = elements[i][0].getElementsByTagName("img");
        tempimg = [];
        for (j = _n = 0, _ref5 = temp.length - 1; 0 <= _ref5 ? _n <= _ref5 : _n >= _ref5; j = 0 <= _ref5 ? ++_n : --_n) {
          tempimg[j] = temp[j].src;
        }
        tempimg2.push(tempimg);
      } else if (elements[i].length >= 2) {
        getImgSrc();
        return;
      }
    }
    compareLength = function(a, b) {
      return a.length - b.length;
    };
    tempimg2.sort(compareLength);
    img = tempimg2[0];
    if (!(img != null)) {
      getImgSrc();
      return;
    }
    chrome.runtime.sendMessage({
      name: "image num",
      num: img.length
    }, function() {});
    return chrome.runtime.sendMessage({
      image: img
    }, function() {});
  };

  main = function() {
    return chrome.runtime.sendMessage({
      refresh: "refreshrequest"
    }, function(response) {
      if (response.mainArticleflag === "true") {
        return getImgSrcMainArticle();
      } else {
        return getImgSrc();
      }
    });
  };

  main();

  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    sendResponse({
      farewell: "goodbye"
    });
    return main();
  });

}).call(this);
