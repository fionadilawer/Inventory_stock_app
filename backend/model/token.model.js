import mongoose from 'mongoose';

const TokenScheme = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,  //tagerting the user id who have an account
        required: true,
        ref: "user",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
});

const TokenModel = mongoose.model('Token', TokenScheme);
export default TokenModel;
