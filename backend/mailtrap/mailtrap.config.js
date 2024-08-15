import dotenv from "dotenv";
import { MailtrapClient } from "mailtrap";

dotenv.config();
const TOKEN = process.env.MAIL_TOKEN || "80999d49ceee428c57451462c09ae77d";
const ENDPOINT = process.env.MAIL_ENDPOINT || "https://send.api.mailtrap.io/";

if (!TOKEN || !ENDPOINT) {
  console.error(
    "Environment variables for MAILTRAP_TOKEN or MAILTRAP_ENDPOINT are missing."
  );
  console.log(TOKEN);
  process.exit(1);
}

export const mailtrapClient = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Techy Garage",
};


