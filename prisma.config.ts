import { config } from "dotenv";
import { expand } from "dotenv-expand";
import path from "node:path";
import { defineConfig } from 'prisma/config';

expand(config());

export default defineConfig({
    schema: path.join('prisma', 'schema.prisma'),
    migrations: {
        seed: 'tsx prisma/seed.ts',
    },
})
