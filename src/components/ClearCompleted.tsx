import React from 'react'
import { connect } from 'react-redux'
import { compose, Dispatch } from 'redux'
import { CLEAR_COMPLETED_LOCAL } from '../store/actions'
import { RootState, Todos } from '../Types'
import { withFirebase } from './firebase'

interface Props {
  todos: Todos
  display: boolean
  dispatch: Dispatch
}

const ClearCompletedComponent: React.FC<Props> = ({
  todos,
  display,
  dispatch,
}) =>
  display ? (
    <button
      className="clear-completed"
      onClick={() => dispatch({ type: CLEAR_COMPLETED_LOCAL, todos })}>
      Clear completed
    </button>
  ) : null

export default compose(
  withFirebase,
  connect(({ todos }: RootState) => ({ todos }))
)(ClearCompletedComponent) as any
