const { Axios, default: axios } = require('axios');

axios.get('http://127.0.0.1:3000/9')
    .then(rs=>{
        console.log(`Get:   ${rs.statusText}`, rs.status)
    })
    .catch(err=>{
        console.log('Get Failed: ', err)
    })
