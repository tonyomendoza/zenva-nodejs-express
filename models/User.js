const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
    email : {
        type: String, required: true, unqiue: true
    },
    password: {
        type: String, required: true
    },
    username: {
        type: String, required: true
    },
    resetToken: {
        type: String
    },
    resetTokenExp: {
        type: Date
    }
});

userSchema.pre('save', async function(next){
    const has = await bcrypt.hash(this.password, 10);
    this.password=  hash;
    next();
});

userSchema.methods.isValidPassword = async function(password){
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;

}

const User = mongoose.model('user', userSchema);

module.exports = User;