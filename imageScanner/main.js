(function() {
  var ImageData, addImageData;

  ImageData = (function() {
    function ImageData(refChild, i) {
      var deleteButton, hr, imageName, img, newChild, parentDiv;
      parentDiv = refChild.parentNode;
      newChild = document.createElement("div");
      newChild.style = "display:inline;";
      img = document.createElement("img");
      img.id = "image_data_left";
      img.src = chrome.extension.getBackgroundPage().imageSrc[i];
      deleteButton = document.createElement("img");
      deleteButton.id = "delete_button";
      deleteButton.src = "./image/deleteButton.png";
      deleteButton.onclick = function() {
        parentDiv.removeChild(newChild);
        return console.log("delete button was pushed");
      };
      imageName = document.createElement("textarea");
      imageName.id = "hr";
      imageName.value = 'sample.png';
      imageName.cols = "25";
      imageName.rows = "1";
      hr = document.createElement("hr");
      hr.id = "hr";
      newChild.appendChild(img);
      newChild.appendChild(deleteButton);
      newChild.appendChild(imageName);
      newChild.appendChild(hr);
      parentDiv.insertBefore(newChild, refChild);
    }

    ImageData.prototype["delete"] = function() {
      return this.parentDiv.removeChild(this.newChild);
    };

    return ImageData;

  })();

  addImageData = function(refChild, i) {
    var deleteButton, hr, newChild, newImg, parentDiv, textArea;
    parentDiv = refChild.parentNode;
    newChild = document.createElement("div");
    newChild.style = "display:inline;";
    newImg = document.createElement("img");
    newImg.id = "image_data";
    newImg.src = chrome.extension.getBackgroundPage().imageSrc[i];
    deleteButton = document.createElement("img");
    deleteButton.id = "delete_button";
    deleteButton.src = "./image/deleteButton.png";
    deleteButton.onclick = function() {};
    textArea = document.createElement("textarea");
    textArea.id = "hr";
    textArea.value = 'sample.png';
    textArea.cols = "25";
    textArea.rows = "1";
    hr = document.createElement("hr");
    hr.id = "hr";
    newChild.appendChild(newImg);
    newChild.appendChild(deleteButton);
    newChild.appendChild(textArea);
    newChild.appendChild(hr);
    return parentDiv.insertBefore(newChild, refChild);
  };

  window.onload = function() {
    var addButton, i, imageBox, imageData, _i, _ref, _results;
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
    imageData = [];
    _results = [];
    for (i = _i = 0, _ref = chrome.extension.getBackgroundPage().imageSrc.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      _results.push(imageData[i] = new ImageData(imageBox, i));
    }
    return _results;
  };

}).call(this);
