(function() {
  var i, _i, _ref;

  console.log("I am content script");

  console.log(document.images);

  console.log(document.images.length);

  for (i = _i = 0, _ref = document.images.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
    chrome.runtime.sendMessage(document.images[i].src);
  }

}).call(this);
