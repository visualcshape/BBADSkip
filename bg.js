/**
 * Created by Vodalok on 2017/2/25.
 */

chrome.webRequest.onBeforeRequest.addListener(function(detail){
    var adRegex = /eventid=ad%\w+/;
    var cancel = (detail.url.match(adRegex) != null);
    if(cancel){
        console.log("Blocking URL:", detail.url);
    }

    return {
        cancel: cancel
    };
}, {urls: ["http://data.bilibili.com/*"]}, ["blocking"]);