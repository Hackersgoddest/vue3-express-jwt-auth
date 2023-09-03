const bcrypt = require("bcryptjs");

const hash_password = (password) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}

const compare_password = (raw, hash) => bcrypt.compareSync(raw, hash);

module.exports = {
    hash_password,
    compare_password,
}