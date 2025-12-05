import multer from "multer";
import fs from "fs";

const uploadDir = "./public/temp";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

//diskupload copy pasted from multer documentation from github

const storage = multer.diskStorage({
  destination: function (req, file, cb) { //cb -> callback
    cb(null, './public/temp')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname + uniqueSuffix) //original name rakhna is not good practice
  }
})

export const upload = multer({ storage: storage })