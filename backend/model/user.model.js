import mongoose from 'mongoose';

const userSchema  = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        //unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid emaial",
        ], //for validating an email...
    },
    password: {
        type: String,
        require: true,
        minLength:[6, "password must be up to 6 characters"]
    },
    photo:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    phone: {
        type: String,
        default: "+234",
      },
      bio: {
        type: String,
        maxLength: [250, "Bio must not be more than 250 characters"],
        default: "bio",
      },
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);
export default User;
