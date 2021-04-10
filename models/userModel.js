const { query } = require('./../db');
const bcrypt = require('bcrypt');

const createUserInDB = async ({ id, email, password }) => {
    const sql = 'INSERT INTO user SET ?';
    const result = await query(sql, { id, email, password });
    return result;
};

const ifExistInUser = async ({ email }) => {
    if (!email) {
        return false;
    }
    const sql = `SELECT email FROM user WHERE email='${email}'`;
    const result = await query(sql);
    return result;
};

const login = async ({ email, candidatePassword }) => {
    const sql = `SELECT * FROM user WHERE email='${email}'`;
    const result = await query(sql);
    if (result.length < 1) {
        return false;
    }
    const status = await bcrypt.compare(candidatePassword, result[0].password);
    if (status) {
        delete result[0].password;
        return result[0];
    } else {
        return false;
    }
};

const updateUserDetails = async ( data = {}) => {
    const { id } = data;
    if (!id) {
        return false;
    }
    const updateData = { ...data };
    delete updateData.id;
    const sql = 'INSERT INTO user_detail SET ? ON DUPLICATE KEY UPDATE ?';
    const result = await query(sql, [ data, updateData ]);
    return result;
};

const getUser = async (field, value) => {
    const sql = `SELECT * from user, user_detail WHERE user.${field}='${value}' && user.id=user_detail.id`;
    const result = await query(sql);
    result.forEach( (user) => {
        if (user.password) {
            delete user.password;
        }
    });
    return result;
};

const getUserById = async ({ id }) => {
    return await getUser('id', id);
};

const getAllUsers = async ({ offset = 0, limit = 10 }) => {
    const sql = `SELECT * FROM user LEFT JOIN user_detail ON user.id=user_detail.id ORDER BY account_created_at ASC LIMIT ${offset},${limit}`;
    const result = await query(sql);
    result.forEach( (user) => {
        if (user.password) {
            delete user.password;
        }
    });
    return result;
};

const deleteUser = async ({ id }) => {
    const sql = `Delete FROM user  WHERE id=${id}`;
    const result = await query(sql);
    return result;
};



module.exports = {
    createUserInDB,
    ifExistInUser,
    login,
    updateUserDetails,
    getAllUsers,
    getUser,
    getUserById,
    deleteUser,
};