const mongoose = require('mongoose');

/**
 * Database model schema for MongoDB documents
 * @Author Cameron Wark
 */

const scannedObjectsCollectionSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String }
}, { collection: 'ScannedObjectsCollection' });



module.exports = mongoose.model('ScannedObjectCollection', scannedObjectsCollectionSchema);
