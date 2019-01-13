import { normalize, schema } from 'normalizr'
// import sortBy from 'lodash.sortby'
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
      // unclear what to put here yet...
      payload: TargetsStore.list().then(data => {
        // TODO: Need to figure out how this comes back...
        console.log(JSON.stringify(data))
        // const targets = data.targets.sortBy(targets, ['position', 'created_at'])
        const targets = [
          { id: uuid(), url: 'https://example.com/1' },
          { id: uuid(), url: 'https://example.com/2' },
          { id: uuid(), url: 'https://example.com/3' },
        ]
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
  return (dispatch, getState) => {
    dispatch({
      type: types.CREATE_TARGET,
      // unclear what to put here yet... Will probably need to call backend when I implement that.
      payload: TargetsStore.set(id, { ...target, id: target.id || id }),
    })
  }
}
