import mongoose from 'mongoose';

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
        minlength: 8,
        maxlength: 16,
        validate: {
            validator: function (password) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/.test(password);
            },
            message: "Password must contain at least one uppercase letter, one lowercase letter, and one symbol."
        }
    },

    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

const User = mongoose.model("User", userSchema);

export default User;