var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
var cors = require('cors');
const { realizarQuery } = require('./modulos/mysql');

var app = express(); //Inicializo express
var port = process.env.PORT || 4000; //Ejecuto el servidor en el puerto 4000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

//Pongo el servidor a escuchar
app.listen(port, function(){
    console.log(`Server running in http://localhost:${port}`);
});

app.get('/', function(req, res){
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});

/**
 * req = request. en este objeto voy a tener todo lo que reciba del cliente
 * res = response. Voy a responderle al cliente
*/ 
app.post('/Usuarios', async function(req,res) {
    console.log(req.body)
    let UsuarioExistente = await realizarQuery(`SELECT id_usuario FROM Usuarios WHERE id_usuario ="${req.body.Usuario}"`);
    console.log(UsuarioExistente)
    if (UsuarioExistente.length > 0) {
        res.send("El usuario ya existe");
    } else {
        await realizarQuery(`
        INSERT INTO Students ("id_usuario","username","password","email","es_admin","fecha_registro") VALUES
        (${req.body.id_usuario},${req.body.username},${req.body.password},${req.body.email},${req.body.es_admin},${req.body.fecha_registro});
    `)
        res.send({message: "Usuario agregado"})
    }
})  

app.post('/registro', (req, res) => {
    const { username, email, password } = req.body;

    // Query para insertar el nuevo usuario en la tabla
    const query = 'INSERT INTO Usuarios (username, email, password) VALUES (?, ?, ?)';

    db.query(query, [username, email, password], (err, result) => {
        if (err) {
            console.error('Error al registrar:', err);
            // Si el error es porque el username o email ya existen (UNIQUE)
            if (err.code === 'ER_DUP_ENTRY') {
                return res.send('Error: El nombre de usuario o el email ya están registrados.');
            }
            return res.status(500).send('Error interno en el servidor.');
        }
        
        res.send('¡Usuario registrado con éxito en MySQL! Ahora ya puedes probar el Login.');
    });
});
//prueba logins
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM Usuarios WHERE username = ? AND password = ?';
    
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error en el login:', err);
            return res.status(500).send('Error en el servidor.');
        }

        if (results.length > 0) {
            res.send(`¡Login exitoso! Entraste como: ${results[0].username}`);
        } else {
            res.send('Usuario o contraseña incorrectos.');
        }
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor de pruebas corriendo en http://localhost:${PORT}`);
});
