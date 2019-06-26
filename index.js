const express = require('express');
const server = express();
//const jwt = require('jsonwebtoken');
const route = require('./route');
const morgan = require('morgan');

server.set('port',3000);
server.set('view engine', 'ejs');

server.use(morgan('dev'));
server.use(route);

route.get('*', (req,res)=>{
    res.setHeader('Content-Type', 'text/plain');
    res.writeHead(404,{'Content-Type':'text/plain'});
    res.end('404 NOT FOUND');
});


server.listen(server.get('port'), () => {
    console.log('server on port',server.get('port'));
});
   
    
