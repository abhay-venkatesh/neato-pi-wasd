/********************* Server Functions *********************/

// Setup the connection to the server
var SerialPort = require("serialport");
var WebSocket = require('ws');

var wss = new WebSocket.Server({ port: 7080 });

wss.on('connection', function connection(ws) {

  console.log('Connected. ');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    var command = message.split(",");
    var lwheeldist = command[0];
    var rwheeldist = command[1];
    var speed = command[2];
    console.log(lwheeldist + " " + rwheeldist + " " + speed);
    drive(lwheeldist, rwheeldist, speed);
  });
});

/********************* Neato Functions *********************/

// Setup the connection to the Neato
var port = new SerialPort("/dev/ttyACM0", {
  baudRate: 115200
});

// Open the port and put the robot into testmode ON so we can drive
port.on('open', function() {
  port.write('testmode on' + '\n', function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log('Neato Ready!');
  });

  //testPath();
});

// open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})

/********************* Private Functions *********************/

// drive the robot from messsages
function drive(LWheelDist, RWheelDist, Speed) {
  console.log('SetMotor LWheelDist ' + LWheelDist +
             ' RWheelDist ' + RWheelDist + ' Speed ' + Speed + '\n')
  port.write('SetMotor LWheelDist ' + LWheelDist +
             ' RWheelDist ' + RWheelDist + ' Speed ' + Speed + '\n');
}
