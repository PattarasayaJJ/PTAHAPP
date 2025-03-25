const bcrypt = require('bcryptjs');

// Hash function
exports.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    throw err;
  }
};

// Compare function
exports.comparePassword = async (password, hashed) => {
  try {
    return await bcrypt.compare(password, hashed);
  } catch (err) {
    throw err;
  }
};
