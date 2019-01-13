import { normalize, schema } from 'normalizr'
import sortBy from 'lodash.sortby'
import uuid from 'uuid'

import * as TargetsStore from 'app/store/disk/targetsStore'
import * as types from 'app/store/constants/action-types'

const targetEntity = new schema.Entity('targets')

export function loadTargets(options = { refreshing: false }) {
  return (dispatch, getState) => {
    return dispatch({
      type: types.LOAD_TARGETS,
      meta: {
        refreshing: options.refreshing,
      },
      payload: TargetsStore.list().then(storedTargets => {
        const targets = sortBy(storedTargets, ['position', 'createdAt', 'name'])
        return normalize(
          { targets },
          {
            targets: [targetEntity],
          }
        )
      }),
    })
  }
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
