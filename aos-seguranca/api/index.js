import "dotenv/config";
import cors from "cors";
import express from "express";
import bcrypt from "bcryptjs";

import models, { sequelize } from "./models";
import { session, user, message } from "./routes";
import authMiddleware from "./middlewares/authMiddleware";
import protectRoutes from "./middlewares/protectRoutes";

const app = express();

app.set("trust proxy", true);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
  };

  next();
});

app.use(authMiddleware);
app.use(protectRoutes);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use("/session", session);
app.use("/users", user);
app.use("/messages", message);

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Servidor rodando!",
    status: "online",
    project: "AOS - Autenticacao e Seguranca da API",
    endpoints: {
      session: "/session",
      users: "/users",
      messages: "/messages",
    },
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.name === "SequelizeValidationError") {
    return res.status(400).send({
      error: "Bad Request: Validation failed.",
      messages: err.errors.map((e) => e.message),
    });
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).send({
      error: "Conflict: Resource already exists.",
      messages: err.errors.map((e) => e.message),
    });
  }

  res.status(500).send({
    error: "Something went wrong! Internal Server Error.",
    message: err.message,
  });
});

const port = process.env.PORT ?? 3000;
const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === "true";

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    await createUsersWithMessages();
  }

  app.listen(port, () =>
    console.log(
      "Express-01 app listening on port " + port + "!\n" + process.env.MESSAGE,
    ),
  );
});

const createUsersWithMessages = async () => {
  const passwordHash = await bcrypt.hash("123456", 10);

  await models.User.create(
    {
      username: "rwieruch",
      email: "rwieruch@email.com",
      passwordHash,
      messages: [
        {
          text: "Published the Road to learn React",
        },
      ],
    },
    {
      include: [models.Message],
    },
  );

  await models.User.create(
    {
      username: "ddavids",
      email: "ddavids@email.com",
      passwordHash,
      messages: [
        {
          text: "Happy to release ...",
        },
        {
          text: "Published a complete ...",
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
};

export default app;