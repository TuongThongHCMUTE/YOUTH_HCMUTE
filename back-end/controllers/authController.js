const Student = require('../models/student')
const Manager = require('../models/manager')

// Import jsonwebtoken\
const Common = require('../common/methods')
const { sendEmail } = require('./emailController')

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

        if (Common.compareHashPassword(password, user.password)) {
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
                    user,
                    token: Common.generateToken({_id: user._id, email: user.email, role: user.role, faculty: user.donVi})
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

// Reset password
exports.resetPassword = async (req, res, next) => {
    try {
        const { email } = req.body
        const password = Common.generatePassword()
        const hashPassword = Common.hashPassword(password)

        const manager = await Manager.findOneAndUpdate({email}, {password: hashPassword}, {new: true, runValidators: true})
                                    .populate('donVi', 'tenDonVi')
        
        let resMsg = 'Tài khoản không tồn tại'
        if (manager) {
            const emailInfo = {
                name: manager.tenHienThi,
                password: password
            }
            sendEmail(manager.email, 'RESET_PAWSSWORD_EMAIL', emailInfo)
            resMsg = 'Cấp lại mật khẩu thành công. Vui lòng kiểm tra email để xem mật khẩu'
        }

        res.status(200).json({
            status: 'success',
            message: resMsg,
        })
    } catch (e) {
        logger.error(e)
        next(e)
    }
}

