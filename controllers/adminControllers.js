import { Image } from "../models/image.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createImage = async (req, res) => {
    try {
        if (!req.files) {
            return res.status(400).json({ message: "No file uploaded" })
        }
        const image = req.files.image[0];
        const imageUpload = await uploadOnCloudinary(image.path);
        const updatedImageDoc = await Image.findOneAndUpdate(
            {}, // Finds any existing document (adjust if needed)
            { $push: { imageUrls: { url: imageUpload.secure_url } } }, // Push new object
            { new: true, upsert: true } // Creates a new document if none exists
        );

        if (!updatedImageDoc) {
            return res.status(500).json({ message: "Error while updating image" })
        }

        return res.status(200).json({
            message: "Image uploaded successfully",
        })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getAllImages = async (req, res) => {
    try {
        const images = await Image.find()
        return res.status(200).json(images)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteSingleImage = async (req, res) => {
    try {
        const { id } = req.params;

        // Pull the image URL from the imageUrls array using the id
        const updatedImageDoc = await Image.findOneAndUpdate(
            { "imageUrls._id": id },  // Condition to find the image with the specific ID
            { $pull: { imageUrls: { _id: id } } },  // Pull the specific image URL from the array
            { new: true }  // Return the updated document
        );

        if (!updatedImageDoc) {
            return res.status(404).json({ message: "Image not found" });
        }

        return res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};