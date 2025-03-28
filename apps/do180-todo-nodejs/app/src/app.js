var restify = require('restify');
var controller = require('./controllers/items');
var db = require('./models/db');
var model = require('./models/items');

model.connect(db.params, function(err) {
    if (err) throw err;
});

var server = restify.createServer()
    .pre(restify.plugins.pre.context())
    .use(restify.plugins.queryParser())
    .use(restify.plugins.bodyParser());

controller.context(server, '/todo/api', model);

/*
server.get({ path: '/todo/*', name: 'todo-nodejs' }, restify.plugins.serveStatic({
    'directory': __dirname,
    'default': 'index.html'
}));
*/

server.get({ path: '/*', name: 'todo-nodejs' }, restify.plugins.serveStatic({ 
    directory: __dirname + '/todo',
    default: 'index.html'
}));

var port = process.env.PORT || 30080;
server.listen(port, function (err) {
    if (err)
        console.error(err);
    else
        console.log('App is ready at : ' + port);
});

if (process.env.environment == 'production')
    process.on('uncaughtException', function (err) {
        console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)))
    });
