import React from 'react'
import { connect } from 'react-redux'
import { Dispatch, ActionCreator, Action, bindActionCreators } from 'redux'
import { RootState, Todos } from '../../Types'
import { todosActions } from '../../store/todos'

const { clearCompleted } = todosActions

interface Props {
  todos: Todos
  display: boolean
  clearCompleted: ActionCreator<Action>
}

const ClearCompletedComponent: React.FC<Props> = ({
  todos,
  display,
  clearCompleted,
}) =>
  display ? (
    <button
      className="clear-completed"
      onClick={() => clearCompleted({ todos })}>
      Clear completed
    </button>
  ) : null

export default connect(
  ({ todos: { todos } }: RootState) => ({ todos }),
  (dispatch: Dispatch) => bindActionCreators({ clearCompleted }, dispatch)
)(ClearCompletedComponent) as any
