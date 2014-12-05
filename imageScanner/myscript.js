(function() {
  var i, img, _i, _ref;

  console.log("I am content script");

  console.log(document.images);

  console.log(document.images.length);

  chrome.runtime.sendMessage({
    refresh: "refreshrequest"
  });

  console.log("Sendrefreshrequest");

  img = [];

  for (i = _i = 0, _ref = document.images.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
    img[i] = document.images[i].src;
  }

  console.log(img);

  chrome.runtime.sendMessage({
    image: img
  });

}).call(this);
