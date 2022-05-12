const Common = require('../common/methods')
const { sendEmail } = require('./emailController')

const Manager = require('../models/manager')

// Get all manager
exports.getAllManagers = async (req, res, next) => {
    try {
        const { sort, limit, skip, query } = Common.getQueryParameter(req)

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

// Create new manager
exports.createOneManager = async (req, res, next) => {
    try {
        console.log(req.body)
        
        const password = req.body.password ? req.body.password : Common.generatePassword()
        req.body.password = Common.hashPassword(password)

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
        const { id } = req.params

        if (req.body.password) {
            delete req.body.password
            console.log(req.body.password)
        }

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