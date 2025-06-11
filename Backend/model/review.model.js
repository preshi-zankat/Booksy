import mongoose, { Types } from 'mongoose'

const reviewSchema=new mongoose.Schema({
    bookId:{
        type: Types.ObjectId,
        ref: 'Book',
        required: true
    },
    userId:{
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewerName:{
        type: String,
        default: 'Anyonymous'
    },
    reviewTitle:{
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    favoriteQuote: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    recommend: {
        type: Boolean,
        default: false
    },
    redingDifficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    }
})

const Review =mongoose.model('Review', reviewSchema)
export default Review
