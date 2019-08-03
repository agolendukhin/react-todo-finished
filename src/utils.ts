import { Todos } from './Types'
import { get, maxBy } from 'lodash'
import { createAction, PayloadActionCreator } from 'redux-starter-kit'

export const getNewId = (array: Todos) => {
  let lastId = get(maxBy(array, 'id'), 'id', 0)
  return ++lastId
}

interface Iacc {
  [key: string]: PayloadActionCreator<any, string>
}

export const createAppAction = (
  name: string,
  module = 'todos',
  keys?: Array<string>
) => {
  const accInitial: Iacc = {}
  name = name.replace(/\s/g, '_')
  return (keys || ['local', 'server', 'error'])
    .map(postfix => [
      postfix,
      createAction(`app/${module}/` + `${name}_${postfix}`.toUpperCase()),
    ])
    .reduce((acc, curr) => {
      const postfix = curr[0] as string
      const action = curr[1] as PayloadActionCreator<any, string>
      acc[postfix] = action
      return acc
    }, accInitial)
}

export const createError = ({
  title,
  message,
}: {
  title?: string
  message: string
}) => ({
  id: 'id' + new Date().getTime(),
  title,
  message: `${message}`,
})

export const appVersion = '0.0.1'
