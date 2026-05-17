import bcrypt from "bcryptjs";

import { userService } from "../services";

const sanitizeUser = (user) => {
  const plainUser = user.toJSON ? user.toJSON() : user;

  delete plainUser.passwordHash;

  return plainUser;
};

const getUsers = async (req, res) => {
  const users = await userService.getAllUsers();

  return res.status(200).send(users.map(sanitizeUser));
};

const getUser = async (req, res) => {
  const user = await userService.getUserById(req.params.userId);

  if (!user) {
    return res.status(404).send();
  }

  return res.status(200).send(sanitizeUser(user));
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({
      error: "Bad Request",
      message: "Username, email e password são obrigatórios.",
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await userService.createUser({
    username,
    email,
    passwordHash,
  });

  return res.status(201).send(sanitizeUser(user));
};

const updateUser = async (req, res) => {
  const userData = {
    username: req.body.username,
    email: req.body.email,
  };

  if (req.body.password) {
    userData.passwordHash = await bcrypt.hash(req.body.password, 10);
  }

  const response = await userService.updateUser(req.params.userId, userData);

  if (response[0] === 0) {
    return res.status(404).send();
  }

  const user = response[1][0];

  return res.status(200).send(sanitizeUser(user));
};

const deleteUser = async (req, res) => {
  const result = await userService.deleteUser(req.params.userId);

  if (!result) {
    return res.status(404).send();
  }

  return res.status(204).send();
};

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};