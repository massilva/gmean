var Youtube = require("youtube-api")
  , Http = require("http")
  , Request = require("request")
  , path = require("path")
  ;

var oauth = Youtube.authenticate({
    type: "key"
  , key: "AIzaSyAmz13xpZkwC15OzGBsDY32wc66h6jfFlM"
});
	
var conexoes = 0;
var videos = {};

exports.index = function(req, res){
	conexoes++;
	console.log(conexoes);
	var q = "Emicida";
	Youtube.search.list({part: 'id, snippet',q: q, maxResults: 10}, function(error, result) {
		if (error) {
			console.log(error);
			res.render('error', { title: 'Testando busca ERROR'});
		}else {
			videos = result;
			res.render('search', { q: q, title: 'Testando busca', videos : videos.items });
		}
	});
};

exports.resultList = function(req, res) {
	res.json({ videos : videos }); 
}