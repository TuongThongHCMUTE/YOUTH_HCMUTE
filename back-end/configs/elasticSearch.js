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
    
        await client.indices.refresh({index})
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
        const result = await client.get({
            index,
            id
        }, {ignore: [404]})

        if (result._source) {
            await client.update({
                index,
                id,
                doc: {
                    ...body
                }
            })
        } else {
            await insertOneDoc(index, {
                id,
                ...body
            })
        }
        
        console.log('Cập nhật thành công!')
        console.log(result)
    } catch (e) {
        console.log('Lỗi kết nối Elasticsearch')
        console.log(e)
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
                highlighConfigs[field] = { type: 'plain', number_of_fragments: 0}
            })
        } else {
            highlightFields.forEach(field => {
                highlighConfigs[field] = { type: 'plain', number_of_fragments: 0 }
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
                pre_tags : ['<b style="color:red;">'], // Replace all <em>
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
//         //         tenHoatDong: 'phong cách'
//         //     }
//         // },
//         query: {
//             query_string: {
//                 query: 'phong cách',
//                 fields: ['tenHoatDong', 'moTa']
//             }
//         },
//         highlight: {
//             order: 'score',
//             require_field_match: false, // Tag all field
//             pre_tags : ['<b>'], // Replace all <em>
//             post_tags : ['</b>'], // Replace all </em>
//             fields: {
//                 tenHoatDong: { type: 'plain' },
//                 moTa: { type: 'plain' }
//             }
//         }
//     }, { meta: true }, {ignore: [404]})

//     // console.log(body.hits.hits)

//     for (let hit of body.hits.hits) {
//         console.log(hit._source.tenHoatDong)
//         console.log(hit.highlight.tenHoatDong)
//         console.log(hit.highlight.moTa)
//     }

//     console.log(body)
// }
// const suggest  = async () => {
//     const result = await client.search({
//         index: 'events',
//         query: {
//             match: { 
//                     tenHoatDong: 'phong cách'
//             }
//         },
//         suggest: {
//             gotsuggest: {
//                 text: 'phong cách',
//                 term: { field: 'tenHoatDong' }
//             }
//         }
//     })

//     console.log(result)
// }