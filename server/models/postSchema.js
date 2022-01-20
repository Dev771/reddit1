import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    UserId: String,
    UserEmail: String,
    tags_name: String,
    tags_type: String,
    likes: {
        type: Number,
        default: 0,
    },
    Subject: String,
    Country: String,
    Location: String,
    Date_Of_Creation: {
        type: Date,
        default: Date.now(),
    },
    LocImage: String,
});

export default mongoose.model('PostSchema', postSchema);