'use strict'

const app = require('./app')
const config = require('./config')
const database = require('./database');

app.listen(config.port);
console.log(`Servidor corriendo en el puerto: ${config.port}`);

/* codigo para mongodb local
mongoose.connect(config.db,(error, res) =>{
    if(error){ 
        return console.log(`error en la conexion de la base de datos: ${error}`);
    } 
    app.listen(config.port, () => {
        console.log(`Servidor corriendo en el puerto: ${config.port}`);
    });
})*/