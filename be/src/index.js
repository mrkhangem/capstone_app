const express = require("express");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const cors = require("cors");
const moment = require("moment");

const app = express();
const upload = multer({ dest: "uploads/" });

const storage = new Storage({
    keyFilename: "/app/black-cirrus-444210-r3-306a3125ac1a.json",
});
const bucketName = "emnk-capstone";
app.use(cors({ origin: "*" }));
app.post("/api/upload", upload.single("file"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
    }

    try {
        const now = moment();
        const formattedPath = now.format("YYYY/MM/DD/HHmmss");
        const fileName = `${formattedPath}-${path.basename(req.file.originalname)}`;

        const bucket = storage.bucket(bucketName);
        await bucket.upload(req.file.path, {
            destination: fileName,
        });
        res.status(200).json({ message: `Ngon rồi, file name -> ${fileName}` });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "Error uploading file." });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
