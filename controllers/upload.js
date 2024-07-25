
const crypto = require("crypto");
const User = require("../model/user");
const fs = require("fs");
const Upload = require("../model/file");
const asset = require("../model/asset");
const pinFileToIPFS = require("../services/upload");



class ContentController {
  static async generateRandom4DigitNumber() {
    return new Promise((resolve) => {
      const min = 1000;
      const max = 9999;
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      resolve(randomNumber.toString());
    });
  }
    
      static async uploadContent(req, res) {
        try {
          console.log("Starting content upload process...",req?.body?.id);
          console.log("req data:", req?.file);

          const userId = req?.body?.id;
          console.log("User ID:", userId);
          const user = await User.findById(userId);
          if (!user) {
            console.log("User not found.");
            return res.status(400).json({
              status: 400,
              success: false,
              message: "User not found.",
            });
          }
          console.log("User found:", user);
    
          if (!req.file) {
            console.log("No file uploaded.");
            return res.status(400).json({
              status: 400,
              success: false,
              message: "No file uploaded.",
            });
          }
          const tokenId = await ContentController.generateRandom4DigitNumber();
          console.log("Generated Token ID:", tokenId);
          const fileBuffer = fs.readFileSync(req.file.path);
          console.log("Read file into buffer.");
          const contentHash = crypto
            .createHash("sha256")
            .update(fileBuffer)
            .digest("hex");
          console.log("Computed Content Hash:", contentHash);
          const existingContent = await Upload.findOne({
            content_hash: contentHash,
          });
          if (existingContent) {
            console.log("Content with the same hash already exists.");
            return res.status(400).json({
              status: 400,
              success: false,
              message: "Content with the same hash already exists.",
            });
          }
          const ipfsUrl = await pinFileToIPFS(req.file.path);
          const upload = new Upload({
            minted_by: userId,
            content_id: tokenId,
            description : req?.body?.description,
            content_ipfs_url: ipfsUrl,
            content_hash: contentHash,
          });
          const newAsset = new asset({
            file_id: upload._id,
            owner_id: userId,
          });
          await upload.save();
          console.log("Uploaded content saved:", upload);
          await newAsset.save();
          console.log("Asset saved:", newAsset);
          return res.status(200).json({
            status: 200,
            success: true,
            message: "Content uploaded successfully.",
            data: upload,
          });
     
        } catch (error) {
          console.error("Error @ upload content: ", error);
          return res.status(500).json({
            status: 500,
            success: false,
            message: "Internal server error.",
          });
        }
      }


      static async getContent(req, res) {
        try {
          const userId = req.user._id;
          const uploads = await Upload.find({ minted_by: userId });
          if (!uploads || uploads.length === 0) {
            return res.status(404).json({
              status: 404,
              success: false,
              message: "No content found for this user",
            });
          }
          res.status(200).json({
            status: 200,
            success: true,
            message: "Content fetched successfully",
            data: uploads,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            status: 500,
            success: false,
            message: "Internal Server Error",
          });
        }
      }
    
}

module.exports = ContentController;
