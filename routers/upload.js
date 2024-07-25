const express = require('express');
const ContentController = require('../controllers/upload');
const auth = require('../middleware/auth');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = express.Router();



router.post("/upload", upload.single("file"), auth, ContentController.uploadContent);
router.get("/getupload", auth, ContentController.getContent);


module.exports = router;
