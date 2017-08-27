import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

export default class PrimaryNavigation extends Component {
  render() {
    const { links } = this.props

    return (
      <div>
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
      </div>
    )
  }
}

PrimaryNavigation.propTypes = {
  links: PropTypes.object.isRequired
}