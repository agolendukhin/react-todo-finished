import 'antd/lib/alert/style/index.css'
import 'todomvc-common/base.css'
import 'todomvc-app-css/index.css'
import './styles.css'
import React, { ComponentType } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store/store'
import Firebase, { FirebaseContext } from './components/firebase'
import { AuthUserContext } from './components/session'
import Main from './Main'
import { SignIn, PrivateRoute } from './components'
import { IFirebaseContext } from './components/firebase/context'
import { IAuthUserContext } from './components/session/context'

const App: React.FC<{}> = () => (
  <Firebase>
    {({
      user,
      loading,
      ...firebase
    }: {
      user: IAuthUserContext
      loading: boolean
      firebase: IFirebaseContext
    }) => {
      return (
        <AuthUserContext.Provider value={user}>
          <FirebaseContext.Provider value={firebase}>
            <ReduxProvider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                  <PrivateRoute
                    exact
                    path="/"
                    component={Main as ComponentType}
                    isAuthenticating={!user && loading}
                    isAuthenticated={user && !loading}
                  />
                  <Route path="/signin" component={SignIn as ComponentType} />
                </BrowserRouter>
              </PersistGate>
            </ReduxProvider>
          </FirebaseContext.Provider>
        </AuthUserContext.Provider>
      )
    }}
  </Firebase>
)

export default App
