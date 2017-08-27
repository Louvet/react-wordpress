import fetch from 'isomorphic-fetch'

export const REQUEST_PAGE = 'REQUEST_PAGE'
export const RECEIVE_PAGE = 'RECEIVE_PAGE'

export const REQUEST_PRIMARY_NAVIGATION = 'REQUEST_PRIMARY_NAVIGATION'
export const RECEIVE_PRIMARY_NAVIGATION = 'RECEIVE_PRIMARY_NAVIGATION'


export function fetchPrimaryNavigation() {
  return dispatch => {
    dispatch(requestPrimaryNavigation())
    return fetch(`http://dev.louvet.pro/wp-json/myroutes/menu`)
      .then(response => response.json())
      .then(json => dispatch(receivePrimaryNavigation(json)))
  }
}

function requestPrimaryNavigation() {
  return {
      type: REQUEST_PRIMARY_NAVIGATION
  }
}

function receivePrimaryNavigation(json) {
  return {
    type: RECEIVE_PRIMARY_NAVIGATION,
    links: json
  }
}

function shouldFetchPage(state, pageName) {
  const page = state.pageByName[pageName]
  if(state.isFetching) {
    return false
  } else if (!page) {
    return true
  } 
  
  return false
}

export function fetchPageIfNeeded(pageName) {
  return (dispatch, getState) => {
    if (shouldFetchPage(getState(), pageName)) {
      return dispatch(fetchPage(pageName))
    }
  }
}

export function fetchPage(pageName) {
  return dispatch => {
    dispatch(requestPage())
    return fetch(`http://dev.louvet.pro/wp-json/myroutes/page=` + pageName)
      .then(response => response.json())
      .then(json => dispatch(receivePage(pageName, json)))
  }
}

function requestPage() {
  return {
      type: REQUEST_PAGE
  }
}

function receivePage(pageName, json) {
  return {
    type: RECEIVE_PAGE,
    pageName: pageName,
    pageData: {
      title: json.title,
      excerpt: json.excerpt,
      content: json.content,
      thumbnail: json.thumbnail,
      publication: json.publication
    }
  }
}