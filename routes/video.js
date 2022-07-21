import express from "express"

import { addVideo,getVideo,updateVideo, deleteVideo, addView, trend, random, sub ,getByTag,search} from "../controllers/video.js";
import { verifyToken } from "../VerifyToken.js";

const router=express.Router();

router.post("/",verifyToken,addVideo)
router.put("/:id",verifyToken,updateVideo)
router.get("/find/:id",getVideo)
router.delete("/:id",verifyToken,deleteVideo)

router.put("/view/:id",addView)
router.get("/trend",trend)
router.get("/random",random)
router.get("/sub",verifyToken,sub)
router.get("/tags",getByTag)
router.get("/search",search)

export default router; 