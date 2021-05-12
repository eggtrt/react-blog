import moment from 'moment';
import mongoose, { mongo } from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["MainJuin", "Subjuin", "User"],
        default: "User"
    },
    register_date: {
        type: Date,
        default: moment().format("YYYY-MM-DD")
    },
    comments: [
        {
            post_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "post"
            },
            comment_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "comment"
            }
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts"
        }
    ]
});

const User = mongoose.model("user", UserSchema);

export default User;