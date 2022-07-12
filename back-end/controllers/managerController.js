const { getQueryParameter, generatePassword, hashPassword,
        stylesExcel, exportExcel } = require('../common/index')
const { sendEmail } = require('./emailController')

const Manager = require('../models/manager')

// Get all manager
exports.getAllManagers = async (req, res, next) => {
    try {
        const { sort, limit, skip, query } = getQueryParameter(req)

        const managers = await Manager.find(query).sort(sort).skip(skip).limit(limit)
                                        .populate('donVi', 'tenDonVi')

        const countAll = await Manager.countDocuments(query)

        res.status(200).json({
            status: 'success',
            all: countAll,
            results: managers.length,
            data: {managers}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Export excel all Managers
exports.exportExcelAllManagers = async (req, res, next) => {
    try {
        const { sort, limit, skip, query } = getQueryParameter(req)

        const managers = await Manager.find(query).sort(sort).skip(skip).limit(limit)
                                        .populate('donVi', 'tenDonVi')

        const columns = [
            { header: 'STT', key: 'number', width: 6, style: stylesExcel.ALIGNMENT_MID_CENTER },
            { header: 'Tên hiển thị', key: 'tenHienThi', width: 40, style: stylesExcel.ALIGNMENT_MID },
            { header: 'Email', key: 'email', width: 30, style: stylesExcel.ALIGNMENT_MID },
            { header: 'Địa chỉ', key: 'diaChi', width: 30, style: stylesExcel.ALIGNMENT_MID },
            { header: 'Số điện thoại', key: 'soDienThoai', width: 15, style: stylesExcel.ALIGNMENT_MID_CENTER },
            { header: 'Đơn vị', key: 'tenDonVi', width: 30, style: stylesExcel.ALIGNMENT_MID },
            { header: 'Chức vụ', key: 'chucVu', width: 25, style: stylesExcel.ALIGNMENT_MID },
            { header: 'Vai trò', key: 'role', width: 20, style: stylesExcel.ALIGNMENT_MID_CENTER },
            { header: 'Kích hoạt tài khoản', key: 'kichHoatTaiKhoan', width: 20, style: stylesExcel.ALIGNMENT_MID_CENTER },
            { header: 'Trạng thái', key: 'trangThai', width: 15, style: stylesExcel.ALIGNMENT_MID_CENTER },
        ]

        let stt = 1
        const data = managers.map(manager => {
            return {
                number: stt++,
                tenHienThi: manager.tenHienThi,
                email: manager.email,
                diaChi: manager.diaChi,
                soDienThoai: manager.soDienThoai,
                tenDonVi: manager.donVi?.tenDonVi,
                chucVu: manager.chucVu,
                role: manager.role,
                kichHoatTaiKhoan: manager.kichHoatTaiKhoan ? 'Đã kích hoạt' : 'Chưa kích hoạt',
                trangThai: manager.trangThai ? 'Đang dùng' : 'Tạm khóa',
            }
        })

        exportExcel('Managers', columns, data, res)
    } catch (e) {
        console.log(e)
        next(e)
    }
}


// Create new manager
exports.createOneManager = async (req, res, next) => {
    try {
        console.log(req.body)
        
        const password = req.body.password ? req.body.password : generatePassword()
        req.body.password = hashPassword(password)

        const manager = await Manager.create({...req.body})

        const emailInfo = {
            name: manager.tenHienThi,
            password: password
        }
        sendEmail(manager.email, 'WELCOME_MANAGER_EMAIL', emailInfo)

        res.status(200).json({
            status: 'success',
            data: {manager}
        })
    } catch (error) {
        next(error)
    }
}

// Get one manager
exports.getOneManager = async (req, res, next) => {
    try {
        const { id } = req.params

        const manager = await Manager.findById(id)
                                        .populate('donVi', 'tenDonVi')

        res.status(200).json({
            status: 'success',
            data: {manager}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Update one manager
exports.updateOneManager = async (req, res, next) => {
    try {
        delete req.body.password
        const { id } = req.params

        const manager = await Manager.findByIdAndUpdate(id, {...req.body}, {new: true, runValidators: true})
                                        .populate('donVi', 'tenDonVi')
                                        
        res.status(200).json({
            status: 'success',
            data: { manager }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Delete one manager
exports.deleteOneManager = async (req, res, next) => {
    try {
        const { id } = req.params

        const manager = await Manager.findByIdAndDelete(id)
                                        .populate('donVi', 'tenDonVi')

        res.status(200).json({
            status: 'success',
            data: {manager}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}