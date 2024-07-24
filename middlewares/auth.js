const { validateToken } = require("../services/auth");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        // Logging cookies for debugging
        console.log("Cookies: ", req.cookies);

        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        } catch (error) {
            console.error("Token validation error: ", error);
            return res.status(401).send('Invalid Token');
        }

        next();
    };
}

module.exports = {
    checkForAuthenticationCookie,
};
