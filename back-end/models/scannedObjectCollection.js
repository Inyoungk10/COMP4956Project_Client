const mongoose = require('mongoose');
const scannedObjectsCollectionSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String }
}, { collection: 'ScannedObjectsCollection' });

module.exports = mongoose.model('ScannedObjectCollection', scannedObjectsCollectionSchema);
