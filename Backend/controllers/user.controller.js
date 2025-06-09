import User from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

// signup user
export const signup = asyncHandler(async (req, res) => {
  const { name, email, password,bio} = req.body;

    
  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email, and password are required");
  }
  // Check if user already exists
  const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, "User already exists with this email");
    }

    // Create new user
    const user=await User.create({
        name,
        email,
        password,
        bio
    })
    if (!user) {
        throw new ApiError(500, "Failed to create user");
    }
    res.status(201).json(new ApiResponse("User created successfully", user));
}) 

// login user
export const login=asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }
    if (!user.comparePassword(password)) {
      throw new ApiError(401, "Invalid email or password");
    }
    const token = user.generateAuthToken();
    res.status(200).json(new ApiResponse("Login successful", { user, token }));
})

// Logout user
export const logout = asyncHandler(async (req, res) => {
    req.user = null;
    res.status(200).json(new ApiResponse("Logout successful"));
})

// get user profile
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    res.status(200).json(new ApiResponse("User profile retrieved successfully", user));
})

// update user profile
export const updateUserProfile = asyncHandler(async (req, res) => {
    const { name, email, bio } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.bio = bio || user.bio;

    await user.save();
    res.status(200).json(new ApiResponse("User profile updated successfully", user));
})

// delete user profile
export const deleteUserProfile=asyncHandler(async(req,res)=>{
    const user=User.findByIdAndDelete(req.user._id);
    res.status(200).json(new ApiResponse("User profile deleted successfully"));

})