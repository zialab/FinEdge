const express = require('express');
const server = express();
server.use('/', express.static(__dirname + '/dist'));
server.listen(process.env.PORT || 8080);

server.get('/*', function(req, res){
  res.sendFile(path.join(__dirname+'/dist/index.html'));
})

console.log('console listening!');
