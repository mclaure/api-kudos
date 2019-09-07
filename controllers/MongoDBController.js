'use strict';

const mongodb = require("../config/MongoDBdatabase");
const Kudos = require("./schema/Kudos");
const rmq = require("./RabbitMQController");
const mongoose = require("mongoose");

exports.list_kudos = (req, res, next) => {
    Kudos.find({},{idRemitente:1,nombreRemitente:1,idDestinatario:1,nombreDestinatario:1,tema:1})
        .exec()
        .then(docs => {
            return res.status(200).json({ "kudos": docs });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.add_kudos = (req, res, next) => {               
    const item = new Kudos({
        _id: mongoose.Types.ObjectId(),
        idRemitente: req.body.idRemitente,
        nombreRemitente: req.body.nombreRemitente,
        idDestinatario: req.body.idDestinatario,                
        nombreDestinatario:req.body.nombreDestinatario,
        fecha: req.body.fecha,
        lugar: req.body.lugar,    
        tema: req.body.tema,      
        texto: req.body.texto             
    });

     //create message update
     const id = parseInt(req.body.idRemitente, 10);
    var message =  JSON.stringify({operation: "add", idRemitente: id});

    item.save()
         .then(result => {
                rmq.sendMessage(message);
                res.status(200).json({ kudos:[item] });
          })
         .catch(err => {
            console.log(err);
    });
};

exports.del_kudos = (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    
     //create message update
     var message =  JSON.stringify({operation: "delete", idRemitente: id});
                
    Kudos.deleteOne({idRemitente:id})
        .exec()
        .then(docs => {
            rmq.sendMessage(message);
            res.status(200).json( { deleted:true });
        })
        .catch(err => {
            console.log(err)
        });
};