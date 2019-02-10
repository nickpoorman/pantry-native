import { normalize, schema } from 'normalizr'
import sortBy from 'lodash.sortby'
import uuid from 'uuid'

import * as TargetsStore from 'app/store/disk/targetsStore'
import * as StateStore from 'app/store/disk/stateStore'
import * as types from 'app/store/constants/action-types'

import { fetchTarget } from 'app/store/lib/target'

const targetEntity = new schema.Entity('targets')

export function loadTargetsFromStore() {
  return TargetsStore.list().then(targets =>
    normalize(
      { targets },
      {
        targets: [targetEntity],
      }
    )
  )
}

export function loadTargets(options = { refreshing: false }) {
  return (dispatch, getState) =>
    dispatch({
      type: types.LOAD_TARGETS,
      meta: {
        refreshing: options.refreshing,
      },
      payload: loadTargetsFromStore(),
    })
}

export function createTarget(target) {
  const id = uuid()
  const createdAt = new Date().toISOString()
  const updatedAt = new Date().toISOString()
  return (dispatch, getState) =>
    dispatch({
      type: types.CREATE_TARGET,
      payload: TargetsStore.set(id, { ...target, id, createdAt, updatedAt }),
    }).then(() => dispatch(loadTargets({ refreshing: true })))
}

export function removeTarget(id) {
  return (dispatch, getState) =>
    dispatch({
      type: types.REMOVE_TARGET,
      payload: TargetsStore.del(id),
    })
      .then(() => dispatch(loadTargets({ refreshing: true })))
      .then(() => {
        const { targets } = getState()
        const { currentTarget, result } = targets
        if (currentTarget === id) {
          // We removed the current target so select another one.
          if (result && result.targets && result.targets.length) {
            return dispatch(setCurrentTarget(result.targets[0]))
          }
        }
      })
}

export function setCurrentTarget(id) {
  return (dispatch, getState) =>
    dispatch({
      type: types.SET_CURRENT_TARGET,
      payload: StateStore.setCurrentTarget(id).then(() => ({
        currentTarget: id,
      })),
    }).then(() => {
      // const { targets } = getState()
      // const { entities } = targets
      // if (entities && entities.targets) {
      //   const currentTarget = entities.targets[id]
      //   if (currentTarget) {
      //     return dispatch(loadTargetData(currentTarget))
      //   }
      // }

      const target = getTarget(id, getState)
      if (target) return dispatch(loadTargetData(target))
    })
}

function getTarget(id, getState) {
  const { targets } = getState()
  const { entities } = targets
  if (entities && entities.targets) {
    return entities.targets[id]
  }
}

export function loadTargetData(target, options = { refreshing: false }) {
  return (dispatch, getState) => {
    if (typeof target === 'string') {
      const t = getTarget(target, getState)
      if (t) target = t
    }

    return dispatch({
      type: types.LOAD_TARGET_DATA,
      meta: {
        refreshing: options.refreshing,
      },
      payload: fetchTarget(target).then(data => ({ currentTargetData: data })),
    })
  }
}
