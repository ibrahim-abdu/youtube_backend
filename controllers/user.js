import { createError } from "../error.js"
import User from "../models/User.js"

export const  update=async (req,res,next)=>{
    
    if(req.params.id ===req.user.id){
        try {
            const updatedUser= await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true})
            const {password, ...others}=updatedUser._doc
            res.status(200).json(others)
        } catch (error) {
            next(error)
        }

    }else{
        return next(createError(403,"You can update only your account!"))
    }
}
export const  deleteUser= async (req,res,next)=>{

    if(req.params.id ===req.user.id){
        try {
            const deletedUser= await User.findByIdAndDelete(req.params.id,{
               
            })
         
            res.status(200).json("User Deleted Successfully")
        } catch (error) {
            next(error)
        }

    }else{
        return next(createError(403,"You can delete only your account!"))
    }
    
}
export const  getUser= async (req,res,next)=>{
    try {
       const user =await User.findById(req.params.id);
       return res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}
export const  subscribe= async (req,res,next)=>{
    
    try {
        const user=await User.findByIdAndUpdate(req.user.id,{
            $push:{subscribedUsers:req.params.id}
        })
        const subscribed=await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:1}
        })
        res.status(200).json("subscribed success")
    } catch (error) {
        next(error)
    }
}
export const  unSubscribe= async (req,res,next)=>{
    try {
        console.log('====================================');
        console.log(req.params.id);
        console.log('====================================');
        const user=await User.findByIdAndUpdate(req.user.id,{
            $pop:{subscribedUsers:req.params.id}
        })
        const unsubscribed= await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:-1}
        })
        res.status(200).json("unsubscribed success")
    } catch (error) {
        next(error)
    }
    
}
export const  like= async (req,res,next)=>{
    const id=req.user.id
    try {
       
         await Video.findByIdAndUpdate(req.params.id,{
            $addToSet:{like:id},
            $pull:{dislike:id},
         })
         res.status(200).json("Like successfully ")
    } catch (error) {
       return next(error)
    }
}
export const  dislike= async (req,res,next)=>{
    const id=req.user.id
    try {
       
         await Video.findByIdAndUpdate(req.params.id,{
            $addToSet:{dislike:id},
            $pull:{like:id},
         })
         res.status(200).json("Like successfully ")
    } catch (error) {
       return next(error)
    }
}
