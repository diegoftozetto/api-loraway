# api-template-nodejs

O intuito deste projeto é apresentar os mecanismos para elaboração de uma API em NodeJS.

## Instalar Recursos

Antes de iniciar a implementação da API é essencial a instalação do NodeJS, MongoDB (Database) e um editor de código (Sugestão: VS Code).

**NodeJS:**

`https://nodejs.org/en/`

**MongoDB:**

`https://www.mongodb.com/try/download/community`

**VS Code:**

`https://code.visualstudio.com/`

Outro recurso que garante agilidade durante o desenvolvimento do projeto é o Nodemon, pois permite a reinicialização do aplicativo conforme as alterações ocorrem.

**Nodemon**
```sh
$ npm install -g nodemon
```

## Instalar Dependências

**Instalar express**
```sh
$ npm install --save express
```
**Instalar mongoose**
```sh
$ npm install --save mongoose
```
**Instalar body-parse**
```sh
$ npm install --save body-parse
```
**Instalar bcryptjs**
```sh
$ npm install --save bcryptjs
```
**Instalar cors**
```sh
$ npm install --save cors
```

## Como Rodar

Para rodar o projeto atual, após a instalação dos recursos e depedências basta seguir os passos abaixo:

1. Criar database com o nome de 'db-template' no MongoDB:
    ```sql
    USE 'db-template';
    ```
2. Na pasta principal do projeto, executar o comando 'nodemon app.js' através do terminal:
    ```bash
    nodemon app.js
    ```

## Sobre a API

Após rodar o projeto, pode-se verificar a documentação da API (Swagger) por meio da URL abaixo:

http://localhost:5000/api-docs/