import { execSync } from "node:child_process";
import { config } from "dotenv";
import { expand } from "dotenv-expand";

expand(config());
const testUrl = process.env.DATABASE_URL.replace('/goaltracker?', '/goaltracker_test?');

// reset = drop + migrate + seed
execSync('npx prisma migrate reset --force --skip-generate', {
    stdio: 'inherit',
    env: { ...process.env, DATABASE_URL: testUrl },
})