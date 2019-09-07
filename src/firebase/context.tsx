import React from 'react'

export interface IFirebaseContext {}

const FirebaseContext = React.createContext<IFirebaseContext>({})

export const withFirebase = <P extends object>(Component: React.FC<P>) => (
  props: any
) => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
)

export default FirebaseContext
