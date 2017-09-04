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
      border: 0;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 60px;
      height: 60px;
      text-align: center;
      outline-style: none;

      &:hover {
        background: #666;

        svg {
          #bars {
            fill: #FFF;
          }
        }
      }

      &.on {
        svg {
          #bars {
            path:nth-of-type(1) {
              transform:rotate(-45deg) translateY(0) translateX(0);
            }

            path:nth-of-type(2) {  
              opacity:0;
            }
              
            path:nth-of-type(3) {
              transform:rotate(45deg) translateY(0em) translateX(0em);
            }
          }
        }
      }

      svg {
        display: inline-block;
        margin: 0 auto;
        width: 30px;
        height: 30px;

        #bars {
          fill:#A2A2A2;
          pointer-events:all;
          
            path {
              transform:rotate(0) translateY(0) translateX(0);
              opacity:1;
              transform-origin: 20px 10px;
              transition: transform 0.4s ease-in-out, opacity 0.2s ease-in-out;          
            }

            path:nth-of-type(1) {
              transform-origin: 20px 10px;
            }

            path:nth-of-type(3) {
              transform-origin: 20px 20px;
            }
          }
        
          
          .svg-menu-toggle:hover {
          
          
              
          }     
      }

      span {
        display: none;
      }
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
    #root {
      padding-top: 80px;
    }

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