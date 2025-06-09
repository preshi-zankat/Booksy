import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import User   from '../model/user.model.js'

export const verifyJwt=asyncHandler(async(req,_,next)=>{
    try {
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Beares","")

        if(!token){
            throw new ApiError(401,"Unauthorized request")
        }

        const decodedToken=jwt.verify(token, process.env.JWT_SECRET)

        const user=await User.findById(decodedToken?._id).select("-password")

        if(!user){
            throw new ApiError(401,"Invalid Access Token")
        }

        req.user=user;

        next()

    } catch (error) {
        throw new ApiError(500,error.message) || "Server side Error"
    }
})