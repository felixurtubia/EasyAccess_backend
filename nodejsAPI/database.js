var MongoClient = require('mongodb').MongoClient;
const config = require('./config')
var db;

MongoClient.connect(config.dbCloud, function(err, client) {
  db = client.db("EasyAccess").collection("EasyAccess")
   //client.close();
});

function Listar(){
  db.find().toArray(function(err, results) {
    console.log(results)
    });
}

//debe recibir un json
/* ejemplo
{
	"nombre" : "alguien",
	"apellido" : "quizas",
	"rut" : "12.2.2.2.2",
	"fotos": ["c/fotoex","d/gota"]
}
*/
function Insertar(usuario){
  db.save(usuario, (error, resultado) => {
    if(error) console.log("ERROR: no se pudo guardar en la base de dato");
    console.log("Usuario guardado exitosamente");
    console.log(usuario);
  })
}

module.exports = {
  Insertar,
  Listar,
}