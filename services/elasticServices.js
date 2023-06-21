const { Client } = require('@elastic/elasticsearch');


var client = new Client({
    node: 'https://127.0.0.1:9200',
    auth: {
        username: 'elastic',
        password: 'dAF2D0NVU0_uhOopx_5p',
    },
    tls: {
        rejectUnauthorized: false
    }
})



var indexName = 'bookstore';

async function GetAll() {
    return await client.search(
        {
            index: indexName,
            query: {
                match_all: {}
            }
        }
    );
}

async function Get(id) {
    return await client.search({
        index: indexName,
        query: {
            match: {
                "id": id
            }
        }
    })
}

async function Create(docs) {
    try {
        await client.index({
            index: indexName,
            document: docs
        })
    }
    catch (err) {
        console.log('_________________________ (Frome elasticServices.js) Creat doc Failed ', err);
    }
}

async function Update(id, doc) {
    var updateDoc = await client.search({
        index: indexName,
        query: {
            match: {
                "id": id
            }
        }
    })
    try {
        var docID = updateDoc.hits.hits[0]._id
        await client.index({
            index: indexName,
            id: docID,
            document: doc
        })
    }
    catch (err) {
        console.log('_____________________ Error in Update: Not Found Document\n', err)
    }
}

async function seedDocs() {
    await createIndex(indexName);
    await indexDocument(indexName);
}

async function createIndex(indexName) {
    try {
        const response = await client.indices.create({ index: indexName });
        console.log('Index created:', response);
    } catch (error) {
        console.error('Error creating index:', error);
    }
}

// Mảng chứa những dữ liệu đầu tiên
var bookstore = [
    {
        'id': '1',
        'title': 'To Kill a Mockingbird',
        'author': 'Harper Lee',
        'publishedDate': '1960-07-11',
        'description': 'The story of racial injustice and the loss of innocence in the American South during the Great Depression.',
        'price': 12.99
    },
    {
        'id': '2',
        'title': '1984',
        'author': 'George Orwell',
        'publishedDate': '1949-06-08',
        'description': 'A dystopian novel set in a totalitarian society ruled by the Party, which has total control over every aspect of people\'s lives.',
        'price': 10.99
    },
    {
        'id': '3',
        'title': 'The Catcher in the Rye',
        'author': 'J.D. Salinger',
        'publishedDate': '1951-07-16',
        'description': 'The story of Holden Caulfield, a teenage boy who struggles with alienation and loss after being expelled from his prep school.',
        'price': 9.99
    },
    {
        'id': '4',
        'title': 'Pride and Prejudice',
        'author': 'Jane Austen',
        'publishedDate': '1813-01-28',
        'description': 'A romantic novel that follows the emotional development of Elizabeth Bennet, who learns the error of making hasty judgments.',
        'price': 8.99
    },
    {
        'id': '5',
        'title': 'The Hobbit',
        'author': 'J.R.R. Tolkien',
        'publishedDate': '1937-09-21',
        'description': 'A fantasy novel about the adventures of hobbit Bilbo Baggins, who is hired by the wizard Gandalf to help a group of dwarves reclaim their treasure from a dragon.',
        'price': 11.99
    },
    {
        'id': '6',
        'title': 'The Adventures of Huckleberry Finn',
        'author': 'Mark Twain',
        'publishedDate': '1884-12-10',
        'description': 'A novel about the adventures of a young boy named Huck Finn and his friend Jim, a runaway slave, as they travel down the Mississippi River.',
        'price': 7.99
    },
    {
        'id': '7',
        'title': 'The Lord of the Rings',
        'author': 'J.R.R. Tolkien',
        'publishedDate': '1954-07-29',
        'description': 'A high fantasy novel that follows the quest of hobbit Frodo Baggins to destroy the One Ring, which was created by the Dark Lord Sauron.',
        'price': 14.99
    },
    {
        'id': '8',
        'title': 'The Great Gatsby',
        'author': 'F. Scott Fitzgerald',
        'publishedDate': '1925-04-10',
        'description': 'The story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
        'price': 9.99
    }
];

async function indexDocument(indexName) {

    bookstore.forEach(doc => {
        const response = client.index({
            index: indexName,
            document: doc,
        });
        console.log('Document indexed:', response);
    })

}

module.exports = { seedDocs, GetAll, Get, Update, Create };