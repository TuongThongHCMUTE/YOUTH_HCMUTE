const fs = require('fs')
const path = require('path')
const multer = require('multer')
const uuid = require('uuid')

const { getSaveFileFolder} = require('../common/methods')

const getStorageFile = multer.diskStorage({
    destination: function (req, file, cb) {
        const folder = getSaveFileFolder(req.query.type)
        // const folderPath = `/src/filesUpload/${folder}/`

        const folderPath = path.join(__dirname, `../src/filesUpload/${folder}/`)

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, {
                recursive: true
            })
        }
        
        cb(null, folderPath) // Local
    },
    filename: function (req, file, cb) {
        const splitName = file.originalname.split('.')
        const fileName = uuid.v1() + '.' + splitName[splitName.length - 1]
        cb(null, fileName)
    }
})
  
const uploadFile = multer({
        storage: getStorageFile,
        limits: {
            fileSize: 5000000
        },
        fileFilter(req, file, cb) {
            if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
                cb(new Error('Vui lòng upload ảnh hoặc pdf'))
            }
            cb(undefined, true)
        }
})

module.exports = {
    uploadFile
}