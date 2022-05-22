const Common = require('../common/methods')
const Class = require('../models/class')

// Get all Classes
exports.getAllClasses = async (req, res, next) => {
    try {
        const { sort, limit, skip, query } = Common.getQueryParameter(req)

        const classes = await Class.find(query).sort(sort).skip(skip).limit(limit)
                                        .populate('donVi', 'tenDonVi')
                                        .populate('quanLy.sinhVien', 'soDienThoai email')
        const countAll = await Class.countDocuments(query)
        
        res.status(200).json({
            status: 'success',
            all: countAll,
            results: classes.length,
            data: {classes}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Export excel all Classes
exports.exportExcelAllClasses = async (req, res, next) => {
    try {
        const { sort, limit, skip, query } = Common.getQueryParameter(req)

        const classes = await Class.find(query).sort(sort).skip(skip).limit(limit)
                                        .populate('donVi', 'tenDonVi')
                                        .populate('quanLy.sinhVien', 'soDienThoai email')

        const columns = [
            { header: 'Tên lớp', key: 'tenLop', width: 15, style: {alignment: { vertical: 'middle'}} },
            { header: 'Đơn vị', key: 'tenDonVi', width: 30, style: {alignment: { vertical: 'middle'}} },
            { header: 'Ngành học', key: 'nganhHoc', width: 40, style: {alignment: { vertical: 'middle'}} },
            { header: 'MSSV Bí thư', key: 'maSoSVBiThu', width: 16, style: {alignment: { vertical: 'middle', horizontal: 'center' }} },
            { header: 'Họ tên Bí thư', key: 'hoTenBiThu', width: 30, style: {alignment: { vertical: 'middle'}} },
            { header: 'MSSV Phó bí thư', key: 'maSoSVPhoBiThu', width: 16, style: {alignment: { vertical: 'middle', horizontal: 'center' }} },
            { header: 'Họ tên Phó bí thư', key: 'hoTenPhoBiThu', width: 30, style: {alignment: { vertical: 'middle'}} },
            { header: 'Trạng thái', key: 'trangThai', width: 15, style: {alignment: { vertical: 'middle', horizontal: 'center' }} },
        ]

        const data = classes.map(a_class => {
            const biThu = a_class.quanLy?.find(quanLy => quanLy.chucVu === 'BI_THU')
            const phoBiThu = a_class.quanLy?.find(quanLy => quanLy.chucVu === 'PHO_BI_THU')
            return {
                tenLop: a_class.tenLop,
                tenDonVi: a_class.donVi?.tenDonVi,
                nganhHoc: a_class.nganhHoc,
                maSoSVBiThu: biThu?.maSoSV,
                hoTenBiThu: biThu?.hoTen,
                maSoSVPhoBiThu: phoBiThu?.maSoSV,
                hoTenPhoBiThu: phoBiThu?.hoTen,
                trangThai: a_class.hienThi ? 'Hiển thị' : 'Ẩn'
            }
        })

        Common.exportExcel('Classes', columns, data, res)
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Create new Class
exports.createOneClass = async (req, res, next) => {
    try {
        console.log(req.body)
        
        const a_class = await Class.create({ ...req.body })

        res.status(200).json({
            status: 'success',
            data: { a_class }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Get one Class
exports.getOneClass = async (req, res, next) => {
    try {
        const { id } = req.params

        const a_class = await Class.findById(id)
                                        .populate('donVi', 'tenDonVi')
                                        .populate('quanLy.sinhVien', 'soDienThoai email')

        res.status(200).json({
            status: 'success',
            data: {a_class}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Update one Class
exports.updateOneClass = async (req, res, next) => {
    try {
        const { id } = req.params

        const a_class = await Class.findByIdAndUpdate(id, {...req.body}, {new: true, runValidators: true})
                                        .populate('donVi', 'tenDonVi')
                                        .populate('quanLy.sinhVien', 'soDienThoai email')

        res.status(200).json({
            status: 'success',
            data: { a_class }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Delete one Class
exports.deleteOneClass = async (req, res, next) => {
    try {
        const { id } = req.params

        const a_class = await Class.findByIdAndDelete(id)
                                        .populate('donVi', 'tenDonVi')
                                        .populate('quanLy.sinhVien', 'soDienThoai email')

        res.status(200).json({
            status: 'success',
            data: {a_class}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}