// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  var context = "selection";
  var title = "Перевести";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "context" + context});  
});

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);

// The onClicked callback function.
function onClickHandler(info, tab) {
	var sText = info.selectionText;
	var url = "https://translate.google.ru/translate_a/t?client=x&text="
		+ encodeURIComponent(sText) + "&sl=en&tl=ru"
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.onreadystatechange = function()
	{
	    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
	    {
	        var resp = JSON.parse(xhr.responseText);
	        alert(resp.sentences[0].trans)
	    }
	};
	xhr.send();
};