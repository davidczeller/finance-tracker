import express from "express";
import { TokenInput } from "../../models/contract/token.contract";
import { AppDataSource } from "../../data-source";
import { User } from "../../models/data/user";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/token", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const tokenInput = req.body as TokenInput;
    const db_user = await AppDataSource.getRepository(User).findOne({ where: { email: tokenInput.username } });
    if (!db_user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const passwordMatch = await bcrypt.compare(tokenInput.password, db_user.password_hash);
    console.log({passwordMatch}, tokenInput.password, db_user.password_hash);
    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const token = jwt.sign({ id: db_user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ id: db_user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    const updatedUser = {
      ...db_user,
      refresh_token: refreshToken,
    };
    await AppDataSource.getRepository(User).update(db_user.id, updatedUser);

    console.log({ tokenInput });
    return res.status(200).json({ message: "Token created", token, refreshToken });
  } catch (error) {
    console.error("Error creating token:", error.message);
    next(error);
  }
});

export default router;
