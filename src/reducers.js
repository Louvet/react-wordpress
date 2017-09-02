import { combineReducers } from 'redux'
import {
  REQUEST_PAGE,
  RECEIVE_PAGE,
  REQUEST_PRIMARY_NAVIGATION,
  RECEIVE_PRIMARY_NAVIGATION,
  RESPONSIVE_MODE
} from './actions'

function pages(
  state = {
    isFetching: false,
    items: {}
  },
  action
) {
  switch(action.type) {
    case RECEIVE_PAGE:
      let item = {};
      item[action.pageName] = action.pageData

      return Object.assign({}, state, {
        isFetching: false,
        items: Object.assign({}, state.items, item)
      })
    case REQUEST_PAGE:
      return Object.assign({}, state, {
        isFetching: true
      })  
    default:
      return state
  }
}

function pageByName(state = {}, action) {
  switch (action.type) {
    case RECEIVE_PAGE:
    case REQUEST_PAGE:
      return Object.assign({}, state, {
        [action.pageName]: pages(state[action.pageName], action)
      })
    default:
      return state
  }
}

function responsiveMode(
  state = {
    mode: null,
    mobile: null
  }, 
  action
) {
  switch (action.type) {
    case RESPONSIVE_MODE:
      return Object.assign({}, state, {
        mode: action.mode,
        mobile: action.mobile
      })
    default:
      return state
  }
}

function primaryNavigation(
  state = {
    isFetching: false, 
    links: { html: '', tree: null } 
  }, 
  action
) {
    switch (action.type) {
      case RECEIVE_PRIMARY_NAVIGATION:
        return Object.assign({}, state, {
            isFetching: false,
            links: action.links
        })
      case REQUEST_PRIMARY_NAVIGATION:
        return Object.assign({}, state, {
            isFetching: true
        })
      default:
        return state
    }
  }

const rootReducer = combineReducers({
  pages,
  pageByName,
  primaryNavigation,
  responsiveMode
})

export default rootReducer