const jwt = require('jsonwebtoken')

exports.checkCurrentUser = (req, res, next) => {
    // Access Authorization form header
    const Authorization = req.header('authorization');

    if (!Authorization) {
        req.user = null
        next()
    } else {
        // Get token from Authorization
        const token = Authorization.replace('Bearer ', '')

        // Verify token
        try {
            const {userId, userEmail, userRole} = jwt.verify(token, process.env.APP_SECRET)
            req.user = {userId, userEmail, userRole}
            next()
        } catch {
            req.user = null
            next()
        }
    } 
}