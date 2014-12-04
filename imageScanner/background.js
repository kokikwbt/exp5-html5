(function() {
  var myalert;

  console.log(window);

  window.imageSrc = [];

  myalert = function() {
    return alert("read background.js from popup!");
  };

  chrome.extension.onMessage.addListener(function(result) {
    console.log(result);
    return window.imageSrc.push(result);
  });

}).call(this);
