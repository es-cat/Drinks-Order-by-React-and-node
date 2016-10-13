// ------------------------------------
// Constants
// ------------------------------------
export const STORE_SAVE_START = 'STORE_SAVE_START'
export const STORE_SAVE_DONE = 'STORE_SAVE_DONE'
export const STORE_BACK = 'STORE_BACK'
export const STORE_CANCEL = 'STORE_CANCEL'
export const STORE_UPDATE = 'STORE_UPDATE'

// ------------------------------------
// Actions
// ------------------------------------
export function back () {
  return (dispatch, getState) => {
    getState().location = '/'
  }
}

export function cancel () {
  return (dispatch, getState) => {
    if (confirm('確定不儲存就離開嗎?\n將放棄尚未儲存的變更。')) {
      getState().location = '/'
    }
  }
}

export function updateList (storeList) {
  return {
    type    : STORE_UPDATE,
    data    : storeList
  }
}

export function saveStart () {
  return {
    type    : STORE_SAVE_START,
    processing: true
  }
}

export function saveDone (response) {
  return {
    type    : STORE_SAVE_DONE,
    data    : response,
    processing: false
  }
}
/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */
const demo = { test:1 }
export const save = (entity = demo) => {
  return (dispatch, getState) => {
    dispatch(saveStart())
    return new Promise((resolve) => {
      // todo: ajax save and get new list
      setTimeout(() => {
        // fake
        let storeList = Object.assign([], getState().store.storeList)
        storeList.push(1)
        let result = { data: storeList, success: true, error: '' }
        // fake end
        dispatch(saveDone(result))
        resolve()
      }, 1000)
    })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [STORE_UPDATE] : (state, action) => {
    // location back
    let newState = Object.assign({ }, state)
    newState.storeList = action.data || []
    return newState
  },

  [STORE_SAVE_START] : (state, action) => {
    // location back
    let newState = Object.assign({ }, state)
    newState.processing = action.processing
    return newState
  },

  [STORE_SAVE_DONE] : (state, action) => {
    // location back
    let newState = Object.assign({ }, state)
    newState.processing = action.processing || false
    newState.storeList = action.data.data || newState.storeList
    newState.saveResult = action.data.success
    newState.saveError = action.data.error
    return newState
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { storeList:[] }
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
