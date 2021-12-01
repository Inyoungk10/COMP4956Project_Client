const mongoose = require('mongoose');

/**
 * Database model schema for users on MongoDB
 * @Author Cameron Wark
 */

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String }
});

// export default mongoose.model('User', userSchema);

module.exports =  mongoose.model('User', userSchema);