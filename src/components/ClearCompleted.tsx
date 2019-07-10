import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { clearCompleted } from '../store/actions'
import { RootState, TodoActionCreator, ConnectDispatch } from '../Types'

interface Props {
  display: boolean
  clearCompleted: TodoActionCreator
}

const ClearCompletedComponent: React.FC<Props> = ({
  display,
  clearCompleted,
}) =>
  display ? (
    <button className="clear-completed" onClick={clearCompleted}>
      Clear completed
    </button>
  ) : null

export default connect(
  ({ todos, filters }: RootState) => ({ todos, filters }),
  (dispatch: ConnectDispatch) =>
    bindActionCreators(
      {
        clearCompleted,
      },
      dispatch
    )
)(ClearCompletedComponent)
