const sgMail = require('@sendgrid/mail')
const url = process.env.FRONT_END_URL

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.sendEmail = (email, type, emailInfo) => {
    const emailMessage = {
        WELCOME_MANAGER_EMAIL: {
            subject: 'THÔNG TIN ĐĂNG NHẬP TRANG YOUTH HCMUTE',
            content: `Xin chào <b>${emailInfo.name}</b>, Bạn vừa được tạo tài khoản tại trang YOUTH HCMUTE với email đăng nhập ${email} và mật khẩu "<b>${emailInfo.password}</b>". Nhấn <a href=${url}/dang-nhap>tại đây</a> để đăng nhập vào trang web và tiến hành đổi mật khẩu.`
        },
        RESET_PAWSSWORD_EMAIL: {
            subject: 'CẤP LẠI MẬT KHẨU TRANG YOUTH HCMUTE',
            content: `Xin chào <b>${emailInfo.name}</b>, Bạn vừa đượ cấp lại mật khẩu trang YOUTH HCMUTE. Mật khẩu mới của bạn là "<b>${emailInfo.password}</b>". Nhấn <a href=${url}/dang-nhap>tại đây</a> để đăng nhập vào trang web và tiến hành đổi mật khẩu.`
        }
    }

    const msg = {
        to: email,
        from: process.env.SEND_EMAIL,
        subject: emailMessage[type].subject,
        html: emailMessage[type].content
      }

    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent with message:', msg)
        })
        .catch((error) => {
            console.error(error)
        })
}