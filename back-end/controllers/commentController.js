const { getQueryParameter } = require('../common/index')
const Comment = require('../models/comment')

// Get all Comments
exports.getAllComments = async (req, res, next) => {
    try {
        const { sort, limit, skip, query } = getQueryParameter(req)

        const comments = await Comment.find(query).sort(sort).skip(skip).limit(limit)
                                        .populate('sinhVien', 'maSoSV ho ten email')
                                        .populate('quanLy', 'tenHienThi chucVu email')
        const countAll = await Comment.countDocuments(query)
        
        res.status(200).json({
            status: 'success',
            all: countAll,
            results: comments.length,
            data: {comments}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Create new Comment
exports.createOneComment = async (req, res, next) => {
    try {
        const comment = await Comment.create({ ...req.body })

        res.status(200).json({
            status: 'success',
            data: { comment }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Get one Comment
exports.getOneComment = async (req, res, next) => {
    try {
        const { id } = req.params

        const comment = await Comment.findById(id)
                                        .populate('sinhVien', 'maSoSV ho ten email')
                                        .populate('quanLy', 'tenHienThi chucVu email')

        res.status(200).json({
            status: 'success',
            data: {comment}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Update one Comment
exports.updateOneComment = async (req, res, next) => {
    try {
        const { id } = req.params

        const comment = await Comment.findByIdAndUpdate(id, {...req.body}, {new: true, runValidators: true})
                                        .populate('sinhVien', 'maSoSV ho ten email')
                                        .populate('quanLy', 'tenHienThi chucVu email')

        res.status(200).json({
            status: 'success',
            data: { comment }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Delete one Comment
exports.deleteOneComment = async (req, res, next) => {
    try {
        const { id } = req.params

        const comment = await Comment.findByIdAndDelete(id)
                                        .populate('sinhVien', 'maSoSV ho ten email')
                                        .populate('quanLy', 'tenHienThi chucVu email')

        res.status(200).json({
            status: 'success',
            data: {comment}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}