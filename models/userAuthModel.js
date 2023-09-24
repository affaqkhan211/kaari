import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
    },
    pin : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pin',
    }
});


const addressSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
});

const pinSchema = new mongoose.Schema({
    pin: {
      type: Number,
      required: true,
      min: 1000,
      max: 9999
    },
});

export const UserAuth = mongoose.model("User", userSchema);
export const Address = mongoose.model("Address", addressSchema)
export const Pin = mongoose.model("Pin", pinSchema)
