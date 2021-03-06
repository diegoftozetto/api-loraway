////////////////////////////////////////////////////////////
// Carregando Módulos                                     //
////////////////////////////////////////////////////////////

//Dependências
const express = require("express");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");
const cors = require('cors');

//Rotas
const reading = require("./routes/reading");
const device = require("./routes/device");
const api_docs = require("./routes/api-docs");

//app
const app = express();

//Config. Database
const db = require("./config/db");

//TLS Reject
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
////////////////////////////////////////////////////////////
// Configurações                                          //
////////////////////////////////////////////////////////////
//Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(db.mongoURI).then(() => {
    console.log("Conectado ao mongoDB...");
}).catch((error) => {
    console.log("Erro ao conectar com o mongoDB: " + error);
});

//Body Parse
app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());

app.use(cors());
////////////////////////////////////////////////////////////
// Rotas                                                  //
////////////////////////////////////////////////////////////
app.use("/readings", reading);
app.use("/devices", device);
app.use("/api-docs", api_docs);

/**
 * @swagger
 * /ok:
 *   get:
 *     tags:
 *       - Verificação
 *     description: Requisição de verificação.
 *     responses:
 *       200:
 *         description: Ok.
 */
app.get('/ok', (req, res) => {
  res.status(200).send();
});

////////////////////////////////////////////////////////////
// Outros                                                 //
////////////////////////////////////////////////////////////
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Servidor Rodando...");
});
