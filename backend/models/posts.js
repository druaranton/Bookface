import mongoose from 'mongoose';

//the posts schema
const postsSchema = new mongoose.Schema({
    timestamp: { type: String, default: Date },
    author_reference: { type: String, required: true },
    content: { type: String, required: true },
    fullname: { type: String, required: true }
});

mongoose.model("Posts", postsSchema);