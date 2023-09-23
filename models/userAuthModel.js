import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, default: '' },
    pin: { type: String, default: '' }
});

const UserAuth = mongoose.model("User", userSchema);
export default UserAuth;
