import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import { ThemeProvider, injectGlobal } from 'styled-components'

import AsyncApp from './AsyncApp'

const store = configureStore()

injectGlobal`
  body {
    width: 100%;
    height: 100%;
    overflow: hidden;
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

  .box {
    width: 100px;
    height: 100px;
    background-color: #3498DB;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
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