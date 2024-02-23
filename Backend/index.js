import express from 'express';
import cors from 'cors'

const app = express();
app.use(cors({
    origin: 'https://saasbinxx-prototype-front.onrender.com'
}))

app.get('/users', (req, res) => {
    res.send({
        users: ['Juan Romero Alvarado']
    })
});

app.listen(5000,() =>{
    console.log("Servidor iniciado en puerto 3000")
});