# quicktaphack-summer-2016
QuickTapSurvey summer 2016 hackathon project

#QuickLink

Quicklink is a chrome extension that lets the quicktapsurvey support team quickly link help center articles from within freshdesk, saving time and promoting efficiency.

#How to install

Coming soon

#How to use

1.Highlight the text that you want to add a hyperlink to.

2.Press ctrl-Q

3.Choose the support article that you want to link

4.Done!

#How it works

QuickLink uses chrome's tab API to inject a script into freshdesk's webpage. The script binds the shortcut to trigger a modal and send a GET request to the QuickTapSurvey help center search URL with the highlighted text as the query. The data is then parsed and displayed, and when the user clicks on one of the search results, the appropriate hyperlink is formatted and inserted.
