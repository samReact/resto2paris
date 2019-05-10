const bcrypt = require("bcrypt");

//hash user password and return a this user
const hashPassword = (user, password) => {
  const hash = bcrypt.hashSync(password, 10);
  user.password = hash;
  return user;
};

//Compare password and currentPassword and return a BOOLEAN false or true
const comparePassword = (password, currentPassword) => {
  return bcrypt.compare(password, currentPassword).then(res => {
    return res;
  });
};

module.exports = { comparePassword, hashPassword };
