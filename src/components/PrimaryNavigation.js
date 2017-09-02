import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class PrimaryNavigation extends Component {
  constructor(...args) {
    super(...args)

    const { responsiveMode } = this.props
    const initState = responsiveMode.mobile? false:true

    this.toggleMenu = this.toggleMenu.bind(this)

    this.state = { 
      menuVisible: initState 
    }
  }

  toggleMenu() {
    this.setState({
      menuVisible: ! this.state.menuVisible
    })
  }

  componentDidUpdate() {
    const { responsiveMode } = this.props

    if(!responsiveMode.mobile && this.state.menuVisible) {
      this.setState({ menuVisible: false })
    }
  }

  render() {
    const { links, responsiveMode } = this.props
    const opacity = responsiveMode.mobile && !this.state.menuVisible? 0:1
    const transform = !responsiveMode.mobile || this.state.menuVisible? 'translateY(0)':'translateY(-100%)'
    const btnClassName = this.state.menuVisible? 'on':'off'

    const divSyles = {
      transform
    }

    return (
      <div id="primary-nav">
        {responsiveMode.mobile && <button id="primary-nav-btn" className={btnClassName} onClick={this.toggleMenu}>
          <svg>
            <g id="bars" fill="#FFF">
              <path d="M20.945,8.75c0,0.69-0.5,1.25-1.117,1.25H3.141c-0.617,0-1.118-0.56-1.118-1.25l0,0c0-0.69,0.5-1.25,1.118-1.25h16.688C20.445,7.5,20.945,8.06,20.945,8.75L20.945,8.75z"></path>
              <path d="M20.923,15c0,0.689-0.501,1.25-1.118,1.25H3.118C2.5,16.25,2,15.689,2,15l0,0c0-0.689,0.5-1.25,1.118-1.25 h16.687C20.422,13.75,20.923,14.311,20.923,15L20.923,15z"></path>
              <path d="M20.969,21.25c0,0.689-0.5,1.25-1.117,1.25H3.164c-0.617,0-1.118-0.561-1.118-1.25l0,0c0-0.689,0.5-1.25,1.118-1.25h16.688C20.469,20,20.969,20.561,20.969,21.25L20.969,21.25z"></path>
            </g>
          </svg>
          <span>MENU</span>
        </button>}
        <nav id="primary-nav-menu" style={divSyles}>
          <ul>
          {links.tree.map(function(menuItem, i) {
            if (menuItem.menu_item_children.length>0) {
                return (
                  <li key={i}><NavLink to={menuItem.url.replace(/http:\/\/163.172.98.183\//g, '/')}>{menuItem.title}</NavLink>
                    <ul>
                        {menuItem.menu_item_children.map(function(subMenu, i) {
                            return <li key={i}><NavLink to={subMenu.url.replace(/http:\/\/163.172.98.183\//g, '/')}>{subMenu.title}</NavLink></li>;
                        })}
                    </ul>
                  </li>
                )
            } else {
              return (
                <li key={i}><NavLink to={menuItem.url.replace(/http:\/\/163.172.98.183\//g, '/')}>{menuItem.title}</NavLink></li>
              )
            }
          })}
          </ul>
        </nav>
      </div>
    )
  }
}

PrimaryNavigation.propTypes = {
  responsiveMode: PropTypes.object.isRequired,
  links: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { responsiveMode } = state

  return {
    responsiveMode
  }
}

export default connect(mapStateToProps)(PrimaryNavigation)