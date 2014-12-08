(function() {
  var clearimageSrc;

  console.log(window);

  window.imageSrc = [];

  clearimageSrc = function() {
    return window.imageSrc = [];
  };

  chrome.extension.onMessage.addListener(function(result) {
    console.log(result);
    if (result.refresh === "refreshrequest") {
      clearimageSrc();
      console.log(window.imageSrc);
      return console.log("ClearimageSrc");
    } else {
      window.imageSrc = result.image;
      return console.log(window.imageSrc);
    }
  });

}).call(this);
