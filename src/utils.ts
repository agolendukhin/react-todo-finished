import { Todos } from './Types'
import { get, maxBy } from 'lodash'

export const getNewId = (array: Todos) => {
  let lastId = get(maxBy(array, 'id'), 'id', 0)
  return ++lastId
}
