let defaultState={}

const mainReducer = (state=defaultState, action) => {
  switch(action.type){
    case 'SHOW': {
      var data = {}
      data[action.name] = action.data;
      return Object.assign({}, state, data)
    }
    case 'LOGIN': {
      return Object.assign({}, state, {
        loginRes: action.data
      })
    }
    case 'REGISTER': {
      return Object.assign({}, state, {
        register: action.data
      })
    }
    case 'CHANGE_DEVICE_LOGS': {
      var data = {}
      data[action.name] = action.data;
      return Object.assign({}, state, data)
    }
    case 'ADD_ORDER': {
      if (!state[action.name]) {
        return Object.assign({}, state, {
          [action.name]: {
            [action.status]: action.data
          }
        })
      } else {
        if (state[action.name][action.status]) {
          return Object.assign({}, state, {
            [action.name]: {
              ...state[action.name], 
              [action.status]: {
                ...state[action.name][action.status],
                data: {
                  ...state[action.name][action.status].data,
                  order_id_list: state[action.name][action.status].data.order_id_list.concat(action.data.data.order_id_list)
                }
              }
            }
          })
        } else {
          return Object.assign({}, state, {
            [action.name]: {
              ...state[action.name], 
              [action.status]: action.data
            }
          })
        }
      }
    }
    default: {

    }
  }
  return state
}

export default mainReducer;
