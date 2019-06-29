import { get, maxBy } from 'lodash'

export const getNewId = array => {
  let lastId = get(maxBy(array, 'id'), 'id', 0)
  return ++lastId
}
