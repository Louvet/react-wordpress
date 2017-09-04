import React, { Component } from 'react'
import { Motion, spring} from 'react-motion'

import PrimaryNavigation from './Navigation/PrimaryNavigation/index'

const animate = (val) => spring(val, {
  stiffness: 53,
  damping: 27
})

class SiteHeader extends Component {
  render() {
    return (
      <Motion defaultStyle={{ width: 0 }} style={{ width: animate(100) }}>
        {({width}) => <PrimaryNavigation links={this.props.primaryNavigationLinks} style={{ border: `${width}px solid #000` }}/>}
      </Motion> 
    )
  }
}

export default SiteHeader