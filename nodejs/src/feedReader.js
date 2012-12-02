var http = require('http');

exports.FeedReader = function(newsFeedFile){
	this.newsFeedFile = newsFeedFile;
	this.content = null;

	this.readFileContent = function(whenRead){
		var self = this;
		var request  = http.request(newsFeedFile, function(res){
			res.setEncoding('utf8');eval
			res.on('data', function(data){
				self.content = eval('a=' + data);
				whenRead();
			});
		});

		request.on('error', function(e) {
  			console.log('problem with request: ' + e.message);
		});

		request.end();
	}

	this.setNews = function(content) {
		this.content = content;
	}

	this.isDifferent = function(oldData) {
		var isDifferent = false;
		if (!areEquals(this.content, oldData)) {
			isDifferent = true;
		}
		return isDifferent;
	}

	function areEquals(firstValue, secondValue) {
		var areEquals = true;
		var firstNews = firstValue.noticias;
		var secondNews = secondValue.noticias;
		var count = secondNews.length;
		var data = ["titulo", "descripcion", "link"];

		for (var i = 0; i < count; i++) {
			for (key in data) {
				value = data[key];
				if (firstNews[i][value] != secondNews[i][value]) {
					areEquals = false;
					break;
				}
			}
		}
		return areEquals;
	}
}