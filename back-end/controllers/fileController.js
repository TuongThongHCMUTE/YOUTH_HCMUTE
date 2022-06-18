// Upload Avatar
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const { getSaveFileFolder } = require('../common/methods')
const { uploadFile, getFileStream, deleteFile } = require('../configs/s3')

// Upload Proof
exports.uploadAFile = async (req, res, next) => {
    try {
        const file = req.file

        const folder = getSaveFileFolder(req.query.type)
        const result = await uploadFile(file, folder)

        // Delete file on local
        await unlinkFile(file.path)

        res.status(200).json({
            status: 'success',
            message: 'Upload file thành công',
            data: {
                displayName: file.originalname,
                imageKey: result.Key
            }
        })
    } catch (e) {
        next(e)
    }
}

exports.getAFile = async (req, res, next) => {
    try {
        const { key } = req.query

        if (key) {
            const readStream = await getFileStream(key)
            console.log(readStream)

            await readStream.pipe(res)
        } else {
            const err = new Error('File không tồn tại')
            err.statusCode = 403
            return next(err)
        }
    } catch (e) {
        next(e)
    }
}

exports.deleteAFile = async (req, res, next) => {
    try {
        try {
            const { key } = req.query
    
            console.log(key)
    
            if (key) {
                const response = await deleteFile(key)
                console.log(response)

                res.status(200).json({
                    status: 'success',
                    message: 'Xóa file thành công'
                })
            } else {
                const err = new Error('File không tồn tại')
                err.statusCode = 403
                return next(err)
            }
        } catch (e) {
            next(e)
        }
    } catch (e) {
        next(e)
    }
}