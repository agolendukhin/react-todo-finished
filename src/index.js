import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import * as Sentry from '@sentry/browser'

Sentry.init({
  dsn: 'https://6450ed04752443fa87da1907cb79d99c@sentry.io/1520687',
})

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
