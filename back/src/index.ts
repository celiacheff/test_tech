import app from "./app";
import {dbConnection} from "./core/database";
import {DATABASE_URL, PORT} from "./config";
import {connect} from "mongoose";
import * as console from "console";

const EXPRESS_PORT = Number(PORT) || 3006;

const start = async () => {
  try {
    await dbConnection()

    app.listen(EXPRESS_PORT, () => console.log(`Server started on port ${EXPRESS_PORT}`))
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start().then();
