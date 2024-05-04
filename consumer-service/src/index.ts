import express from "express";

const startServer = () => {
  const app = express();
  app.use(express.json());

  const PORT = process.env.SERVER_PORT || 3001;

  app.listen(PORT, () =>
    console.log(`Consumer Service up and running on port ${PORT}`)
  );
};

const waitForIt = Number(process.env.SLEEP_TIME) || 30000;

setTimeout(() => {
  startServer();
}, waitForIt);
