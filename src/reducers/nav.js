import { AppNavigator } from '../navigators/Navigator'

const nav = (state, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state)

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state
}

export default nav
