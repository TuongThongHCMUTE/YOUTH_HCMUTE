exports.getQueryParameter = (req) => {
    const sort = {}

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        delete req.query.sortBy
    }

    const limit = req.query.limit ? parseInt(req.query.limit) : 50
    delete req.query.limit

    const skip = req.query.offset ? parseInt(req.query.offset) * limit : 0
    delete req.query.offset

    const query = req.query ? req.query : '{}'

    return {
        sort,
        limit,
        skip,
        query
    }
}