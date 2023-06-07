import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const crypt = {
  hash: (password: string) => {
    return bcrypt.hash(password, SALT_ROUNDS);
  },
  compare: (plainTextPassword: string, hashedPassword: string) => {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  },
};
