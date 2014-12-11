(function() {
  var clearimageSrc;

  console.log(window);

  window.imageSrc = [];

  clearimageSrc = function() {
    return window.imageSrc = [];
  };


  /*
  ==================================================
  タブ切り替えイベントを取得時の処理
  ==================================================
   */

  chrome.tabs.onSelectionChanged.addListener(function(tabId, selectInfo) {
    return console.log("you changed tabs");
  });


  /*
  ==================================================
  メッセージを取得時の処理
  ==================================================
   */

  chrome.extension.onMessage.addListener(function(result) {
    console.log(result);
    if (result.refresh === "refreshrequest") {
      clearimageSrc();
      console.log(window.imageSrc);
      return console.log("ClearimageSrc");
    } else if (result.name === "image num") {
      return chrome.browserAction.setBadgeText({
        text: String(result.num)
      });
    } else if (result.name === "delete child") {
      window.imageSrc.splice(result.num, 1);
      console.log(window.imageSrc.length);
      chrome.browserAction.setBadgeText({
        text: String(window.imageSrc.length)
      });
      return chrome.runtime.sendMessage({
        name: "refresh after delete"
      });
    } else {
      return window.imageSrc = result.image;
    }
  });

}).call(this);
