import { Router } from "express";
import { createImage, getAllImages, deleteSingleImage } from "../controllers/adminControllers.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

router.post("/create-image", upload.fields([{ name: 'image' }]), createImage);
router.get("/get-all-images", getAllImages);
router.delete("/delete-image/:id", deleteSingleImage);

export default router