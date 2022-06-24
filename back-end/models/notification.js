const  mongoose = require('mongoose')

// Init schema
const notificationSchema = new mongoose.Schema({
    title: {type: String, required: [true, 'Nhập nội dung thông báo']},
    content: {type: String},
    image: {type: String},
    actionLink: {type: String},
    sender: {
        name: { type: String },
        email: { type: String }
    }, // Email sender
    receivers: [{
        name: { type: String },
        email: { type: String }
    }],
    readers: [
        {
            email: { type: String },
            readedAt: { type: Date }
        }
    ]
}, {timestamps: true})

const Notification = mongoose.model('Notification', notificationSchema)

module.exports = Notification