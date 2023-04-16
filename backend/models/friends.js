import mongoose from 'mongoose';

//the friends schema
const FriendsSchema = new mongoose.Schema({
    email: { type: String, required: true },
    fullname: { type: String, required: true },
    friendlist: { type: Array, required: true },
    friendRequests: { type: Array, required: true }
});

mongoose.model("Friends", FriendsSchema);