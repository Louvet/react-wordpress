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

    this.state = { menuVisible: initState }
  }

  toggleMenu() {
    this.setState({
      menuVisible: ! this.state.menuVisible
    })
  }

  render() {
    const { links, responsiveMode } = this.props
    const display = responsiveMode.mobile && !this.state.menuVisible? 'none':'block'

    const divSyles = {
      display
    }

    return (
      <div>
        {responsiveMode.mobile && <button onClick={this.toggleMenu}>MENU</button>}
        <div style={divSyles}>
          <ul id="primry-nav">
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
        </div>
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