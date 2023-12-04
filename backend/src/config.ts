import dotenv from "dotenv";
import fs from "fs";
const dotenvFilePath = `../.env${
  process.env.NODE_ENV !== "production" ? `.${process.env.NODE_ENV}` : ""
}`;
dotenv.config({
  path: dotenvFilePath,
});
export const MONGO_INITDB_ROOT_USERNAME =
  process.env.MONGO_INITDB_ROOT_USERNAME;
export const MONGO_INITDB_ROOT_PASSWORD =
  process.env.MONGO_INITDB_ROOT_PASSWORD;
export const PORT = isNaN(Number(process.env.PORT))
  ? 9000
  : Number(process.env.PORT);
export const NODE_ENV = process.env.NODE_ENV;
export const MONGO_URI = process.env.MONGO_URI || "";

export const isEnvDev = NODE_ENV === "development";
export const JWT_ISSUER = process.env.JWT_ISSUER;
export const JWT_AUDIENCE = process.env.JWT_AUDIENCE;
export const JWT_EXPIRE = process.env.JWT_EXPIRE;
export const privateKey = fs.readFileSync("./src/keys/private-key.pem", {
  encoding: "utf-8",
});

export const publicKey = fs.readFileSync("./src/keys/public-key.pem", {
  encoding: "utf-8",
});
