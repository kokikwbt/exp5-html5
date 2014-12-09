(function() {
  var ImageData, imageData;

  imageData = [];

  ImageData = (function() {
    function ImageData(refChild, i) {
      var br, child_num, deleteButton, hr, imageName, img, newChild, parentDiv, saveButton;
      parentDiv = refChild.parentNode;
      newChild = document.createElement("div");
      newChild.style = "display:inline;";
      child_num = i;
      img = document.createElement("img");
      img.id = "image_data_left";
      img.src = chrome.extension.getBackgroundPage().imageSrc[child_num];
      deleteButton = document.createElement("img");
      deleteButton.id = "delete_button";
      deleteButton.src = "./image/deleteButton.png";
      deleteButton.onclick = function() {
        return parentDiv.removeChild(newChild);
      };
      imageName = document.createElement("textarea");
      imageName.id = "hr";
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
      hr = document.createElement("hr");
      hr.id = "hr";
      br = document.createElement("br");
      newChild.appendChild(deleteButton);
      newChild.appendChild(img);
      newChild.appendChild(imageName);
      newChild.appendChild(document.createElement("hr"));
      newChild.appendChild(saveButton);
      newChild.appendChild(hr);
      parentDiv.insertBefore(newChild, refChild);
    }

    ImageData.prototype["delete"] = function() {
      return this.parentDiv.removeChild(this.newChild);
    };

    return ImageData;

  })();


  /*
   <a href="https://twitter.com/share" class="twitter-share-button" data-via="imageScanner" data-size="large" data-count="none">Tweet</a>
  <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
   */


  /*
  chrome.extension.onMessage.addListener(
      (result) ->
          if result.name == "refresh after delete"
              imageData = splice(imageData.length)
              imageBox = document.getElementById "image_data"
              imageData[i] = new ImageData(imageBox, i) for i in [0..chrome.extension.getBackgroundPage().imageSrc.length]
  )
   */

  window.onload = function() {
    var addButton, cancelAllButton, i, imageBox, saveAllButton, selectAllButton, _i, _ref, _results;
    selectAllButton = document.getElementById("select_all_button");
    selectAllButton.onclick = function() {
      return console.log("pushed select all button");
    };
    cancelAllButton = document.getElementById("cancel_all_button");
    cancelAllButton.onclick = function() {
      return console.log("pushed cancel all button");
    };
    saveAllButton = document.getElementById("save_button");
    saveAllButton.onclick = function() {
      return console.log("pushed save all button");
    };
    addButton = document.getElementById("add_button");
    addButton.onclick = function() {
      var i, _i, _results;
      _results = [];
      for (i = _i = 0; _i <= 2; i = ++_i) {
        _results.push(addImageData(imageData));
      }
      return _results;
    };
    imageBox = document.getElementById("image_data");
    _results = [];
    for (i = _i = 0, _ref = chrome.extension.getBackgroundPage().imageSrc.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      _results.push(imageData[i] = new ImageData(imageBox, i));
    }
    return _results;
  };


  /*
  ========================================================
   */

}).call(this);
