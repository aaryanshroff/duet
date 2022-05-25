import * as passport from "passport";

import { Router } from "express";

import db from "../../db";
import { ReqUser } from "../../types";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req: ReqUser, res) => {
    try {
      console.log(req.user);
      const results = await db.users.find("users.id", req.user.user_id);
      return res.json(results[0]);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: err });
    }
  }
);

export default router;
