import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class PrimaryNavigationMenuLink extends Component {
  render() {
    return (
      <NavLink to={this.props.to.replace(/http:\/\/163.172.98.183\//g, '/')}>{this.props.label}</NavLink>
    )
  }
}

export default PrimaryNavigationMenuLink