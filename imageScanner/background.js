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

  chrome.tabs.onActivated.addListener(function(activeInfo) {
    console.log("you changed tabs");
    console.log(activeInfo.tabId);
    return chrome.tabs.getSelected(null, function(tab) {
      return chrome.tabs.sendRequest(activeInfo.tabId, {
        changed: "changed"
      }, function(response) {
        console.log(response);
        return console.log("test");
      });
    });
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


  /*
  ==================================================
  右クリックメニューに追加する処理
  ==================================================
   */

  chrome.contextMenus.create({
    title: "画像を再読み込み",
    onclick: function() {
      return chrome.tabs.reload();
    }
  });

}).call(this);
