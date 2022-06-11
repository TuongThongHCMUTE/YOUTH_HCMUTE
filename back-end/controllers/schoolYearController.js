const { getQueryParameter } = require('../common/index')
const SchoolYear = require('../models/schoolYear')

// Get all SchoolYears
exports.getAllSchoolYears = async (req, res, next) => {
    try {
        const { sort, limit, skip, query } = getQueryParameter(req)

        const schoolYears = await SchoolYear.find(query).sort(sort).skip(skip).limit(limit);
        const countAll = await SchoolYear.countDocuments(query)
        
        res.status(200).json({
            status: 'success',
            all: countAll,
            results: schoolYears.length,
            data: { schoolYears }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Create new SchoolYear
exports.createOneSchoolYear = async (req, res, next) => {
    try {
        if (req.body.namHocHienTai) {
            await SchoolYear.updateMany({namHocHienTai: true}, {namHocHienTai: false})
            req.body.hienThi = true
        }

        const schoolYear = await SchoolYear.create({ ...req.body })

        res.status(200).json({
            status: 'success',
            data: { schoolYear }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Get one SchoolYear by maNamHoc
exports.getOneFacultyByMaNamHoc = async (req, res, next) => {
    try {
        const { maNamHoc } = req.params

        const schoolYear = await SchoolYear.findOne( {maNamHoc: maNamHoc})

        res.status(200).json({
            status: 'success',
            data: { schoolYear }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Get current SchoolYears
exports.getCurrentSchoolYear = async (req, res, next) => {
    try {
        const schoolYear = await SchoolYear.findOne({namHocHienTai: true, hienThi: true})

        res.status(200).json({
            status: 'success',
            data: { schoolYear }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Update one SchoolYear by maNamHoc
exports.updateOneSchoolYearByMaNamHoc = async (req, res, next) => {
    try {
        const { maNamHoc } = req.params

        if (req.body.namHocHienTai) {
            await SchoolYear.updateMany({namHocHienTai: true}, {namHocHienTai: false})
            req.body.hienThi = true
        }

        const schoolYear = await SchoolYear.findOneAndUpdate({maNamHoc}, {...req.body}, {new: true, runValidators: true})

        res.status(200).json({
            status: 'success',
            data: { schoolYear }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Delete one SchoolYear
exports.deleteOneSchoolYearByMaNamHoc = async (req, res, next) => {
    try {
        const { maNamHoc } = req.params

        const schoolYear = await SchoolYear.findOneAndDelete({maNamHoc})

        res.status(200).json({
            status: 'success',
            data: { schoolYear }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}
