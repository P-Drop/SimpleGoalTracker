import { config } from "dotenv";
import { expand } from "dotenv-expand";

expand(config());
process.env.DATABASE_URL = process.env.DATABASE_URL!.replace(
    '/goaltracker',
    '/goaltracker_test?',
);