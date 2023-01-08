const argon2 = require("argon2");

async function hashPassword(password) {
  const hash = await argon2.hash(password);
  return hash;
}

async function verifyPassword(passwordUser, password) {
  const passwordCorrect = await argon2.verify(passwordUser, password);
  return passwordCorrect;
}

module.exports = { hashPassword, verifyPassword };
