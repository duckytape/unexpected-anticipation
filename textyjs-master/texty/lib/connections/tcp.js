define(['net', 'util', 'events'],
function (net, util, events) {

    // Create constructor
    var TCPConnection = function (texty, config) {

        var self = this;
        events.EventEmitter.call(self);

        var config = config || {
            port: 10070
        };

        // Keep track of client connections
        self.clients = {};

        // Listen
        net.createServer(function (socket) {

            socket.name = socket.remoteAddress + ':' + socket.remotePort;
            socket.userData = {}

            // This generates a GUID ID for their session
            socket.userData.sessionId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r&0x3 | 0x8);
                return v.toString(16);
            });

            self.clients[socket.userData.sessionId] = socket;

            // Emit on a new connection
            self.emit('connect', socket.userData, function (res) {
                socket.write(res);
            });

            var dataBuffer = '';

            // Create commands emitter
            socket.on('data', function (data) {
                
                dataBuffer += data.toString();
                
                if (dataBuffer.indexOf('\r') >= 0) {

                    dataBuffer = dataBuffer.replace(/[^\w\s]/gi, '').replace(/(\r\n|\n|\r)/gm, '').trim();

                    self.emit('command', socket.userData, dataBuffer, function (res) {
                        socket.write(res);
                    });

                    dataBuffer = '';
                    
                }

            });

            // Close client connections when they leave
            socket.on('end', function () {
                if (self.clients[socket.userData.sessionId]) {
                    delete self.clients[socket.userData.sessionId];
                    self.emit('disconnect', socket.userData);
                }
            });

        }).listen(config.port);

        console.log('TCP connections module listening on port ' + config.port);

    }

    // Assign to exports
    util.inherits(TCPConnection, events.EventEmitter);

    // Method for sending data back to clients external to this module
    TCPConnection.prototype.sendData = function (sessionId, data) {
        if (this.clients[sessionId]) {
            this.clients[sessionId].write(data);
        }
    }

    // Method for terminating a connection
    TCPConnection.prototype.endConnection = function (sessionId) {
        if (this.clients[sessionId]) {
            this.clients[sessionId].end();
            delete this.clients[sessionId];
        }
    }

    return TCPConnection;

});