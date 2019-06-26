const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');

// para que express procese mis json 

route.use(express.json());


route.get('/', (req,res)=>{    
//res.render('index.ejs',{datos:data});
 res.json({text:'Api Works!!'});
});

route.post('/api/login',(req,res) => {
    const user ={id: 3};
    // con la linea de codigo abajo lo que hacemos es generar un token para el usuario dado
    const token = jwt.sign({user},'my_secret_key');
    res.json({
        token
    });
});


function ensureToken (req, res, next) {
    const bearerHeader = req.headers['Authorization'];
    console.log(bearerHeader);
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
    
 }
 


// ahora vamos a crea a modo de ejemplo una rutala cual se acceda despues de generar nuestro token en otras palabras 
// ruta protegida y en la protegida vamos a pasarle una funcion o middleware que valide nuestro token 
route.get('/api/protected', ensureToken,(req, res) => {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                text : 'protected !!',
                data
            });       
        }
    });
});





module.exports = route; 

