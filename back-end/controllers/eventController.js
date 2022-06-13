const { getQueryParameter, isObjectId } = require('../common/index')
const Event = require('../models/event')
const elasticClient = require('../configs/elasticSearch')

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
        const { limit, skip } = getQueryParameter(req)
        const { searchString } = req.query

        const results = await elasticClient.searchDoc('events', searchString, skip, limit, ['tenHoatDong', 'moTa'])

        let events = []
        let totalDocument = 0
        if (results) {
            const idEvents = results.hits
                                .filter(event => isObjectId(event._id))
                                .map(event => event._id)
            const matchEvents = await Event.find({_id: { $in: idEvents }})

            events = results.hits.map(event => {
                const dbEvent = matchEvents.find(x => x._id.toString() === event._id)

                dbEvent.tenHoatDong = event.highlight?.tenHoatDong ? event.highlight?.tenHoatDong[0] : dbEvent.tenHoatDong
                dbEvent.moTa = event.highlight?.moTa ? event.highlight?.moTa[0] : dbEvent.moTa
                return {
                    ...dbEvent.toJSON(),
                    score: event._score
                }
            })

            totalDocument = results.total.value
        } else {
            events = await Event.find(
                { $text: { $search : searchString } },  
                { score : { $meta: "textScore" } })
                .sort({ score: { $meta : 'textScore' }})
                .skip(skip)
                .limit(limit)

            totalDocument = await Event.countDocuments(            
                { $text: { $search : searchString } },  
                { score : { $meta: "textScore" } })
        }

        res.status(200).json({
            status: 'success',
            all: totalDocument,
            results: events.length,
            data: { events }
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

        await elasticClient.insertOneDoc('events', {
            id: event._id,
            tenHoatDong: event.tenHoatDong,
            moTa: event.moTa
        })

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

        await elasticClient.updateOneDoc('events', {
            id: event._id,
            tenHoatDong: event.tenHoatDong,
            moTa: event.moTa
        })

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

        await elasticClient.deleteOneDoc('events', event._id)

        res.status(200).json({
            status: 'success',
            data: {event}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}