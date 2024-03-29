/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var search = require('./routes/search');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('env','development');
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/contato', routes.adicionaContato);
app.get('/contatos', routes.listaContatos);
app.get('/testSearch', search.index);
app.get('/videos', search.resultList);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port: ' + app.get('port'));
});
