# Youtube-Frame-Timer-src-Extension-
Displays a frame timing tool on speedrun.com's verifying page so you don't need to open it in another tab

## How to set it up
For it to work you'll need to install these chrome extensions:
* [Stylish](https://chrome.google.com/webstore/detail/stylish-custom-themes-for/fjnbnpbmkenffdnngjfgmeleoegfcffe)
* [Custom JavaScript for Websites 2](https://chrome.google.com/webstore/detail/custom-javascript-for-web/ddbjnfjiigjmcpcpkmhogomapikjbjdk)

After downloading Stilish, click on the extension -> 3 dots on the top-right corner -> create new style. Copy [this code](https://github.com/RafaeI11/Youtube-Frame-Timer-src-Extension-/blob/main/style.css) and paste it there, then click on specify and select "URLs matching this regexp" and paste `https://www.speedrun.com/[_a-zA-Z0-9]*/run.+` then click on save.

Now for the JavaScript, click on the extension -> New Regexp -> paste `https://www.speedrun.com/[_a-zA-Z0-9]*/run.+` -> add -> paste [this code](https://github.com/RafaeI11/Youtube-Frame-Timer-src-Extension-/blob/main/main.js) and click on the save button at the top-left corner
