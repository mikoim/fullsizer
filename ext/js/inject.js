chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      var url = null;

      switch (window.location.hostname) {
        case "photohito.com":
          url = document.querySelector("meta[property='og:image']").getAttribute("content");
          url = url.replace("_s", "_o");
          url = url.replace("_m", "_o");
          break;

        case "twitter.com":
          url = document.querySelector("img[alt = '埋め込み画像への固定リンク']").getAttribute("src");
          if (url != null) {
            url += ":orig";
          }
          break;

        case "ganref.jp":
          url = document.querySelector("meta[property='og:image']").getAttribute("content");
          url = url.replace(/thumb[0-9]/, "original");
          break;

        case "photozou.jp":
          url = document.querySelector("img[itemprop = 'image']").getAttribute("src");
          url = url.replace(/_[0-9]+\./, "_org.");
          break;

        case "acafe.msc.sony.jp":
          url = document.querySelector("meta[property='og:image']").getAttribute("content");
          url = decodeURIComponent(url);
          url = url.match(/url=(.+)&mode/)[1];
          break;

        case "www.flickr.com":
          break;
      }

      if (url != null) {
        chrome.runtime.sendMessage({url: url}, function(response){});
      }
    }
  }, 3);
});
