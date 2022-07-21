import { createError } from "../error.js"
import Video from "../models/Video.js"
import User from "../models/User.js"

export const addVideo=async (req,res,next)=>{
    const newVideo=new Video({userId:req.user.id,...req.body})
    try {
     const savedVideo=await newVideo.save()

        return res.status(200).json(savedVideo)

    } catch (error) {
        next(error)
    }
}
export const updateVideo=async (req,res,next)=>{
    try {
       const video=await Video.findById(req.params.id);
       if(!video) return next(createError(400,"Video not found"))
       if(video.id!=req.user.id)
            return next(createError(401,"you can only update your videos"))
        const updatedVideo=await Video.findByIdAndUpdate(req.parms.id,{
            $set:req.body
        })
        return res.status(200).json(updatedVideo)
    } catch (error) {
        next(error)
    }
}
export const getVideo=async (req,res,next)=>{
    try {
      const video= await Video.findById(req.params.id);
        return res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}

export const deleteVideo=async (req,res,next)=>{
    try {
        const video=await Video.findById(req.params.id);
        if(!video) return next(createError(400,"Video not found"))
        if(video.id!=req.user.id)
        return next(createError(401,"you can only update your videos"))
        await Video.findByIdAndDelete(req.parms.id)
        return res.status(200).json("video deleted successfully")
        
    } catch (error) {
        next(error)
    }
}
export const addView=async (req,res,next)=>{
    try {
        await Video.findByIdAndUpdate(req.params.id,{
            $inc:{views:1}
        })
        return res.status(200).json("view increase  successfully")

    } catch (error) {
        next(error)
    }
}
export const random=async (req,res,next)=>{
    try {
      const videos=await  Video.aggregate([{$sample:{size:40}}])
      res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}
export const trend=async (req,res,next)=>{
    try {

        const videos =await  Video.find().sort({views:-1})
        res.status(200).json(videos)
      } catch (error) {
          next(error)
      }
}
export const sub=async (req,res,next)=>{
    try {
        const user=await User.findById(req.user.id);
        const subscribedChannels=user.subscribedUsers;
        const list= await Promise.all(
            subscribedChannels.map(channelId=>{
                return Video.find({userId:channelId})
            })
        );  
       return res.status(200).json(list.flat().sort((a,b)=>b.createdAt - a.createdAt))
    } catch (error) {
        
    }
}

export const getByTag=async (req,res,next)=>{
    const tags=req.query.tags.split()
    try {
        const videos= await  Video.find({tags:{$in: tags}}).limit(20)
        res.status(200).json(videos)
      } catch (error) {
          next(error)
      }
}
export const search=async (req,res,next)=>{
    const query= req.query.q;
    try {
        const videos=  Video.find({title:{$regex:query,$options:"i"}}).sort({views:-1})
        res.status(200).json(videos)
      } catch (error) {
          next(error)
      }
}