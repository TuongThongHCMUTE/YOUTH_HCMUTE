const Common = require('../common/methods')

const addAuthor = (req, email) => {
    if (req.method === 'POST') {
        req.body.createBy = email
    } else if (req.method === 'PUT') {
        req.body.updateBy = email
    }
}

exports.verifyToken = (req, res, next) => {
    try {
        // Access Authorization from req header
        const Authorization = req.header('authorization')
        
        if (!Authorization) {
            // Error Unauthorized
            const err = new Error('Vui lòng đăng nhập')
            err.statusCode = 401
            return next(err)
        }
    
        // Get token
        const token = Authorization.replace('Bearer ', '')
    
        //Verify token
        req.user = Common.verifyToken(token)
        addAuthor(req, req.user.email)
        next() 
    } catch (e) {
        const err = new Error('Hết phiên đăng nhập')
        err.statusCode = 401
        next(err)
    }
}