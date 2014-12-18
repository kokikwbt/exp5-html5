(function() {
  var clearimageSrc, parentId, parentId2;

  window.imageSrc = [];

  clearimageSrc = function() {
    return window.imageSrc = [];
  };

  localStorage.setItem("mainArticleflag", "true");


  /*
  ==================================================
  タブ切り替えイベントを取得時の処理
  ==================================================
   */

  chrome.tabs.onActivated.addListener(function(activeInfo) {
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

  chrome.extension.onMessage.addListener(function(result, sender, sendResponse) {
    if (result.refresh === "refreshrequest") {
      clearimageSrc();
      return sendResponse({
        mainArticleflag: localStorage.getItem("mainArticleflag")
      });
    } else if (result.name === "image num") {
      return chrome.browserAction.setBadgeText({
        text: String(result.num)
      });
    } else if (result.name === "delete child") {
      window.imageSrc.splice(result.num, 1);
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

  parentId = chrome.contextMenus.create({
    title: "メニュー"
  });

  chrome.contextMenus.create({
    title: "画像の再読み込み",
    parentId: parentId,
    onclick: function() {
      return chrome.tabs.reload();
    }
  });

  parentId2 = chrome.contextMenus.create({
    title: "画像の取得方法",
    parentId: parentId
  });

  chrome.contextMenus.create({
    title: "ページ内の全て",
    parentId: parentId2,
    onclick: function() {
      return localStorage.setItem("mainArticleflag", "false");
    }
  });

  chrome.contextMenus.create({
    title: "メイン記事のみ",
    parentId: parentId2,
    onclick: function() {
      return localStorage.setItem("mainArticleflag", "true");
    }
  });

  chrome.contextMenus.create({
    title: "不具合報告",
    parentId: parentId,
    onclick: function() {
      return window.open("http://t.co/yWaeawIe5d");
    }
  });

}).call(this);
