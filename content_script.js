var thisurl, lasturl, alreadyinserted = false;

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log("incomplete");
  if(changeInfo.status=="complete"){
  	console.log(changeInfo.status);
  	lasturl=thisurl;
    thisurl = tab.url;

    if(thisurl){
    	chrome.tabs.executeScript(tabId, {code: "console.log('this url: "+thisurl.substring(7,thisurl.length)+"');"});
    }
    

    if(lasturl){
    	chrome.tabs.executeScript(tabId, {code: "console.log('last url: "+lasturl.substring(7,lasturl.length)+"');"});
    }

    //alert("thisurl " + thisurl);
    //alert("lasturl " + lasturl);
    console.log("tab has number: "  + /\d/.test(tab.url));
    if(tab.url.includes('http://support.quicktapsurvey.com/helpdesk/tickets/') 
    	&& /\d/.test(tab.url)){

    	alreadyinserted = true;
    	chrome.tabs.executeScript(tabId, {code: "window.hasbeeninserted"}, function(result) {
    		console.log(result);

		    if (!result[0]) {
		        
		       chrome.tabs.executeScript(tabId, {file: "jquery.js"}, function(result){console.log(result[0])});

		       chrome.tabs.executeScript(tabId, {file: "background.js"}, function(result){console.log(result[0])});
		    }
		    else{
		    	console.log(result);
		    	console.log(result[0]);
		    }
		});      
    }

    if(alreadyinserted != undefined){
    	chrome.tabs.executeScript(tabId, {code: "console.log('inserted? "+ alreadyinserted+"');"});
    }

  }
}); 



