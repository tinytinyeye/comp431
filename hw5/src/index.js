require('expose?$!expose?jQuery!jquery')
require("bootstrap-webpack")
require('./styles.css')

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import Reducer from './reducers'
import App from './components/app'

let store = createStore(Reducer, applyMiddleware(thunkMiddleware))
// let store = createStore(Reducer)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)
