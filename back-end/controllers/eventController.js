const elasticClient = require('../configs/elasticSearch')
const { getQueryParameter, isObjectId, exportExcel } = require('../common/index')
const Event = require('../models/event')
const excelController = require('../common/xls/eventsXls')
const ELASTIC_SEARCH_INDEX = process.env.ELASTIC_SEARCH_INDEX || 'events'
const merits = require('../common/store/merits')

const getMeritIds = (existIds) => {
    let meritIds = []

    merits.forEach(merit => 
        merit.categories.forEach(category => 
            category.items.forEach(item => {
                if (!existIds.includes(item.id)){
                    meritIds.push(item.id)
                }
            })
        )   
    )

    return meritIds
}

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

    if (query.sinhViens) {
        if (query.dangKyThamGia !== undefined) {
            query.sinhViens.$elemMatch.dangKyThamGia = query.dangKyThamGia
            delete query.dangKyThamGia
        }
        
        if (query.diemDanhRa !== undefined) {
            query.sinhViens.$elemMatch.diemDanhRa = query.diemDanhRa
            delete query.diemDanhRa
        }
    
        if (query.diemDanhVao !== undefined) {
            query.sinhViens.$elemMatch.diemDanhVao = query.diemDanhVao
            delete query.diemDanhVao
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
        const xls = query.xls
        getDateQuery(query)

        const events = await Event.find(query).sort(sort).skip(skip).limit(limit)
                                    .select('-sinhViens')
        const countAll = await Event.countDocuments(query)

        if (xls == 'true') {
            const { columns, data } = excelController.getXlsForEvents(events)
            return exportExcel('Events', columns, data, res)
        }
        
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

// Get all Events for student
// get event with attendance of student
exports.getAttendanceEvents = async (req, res, next) => {
    try {
        const { email } = req.user 
        const { sort, limit, skip, query } = getQueryParameter(req)

        if (!email.includes('@student.hcmute.edu.vn')) {
            const err = new Error('Không sử dụng tài khoản sinh viên')
            err.statusCode = 400
            return next(err)
        }

        const maSoSV = email.slice(0, 8)
        query.sinhViens = {
            $elemMatch: {
                maSoSV: maSoSV
            }
        }

        getDateQuery(query)

        let selectFields = ''
        Object.keys(Event.schema.paths).forEach(key => {
            selectFields += ' ' + key
        })
        selectFields = selectFields.trim()

        
        const events = await Event.find(query).sort(sort).skip(skip).limit(limit)
                                        .select(selectFields)
                                        .select({ sinhViens: {$elemMatch: {maSoSV}}})
                                        
        const attendanceEvents = events.map((evt) => {
            const { sinhViens, ...event } = evt.toJSON()
            let attendance = sinhViens[0] ? sinhViens[0] : null
            return {
                ...event,
                attendance
            }
        })

        const countAll = await Event.countDocuments(query)
        
        res.status(200).json({
            status: 'success',
            all: countAll,
            results: attendanceEvents.length,
            data: {attendanceEvents}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Get all Events for SV5T
exports.getEventsForSV5T = async (req, res, next) => {
    try {        
        const { maSoSV, maTieuChi } = req.params
        const query = {
            sinhViens: {
                $elemMatch: {
                    maSoSV,
                    hoanThanhHoatDong: true
                }
            },
            tieuChi: {
                $elemMatch: {
                    maTieuChi
                }
            }
        }

        const events = await Event.find(query).select('tenHoatDong moTa')
        
        res.status(200).json({
            status: 'success',
            results: events.length,
            data: { events }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Get all missing event of event in SV5T
exports.getMissingEventsInSV5T = async (req, res, next) => {
    try {        
        const { email } = req.user

        if (!email.includes('@student.hcmute.edu.vn')) {
            const err = new Error('Không sử dụng tài khoản sinh viên')
            err.statusCode = 400
            return next(err)
        }
        const maSoSV = email.slice(0, 8)
        let existIds = []
        let events = await Event.find({sinhViens:{$elemMatch:{maSoSV, hoanThanhHoatDong: true}}})
                                    .select('tieuChi')

        events.forEach(event => event.tieuChi.forEach(tieuChi => {
            if (!existIds.includes(tieuChi.maTieuChi)) {
                existIds.push(tieuChi.maTieuChi)
            }
        }))

        let meritIds = getMeritIds(existIds)

        events = await Event.find({ 'tieuChi.maTieuChi':{$in: meritIds},
                                    daDuyet: true,
                                    hienThi: true,
                                    'thoiGianToChuc.thoiGianBatDau': {$gt: new Date()}
                                })
                                .select('-sinhViens')

        res.status(200).json({
            status: 'success',
            results: events.length,
            data: { events }
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
        const xls = query.xls

        getDateQuery(query)

        const results = await elasticClient.searchDoc(ELASTIC_SEARCH_INDEX, searchString, skip, null, ['tenHoatDong', 'moTa'])

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

                if (xls != 'true') {
                    dbEvent.tenHoatDong = event.highlight?.tenHoatDong ? event.highlight?.tenHoatDong[0] : dbEvent.tenHoatDong
                    dbEvent.moTa = event.highlight?.moTa ? event.highlight?.moTa[0] : dbEvent.moTa
                }

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

        if (xls == 'true') {
            const { columns, data } = excelController.getXlsForEvents(events)
            return exportExcel('Events', columns, data, res)
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

        await elasticClient.insertOneDoc(ELASTIC_SEARCH_INDEX, {
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

        const event = await Event.findById(id).select('-sinhViens')

        let attendance
        if (email.includes('@student.hcmute.edu.vn')) {
            const maSoSV = email.slice(0, 8)
            const eventAttendance = await Event.findById(id).select({ sinhViens: {$elemMatch: {maSoSV}}})
            attendance = eventAttendance?.sinhViens[0] ? eventAttendance.sinhViens[0] : null
        }

        res.status(200).json({
            status: 'success',
            data: {
                event,
                attendance: attendance
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

        await elasticClient.updateOneDoc(ELASTIC_SEARCH_INDEX, {
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

        await elasticClient.deleteOneDoc(ELASTIC_SEARCH_INDEX, event._id)

        res.status(200).json({
            status: 'success',
            data: {event}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}