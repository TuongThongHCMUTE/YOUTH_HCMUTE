// Methods for Query
const generateQuery = ({query, user }) => {
    if (query.maSoSV) {
        query.maSoSV = {
            $regex: query.maSoSV,
            $options: 'i'
        }
    }

    if (query.tenLop) {
        query.tenLop = {
            $regex: query.tenLop,
            $options: 'i'
        }
    }

    return query ? query : {}
}

exports.getQueryParameter = (req) => {
    const sort = {}

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        delete req.query.sortBy
    }

    const limit = req.query.limit ? parseInt(req.query.limit) : null
    delete req.query.limit

    const skip = req.query.offset ? parseInt(req.query.offset) * limit : 0
    delete req.query.offset

    const query = generateQuery(req)

    return {
        sort,
        limit,
        skip,
        query
    }
}

// Methods for password
const generator = require('generate-password')
const bcrypt = require('bcryptjs')

exports.generatePassword = () => {
    const password = generator.generate({
        length: 20,
        numbers: true,
        // symbols: true
    })

    return password
}

exports.hashPassword = (password) => {
    return hashPassword = bcrypt.hashSync(password, 10)
}

exports.compareHashPassword = (password, userPassword) => {
    return bcrypt.compareSync(password, userPassword)
}

// Method for JWT
const jwt = require('jsonwebtoken')

exports.generateToken = (tokenInfo) => {
    return jwt.sign(
        tokenInfo,
        process.env.APP_SECRET, {expiresIn: '4 hours'}
    )
}

exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.APP_SECRET)
}

const excel = require('exceljs')
// Export excel file
exports.exportExcel = (fileName, columns, data, res) => {
    let workbook = new excel.Workbook()
    let worksheet = workbook.addWorksheet(fileName)
    worksheet.columns = columns

    // Add Array Rows
    worksheet.addRows(data)
    
    // Format excel
    // Making first line in excel bold
    worksheet.getRow(1).font = { bold: true }

    // res is a Stream object
    res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    res.setHeader(
        'Content-Disposition',
        'attachment;filename=' + `${fileName}.xlsx`
    )
    
    return workbook.xlsx.write(res).then(function () {
        res.status(200).end()
    })
}

exports.addHours = (numOfHours, date) => {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
    
    return date;
}

// Check objectId
const { ObjectId } = require('mongoose').Types
exports.isObjectId = (_id) => {
    return ObjectId.isValid(_id)
}

// Get update value
exports.updateValues = (type) => {
    const updateValues = {
        'dang-ky': {
            dangKyThamGia: true,
            thoiGianDangKy: new Date()
        },
        'diem-danh-vao': {
            diemDanhVao: true,
            thoiGianDiemDanhVao: new Date()
        },
        'diem-danh-ra': {
            diemDanhRa: true,
            thoiGianDiemDanhRa: new Date()
        }
    }

    return updateValues[type]
}

// File controller
exports.getSaveFileFolder = (type) => {
    let folder
    switch (type) {
        case 'events':
            folder = 'events'
            break
        case 'avatars':
            folder = 'avatars'
            break
        default:
            folder = 'others'
            break
    }

    return folder
}