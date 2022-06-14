const mongoose = require('mongoose');

//Quy dinh bo khuon mau
//Quy dinh cau tru tai nguyen
//id duoc tu dong tao boi mongoDB
const commentSchema = new mongoose.Schema({
    noiDung: {
        type: String,
        required: [true, 'Nhập nội dung bình luận'],
        trim: true},
    hoatDong: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    sinhVien: {
        //Chi lay userId
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    quanLy: {
        //Chi lay userId
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manager'
    }
}, {timestamps: true})

// // Gán một hàm cho object 'methods' của cmtSchema
// cmtSchema.methods.getContent = function(cb) {
//     return this.content;
// };

//Tao model dựa vào cơ chế cmtShema
const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment;