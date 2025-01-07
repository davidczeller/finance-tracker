import express from "express";
import { User } from "../models/user";
import { AppDataSource } from "../data-source";

const router = express.Router();

router.get("/", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    next(error);
  }
});

router.post("/", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create(req.body);
    await userRepository.save(user);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    next(error);
  }
});

export default router;
