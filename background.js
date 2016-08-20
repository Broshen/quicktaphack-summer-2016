// Called when the user clicks on the browser action.
//loads the scrip

window.hasbeeninserted = true;

var s = document.createElement('script');
s.src = chrome.extension.getURL('script.js');

(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    s.parentNode.removeChild(s);
};

var link = document.createElement("link");
link.href = chrome.extension.getURL("modal.css");
link.type = "text/css";
link.rel = "stylesheet";
document.getElementsByTagName("head")[0].appendChild(link);

//loads modal html

console.log("Background script");

// $.get(chrome.extension.getURL('/select.html'), function(data) {
//    $($.parseHTML(data)).appendTo('body');
//    console.log("HTML loaded");
// });

