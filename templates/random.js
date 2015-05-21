(function(){function random(it
/**/) {
var out='<!doctype html><html><head><title>Door Prizes!</title><link href=\'http://fonts.googleapis.com/css?family=Droid+Serif|Oswald\' rel=\'stylesheet\' type=\'text/css\'><link href="/dist/default.css" rel="stylesheet" type=\'text/css\'></head><body><h1 class="heading">And the winner is:</h1><h2>'+( it.name )+'</h2><script>(function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,\'script\',\'//www.google-analytics.com/analytics.js\',\'ga\');ga(\'create\', \'UA-24267925-3\', \'auto\');ga(\'send\', \'pageview\');</script></body></html>';return out;
}var itself=random, _encodeHTML=(function (doNotSkipEncoded) {
		var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
			matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
		return function(code) {
			return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
		};
	}());if(typeof module!=='undefined' && module.exports) module.exports=itself;else if(typeof define==='function')define(function(){return itself;});else {window.render=window.render||{};window.render['random']=itself;}}());