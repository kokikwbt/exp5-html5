(function() {
  var addImageData;

  addImageData = function(refChild) {
    var deleteButton, hr, newChild, newImg, parentDiv, textArea;
    parentDiv = refChild.parentNode;
    newChild = document.createElement("div");
    newChild.style = "display:inline;";
    newImg = document.createElement("img");
    newImg.id = "image_data_left";
    newImg.style.width = "100px";
    newImg.style.height = "100px";
    newImg.src = "document.images.src";
    deleteButton = document.createElement("img");
    deleteButton.id = "image_data_right";
    deleteButton.style.width = "10px";
    deleteButton.style.height = "10px";
    deleteButton.src = "./deleteButton.png";
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
    var addButton, i, imageData, _i, _results;
    addButton = document.getElementById("add_button");
    addButton.onclick = function() {
      var i, _i, _results;
      _results = [];
      for (i = _i = 0; _i <= 2; i = ++_i) {
        _results.push(addImageData(imageData));
      }
      return _results;
    };
    imageData = document.getElementById("image_data");
    _results = [];
    for (i = _i = 0; _i <= 2; i = ++_i) {
      _results.push(addImageData(imageData));
    }
    return _results;
  };

}).call(this);
