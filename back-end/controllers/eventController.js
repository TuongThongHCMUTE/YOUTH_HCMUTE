const { getQueryParameter, isObjectId, updateValues, populateFields } = require('../common/index')
const Event = require('../models/event')
const elasticClient = require('../configs/elasticSearch')

const getDateQuery = (query) => {
    const { type } = query

    if (type == 'sap-dien-ra') {
        query['thoiGianToChuc.thoiGianBatDau'] = {
            $gt: new Date()
        }
    } else if (type == 'da-dien-ra') {
        query['thoiGianToChuc.thoiGianBatDau'] = {
            $lte: new Date()
        }
    }

    delete query?.searchString
    delete query?.type

    return query
}
// Get all Events
exports.getAllEvents = async (req, res, next) => {
    try {
        const { sort, limit, skip, query } = getQueryParameter(req)
        getDateQuery(query)

        const events = await Event.find(query).sort(sort).skip(skip).limit(limit)
                                    .select('-sinhViens')
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
        const { limit, skip, sort, query } = getQueryParameter(req)
        const { searchString, type } = query
        getDateQuery(query)

        const results = await elasticClient.searchDoc('events', searchString, skip, null, ['tenHoatDong', 'moTa'])

        let events = []
        let totalDocument = 0
        if (results) {
            const idEvents = results.hits
                                .filter(event => isObjectId(event._id))
                                .map(event => event._id)
            const matchEvents = await Event.find({_id: { $in: idEvents }})
                                                .select('-sinhViens')

            events = results.hits.map(event => {
                const dbEvent = matchEvents.find(x => x._id.toString() === event._id)

                dbEvent.tenHoatDong = event.highlight?.tenHoatDong ? event.highlight?.tenHoatDong[0] : dbEvent.tenHoatDong
                dbEvent.moTa = event.highlight?.moTa ? event.highlight?.moTa[0] : dbEvent.moTa
                return {
                    ...dbEvent.toJSON(),
                    score: event._score
                }
            })

            const currentDate = new Date()
            if (type == 'sap-dien-ra') {
                events = events.filter(event => event.thoiGianToChuc.thoiGianBatDau > currentDate)
            } else if (type == 'da-dien-ra') {
                events = events.filter(event => event.thoiGianToChuc.thoiGianBatDau <= currentDate)
            }

            totalDocument = events.length

            if (limit) {
                events = events.slice(skip, skip + limit)
            }
        } else {
            events = await Event.find(
                { $text: { $search : searchString }, ...query },  
                { score : { $meta: "textScore" } })
                .sort({ score: { $meta : 'textScore' }})
                .skip(skip)
                .limit(limit)

            totalDocument = await Event.countDocuments(            
                { $text: { $search : searchString }, ...query },  
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
        const { email } = req.user

        let event
        if (email.includes('@student.hcmute.edu.vn')) {
            const maSoSV = email.slice(0, 8)
            event = await Event.findById(id).select({ sinhViens: {$elemMatch: {maSoSV}}})
        } else {
            event = await Event.findById(id).select('-sinhViens')
        }

        let attendance = event.sinhViens ? event.sinhViens[0] : null

        res.status(200).json({
            status: 'success',
            data: {
                event,
                attendance
            }
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
                                    .select('-sinhViens')

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
                                    .select('-sinhViens')

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