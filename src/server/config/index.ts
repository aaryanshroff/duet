import * as dotenv from "dotenv";
import * as multerS3 from "multer-s3";
import * as aws from "aws-sdk";
import { Options as multerConfig } from "multer";

dotenv.config();

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: "us-east-1",
});

export const s3 = new aws.S3({ region: process.env.AWS_REGION });

const db = {
  port: Number(process.env.PORT) || 5432,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const jwt = {
  secret: process.env.JWT_SECRET,
  expires: process.env.JWT_EXPIRES,
};

const multer: multerConfig = {
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    acl: "public-read",

    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    const type = file.mimetype.split("/")[0];
    if (type !== "video") {
      return cb(new Error("Invalid file format"));
    }
    cb(null, true);
  },
};

export default {
  db,
  jwt,
  multer,
};
