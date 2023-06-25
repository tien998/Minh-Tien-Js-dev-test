const { Axios, default: axios } = require('axios');

axios.get('http://127.0.0.1:3001/book/2')
    .then(rs=>{
        console.log(`Get:   ${rs.statusText}`, rs.status)
        console.log(rs.data);
    })
    .catch(err=>{
        console.log('Get Failed: ', err)
    })
