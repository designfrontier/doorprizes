(function(){function random(it
/**/) {
var out='<!doctype html><html><head><title>Door Prizes!</title><link href=\'http://fonts.googleapis.com/css?family=Droid+Serif|Oswald\' rel=\'stylesheet\' type=\'text/css\'><link href="/dist/default.css" rel="stylesheet" type=\'text/css\'></head><body><h1 class="heading">And the winner is:</h1><h2>'+( it.name )+'</h2></body></html>';return out;
}var itself=random, _encodeHTML=(function (doNotSkipEncoded) {
		var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
			matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
		return function(code) {
			return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
		};
	}());if(typeof module!=='undefined' && module.exports) module.exports=itself;else if(typeof define==='function')define(function(){return itself;});else {window.render=window.render||{};window.render['random']=itself;}}());