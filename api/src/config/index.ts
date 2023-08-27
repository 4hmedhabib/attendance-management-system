import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

const CREDENTIALS = process.env.CREDENTIALS === "true";
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } =
  process.env;

const isSecure = false;
const maxSessionExpire = 30 * 60000; // 30 min
const portalURLs = ["http://localhost:5173", "http://127.0.0.1:5173"];

export { CREDENTIALS, isSecure, maxSessionExpire, portalURLs };
