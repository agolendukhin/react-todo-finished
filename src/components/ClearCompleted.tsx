import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { clearCompleted } from '../store/actions'
import { RootState, TodoActionCreator, ConnectDispatch, TDB } from '../Types'
import { withFirebase } from './firebase'

interface Props {
  display: boolean
  clearCompleted: TodoActionCreator
  firebase: {
    db: TDB
  }
}

const ClearCompletedComponent: React.FC<Props> = ({
  display,
  clearCompleted,
  firebase: { db },
}) =>
  display ? (
    <button className="clear-completed" onClick={() => clearCompleted(db)}>
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
