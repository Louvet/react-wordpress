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


  #primary-nav {
    #primary-nav-btn {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 100;
    }

    #primary-nav-menu {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 50;
      width: 100%;
      height: 100VH;
      display: flex;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      background-color: #F6F6F6;
      transition: transform 0.35s ease-in-out;

      ul {
        margin: 0;
        padding: 0;

        li {
          list-style: none;
        }
      }
    }
  }

  @media (min-width: 1024px) {
    #primary-nav {
      #primary-nav-menu {
        height: 60px;

        ul {
          li {
            display: inline-block;
          }
        }
      }
    }
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