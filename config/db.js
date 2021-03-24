if(process.env.NODE_ENV == "production"){
    module.exports = {mongoURI: "mongodb+srv://admin:admin@cluster0.3ostd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"}
}
else{
    module.exports = {mongoURI: "mongodb://localhost/db-loraway"}
}
