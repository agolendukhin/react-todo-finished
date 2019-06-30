import React, { Component } from 'react'

import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store/store'
import Main from './Main'

class App extends Component {
  render() {
    return (
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Main />
        </PersistGate>
      </ReduxProvider>
    )
  }
}

export default App
