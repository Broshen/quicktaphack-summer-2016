var test1="background.js";

var link = document.createElement("link");
link.href = chrome.extension.getURL("modal.css");
link.type = "text/css";
link.rel = "stylesheet";
document.getElementsByTagName("head")[0].appendChild(link);

//loads modal html

console.log("Background script");
console.log(document.getElementsByClassName("center"));


var test2 = "Script.js";
console.log("it works");
var bodyElement = document.body;
bodyElement.innerHTML =  '<div id=test></div> <!-- The Modal --><div id="myModal" class="modal">  <div id="myModalContent">    <h3>Your selection</h3>    <textarea class="extension-search-bar" id="extension-selection" rows="1"></textarea>    <h3>Search for</h3>    <textarea class="extension-search-bar" id="extension-search" rows="1"></textarea>    <h3>Results:    </h3>    <div id="extension-search-results"></div>  </div></div>' + bodyElement.innerHTML;

// Get the modal and hide it initially
var modal = document.getElementById('myModal');
modal.style.display = "none";
var modalcontent = document.getElementById('myModalContent');
var qtsSelection = document.getElementById("extension-selection");
var qtsSearch = document.getElementById("extension-search");
var qtsResults = document.getElementById("extension-search-results");
var selectedText, xhttp, resultmodel;
var linksArr = [];
var textsArr = [];
var isCtrl = false;

// function to toggle the modal
function togglemodal (){
	//if the modal is showing, hide it
	if(modal.style.display == "block"){
		modal.style.display = "none";
	}
	//otherwise, show it
	else{
		modal.style.display = "block";
	}
}

function replaceSelectionWithHtml(html) {
    var range;
    if (window.getSelection && window.getSelection().getRangeAt) {
        range = window.getSelection().getRangeAt(0);
        range.deleteContents();
        var div = document.createElement("div");
        div.innerHTML = html;
        var frag = document.createDocumentFragment(), child;
        while ( (child = div.firstChild) ) {
            frag.appendChild(child);
        }
        range.insertNode(frag);
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.pasteHTML(html);
    }
}

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function insertLink(i){
	var linkToInsert = linksArr[i];
	// var editorHTML = document.getElementsByClassName("redactor_editor")[0];

	// editorHTML.innerHTML = editorHTML.innerHTML.replace(new RegExp(selectedText,"g"), "<b><a href=" + linkToInsert + " target>" + selectedText+"</a></b>");

	togglemodal();
}

function displayHelpResults(){
	var parser = new DOMParser();
	resultmodel = parser.parseFromString(xhttp.responseText,"text/html");
	var articlesArr = resultmodel.getElementsByClassName("article-item");
	var stringtoRender="";
	for(var i = 0; i<articlesArr.length; i++){
		linksArr[i]="http://support.quicktapsurvey.com"+articlesArr[i].getElementsByTagName('a')[0].getAttribute("href"); 
		textsArr[i]=articlesArr[i].getElementsByTagName('a')[0].innerText +"<br>"+ articlesArr[i].getElementsByTagName('div')[0].innerText + "<br>" + articlesArr[i].getElementsByTagName('p')[0].innerText;

		stringtoRender += "<div class='qtsSearchResults' onclick='insertLink(" + i + ")'>" + textsArr[i] + "</a></div> <br>";
	}

	qtsResults.innerHTML = stringtoRender;
}

document.onkeyup=function(e) {
    if(e.which == 17) isCtrl=false;

}

document.onkeydown=function(e){
    if(e.which == 17) isCtrl=true;

    if(e.which == 81 && isCtrl == true) {
        togglemodal();

        selectedText = getSelectionText().trim();
		qtsSelection.innerText = selectedText;
		qtsSearch.innerText = selectedText;

		xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
		    if (xhttp.status == 200) {
		    	displayHelpResults();
		  };
		}

		xhttp.open("GET", "http://support.quicktapsurvey.com/support/search/solutions?term=" + encodeURI(selectedText), true);
		xhttp.send();

        console.log("triggered");
        return false;
    }

    if(e.which == 27){
    	modal.style.display = "none";
    }
}

document.onclick=function(e){
	//if the user clicks outside of the modal, or on 
	if(modal && !modalcontent.contains(e.target)){
		modal.style.display = "none";
	}
}


