
/*
==================================================
 */

(function() {
  var FavData, ImageData, create_zip, fav, favData;

  window.imageData = [];

  favData = [];

  fav = [];


  /*
  ==================================================
  ImageDataクラス．読み込んだ画像１枚ごとに各html要素
  を１つのまとまりとして動的に生成しpopup.htmlに表示
  する．
  ==================================================
   */

  ImageData = (function() {
    function ImageData(refChild, i) {
      var br, chbox, child_num, deleteButton, div, favButton, filename, hrEnd, hrMid, imageName, img, newChild, parentDiv, saveButton, script, tweetButton;
      parentDiv = refChild.parentNode;
      newChild = document.createElement("div");
      newChild.id = "box";
      newChild.style.backgroundImage = "linear-gradient(#f7fbfc,#d9edf2,#add9e4)";
      newChild.style = "display:inline;";
      child_num = i;
      div = document.createElement("div");
      div.style.width = "160px";
      div.style.height = "160px";
      div.id = "image_data_left";
      img = document.createElement("img");
      img.id = "image_data_left";
      img.src = chrome.extension.getBackgroundPage().imageSrc[child_num];
      div.appendChild(img);
      deleteButton = document.createElement("img");
      deleteButton.id = "delete_button";
      deleteButton.src = "./image/deleteButton.png";
      deleteButton.onclick = function() {
        return parentDiv.removeChild(newChild);
      };
      chbox = document.createElement("div");
      chbox.innerHTML = '<input type="checkbox"name="checkbox">';
      imageName = document.createElement("textarea");
      filename = img.src.replace(/^(.*)\//, '');
      imageName.value = filename;
      imageName.cols = "25";
      imageName.rows = "1";
      saveButton = document.createElement("button");
      saveButton.innerHTML = "save";
      saveButton.onclick = function() {
        filename = imageName.value;
        return chrome.downloads.download({
          url: chrome.extension.getBackgroundPage().imageSrc[child_num],
          filename: filename
        });
      };
      tweetButton = document.createElement("a");
      tweetButton.setAttribute("href", "https://twitter.com/share");
      tweetButton.setAttribute("class", "twitter-share-button");
      tweetButton.setAttribute("data-url", chrome.extension.getBackgroundPage().imageSrc[child_num]);
      tweetButton.setAttribute("data-count", "none");
      tweetButton.innerHTML = "Tweet";
      script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "./tweet.js";
      script.src = "./widgets.js";
      tweetButton.appendChild(script);
      favButton = document.createElement("img");
      favButton.src = "./image/unfav.png";
      favButton.style.height = "20px";
      favButton.onclick = function() {
        var favBox;
        favButton.src = "./image/fav.png";
        if (localStorage.length === 1) {
          fav = [img.src];
          localStorage.setItem("fav", JSON.stringify(fav));
        } else {
          fav = JSON.parse(localStorage.getItem("fav"));
          fav.push(img.src);
          localStorage.setItem("fav", JSON.stringify(fav));
        }
        favBox = document.getElementById("fav_data");
        return favData.push(new FavData(favBox, img.src));
      };
      hrMid = document.createElement("hr");
      hrMid.id = "hr_mid";
      hrEnd = document.createElement("hr");
      hrEnd.id = "hr_end";
      br = document.createElement("br");
      newChild.appendChild(deleteButton);
      newChild.appendChild(div);
      newChild.appendChild(chbox);
      newChild.appendChild(imageName);
      newChild.appendChild(br);
      newChild.appendChild(saveButton);
      newChild.appendChild(hrMid);
      newChild.appendChild(tweetButton);
      newChild.appendChild(favButton);
      newChild.appendChild(hrEnd);
      parentDiv.insertBefore(newChild, refChild);
    }

    return ImageData;

  })();


  /*
  ==================================================
  FavDataクラス
  ==================================================
   */

  FavData = (function() {
    function FavData(refChild, src) {
      var br, chbox, deleteButton, div, filename, hrEnd, hrMid, imageName, img, newChild, parentDiv, saveButton, script, tweetButton;
      parentDiv = refChild.parentNode;
      newChild = document.createElement("div");
      newChild.style.backgroundImage = "linear-gradient(#f0e68c,#ffd700)";
      newChild.style = "display:inline;";
      div = document.createElement("div");
      div.style.width = "160px";
      div.style.height = "160px";
      div.id = "fav_data_left";
      img = document.createElement("img");
      img.id = "fav_data_left";
      img.src = src;
      div.appendChild(img);
      deleteButton = document.createElement("img");
      deleteButton.src = "./image/deleteButton.png";
      deleteButton.id = "delete_button";
      deleteButton.onclick = function() {
        var i, _i, _ref;
        parentDiv.removeChild(newChild);
        fav = [];
        if (document.getElementById("fav").childNodes.length > 3) {
          for (i = _i = 1, _ref = document.getElementById("fav").childNodes.length - 3; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
            fav[i - 1] = document.getElementById("fav").childNodes[i].childNodes[1].childNodes[0].src;
          }
        }
        localStorage.removeItem("fav");
        return localStorage.setItem("fav", JSON.stringify(fav));
      };
      chbox = document.createElement("div");
      chbox.innerHTML = '<input type="checkbox" name="checkbox">';
      imageName = document.createElement("textarea");
      filename = src.replace(/^(.*)\//, '');
      imageName.value = filename;
      imageName.cols = "25";
      imageName.rows = "1";
      saveButton = document.createElement("button");
      saveButton.innerHTML = "save";
      saveButton.onclick = function() {
        filename = imageName.value;
        return chrome.downloads.download({
          url: img.src,
          filename: filename
        });
      };
      tweetButton = document.createElement("a");
      tweetButton.setAttribute("href", "https://twitter.com/share");
      tweetButton.setAttribute("class", "twitter-share-button");
      tweetButton.setAttribute("data-url", img.src);
      tweetButton.setAttribute("data-count", "none");
      tweetButton.innerHTML = "Tweet";
      script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "./tweet.js";
      script.src = "./widgets.js";
      tweetButton.appendChild(script);
      hrMid = document.createElement("hr");
      hrMid.id = "hr_mid";
      hrEnd = document.createElement("hr");
      hrEnd.id = "hr_end";
      br = document.createElement("br");
      newChild.appendChild(deleteButton);
      newChild.appendChild(div);
      newChild.appendChild(chbox);
      newChild.appendChild(imageName);
      newChild.appendChild(br);
      newChild.appendChild(saveButton);
      newChild.appendChild(hrMid);
      newChild.appendChild(tweetButton);
      newChild.appendChild(hrEnd);
      parentDiv.insertBefore(newChild, refChild);
    }

    return FavData;

  })();


  /*
  ==================================================
  zipファイル生成(使用しない)
  ==================================================
   */

  create_zip = function(src) {
    var content, i, zip, _i, _ref;
    zip = new JSZip();
    for (i = _i = 0, _ref = src.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      zip.add(src[i], imgData, {
        base64: true
      });
    }
    content = zip.generate();
    location.href = "data:application/zip;base64," + content;
    return chrome.downloads.download({
      url: "data:application/zip;base64," + content
    });
  };


  /*
  ==================================================
  ページが読み込まれた時の処理
  ==================================================
   */

  window.onload = function() {

    /*
    -----------------
    select all button
    -----------------
     */
    var cancelAllButton, favBox, i, imageBox, saveAllButton, selectAllButton, tab1, tab2, _i, _j, _ref, _ref1;
    selectAllButton = document.getElementById("select_all_button");
    selectAllButton.onclick = function() {
      var i, _i, _j, _ref, _ref1, _results, _results1;
      if (document.getElementById("main").style.display === "block") {
        _results = [];
        for (i = _i = 1, _ref = document.getElementById("main").childNodes.length - 3; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
          _results.push(document.getElementById("main").childNodes[i].childNodes[2].childNodes[0].checked = true);
        }
        return _results;
      } else {
        _results1 = [];
        for (i = _j = 1, _ref1 = document.getElementById("fav").childNodes.length - 3; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 1 <= _ref1 ? ++_j : --_j) {
          _results1.push(document.getElementById("fav").childNodes[i].childNodes[2].childNodes[0].checked = true);
        }
        return _results1;
      }
    };

    /*
    -----------------
    cancel all button
    -----------------
     */
    cancelAllButton = document.getElementById("cancel_all_button");
    cancelAllButton.onclick = function() {
      var i, _i, _j, _ref, _ref1, _results, _results1;
      if (document.getElementById("main").style.display === "block") {
        _results = [];
        for (i = _i = 1, _ref = document.getElementById("main").childNodes.length - 3; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
          _results.push(document.getElementById("main").childNodes[i].childNodes[2].childNodes[0].checked = false);
        }
        return _results;
      } else {
        _results1 = [];
        for (i = _j = 1, _ref1 = document.getElementById("fav").childNodes.length - 3; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 1 <= _ref1 ? ++_j : --_j) {
          _results1.push(document.getElementById("fav").childNodes[i].childNodes[2].childNodes[0].checked = false);
        }
        return _results1;
      }
    };

    /*
    -----------
    save button
    -----------
     */
    saveAllButton = document.getElementById("save_button");
    saveAllButton.onclick = function() {
      var filename, i, xhr, xhr_buffer, zip, zip_buffer, _i, _j, _k, _l, _ref, _ref1, _ref2, _ref3, _results, _results1, _results2, _results3;
      if (document.getElementById("format").value === "default") {
        if (document.getElementById("main").style.display === "block") {
          _results = [];
          for (i = _i = 1, _ref = document.getElementById("main").childNodes.length - 3; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
            if (document.getElementById("main").childNodes[i].childNodes[2].childNodes[0].checked) {
              _results.push(chrome.downloads.download({
                url: document.getElementById("main").childNodes[i].childNodes[1].childNodes[0].src,
                filename: document.getElementById("main").childNodes[i].childNodes[3].value
              }));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        } else {
          _results1 = [];
          for (i = _j = 1, _ref1 = document.getElementById("fav").childNodes.length - 3; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 1 <= _ref1 ? ++_j : --_j) {
            if (document.getElementById("fav").childNodes[i].childNodes[2].childNodes[0].checked) {
              _results1.push(chrome.downloads.download({
                url: document.getElementById("fav").childNodes[i].childNodes[1].childNodes[0].src,
                filename: document.getElementById("fav").childNodes[i].childNodes[3].value
              }));
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        }
      } else {
        if (document.getElementById("main").style.display === "block") {
          zip = new JSZip();
          zip_buffer = 0;
          xhr_buffer = 0;
          filename = [];
          _results2 = [];
          for (i = _k = 1, _ref2 = document.getElementById("main").childNodes.length - 3; 1 <= _ref2 ? _k <= _ref2 : _k >= _ref2; i = 1 <= _ref2 ? ++_k : --_k) {
            if (document.getElementById("main").childNodes[i].childNodes[2].childNodes[0].checked) {
              filename.push(document.getElementById("main").childNodes[i].childNodes[3].value);
              zip_buffer++;
              console.log("zip" + zip_buffer);
              xhr = new XMLHttpRequest();
              xhr.open('GET', document.getElementById("main").childNodes[i].childNodes[1].childNodes[0].src, true);
              xhr.responseType = 'arraybuffer';
              xhr.onload = function(evt) {
                var arraybuffer, blob, objectUrl;
                arraybuffer = this.response;
                zip.file(filename[xhr_buffer], arraybuffer);
                xhr_buffer++;
                console.log("xhr" + xhr_buffer);
                if (zip_buffer === xhr_buffer) {
                  blob = zip.generate({
                    type: "blob"
                  });
                  objectUrl = URL.createObjectURL(blob);
                  return chrome.downloads.download({
                    url: objectUrl,
                    filename: "images.zip"
                  });
                }
              };
              xhr.onerror = function(evt) {};
              _results2.push(xhr.send());
            } else {
              _results2.push(void 0);
            }
          }
          return _results2;
        } else {
          zip = new JSZip();
          zip_buffer = 0;
          xhr_buffer = 0;
          filename = [];
          _results3 = [];
          for (i = _l = 1, _ref3 = document.getElementById("fav").childNodes.length - 3; 1 <= _ref3 ? _l <= _ref3 : _l >= _ref3; i = 1 <= _ref3 ? ++_l : --_l) {
            if (document.getElementById("fav").childNodes[i].childNodes[2].childNodes[0].checked) {
              filename.push(document.getElementById("fav").childNodes[i].childNodes[3].value);
              zip_buffer++;
              xhr = new XMLHttpRequest();
              xhr.open('GET', document.getElementById("fav").childNodes[i].childNodes[1].childNodes[0].src, true);
              xhr.responseType = 'arraybuffer';
              xhr.onload = function(evt) {
                var arraybuffer, blob, objectUrl;
                arraybuffer = this.response;
                zip.file(filename[xhr_buffer], arraybuffer);
                xhr_buffer++;
                if (zip_buffer === xhr_buffer) {
                  blob = zip.generate({
                    type: "blob"
                  });
                  objectUrl = URL.createObjectURL(blob);
                  return chrome.downloads.download({
                    url: objectUrl,
                    filename: "images.zip"
                  });
                }
              };
              xhr.onerror = function(evt) {};
              _results3.push(xhr.send());
            } else {
              _results3.push(void 0);
            }
          }
          return _results3;
        }
      }
    };

    /*
    -------------------
    addButton(追加予定)
    -------------------
     */

    /*
    ---------
    ImageData
    ---------
     */
    imageBox = document.getElementById("image_data");
    for (i = _i = 0, _ref = chrome.extension.getBackgroundPage().imageSrc.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      window.imageData[i] = new ImageData(imageBox, i);
    }

    /*
    ---------
    favData
    ---------
     */
    if (localStorage.length > 1) {
      fav = JSON.parse(localStorage.getItem("fav"));
      favBox = document.getElementById("fav_data");
      if (fav.length > 0) {
        for (i = _j = 0, _ref1 = fav.length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
          favData[i] = new FavData(favBox, fav[i]);
        }
      }
    }

    /*
    ----------
     タブ設定
    ----------
     */
    document.getElementById("main").style.display = "none";
    document.getElementById("fav").style.display = "none";
    document.getElementById("main").style.display = "block";
    tab1 = document.getElementById("tab1");
    tab1.onclick = function() {
      document.getElementById("fav").style.display = "none";
      return document.getElementById("main").style.display = "block";
    };
    tab2 = document.getElementById("tab2");
    return tab2.onclick = function() {
      document.getElementById("main").style.display = "none";
      return document.getElementById("fav").style.display = "block";
    };
  };


  /*
  ==================================================
   */

}).call(this);
