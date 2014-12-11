
/*
==================================================
 */

(function() {
  var ImageData;

  window.imageData = [];


  /*
  ==================================================
  ImageDataクラス．popup.htmlに表示する要素を動的に
  生成する．
  ==================================================
   */

  ImageData = (function() {
    function ImageData(refChild, i) {
      var br, chbox, child_num, deleteButton, div, hrEnd, hrMid, imageName, img, newChild, parentDiv, saveButton, script, tweetButton;
      parentDiv = refChild.parentNode;
      newChild = document.createElement("div");
      newChild.id = "box";
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
      imageName.value = 'sample.png';
      imageName.cols = "25";
      imageName.rows = "1";
      saveButton = document.createElement("button");
      saveButton.innerHTML = "save";
      saveButton.onclick = function() {
        var filename;
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
      tweetButton.setAttribute("data-via", "_k5x");
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

    ImageData.prototype.check = function() {
      return this.chbox.checked = true;
    };

    return ImageData;

  })();


  /*
  chrome.extension.onMessage.addListener(
      (result) ->
          if result.name == "refresh after delete"
              imageData = splice(imageData.length)
              imageBox = document.getElementById "image_data"
              imageData[i] = new ImageData(imageBox, i) for i in [0..chrome.extension.getBackgroundPage().imageSrc.length]
  )
   */


  /*
  ==================================================
  ページが読み込まれた時の処理
  ==================================================
   */

  window.onload = function() {
    var addButton, cancelAllButton, i, imageBox, saveAllButton, selectAllButton, _i, _ref, _results;
    selectAllButton = document.getElementById("select_all_button");
    selectAllButton.onclick = function() {
      var i, _i, _ref, _results;
      console.log("pushed select all button");
      _results = [];
      for (i = _i = 1, _ref = document.body.childNodes[5].childNodes.length - 3; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
        _results.push(document.body.childNodes[5].childNodes[i].childNodes[2].childNodes[0].checked = true);
      }
      return _results;
    };
    cancelAllButton = document.getElementById("cancel_all_button");
    cancelAllButton.onclick = function() {
      var i, _i, _ref, _results;
      console.log("pushed cancel all button");
      _results = [];
      for (i = _i = 1, _ref = document.body.childNodes[5].childNodes.length - 3; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
        _results.push(document.body.childNodes[5].childNodes[i].childNodes[2].childNodes[0].checked = false);
      }
      return _results;
    };
    saveAllButton = document.getElementById("save_button");
    saveAllButton.onclick = function() {
      var i, _i, _ref, _results;
      console.log("pushed save all button");
      _results = [];
      for (i = _i = 1, _ref = document.body.childNodes[5].childNodes.length - 3; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
        if (document.body.childNodes[5].childNodes[i].childNodes[2].childNodes[0].checked) {
          _results.push(chrome.downloads.download({
            url: chrome.extension.getBackgroundPage().imageSrc[i - 1],
            filename: document.body.childNodes[5].childNodes[i].childNodes[3].value
          }));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    addButton = document.getElementById("add_button");
    imageBox = document.getElementById("image_data");
    _results = [];
    for (i = _i = 0, _ref = chrome.extension.getBackgroundPage().imageSrc.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      _results.push(window.imageData[i] = new ImageData(imageBox, i));
    }
    return _results;
  };


  /*
  ==================================================
   */

}).call(this);
