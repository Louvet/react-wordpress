import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TweenMax from 'gsap'

import PrimaryNavigationButton from './PrimaryNavigationButton'
import PrimaryNavigationMenu from './PrimaryNavigationMenu'

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
    if(!this.state.menuVisible) {
      TweenMax.fromTo(this.menuNav, 0.25, {y: -this.menuNav.clientHeight, opacity: 1}, {y: 0, opacity: 1, onComplete: function(){ this.setState({
        menuVisible: ! this.state.menuVisible
      }) }.bind(this)});
    } else {
      TweenMax.fromTo(this.menuNav, 0.25, {y: 0, opacity: 1}, {y: -this.menuNav.clientHeight, opacity: 1, onComplete: function(){ this.setState({
        menuVisible: ! this.state.menuVisible
      }) }.bind(this)});
    }
  }

  componentDidUpdate() {
    const { responsiveMode } = this.props

    if(!responsiveMode.mobile && this.state.menuVisible) {
      this.setState({ menuVisible: false })
    }
  }

  render() {
    const { links, responsiveMode } = this.props
    const transform = !responsiveMode.mobile || this.state.menuVisible? 'translateY(0)':'translateY(-100%)'
    const btnClassName = this.state.menuVisible? 'on':'off'

    const divSyles = {
      transform
    }

    return (
      <div id="primary-nav">
        {responsiveMode.mobile && <PrimaryNavigationButton className={btnClassName} onClick={this.toggleMenu}/>}
        <nav id="primary-nav-menu" ref={nav => this.menuNav = nav} style={divSyles}>
          <PrimaryNavigationMenu tree={links.tree}/>
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