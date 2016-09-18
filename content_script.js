chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

  /*
  IMPORTANT - for demo purposes, the script is injected into every page that loads. 
  In production, this needs to be changed so that chrome.tabs checks if the URL is correct before injecting it.

  Another issue is that some pages may send multiple changeInfo.status=="complete". 
  This is because the page may load multiple resources seperatly (i.e. favicon, aws resources, and I suspect also CDN resources).
  Each resource loaded will send a changeInfo.status=="complete",
  which means that the script needs to detect the correct one to inject the script into.

  Injecting the script into the wrong one can sometimes block the rest of the page from loading - this is true for freshdesk.
  I don't even know why, or how...
  */
  if(changeInfo.status=="complete"){
		       chrome.tabs.executeScript(tabId, {file: "background.js"}, function(result){console.log(result[0])});
  }
}); 



