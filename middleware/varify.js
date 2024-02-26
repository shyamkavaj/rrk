const val = "topSecretKey";
const { verify } = require("jsonwebtoken");

const ERROR_MESSAGES = {
    INVALID_TOKEN: "Invalid Token",
    UNAUTHORIZED_USER: "Access denied! Unauthorized user"
};

const checkToken = (req, res, next) => {
    const token = req.get("authorization");
    console.log(token);
    if (token) {
        const slicedToken = token.slice(7);
        verify(slicedToken, "shyam", (err, decoded) => {
            if (err) {
                console.log(err);
                res.json({
                    success: 0,
                    msg: ERROR_MESSAGES.INVALID_TOKEN
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.json({
            success: 0,
            msg: ERROR_MESSAGES.UNAUTHORIZED_USER
        });
    }
};

module.exports = {
    checkToken,
};
