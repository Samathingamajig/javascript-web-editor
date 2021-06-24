let code, editor, inputConsole, inputConsolePart2;
const initializeCode = () => {
	code = document.getElementsByClassName("codemirror-textarea")[0];
	editor = CodeMirror.fromTextArea(code, {
		lineNumbers: true,
		theme: "darcula",
		indentWithTabs: true,
		mode: { name: "javascript" }
	});
	updateIFrame();
};
function consoleInput(e) {
	if (e.keyCode === 13 && document.getElementById("console-input").value.trim() !== "") {
		enterCommand(" " + document.getElementById("console-input").value);
		document.getElementById("console-input").value = "";
	}
}

function updateIFrame() {
	// console.log("updateIFrame");
	let iframe = document.getElementById("console"),
		iframeWin = iframe.contentWindow || iframe,
		iframeDoc = iframe.contentDocument || iframeWin.document;
	iframe.parentNode.removeChild(iframe);
	iframe = document.body.appendChild(document.createElement("iframe"));
	iframe.setAttribute("id", "console");
	iframe.setAttribute("class", "console");
	iframeWin = iframe.contentWindow || iframe;
	iframeDoc = iframe.contentDocument || iframeWin.document;

	iframeDoc.open();
	// Default
	iframeDoc.write("<!DOCTYPE html><html>");
	// clgHTML & Styles
	iframeDoc.write('<head> <style> * {margin: 0; padding: 0;} body {width: 100vw; height: 100vh;} .outputs {min-height: calc(95% - 20px); max-height: calc(95% - 20px); width: calc(100% - 20px); overflow-wrap: break-word; overflow-y: scroll; color: #00a149; padding: 10px} input {background: rgb(36, 36, 36); border: none; border-top: black 2px solid; height: calc(5% - 2px); width: calc(100% - 20px); text-align: left; color: #00a149; padding-left: 10px; padding-right: 10px;}</style> <script>var ConsoleLogHTML=function(e,t,n,o,r,i,l){"use strict";for(var f=0;f<t.length;f++)r!==typeof n[t[f]]&&(e[t[f]]=n[t[f]]);var c=n.skipHtml,a=o.keys(e),s=r!==typeof n.clear&&n.clear,u=typeof jQuery!==r&&jQuery,p=function(){for(var e,t,n={},r=0;r<arguments.length;r++)for(t=o.keys(arguments[r]),e=0;e<t.length;e++)n[t[e]]=arguments[r][t[e]];return n},d=function(t,o,r,i,f,c){n.skipHtml[t]=function(){e[t].apply(n,arguments)},n[t]=function(){var e,a,s,u;for(e="",s=0;s<arguments.length;s++){if(a=arguments[s]+"",a===l)try{a="Object "+JSON.stringify(arguments[s])}catch(e){}e+=(s>0?" ":"")+a}e=(i?"["+(new Date).toLocaleTimeString()+"] ":"")+e,u=document.createElement("li"),u.setAttribute("data-level",t),u.innerText=e,r[t]&&u.setAttribute("class",r[t]),c?o.appendChild(u):o.insertBefore(u,o.firstChild),f&&n.skipHtml[t].apply(n,arguments)}};return{DEFAULTS:{error:"text-danger",warn:"text-warning",info:"text-success",debug:"text-info",log:""},disconnect:function(){n.skipHtml=c;for(var t=0;t<a.length;t++)n[a[t]]=e[a[t]];!1!==s&&(n.clear=s)},connect:function(e,t,o,r,l){if(u&&e instanceof u&&(e=e[0]),typeof r!==i&&(r=!0),typeof o!==i&&(o=!0),!(e instanceof HTMLUListElement))throw new Error("The target must be a HTML <ul> element");t=p(ConsoleLogHTML.DEFAULTS,t||{}),n.skipHtml={};for(var f=0;f<a.length;f++)d(a[f],e,t,o,r,l);!1!==s&&(n.clear=function(){e.innerText="",s.apply(n)})}}}({},["log","debug","info","warn","error"],console,Object,"undefined","boolean","[object Object]");"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=ConsoleLogHTML);</script></head>');
	// Body
	iframeDoc.write("<body><ul class='outputs'></ul> <input id='console-input' onkeydown='consoleInput(event)'></input>");
	// JavaScript
	iframeDoc.write("<script> ConsoleLogHTML.connect(document.getElementsByClassName('outputs')[0], {}, false, true, true); const clear = () => document.getElementsByClassName('outputs')[0].innerHTML = ''; const enterCommand = comm => console.log('< ' + eval('' + comm.replace(/ let | const | var /, 'this.').replace(/;/, '; '), 0)); function consoleInput(e) {if (e.keyCode === 13 && document.getElementById('console-input').value.trim() !== '') {console.log('> ' + document.getElementById('console-input').value); enterCommand(' ' + document.getElementById('console-input').value);document.getElementById('console-input').value = '';}}" + editor.getValue() + " </script>");
	// Close
	iframeDoc.write("</body></html>");
	iframeDoc.close();
}
