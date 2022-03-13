const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
    try {
        // Access Authorization from req header
        const Authorization = req.header('authorization')
        
        if (!Authorization) {
            // Error Unauthorized
            const err = new Error('Please authenticate')
            err.statusCode = 401
            return next(err)
        }
    
        // Get token
        const token = Authorization.replace('Bearer ', '')
    
        //Verify token
        const {userId, userEmail, userRole} = jwt.verify(token, process.env.APP_SECRET)
        
        req.user = {userId, userEmail, userRole}
        next() 
    } catch (e) {
        res.status(401).json({error: 'Please authenticate'})
    }
}