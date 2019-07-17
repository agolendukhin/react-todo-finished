import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { clearCompleted } from '../store/actions'
import { RootState, TodoActionCreator, ConnectDispatch } from '../Types'
import { withFirebase } from './firebase'

interface Props {
  display: boolean
  clearCompleted: TodoActionCreator
}

const ClearCompletedComponent: React.FC<Props> = ({
  display,
  clearCompleted,
}) =>
  display ? (
    <button className="clear-completed" onClick={() => clearCompleted()}>
      Clear completed
    </button>
  ) : null

export default compose(
  withFirebase,
  connect(
    ({ todos, filters }: RootState) => ({ todos, filters }),
    (dispatch: ConnectDispatch) =>
      bindActionCreators(
        {
          clearCompleted,
        },
        dispatch
      )
  )
)(ClearCompletedComponent) as any
