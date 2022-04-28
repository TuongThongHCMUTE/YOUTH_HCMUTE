const Student = require('../models/student')
const Manager = require('../models/manager')

// Import jsonwebtoken
const jwt = require('jsonwebtoken')
// Import bcrypt
const bcrypt = require('bcryptjs')

// Login for manager with Username and Password
exports.loginWithPassword = async (req, res, next) => {
    try {
        const { email, password } = req.body
        var user = await Manager.findOne({email: email})
        
        if (!user) {
            const err = new Error('Email không tồn tại')
            err.statusCode = 400
            return next(err)
        }

        if (bcrypt.compareSync(password, user.password)) {
            if (!user.kichHoatTaiKhoan) {
                //Error: Don't validate email
                const err = new Error('Vui lòng kích hoạt tài khoản của bạn')
                err.statusCode = 403 // Forbidden
                return next(err)
            } else if (!user.trangThai) {
                //Error: Manager is Locked
                const err = new Error('Tài khoản của bạn đang tạm khóa')
                err.statusCode = 403 // Forbidden
                return next(err)
            }

            return res.status(200).json({
                status: 'success',
                data: {
                    token: jwt.sign(
                        {userId: user._id, userEmail: user.email, userRole: user.role},
                        process.env.APP_SECRET, {expiresIn: '4 hours'}
                    ),
                    fullName: user.tenHienThi,
                    email: user.email,
                    role: user.role
                }
            })
        } else {
            //Error: Password is not correct
            const err = new Error('Mật khẩu không chính xác')
            err.statusCode = 400
            return next(err)
        }
    } catch (e) {
        console.log(e)
        next(e)
    }
}

