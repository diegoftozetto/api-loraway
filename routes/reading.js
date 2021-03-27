const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
require("../models/Reading");
const Reading = mongoose.model("readings");

const validate = require("../control/validate-input-field");

/**
 * @swagger
 * definitions:
 *   Readings:
 *     properties:
 *       deviceId:
 *         type: number
 *       messageId:
 *         type: number
 *       timestamp:
 *         type: number
 *       attributes:
 *         type: object
 */

/**
 * @swagger
 * /readings:
 *   get:
 *     tags:
 *       - Leituras
 *     description: Requisição de lista com todos as leituras.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Um Array com todos as leituras.
 *         schema:
 *           $ref: '#/definitions/Readings'
 *       500:
 *          description: Falha ao processar requisição, erro ao buscar leituras no Database.
 */
router.get('/', (req, res) => {
  Reading.find().sort({ timestamp: 'asc' }).then((readings) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(readings);
  }).catch(() => {
    res.statusCode = 500;
    res.send();
  });
});

/**
 * @swagger
 * /readings/{deviceId}:
 *   get:
 *     tags:
 *       - Leituras
 *     description: Requisição para retornar as leituras de um dispositivo.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: deviceId
 *         description: Identificador do dispositivo.
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Um Array com as leituras.
 *         schema:
 *           $ref: '#/definitions/Readings'
 *       404:
 *          description: Nenhuma leitura encontrada.
 *       500:
 *          description: Falha ao processar requisição, erro ao buscar leituras no Database.
 */
router.get('/:deviceId', (req, res) => {
  Reading.find({deviceId: req.params.deviceId}).then((readings) => {
    if(!readings) {
      res.statusCode = 404;
      res.send();
      return;
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(readings);
  }).catch(() => {
    res.statusCode = 500;
    res.send();
  });
});

/**
 * @swagger
 * /readings:
 *   post:
 *     tags:
 *       - Leituras
 *     description: Requisição para inserir uma leitura.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: readings
 *         description: Leitura a ser criada.
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Readings'
 *     responses:
 *       201:
 *         description: Leitura criada com sucesso.
 *       400:
 *         description: Falha ao processar requisição, parâmetro(s) inválido(s).
 *       500:
 *         description: Falha ao processar requisição, erro ao adicionar leitura no Database.
 */
router.post('/', (req, res) => {
  if (Object.keys(req.body).length === 0 || !validate.Reading(req.body)) {
    res.statusCode = 400;
    res.send();
  } else {
    const { deviceId, messageId, timestamp, attributes } = req.body;

    new Reading({
      deviceId: deviceId,
      messageId: messageId,
      timestamp: timestamp,
      attributes: attributes
    }).save().then(() => {
      res.statusCode = 201;
      res.send();
    }).catch(() => {
      res.statusCode = 500;
      res.send();
    });
  }
});

/**
 * @swagger
 * /readings/{id}:
 *   delete:
 *     tags:
 *       - Leituras
 *     description: Requisição para remover uma leitura.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Identificador da leitura
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Leitura removida com sucesso.
 *       500:
 *         description: Falha ao processar requisição, erro ao remover leitura no Database.
 */
router.delete('/:id', (req, res) => {
  Reading.deleteOne({ _id: req.params.id }).then(() => {
    res.statusCode = 200;
    res.send();
  }).catch(() => {
    res.statusCode = 500;
    res.send();
  });
});

module.exports = router;
