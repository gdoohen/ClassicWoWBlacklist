import Mailgun from 'mailgun-js';

const API_KEY = ""; //FIXME: Insert Mailgun APIKEY Here
const DOMAIN = "classicblacklist.com";
const mailgun = new Mailgun({ apiKey: API_KEY, domain: DOMAIN, host: "api.mailgun.net" });

export const sendAccountVerificationEmail = async (recipient, username, verificationCode) => {
    const data = {
        from: "no-reply@classicblacklist.com",
        to: recipient,
        subject: "Account Verification - The Classic WoW Blacklist",
        html: `
            You are receiving this email because you registered for an account with <a href="https://www.classicblacklist.com">www.classicblacklist.com</a>. If you did not make this account, please ignore this email.<br><br><br>
            If you did make this account, your <b>verification code is ${verificationCode}</b>. Alternatively, you can <a href="https://www.classicblacklist.com/account/verify/${username}/${verificationCode}">click this link</a> to verify your account.<br><br><br>
            Thanks for signing up for The Classic Blacklist, we look forward to creating an awesome website for you!<br><br>
            Regards,<br>
            The Classic Blacklist Dev Team
        `
    };

    const mailgunResponse = await new Promise((resolve, reject) => {
        mailgun.messages().send(data, (err, body) => {
            if (err) {
                console.log("Email ERROR - 42:", err)
                return resolve({ status: "failed", err });
            } else {
                console.log("Email sent", body);
                return resolve({ status: "success", body });
            }
        });
    });

    return mailgunResponse;
};

export const sendNewPasswordEmail = async (recipient, newPassword) => {
    const data = {
        from: "no-reply@classicblacklist.com",
        to: recipient,
        subject: "Password Reset - The Classic WoW Blacklist",
        html: `
            You are receiving this email because you requested a new password.<br><br>
            Your password has been reset, and <b>your new password is ${newPassword}</b>.<br><br>
            You can now <a href="https://www.classicblacklist.com/login">login here</a> with your new password.<br><br><br>
            Regards,<br>
            The Classic Blacklist Dev Team
        `
    };

    const mailgunResponse = await new Promise((resolve, reject) => {
        mailgun.messages().send(data, (err, body) => {
            if (err) {
                console.log("Email ERROR - 42:", err)
                return resolve({ status: "failed", err });
            } else {
                console.log("Email sent", body);
                return resolve({ status: "success", body });
            }
        });
    });

    return mailgunResponse;
};
