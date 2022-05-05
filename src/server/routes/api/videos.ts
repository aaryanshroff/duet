import * as passport from "passport";
import * as multer from "multer";
import { Router } from "express";
import config, { s3 } from "../../config";
import db from "../../db";
import { MulterFile, ReqUser } from "../../types";
import { Video } from "../../db/models";

const router = Router();

const upload = multer(config.multer);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req: ReqUser, res) => {
    try {
      const videos = await db.videos.findUnmatched(req.user.user_id);
      return res.json(videos);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: err });
    }
  }
);

router.get("/:id", async (req, res) => {
  try {
    const videoID = req.params.id;
    const [video] = await db.videos.findOne("id", "=", videoID);

    return res.json(video);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err });
  }
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("video"),
  async (req: ReqUser, res) => {
    try {
      const result = await db.videos.insert(
        ["name", "url", "user_id"],
        [
          req.file.originalname,
          (req.file as MulterFile).location,
          req.user.user_id,
        ]
      );
      res.status(200).json({ url: result[0].url });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }
);

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req: ReqUser, res) => {
    const url = req.body.url;
    if (url) {
      try {
        const result: Video[] = await db.videos.findOne("url", "=", url);
        const video = result[0];
        if (video && video.user_id === req.user.user_id) {
          s3.deleteObject(
            {
              Bucket: process.env.S3_BUCKET,
              Key: "video.mov",
            },
            (err, data) => {
              if (err) console.log(err, err.stack);
              else console.log(data);
            }
          );
          await db.videos.deleteMany("id", "=", video.id);
          res.status(200).json("Successfully deleted video");
        } else {
          res.status(400);
        }
      } catch (error) {
        console.error(error);
        res.status(500);
      }
    }
  }
);

export default router;
