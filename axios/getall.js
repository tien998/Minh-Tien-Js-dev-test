const { Axios, default: axios } = require('axios');

axios.get('http://127.0.0.1:3001/book')
    .then(rs => {
        console.log(`GetAll:   ${rs.statusText}`, rs.data)
    })
    .catch(err => {
        console.log('GetAll Failed: ', err)
    })
