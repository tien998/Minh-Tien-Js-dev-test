
const client = require('./elasticClient');

var indexName = 'comment';
async function createCmtIndex() {
    try {
        const response = await client.indices.create({ index: indexName });
        console.log(`Index created: ${indexName}`, response);
    } catch (error) {
        console.error('Error creating index:', error);
    }
}

async function GetAllCmt() {
    var rsData = [];
    await client.search(
        {
            index: indexName,
            query: {
                match_all: {}
            }
        }
    ).then(rs => rs.hits.hits.forEach(i => {
        rsData.push(i._source);
    }));
    return rsData;
}

async function GetCmt(id) {
    var rsData = [];
    await client.search(
        {
            index: indexName,
            query: {
                match: {
                    "book_id": id
                }
            }
        }
    ).then(rs => rs.hits.hits.forEach(i => {
        rsData.push(i._source);
    }));
    return rsData;
}

async function PostCmt(docs) {
    try {
        await client.index({
            index: indexName,
            document: docs
        })
        return docs;
    }
    catch (err) {
        console.log('________________________ (Frome services/commentServices.js) post comment Failed ', err);
    }
}

module.exports = {createCmtIndex, GetAllCmt, GetCmt, PostCmt}