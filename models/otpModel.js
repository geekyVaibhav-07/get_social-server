const { query } = require('../db');
const bcrypt = require('bcrypt');

const getEmailVerificationOTP = async (email) => {
    const sql = `SELECT email, otp, otp_sent_at FROM email_verification_otp WHERE email='${email}'`;
    const result = await query(sql);
    return result;
};

const ifExistInEmailVerificationOtp = async ({ email }) => {
    if (!email) {
        return false;
    }
    const sql = `SELECT email, otp_sent_at FROM email_verification_otp WHERE email='${email}'`;
    const result = await query(sql);
    return result;
};

const registerOTP = async ({ email, otp }) => {
    if (!email || !otp) {
        return false;
    }
    const sql = `INSERT INTO email_verification_otp SET email='${email}', otp='${otp}' ON DUPLICATE KEY UPDATE otp='${otp}'`;
    const result = await query(sql);
    return result
}

const deleteEmailOtp = async ({ email }) => {
    if (!email) {
        return false;
    }
    const sql = `DELETE FROM email_verification_otp WHERE email='${email}'`;
    const result = await query(sql);
    return result
}

module.exports = {
    getEmailVerificationOTP,
    ifExistInEmailVerificationOtp,
    registerOTP,
    deleteEmailOtp
}