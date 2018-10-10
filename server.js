/**
 * Declare
 */
var express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  config = require('./config/config'),
  mongoose =require('mongoose');
  app.set('socketio', io);

//Connect to database
mongoose.connect(config.database, {useMongoClient: true});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
//On connection
mongoose.connection.on('connected',()=>{
	console.log('connected to database ' + config.database)
});
//On error
mongoose.connection.on('error',(err)=>{
	console.log('database error ' + err)
});

//Configure Server 
server.listen(config.port,()=>{
  console.log('Server starting at port '+ config.port);
});

//Configure module
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

process.on('SIGINT', function () {
  ac1.writeSync(0);
  ac1.unexport();

  ac2.writeSync(0);
  ac2.unexport();

  process.exit();
});