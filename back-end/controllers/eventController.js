const { getQueryParameter } = require('../common/index')
const Event = require('../models/event')

// Get all Events
exports.getAllEvents = async (req, res, next) => {
    try {
        const { sort, limit, skip, query } = getQueryParameter(req)

        const events = await Event.find(query).sort(sort).skip(skip).limit(limit)
                                    .populate('sinhVienThamGia.sinhVien', 'maSoSV ho ten')
        const countAll = await Event.countDocuments(query)
        
        res.status(200).json({
            status: 'success',
            all: countAll,
            results: events.length,
            data: {events}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Search event Events
exports.searchAllEvents = async (req, res, next) => {
    try {
        const { searchString } = req.query

        const events = await Event.find(
                                { $text: { $search : searchString } },  
                                { score : { $meta: "textScore" } })
                                .sort({ score: { $meta : 'textScore' }})
        
        res.status(200).json({
            status: 'success',
            all: events.length,
            data: {events}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Create new Event
exports.createOneEvent = async (req, res, next) => {
    try {
        const event = await Event.create({ ...req.body })

        res.status(200).json({
            status: 'success',
            data: { event }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Get one Event
exports.getOneEvent = async (req, res, next) => {
    try {
        const { id } = req.params

        const event = await Event.findById(id)
                                    .populate('sinhVienThamGia.sinhVien', 'maSoSV ho ten')

        res.status(200).json({
            status: 'success',
            data: {event}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Update one Event
exports.updateOneEvent = async (req, res, next) => {
    try {
        const { id } = req.params

        const event = await Event.findByIdAndUpdate(id, {...req.body}, {new: true, runValidators: true})
                                    .populate('sinhVienThamGia.sinhVien', 'maSoSV ho ten')

        res.status(200).json({
            status: 'success',
            data: { event }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Delete one Event
exports.deleteOneEvent = async (req, res, next) => {
    try {
        const { id } = req.params

        const event = await Event.findByIdAndDelete(id)
                                    .populate('sinhVienThamGia.sinhVien', 'maSoSV ho ten')

        res.status(200).json({
            status: 'success',
            data: {event}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}