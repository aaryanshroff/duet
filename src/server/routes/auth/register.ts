import * as jwt from "jsonwebtoken";
import { Router } from "express";
import db from "../../db";
import { UserTable } from "../../db/models";
import { generateHash } from "../../utils/passwords";
import config from "../../config";
import { validEmailRegex } from "../../utils/validation";

const router = Router();

const validNewUser = (user: UserTable) => {
  return (
    user.first_name &&
    user.last_name &&
    validEmailRegex.test(user.email) &&
    user.password &&
    user.password.length >= 8
  );
};

router.post("/", async (req, res) => {
  const newUser: UserTable = req.body;
  if (validNewUser(newUser)) {
    try {
      newUser.password = generateHash(newUser.password);
      const result = await db.users.insert(newUser);
      const token = jwt.sign(
        { user_id: result[0].id, email: req.body.email },
        config.jwt.secret,
        { expiresIn: config.jwt.expires }
      );
      res.json(token);
    } catch (err) {
      console.error(err);
      res.status(500).json("Internal Server Error");
    }
  } else {
    res.status(400).json("Bad Request");
  }
});

export default router;
