import React from 'react'

export interface IAuthUserContext {}

const AuthUserContext = React.createContext<IAuthUserContext>({})

export const withAuthUser = <P extends object>(Component: React.FC<P>) => (
  props: any
) => (
  <AuthUserContext.Consumer>
    {authUser => <Component {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
)

export default AuthUserContext
