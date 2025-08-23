// import { use } from "react";
// import { User } from "../models/user.model.js";
// import bcrypt from "bcryptjs"
// import jwt from 'jsonwebtoken'
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudnary.js";

export const register = async(req,res)=>{
    try{
        const {firstname,lastname,email,password} = req.body;
        if(!firstname||!lastname||!email||!password){
            return res.status(400).json({
                success:false,
                message:"Fields are required"
            })
        }
        const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailregex.test(email)){
            return res.status(400).json({
                success:false,
                message:"Invalid email"
            })
        }
        if(password.length<6){
            return res.status(400).json({
                success:false,
                message:"password mast be atleast 6 cherecter"
            })
        }
        const exitstinguserByemail = await User.findOne({email:email});
        if(exitstinguserByemail){
            return res.status(400).json({
                success:false,
                message:"email already exist"
            })
        }
        const hashpassword = await bcrypt.hash(password,10)
        await User.create({
            firstname,
            lastname,
            email,
            password:hashpassword,
        })

        return res.status(201).json({
            success:true,
            message:"Account Created Successfully"
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to register"
        })
    }
}

export const login = async(req,res)=> {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password"
            })
        }
        const ispasswordValid = await bcrypt.compare(password,user.password)
        if(!ispasswordValid){
            return res.status(400).json({
                success:false,
                message:"Invalid Credentials"
            })
        }
        const token = await jwt.sign({userId:user._id}, process.env.SECRET_KEY, {expiresIn:"1d"})
return res.status(200).cookie("token", token, { 
   maxAge: 1*24*60*60*1000, 
   httpOnly: true, 
   sameSite: "strict"
 }).json({            success:true,
            message:`Welcome back ${user.firstname}`,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to Login"
        })
    }
}

// export const logout = async(_,res)=>{
//     try {
//         return res.status(200).cookie("token", "", {maxAge: 0}).json({
//                 success:true,
//                 message:"Logout Successfully"
//             })
//     } catch (error) {
//         console.log(error);
//     }
// }

export const logout = async (_, res) => {
  try {
    return res.status(200).cookie("token", "", {
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(0)   // clears cookie immediately
    }).json({
      success: true,
      message: "Logout Successfully"
    })
  } catch (error) {
    console.log(error);
  }
}

// export const updateProfile = async(req, res) => {
//     try {
//         const userId= req.id
//         const {firstname, lastname, occupation, bio, instagram, facebook, linkedin, github} = req.body;
//         const file = req.file;

//         const fileUri = getDataUri(file)
//         let cloudResponse = await cloudinary.uploader.upload(fileUri)

//         const user = await User.findById(userId).select("-password")
        
//         if(!user){
//             return res.status(404).json({
//                 message:"User not found",
//                 success:false
//             })
//         }

//         // updating data
//         if(firstname) user.firstname = firstname
//         if(lastname) user.lastname = lastname
//         if(occupation) user.occupation = occupation
//         if(instagram) user.instagram = instagram
//         if(facebook) user.facebook = facebook
//         if(bio) user.bio = bio
//         if(file) user.photo = cloudResponse.secure_url

//         await user.save()
//         return res.status(200).json({
//             message:"profile updated successfully",
//             success:true,
//             user
//         })
        
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: "Failed to update profile"
//         })
//     }
// }

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user?.id || req.id;
    if (!userId) return res.status(400).json({ message: "User ID missing", success: false });

    const { firstname, lastname, occupation, bio, instagram, facebook, linkedin, github } = req.body;
    const file = req.file;

    let cloudResponse;
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri);
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    // Update fields
    Object.assign(user, {
      ...(firstname && { firstname }),
      ...(lastname && { lastname }),
      ...(occupation && { occupation }),
      ...(bio && { bio }),
      ...(instagram && { instagram }),
      ...(facebook && { facebook }),
      ...(linkedin && { linkedin }),
      ...(github && { github }),
      ...(cloudResponse?.secure_url && { photo: cloudResponse.secure_url })
    });

    await user.save();
    return res.status(200).json({ message: "Profile updated successfully", success: true, user });

  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ success: false, message: "Failed to update profile" });
  }
};

export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select('-password'); 
      res.status(200).json({
        success: true,
        message: "User list fetched successfully",
        total: users.length,
        users
      });
    } catch (error) {
      console.error("Error fetching user list:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch users"
      });
    }
  };