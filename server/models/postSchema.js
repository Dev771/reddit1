import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    creatorId: String,
    creator: String,
    creatorEmail: String,
    tags_name: String,
    tags_type: String,
    post_Type: String,
    post_Texts: String,
    likes: {
        type: [String],
        default: [],
    },
    dislikes: {
        type: [String],
        default: [],
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