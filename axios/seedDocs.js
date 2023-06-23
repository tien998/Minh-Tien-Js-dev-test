const { Axios, default: axios } = require('axios');

axios.put('http://127.0.0.1:3001/seedDocs', {})
    .then(rs => {
        console.log(`Update:   ${rs.statusText}`, rs.status)
    })
    .catch(err => {
        console.log('Update Failed: ', err)
    })