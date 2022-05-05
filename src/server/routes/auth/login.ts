import * as jwt from "jsonwebtoken";
import * as passport from "passport";
import config from "../../config";
import { Router } from "express";
import { ReqUser } from "../../types";
import { UserTable } from "../../db/models";

const router = Router();

router.post(
  "/",
  passport.authenticate("local", { session: false }),
  async (req: ReqUser, res) => {
    try {
      const token = jwt.sign(
        { user_id: req.user.id, email: req.user.email },
        config.jwt.secret,
        { expiresIn: config.jwt.expires }
      );
      res.json(token);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export default router;
