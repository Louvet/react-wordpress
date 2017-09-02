import React, { Component } from 'react'
import PrimaryNavigation from './Navigation/PrimaryNavigation/index'

class SiteHeader extends Component {
  render() {
    return (
      <div>
       <PrimaryNavigation links={this.props.primaryNavigationLinks}/>
      </div> 
    )
  }
}

export default SiteHeader