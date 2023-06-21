const { Axios, default: axios } = require('axios');

axios.get('http://127.0.0.1:3000/')
    .then(rs => {
        console.log(`GetAll:   ${rs.statusText}`, rs.status)
    })
    .catch(err => {
        console.log('GetAll Failed: ', err)
    })
