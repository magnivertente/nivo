import express from "express";
import { router } from "./infra/web/router";
import { env } from "./infra/env";

const app = express();

app.use(express.json());
app.use(router);

app.listen(env.PORT);
