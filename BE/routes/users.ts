import express from "express";
import { User } from "../models/data/user";
import { User as ContractUser } from "../models/contract/user.contract";
import { AppDataSource } from "../data-source";
import * as bcrypt from "bcrypt";

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
    const requestUser = req.body as ContractUser;
    const passwordHash = await bcrypt.hash(requestUser.password, 10);
    const databaseUser = {
      ...requestUser,
      password_hash: passwordHash,
    };
    const user = userRepository.create(databaseUser);
    await userRepository.save(user);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    next(error);
  }
});

router.put("/:id", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.update(req.params.id, req.body);
    res.status(204).send();
  } catch (error) {
    console.error("Error updating user:", error);
    next(error);
  }
});

router.delete("/:id", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    next(error);
  }
});

export default router;
