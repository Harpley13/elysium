const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = require('./config/elysium-7f7ea-firebase-adminsdk-g2ygp-2ad01d7006.json');

const app = express();
const port = 4000; // Forzar el uso del puerto 4000

app.use(cors({
  origin: ['https://elysium-frontend-mo537hw8u-harpley13s-projects.vercel.app', 'http://localhost:3000', '*'],
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://elysium-7f7ea.firebaseio.com'
});

const db = admin.firestore();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

app.get('/elysium-App', async (req, res) => {
  try {
    const snapshot = await db.collection('elysium-App').get();
    const documentos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(documentos);
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener documentos', error });
  }
});

app.post('/elysium-App', async (req, res) => {
  try {
    const nuevoDocumento = req.body;
    const docRef = await db.collection('elysium-App').add(nuevoDocumento);
    res.status(201).send({ id: docRef.id, ...nuevoDocumento });
  } catch (error) {
    res.status(500).send({ message: 'Error al crear documento', error });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
