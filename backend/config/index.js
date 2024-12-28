const ENV = process.env.NODE_ENV

module.exports =  ENV === 'production' ? require('./config.prod') : require('./config.dev')