/**
 * Module dependencies.
 */
require('babel-polyfill');
import app from '../app';
var debug = require('debug')('multi_ak:server');
var http = require('http');
import appConfig from '../config/app.config';
var port = normalizePort(appConfig.port);
var log4js = require('log4js');
try {
  require('fs').mkdirSync('./server/logs');
} catch (e) {
  if (e.code != 'EEXIST') {
    console.error("Could not set up log directory, error was: ", e);
    process.exit(1);
  }
}

/**
 * Get port from environment and store in Express.
 */
app.set('port', port);
log4js.configure('./server/config/log4js.json');

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

console.log('~~~~~~~~ port ' + port + ' ~~~~~~~')

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a string, number, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
