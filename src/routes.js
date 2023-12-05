const {GetSymptoms, PostSymptoms} = require('./handler');
const routes = [
    {
        method: 'GET',
        path: '/gejala',
        handler: GetSymptoms,
    },
    {
        method: 'POST',
        path: '/gejala',
        handler: PostSymptoms,
    },
    

]

module.exports = routes;