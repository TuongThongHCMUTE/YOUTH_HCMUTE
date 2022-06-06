const { Client } = require('@elastic/elasticsearch')

const client = new Client({
    cloud: { id: process.env.ELASTIC_SEARCH_ID },
    // auth: { apiKey: process.env.ELASTICSEARCH_API_KEY }
    auth: {
        username: 'elastic',
        password: process.env.ELASTIC_SEARCH_PASSWORD
    }
})

// Insert one document to elastic
const insertOneDoc = async (index, { id, ...body }) => {
    try {
        await client.index({
            index,
            id,
            document: {
                ...body
            }
        })
    
        await client.indices.refresh({index: 'events'})
        console.log('Thêm vào Elasticsearch thành công')
        console.log(body)
    } catch {
        console.log('Lỗi kết nối Elasticsearch')
        return false
    }
}

// Update one document to elastic
const updateOneDoc = async (index, { id, ...body }) => {
    try {
        await client.update({
            index,
            id,
            doc: {
                ...body
            }
        })
    
        const result = await client.get({
            index,
            id
        })
        
        console.log('Cập nhật thành công!')
        console.log(result)
    } catch {
        console.log('Lỗi kết nối Elasticsearch')
        return false
    }
}

// Delete one document to elastic
const deleteOneDoc = async (index, id) => {
    try {
        const result = await client.delete({
            index,
            id
        })
    
        console.log('Xóa thành công!')
        console.log(result)
    } catch {
        console.log('Lỗi kết nối Elasticsearch')
        return false
    }
}

// Search all document in elastic match  queryString
const searchDoc = async (index, searchString, skip, limit, searchFields, highlightFields=null) => {
    try {
        let highlighConfigs = {}
        if (!highlightFields) {
            searchFields.forEach(field => {
                highlighConfigs[field] = { type: 'plain' }
            })
        } else {
            highlightFields.forEach(field => {
                highlighConfigs[field] = { type: 'plain' }
            })
        }
    
        let paginateConfig = {}
        if (limit) {
            paginateConfig = {
                from: skip,
                size: limit
            }
        }
    
        const results = await client.search({
            ...paginateConfig,
            index,
            query: {
                query_string: {
                    query: searchString,
                    fields: searchFields
                }
            },
            highlight: {
                order: 'score',
                require_field_match: false, // Tag all field
                pre_tags : ['<b>'], // Replace all <em>
                post_tags : ['</b>'], // Replace all </em>
                fields: {
                    ...highlighConfigs
                }
            }
        }, { meta: true }, {ignore: [404]})
    
        console.log('Tìm kiếm thành công!')
        console.log(results.body.hits.hits)
    
        return results.body.hits
    } catch {
        console.log('Lỗi kết nối Elasticsearch')
        return false
    }
}

module.exports = {
    insertOneDoc,
    updateOneDoc,
    deleteOneDoc,
    searchDoc
}

// const search = async () => {

//     const { body } = await client.search({
//         index: 'events',
//         // query: {
//         //     match: { 
//         //         tenChuongTrinh: 'phong cách'
//         //     }
//         // },
//         query: {
//             query_string: {
//                 query: 'phong cách',
//                 fields: ['tenChuongTrinh', 'moTa']
//             }
//         },
//         highlight: {
//             order: 'score',
//             require_field_match: false, // Tag all field
//             pre_tags : ['<b>'], // Replace all <em>
//             post_tags : ['</b>'], // Replace all </em>
//             fields: {
//                 tenChuongTrinh: { type: 'plain' },
//                 moTa: { type: 'plain' }
//             }
//         }
//     }, { meta: true }, {ignore: [404]})

//     // console.log(body.hits.hits)

//     for (let hit of body.hits.hits) {
//         console.log(hit._source.tenChuongTrinh)
//         console.log(hit.highlight.tenChuongTrinh)
//         console.log(hit.highlight.moTa)
//     }

//     console.log(body)
// }
// const suggest  = async () => {
//     const result = await client.search({
//         index: 'events',
//         query: {
//             match: { 
//                     tenChuongTrinh: 'phong cách'
//             }
//         },
//         suggest: {
//             gotsuggest: {
//                 text: 'phong cách',
//                 term: { field: 'tenChuongTrinh' }
//             }
//         }
//     })

//     console.log(result)
// }