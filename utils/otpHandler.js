class OtpHandler {
    constructor(){

    }

    static createOTP(){

        return '1234';
    }
    static async sendOtp(otp, email){

        return true
    }
}

module.exports = {
    OtpHandler
}