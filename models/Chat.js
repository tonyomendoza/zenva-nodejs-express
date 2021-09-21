const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatSchema = new Schema({
    email : {
        type: String, required: true
    },
    message: {
        type: String, required: true
    }
});

const Chat = mongoose.model('chat', chatSchema);

module.exports = Chat;