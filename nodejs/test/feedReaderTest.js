var FeedReader = require('../src/feedReader.js').FeedReader;

describe("A sample", function() {
  it("should work", function() {
    expect(true).toBe(true);
  });
});

var jsonFile = {
  hostname: 'localhost',
  port: 80,
  path: '/nodejs/test/ownFeed.json',
  method: 'GET'
};

describe('When a news feed gets updated with a new new', function() {
  it ('should take the new information', function() {
    var internalFeed = {
	  noticias: [
	    {
	      titulo: 'Noticia uno',
	      description: 'descripcion',
	      link: 'http://google.com'
	    },
	    {
	      titulo: 'Noticia dos',
	      description: 'descripcion',
	      link: 'http://google.com'
	    },
	    {
	      titulo: 'Noticia tres',
	      description: 'descripcion',
	      link: 'http://google.com'
	    }
	  ]
	};

	var newNew = {
      titulo: 'Noticia nueva',
      description: 'descripcion',
      link: 'http://google.com'
    };

    var reader = new FeedReader(jsonFile);
    reader.addNew(internalFeed);

    expect(internalFeed).toContain(newNew);
  });
});

describe('When a news feed file gets readed', function() {
  it ('should contain the news', function(done) {
	var reader = new FeedReader(jsonFile);
	reader.readFileContent(function(){
	    var readedFile = reader.content;

	    ownFeed = {
	      noticias: [
		    {
		      titulo: 'Noticia nueva',
		      description: 'descripcion',
		      link: 'http://google.com'
		    },
		    {
		      titulo: 'Noticia uno',
		      description: 'descripcion',
		      link: 'http://google.com'
		    },
		    {
		      titulo: 'Noticia dos',
		      description: 'descripcion',
		      link: 'http://google.com'
		    }
          ]
        };
		expect(readedFile).toEqual(ownFeed);
		done();
	});
  });
});

describe('When the new list is given', function() {

	var reader = new FeedReader();
	reader.setNews({ noticias: [
			    	{
			      	  titulo: 'Noticia uno',
				      description: 'descripcion',
				      link: 'http://google.com'
				    },
				    {
				      titulo: 'Noticia dos',
				      description: 'descripcion',
				      link: 'http://google.com'
				    },
				    {
				      titulo: 'Noticia tres',
				      description: 'descripcion',
				      link: 'http://google.com'
				    }
				  ]
				});

	it('should tell us is the same, when it is', function(done) {

		var dif = reader.isDifferent({
			noticias: [
			    	{
			      	  titulo: 'Noticia uno',
				      description: 'descripcion',
				      link: 'http://google.com'
				    },
				    {
				      titulo: 'Noticia dos',
				      description: 'descripcion',
				      link: 'http://google.com'
				    },
				    {
				      titulo: 'Noticia tres',
				      description: 'descripcion',
				      link: 'http://google.com'
				    }
				  ]
				});

		expect(dif).toBe(false);
		done();
	});

	it('should tell us is different, when it is', function(done) {

		var dif = reader.isDifferent({
			noticias: [
			    	{
			          titulo: 'Noticia 1',
				      description: 'descripcion',
				      link: 'http://google.com'
				    },
				    {
				      titulo: 'Noticia 2',
				      description: 'descripcion',
				      link: 'http://google.com'
				    },
				    {
				      titulo: 'Noticia 3',
				      description: 'descripcion',
				      link: 'http://google.com'
				    }
				  ]
				});

		expect(dif).toBe(true);
		done();
	})
});