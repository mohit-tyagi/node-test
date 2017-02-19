'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
const asciiConverter = require('./custom-module/ascii-number-converter');
const mathGame = require('./custom-module/math-game');

server.connection({
    host: 'localhost',
    port: 8000
});

server.register(require('inert'), (err) => {
    if (err) {
        throw err;
    }
});

// Directory Handler
server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public'
        }
    }
});

// Add the route
server.route({
    method: 'POST',
    path:'/upload-file',
    config: {
        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        },
        handler: function (request, reply) {
            var data = request.payload;
            if (data.file) {
                asciiConverter(data.file, function(err, result){
                    return reply(JSON.stringify(result));
                });
            }else{
                return reply({msg:'result not found.'});
            }
        }
    }
});

// Route for maths computation
server.route({
    method: 'GET',
    path:'/math-result',
    config: {
        handler: function (request, reply) {
            var lines = mathGame.printMarkoPolo();
            return reply(lines);
        }
    }
});

// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});