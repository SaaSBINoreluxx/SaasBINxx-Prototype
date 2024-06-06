const admin = require('firebase-admin');
const serviceAccount = require('../credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const data = require('./data.json'); // Asegúrate de que la estructura del archivo coincida con tus necesidades

async function uploadData() {
  const promises = [];
  Object.keys(data).forEach((collectionKey) => {
    const collection = data[collectionKey];
    collection.forEach((doc) => {
      const docRef = db.collection(collectionKey).doc(); // crea un nuevo documento en Firestore
      promises.push(docRef.set(doc)); // añade la operación de escritura a la lista de promesas
    });
  });
  
  await Promise.all(promises);
  console.log('Upload complete');
}

uploadData().catch(console.error);