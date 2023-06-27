const { Axios, default: axios } = require('axios');

axios.put('http://127.0.0.1:3001/seedDocs', {})
    .then(rs => {
        console.log(`Update:   ${rs.statusText}`, rs.status)
        console.log('Seed success!, please browns the link: http://localhost:3001/book to get api');
    })
    .catch(err => {
        console.log('Update Failed: ', err)
    })