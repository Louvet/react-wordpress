import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

export default class PrimaryNavigation extends Component {
  render() {
    const { links } = this.props

    return (
      <div>
        {links.html.length <= 0 && <h2>Loading...</h2>}
        {links.html.length > 0 &&
        <div id="primary-nav">
          { links.tree.map((link, i) => <NavLink key={i} to={link.url.replace(/http:\/\/163.172.98.183\//g, '/')}>{link.title}</NavLink>  ) }
        </div>
        }
      </div>
    )
  }
}

PrimaryNavigation.propTypes = {
  links: PropTypes.object.isRequired
}