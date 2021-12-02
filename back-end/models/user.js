const mongoose = require('mongoose');

/**
 * schema used for creating a user to put into mongoDB database.
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