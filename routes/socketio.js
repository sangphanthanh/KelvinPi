module.exports.foo = function(req,res){
    // now use socket.io in your routes file
    var io = req.app.get('socketio');

    //Configure GPIO PIN
    const Gpio = require('onoff').Gpio;
    ac1 = new Gpio(4, 'out');
    ac2 = new Gpio(17, 'out');
    ac3 = new Gpio(27, 'out');

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
                //   console.log(lightvalue); //turn LED on or off, for now we will just show it in console.log
            }
        });

        socket.on('pump2', function (data) { //get light switch status from client
            p2Value = data;
            console.log('PUMP2: ' + p2Value);
            if (p2Value != ac2.readSync()) {
                ac2.writeSync(p2Value);
                //   console.log(lightvalue); //turn LED on or off, for now we will just show it in console.log
            }
        });
    });
}