import crypto from "crypto"; // Crypto is a in build node module, it helps to generate a encrypted keys for secrete keys

const key1 = crypto.randomBytes(32).toString("hex");
const key2 = crypto.randomBytes(32).toString("hex");

console.log("\n");
console.log("Save this keys and use as a secrete keys");
console.table({ key1, key2 });
