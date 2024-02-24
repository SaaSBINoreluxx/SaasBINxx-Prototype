const express = require('express');
const cors = require('cors');
const {db} = require('./firebase.js')

const app = express();

app.use(express.json()); // Para análisis de cuerpos de tipo application/json
app.use(express.urlencoded({ extended: true })); // Para análisis de cuerpos de tipo application/x-www-form-urlencoded
app.use(cors({
    origin: 'https://saasbinxx-prototype-front.onrender.com'
}))

app.listen(5000,() =>{
    console.log("Servidor iniciado en puerto 5000")
});


app.get('/users', async(req, res) => {
    const usersRef = db.collection('Users');
    try {
        const snapshot = await usersRef.get();
        const usersList = [];
        snapshot.forEach(doc => {
            usersList.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).json(usersList);
    } catch (error) {
        console.error("Error obteniendo documentos: ", error);
        res.status(500).send("Error al obtener documentos");
    }
});


app.post('/adduser', async (req, res) => {
    const { name, status } = req.body;

    try {
        const docRef = await db.collection('Users').add({
            name,
            status
        });
        res.status(200).send(`Usuario agregado con éxito con ID: ${docRef.id}`);
    } catch (error) {
        console.error('Error al agregar usuario:', error);
        res.status(500).send('Error al agregar usuario');
    }
})