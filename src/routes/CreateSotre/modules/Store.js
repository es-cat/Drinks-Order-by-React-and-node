// ------------------------------------
// Constants
// ------------------------------------
export const STORE_SAVE = 'STORE_SAVE'
export const STORE_BACK = 'STORE_BACK'
export const STORE_CANCEL = 'STORE_CANCEL'
export const STORE_UPDATE = 'STORE_UPDATE'

// ------------------------------------
// Actions
// ------------------------------------
export function back () {
  return (dispatch, getState) => {
      getState().location = "/"
  }
}

export function cancel () {
  return (dispatch, getState) => {
    if(confirm("確定不儲存就離開嗎?\n將放棄尚未儲存的變更。")){
      getState().location = "/"
    }
  }
}

export function updateList (storeList) {
  return {
    type    : STORE_UPDATE,
    data    : storeList
  }
}

// export function save (entity) {
//   return {
//     type    : STORE_SAVE,
//     data    : entity
//   }
// }


/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */
const demo = {test:1}
export const save = (entity = demo) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      //todo: ajax save and get new list
      setTimeout(() => {
        //fake
        let storeList = getState().store
        storeList.push(1)
        //fake end
        dispatch(updateList(storeList))
        dispatch(back())
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  cancel,
  back,
  updateList,
  save
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [STORE_UPDATE] : (state, action) => { 
    //location back
    if(action.data){
      return action.data
    }
    return state
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
