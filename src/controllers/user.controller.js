import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async(req, res) => {
    const {fullName, email, username, password} = req.body;
    console.log(req.body)
    // if(fullName === ""){
    //     throw new ApiError(400, "fullName is required")
    // }
    //validation-not empty
    if(
        [username, password, email, fullName].some((field) =>
            field?.trim() === "")
    ){
        throw new ApiError(400, "every field is required")
    }

    //check if username already exist
    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if(existingUser){
        throw new ApiError(409, "user already exist")
    }
    
    //check for images, check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path;
    }
    
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    //upload them to cloudinary

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)


    if(!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    //create entry in database
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username
    })

    //check if user has been created in db and send response without password and refresh token
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )
})

export {registerUser}

