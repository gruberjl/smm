const redux = require('redux')
const {reducers} = require('./reducers')
const {createMiddleware} = require('./middlewares')

const store = redux.createStore(reducers, createMiddleware())

module.exports = {store}
