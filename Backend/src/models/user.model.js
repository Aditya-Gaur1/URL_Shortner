import mongoose from 'mongoose';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }

}, {
    timestamps: true
});


function getGravatarUrl(email) {

    const hash = crypto
        .createHash('md5')
        .update(email.trim().toLowerCase())
        .digest('hex');

    return `https://www.gravatar.com/avatar/${hash}?d=mp`;
}


userSchema.virtual('avatar').get(function () {
    return getGravatarUrl(this.email);
});


userSchema.set('toJSON', {
    virtuals: true
});


const User = mongoose.model("User", userSchema);

export default User;