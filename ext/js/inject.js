chrome.extension.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            var url = null;

            switch ($(location).attr('hostname')) {
                case "photohito.com":
                    url = $("meta[property='og:image']").attr("content");
                    url = url.replace("_s", "_o");
                    url = url.replace("_m", "_o");
                    break;

                case "twitter.com":
                    url = $("img[alt = '埋め込み画像への固定リンク']").attr("src");
                    if (url != null) {
                        url += ":orig";
                    }
                    break;

                case "ganref.jp":
                    url = $("meta[property='og:image']").attr("content");
                    url = url.replace(/thumb[0-9]/, "original");
                    break;

                case "photozou.jp":
                    url = $("img[itemprop = 'image']").attr("src");
                    url = url.replace(/_[0-9]+\./, "_org.");
                    break;

                case "acafe.msc.sony.jp":
                    url = $("meta[property='og:image']").attr("content");
                    url = decodeURIComponent(url);
                    url = url.match(/url=(.+)&mode/)[1];
                    break;

                case "www.flickr.com":
                    break;
            }

            if (url != null) {
                //window.open(url, '_blank');
                window.prompt('', url);
                //window.open(url,'Download');
            }
            ;
        }
    }, 3);
});
