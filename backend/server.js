const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const cors = require('cors');
const corsOptions = {
	origin: 'http://localhost:4200', 
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true, 
};

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
	res.header('Access-Control-Allow-Credentials', true);
	next();
  });
  

app.use(cors(corsOptions));

const bodyParser = require('body-parser');


const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'clinica_veterinaria',
	password: 'postgres',
	port: '5432',

});

app.listen(port, () => { //Configuta al servidor a eschuchar por el puerto definido anteriormente en este caso el 3000 
	console.log(`Servidor escuchando en localhost:${port}`
	);
});

app.use(bodyParser.json());


app.get('/', (req, res) => { // definimos un endpoint para solicitudes tipo GET de prueba
	res.send('Hola, mundo desde Express');
});

///////////////////////////////////////ACCESO///////////////////////////////
app.post('/user/login', async (req, res) => {
	const { email, password } = req.body;

	try {
		// Realiza la lógica de verificación de credenciales en la base de datos
		const result = await pool.query('SELECT * FROM veterinaria.usuario WHERE correo = $1 AND pass = $2', [email, password]);

		if (result.rows.length > 0) {
			res.json({ valid: true });
		} else {
			res.json({ valid: false });
		}
	} catch (err) {
		console.error('Error al verificar las credenciales', err);
		res.status(500).json({ error: 'Error interno del servidor' });
	}
});

///////////////////////////////////////////////////// ENDPOINTS DE USUARIOS /////////////////////////////////////////////////////

app.get('/user', async (req, res) => {  //////////////////// Obtener Usuarios
	try {
		const result = await pool.query('SELECT * FROM veterinaria.usuario');
		res.json(result.rows);
	} catch (err) {
		console.error('Error al obtener los datos de Usuarios', err);
		res.status(500).send('Error interno del Servidor')
	}
})

app.get('/user/clientes', async (req, res) => {  //////////////////// Obtener Usuarios
	try {
		const result = await pool.query("SELECT * FROM veterinaria.usuario WHERE tipo_usuario='cliente'");
		res.json(result.rows);
	} catch (err) {
		console.error('Error al obtener los datos de Usuarios', err);
		res.status(500).send('Error interno del Servidor')
	}
})

app.post('/user', async (req, res) => {  ///////////////// Ingresar Usuario
	const { id, names, phone, direction, email, password } = req.body;
	if (!names || !email || !names || !phone || !direction || !password) {
		return res.status(400).send('Faltan datos requeridos');
	}

	try {
		const result = await pool.query(
			'INSERT INTO veterinaria.usuario (idusuario, nombre, telefono, direccion, correo, pass, tipo_usuario) VALUES ($1,$2,$3,$4,$5,$6, $7) RETURNING *',
			[id, names, phone, direction, email, password, 'Cliente']
		);

		res.json(result.rows[0]);

	} catch (err) {
		console.error("ha ocurrido un errodo al insertar usuario", err);
		res.status(500).send('Error interno del servidor');

	}

});


app.put('/user/updtcred/:email', async (req, res) => {  ////// Actualizar Credenciales
	const userEmail = req.params.email;
	const { password } = req.body;

	if (!password) {
		return res.status(400).send('password es requerido');
	}

	try {
		const result = await pool.query(
			'UPDATE veterinaria.usuario SET pass = $1 WHERE correo = $2 RETURNING *',
			[password, userEmail.toString()]
		);
		res.json(result.rows[0]);

	} catch (err) {
		console.error('Error al actualizar un usuario', err);
		res.status(500).send('Error interno del servidor');
	}
});


app.put('/user/:id', async (req, res) => {  ////// Actualizar Usuario
	const userId = req.params.id;
	const { password } = req.body;

	if (!password) {
		return res.status(400).send('password es requerido');
	}

	try {
		const result = await pool.query(
			'UPDATE veterinaria.usuario SET pass = $1 WHERE idusuario = $2 RETURNING *',
			[password, userId]
		);

		res.json(result.rows[0]);

	} catch (err) {
		console.error('Error al actualizar un usuario', err);
		res.status(500).send('Error interno del servidor');
	}
});

app.delete('/user/:id', async (req, res) => {
	const userId = req.params.id;

	try {
		const result = await pool.query('DELETE FROM veterinaria.usuario WHERE idusuario = $1 RETURNING *', [userId]);
		res.json(result.rows[0]);
	} catch (err) {
		console.error('Error al eliminar un usuario', err);
		res.status(500).send('Error interno del servidor');
	}
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////// ENDPOINTS DE MASCOTAS /////////////////////////////////////////////////////
app.get('/pet', async (req, res) => { //Obtener datos de mascotas
	try {
		const result = await pool.query('SELECT * FROM veterinaria.mascota');
		res.json(result.rows);
	} catch (err) {
		console.error('Error al obtener datos de Mascota', err);
		res.status(500).send('Error interno del servidor');
	}
});

app.post('/pet', async (req, res) => {  ///////////////// Ingresar Mascota
	const { pet_id, pet_name, pet_especie, iddueno } = req.body;

	if (!pet_id || !pet_name || !pet_especie || !iddueno) {
		return res.status(400).send('Faltan datos requeridos');
	}

	try {
		const result = await pool.query(
			'INSERT INTO veterinaria.mascota (idmascota, nombre, especie, iddueno) VALUES ($1,$2,$3,$4) RETURNING *',
			[pet_id, pet_name, pet_especie, iddueno]
		);

		res.json(result.rows[0]);

	} catch (err) {
		console.error("ha ocurrido un errodo al insertar usuario", err);
		res.status(500).send('Error interno del servidor');

	}

});

app.put('/pet/:id', async (req, res) => {  ////// Actualizar Mascota
	const petId = req.params.id;
	const { pet_name, pet_especie } = req.body;

	if (!pet_name || !pet_especie) {
		return res.status(400).send('password es requerido');
	}

	try {
		const result = await pool.query(
			'UPDATE veterinaria.mascota SET nombre = $1, especie = $2 WHERE idmascota = $3 RETURNING *',
			[pet_name, pet_especie, petId]
		);

		res.json(result.rows[0]);

	} catch (err) {
		console.error('Error al actualizar un usuario', err);
		res.status(500).send('Error interno del servidor');
	}
});

app.delete('/pet/:id', async (req, res) => {
	const petId = req.params.id;

	try {
		const result = await pool.query('DELETE FROM veterinaria.mascota WHERE idmascota = $1 RETURNING *', [petId]);
		res.json(result.rows[0]);
	} catch (err) {
		console.error('Error al eliminar una mascota', err);
		res.status(500).send('Error interno del servidor');
	}
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////// ENDPOINTS DE CITA /////////////////////////////////////////////////////////



app.get('/cita', async (req, res) => { //Obtener datos de citas
	try {
		const result = await pool.query('SELECT * FROM veterinaria.cita');
		res.json(result.rows);
	} catch (err) {
		console.error('Error al obtener datos de Cita', err);
		res.status(500).send('Error interno del servidor');
	}
});

app.post('/cita', async (req, res) => {  ///////////////// Ingresar Mascota
	const { cita_id, pet_id, medico_id, motivo } = req.body;

	if (!pet_id || !cita_id || !medico_id || !motivo) {
		return res.status(400).send('Faltan datos requeridos');
	}

	try {
		const result = await pool.query(
			'INSERT INTO veterinaria.cita (idcita, idmascota, idmedico, motivo) VALUES ($1,$2,$3,$4) RETURNING *',
			[cita_id, pet_id, medico_id, motivo]
		);

		res.json(result.rows[0]);

	} catch (err) {
		console.error("ha ocurrido un errodo al insertar usuario", err);
		res.status(500).send('Error interno del servidor');

	}

});

app.put('/cita/:id', async (req, res) => {  ////// Actualizar Mascota
	const citaId = req.params.id;
	const { motivo } = req.body;

	if (!motivo) {
		return res.status(400).send('Faltan valores es requerido');
	}

	try {
		const result = await pool.query(
			'UPDATE veterinaria.cita SET motivo = $1 WHERE idmascota = $2 RETURNING *',
			[motivo, citaId]
		);

		res.json(result.rows[0]);

	} catch (err) {
		console.error('Error al actualizar un cita', err);
		res.status(500).send('Error interno del servidor');
	}
});

app.delete('/cita/:id', async (req, res) => {
	const citaId = req.params.id;

	try {
		const result = await pool.query('DELETE FROM veterinaria.cita WHERE idcita = $1 RETURNING *', [citaId]);
		res.json(result.rows[0]);
	} catch (err) {
		console.error('Error al eliminar una cita', err);
		res.status(500).send('Error interno del servidor');
	}
});



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


