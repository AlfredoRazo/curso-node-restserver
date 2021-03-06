const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        // Conectar a BD
        this.conectarDB();
        // Middlewares
        this.middlewares();
        //Rutas de mi aplicación
        this.routes();
    }

    middlewares() {
        //CORS
        this.app.use(cors());
        // Parse y lectura body
        this.app.use(express.json());
        //Directorio Publico
        this.app.use(express.static('public'));
    }

    async conectarDB(){
        await dbConnection();
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(this.port);
        });
    }

}
module.exports = Server;