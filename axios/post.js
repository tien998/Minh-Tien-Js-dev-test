const { Axios, default: axios } = require('axios');

axios.post('http://127.0.0.1:3000/', {
    'id': '10',
    'title': 'upload',
    'author': 'upload',
    'publishedDate': '1960-07-11',
    'description': 'uploaduploaduploaduploaduploaduploaduploaduploaduploaduploaduploaduploaduploadupload.',
    'price': 12.99
})
    .then(rs => {
        console.log(`Post:   ${rs.statusText}`, rs.status)
    })
    .catch(err => {
        console.log('Post Failed: ', err)
    })