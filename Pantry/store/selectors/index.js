import { createSelector } from 'reselect'

export const targetsSelector = createSelector(
  state => state.targets,
  targets => {
    const { result, entities } = targets
    const targetIds = result.targets
    return targetIds.map(id => entities.targets[id])
  }
)
