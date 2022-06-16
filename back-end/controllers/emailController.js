const sgMail = require('@sendgrid/mail')
const url = process.env.FRONT_END_URL

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.sendEmail = (email, type, emailInfo) => {
    const emailMessage = {
        WELCOME_MANAGER_EMAIL: {
            subject: 'THÔNG TIN ĐĂNG NHẬP TRANG YOUTH HCMUTE',
            content:    `<p?>Xin chào <b>${emailInfo.name}</b>, Bạn vừa được tạo tài khoản tại trang <b>YOUTH HCMUTE</b> với thông tin đăng nhập:
                        <ul>
                            <li>Email: ${email}</li>
                            <li>Mật khẩu: <b>${emailInfo.password}</b></li>
                        </ul>
                        Nhấn <a href=${url}/>tại đây</a> để đăng nhập vào trang web và tiến hành đổi mật khẩu.</p?`
        },
        RESET_PAWSSWORD_EMAIL: {
            subject: 'CẤP LẠI MẬT KHẨU TRANG YOUTH HCMUTE',
            content:    `<p>Xin chào <b>${emailInfo.name}</b>, Bạn vừa được cấp lại mật khẩu trang <b>YOUTH HCMUTE</b> với thông tin đăng nhập:
                        <ul>
                            <li>Email: ${email}</li>
                            <li>Mật khẩu: <b>${emailInfo.password}</b></li>
                        </ul>
                        Nhấn <a href=${url}/>tại đây</a> để đăng nhập vào trang web và tiến hành đổi mật khẩu.</p>`
        }
    }

    const msg = {
        to: email,
        from: process.env.SEND_EMAIL,
        from: {
            email: process.env.SEND_EMAIL,
            name: 'Đoàn trường ĐH Sư phạm Kỹ thuật TP. Hồ Chí Minh'
        },
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