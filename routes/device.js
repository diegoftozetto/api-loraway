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
    var deviceIds = [...new Set(readings.map(el => el.deviceId))];
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({deviceIds});
  }).catch(() => {
    res.statusCode = 500;
    res.send();
  });
});

/**
 * @swagger
 * /devices/{deviceId}/readings:
 *   delete:
 *     tags:
 *       - Dispositivos
 *     description: Requisição para remover todas as leituras de um dispositivo.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: deviceId
 *         description: Identificador do dispositivo
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Todas as leituras removidas com sucesso.
 *       500:
 *         description: Falha ao processar requisição, erro ao remover leituras no Database.
 */
 router.delete('/:deviceId/readings', (req, res) => {
  Reading.deleteMany({ deviceId: req.params.deviceId }).then(() => {
    res.statusCode = 200;
    res.send();
  }).catch(() => {
    res.statusCode = 500;
    res.send();
  });
});

module.exports = router;
