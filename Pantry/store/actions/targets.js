import { normalize, schema } from 'normalizr'
import sortBy from 'lodash.sortby'
import uuid from 'uuid'

import * as TargetsStore from 'app/store/disk/targetsStore'
import * as StateStore from 'app/store/disk/stateStore'
import * as types from 'app/store/constants/action-types'

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

export function setCurrentTarget(id) {
  return (dispatch, getState) =>
    dispatch({
      type: types.SET_CURRENT_TARGET,
      payload: StateStore.setCurrentTarget(id).then(() => ({
        currentTarget: id,
      })),
    })
}
