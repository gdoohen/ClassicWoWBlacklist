import jwt from 'jsonwebtoken';

const secret = ""; //FIXME: Insert Secret Here

export const generateToken = (username, expiresIn = '12h') => {
    return jwt.sign({username}, secret, { expiresIn });
};

export const isTokenValid = async token => {
    return jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return { isValid: false };
        } else {
            return {
                isValid: true,
                username: decoded.username
            };
        }
    });
};
