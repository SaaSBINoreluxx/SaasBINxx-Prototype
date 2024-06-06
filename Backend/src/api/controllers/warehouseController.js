const{admin, db} = require('../../../firebase');

exports.registerItemsOut = async(req, res) => {
    const { operatorDetails, itemQuantities } = req.body; // Desestructura los datos recibidos

    try {
        // Crear una nueva transacción
        const transaction = {
            operatorDetails, // Contiene nombre, apellido, id, etc.
            items: [], // Aquí guardaremos los items detallados
            timestamp: admin.firestore.FieldValue.serverTimestamp() // Fecha y hora de la transacción
        };

        // Convertir itemQuantities a un array de items con detalles
        Object.keys(itemQuantities).forEach(card => {
            Object.keys(itemQuantities[card]).forEach(itemName => {
                const itemDetail = {
                    category: card, // card1, card2, card3, etc.
                    itemName, // 'Item 1-7', 'Item 2-9', etc.
                    quantity: itemQuantities[card][itemName] // La cantidad del item
                };
                transaction.items.push(itemDetail); // Añade este item a la transacción
            });
        });

        // Guarda la transacción en Firestore
        const docRef = await db.collection('transactions').add(transaction);

        res.status(200).json({ message: 'Transacción registrada con éxito', transactionId: docRef.id });
    } catch (error) {
        console.error('Error al registrar la transacción:', error);
        res.status(500).json({ message: 'Error al registrar la transacción' });
    }
};

exports.returnItems = (req, res) => {
    // Lógica para manejar la devolución de ítems
};