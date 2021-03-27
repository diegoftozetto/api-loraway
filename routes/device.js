const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
require("../models/Reading");
const Reading = mongoose.model("readings");

/**
 * @swagger
 * /devices:
 *   get:
 *     tags:
 *       - Dispositivos
 *     description: Requisição de lista com todos os Ids dos dispositivos que enviaram leitura.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Um Array com todos os Ids dos dispositivos que enviaram leitura.
 *       500:
 *          description: Falha ao processar requisição, erro ao buscar Ids dos dispositivos.
 */
router.get('/', (req, res) => {
  Reading.find().sort({ deviceId: 'asc' }).then((readings) => {
    var deviceIds = [];
    readings.forEach(element => {
      if(!deviceIds.find(id => id === element.deviceId)) {
        deviceIds.push(element.deviceId);
      }
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({deviceIds});
  }).catch(() => {
    res.statusCode = 500;
    res.send();
  });
});

module.exports = router;
