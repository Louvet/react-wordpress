import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import { ThemeProvider, injectGlobal } from 'styled-components'

import AsyncApp from './AsyncApp'

const store = configureStore()

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    background: #F2F2F2;
  }

  .transition-wrapper{
    position: relative;
  }

  .transition-wrapper .page {
    position: absolute;
  }
`
const theme = {
  primary:  '#666666'
}

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AsyncApp />
        </ThemeProvider>
      </Provider>
    )
  }
}