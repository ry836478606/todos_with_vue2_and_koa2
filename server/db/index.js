const mongoose = require('mongoose')

const initDB = dbUrl => {
    mongoose.connect(dbUrl, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    mongoose.connection.on('connected', () => {
        console.log('------Mongoose connection open to ' + dbUrl + '------')
    })

    mongoose.connection.on('error', () => {
        console.log('Mongoose connection error: ' + err)
    })

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose connection disconnected')
    })

}

module.exports = initDB
