/**
 * Usage:
 *   pnpm dlx tsx scripts/hash-password.ts <password>
 *
 * Prints a bcrypt hash to paste into .env.local as ADMIN_PASSWORD_HASH.
 */
import bcrypt from "bcryptjs";

const password = process.argv[2];
if (!password) {
    console.error("Usage: pnpm dlx tsx scripts/hash-password.ts <password>");
    process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);
// Backslash-escape every "$" so Next.js's dotenv-expand doesn't substitute
// segments like $2b / $12 as (empty) variable references when loading .env.local.
const escapedForEnv = hash.replace(/\$/g, "\\$");
console.log("\nRaw hash:");
console.log(hash);
console.log("\nPaste this line into .env.local (with the $ signs escaped):");
console.log(`ADMIN_PASSWORD_HASH=${escapedForEnv}`);
