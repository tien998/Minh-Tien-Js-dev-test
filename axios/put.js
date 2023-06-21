const { Axios, default: axios } = require('axios');

axios.put('http://127.0.0.1:3000/2', {
    'id': '2',
    'title': 'update2',
    'author': 'Harper Lee',
    'publishedDate': '1960-07-11',
    'description': 'The story of racial injustice and the loss of innocence in the American South during the Great Depression.',
    'price': 12.99
})
    .then(rs => {
        console.log(`Update:   ${rs.statusText}`, rs.status)
    })
    .catch(err => {
        console.log('Update Failed: ', err)
    })