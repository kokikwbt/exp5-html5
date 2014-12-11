(function() {
  var getImgSrc, img;

  console.log(document.images);

  console.log(document.images.length);

  chrome.runtime.sendMessage({
    refresh: "refreshrequest"
  });

  chrome.runtime.sendMessage({
    name: "image num",
    num: document.images.length
  });

  img = [];

  getImgSrc = function() {
    var i, _i, _ref;
    for (i = _i = 0, _ref = document.images.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      img[i] = document.images[i].src;
    }
    console.log(img);
    return chrome.runtime.sendMessage({
      image: img
    });
  };

  getImgSrc();

}).call(this);
