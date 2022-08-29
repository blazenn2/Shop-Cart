const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const accountSchema = mongoose.model('user', userSchema);

exports.addUser = async (userInfo) => {
    const user = await accountSchema.find({ "email": userInfo.email });
    if (user.length === 0 && userInfo.password === userInfo.confirmPassword) return await accountSchema({ email: userInfo.email, password: userInfo.password }).save();
};

exports.login = async (loginCredentials) => {
    const user = await accountSchema.find({ "email": loginCredentials.email, "password": loginCredentials.password });
    if (user.length > 0) return true;
    return false;
};