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
        console.log(e)
        next(e)
    }
}

// Get current user
exports.getCurrentUser = async (req, res, next) => {
    try {
        const data = {user: null}

        if(req.user) {
            const { email } = req.user
            if (email.includes('@student.hcmute.edu.vn')) {
                data.user = await Student.findOne({email})
                                            .populate('donVi', 'tenDonVi')
                                            .populate('lopSV', 'tenLop nganhHoc')
                                            .populate('thongTinDoanVien.soDoan', 'trangThaiSoDoan')
            } else {
                data.user = await Manager.findOne({email})
                                            .populate('donVi', 'tenDonVi')
            }
        }

        res.status(200).json({
            status: 'success',
            data: data
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Update current user info
exports.updateCurrentUser = async (req, res, next) => {
    try {
        delete req.body.password
        const data = {user: null}

        if (req.user) {
            const { email } = req.user
            if (email.includes('@student.hcmute.edu.vn')) {
                data.user = await Student.findOneAndUpdate({email}, {...req.body}, {new: true, runValidator: true})
                                            .populate('donVi', 'tenDonVi')
                                            .populate('lopSV', 'tenLop nganhHoc')
                                            .populate('thongTinDoanVien.soDoan', 'trangThaiSoDoan')
            } else {
                data.user = await Manager.findOneAndUpdate({email}, {...req.body}, {new: true, runValidator: true})
                                            .populate('donVi', 'tenDonVi')
            }
        }

        res.status(200).json({
            status: 'success',
            data: data
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Change password
exports.changePassword = async (req, res, next) => {
    try {
        if (req.user) {
            const { oldPassword, newPassword, reNewPassword} = req.body
            const { _id } = req.user

            var user = await Manager.findById(_id)
            if(Common.compareHashPassword(oldPassword, user.password)){
                if(newPassword === reNewPassword){
                    if (newPassword === oldPassword) {
                        const err = new Error('Mật khẩu mới trùng với mật khẩu hiện tại')
                        err.statusCode = 400
                        return next(err)
                    }

                    const hashedPass = Common.hashPassword(newPassword)
                    user = await Manager.findByIdAndUpdate(_id, {password: hashedPass}, {new: true, runValidator: true})      

                    res.status(200).json({
                        status: 'success',
                        message: 'Cập nhật mật khẩu thành công'
                    })
                } else{
                    const err = new Error('Xác nhận mật khẩu không đúng')
                    err.statusCode = 400
                    return next(err)
                }
            } else {
                //Error: Password is not correct
                const err = new Error('Mật khẩu hiện tại không đúng')
                err.statusCode = 400
                return next(err)
            }
        }
    } catch (e) {
        console.log(e)
        next(e)
    }
}