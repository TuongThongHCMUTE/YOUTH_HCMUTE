const { getQueryParameter } = require('../common/index')
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

        const results = await elasticClient.searchDoc('events', searchString, skip, limit, ['tenChuongTrinh', 'moTa'])

        if (results) {
            const events = results.hits.map(event => {
                return {
                    _id: event._id,
                    score: event._score,
                    tenChuongTrinh: event.highlight?.tenChuongTrinh ? event.highlight?.tenChuongTrinh[0] : event._source.tenChuongTrinh,
                    moTa: event.highlight?.moTa ? event.highlight?.moTa[0] : event._source.moTa
                }
            })
            
            res.status(200).json({
                status: 'success',
                all: results.total.value,
                results: events.length,
                data: {events}
            })
        } else {
            const results = await Event.find(
                { $text: { $search : searchString } },  
                { score : { $meta: "textScore" } })
                .sort({ score: { $meta : 'textScore' }})
                .skip(skip)
                .limit(limit)

                const allMatch = await Event.countDocuments(            
                    { $text: { $search : searchString } },  
                    { score : { $meta: "textScore" } })
                    
                const events = results.map(event => {
                    return {
                        _id: event._id,
                        score: 1,
                        tenChuongTrinh: event.tenChuongTrinh,
                        moTa: event.moTa
                    }
                })
                    res.status(200).json({
                        status: 'success',
                        all: allMatch,
                results: events.length,
                data: {events}
            })
        }
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
            tenChuongTrinh: event.tenChuongTrinh,
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
            tenChuongTrinh: event.tenChuongTrinh,
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