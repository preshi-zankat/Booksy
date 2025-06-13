import Review from "../model/review.model.js";
import User from "../model/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

export const getReviewsByBookId=asyncHandler(async(req,res)=>{
    try {
        const reviews=Review.find({bookId:req.qury.bookId}).populate('userId','name _id')

        res.status(200).json(new ApiResponse("Review fetched successfully", reviews));
    } catch (error) {
        res.status(500).json(new ApiError(500, "Failed to fetch reviews"));
    }
})

export const createReview=asyncHandler(async(req,res)=>{
    try {
         const review=new Review({
            ...req.body,
            userId:req.user._id
         })
         await review.save();
         await User.findByIdAndUpdate(req.use._id,{$push:{reviews:review._id}})
         const populatedReview=await Review.findById(review._id).populate('userId','name _id')

         res.status(200).json(new ApiResponse("Review created successfully", populatedReview));

    } catch (error) {
        res.status(500).json(new ApiError(500, "Failed to create review"));
    }
})

export const updateReview=asyncHandler(async(req,res)=>{
    try {
        const review=await Review.findByIdAndUpdate(req.params.id,req.body,{new:true}).populate('userId','name _id')

        res.status(200).json(new ApiResponse("Review updated successfully", review));
    } catch (error) {
        res.status(500).json(new ApiError(500, "Failed to update review"));
    }
})

export const deleteReview=asyncHandler(async(req,res)=>{
    try {
        const review=Review.findByIdAndDelete(req.params.id);
        if(!review){
            throw new ApiError(404, "Review not found");
        }
        await User.findByIdAndUpdate(review.userId,{$pull:{reviews:review._id}})
        res.status(200).json(new ApiResponse("Review deleted successfully"));

    } catch (error) {
        res.status(500).json(new ApiError(500, "Failed to delete review"));
    }
})