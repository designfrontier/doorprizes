(function(){function main(it
/**/) {
var out='<!doctype html><html><head><title</head><body><h1>Eventbrite Doorprize Picker!</h1><p>We need a couple of things from you to get started. Your oauth token and the eventid (you need to be the owner of the event) and then we will generate random people for you!</p><form><label>oauth token: <input id="token" type="text" name="token"></label><label>eventid: <input id="event" type="text" name="event"></label><button type="submit" id="submit"> Get some randoms!</button></form><script src="/dist/main.js"></script></body></html>';return out;
}var itself=main, _encodeHTML=(function (doNotSkipEncoded) {
		var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
			matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
		return function(code) {
			return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
		};
	}());if(typeof module!=='undefined' && module.exports) module.exports=itself;else if(typeof define==='function')define(function(){return itself;});else {window.render=window.render||{};window.render['main']=itself;}}());