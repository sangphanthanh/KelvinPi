/**
 * Declare
 */
var express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  config = require('./config/config'),
  mongoose = require('mongoose');

const devices = require('./routes/devices');
const Gpio = require('onoff').Gpio;
var ac1 = new Gpio(4, 'out');
var ac2 = new Gpio(17, 'out');
var ac3 = new Gpio(27, 'out');
//Connect to database
mongoose.connect(config.database, {
  useMongoClient: true
});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
//On connection
mongoose.connection.on('connected', () => {
  console.log('connected to database ' + config.database)
});
//On error
mongoose.connection.on('error', (err) => {
  console.log('database error ' + err)
});

//Configure Server 
server.listen(config.port, () => {
  console.log('Server starting at port ' + config.port);
});

//Configure module
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

// app.set('socketio', io);

//Open connection socket
io.sockets.on('connection', function (socket) { // WebSocket Connection
  //Param
  var p1Value = 0; //static variable for current status
  var p2Value = 0; //static variable for current status

  socket.on('pump1', function (data) { //get light switch status from client
    p1Value = data;
    console.log('PUMP1: ' + p1Value);
    if (p1Value != ac1.readSync()) {
      ac1.writeSync(p1Value);
      devices.pumpStatus('pump1',p1Value);
      //   console.log(lightvalue); //turn LED on or off, for now we will just show it in console.log
    }
  });

  socket.on('pump2', function (data) { //get light switch status from client
    p2Value = data;
    console.log('PUMP2: ' + p2Value);
    if (p2Value != ac2.readSync()) {
      ac2.writeSync(p2Value);
      devices.pumpStatus('pump2',p2Value);
      //   console.log(lightvalue); //turn LED on or off, for now we will just show it in console.log
    }
  });
});

process.on('SIGINT', function () {
  ac1.writeSync(1);
  ac1.unexport();

  ac2.writeSync(1);
  ac2.unexport();

  process.exit();
});