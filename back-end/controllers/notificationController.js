const { getQueryParameter } = require('../common/index')
const Notification = require('../models/notification')

// Get all Notifications
exports.getAllNotifications = async (req, res, next) => {
    try {
        const { sort, limit, skip, query } = getQueryParameter(req)

        const notifications = await Notification.find(query).sort(sort).skip(skip).limit(limit)
        const countAll = await Notification.countDocuments(query)
        
        res.status(200).json({
            status: 'success',
            all: countAll,
            results: notifications.length,
            data: {notifications}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Create new Notification
exports.createOneNotification = async (req, res, next) => {
    try {
        let notification = await Notification.create({ ...req.body })

        res.status(200).json({
            status: 'success',
            data: { notification }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Get one Notification
exports.getOneNotification = async (req, res, next) => {
    try {
        const { id } = req.params

        const notification = await Notification.findById(id)

        res.status(200).json({
            status: 'success',
            data: {notification}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Update one Notification
exports.updateOneNotification = async (req, res, next) => {
    try {
        const { id } = req.params

        const notification = await Notification.findByIdAndUpdate(id, {...req.body}, {new: true, runValidators: true})

        res.status(200).json({
            status: 'success',
            data: { notification }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Delete one Notification
exports.deleteOneNotification = async (req, res, next) => {
    try {
        const { id } = req.params

        const notification = await Notification.findByIdAndDelete(id)

        res.status(200).json({
            status: 'success',
            data: {notification}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}