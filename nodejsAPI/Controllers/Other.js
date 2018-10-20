'use strict'

//Controllers
const logCtrl = require('./Log');

/**
 * Un usuario envia una notificacion al conserje de que un tercero va a entrar
 * @param {String} idUser id del usuario
 * @param {String} other informacion sobre el tercero invitado
 */
function postOther(req, res) {
    var idUser = req.body.idUser;
    var other = req.body.other;
    console.log("Route: /Other/ [POST] send notification");
    //LLamar funcion enviar notificacion
    res.status(200).json({
        message: "send notification succeed",
        other : other
    });
    logCtrl.logOther(idUser, other); /* CAMBIAR FUNCION*/
    // logCtrl.createLog("No third", "Se autoriza la entrada a un servicio", idUser, "...")
}

module.exports = {
    postOther
}
