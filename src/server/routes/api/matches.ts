import * as passport from "passport";
import { Router } from "express";
import config from "../../config";
import db from "../../db";
import { ReqUser } from "../../types";
import { MatchTable, UserTable } from "../../db/models";

const router = Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req: ReqUser, res) => {
    try {
      const userID = req.user.user_id;
      const matchExists = await db.matches.find(userID, req.body.receiver_id);

      if (matchExists[0]) {
        if (matchExists[0].receiver_id === userID) {
          await db.matches.updateStatus(matchExists[0].id, 1);
        }
        res.json({ message: "Successfully updated match" });
      } else {
        const newMatch: MatchTable = {
          sender_id: req.user.user_id,
          receiver_id: req.body.receiver_id,
          status: req.body.status,
        };

        await db.matches.insert(newMatch);

        res.json({ message: "Successfully created match" });
      }
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: err });
    }
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req: ReqUser, res) => {
    try {
      const matches: UserTable[] = await db.users.findAll(req.user.user_id);
      res.json(matches);
    } catch (err) {
      console.error(err);
    }
  }
);

export default router;
