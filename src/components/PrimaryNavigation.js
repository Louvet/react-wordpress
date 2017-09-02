import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import hamburger from '../assets/img/hamburger.svg'

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

    const divSyles = {
      transform
    }

    return (
      <div id="primary-nav">
        {responsiveMode.mobile && <button id="primary-nav-btn" onClick={this.toggleMenu}><img src={hamburger} width="20"/>MENU</button>}
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